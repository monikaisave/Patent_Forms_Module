import React, { useState, useEffect } from "react";
import { PatentApiService } from "../../services/patentApiService";
import { MOCK_PATENT_DATABASE } from "../../data/mockPatents";
import { PREBUILT_TEMPLATES } from "../../data/prebuiltTemplates";
import { OfficialPaperPrintModal } from "../print/OfficialPaperPrintModal";
import { 
  Search, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  RotateCcw, 
  Printer, 
  Save, 
  Plus, 
  Trash2,
  FileText,
  SlidersHorizontal,
  ChevronDown,
  Info,
  ArrowLeft,
  Edit3,
  Check,
  Eye,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Database,
  X
} from "lucide-react";

export function FormRuntime({
  forms = PREBUILT_TEMPLATES,
  currentForm: propForm,
  onSelectForm,
  patentsList = [],
  selectedFileNo: initialFileNo = "645P",
  onSelectFileNo,
  onBackToList,
  onGoToBuilder
}) {
  const [activeForm, setActiveForm] = useState(propForm || forms[0] || PREBUILT_TEMPLATES[0]);
  const [lookupFileNo, setLookupFileNo] = useState(initialFileNo || "645P");
  const [formData, setFormData] = useState({});
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [apiError, setApiError] = useState("");
  const [lastAutoFillStats, setLastAutoFillStats] = useState(null);
  const [recentlyPopulatedIds, setRecentlyPopulatedIds] = useState(new Set());
  const [validationErrors, setValidationErrors] = useState({});
  const [showInspectorRules, setShowInspectorRules] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Sync activeForm if prop changes
  useEffect(() => {
    if (propForm && propForm.id !== activeForm.id) {
      setActiveForm(propForm);
    }
  }, [propForm]);

  // Initialize or rehydrate default form data when activeForm changes
  useEffect(() => {
    const initial = {};
    if (activeForm && activeForm.fields) {
      activeForm.fields.forEach(f => {
        if (f.type === "dynamic_table" || f.type === "repeater") {
          initial[f.id] = f.defaultRows || [];
        } else if (f.type === "checkbox") {
          initial[f.id] = false;
        } else {
          initial[f.id] = f.defaultValue !== undefined ? f.defaultValue : (f.content || "");
        }
      });
    }
    setFormData(initial);
    setValidationErrors({});
    setSaveSuccessMsg("");

    // Automatically trigger auto-fetch for current file number
    if (lookupFileNo) {
      handleAutoFetch(lookupFileNo, activeForm);
    }
  }, [activeForm.id]);

  // Live field change handler
  const handleFieldChange = (fieldId, val) => {
    setFormData(prev => ({ ...prev, [fieldId]: val }));
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  // Evaluate conditional show/hide rule
  const evaluateRule = (field) => {
    if (!field.conditionalRule || !field.conditionalRule.enabled) {
      return { visible: true, ruleText: "Always Visible" };
    }
    const { sourceFieldId, operator, value } = field.conditionalRule;
    if (!sourceFieldId) return { visible: true, ruleText: "Always Visible" };

    const sourceVal = formData[sourceFieldId];
    let isVisible = true;

    if (operator === "equals") {
      isVisible = String(sourceVal || "").trim().toLowerCase() === String(value || "").trim().toLowerCase();
    } else if (operator === "not_equals") {
      isVisible = String(sourceVal || "").trim().toLowerCase() !== String(value || "").trim().toLowerCase();
    } else if (operator === "contains") {
      isVisible = String(sourceVal || "").toLowerCase().includes(String(value || "").toLowerCase());
    } else if (operator === "is_filled") {
      isVisible = sourceVal !== undefined && sourceVal !== null && sourceVal !== "" && sourceVal !== false;
    }

    const ruleText = `Show IF [${sourceFieldId}] ${operator} "${value || ""}"`;
    return { visible: isVisible, ruleText };
  };

  // Auto-Fetch Patent Details and Relational Tables
  const handleAutoFetch = async (targetFileNo, targetForm = activeForm) => {
    const fileNoToQuery = targetFileNo || lookupFileNo;
    if (!fileNoToQuery || !fileNoToQuery.trim()) {
      setApiError("Please select or enter a Patent File Number.");
      return;
    }

    setIsLoadingApi(true);
    setApiError("");
    setSaveSuccessMsg("");

    try {
      const patentRecord = await PatentApiService.fetchByFileNo(fileNoToQuery.trim());
      const { values, populatedFieldsCount, mappedFieldIds, auditLog } = 
        PatentApiService.autoPopulateFormData(patentRecord, targetForm.fields);

      setFormData(prev => ({
        ...prev,
        ...values,
        file_lookup: patentRecord.fileNo,
        patent_file_no: patentRecord.fileNo
      }));

      // Highlight fields populated by database
      setRecentlyPopulatedIds(new Set(mappedFieldIds));
      setTimeout(() => {
        setRecentlyPopulatedIds(new Set());
      }, 4000);

      setLastAutoFillStats({
        fileNo: patentRecord.fileNo,
        title: patentRecord.title,
        applicant: patentRecord.applicant?.name || "Inventor / Applicant",
        count: populatedFieldsCount,
        auditLog
      });

      if (onSelectFileNo) {
        onSelectFileNo(patentRecord.fileNo);
      }
    } catch (err) {
      console.warn("Auto-fetch fallback notice:", err);
      setApiError(err.message || "Failed to fetch patent data from registry.");
    } finally {
      setIsLoadingApi(false);
    }
  };

  // Table row additions/deletions
  const handleAddTableRow = (fieldId, columns) => {
    const newRow = { id: `row-${Date.now()}` };
    columns.forEach(c => {
      newRow[c.key] = "";
    });
    setFormData(prev => ({
      ...prev,
      [fieldId]: [...(prev[fieldId] || []), newRow]
    }));
  };

  const handleUpdateTableCell = (fieldId, rowIdx, colKey, val) => {
    setFormData(prev => {
      const currentRows = [...(prev[fieldId] || [])];
      currentRows[rowIdx] = { ...currentRows[rowIdx], [colKey]: val };
      return { ...prev, [fieldId]: currentRows };
    });
  };

  const handleDeleteTableRow = (fieldId, rowIdx) => {
    setFormData(prev => {
      const currentRows = [...(prev[fieldId] || [])];
      currentRows.splice(rowIdx, 1);
      return { ...prev, [fieldId]: currentRows };
    });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    activeForm.fields.forEach(field => {
      const { visible } = evaluateRule(field);
      if (!visible) return;

      const val = formData[field.id];
      const isReq = field.required || field.validation?.required;

      if (isReq) {
        if (field.type === "checkbox" && !val) {
          errors[field.id] = "You must check and agree to this statutory requirement.";
        } else if ((field.type === "dynamic_table" || field.type === "repeater") && (!val || val.length === 0)) {
          errors[field.id] = "At least one row must be filled in this table.";
        } else if (val === undefined || val === null || String(val).trim() === "") {
          errors[field.id] = `${field.label || field.name || "This field"} is required.`;
        }
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Submission to Database
  const handleSaveSubmission = async () => {
    if (!validateForm()) {
      alert("Please resolve the highlighted validation errors before saving.");
      return;
    }

    setIsSaving(true);
    setSaveSuccessMsg("");

    try {
      const res = await PatentApiService.saveSubmission({
        formSchemaId: activeForm.id,
        formTitle: activeForm.title,
        fileNo: lookupFileNo,
        data: formData,
        status: "submitted"
      });

      setSaveSuccessMsg(res.message || `Form submission saved successfully for File No: ${lookupFileNo}`);
    } catch (e) {
      console.error(e);
      setSaveSuccessMsg(`Form saved locally in browser state for File No: ${lookupFileNo}`);
    } finally {
      setIsSaving(false);
    }
  };

  const allAvailablePatents = patentsList && patentsList.length > 0 ? patentsList : MOCK_PATENT_DATABASE;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#f1f5f9",
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      color: "#0f172a",
      overflow: "hidden"
    }}>
      {/* 1. TOP HEADER & WORKSPACE NAVIGATION */}
      <header style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0.6rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.75rem",
        zIndex: 20,
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
      }}>
        {/* Left: Navigation and Form Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {onBackToList && (
            <button
              onClick={onBackToList}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                padding: "0.35rem 0.65rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1e293b",
                cursor: "pointer"
              }}
              title="Return to Patent Forms Table"
            >
              <ArrowLeft size={14} />
              <span>Forms List</span>
            </button>
          )}

          {/* Form Template Picker */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>Form:</span>
            <select
              style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "6px",
                border: "1.5px solid #2563eb",
                background: "#eff6ff",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#1e40af",
                outline: "none",
                cursor: "pointer"
              }}
              value={activeForm.id}
              onChange={(e) => {
                const selected = forms.find(f => f.id === e.target.value) || PREBUILT_TEMPLATES.find(f => f.id === e.target.value);
                if (selected) {
                  setActiveForm(selected);
                  if (onSelectForm) onSelectForm(selected);
                }
              }}
            >
              {(forms && forms.length > 0 ? forms : PREBUILT_TEMPLATES).map(f => (
                <option key={f.id} value={f.id}>
                  {f.shortName || f.title}
                </option>
              ))}
            </select>
          </div>

          {/* Patent File No Selector & Auto-Fill */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>File No:</span>
            <select
              style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#0f172a",
                maxWidth: "240px",
                outline: "none"
              }}
              value={lookupFileNo}
              onChange={(e) => {
                setLookupFileNo(e.target.value);
                if (onSelectFileNo) onSelectFileNo(e.target.value);
                handleAutoFetch(e.target.value);
              }}
            >
              {allAvailablePatents.map(p => (
                <option key={p.fileNo} value={p.fileNo}>
                  {p.fileNo} — {p.applicant?.name || p.appNumber || p.title?.slice(0, 20) || "Patent"}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleAutoFetch(lookupFileNo)}
              disabled={isLoadingApi}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "6px",
                background: "#0284c7",
                color: "#ffffff",
                border: "none",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
              title="Auto-fetch patent data from MySQL and hydrate form"
            >
              {isLoadingApi ? <Loader2 size={13} className="animate-spin" /> : <Zap size={13} />}
              <span>Auto-Fill</span>
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Rule Engine / Inspector Toggle */}
          <button
            onClick={() => setShowInspectorRules(!showInspectorRules)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              background: showInspectorRules ? "#eff6ff" : "#ffffff",
              border: `1px solid ${showInspectorRules ? "#93c5fd" : "#cbd5e1"}`,
              color: showInspectorRules ? "#1d4ed8" : "#334155",
              borderRadius: "6px",
              padding: "0.38rem 0.75rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
            title="Inspect field configurations, validations, and conditional show/hide rules"
          >
            <SlidersHorizontal size={14} />
            <span>Rules & Inspector</span>
          </button>

          {/* Print & Official PDF */}
          <button
            onClick={() => setShowPrintModal(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              background: "#1e293b",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              padding: "0.38rem 0.85rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
            title="Template-Based Official Printable Patent Layout & PDF Engine"
          >
            <Printer size={14} />
            <span>Review & Export PDF</span>
          </button>

          {/* Save Submission */}
          <button
            onClick={handleSaveSubmission}
            disabled={isSaving}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              background: "#16a34a",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              padding: "0.38rem 0.85rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
            title="Save completed submission to MySQL database"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>Save Submission</span>
          </button>

          {/* Switch to Builder */}
          {onGoToBuilder && (
            <button
              onClick={onGoToBuilder}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                padding: "0.38rem 0.75rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#475569",
                cursor: "pointer"
              }}
              title="Switch to visual drag & drop builder"
            >
              <Edit3 size={13} />
              <span>Design Layout</span>
            </button>
          )}
        </div>
      </header>

      {/* Notification Toasts */}
      {saveSuccessMsg && (
        <div style={{
          background: "#dcfce7",
          borderBottom: "1px solid #86efac",
          color: "#166534",
          padding: "0.45rem 1.25rem",
          fontSize: "0.78rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <CheckCircle2 size={15} color="#16a34a" />
            <span>{saveSuccessMsg}</span>
          </div>
          <button onClick={() => setSaveSuccessMsg("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#166534" }}>
            <X size={14} />
          </button>
        </div>
      )}

      {apiError && (
        <div style={{
          background: "#fee2e2",
          borderBottom: "1px solid #fca5a5",
          color: "#991b1b",
          padding: "0.45rem 1.25rem",
          fontSize: "0.78rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <AlertCircle size={15} color="#dc2626" />
            <span>{apiError}</span>
          </div>
          <button onClick={() => setApiError("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#991b1b" }}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Status Bar */}
      {lastAutoFillStats && (
        <div style={{
          background: "#f0fdf4",
          borderBottom: "1px solid #bbf7d0",
          padding: "0.35rem 1.25rem",
          fontSize: "0.74rem",
          color: "#166534",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <span>
            ⚡ <strong>Synced with MySQL:</strong> File No <strong>{lastAutoFillStats.fileNo}</strong> &bull; Title: &ldquo;{lastAutoFillStats.title}&rdquo; &bull; Populated <strong>{lastAutoFillStats.count} fields</strong>
          </span>
          <span style={{ color: "#15803d", fontWeight: 600 }}>Ready for Statutory Filing</span>
        </div>
      )}

      {/* 2. MAIN BODY: FORM DOCUMENT RUNTIME + OPTIONAL PROPERTY INSPECTOR */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* CENTER / DOCUMENT CANVAS: UNIVERSAL FORM RUNTIME */}
        <main style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.75rem 2.5rem",
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
            width: "100%",
            maxWidth: "920px",
            background: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
            padding: "2.5rem 3rem"
          }}>
            {/* Official Document Statutory Header */}
            <div style={{
              textAlign: "center",
              borderBottom: "2px solid #0f172a",
              paddingBottom: "1.25rem",
              marginBottom: "1.75rem"
            }}>
              <span style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#2563eb",
                display: "block",
                marginBottom: "0.25rem"
              }}>
                {activeForm.jurisdiction || "GOVERNMENT OF INDIA &bull; PATENT OFFICE"}
              </span>

              <h1 style={{
                fontSize: "1.35rem",
                fontWeight: 800,
                margin: "0 0 0.35rem",
                color: "#0f172a",
                textTransform: "uppercase",
                letterSpacing: "0.02em"
              }}>
                {activeForm.title}
              </h1>

              {activeForm.actReference && (
                <p style={{ fontSize: "0.82rem", color: "#475569", margin: "0 0 0.5rem", fontStyle: "italic" }}>
                  {activeForm.actReference}
                </p>
              )}

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#f1f5f9",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#334155"
              }}>
                <span>File No: {lookupFileNo}</span>
                <span>&bull;</span>
                <span>Category: {activeForm.category || "Statutory Form"}</span>
              </div>
            </div>

            {/* Form Sections & Fields */}
            <form onSubmit={(e) => { e.preventDefault(); handleSaveSubmission(); }}>
              {activeForm.sections.map((section, sIdx) => {
                const sectionFields = activeForm.fields.filter(f => f.sectionId === section.id);
                if (sectionFields.length === 0) return null;

                return (
                  <div key={section.id || sIdx} style={{ marginBottom: "2rem" }}>
                    {/* Section Header */}
                    <div style={{
                      borderBottom: "1px solid #cbd5e1",
                      paddingBottom: "0.4rem",
                      marginBottom: "1rem"
                    }}>
                      <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                        {section.title}
                      </h2>
                      {section.description && (
                        <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0.2rem 0 0" }}>
                          {section.description}
                        </p>
                      )}
                    </div>

                    {/* Section Fields Grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(12, 1fr)",
                      gap: "1rem",
                      alignItems: "start"
                    }}>
                      {sectionFields.map((field) => {
                        const { visible, ruleText } = evaluateRule(field);
                        if (!visible) return null;

                        const isPopulated = recentlyPopulatedIds.has(field.id);
                        const error = validationErrors[field.id];
                        const colSpan = field.width === 33 ? 4 : field.width === 50 ? 6 : field.width === 66 ? 8 : 12;

                        return (
                          <div
                            key={field.id}
                            style={{
                              gridColumn: `span ${colSpan}`,
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.35rem",
                              position: "relative"
                            }}
                          >
                            {/* Field Label & Auto-Fill Badge */}
                            {field.type !== "static_text" && (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <label style={{
                                  fontSize: "0.78rem",
                                  fontWeight: 600,
                                  color: "#334155",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.25rem"
                                }}>
                                  <span>{field.label || field.name}</span>
                                  {(field.required || field.validation?.required) && (
                                    <span style={{ color: "#ef4444" }}>*</span>
                                  )}
                                </label>

                                {field.apiMapping && (
                                  <span style={{
                                    fontSize: "0.62rem",
                                    fontWeight: 700,
                                    padding: "1px 5px",
                                    borderRadius: "3px",
                                    background: isPopulated ? "#bbf7d0" : "#f1f5f9",
                                    color: isPopulated ? "#166534" : "#64748b",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "3px"
                                  }} title={`Mapped to SQL / API: ${field.apiMapping}`}>
                                    <Database size={10} />
                                    <span>{field.apiMapping.split(".").pop()}</span>
                                  </span>
                                )}
                              </div>
                            )}

                            {/* 1. Static Text */}
                            {field.type === "static_text" && (
                              <div style={{
                                background: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                borderRadius: "6px",
                                padding: "0.85rem 1rem",
                                fontSize: "0.82rem",
                                lineHeight: 1.6,
                                color: "#334155",
                                whiteSpace: "pre-line"
                              }}>
                                {formData[field.id] || field.content || ""}
                              </div>
                            )}

                            {/* 2. Text Input */}
                            {(field.type === "text" || !field.type) && (
                              <input
                                type="text"
                                value={formData[field.id] || ""}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder={field.placeholder || `Enter ${field.label}...`}
                                style={{
                                  padding: "0.5rem 0.75rem",
                                  borderRadius: "6px",
                                  border: `1px solid ${error ? "#ef4444" : isPopulated ? "#16a34a" : "#cbd5e1"}`,
                                  background: isPopulated ? "#f0fdf4" : "#ffffff",
                                  fontSize: "0.85rem",
                                  color: "#0f172a",
                                  outline: "none",
                                  transition: "all 150ms ease"
                                }}
                              />
                            )}

                            {/* 3. Text Area */}
                            {field.type === "textarea" && (
                              <textarea
                                rows={field.rows || 3}
                                value={formData[field.id] || ""}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder={field.placeholder || `Enter ${field.label}...`}
                                style={{
                                  padding: "0.5rem 0.75rem",
                                  borderRadius: "6px",
                                  border: `1px solid ${error ? "#ef4444" : isPopulated ? "#16a34a" : "#cbd5e1"}`,
                                  background: isPopulated ? "#f0fdf4" : "#ffffff",
                                  fontSize: "0.85rem",
                                  color: "#0f172a",
                                  outline: "none",
                                  resize: "vertical"
                                }}
                              />
                            )}

                            {/* 4. Number Input */}
                            {field.type === "number" && (
                              <input
                                type="number"
                                value={formData[field.id] || ""}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder="0"
                                style={{
                                  padding: "0.5rem 0.75rem",
                                  borderRadius: "6px",
                                  border: `1px solid ${error ? "#ef4444" : "#cbd5e1"}`,
                                  background: "#ffffff",
                                  fontSize: "0.85rem",
                                  outline: "none"
                                }}
                              />
                            )}

                            {/* 5. Date Input */}
                            {field.type === "date" && (
                              <input
                                type="date"
                                value={formData[field.id] || ""}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                style={{
                                  padding: "0.5rem 0.75rem",
                                  borderRadius: "6px",
                                  border: `1px solid ${error ? "#ef4444" : "#cbd5e1"}`,
                                  background: "#ffffff",
                                  fontSize: "0.85rem",
                                  outline: "none"
                                }}
                              />
                            )}

                            {/* 6. Dropdown / Select */}
                            {field.type === "dropdown" && (
                              <select
                                value={formData[field.id] || ""}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                style={{
                                  padding: "0.5rem 0.75rem",
                                  borderRadius: "6px",
                                  border: `1px solid ${error ? "#ef4444" : "#cbd5e1"}`,
                                  background: "#ffffff",
                                  fontSize: "0.85rem",
                                  outline: "none"
                                }}
                              >
                                <option value="">Select option...</option>
                                {(field.options || ["Yes", "No"]).map((opt, oIdx) => {
                                  const val = typeof opt === "string" ? opt : (opt.value !== undefined ? opt.value : opt.label);
                                  const lbl = typeof opt === "string" ? opt : (opt.label || opt.value);
                                  return (
                                    <option key={oIdx} value={val}>
                                      {lbl}
                                    </option>
                                  );
                                })}
                              </select>
                            )}

                            {/* 7. Checkbox */}
                            {field.type === "checkbox" && (
                              <label style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                cursor: "pointer",
                                fontSize: "0.82rem",
                                color: "#1e293b"
                              }}>
                                <input
                                  type="checkbox"
                                  checked={!!formData[field.id]}
                                  onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                                />
                                <span>{field.label}</span>
                              </label>
                            )}

                            {/* 8. Dynamic SQL Table / Repeater */}
                            {(field.type === "dynamic_table" || field.type === "repeater") && (
                              <div style={{
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                overflow: "hidden",
                                background: "#ffffff"
                              }}>
                                <div style={{
                                  padding: "0.5rem 0.75rem",
                                  background: "#f8fafc",
                                  borderBottom: "1px solid #e2e8f0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between"
                                }}>
                                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#475569" }}>
                                    {field.label} ({(formData[field.id] || []).length} Rows)
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddTableRow(field.id, field.columns || [])}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "0.25rem",
                                      padding: "0.25rem 0.5rem",
                                      borderRadius: "4px",
                                      background: "#2563eb",
                                      color: "#fff",
                                      border: "none",
                                      fontSize: "0.72rem",
                                      fontWeight: 600,
                                      cursor: "pointer"
                                    }}
                                  >
                                    <Plus size={12} />
                                    <span>Add Row</span>
                                  </button>
                                </div>

                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                                  <thead>
                                    <tr style={{ background: "#f1f5f9", textAlign: "left", color: "#475569" }}>
                                      <th style={{ padding: "0.45rem 0.6rem", width: "35px" }}>#</th>
                                      {(field.columns || []).map((col, cIdx) => (
                                        <th key={cIdx} style={{ padding: "0.45rem 0.6rem" }}>
                                          {col.label}
                                        </th>
                                      ))}
                                      <th style={{ padding: "0.45rem 0.6rem", width: "45px", textAlign: "center" }}>Act</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(formData[field.id] || []).map((row, rIdx) => (
                                      <tr key={row.id || rIdx} style={{ borderTop: "1px solid #f1f5f9" }}>
                                        <td style={{ padding: "0.45rem 0.6rem", color: "#64748b", fontWeight: 600 }}>{rIdx + 1}</td>
                                        {(field.columns || []).map((col, cIdx) => (
                                          <td key={cIdx} style={{ padding: "0.35rem 0.6rem" }}>
                                            <input
                                              type="text"
                                              value={row[col.key] !== undefined ? row[col.key] : ""}
                                              onChange={(e) => handleUpdateTableCell(field.id, rIdx, col.key, e.target.value)}
                                              placeholder={col.placeholder || col.label}
                                              style={{
                                                width: "100%",
                                                padding: "0.3rem 0.5rem",
                                                borderRadius: "4px",
                                                border: "1px solid #cbd5e1",
                                                fontSize: "0.78rem",
                                                outline: "none"
                                              }}
                                            />
                                          </td>
                                        ))}
                                        <td style={{ padding: "0.35rem 0.6rem", textAlign: "center" }}>
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteTableRow(field.id, rIdx)}
                                            style={{
                                              background: "transparent",
                                              border: "none",
                                              color: "#ef4444",
                                              cursor: "pointer",
                                              padding: "2px"
                                            }}
                                            title="Delete Row"
                                          >
                                            <Trash2 size={13} />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                    {(formData[field.id] || []).length === 0 && (
                                      <tr>
                                        <td colSpan={(field.columns?.length || 1) + 2} style={{ padding: "0.85rem", textAlign: "center", color: "#94a3b8" }}>
                                          No rows yet. Click &quot;Add Row&quot; or auto-fetch from File No.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* Validation error message */}
                            {error && (
                              <span style={{ fontSize: "0.72rem", color: "#ef4444", fontWeight: 600 }}>
                                {error}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

            </form>
          </div>
        </main>

        {/* 3. REQUIREMENT 5: FIELD PROPERTY INSPECTOR & RULE ENGINE DRAWER */}
        {showInspectorRules && (
          <aside style={{
            width: "360px",
            background: "#ffffff",
            borderLeft: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            zIndex: 10
          }}>
            <div style={{
              padding: "0.85rem 1rem",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <SlidersHorizontal size={16} color="#2563eb" />
                <h3 style={{ fontSize: "0.85rem", fontWeight: 700, margin: 0, color: "#0f172a" }}>
                  Field Inspector &amp; Rule Engine
                </h3>
              </div>
              <button
                onClick={() => setShowInspectorRules(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <X size={15} />
              </button>
            </div>

            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Field Schema & Rules Summary */}
              <div style={{
                background: "#f8fafc",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                padding: "0.75rem",
                fontSize: "0.75rem"
              }}>
                <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: "0.35rem" }}>
                  Active Form Schema Engine
                </div>
                <div style={{ color: "#64748b", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  <span>&bull; Form: {activeForm.title}</span>
                  <span>&bull; Total Fields: {activeForm.fields.length}</span>
                  <span>&bull; Target File: {lookupFileNo}</span>
                  <span>&bull; Jurisdiction: {activeForm.jurisdiction || "IPO (Mumbai)"}</span>
                </div>
              </div>

              {/* Conditional Show/Hide Rules */}
              <div>
                <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Conditional Rules (Show / Hide)
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {activeForm.fields.map(f => {
                    const { visible, ruleText } = evaluateRule(f);

                    return (
                      <div
                        key={f.id}
                        style={{
                          padding: "0.5rem 0.65rem",
                          borderRadius: "5px",
                          border: "1px solid #e2e8f0",
                          background: visible ? "#ffffff" : "#fef2f2",
                          fontSize: "0.74rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontWeight: 600, color: "#1e293b" }}>{f.label || f.name}</span>
                          <span style={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            padding: "1px 5px",
                            borderRadius: "3px",
                            background: visible ? "#dcfce7" : "#fee2e2",
                            color: visible ? "#166534" : "#991b1b"
                          }}>
                            {visible ? "VISIBLE" : "HIDDEN"}
                          </span>
                        </div>

                        <span style={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "monospace" }}>
                          {ruleText}
                        </span>

                        {f.validation?.required && (
                          <span style={{ fontSize: "0.65rem", color: "#dc2626", fontWeight: 600 }}>
                            Constraint: Required field
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* 4. REQUIREMENT 7: OFFICIAL PAPER PRINT MODAL */}
      {showPrintModal && (
        <OfficialPaperPrintModal
          form={activeForm}
          formData={formData}
          fileNo={lookupFileNo}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
}
