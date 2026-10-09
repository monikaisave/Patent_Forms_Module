-- ==============================================================================
-- 🏛️ BRAINIAC IP SOLUTIONS - STANDALONE PATENT FORMS DATABASE SETUP
-- Database Name: `patent_forms_standalone_db`
-- Engine: MySQL / MariaDB (Port 3307 or 3306)
-- UTF-8: utf8mb4_unicode_ci
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `patent_forms_standalone_db` 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `patent_forms_standalone_db`;

-- ------------------------------------------------------------------------------
-- Table 1: `patentapplication` (Active Registered Patent & Design Files)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `patentapplication`;
CREATE TABLE `patentapplication` (
  `patentId` int(11) NOT NULL AUTO_INCREMENT,
  `fileNo` varchar(250) NOT NULL COMMENT 'Unique Patent File Number (e.g. 641D, 634P, 645P)',
  `type` varchar(100) DEFAULT 'Patent' COMMENT 'Patent | Design',
  `clientRefNo` varchar(250) DEFAULT '',
  `applicationNo` varchar(250) DEFAULT '' COMMENT 'IPO Statutory Application Number',
  `titleOfInvention` text DEFAULT NULL,
  `dateOfFiling` date DEFAULT NULL,
  `priorityDate` date DEFAULT NULL,
  `publicationDate` date DEFAULT NULL,
  `provisionalDateOfApplication` date DEFAULT NULL,
  `completeDateoOfFiling` date DEFAULT NULL,
  `typeOfApplication` varchar(150) DEFAULT 'Ordinary Application',
  `pct` varchar(10) DEFAULT 'no',
  `pctapplicationno` varchar(100) DEFAULT '',
  `pctDateOfFiling` date DEFAULT NULL,
  `granted` varchar(10) DEFAULT 'no',
  `grantedDate` date DEFAULT NULL,
  `patentNumber` varchar(100) DEFAULT 'Pending',
  `applicantsId` varchar(250) DEFAULT '' COMMENT 'Comma-separated applicant IDs',
  `inventorsData` text DEFAULT NULL,
  PRIMARY KEY (`patentId`),
  UNIQUE KEY `idx_fileNo` (`fileNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table 2: `applicants` (Applicants, Inventors, Institutions, & Addresses)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `applicants`;
CREATE TABLE `applicants` (
  `applicantId` int(11) NOT NULL AUTO_INCREMENT,
  `applicantName` varchar(255) NOT NULL,
  `applicantAddress` text DEFAULT NULL,
  `applicantEmail` varchar(255) DEFAULT '',
  `applicantPhone` varchar(50) DEFAULT '',
  `isDelete` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`applicantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table 3: `patentcountry` (Foreign Filing Particulars for Form 3 Section 8)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `patentcountry`;
CREATE TABLE `patentcountry` (
  `pCountryId` int(11) NOT NULL AUTO_INCREMENT,
  `fileNo` varchar(250) NOT NULL,
  `countryAbbreviation` varchar(255) NOT NULL COMMENT 'Country Name / Jurisdiction',
  `countryDate` varchar(100) DEFAULT NULL COMMENT 'Date of Filing',
  `countryComment` varchar(255) DEFAULT NULL COMMENT 'Foreign Application No',
  `isStop` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`pCountryId`),
  KEY `idx_fileNo_country` (`fileNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table 4: `patent_form_submissions` (Submitted Forms, Drafts, and JSON Payloads)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `patent_form_submissions`;
CREATE TABLE `patent_form_submissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_no` varchar(250) NOT NULL COMMENT 'Linked Patent File No (e.g. 641D, 634P)',
  `form_code` varchar(100) NOT NULL COMMENT 'Unique Form ID (e.g. indian_patent_form_1)',
  `form_title` varchar(255) NOT NULL COMMENT 'Display Title of statutory form',
  `form_data` longtext NOT NULL COMMENT 'JSON payload of filled form fields & dynamic tables',
  `status` varchar(50) NOT NULL DEFAULT 'draft' COMMENT 'draft | submitted',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_file_no` (`file_no`),
  KEY `idx_form_code` (`form_code`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 📦 SEED DATA INSERTION
-- ==============================================================================

-- 1. Applicants
INSERT INTO `applicants` (`applicantId`, `applicantName`, `applicantAddress`, `applicantEmail`, `applicantPhone`) VALUES
(1, 'Shri Ramdeobaba College of Engineering and Management', 'Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013, Maharashtra, India', 'principal@rknec.edu', '0712-2580011'),
(2, 'PANDHURNEKAR, Chandrashekhar P.', 'Dept. of Chemistry, Shri Ramdeobaba College of Engineering and Management, Nagpur 440013', 'pandhurnekar@rknec.edu', '09822731111'),
(3, 'SANRUP Engineering Consulting & Contracting LLP', 'B-2105/6 Lake Lucerne, Lake Homes, Powai, Mumbai - 400076', 'contact@sanrup.com', '022-28574400'),
(4, 'Technovate Solutions Private Limited', 'Baner Road, Pune 411045, Maharashtra', 'ip@technovate.in', '020-66442200'),
(5, 'Dr. Rajeshwar Sharma', 'Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103', 'r.sharma@onconano.org', '+91 98450 12345'),
(6, 'Dr. Ananya Roy', '12B Southern Avenue, Kolkata 700029', 'a.roy@biotech-labs.in', '+91 98300 67890');

-- 2. Patents
INSERT INTO `patentapplication` 
(`patentId`, `fileNo`, `type`, `clientRefNo`, `applicationNo`, `titleOfInvention`, `dateOfFiling`, `priorityDate`, `publicationDate`, `typeOfApplication`, `applicantsId`) VALUES
(1, '641D', 'Design', 'PrN: 1027', '347734-001', 'Stationary Holder for Table', '2021-08-10', '2021-08-10', '2021-10-15', 'Ordinary Application', '1,2'),
(2, '634P', 'Patent', '634P/2021', '202121030969', 'A method for modifying Petrol-powered two-wheelers to electrically powered two-wheelers', '2021-07-09', '2021-07-09', '2021-09-20', 'Ordinary Application', '3'),
(3, '645P', 'Patent', '645P/ 2021', '202127037549', 'Automated System for Opening and Closing Sliding Doors and Windows', '2021-08-18', '2021-08-18', '2021-11-05', 'Ordinary Application', '4'),
(4, 'IN-202411039821', 'Patent', 'CRN-ONCO-2024', '202411039821', 'AI-Powered Microfluidic Biosensor for Ultra-Early Oncological Biomarker Detection', '2024-06-12', '2023-12-18', '2024-11-20', 'Ordinary Application', '5,6');

-- 3. Foreign Filings
INSERT INTO `patentcountry` (`fileNo`, `countryAbbreviation`, `countryDate`, `countryComment`, `isStop`) VALUES
('634P', 'United States (USPTO)', '2022-01-15', 'US 17/982,143', 0),
('634P', 'European Patent Office (EPO)', '2022-02-20', 'EP 22167890.1', 0),
('645P', 'European Patent Office (EPO)', '2022-02-10', 'EP 22158931.0', 0),
('IN-202411039821', 'United States (USPTO)', '2024-05-20', 'US 18/921,012', 0),
('IN-202411039821', 'European Patent Office (EPO)', '2024-05-22', 'EP 24178901.2', 0),
('IN-202411039821', 'Japan (JPO)', '2024-05-25', 'JP 2024-089123', 0);
