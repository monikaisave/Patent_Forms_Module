# 🏛️ Brainiac IP Solutions - Patent Forms & Auto-Fill Module
## Complete Database Setup, Code Changes, and Architecture Guide

This folder contains the complete, standalone export of the **Patent Forms Module** created for Brainiac IP Solutions, including the **Patent Forms Builder** and the **Filled Patent Forms (Auto-Fill & Submissions)** system.

---

## 📁 Directory Structure Overview

```text
Patent_Forms_Database_And_Module/
├── DATABASE/
│   ├── 01_CREATE_TABLE_patent_form_submissions.sql    <- Core SQL to create the submissions table
│   ├── 02_SAMPLE_DATA_AND_SEEDS.sql                   <- Seed data (641D, 634P, 645P records)
│   └── 03_EXISTING_SYSTEM_TABLES_SCHEMA_REFERENCE.sql <- Details of patentapplication, applicants, patentcountry
├── BACKEND_CODEIGNITER/
│   ├── controllers/
│   │   └── PatentForms.php                            <- CodeIgniter Controller with all REST APIs & views
│   ├── models/
│   │   └── PatentForms_model.php                      <- CI Model handling DB queries & auto-creation
│   ├── views/
│   │   └── patent_forms.php                           <- Responsive iframe wrapper view
│   └── config/
│       └── database.php                               <- Database connection settings reference
├── FRONTEND_SOURCE/
│   ├── App.jsx                                        <- Main React Router / State Manager
│   ├── components/
│   │   ├── forms/
│   │   │   ├── FilledPatentFormsHub.jsx               <- "Fill Patent Form" Hub with New Filing & Submissions Table
│   │   │   └── FormsListView.jsx                      <- "Patent Forms Builder" template catalog
│   │   ├── runtime/
│   │   │   └── FormRuntime.jsx                        <- Live Interactive Form Canvas with SQL Auto-Fill
│   │   ├── builder/                                   <- Visual Drag & Drop Builder components
│   │   └── print/
│   │       └── OfficialPaperPrintModal.jsx            <- Statutory IPO Official PDF Layout Generator
│   ├── services/
│   │   └── patentApiService.js                        <- Connects React with CodeIgniter REST endpoints
│   └── data/
│       ├── prebuiltTemplates.js                       <- Pre-engineered Form 1, Form 2, Form 3, Form 18, Form 26
│       └── mockPatents.js                             <- Offline fallback patent mock data
├── COMPILED_ASSETS/                                   <- Production bundle (HTML, JS, CSS)
│   ├── index.html
│   └── assets/
└── README_SETUP_AND_CHANGES_GUIDE.md                  <- This guide
```

---

## 🗄️ 1. Database Setup & Architecture

### A. Database Connection (100% Isolated Standalone Database)
- **Host:** `127.0.0.1`
- **Port:** `3307` (WAMP MariaDB) or `3306`
- **Database:** `patent_forms_standalone_db` *(Completely separate! Main `brainiac7_patent` / `brainia6_patent` is NOT touched)*
- **User:** `root`
- **Password:** `(blank)`

### B. Previous / Existing System Tables Used
1. **`patentapplication`**: Reads existing patent files (`fileNo`, `applicationNo`, `titleOfInvention`, `dateOfFiling`, `applicantsId`, `typeOfApplication`, `inventorsData`).
2. **`applicants`**: Resolves applicant names and addresses using the IDs in `applicantsId`.
3. **`patentcountry`**: Fetches foreign filings for Section 8 statements (`countryAbbreviation`, `countryDate`, `countryComment`, `isStop`).

### C. New Database Table Created
To store filled form data and drafts without altering existing tables, we created:

```sql
CREATE TABLE IF NOT EXISTS `patent_form_submissions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `file_no` VARCHAR(250) NOT NULL COMMENT 'Connected Patent File No (e.g. 641D, 634P, 645P)',
  `form_code` VARCHAR(100) NOT NULL COMMENT 'Unique Form ID (e.g. indian_patent_form_1, indian_patent_form_3)',
  `form_title` VARCHAR(255) NOT NULL COMMENT 'Display Title of statutory form',
  `form_data` LONGTEXT NOT NULL COMMENT 'JSON payload of filled fields & dynamic SQL tables',
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft' COMMENT 'draft | submitted',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_file_no` (`file_no`),
  KEY `idx_form_code` (`form_code`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## ⚙️ 2. Backend Code Changes

### Model: `PatentForms_model.php`
- **`ensureSubmissionsTable()`**: Automatically creates the `patent_form_submissions` table if it does not exist yet.
- **`getAllPatentList()`**: Returns all active patent files from `patentapplication`.
- **`getPatentByFileNo($fileNo)`**: Performs relational lookups across `patentapplication`, `applicants`, and `patentcountry`.
- **`saveSubmission($fileNo, $formCode, $formTitle, $formData, $status)`**: Inserts or updates form drafts in MySQL.
- **`getSubmissions($fileNo)`**: Retrieves saved form records for display.

### Controller: `PatentForms.php`
- **`index()` (`/index.php/PatentForms`)**:
  Renders the **Patent Forms Builder** templates catalog.
- **`fill()` (`/index.php/PatentForms/fill`)**:
  Renders the **Fill Patent Form (Auto-Fill & Submissions)** hub.
- **REST APIs:**
  - `GET /index.php/PatentForms/api_patents`: Returns list of patent files.
  - `GET /index.php/PatentForms/api_lookup/{fileNo}`: Returns all patent details + applicants + foreign filings.
  - `POST /index.php/PatentForms/api_save`: Saves form data to database.
  - `GET /index.php/PatentForms/api_submissions`: Returns saved form records.

---

## 🖥️ 3. Frontend Sessions Separation

### 1. Patent Forms Builder (`/PatentForms`)
- Shows statutory templates (Form 1, Form 2, Form 3, Form 5, Form 18, Form 26, etc.).
- Actions: **`[+ Add Form]`**, **`[Manage Form]`**, **`[...]`** (Edit, Duplicate, Delete).
- Completely clean: no filing dropdowns and no submission records table.

### 2. Fill Patent Form Session (`/PatentForms/fill`)
- **Top "New Filing" Bar:**
  - Form selector dropdown (Form 1, Form 3, etc.)
  - File No selector dropdown (`641D`, `634P`, `645P`, etc.)
  - **`[+ Create & Fill Form]`** button
  - **`[↻ Refresh]`** button
- **Filled Patent Forms Table:**
  - Lists all saved records directly from MySQL with File No, Form Name, Title/Applicant, Status, and Date.
  - Actions: **`[📄 PDF Report]`**, **`[✏️ Open & Fill]`**, and **`[🗑️ Delete]`**.
- **Interactive Form Canvas:**
  - Automatically loads when clicking *Create & Fill* or *Open & Fill*.
  - Auto-fills all patent fields and dynamic applicant/foreign filing tables from MySQL.
  - Clicking **`[← Forms List]`** returns directly to the Filled Patent Forms hub.

---

## 🚀 4. How to Deploy to Another System

1. **Database:**
   Run `DATABASE/01_CREATE_TABLE_patent_form_submissions.sql` and `DATABASE/02_SAMPLE_DATA_AND_SEEDS.sql` in phpMyAdmin or MySQL CLI.
2. **Backend:**
   Copy files from `BACKEND_CODEIGNITER/` to your CodeIgniter installation:
   - `controllers/PatentForms.php` -> `application/controllers/`
   - `models/PatentForms_model.php` -> `application/models/`
   - `views/header.php` -> `application/views/`
   - `views/patent_forms.php` -> `application/views/`
3. **Frontend Production Assets:**
   Copy the contents of `COMPILED_ASSETS/` to `assets/form_builder/` in your CodeIgniter root.

---

## 🧭 5. Left Navigation Menu: Patent Section Isolation

Per statutory practice requirements, the portal's left sidebar navigation menu strictly displays **ONLY the Patent Section** (all other portal sections such as Admin Dashboard, Financial Dashboard, Trademarks, Invoices, Leaves, etc., are hidden):

1. **Add Patent/Design Application** (`site_url("AddPatentDesign")` / `add_patent`):
   - Full statutory patent entry with 28+ fields, applicant dynamic tables, and foreign priority tracking.
2. **Patent/Design List** (`site_url("UpdatePatent")` / `patent_list`):
   - Comprehensive tabular database of patents, statutory search, filter by status, and 1-click actions:
     - `[Fill Form]` (navigates to auto-fill)
     - `[Builder]` (opens visual form builder)
3. **Reminder Panel** (`site_url("Reminder")` / `patent_reminder`):
   - Abandonment and statutory deadline surveillance (Provisional 12-month complete spec, Form 18 48-month examination request, PCT national phase).
4. **Patent Forms Builder** (`site_url("PatentForms")` / `patent_builder`):
   - Visual drag-and-drop form designer with component palette, dynamic JSON schema export, and official layout generator.
5. **Fill Patent Form (Auto-Fill)** (`site_url("PatentForms/fill")` / `patent_fill`):
   - 1-click database population of official Indian Patent Office forms (Form 1, 2, 3, 5, 18, 26, 30) with official paper print preview.

---

## 🎨 6. Modern Light Professional UI Theme

- **Clean Minimal Top Bar**: Pristine white (`#ffffff`) background with subtle bottom border (`#e2e8f0`), soft shadow, dark slate typography (`#0f172a`), refined sidebar toggle button, expanded universal File No search, and attorney accreditation badge (uncluttered: green gateway pill and top action buttons removed).
- **Sidebar (Subtle Light Blue Tone)**: Soft, refreshing light blue (`#f0f7ff`) with a delicate blue-slate border (`#d0e2f5`), dark navy/slate navigation text (`#1e3a8a` to `#2d4a6f`), and active items highlighted with soft light blue / color accents (`#dbeafe` with `#2563eb` indicator).
- **Patent Section Only & No Distracting Badges**: Navigation strictly limited to the 5 patent statutory modules with zero clutter (section banner and side pill badges removed for clean minimalism).
- **Data Cards & Views**: Clean white surfaces, subtle 1px slate borders, high-contrast readable inputs, and statutory compliance.

