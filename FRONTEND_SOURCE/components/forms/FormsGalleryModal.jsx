import React, { useState } from "react";
import { PREBUILT_TEMPLATES } from "../../data/prebuiltTemplates";
import { 
  FolderOpen, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  X, 
  Layers, 
  Table2, 
  Sparkles,
  FileText
} from "lucide-react";

export function FormsGalleryModal({
  currentFormId,
  onSelectForm,
  onClose,
  onCreateBlankForm
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Forms" },
    { id: "IN", label: "Indian Patent Office (IPO)" },
    { id: "REQ", label: "Enterprise Requisitions" },
    { id: "US", label: "United States (USPTO)" }
  ];

  const filteredForms = PREBUILT_TEMPLATES.filter(form => {
    const matchesCategory = selectedCategory === "all" || form.categoryCode === selectedCategory;
    const matchesSearch = 
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (form.actReference && form.actReference.toLowerCase().includes(searchQuery.toLowerCase())) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "920px", maxHeight: "88vh" }}>
        {/* Header */}
        <div className="modal-header" style={{ background: "#0f172a", borderBottom: "1px solid #334155" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Layers size={22} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc" }}>
                Select a Form into Drag &amp; Drop Builder
              </h3>
              <span style={{ fontSize: "0.74rem", color: "#94a3b8" }}>
                Choose any official patent form or requisition sheet to edit, drag &amp; drop fields, and auto-fill via API
              </span>
            </div>
          </div>

          <button className="section-action-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div style={{ padding: "0.85rem 1.25rem", background: "#1e293b", borderBottom: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          {/* Category Pills */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  border: selectedCategory === cat.id ? "1px solid #38bdf8" : "1px solid #475569",
                  background: selectedCategory === cat.id ? "#0284c7" : "transparent",
                  color: selectedCategory === cat.id ? "#ffffff" : "#cbd5e1",
                  cursor: "pointer"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: "relative", minWidth: "220px" }}>
            <Search size={14} style={{ position: "absolute", left: "0.6rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.35rem 0.65rem 0.35rem 1.8rem",
                borderRadius: "6px",
                border: "1px solid #475569",
                background: "#0f172a",
                color: "#f8fafc",
                fontSize: "0.76rem",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Forms Grid */}
        <div className="modal-body" style={{ background: "#0b0f19", padding: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "1rem", overflowY: "auto" }}>
          {filteredForms.map(form => {
            const isCurrent = form.id === currentFormId;
            const dynamicTablesCount = form.fields.filter(f => f.type === "dynamic_table").length;
            const staticTextsCount = form.fields.filter(f => f.type === "static_text" || f.isStatic).length;

            return (
              <div
                key={form.id}
                style={{
                  background: isCurrent ? "rgba(2, 132, 199, 0.12)" : "#111827",
                  border: isCurrent ? "1.5px solid #38bdf8" : "1px solid #334155",
                  borderRadius: "10px",
                  padding: "1.15rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.85rem",
                  transition: "all 150ms ease"
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 600 }}>{form.category}</span>
                    </div>

                    {isCurrent && (
                      <span className="badge badge-emerald" style={{ fontSize: "0.62rem" }}>
                        Currently Loaded
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#f8fafc", marginTop: "0.45rem" }}>
                    {form.title}
                  </h4>

                  {form.actReference && (
                    <div style={{ fontSize: "0.7rem", color: "#38bdf8", fontStyle: "italic", marginTop: "2px" }}>
                      {form.actReference}
                    </div>
                  )}

                  <p style={{ fontSize: "0.74rem", color: "#94a3b8", marginTop: "0.45rem", lineHeight: "1.4" }}>
                    {form.description}
                  </p>
                </div>

                {/* Card Meta & Action */}
                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "0.6rem", fontSize: "0.68rem", color: "#64748b" }}>
                    <span>&bull; {form.fields.length} Fields</span>
                    {dynamicTablesCount > 0 && (
                      <span style={{ color: "#4ade80", fontWeight: 600 }}>&bull; {dynamicTablesCount} SQL Tables</span>
                    )}
                    {staticTextsCount > 0 && (
                      <span style={{ color: "#fb923c" }}>&bull; {staticTextsCount} Statutory Texts</span>
                    )}
                  </div>

                  <button
                    className={`btn ${isCurrent ? "btn-secondary" : "btn-primary"} btn-sm`}
                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}
                    onClick={() => {
                      onSelectForm(form);
                      onClose();
                    }}
                  >
                    <span>{isCurrent ? "Active in Canvas" : "Select & Open in Canvas"}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ background: "#0f172a", borderTop: "1px solid #334155", display: "flex", justifyContent: "space-between" }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              onCreateBlankForm();
              onClose();
            }}
          >
            <Plus size={13} />
            <span>Create New Blank Form</span>
          </button>

          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
