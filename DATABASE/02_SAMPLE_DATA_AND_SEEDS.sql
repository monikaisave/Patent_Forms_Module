-- ==============================================================================
-- BRAINIAC IP SOLUTIONS - PATENT FORMS MODULE
-- Target Database: patent_forms_standalone_db
-- (Completely isolated from main brainiac7_patent / brainia6_patent database)
-- ==============================================================================

USE `patent_forms_standalone_db`;

INSERT INTO `patent_form_submissions` (`id`, `file_no`, `form_code`, `form_title`, `form_data`, `status`, `created_at`, `updated_at`)
VALUES 
(
  1,
  '641D',
  'indian_patent_form_1',
  'FORM 1: Application for Grant of Patent',
  '{\"patent_file_no\":\"641D\",\"title\":\"Stationary Holder for Table\",\"app_no\":\"PrN: 1027\",\"type_of_application\":\"Ordinary Application\",\"status\":\"Pending\",\"table_applicants\":[{\"name\":\"Stationary Innovators Pvt Ltd\",\"nationality\":\"Indian\",\"address\":\"Plot 44, Hadapsar Industrial Estate, Pune 411028\"}]}',
  'submitted',
  '2026-10-08 16:45:26',
  '2026-10-08 16:45:26'
),
(
  2,
  '634P',
  'indian_patent_form_3',
  'FORM 3: Statement & Undertaking under Section 8',
  '{\"patent_file_no\":\"634P\",\"title\":\"A method for modifying Petrol-powered two-wheelers to electrically powered\",\"app_no\":\"634P/2021\",\"type_of_application\":\"Ordinary Application\",\"table_applicants\":[{\"name\":\"SANRUP Engineering Solutions\",\"nationality\":\"Indian\",\"address\":\"Sector 12, Bhosari MIDC, Pune 411026\"}],\"table_foreign_filings\":[{\"country\":\"United States (USPTO)\",\"appDate\":\"2022-03-15\",\"appNo\":\"US 17/992,104\",\"status\":\"Pending Examination\",\"pubDate\":\"2022-09-20\",\"grantDate\":\"—\"}]}',
  'submitted',
  '2026-10-08 16:04:45',
  '2026-10-08 16:04:45'
),
(
  3,
  '645P',
  'indian_patent_form_3',
  'FORM 3: Statement & Undertaking under Section 8',
  '{\"patent_file_no\":\"645P\",\"title\":\"Automated System for Opening and Closing Sliding Doors\",\"app_no\":\"645P/ 2021\",\"type_of_application\":\"Ordinary Application\",\"table_applicants\":[{\"name\":\"AutoDoor Tech LLP\",\"nationality\":\"Indian\",\"address\":\"Baner Road, Pune 411045\"}]}',
  'draft',
  '2026-10-08 15:45:10',
  '2026-10-08 15:45:10'
)
ON DUPLICATE KEY UPDATE 
  `file_no` = VALUES(`file_no`),
  `form_code` = VALUES(`form_code`),
  `form_title` = VALUES(`form_title`),
  `form_data` = VALUES(`form_data`),
  `status` = VALUES(`status`);
