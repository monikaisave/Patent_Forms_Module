import React, { useState } from "react";
import { 
  Type, 
  AlignLeft, 
  Hash, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ToggleLeft, 
  ListFilter, 
  CheckSquare, 
  DollarSign, 
  Mail, 
  User, 
  CircleDot, 
  Search, 
  GripVertical, 
  Database, 
  Sparkles, 
  Zap, 
  Table2, 
  FileCheck2, 
  ScrollText,
  Layers,
  ArrowRight,
  Plus
} from "lucide-react";
import { PREBUILT_TEMPLATES } from "../../data/prebuiltTemplates";

export const ALL_BUILDER_FIELDS = [
  { id: "text", label: "Text", icon: Type, type: "text", category: "all", defaultWidth: 50 },
  { id: "textarea", label: "Text area", icon: AlignLeft, type: "textarea", category: "all", defaultWidth: 100 },
  { id: "number", label: "Number", icon: Hash, type: "number", category: "all", defaultWidth: 50 },
  { id: "date", label: "Date", icon: Calendar, type: "date", category: "all", defaultWidth: 50 },
  { id: "dropdown", label: "Dropdown", icon: ChevronDown, type: "dropdown", category: "all", defaultWidth: 50 },
  { id: "static_undertaking", label: "Static Legal Declaration Text", icon: ScrollText, type: "static_text", category: "all", defaultWidth: 100, isStatic: true },
  { id: "dynamic_sql_table", label: "Dynamic SQL Table (Repeaters)", icon: Table2, type: "dynamic_table", category: "all", defaultWidth: 100, isAutoCaptured: true },
  { id: "yesno", label: "Yes/No", icon: ToggleLeft, type: "yesno", category: "all", defaultWidth: 50 },
  { id: "checkbox", label: "Checkbox", icon: CheckSquare, type: "checkbox", category: "all", defaultWidth: 50 },
  { id: "currency", label: "Currency", icon: DollarSign, type: "currency", category: "all", defaultWidth: 50 },
  { id: "email", label: "Email", icon: Mail, type: "email", category: "all", defaultWidth: 50 },
  { id: "user", label: "User", icon: User, type: "user", category: "all", defaultWidth: 50 }
];

export const LOOKUP_FIELDS = [
  { 
    id: "sql_table_applicants", 
    label: "SQL Table: Applicants (Name/Nationality)", 
    icon: Table2, 
    type: "dynamic_table", 
    isAutoCaptured: true, 
    apiMapping: "patent.tableApplicants",
    defaultWidth: 100 
  },
  { 
    id: "sql_table_foreign", 
    label: "SQL Table: Form 3 Foreign Filings", 
    icon: Database, 
    type: "dynamic_table", 
    isAutoCaptured: true, 
    apiMapping: "patent.tableForeignFilings",
    defaultWidth: 100 
  },
  { 
    id: "static_form3_decl", 
    label: "Static: Form 3 Legal Undertaking Text", 
    icon: FileCheck2, 
    type: "static_text", 
    isStatic: true,
    defaultWidth: 100 
  }
];

export function PaletteSidebar({ 
  onAddField, 
  currentFormId, 
  onSelectForm, 
  onOpenFormsGallery,
  onNewBlankForm
}) {
  const [activeTab, setActiveTab] = useState("forms"); // default to forms templates per user request
  const [searchQuery, setSearchQuery] = useState("");

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData("application/json", JSON.stringify(field));
    e.dataTransfer.effectAllowed = "copy";
  };

  const filteredFields = ALL_BUILDER_FIELDS.filter(f => 
    f.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="palette-pane">
      {/* Palette Tab Navigation: Templates vs Fields */}
      <div className="palette-tabs-row" style={{ display: "flex", borderBottom: "1px solid #eaecf0", background: "#f8fafc", padding: "0" }}>
        <button 
          className={`palette-tab-btn ${activeTab === "forms" ? "active" : ""}`}
          onClick={() => setActiveTab("forms")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
            padding: "0.7rem 0.5rem",
            fontSize: "0.78rem",
            fontWeight: activeTab === "forms" ? 700 : 500,
            color: activeTab === "forms" ? "#2563eb" : "#64748b",
            background: activeTab === "forms" ? "#ffffff" : "transparent",
            border: "none",
            borderBottom: activeTab === "forms" ? "2px solid #2563eb" : "2px solid transparent",
            cursor: "pointer",
            transition: "all 150ms ease"
          }}
        >
          <ScrollText size={14} />
          <span>Templates</span>
          <span style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            padding: "1px 5px",
            borderRadius: "999px",
            background: activeTab === "forms" ? "#dbeafe" : "#e2e8f0",
            color: activeTab === "forms" ? "#1e40af" : "#64748b"
          }}>
            {PREBUILT_TEMPLATES.length}
          </span>
        </button>

        <button 
          className={`palette-tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
            padding: "0.7rem 0.5rem",
            fontSize: "0.78rem",
            fontWeight: activeTab === "all" ? 700 : 500,
            color: activeTab === "all" ? "#2563eb" : "#64748b",
            background: activeTab === "all" ? "#ffffff" : "transparent",
            border: "none",
            borderBottom: activeTab === "all" ? "2px solid #2563eb" : "2px solid transparent",
            cursor: "pointer",
            transition: "all 150ms ease"
          }}
        >
          <Layers size={14} />
          <span>Fields</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="palette-search-box">
        <div className="search-input-wrap">
          <Search size={14} />
          <input 
            type="text" 
            placeholder={activeTab === "forms" ? "Search templates (Form 1, 3, 18...)" : "Search a field type here"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* TAB CONTENT: FORMS LIBRARY (Select particular form into drag & drop) */}
      {activeTab === "forms" ? (
        <div className="palette-scroll-content">
          {/* Create All New Blank Form Card */}
          {onNewBlankForm && (
            <div
              onClick={onNewBlankForm}
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1.5px dashed #2563eb",
                background: "#eff6ff",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                marginBottom: "0.75rem",
                transition: "all 150ms ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#dbeafe"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#eff6ff"}
              title="Click to start an all-new blank form"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: "3px",
                  background: "#2563eb",
                  color: "#fff"
                }}>
                  BLANK FORM
                </span>
                <Plus size={14} color="#2563eb" />
              </div>

              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e3a8a" }}>
                + Start All New Form
              </span>

              <span style={{ fontSize: "0.68rem", color: "#3b82f6" }}>
                Clean empty canvas with no pre-existing fields
              </span>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0.2rem 0 0.5rem" }}>
            <span className="palette-section-label" style={{ margin: 0, fontSize: "0.68rem", fontWeight: 700, color: "#64748b" }}>
              PATENT FORM TEMPLATES ({PREBUILT_TEMPLATES.length})
            </span>
          </div>

          {PREBUILT_TEMPLATES
            .filter(t => 
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              (t.shortName && t.shortName.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map(tpl => {
              const isSelected = tpl.id === currentFormId;

              return (
                <div
                  key={tpl.id}
                  onClick={() => onSelectForm(tpl)}
                  style={{
                    padding: "0.65rem 0.75rem",
                    borderRadius: "6px",
                    border: isSelected ? "1.5px solid #2563eb" : "1px solid #eaecf0",
                    background: isSelected ? "#eff6ff" : "#ffffff",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                    transition: "all 150ms ease"
                  }}
                  title="Click to load into drag & drop canvas"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e293b" }}>
                      {tpl.shortName || tpl.title}
                    </span>

                    {isSelected ? (
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#16a34a", whiteSpace: "nowrap" }}>
                        ● Active in Canvas
                      </span>
                    ) : (
                      <ArrowRight size={12} color="#94a3b8" />
                    )}
                  </div>

                  <span style={{ fontSize: "0.68rem", color: "#64748b" }}>
                    {tpl.fields.length} Fields &bull; {tpl.category}
                  </span>
                </div>
              );
            })}
        </div>
      ) : (
        /* TAB CONTENT: FIELDS PALETTE */
        <div className="palette-scroll-content">
          {onNewBlankForm && (
            <button
              onClick={onNewBlankForm}
              style={{
                width: "100%",
                padding: "0.55rem 0.75rem",
                background: "#eff6ff",
                color: "#1d4ed8",
                border: "1px dashed #93c5fd",
                borderRadius: "6px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                marginBottom: "0.75rem",
                transition: "all 150ms ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#dbeafe"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#eff6ff"}
              title="Clear canvas and start a blank form from scratch"
            >
              <Plus size={14} />
              <span>+ Start All New (Blank Form)</span>
            </button>
          )}
          {filteredFields.map(field => {
            const IconComp = field.icon;
            const isTable = field.type === "dynamic_table";
            const isStatic = field.type === "static_text";

            return (
              <div
                key={field.id}
                className="palette-field-card"
                style={{
                  borderColor: isTable ? "#bbf7d0" : isStatic ? "#fed7aa" : "#eaecf0",
                  background: isTable ? "#f0fdf4" : isStatic ? "#fff7ed" : "#ffffff"
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, field)}
                onClick={() => onAddField(field)}
                title={isTable ? "Dynamic Table from SQL" : isStatic ? "Static Legal Text" : field.label}
              >
                <div className="palette-field-left">
                  <div className="palette-field-icon" style={{ color: isTable ? "#16a34a" : isStatic ? "#ea580c" : "#64748b" }}>
                    <IconComp size={16} />
                  </div>
                  <span style={{ fontWeight: isTable || isStatic ? 600 : 500 }}>
                    {field.label}
                  </span>
                </div>
                <div className="palette-drag-grip">
                  <GripVertical size={14} />
                </div>
              </div>
            );
          })}

          {/* SQL Relational Tables block removed per user request */}
        </div>
      )}
    </aside>
  );
}
