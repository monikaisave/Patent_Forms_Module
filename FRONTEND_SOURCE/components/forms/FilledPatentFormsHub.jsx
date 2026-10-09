import React, { useState, useEffect } from "react";
import { 
  Home, 
  Search, 
  Plus, 
  RotateCcw, 
  Trash2, 
  FileText, 
  Sparkles, 
  Printer,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

export function FilledPatentFormsHub({
  forms = [],
  patentsList = [],
  selectedFileNo = "645P",
  onSelectFileNo,
  onOpenFillForm,
  onOpenPdfReport
}) {
  const [selectedTopFormId, setSelectedTopFormId] = useState(forms[0]?.id || "indian_patent_form_3");
  const [selectedTopFileNo, setSelectedTopFileNo] = useState(selectedFileNo || "645P");
  
  // Submissions State
  const [submissions, setSubmissions] = useState([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  const [recordsSearchQuery, setRecordsSearchQuery] = useState("");
  const [recordsPageSize, setRecordsPageSize] = useState(10);

  // Load Submissions from MySQL API
  const fetchSubmissionsList = async () => {
    setIsLoadingSubmissions(true);
    try {
      const ciBase = window.CI_BASE_URL || (typeof window !== "undefined" && window.location.origin ? window.location.origin + "/" : "");
      const res = await fetch(ciBase + "index.php/PatentForms/api_submissions");
      if (res.ok) {
        const d = await res.json();
        if (d.submissions && Array.isArray(d.submissions) && d.submissions.length > 0) {
          setSubmissions(d.submissions);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not fetch submissions from API:", e);
    } finally {
      setIsLoadingSubmissions(false);
    }

    // Default seed record if none fetched
    setSubmissions([
      {
        id: "1",
        file_no: "634P",
        form_code: "indian_patent_form_3",
        form_title: "FORM 3: Statement & Undertaking under Section 8",
        status: "submitted",
        created_at: "2026-10-08 16:04:45",
        form_data: {}
      },
      {
        id: "2",
        file_no: "645P",
        form_code: "indian_patent_form_1",
        form_title: "FORM 1: Application for Grant of Patent",
        status: "draft",
        created_at: "2026-10-08 15:45:10",
        form_data: {}
      }
    ]);
  };

  useEffect(() => {
    fetchSubmissionsList();
  }, []);

  const handleDeleteSubmission = (subId) => {
    if (confirm("Are you sure you want to delete this saved form record?")) {
      setSubmissions(prev => prev.filter(s => s.id !== subId));
    }
  };

  const availablePatents = patentsList && patentsList.length > 0 ? patentsList : [
    { fileNo: "645P", title: "Automated System for Opening and Closing Sliding Doors", appNumber: "645P/ 2021" },
    { fileNo: "634P", title: "Petrol-powered two-wheelers to electrically powered", appNumber: "634P/ 2021" },
    { fileNo: "IN-202411039821", title: "AI-Powered Microfluidic Biosensor", appNumber: "202411039821" },
    { fileNo: "BIP2018001", title: "Device For Continuous Casting Of High-Purity Metal", appNumber: "201821004123" }
  ];

  // Filter Submissions
  const filteredSubmissions = submissions.filter(s => {
    const q = recordsSearchQuery.toLowerCase();
    return (
      (s.file_no || "").toLowerCase().includes(q) ||
      (s.form_title || "").toLowerCase().includes(q) ||
      (s.form_code || "").toLowerCase().includes(q) ||
      (s.status || "").toLowerCase().includes(q)
    );
  });

  const displayedSubmissions = filteredSubmissions.slice(0, recordsPageSize);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f6f9",
      padding: "1.5rem 2rem",
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      color: "#1e293b"
    }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#64748b", marginBottom: "1rem" }}>
        <Home size={15} color="#475569" />
        <span>/</span>
        <span style={{ color: "#1e293b", fontWeight: 600 }}>Fill Patent Form</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
            Filled Patent Forms &amp; Submissions
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.25rem 0 0" }}>
            View all filled statutory forms, generate IPO official PDF reports, or create new filings
          </p>
        </div>
      </div>

      {/* TOP SECTION: Dropdown Form + Dropdown File No + Create & Fill Form Button */}
      <div style={{
        background: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        padding: "1rem 1.25rem",
        marginBottom: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            ✨ <span>New Filing:</span>
          </span>

          {/* 1. Select Form Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Form:</span>
            <select
              value={selectedTopFormId}
              onChange={(e) => setSelectedTopFormId(e.target.value)}
              style={{
                padding: "0.45rem 0.75rem",
                borderRadius: "6px",
                border: "1.5px solid #2563eb",
                background: "#eff6ff",
                fontSize: "0.84rem",
                fontWeight: 700,
                color: "#1d4ed8",
                outline: "none",
                cursor: "pointer",
                minWidth: "220px"
              }}
            >
              {forms.map(f => (
                <option key={f.id} value={f.id}>
                  {f.shortName || f.title}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Select Patent File No Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>File No:</span>
            <select
              value={selectedTopFileNo}
              onChange={(e) => {
                setSelectedTopFileNo(e.target.value);
                if (onSelectFileNo) onSelectFileNo(e.target.value);
              }}
              style={{
                padding: "0.45rem 0.75rem",
                borderRadius: "6px",
                border: "1.5px solid #0284c7",
                background: "#f0f9ff",
                fontSize: "0.84rem",
                fontWeight: 700,
                color: "#0369a1",
                outline: "none",
                cursor: "pointer",
                maxWidth: "280px"
              }}
            >
              {availablePatents.map(p => (
                <option key={p.fileNo} value={p.fileNo}>
                  {p.fileNo} — {p.title?.slice(0, 28) || p.titleOfInvention?.slice(0, 28) || p.appNumber || "Patent"}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Create & Fill Form Button */}
          <button
            onClick={() => {
              const matchedForm = forms.find(f => f.id === selectedTopFormId) || forms[0];
              onOpenFillForm && onOpenFillForm(matchedForm, selectedTopFileNo);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              padding: "0.5rem 1.15rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(37,99,235,0.3)",
              transition: "all 120ms ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#1d4ed8"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#2563eb"}
          >
            <Plus size={16} />
            <span>Create &amp; Fill Form</span>
          </button>
        </div>

        {/* Refresh Submissions Button */}
        <button
          onClick={fetchSubmissionsList}
          disabled={isLoadingSubmissions}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            background: "#f8fafc",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            padding: "0.45rem 0.85rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#475569",
            cursor: "pointer"
          }}
          title="Refresh saved submissions from MySQL database"
        >
          <RotateCcw size={13} className={isLoadingSubmissions ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Table: Filled Form Records & PDFs */}
      <div style={{
        background: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        overflow: "hidden"
      }}>
        {/* Controls Row: Show & Search */}
        <div style={{
          padding: "0.85rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #edf2f7",
          flexWrap: "wrap",
          gap: "0.75rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#475569" }}>
            <span>Show :</span>
            <select
              value={recordsPageSize}
              onChange={(e) => setRecordsPageSize(Number(e.target.value))}
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: "5px",
                padding: "0.25rem 0.5rem",
                fontSize: "0.82rem",
                background: "#ffffff",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div style={{ position: "relative", width: "260px" }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search by file no or form..."
              value={recordsSearchQuery}
              onChange={(e) => setRecordsSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.4rem 0.75rem 0.4rem 2rem",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "0.82rem",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Filled Records Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ width: "35px", padding: "0.85rem 1rem", textAlign: "left" }}>#</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#475569", fontSize: "0.75rem" }}>FILE NO</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#475569", fontSize: "0.75rem" }}>FORM NAME</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#475569", fontSize: "0.75rem" }}>PATENT TITLE / APPLICANT</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#475569", fontSize: "0.75rem" }}>STATUS</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#475569", fontSize: "0.75rem" }}>DATE SAVED</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "right", fontWeight: 700, color: "#475569", fontSize: "0.75rem", width: "240px" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "2.5rem", color: "#94a3b8" }}>
                    No filled records found. Use &quot;Create &amp; Fill Form&quot; above to start your first statutory filing!
                  </td>
                </tr>
              ) : (
                displayedSubmissions.map((sub, idx) => {
                  const patent = availablePatents.find(p => p.fileNo === sub.file_no);
                  const matchedForm = forms.find(f => f.id === sub.form_code) || forms.find(f => f.title === sub.form_title) || forms[0];
                  let customData = null;
                  try {
                    customData = typeof sub.form_data === "string" ? JSON.parse(sub.form_data) : sub.form_data;
                  } catch (e) {}

                  return (
                    <tr
                      key={sub.id || idx}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        background: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                        transition: "background 100ms ease"
                      }}
                    >
                      <td style={{ padding: "1rem", verticalAlign: "middle", color: "#64748b", fontWeight: 600 }}>{idx + 1}</td>
                      <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                        <span style={{
                          background: "#eff6ff",
                          color: "#1d4ed8",
                          border: "1px solid #bfdbfe",
                          padding: "3px 8px",
                          borderRadius: "5px",
                          fontWeight: 700,
                          fontSize: "0.8rem"
                        }}>
                          {sub.file_no}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.85rem" }}>
                            {sub.form_title || matchedForm.title}
                          </span>
                          <span style={{ color: "#64748b", fontSize: "0.72rem" }}>
                            {matchedForm.actReference || "Official Statutory Indian Patent Form"}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", flexDirection: "column", maxWidth: "260px" }}>
                          <span style={{ fontWeight: 600, color: "#334155", fontSize: "0.8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={patent?.titleOfInvention || patent?.title || "Patent"}>
                            {patent?.titleOfInvention || patent?.title || "Automated Patent Filing System"}
                          </span>
                          <span style={{ color: "#64748b", fontSize: "0.72rem" }}>
                            {patent?.applicant?.name || (patent?.applicantsId ? `Applicant ID: ${patent.applicantsId}` : "Indian Applicant")}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          background: sub.status === "submitted" ? "#dcfce7" : "#fef3c7",
                          color: sub.status === "submitted" ? "#166534" : "#92400e",
                          border: `1px solid ${sub.status === "submitted" ? "#86efac" : "#fde68a"}`,
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          textTransform: "capitalize"
                        }}>
                          {sub.status === "submitted" ? "Submitted" : "Draft Saved"}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", verticalAlign: "middle", color: "#475569", fontSize: "0.78rem" }}>
                        {sub.created_at || sub.updated_at || "Just now"}
                      </td>
                      <td style={{ padding: "1rem", verticalAlign: "middle", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                          {/* PDF Report button */}
                          <button
                            onClick={() => onOpenPdfReport && onOpenPdfReport(matchedForm, sub.file_no, customData)}
                            style={{
                              background: "#fef2f2",
                              border: "1px solid #fecaca",
                              color: "#b91c1c",
                              fontWeight: 700,
                              fontSize: "0.76rem",
                              cursor: "pointer",
                              padding: "0.32rem 0.65rem",
                              borderRadius: "5px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              boxShadow: "0 1px 2px rgba(220,38,38,0.08)"
                            }}
                            title={`Generate & Print Official PDF Report for File ${sub.file_no}`}
                          >
                            <FileText size={13} color="#dc2626" />
                            <span>PDF Report</span>
                          </button>

                          {/* Open & Fill button */}
                          <button
                            onClick={() => onOpenFillForm && onOpenFillForm(matchedForm, sub.file_no)}
                            style={{
                              background: "#f0fdf4",
                              border: "1px solid #bbf7d0",
                              color: "#166534",
                              fontWeight: 700,
                              fontSize: "0.76rem",
                              cursor: "pointer",
                              padding: "0.32rem 0.65rem",
                              borderRadius: "5px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem"
                            }}
                            title="Open in form editor"
                          >
                            <Sparkles size={12} color="#16a34a" />
                            <span>Open &amp; Fill</span>
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#94a3b8",
                              cursor: "pointer",
                              padding: "4px"
                            }}
                            title="Delete record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count & info */}
        <div style={{
          padding: "0.85rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #edf2f7",
          fontSize: "0.78rem",
          color: "#64748b"
        }}>
          <span>Showing 1 to {displayedSubmissions.length} of {submissions.length} filled form records</span>
          <span>Brainiac IP Solutions &bull; Official Statutory Records Engine</span>
        </div>
      </div>
    </div>
  );
}
