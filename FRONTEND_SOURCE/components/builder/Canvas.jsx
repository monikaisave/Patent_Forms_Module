import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Copy, 
  MoveUp, 
  MoveDown, 
  Zap, 
  Layers, 
  Columns, 
  SlidersHorizontal,
  FolderPlus,
  Eye
} from "lucide-react";

export function Canvas({
  form,
  selectedFieldId,
  onSelectField,
  onUpdateField,
  onDeleteField,
  onCloneField,
  onMoveField,
  onDropField,
  onAddSection,
  onDeleteSection,
  onPreviewRuntime
}) {
  const [dragOverSectionId, setDragOverSectionId] = useState(null);

  const handleDragOver = (e, sectionId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (dragOverSectionId !== sectionId) {
      setDragOverSectionId(sectionId);
    }
  };

  const handleDragLeave = (e, sectionId) => {
    if (dragOverSectionId === sectionId) {
      setDragOverSectionId(null);
    }
  };

  const handleDrop = (e, sectionId) => {
    e.preventDefault();
    setDragOverSectionId(null);
    try {
      const dataStr = e.dataTransfer.getData("application/json");
      if (dataStr) {
        const template = JSON.parse(dataStr);
        onDropField(template, sectionId);
      }
    } catch (err) {
      console.error("Drop error:", err);
    }
  };

  // Helper to map width percentage to column span class
  const getColSpanClass = (width) => {
    if (width === 33) return "col-4";
    if (width === 50) return "col-6";
    if (width === 66) return "col-8";
    return "col-12";
  };

  // Cycle width: 33% -> 50% -> 100% -> 33%
  const cycleWidth = (e, field) => {
    e.stopPropagation();
    const current = field.width || 100;
    const next = current === 33 ? 50 : current === 50 ? 100 : 33;
    onUpdateField(field.id, { width: next });
  };

  return (
    <main className="canvas-area">
      <div className="canvas-container">
        {/* Canvas Top Bar */}
        <div className="canvas-toolbar">
          <div className="canvas-title-group">
            <h3>{form.title}</h3>
            <p>
              {form.fields.length} Dynamic Fields &bull; {form.sections.length} Sections &bull;{" "}
              <span style={{ color: "#22d3ee" }}>
                {form.fields.filter(f => f.apiMapping).length} API-Bound Fields
              </span>
            </p>
          </div>

          <div className="canvas-actions">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={onAddSection}
              title="Add a new layout section"
            >
              <FolderPlus size={14} />
              <span>Add Section</span>
            </button>

            <button 
              className="btn btn-emerald btn-sm"
              onClick={onPreviewRuntime}
              title="Test dynamic auto-fill in Live Runtime"
            >
              <Eye size={14} />
              <span>Live Runtime Test</span>
            </button>
          </div>
        </div>

        {/* Form Sections */}
        {form.sections.map((section, sIdx) => {
          const sectionFields = form.fields.filter(f => f.sectionId === section.id);
          const isOver = dragOverSectionId === section.id;

          return (
            <div key={section.id} className="builder-section">
              <div className="section-header-bar">
                <div className="section-title-wrap">
                  <Layers size={16} color="#60a5fa" />
                  <div>
                    <h4>{section.title}</h4>
                    {section.description && <p>{section.description}</p>}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                  <span className="badge badge-blue">{sectionFields.length} fields</span>
                  {form.sections.length > 1 && (
                    <button
                      className="field-tool-btn danger"
                      onClick={() => onDeleteSection(section.id)}
                      title="Delete this section"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid Canvas for Section */}
              <div 
                className="section-drop-grid"
                onDragOver={(e) => handleDragOver(e, section.id)}
                onDragLeave={(e) => handleDragLeave(e, section.id)}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                {sectionFields.length === 0 ? (
                  <div className={`section-empty-hint ${isOver ? "drag-over" : ""}`}>
                    <Plus size={24} style={{ opacity: 0.5 }} />
                    <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {isOver ? "Release to drop component here" : "Drag fields from the left palette or click + to add"}
                    </p>
                    <span style={{ fontSize: "0.72rem" }}>Fields added here will populate in {section.title}</span>
                  </div>
                ) : (
                  sectionFields.map((field, fIdx) => {
                    const isSelected = selectedFieldId === field.id;
                    const colClass = getColSpanClass(field.width);
                    const isFirst = fIdx === 0;
                    const isLast = fIdx === sectionFields.length - 1;

                    return (
                      <div
                        key={field.id}
                        className={`builder-field-card ${colClass} ${isSelected ? "selected" : ""} ${field.apiMapping ? "mapped-api" : ""}`}
                        onClick={() => onSelectField(field.id)}
                      >
                        {/* Field Header */}
                        <div className="builder-field-header">
                          <div className="field-label-group">
                            <span>{field.label}</span>
                            {field.validation?.required && (
                              <span style={{ color: "#f43f5e" }} title="Required field">*</span>
                            )}
                          </div>

                          <div className="field-tools" onClick={(e) => e.stopPropagation()}>
                            <button
                              className="field-tool-btn"
                              onClick={(e) => cycleWidth(e, field)}
                              title={`Width: ${field.width || 100}%. Click to cycle (33% / 50% / 100%)`}
                            >
                              <Columns size={12} />
                              <span style={{ fontSize: "0.65rem", marginLeft: "2px" }}>
                                {field.width === 33 ? "33%" : field.width === 50 ? "50%" : "100%"}
                              </span>
                            </button>

                            <button
                              className="field-tool-btn"
                              disabled={isFirst}
                              onClick={() => onMoveField(field.id, "up")}
                              title="Move Up"
                              style={{ opacity: isFirst ? 0.3 : 1 }}
                            >
                              <MoveUp size={12} />
                            </button>

                            <button
                              className="field-tool-btn"
                              disabled={isLast}
                              onClick={() => onMoveField(field.id, "down")}
                              title="Move Down"
                              style={{ opacity: isLast ? 0.3 : 1 }}
                            >
                              <MoveDown size={12} />
                            </button>

                            <button
                              className="field-tool-btn"
                              onClick={() => onCloneField(field.id)}
                              title="Duplicate field"
                            >
                              <Copy size={12} />
                            </button>

                            <button
                              className="field-tool-btn danger"
                              onClick={() => onDeleteField(field.id)}
                              title="Remove field"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Interactive Preview Representation */}
                        <div className="field-preview-control">
                          {field.type === "textarea" ? (
                            <span>[ Multi-line Text Area: {field.placeholder || "Enter notes..."} ]</span>
                          ) : field.type === "select" ? (
                            <span>[ Select Dropdown: {field.options ? field.options.map(o => o.label).join(", ") : "Options..."} ]</span>
                          ) : field.type === "repeater" ? (
                            <span>[ Tabular Repeater: {field.columns ? field.columns.map(c => c.label).join(" | ") : "Columns"} ]</span>
                          ) : field.type === "patent_lookup" ? (
                            <span style={{ color: "#38bdf8", fontWeight: 600 }}>
                              ⚡ [ Live Patent API Lookup Input + Auto-Populate Button ]
                            </span>
                          ) : field.type === "signature" ? (
                            <span>[ Authorized Digital Signature Block ]</span>
                          ) : field.type === "checkbox" ? (
                            <span>[ Checkbox Confirmation: {field.label} ]</span>
                          ) : (
                            <span>{field.placeholder || `[ ${field.type} input ]`}</span>
                          )}
                        </div>

                        {/* Meta Tags (API Mapping & Conditional Rule Badges) */}
                        <div className="field-meta-tags">
                          <span className="badge badge-blue" style={{ fontSize: "0.62rem" }}>
                            {field.type}
                          </span>

                          {field.apiMapping && (
                            <span className="badge badge-cyan" style={{ fontSize: "0.62rem" }} title="Auto-fetches data via Patent API">
                              <Zap size={10} />
                              API: {field.apiMapping}
                            </span>
                          )}

                          {field.conditionalRule?.enabled && (
                            <span className="badge badge-amber" style={{ fontSize: "0.62rem" }} title="Conditionally displayed based on other fields">
                              <SlidersHorizontal size={10} />
                              Rule: if {field.conditionalRule.sourceFieldId} = {field.conditionalRule.value}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
