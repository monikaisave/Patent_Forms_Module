// Comprehensive catalog of Multiple Pre-built Forms
// Users can select any particular form into the drag-and-drop canvas
export const PREBUILT_TEMPLATES = [
  // 1. FORM 3 - Indian Patent Act Section 8
  {
    id: "indian_patent_form_3",
    title: "FORM 3: Statement & Undertaking under Section 8",
    shortName: "Form 3 (Section 8)",
    actReference: "The Patents Act 1970 (39 OF 1970) & The Patents Rules, 2003",
    category: "Indian Patent Office (IPO)",
    categoryCode: "IN",
    badgeColor: "#16a34a",
    description: "Official statutory statement under Section 8 & Rule 12 with dynamic SQL tables for applicants & foreign filings plus static undertakings.",
    jurisdiction: "IPO (Indian Patent Office / Mumbai)",
    version: "3.0",
    sections: [
      {
        id: "sec_form3_body",
        title: "STATEMENT AND UNDERTAKING UNDER SECTION 8",
        description: "Official Statutory Document (See section 8 and rule 12)"
      }
    ],
    fields: [
      {
        id: "static_form3_header",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_form3_body",
        label: "Document Header & Title",
        content: `FORM 3
THE PATENTS ACT 1970
(39 OF 1970)
&
The Patents Rules, 2003
STATEMENT AND UNDERTAKING UNDER SECTION 8
(See section 8 and rule 12)

We,`
      },
      {
        id: "table_applicants",
        type: "dynamic_table",
        name: "Table A: Applicants / Inventors Roster",
        label: "Table A: Applicants & Inventors (Dynamic SQL Table)",
        width: 100,
        sectionId: "sec_form3_body",
        isAutoCaptured: true,
        apiMapping: "patent.tableApplicants",
        columns: [
          { key: "name", label: "Name", placeholder: "Full Legal Name" },
          { key: "nationality", label: "Nationality", placeholder: "Indian / US" },
          { key: "address", label: "Address", placeholder: "Residence Address" }
        ],
        defaultRows: [
          { name: "Dr. Rajeshwar Sharma", nationality: "Indian", address: "Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103" },
          { name: "Dr. Ananya Roy", nationality: "Indian", address: "12B Southern Avenue, Kolkata 700029" }
        ]
      },
      {
        id: "static_undertaking_1",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_form3_body",
        label: "Static Legal Declaration (i) & (ii)",
        content: `hereby declare:

(i) that we have not made any application for the same/substantially the same invention outside India (________________ dated ________________).

                                                OR

(ii) that I/We who have made this application No. {app_no} dated {app_date} alone/jointly with, made for the same/substantially same invention, application(s) for patent in the other countries, the particulars of which are given below:`
      },
      {
        id: "table_foreign_filings",
        type: "dynamic_table",
        name: "Foreign Filings Particulars Table",
        label: "Section 8 Foreign Filings Particulars (Dynamic SQL Table)",
        width: 100,
        sectionId: "sec_form3_body",
        isAutoCaptured: true,
        apiMapping: "patent.tableForeignFilings",
        columns: [
          { key: "country", label: "Name of the country", placeholder: "United States" },
          { key: "appDate", label: "Date of application", placeholder: "YYYY-MM-DD" },
          { key: "appNo", label: "Application No.", placeholder: "App Number" },
          { key: "status", label: "Status of application", placeholder: "Pending / Granted" },
          { key: "pubDate", label: "Date of publication", placeholder: "YYYY-MM-DD" },
          { key: "grantDate", label: "Date of grant", placeholder: "YYYY-MM-DD" }
        ],
        defaultRows: [
          { country: "United States (USPTO)", appDate: "2024-05-20", appNo: "US 18/921,012", status: "Pending Examination", pubDate: "2024-08-15", grantDate: "—" },
          { country: "European Patent Office (EPO)", appDate: "2024-05-22", appNo: "EP 24178901.2", status: "Published", pubDate: "2024-09-01", grantDate: "—" },
          { country: "Japan (JPO)", appDate: "2024-05-25", appNo: "JP 2024-089123", status: "Under Examination", pubDate: "—", grantDate: "—" }
        ]
      },
      {
        id: "static_undertaking_2",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_form3_body",
        label: "3. Assignee Rights & Mandatory 3-Month Reporting Undertaking",
        content: `3. Name and Address of Assignee:
OncoNano Diagnostics Pvt. Ltd., Plot 42, Electronic City Phase 1, Hosur Road, Bengaluru 560100

iii) that the rights in the application(s) has/have been assigned to us and that I undertake that up-to the date of grant of the patent, by the Controller, we would keep him informed in writing the details regarding corresponding applications for patents filed outside India within three months from the date of filing of such application.`
      },
      {
        id: "static_signature_block",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_form3_body",
        label: "Official Sign-Off & Patent Agent Execution",
        content: `Date: 07/10/2026

To,
The Controller of Patents
The Patent Office at Mumbai

                                                    _____________________________________
                                                    Suneet Baliram Sabale
                                                    (Agent for Applicant)
                                                    Reg. No: IN/PA-1773`
      }
    ]
  },

  // 2. FORM 1 - Indian Patent Act (Photographed official physical sheet)
  {
    id: "indian_patent_form_1",
    title: "FORM 1: Application for Grant of Patent",
    shortName: "Form 1 (Grant of Patent)",
    actReference: "THE PATENTS ACT 1970 (39 of 1970) & The Patents Rules, 2005 (See sections 7, 54 & 135 and rule 20(1))",
    category: "Indian Patent Office (IPO)",
    categoryCode: "IN",
    badgeColor: "#0284c7",
    description: "Official statutory Form 1 for patent grant application with office use box, applicant roster, inventor details, agent details, declarations, attachments table, and fee sign-off.",
    jurisdiction: "IPO (The Patent Office at Mumbai)",
    version: "4.0",
    sections: [
      {
        id: "sec_f1_header",
        title: "FORM 1 & OFFICE USE SECTION",
        description: "Statutory Header & Official CBR Application Record (Page 1/4)"
      },
      {
        id: "sec_f1_app_details",
        title: "1 & 2. IDENTIFICATION & APPLICATION TYPE",
        description: "Applicant reference and patent application classification"
      },
      {
        id: "sec_f1_roster",
        title: "3 & 4. APPLICANT(S) & INVENTOR(S) DETAILS",
        description: "Tables 3A, 3B, 4 & Inventor roster auto-captured from SQL database"
      },
      {
        id: "sec_f1_invention_agent",
        title: "5, 6 & 7. TITLE, AUTHORIZED AGENT & ADDRESS FOR SERVICE",
        description: "Invention title, registered patent agent and official service address in India"
      },
      {
        id: "sec_f1_declarations",
        title: "STATUTORY DECLARATIONS & UNDERTAKINGS",
        description: "Official legal declarations under Section 7, Convention, PCT & Divisional (Page 3/4)"
      },
      {
        id: "sec_f1_attachments",
        title: "13. ATTACHMENTS & SPECIFICATION METRICS",
        description: "Particulars of pages, claims, drawings, abstract and statutory enclosures"
      },
      {
        id: "sec_f1_signoff",
        title: "FEES & OFFICIAL SIGN-OFF",
        description: "Fee payment statement, formal undertaking & patent agent execution (Page 4/4)"
      }
    ],
    fields: [
      // Page 1 Header
      {
        id: "static_f1_title_banner",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_f1_header",
        label: "Official Form 1 Heading & Reference",
        content: `FORM 1
THE PATENTS ACT 1970
(39 of 1970)
&
The Patents Rules, 2005
APPLICATION FOR GRANT OF PATENT
(See sections 7, 54 & 135 and rule 20(1))`
      },
      {
        id: "f1_office_use_box",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_f1_header",
        label: "(FOR OFFICE USE ONLY) Official CBR Record",
        content: `(FOR OFFICE USE ONLY)
Application No.: {app_no}
Filing Date: {filing_date}
Amount of Fees Paid: ₹ 8,000/- (Online transfer)
CBR NO.: CBR-IPO-2024-99182
Signature: __________________________ (IPO Authorized Officer)`
      },

      // Section 1 & 2
      {
        id: "f1_applicant_ref_no",
        name: "1. APPLICANT'S Reference / Identification No:",
        label: "1. APPLICANT'S Reference / Identification No:",
        type: "text",
        width: 50,
        sectionId: "sec_f1_app_details",
        isAutoCaptured: true,
        apiMapping: "patent.fileNo",
        defaultValue: "CRN-ONCO-2024",
        placeholder: "e.g. CRN-ONCO-2024 / IN-202411039821",
        required: true
      },
      {
        id: "f1_application_type",
        name: "2. Type of Application:",
        label: "2. Type of Application (Dropdown):",
        type: "dropdown",
        width: 50,
        sectionId: "sec_f1_app_details",
        defaultValue: "Ordinary Application",
        options: [
          { label: "Ordinary Application", value: "Ordinary Application" },
          { label: "Convention Application", value: "Convention Application" },
          { label: "PCT-NP (PCT National Phase Application)", value: "PCT-NP" },
          { label: "Divisional Application", value: "Divisional Application" },
          { label: "Patent of Addition", value: "Patent of Addition" }
        ],
        required: true
      },

      // Section 3A & 3B & 4
      {
        id: "table_applicants",
        type: "dynamic_table",
        name: "3A. Applicant(s)",
        label: "3A. Applicant(s) (Dynamic SQL Table)",
        width: 100,
        sectionId: "sec_f1_roster",
        isAutoCaptured: true,
        apiMapping: "patent.tableApplicants",
        columns: [
          { key: "name", label: "Name", placeholder: "Applicant Legal Entity Name" },
          { key: "nationality", label: "Nationality", placeholder: "e.g. Indian" },
          { key: "address", label: "Address", placeholder: "Registered Office Address" }
        ],
        defaultRows: [
          { name: "OncoNano Diagnostics Pvt. Ltd.", nationality: "Indian", address: "Plot 42, Electronic City Phase 1, Hosur Road, Bengaluru 560100" }
        ]
      },
      {
        id: "f1_applicant_category",
        name: "3B. Category of Applicant:",
        label: "3B. Category of Applicant (Dropdown):",
        type: "dropdown",
        width: 50,
        sectionId: "sec_f1_roster",
        defaultValue: "Small Entity",
        options: [
          { label: "Natural Person", value: "Natural Person" },
          { label: "Small Entity", value: "Small Entity" },
          { label: "Educational Institute", value: "Educational Institute" },
          { label: "Start-up", value: "Start-up" },
          { label: "Large Entity / Other than natural Person", value: "Large Entity / Other than natural Person" }
        ],
        required: true
      },
      {
        id: "f1_inventors_same",
        name: "4. All Inventors Same as applicant:",
        label: "4. All Inventors Same as applicant (Dropdown / Choice):",
        type: "dropdown",
        width: 50,
        sectionId: "sec_f1_roster",
        defaultValue: "No",
        options: [
          { label: "No (Applicant is Assignee Company / Institute)", value: "No" },
          { label: "Yes (Inventors are Applicants directly)", value: "Yes" }
        ],
        required: true
      },

      // Section 4: INVENTOR(S) DETAILS
      {
        id: "table_inventors",
        type: "dynamic_table",
        name: "INVENTOR(S) DETAILS",
        label: "INVENTOR(S) DETAILS (Dynamic SQL Table)",
        width: 100,
        sectionId: "sec_f1_roster",
        isAutoCaptured: true,
        apiMapping: "patent.tableApplicants",
        columns: [
          { key: "name", label: "Name", placeholder: "Inventor Full Name" },
          { key: "nationality", label: "Nationality", placeholder: "Nationality" },
          { key: "address", label: "Address", placeholder: "Permanent Residential Address" }
        ],
        defaultRows: [
          { name: "Dr. Rajeshwar Sharma", nationality: "Indian", address: "Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103" },
          { name: "Dr. Ananya Roy", nationality: "Indian", address: "12B Southern Avenue, Kolkata 700029" }
        ]
      },

      // Section 5, 6 & 7
      {
        id: "f1_invention_title",
        name: "5. TITLE OF THE INVENTION:",
        label: "5. TITLE OF THE INVENTION:",
        type: "text",
        width: 100,
        sectionId: "sec_f1_invention_agent",
        isAutoCaptured: true,
        apiMapping: "patent.title",
        defaultValue: "AI-Powered Microfluidic Biosensor for Ultra-Early Oncological Biomarker Detection",
        placeholder: "Enter title of the invention as mentioned in specification...",
        required: true
      },
      {
        id: "static_patent_agent",
        type: "static_text",
        isStatic: true,
        width: 50,
        sectionId: "sec_f1_invention_agent",
        label: "6. AUTHORIZED PATENT AGENT IN INDIA",
        content: `6. AUTHORIZED PATENT AGENT IN INDIA:

IN/PA NO: 1773
Name: Suneet Baliram Sabale
Tel. No.: 09112299453
Fax No.: 022 39167270
Mobile No.: 09730140003 / 7517659030
E-mail: patent@brainiac.co.in`
      },
      {
        id: "static_address_for_service",
        type: "static_text",
        isStatic: true,
        width: 50,
        sectionId: "sec_f1_invention_agent",
        label: "7. ADDRESS FOR SERVICE OF APPLICANT",
        content: `7. ADDRESS FOR SERVICE OF APPLICANT:

Suneet Baliram Sabale
C/o Brainiac IP Solutions,
Office no - 303, Third Floor, Navale Icon,
Near Navale Bridge, Mumbai Pune Highway,
Narhe, Pune, -411041 MH. India.`
      },

      // Declarations Section (Page 3/4)
      {
        id: "static_f1_declarations",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_f1_declarations",
        label: "Official Statutory Declarations & Undertakings (i, ii, iii)",
        content: `(i) Declaration by the inventor(s):
We, the above named inventor(s) are the true & first inventor(s) for this invention.

(ii) Declaration by applicant(s) in the convention country:
We, the applicant(s) in the convention country declare that the applicant(s) herein are our assignee or legal representative.

(iii) Declaration by applicant(s):
□ The invention as disclosed in the specification uses the biological material from India and the necessary permission from the competent authority shall be submitted by us before the grant of patent to us: N.A.
☑ There is no lawful ground of objection to the grant of the patent to us: Yes
☑ We are the assignees or legal representatives of true and first inventors: YES
□ The application or each of the applications, particulars of which are given in Para - 8 was the first application in convention country/countries in respect of our invention: N.A.
□ We claim the priority from the above mentioned application filed in convention country/countries and state that no application for protection in respect of the invention had been made in a convention country before that date by us or by any person from which we derive the title: N.A.
□ Our application in India is based on international application under Patent Cooperation Treaty (PCT) as mentioned in Para-9: N.A.
□ The application is divided out of our application particulars of which are given in Para-10 and pray that this application may be treated as deemed to have been filed on N.A. under sec. 16 of the Act: N.A.
□ The said invention is an improvement in or modification of the invention particulars of which are given in Para-11 : N.A.`
      },

      // Section 13: Attachments
      {
        id: "table_f1_attachments",
        type: "dynamic_table",
        name: "13. Following are the attachments with the application:",
        label: "13. Attachments Metric Breakdown (Dynamic SQL Table)",
        width: 100,
        sectionId: "sec_f1_attachments",
        columns: [
          { key: "item", label: "Item", placeholder: "Item" },
          { key: "details", label: "Details", placeholder: "Counts / Pages" },
          { key: "fee", label: "Fee (₹)", placeholder: "Fee" },
          { key: "remarks", label: "Remarks", placeholder: "Remarks" }
        ],
        defaultRows: [
          { item: "Complete/Provisional", details: "No: of Pages: 28", fee: "₹ 8,000", remarks: "Complete Specification" },
          { item: "No. of Claim(s)", details: "No: of Claims: 20 | No: of Pages: 4", fee: "₹ 0", remarks: "Within base limit" },
          { item: "Abstract", details: "No: of Pages: 1", fee: "₹ 0", remarks: "Technical Abstract" },
          { item: "No. of Drawings", details: "No: of Drawings: 6 | No: of Pages: 5", fee: "₹ 0", remarks: "Drawing Sheets" }
        ]
      },
      {
        id: "static_f1_enclosures",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_f1_attachments",
        label: "Statutory Enclosures Checklist (b to j)",
        content: `# In case of a complete specification, if the applicant desires to adopt the drawings filed with his provisional specification as the drawings or part of the drawings for the complete specification under rule 13(4), the number of such pages filed with the provisional specification are required to be mentioned here:

☑ (b) Complete specification (in conformation with the international application)/as amended before the International Preliminary Examination Authority (IPEA), as applicable (2 copies).
□ (c) Sequence listing in electronic form
☑ (d) Drawings (in conformation with the international application)/as amended before the International Preliminary Examination Authority (IPEA), as applicable (2 copies).
□ (e) Priority document(s) or a request to retrieve the priority document(s) from DAS (Digital Access Service) if the applicant had already requested the office of first filing to make the priority document(s) available to DAS.
□ (f) Translation of priority document/Specification/International Search Report/International Preliminary Report on Patentability.
☑ (g) Statement and Undertaking on Form 3
☑ (h) Declaration of Inventorship on Form 5
☑ (i) Power of Authority
☑ (j) Prescribed Official Fee Paid Online`
      },

      // Section 14: Fee & Sign-off (Page 4/4)
      {
        id: "f1_total_fees",
        name: "Total Fees Paid:",
        label: "Total Fees & Mode of Remittance:",
        type: "text",
        width: 100,
        sectionId: "sec_f1_signoff",
        defaultValue: "Total Fees: Rs. 8,000/- paid online by using online filing and fund transfer.",
        placeholder: "Total Fees amount and online transaction reference..."
      },
      {
        id: "static_f1_signoff_block",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_f1_signoff",
        label: "Official Undertaking & Patent Agent Execution",
        content: `We hereby declare that to the best of our knowledge, information, and belief, the facts and matters stated herein are correct and we request that a patent may be granted to us for the said invention.

Dated this 07th day of October, 2026

To,
The Controller of Patent,
The Patent Office, at Mumbai - 400037

                                                    _________________________________________
                                                    Suneet Baliram Sabale
                                                    (Agent for Applicant)
                                                    Reg. No: IN/PA-1773
                                                    Brainiac IP Solutions`
      }
    ]
  },

  // 3. FORM 2 - Provisional / Complete Specification
  {
    id: "indian_patent_form_2",
    title: "FORM 2: Provisional / Complete Specification",
    shortName: "Form 2 (Specification & Claims)",
    actReference: "The Patents Act 1970 (Section 10 and Rule 13)",
    category: "Indian Patent Office (IPO)",
    categoryCode: "IN",
    badgeColor: "#7c3aed",
    description: "Detailed specification document containing background, summary, detailed description, claims, and drawings.",
    jurisdiction: "IPO (Indian Patent Office)",
    version: "2.1",
    sections: [
      { id: "sec_f2_preamble", title: "1. Preamble to the Description", description: "Title of the invention and nature of specification" },
      { id: "sec_f2_content", title: "2. Description & Claims", description: "Full technical disclosure and claims table" }
    ],
    fields: [
      {
        id: "f2_spec_type",
        name: "Specification Type",
        label: "Type of Specification",
        type: "dropdown",
        width: 50,
        sectionId: "sec_f2_preamble",
        defaultValue: "Complete Specification",
        options: [
          { label: "Provisional Specification", value: "Provisional Specification" },
          { label: "Complete Specification", value: "Complete Specification" }
        ],
        required: true
      },
      {
        id: "f2_title",
        name: "Invention Title",
        label: "Title of the Invention",
        type: "text",
        width: 50,
        sectionId: "sec_f2_preamble",
        isAutoCaptured: true,
        apiMapping: "patent.title",
        defaultValue: "AI-Powered Microfluidic Biosensor for Ultra-Early Oncological Biomarker Detection",
        required: true
      },
      {
        id: "f2_description",
        name: "Detailed Description",
        label: "Detailed Description of the Invention",
        type: "textarea",
        width: 100,
        sectionId: "sec_f2_content",
        isAutoCaptured: true,
        apiMapping: "patent.abstract",
        defaultValue: "The present invention discloses a lab-on-a-chip biosensing apparatus comprising functionalized gold nanoparticles coupled with surface plasmon resonance waveguide arrays.",
        placeholder: "Enter full technical disclosure..."
      }
    ]
  },

  // 4. FORM 18 - Request for Examination of Patent Application
  {
    id: "indian_patent_form_18",
    title: "FORM 18: Request for Examination of Application",
    shortName: "Form 18 (Examination)",
    actReference: "The Patents Act 1970 (Section 11B and Rule 20(4)(ii), 24B(1)(i))",
    category: "Indian Patent Office (IPO)",
    categoryCode: "IN",
    badgeColor: "#ea580c",
    description: "Formal request to the Controller of Patents to examine the patent application under Section 11B.",
    jurisdiction: "IPO (Indian Patent Office)",
    version: "1.8",
    sections: [
      { id: "sec_f18_body", title: "Request Parameters", description: "Application identification and statement" }
    ],
    fields: [
      {
        id: "f18_app_no",
        name: "Application Number",
        label: "Indian Application Number",
        type: "text",
        width: 50,
        sectionId: "sec_f18_body",
        isAutoCaptured: true,
        apiMapping: "patent.appNumber",
        defaultValue: "202411039821 A",
        required: true
      },
      {
        id: "f18_filing_date",
        name: "Filing Date",
        label: "Date of Filing",
        type: "date",
        width: 50,
        sectionId: "sec_f18_body",
        isAutoCaptured: true,
        apiMapping: "patent.filingDate",
        defaultValue: "2024-05-18",
        required: true
      },
      {
        id: "f18_statement",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_f18_body",
        label: "Statutory Examination Statement",
        content: `I/We hereby request that our application for patent No. {app_no} filed on {filing_date} for the invention entitled "{title}" shall be examined under sections 12 and 13 of the Act.`
      }
    ]
  },

  // 5. FORM 26 - Form of Authorisation (Power of Attorney)
  {
    id: "indian_patent_form_26",
    title: "FORM 26: Form of Authorisation of a Patent Agent (Power of Attorney)",
    shortName: "Form 26 (Power of Attorney)",
    actReference: "The Patents Act 1970 (Sections 127 and 132 and Rule 135)",
    category: "Indian Patent Office (IPO)",
    categoryCode: "IN",
    badgeColor: "#059669",
    description: "Authorisation deed appointing registered patent agent to prosecute and transact all matters before the Controller.",
    jurisdiction: "IPO (Indian Patent Office)",
    version: "2.0",
    sections: [
      { id: "sec_f26_body", title: "Authorisation & Agent Details", description: "Legal representative appointment" }
    ],
    fields: [
      {
        id: "f26_agent_name",
        name: "Patent Agent Name",
        label: "Registered Patent Agent Name",
        type: "text",
        width: 50,
        sectionId: "sec_f26_body",
        isAutoCaptured: true,
        apiMapping: "patent.attorney.name",
        defaultValue: "Suneet Baliram Sabale",
        required: true
      },
      {
        id: "f26_reg_no",
        name: "Registration Number",
        label: "Patent Agent Registration No.",
        type: "text",
        width: 50,
        sectionId: "sec_f26_body",
        isAutoCaptured: true,
        apiMapping: "patent.attorney.regNo",
        defaultValue: "IN/PA-1773",
        required: true
      },
      {
        id: "f26_deed_text",
        type: "static_text",
        isStatic: true,
        width: 100,
        sectionId: "sec_f26_body",
        label: "Authorisation Clause",
        content: `We hereby authorise the above registered patent practitioner to act as our Agent on our behalf in connection with prosecuting, maintaining, and attending to all proceedings before the Controller of Patents under the Patents Act, 1970.`
      }
    ]
  },

  // 6. Qatar Requisition Form (From user screenshot)
  {
    id: "qatar_requisition_form",
    title: "Qatar Requisition Form - Updated",
    shortName: "Qatar Requisition Form",
    actReference: "Enterprise Procurement & Approvals Workflow",
    category: "Enterprise Workflows",
    categoryCode: "REQ",
    badgeColor: "#2563eb",
    description: "Enterprise purchase requisition and approvals with automated API data-fill and rich comment editor.",
    jurisdiction: "Enterprise / Requisitions",
    version: "2.1",
    sections: [
      {
        id: "sec_requester",
        title: "Requester Details",
        description: "Basic details"
      }
    ],
    fields: [
      {
        id: "request_form",
        name: "Request Form",
        label: "Request Form",
        type: "text",
        width: 50,
        sectionId: "sec_requester",
        isAutoCaptured: true,
        apiMapping: "patent.fileNo",
        defaultValue: "IT Procurement Requisition (REQ-2024-0891)",
        required: true
      },
      {
        id: "request_date",
        name: "Request Date",
        label: "Request Date",
        type: "date",
        width: 50,
        sectionId: "sec_requester",
        isAutoCaptured: true,
        apiMapping: "patent.filingDate",
        defaultValue: "2024-03-28",
        required: true
      },
      {
        id: "requestor_name",
        name: "Requestor Name",
        label: "Requestor Name",
        type: "text",
        width: 50,
        sectionId: "sec_requester",
        isAutoCaptured: true,
        apiMapping: "patent.applicant.name",
        defaultValue: "Dhaval Patel",
        required: true
      },
      {
        id: "subject",
        name: "Subject",
        label: "Subject",
        type: "text",
        width: 50,
        sectionId: "sec_requester",
        placeholder: "Subject",
        apiMapping: "patent.title",
        defaultValue: "High-Performance GPU Server Cluster Procurement",
        required: true
      },
      {
        id: "comments",
        name: "Comments",
        label: "Comments",
        type: "textarea",
        width: 100,
        sectionId: "sec_requester",
        placeholder: "Please provide the comments for the purchase.",
        apiMapping: "patent.abstract",
        defaultValue: "Required for AI model inference and patent classification workloads.",
        helpText: "Please provide the comments for the purchase."
      },
      {
        id: "department",
        name: "Department",
        label: "Department",
        type: "dropdown",
        width: 50,
        sectionId: "sec_requester",
        placeholder: "Choose from the dropdown",
        apiMapping: "patent.entityStatus",
        defaultValue: "Cognitive Quantum Technologies (Legal / R&D)"
      }
    ]
  },

  // 7. USPTO ADS - Application Data Sheet (United States)
  {
    id: "uspto_ads_form",
    title: "USPTO ADS: Application Data Sheet (37 CFR 1.76)",
    shortName: "USPTO ADS Form",
    actReference: "United States Patent and Trademark Office 37 CFR 1.76",
    category: "United States (USPTO)",
    categoryCode: "US",
    badgeColor: "#dc2626",
    description: "Official United States Patent and Trademark Office bibliographic data sheet for utility and design patent filings.",
    jurisdiction: "USPTO (United States)",
    version: "3.2",
    sections: [
      { id: "sec_ads_1", title: "1. Application & Invention Information", description: "Bibliographic filing indexes" },
      { id: "sec_ads_2", title: "2. Applicant & Representative", description: "Assignee and practitioner contact data" }
    ],
    fields: [
      {
        id: "ads_app_no",
        name: "Application Number",
        label: "Official Application Number",
        type: "text",
        width: 50,
        sectionId: "sec_ads_1",
        isAutoCaptured: true,
        apiMapping: "patent.appNumber",
        defaultValue: "US 17/984,312",
        required: true
      },
      {
        id: "ads_filing_date",
        name: "Filing Date",
        label: "Filing Date",
        type: "date",
        width: 50,
        sectionId: "sec_ads_1",
        isAutoCaptured: true,
        apiMapping: "patent.filingDate",
        defaultValue: "2023-03-15",
        required: true
      },
      {
        id: "ads_title",
        name: "Title of Invention",
        label: "Title of Invention",
        type: "text",
        width: 100,
        sectionId: "sec_ads_1",
        isAutoCaptured: true,
        apiMapping: "patent.title",
        defaultValue: "Quantum Annealing Optimization for Neural Network Topology Architecture",
        required: true
      }
    ]
  }
];
