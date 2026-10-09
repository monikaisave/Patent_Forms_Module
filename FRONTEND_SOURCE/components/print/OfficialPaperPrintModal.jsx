import React, { useState } from "react";
import { 
  Printer, 
  Download, 
  X, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft,
  Calendar,
  UserCheck
} from "lucide-react";

/**
 * Official E-Sign flourish SVG matching physical paper sheets (Photos 3 & 4)
 */
export function OfficialESignFlourish() {
  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <svg 
        width="180" 
        height="44" 
        viewBox="0 0 200 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", marginBottom: "-4px" }}
      >
        <path 
          d="M12,32 C24,14 34,9 42,20 C48,29 55,18 64,16 C74,14 79,24 87,22 C94,20 104,14 114,20 C124,26 134,16 144,18 C154,20 164,14 174,23" 
          stroke="#1d4ed8" 
          strokeWidth="2.3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M18,26 C38,39 88,41 138,37 C163,35 183,31 178,39 C173,45 148,43 128,45 C98,47 58,45 28,47" 
          stroke="#1e40af" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
        />
        <path 
          d="M44,16 C49,10 59,6 64,13 C69,20 67,30 61,36" 
          stroke="#1d4ed8" 
          strokeWidth="1.9" 
          strokeLinecap="round" 
        />
        <path 
          d="M98,14 C103,8 110,6 114,12 C118,18 116,26 112,33" 
          stroke="#2563eb" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
  );
}

export function OfficialPaperPrintModal({
  form,
  formData,
  fileNo,
  onClose
}) {
  const isForm1 = form.id === "indian_patent_form_1" || form.title?.toLowerCase().includes("form 1");
  const isForm3 = form.id === "indian_patent_form_3" || form.title?.toLowerCase().includes("form 3");

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      formId: form.id,
      formTitle: form.title,
      fileNo: fileNo,
      generatedAt: new Date().toISOString(),
      agent: {
        name: "Suneet Baliram Sabale",
        regNo: "IN/PA-1773",
        address: "C/o Brainiac IP Solutions, Pune"
      },
      values: formData
    }, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `${form.id}_${fileNo}_official.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Helper to extract table rows
  const getTableRows = (key, fallback = []) => {
    const val = formData[key];
    if (Array.isArray(val) && val.length > 0) return val;
    return fallback;
  };

  const applicantRows = getTableRows("table_applicants", [
    { name: "Bewoor Anand Krishnarao", nationality: "Indian", address: "K1-504, Amrut Ganga Apartments, Pune 411041" },
    { name: "Punrandre, Pramod Shripad", nationality: "Indian", address: "K1-202, Amrut Ganga, Manikbaug, Pune 411051" }
  ]);

  const inventorRows = getTableRows("table_inventors", [
    { name: "Bewoor Anand Krishnarao", nationality: "Indian", address: "K1-504, Amrut Ganga Apartments, Pune 411041" },
    { name: "Punrandre, Pramod Shripad", nationality: "Indian", address: "K1-202, Amrut Ganga, Manikbaug, Pune 411051" }
  ]);

  const foreignRows = getTableRows("table_foreign_filings", [
    { country: "United States (USPTO)", appDate: "2024-05-20", appNo: "US 18/921,012", status: "Pending Examination", pubDate: "2024-08-15", grantDate: "—" },
    { country: "European Patent Office (EPO)", appDate: "2024-05-22", appNo: "EP 24178901.2", status: "Published", pubDate: "2024-09-01", grantDate: "—" }
  ]);

  const patentTitle = formData.patent_title || formData.title || formData.titleOfInvention || "AN IMPROVED HEATER APPARATUS AND METHOD THEREOF";
  const filingDate = formData.filing_date || formData.dateOfFiling || new Date().toISOString().slice(0, 10);
  const appNo = formData.app_number || formData.app_no || formData.applicationNo || "202421039821";
  const filingFee = formData.filing_fee || "8,000";

  return (
    <div className="official-modal-backdrop" onClick={onClose}>
      <div className="official-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Floating Control Bar (Hidden on print) */}
        <div className="official-modal-topbar no-print">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ gap: "4px" }}>
              <ArrowLeft size={14} /> Back to Forms
            </button>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                {form.title || (isForm1 ? "FORM 1: Official Physical Paper Document" : "FORM 3: Statement & Undertaking (Section 8)")}
              </h3>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                Official Statutory Format matching Indian Patent Office Standards &bull; File No: <strong>{fileNo}</strong>
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <button className="btn btn-secondary btn-sm" onClick={handleDownloadJson} style={{ gap: "5px" }}>
              <Download size={14} /> Export JSON
            </button>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={handlePrint}
              style={{ background: "#16a34a", borderColor: "#16a34a", gap: "6px", fontWeight: 600 }}
            >
              <Printer size={15} /> Print / Export Official PDF
            </button>
            <button className="section-action-btn" onClick={onClose} title="Close Preview">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Paper Sheets Container */}
        <div className="official-paper-scroll-view">

          {/* ========================================================================= */}
          {/* CASE A: FORM 1: APPLICATION FOR GRANT OF PATENT (Photos 1, 2, 3)          */}
          {/* ========================================================================= */}
          {isForm1 ? (
            <div className="official-legal-document-container">
              {/* -------------------- SHEET 1 (Page 1/4 matching Photo 1) -------------------- */}
              <div className="official-legal-sheet">
                {/* Official Office Use Box Top-Right */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
                  <div className="office-use-box">
                    <div style={{ fontWeight: 700, textAlign: "center", borderBottom: "1px solid #000", paddingBottom: "2px", marginBottom: "4px" }}>
                      (FOR OFFICE USE ONLY)
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Application No.</span>
                      <span>: {appNo || "........................"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Filing Date</span>
                      <span>: {filingDate || "........................"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Amount of Fees Paid</span>
                      <span>: Rs. {filingFee}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>CBR NO.</span>
                      <span>: ........................</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Signature</span>
                      <span>: ........................</span>
                    </div>
                  </div>
                </div>

                {/* Form Title Centered */}
                <div className="legal-title-center">
                  <div style={{ fontSize: "1.1rem", fontWeight: 800 }}>FORM 1</div>
                  <div style={{ fontWeight: 700 }}>THE PATENTS ACT 1970</div>
                  <div>(39 of 1970)</div>
                  <div>&amp;</div>
                  <div>The Patents Rules, 2005</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, marginTop: "4px" }}>APPLICATION FOR GRANT OF PATENT</div>
                  <div style={{ fontSize: "0.85rem", fontStyle: "italic" }}>(See sections 7, 54 &amp; 135 and rule 20(1))</div>
                </div>

                {/* 1. Reference No */}
                <div className="legal-para-row">
                  <strong>1. APPLICANT&apos;S Reference / Identification No:</strong>{" "}
                  <span style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>{fileNo}</span>
                </div>

                {/* 2. Type of Application */}
                <div className="legal-para-row">
                  <strong>2. Type of Application:</strong> Ordinary{" "}
                  <span style={{ borderBottom: "1px dashed #000", padding: "0 10px", fontWeight: 600 }}>
                    {formData.type_of_application || "Ordinary Application"}
                  </span>
                </div>

                {/* 3A. Applicants Table */}
                <div style={{ marginTop: "0.5rem" }}>
                  <strong>3A. Applicant(s)</strong>
                  <table className="official-legal-table">
                    <thead>
                      <tr>
                        <th style={{ width: "30%" }}>Name</th>
                        <th style={{ width: "20%" }}>Nationality</th>
                        <th style={{ width: "50%" }}>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicantRows.map((app, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{app.name || "—"}</td>
                          <td>{app.nationality || "Indian"}</td>
                          <td>{app.address || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 3B. Category of Applicant */}
                <div className="category-applicant-box">
                  <strong>3B. Category of Applicant:</strong> Large Entity / Small Entity / Educational Institute / Other than natural Person
                  <div style={{ marginTop: "3px", fontSize: "0.82rem", color: "#1e3a8a", fontWeight: 600 }}>
                    Selected Category: [✓] Small Entity (Registered under MSME)
                  </div>
                </div>

                {/* 4. Inventors */}
                <div style={{ marginTop: "0.75rem" }}>
                  <div style={{ marginBottom: "2px" }}>
                    <strong>4. All Inventors Same as applicant:</strong> No [✓] &nbsp; Yes [ ]
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>INVENTOR(S) DETAILS</div>
                  <table className="official-legal-table">
                    <thead>
                      <tr>
                        <th style={{ width: "30%" }}>Name</th>
                        <th style={{ width: "20%" }}>Nationality</th>
                        <th style={{ width: "50%" }}>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventorRows.map((inv, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{inv.name || "—"}</td>
                          <td>{inv.nationality || "Indian"}</td>
                          <td>{inv.address || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 5. Title of Invention */}
                <div className="legal-para-row" style={{ marginTop: "0.75rem", borderTop: "1px solid #000", paddingTop: "0.4rem" }}>
                  <strong>5. TITLE OF THE INVENTION:</strong>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", textTransform: "uppercase", marginTop: "3px" }}>
                    {patentTitle}
                  </div>
                </div>

                {/* 6 & 7 Agent Box Matching Photo 1 */}
                <div style={{ marginTop: "0.75rem" }}>
                  <table className="official-legal-table" style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "35%", verticalAlign: "top", fontWeight: 700 }}>
                          6. AUTHORIZED PATENT AGENT IN INDIA
                        </td>
                        <td style={{ width: "65%", fontSize: "0.85rem", lineHeight: "1.4" }}>
                          <div><strong>IN/PA NO:</strong> 1773</div>
                          <div><strong>Name:</strong> Suneet Baliram Sabale</div>
                          <div><strong>Tel. No.:</strong> 09112299453</div>
                          <div><strong>Fax No.:</strong> 022 39167270</div>
                          <div><strong>Mobile No.:</strong> 09730140003 / 7517659030</div>
                          <div><strong>E-mail:</strong> patent@brainiac.co.in</div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top", fontWeight: 700 }}>
                          7. ADDRESS FOR SERVICE of APPLICANT
                        </td>
                        <td style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>
                          <strong>Suneet Baliram Sabale</strong><br />
                          C/o Brainiac IP Solutions,<br />
                          Office no - 303, Third Floor, Navale Icon, Near Navale Bridge, Mumbai Pune Highway, Narhe, Pune, -411041 MH. India.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="sheet-page-footer">1/4</div>
              </div>

              {/* -------------------- SHEET 2 (Page 3/4 matching Photo 2) -------------------- */}
              <div className="official-legal-sheet page-break-before">
                {/* Statutory Declarations List matching Photo 2 */}
                <div className="legal-declarations-list">
                  <div className="decl-item">
                    <span className="checkbox-box">[ ]</span>
                    <span>The invention as disclosed in the specification uses the biological material from India and the necessary permission from the competent authority shall be submitted by us before the grant of patent to us: <strong>N.A.</strong></span>
                  </div>
                  <div className="decl-item">
                    <span className="checkbox-box">[✓]</span>
                    <span>There is no lawful ground of objection to the grant of the patent to us: <strong>Yes</strong></span>
                  </div>
                  <div className="decl-item">
                    <span className="checkbox-box">[✓]</span>
                    <span>We are the assignees or legal representatives of true and first inventors: <strong>YES</strong></span>
                  </div>
                  <div className="decl-item">
                    <span className="checkbox-box">[ ]</span>
                    <span>The application or each of the applications, particulars of which are given in Para - 8 was the first application in convention country/countries in respect of our invention: <strong>N.A.</strong></span>
                  </div>
                  <div className="decl-item">
                    <span className="checkbox-box">[ ]</span>
                    <span>We claim the priority from the above mentioned application filed in convention country/countries and state that no application for protection in respect of the invention had been made in a convention country before that date by us or by any person from which we derive the title: <strong>N.A.</strong></span>
                  </div>
                  <div className="decl-item">
                    <span className="checkbox-box">[ ]</span>
                    <span>Our application in India is based on international application under Patent Cooperation Treaty (PCT) as mentioned in Para-9: <strong>N.A.</strong></span>
                  </div>
                  <div className="decl-item">
                    <span className="checkbox-box">[ ]</span>
                    <span>The application is divided out of our application particulars of which are given in Para-10 and pray that this application may be treated as deemed to have been filed on N.A. under sec.16 of the Act: <strong>N.A.</strong></span>
                  </div>
                  <div className="decl-item">
                    <span className="checkbox-box">[ ]</span>
                    <span>The said invention is an improvement in or modification of the invention particulars of which are given in Para-11 : <strong>N.A.</strong></span>
                  </div>
                </div>

                {/* 13. Attachments Table matching Photo 2 */}
                <div style={{ marginTop: "1rem" }}>
                  <strong>13. Following are the attachments with the application:</strong>
                  <table className="official-legal-table" style={{ marginTop: "4px" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "25%" }}>Item</th>
                        <th style={{ width: "45%" }}>Details</th>
                        <th style={{ width: "15%" }}>Fee</th>
                        <th style={{ width: "15%" }}>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Complete/Provisional</strong></td>
                        <td>No: of Pages: <strong>{formData.spec_pages || "24"}</strong></td>
                        <td>Rs. {filingFee}</td>
                        <td>Complete Spec</td>
                      </tr>
                      <tr>
                        <td><strong>No. of Claim(s)</strong></td>
                        <td>No. of Claims: <strong>{formData.total_claims || "10"}</strong> &nbsp; No. of Pages: <strong>4</strong></td>
                        <td>—</td>
                        <td>Claims filed</td>
                      </tr>
                      <tr>
                        <td><strong>Abstract</strong></td>
                        <td>No. of Pages: <strong>1</strong></td>
                        <td>—</td>
                        <td>Summary abstract</td>
                      </tr>
                      <tr>
                        <td><strong>No. of Drawings</strong></td>
                        <td>No. of Drawings: <strong>6</strong> &nbsp; No. of Pages: <strong>5</strong></td>
                        <td>—</td>
                        <td>Sheet drawings</td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ fontSize: "0.76rem", fontStyle: "italic", marginTop: "4px", color: "#334155" }}>
                    # In case of a complete specification, if the applicant desires to adopt the drawings filed with his provisional specification as the drawings or part of the drawings for the complete specification under rule 13(4), the number of such pages filed with the provisional specification are required to be mentioned here.
                  </div>

                  <div style={{ fontSize: "0.8rem", lineHeight: "1.45", marginTop: "8px" }}>
                    <div>(b) Complete specification (in conformation with the international application)/as amended before the International Preliminary Examination Authority (IPEA), as applicable (2 copies).</div>
                    <div>(c) Sequence listing in electronic form</div>
                    <div>(d) Drawings (in conformation with the international application)/as amended before the International Preliminary Examination Authority (IPEA), as applicable (2 copies).</div>
                    <div>(e) Priority document(s) or a request to retrieve the priority document(s) from DAS (Digital Access Service) if the applicant had already requested the office of first filing to make the priority document(s) available to DAS.</div>
                    <div>(f) Translation of priority document/Specification/International Search Report/International Preliminary Report on Patentability.</div>
                    <div>(g) Statement and Undertaking on Form 3</div>
                    <div>(h) Declaration of Inventorship on Form 5</div>
                    <div>(i) Power of Authority ................................................................</div>
                    <div>(j) ............................................................................................</div>
                  </div>
                </div>

                <div className="sheet-page-footer">3/4</div>
              </div>

              {/* -------------------- SHEET 3 (Page 4/4 matching Photo 3) -------------------- */}
              <div className="official-legal-sheet page-break-before">
                {/* Total Fees */}
                <div style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
                  <strong>Total Fees: Rs. {filingFee}</strong> by paid online by using online filing and fund transfer.
                </div>

                {/* Final Statutory Declaration */}
                <div style={{ marginTop: "1.5rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  We hereby declare that to the best of our knowledge, information, and belief, the facts and matters stated herein are correct and we request that a patent may be granted to us for the said invention.
                </div>

                {/* Dated */}
                <div style={{ marginTop: "2rem", fontSize: "0.95rem" }}>
                  Dated this <span style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>{filingDate}</span>
                </div>

                {/* Official E-Sign Pattern matching Photo 3 & 4 */}
                <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ textAlign: "center", minWidth: "260px" }}>
                    {/* E-Sign Blue Flourish */}
                    <OfficialESignFlourish />

                    <div style={{ borderTop: "1.5px solid #000", marginTop: "4px", paddingTop: "4px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Suneet Baliram Sabale</div>
                      <div style={{ fontSize: "0.85rem" }}>(Agent for Applicant)</div>
                      <div style={{ fontSize: "0.85rem" }}>Reg. No: <strong>IN/PA-1773</strong></div>
                    </div>

                    {/* Digital Seal Badge */}
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "6px",
                      padding: "2px 8px",
                      border: "1px solid #16a34a",
                      borderRadius: "4px",
                      background: "#f0fdf4",
                      fontSize: "0.68rem",
                      color: "#166534",
                      fontWeight: 600
                    }}>
                      <CheckCircle2 size={11} color="#16a34a" />
                      <span>OFFICIAL DSC E-SIGN VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Recipient */}
                <div style={{ marginTop: "3rem", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  <div>To,</div>
                  <div>The Controller of Patent,</div>
                  <div>The Patent Office, at <strong>Mumbai - 400037</strong></div>
                </div>

                <div className="sheet-page-footer">4/4</div>
              </div>
            </div>
          ) : isForm3 ? (
            /* ========================================================================= */
            /* CASE B: FORM 3: STATEMENT AND UNDERTAKING UNDER SECTION 8 (Photo 4)       */
            /* ========================================================================= */
            <div className="official-legal-document-container">
              <div className="official-legal-sheet">
                {/* Title Centered */}
                <div className="legal-title-center" style={{ marginBottom: "1rem" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800 }}>FORM 3</div>
                  <div style={{ fontWeight: 700 }}>THE PATENTS ACT 1970</div>
                  <div>(39 OF 1970)</div>
                  <div>&amp;</div>
                  <div>The Patents Rules, 2003</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, marginTop: "4px" }}>
                    STATEMENT AND UNDERTAKING UNDER SECTION 8
                  </div>
                  <div style={{ fontSize: "0.85rem", fontStyle: "italic" }}>
                    (See section 8 and rule 12)
                  </div>
                </div>

                {/* We, followed by Applicant Table */}
                <div style={{ marginTop: "0.5rem" }}>
                  <div style={{ marginBottom: "4px", fontWeight: 700 }}>We,</div>
                  <table className="official-legal-table">
                    <thead>
                      <tr>
                        <th style={{ width: "30%" }}>Name</th>
                        <th style={{ width: "20%" }}>Nationality</th>
                        <th style={{ width: "50%" }}>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicantRows.map((app, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{app.name || "—"}</td>
                          <td>{app.nationality || "Indian"}</td>
                          <td>{app.address || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Undertaking Statutory Text matching Photo 4 */}
                <div style={{ marginTop: "1rem", fontSize: "0.9rem", lineHeight: "1.6" }}>
                  <div>hereby declare:</div>
                  <div style={{ marginTop: "0.4rem" }}>
                    (i) that we have not made any application for the same/substantially the same invention outside India (dated _______________).
                  </div>
                  <div style={{ textAlign: "center", fontWeight: 700, margin: "0.4rem 0" }}>OR</div>
                  <div>
                    (ii) that I/We who have made this application No.{" "}
                    <span style={{ fontWeight: 700, textDecoration: "underline" }}>{appNo}</span> dated{" "}
                    <span style={{ fontWeight: 700, textDecoration: "underline" }}>{filingDate}</span> alone/jointly with, made for the same/substantially same invention, application(s) for patent in the other countries, the particulars of which are given below:
                  </div>
                </div>

                {/* Foreign Filings Table matching Photo 4 */}
                <div style={{ marginTop: "0.75rem" }}>
                  <table className="official-legal-table">
                    <thead>
                      <tr>
                        <th>Name of the country</th>
                        <th>Date of application</th>
                        <th>Application No.</th>
                        <th>Status of application</th>
                        <th>Date of publication</th>
                        <th>Date of grant</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foreignRows.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", fontStyle: "italic", padding: "10px" }}>
                            No foreign applications filed.
                          </td>
                        </tr>
                      ) : (
                        foreignRows.map((row, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: 600 }}>{row.country || row.country_name || "—"}</td>
                            <td>{row.appDate || row.app_date || "—"}</td>
                            <td>{row.appNo || row.app_no || "—"}</td>
                            <td>{row.status || "—"}</td>
                            <td>{row.pubDate || row.pub_date || "—"}</td>
                            <td>{row.grantDate || row.grant_date || "—"}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* 3. Assignee Undertaking Box matching Photo 4 */}
                <div style={{ marginTop: "0.75rem" }}>
                  <table className="official-legal-table" style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "25%", fontWeight: 700, verticalAlign: "top" }}>
                          3. Name and Address of Assignee:
                        </td>
                        <td style={{ width: "75%", fontSize: "0.88rem", lineHeight: "1.5" }}>
                          iii) that the rights in the application(s) has/have been assigned to us and that I undertake that up-to the date of grant of the patent, by the Controller, we would keep him informed in writing the details regarding corresponding applications for patents filed outside India within three months from the date of filing of such application.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Date */}
                <div style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}>
                  <strong>Date:</strong> <span style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>{filingDate}</span>
                </div>

                {/* Official E-Sign Pattern matching Photo 4 */}
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ textAlign: "center", minWidth: "260px" }}>
                    {/* Blue Ink Signature Flourish matching Photo 4 */}
                    <OfficialESignFlourish />

                    <div style={{ borderTop: "1.5px solid #000", marginTop: "4px", paddingTop: "4px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Suneet Baliram Sabale</div>
                      <div style={{ fontSize: "0.85rem" }}>(Agent for Applicant)</div>
                      <div style={{ fontSize: "0.85rem" }}>Reg. No: <strong>IN/PA-1773</strong></div>
                    </div>

                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "6px",
                      padding: "2px 8px",
                      border: "1px solid #16a34a",
                      borderRadius: "4px",
                      background: "#f0fdf4",
                      fontSize: "0.68rem",
                      color: "#166534",
                      fontWeight: 600
                    }}>
                      <CheckCircle2 size={11} color="#16a34a" />
                      <span>OFFICIAL DSC E-SIGN VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Recipient */}
                <div style={{ marginTop: "2.5rem", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  <div>To,</div>
                  <div>The Controller of Patents</div>
                  <div>The Patent Office at <strong>Mumbai</strong></div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* CASE C: OFFICIAL STATUTORY PATENT FORM (FORM 2, 5, 9, 18, 26, ETC.)        */
            /* ========================================================================= */
            <div className="official-legal-document-container">
              <div className="official-legal-sheet">
                {/* Official Office Use Box Top-Right */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
                  <div className="office-use-box">
                    <div style={{ fontWeight: 700, textAlign: "center", borderBottom: "1px solid #000", paddingBottom: "2px", marginBottom: "4px" }}>
                      (FOR OFFICE USE ONLY)
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Application No.</span>
                      <span>: {appNo || "........................"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Filing Date</span>
                      <span>: {filingDate || "........................"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>CBR NO.</span>
                      <span>: ........................</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Signature</span>
                      <span>: ........................</span>
                    </div>
                  </div>
                </div>

                {/* Form Title Centered */}
                <div className="legal-title-center" style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800 }}>{form.shortName || form.title}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>THE PATENTS ACT 1970</div>
                  <div style={{ fontSize: "0.85rem" }}>(39 of 1970)</div>
                  <div style={{ fontSize: "0.85rem" }}>&amp;</div>
                  <div style={{ fontSize: "0.85rem" }}>The Patents Rules, 2003 / 2005</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, marginTop: "6px", textTransform: "uppercase" }}>
                    {form.title}
                  </div>
                  <div style={{ fontSize: "0.82rem", fontStyle: "italic", marginTop: "2px" }}>
                    {form.actReference || "(See relevant sections of the Patents Act & Rules)"}
                  </div>
                </div>

                {/* Patent File Reference & Details */}
                <div className="legal-para-row" style={{ marginTop: "1rem" }}>
                  <strong>1. APPLICANT&apos;S Reference / File No:</strong>{" "}
                  <span style={{ textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>{fileNo}</span>
                </div>

                <div className="legal-para-row">
                  <strong>2. Application Number:</strong>{" "}
                  <span style={{ fontWeight: 600 }}>{appNo}</span>
                  &nbsp;&bull;&nbsp;
                  <strong>Filing Date:</strong>{" "}
                  <span style={{ fontWeight: 600 }}>{filingDate}</span>
                </div>

                <div className="legal-para-row" style={{ marginTop: "0.5rem" }}>
                  <strong>3. Title of Invention:</strong>{" "}
                  <span style={{ fontWeight: 700, textTransform: "uppercase" }}>{patentTitle}</span>
                </div>

                {/* Applicants & Inventors Table */}
                <div style={{ marginTop: "1rem" }}>
                  <strong>4. Applicant(s) / Inventor(s) Record:</strong>
                  <table className="official-legal-table" style={{ marginTop: "4px" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "30%" }}>Name</th>
                        <th style={{ width: "20%" }}>Nationality</th>
                        <th style={{ width: "50%" }}>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicantRows.map((app, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{app.name || "—"}</td>
                          <td>{app.nationality || "Indian"}</td>
                          <td>{app.address || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Dynamic Form Particulars / Fields */}
                <div style={{ marginTop: "1.25rem", borderTop: "1px dashed #cbd5e1", paddingTop: "0.75rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem", color: "#1e293b" }}>
                    5. Particulars of the Application &amp; Statutory Statement:
                  </div>
                  {form.sections && form.sections.map((sec) => (
                    <div key={sec.id} style={{ marginBottom: "0.75rem" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", borderBottom: "1px solid #e2e8f0", paddingBottom: "2px", marginBottom: "4px" }}>
                        {sec.title}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4px", fontSize: "0.88rem" }}>
                        {(form.fields || [])
                          .filter(f => f.sectionId === sec.id && !f.isStatic && f.type !== "dynamic_table")
                          .slice(0, 8)
                          .map(f => {
                            const val = formData[f.id] !== undefined ? String(formData[f.id]) : (f.defaultValue || "—");
                            return (
                              <div key={f.id} style={{ display: "flex", gap: "0.5rem", padding: "2px 0" }}>
                                <span style={{ color: "#475569", minWidth: "220px", fontWeight: 500 }}>{f.label || f.name}:</span>
                                <span style={{ fontWeight: 600, color: "#0f172a" }}>{val || "—"}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final Statutory Undertaking Statement */}
                <div style={{ marginTop: "1.5rem", fontSize: "0.9rem", lineHeight: "1.6", background: "#f8fafc", padding: "0.75rem", borderLeft: "3px solid #2563eb", borderRadius: "3px" }}>
                  We hereby declare that the particulars given above are true and complete to the best of our knowledge, information and belief and request that necessary action be taken by the Patent Office.
                </div>

                {/* Date */}
                <div style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}>
                  <strong>Dated this:</strong> <span style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>{filingDate}</span>
                </div>

                {/* Registered Patent Agent E-Sign Block */}
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ textAlign: "center", minWidth: "260px" }}>
                    <OfficialESignFlourish />
                    <div style={{ borderTop: "1.5px solid #000", marginTop: "4px", paddingTop: "4px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Suneet Baliram Sabale</div>
                      <div style={{ fontSize: "0.85rem" }}>(Agent for Applicant)</div>
                      <div style={{ fontSize: "0.85rem" }}>Reg. No: <strong>IN/PA-1773</strong></div>
                    </div>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "6px",
                      padding: "2px 8px",
                      border: "1px solid #16a34a",
                      borderRadius: "4px",
                      background: "#f0fdf4",
                      fontSize: "0.68rem",
                      color: "#166534",
                      fontWeight: 600
                    }}>
                      <CheckCircle2 size={11} color="#16a34a" />
                      <span>OFFICIAL DSC E-SIGN VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Official Recipient */}
                <div style={{ marginTop: "2rem", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  <div>To,</div>
                  <div>The Controller of Patents</div>
                  <div>The Patent Office at <strong>Mumbai</strong></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
