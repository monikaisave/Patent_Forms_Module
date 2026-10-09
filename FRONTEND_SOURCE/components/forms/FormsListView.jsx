import React, { useState } from "react";
import { 
  Home, 
  Search, 
  Plus, 
  RotateCcw, 
  MoreHorizontal, 
  Copy, 
  Trash2, 
  ExternalLink, 
  Check, 
  FileText, 
  Edit3,
  Calendar,
  Layers,
  Sparkles,
  X
} from "lucide-react";

export function FormsListView({
  forms,
  onOpenBuilder,
  onOpenFillForm,
  onCreateNewForm,
  onDeleteForm,
  onDuplicateForm,
  onUpdateForm
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFormTitle, setNewFormTitle] = useState("");
  const [newApplicationType, setNewApplicationType] = useState("Ordinary Application");
  const [selectedTemplateId, setSelectedTemplateId] = useState("blank");

  // Edit Form Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [editFormTitle, setEditFormTitle] = useState("");
  const [editApplicationType, setEditApplicationType] = useState("Ordinary Application");
  const [editActRef, setEditActRef] = useState("");

  const filteredForms = forms.filter(f => 
    (f.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.shortName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedForms = filteredForms.slice(0, pageSize);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(displayedForms.map(f => f.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newFormTitle.trim()) return;
    onCreateNewForm(newFormTitle.trim(), selectedTemplateId, newApplicationType);
    setShowAddModal(false);
    setNewFormTitle("");
    setNewApplicationType("Ordinary Application");
  };

  const handleOpenEditModal = (form) => {
    setActiveMenuId(null);
    setEditingForm(form);
    setEditFormTitle(form.title || "");
    const appTypeField = form.fields?.find(f => f.id === "f1_application_type");
    setEditApplicationType(form.applicationType || appTypeField?.defaultValue || "Ordinary Application");
    setEditActRef(form.actReference || form.description || "");
    setShowEditModal(true);
  };

  const handleSaveEditSubmit = (e, andOpenBuilder = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingForm || !editFormTitle.trim()) return;

    const updatedFields = editingForm.fields?.map(f => {
      if (f.id === "f1_application_type") {
        return { ...f, defaultValue: editApplicationType };
      }
      return f;
    }) || [];

    const updated = {
      ...editingForm,
      title: editFormTitle.trim(),
      shortName: editFormTitle.trim().length > 30 ? editFormTitle.trim().slice(0, 30) + "..." : editFormTitle.trim(),
      applicationType: editApplicationType,
      actReference: editActRef.trim() || editingForm.actReference,
      lastModified: "Just now",
      fields: updatedFields
    };

    if (onUpdateForm) {
      onUpdateForm(updated);
    }
    setShowEditModal(false);

    if (andOpenBuilder) {
      onOpenBuilder(updated);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    const count = selectedIds.size;
    const confirmMessage = count === 1 
      ? "Are you sure you want to delete the selected form?" 
      : `Are you sure you want to delete ${count} selected forms?`;

    if (confirm(confirmMessage)) {
      onDeleteForm && onDeleteForm(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

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
        <span style={{ color: "#1e293b", fontWeight: 600 }}>Patent Forms</span>
      </div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "#0f172a" }}>
          Patent Forms
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {selectedIds.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              style={{
                background: "#ef4444",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "0.55rem 1.15rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                boxShadow: "0 1px 3px rgba(239,68,68,0.3)",
                transition: "all 150ms ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#dc2626"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#ef4444"}
              title="Delete selected forms"
            >
              <Trash2 size={15} />
              <span>Delete ({selectedIds.size})</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              padding: "0.55rem 1.15rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 1px 2px rgba(37,99,235,0.2)",
              transition: "all 150ms ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#1d4ed8"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#2563eb"}
          >
            <Plus size={16} />
            <span>Add Form</span>
          </button>
        </div>
      </div>

      {/* Main Table Card matching exact screenshot */}
      <div style={{
        background: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        overflow: "hidden"
      }}>
        {/* Controls Row: Show 10 and Search */}
        <div style={{
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #edf2f7"
        }}>
          {/* Show dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem", color: "#475569" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>Show :</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                style={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "5px",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.82rem",
                  background: "#ffffff",
                  color: "#1e293b",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            {selectedIds.size > 0 && (
              <span style={{
                color: "#2563eb",
                fontWeight: 600,
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "0.78rem"
              }}>
                {selectedIds.size} selected
              </span>
            )}
          </div>

          {/* Search box */}
          <div style={{ position: "relative", minWidth: "240px" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.4rem 0.75rem 0.4rem 2rem",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "0.82rem",
                outline: "none",
                color: "#0f172a"
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ width: "42px", padding: "0.85rem 1rem", textAlign: "left" }}>
                  <input
                    type="checkbox"
                    checked={displayedForms.length > 0 && selectedIds.size === displayedForms.length}
                    onChange={handleSelectAll}
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#475569", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                  FORM NAME
                </th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#475569", fontSize: "0.75rem", letterSpacing: "0.05em", width: "220px" }}>
                  LAST MODIFIED ON
                </th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "right", fontWeight: 700, color: "#475569", fontSize: "0.75rem", letterSpacing: "0.05em", width: "200px" }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedForms.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "2.5rem", color: "#94a3b8" }}>
                    No forms found matching your search.
                  </td>
                </tr>
              ) : (
                displayedForms.map((form, index) => {
                  const isChecked = selectedIds.has(form.id);
                  const isMenuOpen = activeMenuId === form.id;
                  const modifiedDate = form.lastModified || `07/10/2026 at ${4 + (index % 4)}:${(15 + index * 7) % 60 < 10 ? "0" : ""}${(15 + index * 7) % 60} pm`;

                  return (
                    <tr
                      key={form.id}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        background: isChecked ? "#eff6ff" : index % 2 === 0 ? "#ffffff" : "#fafafa",
                        transition: "background 100ms ease"
                      }}
                      onMouseEnter={(e) => { if (!isChecked) e.currentTarget.style.background = "#f8fafc"; }}
                      onMouseLeave={(e) => { if (!isChecked) e.currentTarget.style.background = index % 2 === 0 ? "#ffffff" : "#fafafa"; }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(form.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>

                      {/* Form Name & Subtitle Link */}
                      <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                          <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.88rem" }}>
                            {form.title || form.shortName}
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <span style={{ color: "#64748b", fontSize: "0.74rem" }}>
                              {form.actReference || form.description || "Official Statutory Indian Patent Form"}
                              {form.applicationType ? ` • ${form.applicationType}` : ""}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Last Modified On */}
                      <td style={{ padding: "1rem", verticalAlign: "middle", color: "#475569", fontSize: "0.8rem" }}>
                        {modifiedDate}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "1rem", verticalAlign: "middle", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.85rem", position: "relative" }}>
                          {/* Form Builder Blue Button */}
                          <button
                            onClick={() => onOpenBuilder(form)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#2563eb",
                              fontWeight: 700,
                              fontSize: "0.82rem",
                              cursor: "pointer",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "4px",
                              transition: "all 120ms ease"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#eff6ff";
                              e.currentTarget.style.textDecoration = "underline";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.textDecoration = "none";
                            }}
                            title="Manage form and fill data"
                          >
                            Manage Form
                          </button>

                          {/* Three dots menu */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(isMenuOpen ? null : form.id);
                            }}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#64748b",
                              cursor: "pointer",
                              padding: "4px",
                              display: "flex",
                              alignItems: "center"
                            }}
                            title="More options"
                          >
                            <MoreHorizontal size={16} />
                          </button>

                          {/* Action Popover Menu */}
                          {isMenuOpen && (
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: "100%",
                                marginTop: "4px",
                                background: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "6px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                width: "160px",
                                zIndex: 50,
                                overflow: "hidden"
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => handleOpenEditModal(form)}
                                style={{
                                  width: "100%",
                                  padding: "0.55rem 0.85rem",
                                  textAlign: "left",
                                  background: "none",
                                  border: "none",
                                  fontSize: "0.78rem",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  color: "#1e293b"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                              >
                                <Edit3 size={13} color="#2563eb" />
                                <span>Edit Form</span>
                              </button>

                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  onDuplicateForm && onDuplicateForm(form);
                                }}
                                style={{
                                  width: "100%",
                                  padding: "0.55rem 0.85rem",
                                  textAlign: "left",
                                  background: "none",
                                  border: "none",
                                  fontSize: "0.78rem",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  color: "#1e293b"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                              >
                                <Copy size={13} color="#64748b" />
                                <span>Duplicate</span>
                              </button>

                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  if (confirm(`Are you sure you want to delete ${form.title}?`)) {
                                    onDeleteForm && onDeleteForm(form.id);
                                  }
                                }}
                                style={{
                                  width: "100%",
                                  padding: "0.55rem 0.85rem",
                                  textAlign: "left",
                                  background: "none",
                                  border: "none",
                                  fontSize: "0.78rem",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  color: "#ef4444",
                                  borderTop: "1px solid #f1f5f9"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                              >
                                <Trash2 size={13} />
                                <span>Delete Form</span>
                              </button>
                            </div>
                          )}
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
          <span>Showing 1 to {displayedForms.length} of {forms.length} entries</span>
          <span>Brainiac IP Solutions &bull; Form Management System</span>
        </div>
      </div>

      {/* Add Form Modal */}
      {showAddModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          backdropFilter: "blur(2px)"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "520px",
            padding: "1.75rem",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
          }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#0f172a" }}>
              Create New Patent Form
            </h2>
            <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 1.25rem" }}>
              Enter a title and select a starting template. The Form Builder dashboard will open immediately.
            </p>

            <form onSubmit={handleCreateSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                  Form Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Form 18: Request for Examination"
                  value={newFormTitle}
                  onChange={(e) => setNewFormTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    outline: "none"
                  }}
                  autoFocus
                />
              </div>

              {/* Type of Application */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                  Type of Application <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    border: `1.5px solid ${newApplicationType === "Ordinary Application" ? "#2563eb" : "#e2e8f0"}`,
                    borderRadius: "6px",
                    background: newApplicationType === "Ordinary Application" ? "#eff6ff" : "#ffffff",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: newApplicationType === "Ordinary Application" ? 600 : 500,
                    color: newApplicationType === "Ordinary Application" ? "#1e40af" : "#334155"
                  }}>
                    <input
                      type="radio"
                      name="newAppType"
                      value="Ordinary Application"
                      checked={newApplicationType === "Ordinary Application"}
                      onChange={(e) => setNewApplicationType(e.target.value)}
                    />
                    <span>Ordinary</span>
                  </label>

                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    border: `1.5px solid ${newApplicationType === "Convention Application" ? "#2563eb" : "#e2e8f0"}`,
                    borderRadius: "6px",
                    background: newApplicationType === "Convention Application" ? "#eff6ff" : "#ffffff",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: newApplicationType === "Convention Application" ? 600 : 500,
                    color: newApplicationType === "Convention Application" ? "#1e40af" : "#334155"
                  }}>
                    <input
                      type="radio"
                      name="newAppType"
                      value="Convention Application"
                      checked={newApplicationType === "Convention Application"}
                      onChange={(e) => setNewApplicationType(e.target.value)}
                    />
                    <span>Conventional</span>
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                  Base Template or Statutory Structure
                </label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    background: "#ffffff",
                    outline: "none"
                  }}
                >
                  <option value="blank">Blank Form Canvas (All New - Build from scratch)</option>
                  {forms.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.title}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    borderRadius: "6px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#475569",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "0.5rem 1.25rem",
                    background: "#2563eb",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  Create &amp; Open Builder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Form Right Slide-over Side Drawer */}
      {showEditModal && editingForm && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 100,
            backdropFilter: "blur(2px)"
          }}
          onClick={() => setShowEditModal(false)}
        >
          <div 
            style={{
              background: "#ffffff",
              width: "100%",
              maxWidth: "500px",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 25px rgba(0, 0, 0, 0.15)",
              animation: "slideInRight 200ms ease"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header matching screenshot */}
            <div style={{
              padding: "1.25rem 1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e2e8f0"
            }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, color: "#0f172a" }}>
                Edit Form
              </h2>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Form Body */}
            <form 
              onSubmit={(e) => handleSaveEditSubmit(e, false)}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden"
              }}
            >
              <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.75rem"
              }}>
                {/* Form Name */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.45rem" }}>
                    Form Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FORM 1: Application for Grant of Patent"
                    value={editFormTitle}
                    onChange={(e) => setEditFormTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      outline: "none",
                      color: "#0f172a"
                    }}
                    autoFocus
                  />
                </div>

                {/* Type of Application */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.45rem" }}>
                    Type of Application <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "0.3rem 0 0.6rem" }}>
                    {/* Ordinary Option */}
                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      color: "#1e293b"
                    }}>
                      <input
                        type="radio"
                        name="editAppType"
                        value="Ordinary Application"
                        checked={editApplicationType === "Ordinary Application"}
                        onChange={(e) => setEditApplicationType(e.target.value)}
                        style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "#2563eb" }}
                      />
                      <span>Ordinary</span>
                    </label>

                    {/* Conventional Option */}
                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      color: "#1e293b"
                    }}>
                      <input
                        type="radio"
                        name="editAppType"
                        value="Convention Application"
                        checked={editApplicationType === "Convention Application"}
                        onChange={(e) => setEditApplicationType(e.target.value)}
                        style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "#2563eb" }}
                      />
                      <span>Conventional</span>
                    </label>
                  </div>

                  {/* Additional Specific Application Types */}
                  <div style={{ marginTop: "0.5rem" }}>
                    <select
                      value={["Ordinary Application", "Convention Application"].includes(editApplicationType) ? "" : editApplicationType}
                      onChange={(e) => {
                        if (e.target.value) setEditApplicationType(e.target.value);
                      }}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        background: "#ffffff",
                        color: "#475569",
                        outline: "none"
                      }}
                    >
                      <option value="">-- Other Application Categories --</option>
                      <option value="PCT National Phase Application">PCT National Phase Application (PCT-NP)</option>
                      <option value="Divisional Application">Divisional Application</option>
                      <option value="Patent of Addition">Patent of Addition</option>
                    </select>
                  </div>
                </div>

                {/* Act Reference / Subtitle */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.45rem" }}>
                    Act Reference / Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Patents Act 1970 (39 OF 1970) & The Patents Rules, 2003"
                    value={editActRef}
                    onChange={(e) => setEditActRef(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      outline: "none",
                      color: "#0f172a"
                    }}
                  />
                </div>

                {/* Cancel & Save Action Buttons directly below fields */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  marginTop: "2rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid #f1f5f9"
                }}>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    style={{
                      padding: "0.55rem 1.25rem",
                      border: "1px solid #cbd5e1",
                      background: "#ffffff",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#475569",
                      cursor: "pointer",
                      transition: "all 120ms ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#ffffff"}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "0.55rem 1.75rem",
                      background: "#2563eb",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      cursor: "pointer",
                      boxShadow: "0 1px 3px rgba(37,99,235,0.3)",
                      transition: "all 120ms ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#1d4ed8"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#2563eb"}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
