-- ==============================================================================
-- BRAINIAC IP SOLUTIONS - PATENT FORMS MODULE
-- Table: patent_form_submissions
-- Description: Stores all filled statutory patent forms (Form 1, Form 3, etc.),
--              drafts, submitted states, and auto-populated dynamic table data.
-- Database: patent_forms_standalone_db (MySQL / MariaDB)
-- (Completely isolated from main brainiac7_patent / brainia6_patent database)
-- ==============================================================================

USE `patent_forms_standalone_db`;

CREATE TABLE IF NOT EXISTS `patent_form_submissions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `file_no` VARCHAR(250) NOT NULL COMMENT 'Connected Patent File No (e.g. 641D, 634P, 645P)',
  `form_code` VARCHAR(100) NOT NULL COMMENT 'Unique Form ID (e.g. indian_patent_form_1, indian_patent_form_3)',
  `form_title` VARCHAR(255) NOT NULL COMMENT 'Display Title of statutory form',
  `form_data` LONGTEXT NOT NULL COMMENT 'JSON payload containing all filled fields, applicant tables, Section 8 foreign filings',
  `status` VARCHAR(50) NOT NULL DEFAULT 'draft' COMMENT 'Status: draft | submitted',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_file_no` (`file_no`),
  KEY `idx_form_code` (`form_code`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
