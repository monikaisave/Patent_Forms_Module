-- ==============================================================================
-- BRAINIAC IP SOLUTIONS - PATENT SYSTEM RELATIONAL SCHEMA REFERENCE
-- Documents existing core database tables that feed data into statutory forms:
-- 1. patentapplication (Core Patent Files)
-- 2. applicants (Applicant Directory)
-- Standalone Database: patent_forms_standalone_db
-- (Completely isolated from main brainiac7_patent / brainia6_patent database)
-- ==============================================================================

USE `patent_forms_standalone_db`;

-- ------------------------------------------------------------------------------
-- 1. patentapplication (Master Patent Registry)
-- Key columns used by PatentForms_model.php:
-- ------------------------------------------------------------------------------
-- patentId                  INT PRIMARY KEY
-- fileNo                    VARCHAR(250) (e.g. '641D', '634P', '645P')
-- type                      VARCHAR(50)  (e.g. 'Patent', 'Design')
-- clientRefNo               VARCHAR(250)
-- applicationNo             VARCHAR(250) (e.g. '634P/2021')
-- titleOfInvention          TEXT
-- dateOfFiling              DATE
-- priorityDate              DATE
-- publicationDate           DATE
-- provisionalDateOfApplication DATE
-- completeDateoOfFiling     DATE
-- typeOfApplication         VARCHAR(100) (e.g. 'Ordinary Application')
-- applicantsId              VARCHAR(255) (Comma-separated IDs, e.g. '12,15')
-- inventorsData             TEXT (Serialized PHP array of inventors)
-- pct                       VARCHAR(10)
-- pctapplicationno          VARCHAR(100)
-- pctDateOfFiling           DATE
-- granted                   VARCHAR(10)  ('yes' / 'no')
-- grantedDate               DATE
-- patentNumber              VARCHAR(100)

-- ------------------------------------------------------------------------------
-- 2. applicants (Applicant Directory)
-- ------------------------------------------------------------------------------
-- applicantId               INT PRIMARY KEY
-- applicantName             VARCHAR(255)
-- applicantAddress          TEXT
-- applicantEmail            VARCHAR(150)
-- applicantPhone            VARCHAR(50)
-- isDelete                  TINYINT(1) (0 = Active, 1 = Deleted)

-- ------------------------------------------------------------------------------
-- 3. patentcountry (Foreign Filings / Section 8 Particulars)
-- ------------------------------------------------------------------------------
-- pCountryId                INT PRIMARY KEY
-- fileNo                    VARCHAR(250) (Foreign Key linking to patentapplication.fileNo)
-- countryAbbreviation       VARCHAR(100) (e.g. 'United States (USPTO)')
-- countryDate               DATE         (Application date in foreign jurisdiction)
-- countryComment            VARCHAR(255) (Foreign Application No)
-- isStop                    TINYINT(1)   (0 = Pending, 1 = Abandoned)

-- ------------------------------------------------------------------------------
-- EXAMPLE JOIN QUERY: How the backend auto-populates statutory Form 1 and Form 3
-- ------------------------------------------------------------------------------
SELECT 
    p.fileNo,
    p.applicationNo,
    p.titleOfInvention,
    p.dateOfFiling,
    p.typeOfApplication,
    a.applicantName,
    a.applicantAddress,
    pc.countryAbbreviation AS foreign_country,
    pc.countryDate AS foreign_app_date,
    pc.countryComment AS foreign_app_no
FROM patentapplication p
LEFT JOIN applicants a ON FIND_IN_SET(a.applicantId, p.applicantsId)
LEFT JOIN patentcountry pc ON pc.fileNo = p.fileNo
WHERE p.fileNo = '634P';
