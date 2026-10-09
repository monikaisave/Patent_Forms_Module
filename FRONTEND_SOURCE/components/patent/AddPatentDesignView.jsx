import React, { useState } from "react";
import { 
  FileText, 
  Save, 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Info, 
  Award,
  Layers,
  Sparkles
} from "lucide-react";

export function AddPatentDesignView({
  onSaveSuccess,
  onCancel,
  onGoToFillForm
}) {
  const [formData, setFormData] = useState({
    type: "Patent",
    fileNo: "",
    clientRefNo: "",
    titleOfInvention: "",
    typeOfApplication: "Ordinary Application",
    applicationNo: "",
    dateOfFiling: new Date().toISOString().split("T")[0],
    priorityDate: "",
    publicationDate: "",
    paOrCa: "Complete",
    provisionalDateOfApplication: "",
    completeDateOfFiling: "",
    pct: "No",
    pctApplicationNo: "",
    pctDateOfFiling: "",
    form3yn: "Yes",
    form5yn: "Yes",
    form9: "",
    form18: "",
    examinationDate: "",
    examResponseDate: "",
    granted: "No",
    grantedDate: "",
    patentNumber: "",
    patentabilitySearchDate: "",
    infringementDate: "",
    ftoDate: "",
    landscapeDate: "",
    applicantName: "",
    applicantAddress: "",
    otherComments: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fileNo.trim()) {
      alert("Please enter File No. (e.g. 646P, 647D)");
      return;
    }
    if (!formData.titleOfInvention.trim()) {
      alert("Please enter Title of the Invention");
      return;
    }

    setIsSaving(true);
    setSaveSuccessMsg("");

    try {
      // In standalone, save to local storage or API
      const newRecord = {
        ...formData,
        id: Date.now(),
        applicants: formData.applicantName ? [{
          id: 1,
          name: formData.applicantName,
          address: formData.applicantAddress || "Mumbai, India",
          nationality: "Indian"
        }] : []
      };

      const existing = JSON.parse(localStorage.getItem("custom_patents_records") || "[]");
      existing.unshift(newRecord);
      localStorage.setItem("custom_patents_records", JSON.stringify(existing));

      setSaveSuccessMsg(`Patent record '${formData.fileNo}' created and saved successfully!`);
      if (onSaveSuccess) {
        onSaveSuccess(newRecord);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save record.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: "20px 25px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header & Breadcrumb */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 500, margin: 0, color: "#333333" }}>
            Add Client Patent Details Form
          </h1>
          <div style={{ fontSize: "13px", color: "#777", marginTop: "4px" }}>
            Patent Section &gt; <span style={{ color: "#3c8dbc" }}>Add Patent/Design Application</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {onCancel && (
            <button
              onClick={onCancel}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#555",
                backgroundColor: "#ffffff",
                border: "1px solid #d2d6de",
                borderRadius: "3px",
                cursor: "pointer"
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>
      </div>

      {saveSuccessMsg && (
        <div style={{
          padding: "14px 18px",
          backgroundColor: "#d4edda",
          border: "1px solid #c3e6cb",
          borderRadius: "4px",
          color: "#155724",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle2 size={18} style={{ color: "#28a745" }} />
            <span>{saveSuccessMsg}</span>
          </div>
          {onGoToFillForm && (
            <button
              onClick={() => onGoToFillForm(formData.fileNo)}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                padding: "6px 14px",
                borderRadius: "3px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Open in Auto-Fill Forms &rarr;
            </button>
          )}
        </div>
      )}

      {/* Main AdminLTE Box */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#ffffff",
        borderTop: "3px solid #3c8dbc",
        borderRadius: "3px",
        boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "15px 20px",
          borderBottom: "1px solid #f4f4f4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: "#333" }}>
              Patent or Design Application Details
            </h3>
            <p style={{ margin: "4px 0 0 0", color: "#dd4b39", fontSize: "12px" }}>
              Note: Fields marked with <span style={{ color: "red" }}>*</span> are required.
            </p>
          </div>
        </div>

        <div style={{ padding: "20px 25px", display: "flex", flexDirection: "column", gap: "25px" }}>
          {/* SECTION 1: CORE IDENTIFIERS */}
          <div>
            <h4 style={{
              margin: "0 0 15px 0",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#3c8dbc",
              borderBottom: "1px dashed #e1e4e8",
              paddingBottom: "6px"
            }}>
              1. Basic Identification
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Patent or Design <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                >
                  <option value="Patent">Patent</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  File No. <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="fileNo"
                  placeholder="e.g. 646P, 647D, BIP2026-01"
                  value={formData.fileNo}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Client Reference Number
                </label>
                <input
                  type="text"
                  name="clientRefNo"
                  placeholder="e.g. CRN-2026/89"
                  value={formData.clientRefNo}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Application No.
                </label>
                <input
                  type="text"
                  name="applicationNo"
                  placeholder="e.g. 202621045678"
                  value={formData.applicationNo}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: INVENTION & APPLICANT */}
          <div>
            <h4 style={{
              margin: "0 0 15px 0",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#3c8dbc",
              borderBottom: "1px dashed #e1e4e8",
              paddingBottom: "6px"
            }}>
              2. Invention Title &amp; Applicant
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Title of the Invention <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  name="titleOfInvention"
                  rows={2}
                  placeholder="Enter full technical title of invention..."
                  value={formData.titleOfInvention}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                    Type of Application
                  </label>
                  <select
                    name="typeOfApplication"
                    value={formData.typeOfApplication}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                  >
                    <option value="Ordinary Application">Ordinary Application</option>
                    <option value="Conventional Application">Conventional Application</option>
                    <option value="PCT National Phase Application">PCT National Phase Application</option>
                    <option value="Patent of Addition">Patent of Addition</option>
                    <option value="Divisional Application">Divisional Application</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                    Applicant Name
                  </label>
                  <input
                    type="text"
                    name="applicantName"
                    placeholder="e.g. Cognizant AI Labs Pvt Ltd"
                    value={formData.applicantName}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                    Applicant Address
                  </label>
                  <input
                    type="text"
                    name="applicantAddress"
                    placeholder="e.g. Pune, Maharashtra, India"
                    value={formData.applicantAddress}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: KEY DATES */}
          <div>
            <h4 style={{
              margin: "0 0 15px 0",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#3c8dbc",
              borderBottom: "1px dashed #e1e4e8",
              paddingBottom: "6px"
            }}>
              3. Filing Dates &amp; Statutory Timeline
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Date of filing:
                </label>
                <input
                  type="date"
                  name="dateOfFiling"
                  value={formData.dateOfFiling}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Priority Date:
                </label>
                <input
                  type="date"
                  name="priorityDate"
                  value={formData.priorityDate}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Publication Date:
                </label>
                <input
                  type="date"
                  name="publicationDate"
                  value={formData.publicationDate}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Provisional or Complete:
                </label>
                <select
                  name="paOrCa"
                  value={formData.paOrCa}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                >
                  <option value="Provisional">Provisional</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 4: PCT & STATUTORY FORMS */}
          <div>
            <h4 style={{
              margin: "0 0 15px 0",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#3c8dbc",
              borderBottom: "1px dashed #e1e4e8",
              paddingBottom: "6px"
            }}>
              4. PCT Details &amp; Statutory IPO Forms
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  PCT filing details:
                </label>
                <select
                  name="pct"
                  value={formData.pct}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {formData.pct === "Yes" && (
                <>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                      PCT Application No:
                    </label>
                    <input
                      type="text"
                      name="pctApplicationNo"
                      placeholder="e.g. PCT/IB2024/050123"
                      value={formData.pctApplicationNo}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                      PCT Date of filing:
                    </label>
                    <input
                      type="date"
                      name="pctDateOfFiling"
                      value={formData.pctDateOfFiling}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                    />
                  </div>
                </>
              )}

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Form 3 (Section 8):
                </label>
                <select
                  name="form3yn"
                  value={formData.form3yn}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                >
                  <option value="Yes">Yes (Filed)</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Form 18 (Examination):
                </label>
                <input
                  type="text"
                  name="form18"
                  placeholder="e.g. RQ/2026/0129"
                  value={formData.form18}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Granted:
                </label>
                <select
                  name="granted"
                  value={formData.granted}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                >
                  <option value="No">No (Pending)</option>
                  <option value="Yes">Yes (Granted)</option>
                </select>
              </div>

              {formData.granted === "Yes" && (
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                    Patent Number:
                  </label>
                  <input
                    type="text"
                    name="patentNumber"
                    placeholder="e.g. IN 492102"
                    value={formData.patentNumber}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #d2d6de", borderRadius: "3px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: "15px 25px",
          backgroundColor: "#f9f9f9",
          borderTop: "1px solid #f4f4f4",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px"
        }}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "8px 18px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#555",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "3px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSaving}
            style={{
              padding: "8px 24px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "#3c8dbc",
              border: "none",
              borderRadius: "3px",
              cursor: isSaving ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Patent Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
