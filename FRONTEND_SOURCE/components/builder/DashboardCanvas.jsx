import React, { useState } from "react";
import { 
  Calendar, 
  ChevronDown, 
  Upload, 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Link2, 
  Plus, 
  Trash2, 
  Copy, 
  Settings, 
  Sparkles, 
  Maximize2, 
  ZoomIn, 
  ZoomOut,
  Zap,
  Table2,
  FileCheck2,
  ScrollText,
  GripVertical,
  Edit3,
  Check,
  Columns
} from "lucide-react";

export function DashboardCanvas({
  form,
  selectedFieldId,
  onSelectField,
  onUpdateField,
  onDeleteField,
  onCloneField,
  onDropField,
  onReorderField,
  onUpdateFieldValue,
  populatedFieldIds,
  liveValues,
  onUpdateDynamicTable,
  onCloneSection,
  onDeleteSection,
  onUpdateSection,
  onAddSection,
  onSaveAndClose
}) {
  const [dragOverSectionId, setDragOverSectionId] = useState(null);
  const [dragOverFieldId, setDragOverFieldId] = useState(null);
  const [editingStaticId, setEditingStaticId] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Drag over section dropzone
  const handleSectionDragOver = (e, sectionId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (dragOverSectionId !== sectionId) {
      setDragOverSectionId(sectionId);
    }
  };

  const handleSectionDragLeave = (e, sectionId) => {
    if (dragOverSectionId === sectionId) {
      setDragOverSectionId(null);
    }
  };

  const handleSectionDrop = (e, sectionId) => {
    e.preventDefault();
    setDragOverSectionId(null);
    setDragOverFieldId(null);
    try {
      const dataStr = e.dataTransfer.getData("application/json");
      if (dataStr) {
        const payload = JSON.parse(dataStr);
        if (payload.type === "reorder_field") {
          if (onReorderField) {
            onReorderField(payload.fieldId, null, sectionId);
          }
        } else {
          if (onDropField) {
            onDropField(payload, sectionId, null);
          }
        }
      }
    } catch (err) {
      console.error("Drop error:", err);
    }
  };

  // Drag over a specific field
  const handleFieldDragOver = (e, fieldId) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverFieldId !== fieldId) {
      setDragOverFieldId(fieldId);
    }
  };

  const handleFieldDragLeave = (e, fieldId) => {
    e.stopPropagation();
    if (dragOverFieldId === fieldId) {
      setDragOverFieldId(null);
    }
  };

  const handleFieldDrop = (e, targetFieldId, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverFieldId(null);
    setDragOverSectionId(null);
    try {
      const dataStr = e.dataTransfer.getData("application/json");
      if (dataStr) {
        const payload = JSON.parse(dataStr);
        if (payload.type === "reorder_field") {
          if (onReorderField) {
            onReorderField(payload.fieldId, targetFieldId, sectionId);
          }
        } else {
          if (onDropField) {
            onDropField(payload, sectionId, targetFieldId);
          }
        }
      }
    } catch (err) {
      console.error("Drop error on field:", err);
    }
  };

  const handleFieldDragStart = (e, fieldId, sectionId) => {
    e.dataTransfer.setData("application/json", JSON.stringify({
      type: "reorder_field",
      fieldId,
      sectionId
    }));
    e.dataTransfer.effectAllowed = "move";
  };

  // Convert width to grid column span
  const getColSpanStyle = (width) => {
    if (width === 33) return { gridColumn: "span 4" };
    if (width === 50) return { gridColumn: "span 6" };
    if (width === 66) return { gridColumn: "span 8" };
    return { gridColumn: "span 12" };
  };

  return (
    <div className="canvas-scroll-pane">
      <div 
        className="canvas-form-container" 
        style={{ 
          maxWidth: "920px",
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: "top center",
          transition: "transform 150ms ease"
        }}
      >
        {form.sections.map((section) => {
          const sectionFields = form.fields.filter(f => f.sectionId === section.id);
          const isOverSection = dragOverSectionId === section.id;
          const isEditingSec = editingSectionId === section.id;

          return (
            <div key={section.id} className="canvas-section-block">
              {/* Section Header */}
              <div className="section-title-row">
                <div className="section-heading-group" style={{ flex: 1 }}>
                  {isEditingSec ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "480px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <input
                          type="text"
                          className="insp-input"
                          style={{ padding: "4px 8px", fontSize: "0.95rem", fontWeight: 700 }}
                          value={section.title}
                          onChange={(e) => onUpdateSection && onUpdateSection(section.id, { title: e.target.value })}
                          autoFocus
                        />
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "4px 8px" }}
                          onClick={() => setEditingSectionId(null)}
                        >
                          <Check size={14} /> Done
                        </button>
                      </div>
                      <input
                        type="text"
                        className="insp-input"
                        style={{ padding: "3px 6px", fontSize: "0.75rem" }}
                        placeholder="Section description / instructions"
                        value={section.description || ""}
                        onChange={(e) => onUpdateSection && onUpdateSection(section.id, { description: e.target.value })}
                      />
                    </div>
                  ) : (
                    <div onClick={() => setEditingSectionId(section.id)} style={{ cursor: "pointer" }} title="Click to edit section title">
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <h3>{section.title}</h3>
                        <Edit3 size={13} style={{ opacity: 0.35, color: "#64748b" }} />
                      </div>
                      <p>{section.description || "Click to add description or instructions"}</p>
                    </div>
                  )}
                </div>

                <div className="section-action-icons">
                  <button 
                    className="section-action-btn" 
                    title="Edit Section Header"
                    onClick={() => setEditingSectionId(section.id)}
                  >
                    <Edit3 size={15} />
                  </button>
                  <button 
                    className="section-action-btn" 
                    title="Duplicate Section"
                    onClick={() => onCloneSection && onCloneSection(section.id)}
                  >
                    <Copy size={15} />
                  </button>
                  <button 
                    className="section-action-btn" 
                    title="Delete Section"
                    onClick={() => onDeleteSection && onDeleteSection(section.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Grid Drop Zone */}
              <div 
                className={`canvas-fields-grid ${isOverSection ? "section-drag-over" : ""}`}
                onDragOver={(e) => handleSectionDragOver(e, section.id)}
                onDragLeave={(e) => handleSectionDragLeave(e, section.id)}
                onDrop={(e) => handleSectionDrop(e, section.id)}
              >
                {sectionFields.length === 0 ? (
                  <div className={`empty-canvas-dropzone ${isOverSection ? "drag-active" : ""}`}>
                    <Plus size={24} style={{ opacity: 0.5 }} />
                    <p style={{ fontWeight: 600 }}>Drag fields from the left palette into this section</p>
                    <span style={{ fontSize: "0.75rem" }}>Drop text inputs, dynamic tables, dates, numbers, or legal undertakings</span>
                  </div>
                ) : (
                  sectionFields.map((field) => {
                    const isSelected = selectedFieldId === field.id;
                    const isAutoCaptured = field.isAutoCaptured || !!field.apiMapping;
                    const isPopulated = populatedFieldIds?.has(field.id);
                    const gridSpan = getColSpanStyle(field.width || 100);
                    const isFieldDropTarget = dragOverFieldId === field.id;

                    // Current interactive value
                    const currentValue = liveValues?.[field.id] !== undefined 
                      ? liveValues[field.id] 
                      : (field.defaultValue !== undefined ? field.defaultValue : "");

                    // Action buttons bar rendered on every component
                    const fieldActionBar = (
                      <div className="canvas-field-actions-bar" onClick={(e) => e.stopPropagation()}>
                        <div 
                          className="canvas-field-drag-handle" 
                          title="Drag to reorder"
                          draggable
                          onDragStart={(e) => handleFieldDragStart(e, field.id, section.id)}
                        >
                          <GripVertical size={14} />
                        </div>
                        <button 
                          type="button" 
                          className="canvas-field-action-btn" 
                          title="Field Properties / Settings"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectField(field.id);
                          }}
                        >
                          <Settings size={13} />
                        </button>
                        <button 
                          type="button" 
                          className="canvas-field-action-btn" 
                          title="Duplicate / Clone Field"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCloneField(field.id);
                          }}
                        >
                          <Copy size={13} />
                        </button>
                        <button 
                          type="button" 
                          className="canvas-field-action-btn delete-btn" 
                          title="Delete Field"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteField(field.id);
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );

                    // ==============================================================
                    // 1. STATIC LEGAL UNDERTAKING TEXT BLOCK
                    // ==============================================================
                    if (field.type === "static_text" || field.isStatic) {
                      const isEditingText = editingStaticId === field.id;
                      const textVal = field.content || field.defaultValue || "";

                      return (
                        <div
                          key={field.id}
                          className={`canvas-field-cell ${isSelected ? "selected" : ""} ${isFieldDropTarget ? "drop-target-active" : ""}`}
                          style={{ ...gridSpan, background: "#fafafa", border: "1px solid #e2e8f0", padding: "1.25rem", borderRadius: "8px" }}
                          onClick={() => onSelectField(field.id)}
                          onDragOver={(e) => handleFieldDragOver(e, field.id)}
                          onDragLeave={(e) => handleFieldDragLeave(e, field.id)}
                          onDrop={(e) => handleFieldDrop(e, field.id, section.id)}
                        >
                          {fieldActionBar}

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: "5px" }}>
                              <ScrollText size={13} />
                              {field.label || "Static Legal Undertaking (Statutory Text)"}
                            </span>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              style={{ padding: "2px 8px", fontSize: "0.7rem", height: "auto" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingStaticId(isEditingText ? null : field.id);
                              }}
                            >
                              <Edit3 size={11} /> {isEditingText ? "Done Editing" : "Edit Text"}
                            </button>
                          </div>

                          {isEditingText ? (
                            <textarea
                              className="insp-input"
                              rows={5}
                              style={{
                                width: "100%",
                                fontFamily: "'Times New Roman', Times, serif",
                                fontSize: "0.95rem",
                                lineHeight: "1.7",
                                padding: "0.75rem",
                                borderRadius: "6px"
                              }}
                              value={textVal}
                              onChange={(e) => onUpdateField(field.id, { content: e.target.value, defaultValue: e.target.value })}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="Enter statutory legal declaration text..."
                            />
                          ) : (
                            <div style={{
                              fontFamily: "'Times New Roman', Times, serif",
                              fontSize: "0.95rem",
                              lineHeight: "1.7",
                              color: "#1e293b",
                              whiteSpace: "pre-line",
                              background: "#ffffff",
                              padding: "1rem 1.25rem",
                              borderRadius: "6px",
                              border: "1px dashed #cbd5e1"
                            }}>
                              {textVal || "Static statutory legal declaration text. Click 'Edit Text' to customize."}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // ==============================================================
                    // 2. DYNAMIC SQL TABLE (Applicants, Foreign Filings, Attachments)
                    // ==============================================================
                    if (field.type === "dynamic_table") {
                      const rows = liveValues?.[field.id] || field.defaultRows || [];
                      const columns = field.columns || [
                        { key: "col1", label: "Column 1" },
                        { key: "col2", label: "Column 2" },
                        { key: "col3", label: "Column 3" }
                      ];

                      return (
                        <div
                          key={field.id}
                          className={`canvas-field-cell ${isSelected ? "selected" : ""} ${isFieldDropTarget ? "drop-target-active" : ""}`}
                          style={{ ...gridSpan, background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "1rem" }}
                          onClick={() => onSelectField(field.id)}
                          onDragOver={(e) => handleFieldDragOver(e, field.id)}
                          onDragLeave={(e) => handleFieldDragLeave(e, field.id)}
                          onDrop={(e) => handleFieldDrop(e, field.id, section.id)}
                        >
                          {/* Corner indicator */}
                          <div className="auto-captured-indicator" title="Dynamic SQL Table" />

                          {fieldActionBar}

                          {/* Table Header Row */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                            <div>
                              <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a", display: "flex", alignItems: "center", gap: "6px" }}>
                                <Table2 size={16} color="#2563eb" />
                                {field.label || field.name}
                              </span>
                              <div className="auto-captured-label" style={{ marginTop: "2px" }}>
                                <Sparkles size={11} />
                                <span>Dynamic SQL Table &bull; {rows.length} Rows Synced</span>
                                {field.apiMapping && (
                                  <span style={{ color: "#0284c7", marginLeft: "4px" }}>({field.apiMapping})</span>
                                )}
                              </div>
                            </div>

                            <div style={{ display: "flex", gap: "0.4rem" }}>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                style={{ padding: "3px 8px", fontSize: "0.72rem" }}
                                title="Add a new column to this dynamic table"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const colName = prompt("Enter new column name:");
                                  if (colName && colName.trim()) {
                                    const colKey = `col_${Date.now().toString(36).slice(-4)}`;
                                    const updatedCols = [...columns, { key: colKey, label: colName.trim() }];
                                    onUpdateField(field.id, { columns: updatedCols });
                                  }
                                }}
                              >
                                <Columns size={12} /> Add Col
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                style={{ padding: "3px 9px", fontSize: "0.72rem" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newRow = {};
                                  columns.forEach(c => { newRow[c.key] = ""; });
                                  if (onUpdateDynamicTable) {
                                    onUpdateDynamicTable(field.id, [...rows, newRow]);
                                  }
                                }}
                              >
                                <Plus size={12} /> Add Row
                              </button>
                            </div>
                          </div>

                          {/* Rendered HTML Table */}
                          <div style={{ overflowX: "auto", border: "1px solid #cbd5e1", borderRadius: "5px" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", background: "#ffffff" }}>
                              <thead>
                                <tr style={{ background: "#f8fafc", borderBottom: "1.5px solid #cbd5e1" }}>
                                  <th style={{ width: "32px", padding: "6px 8px", borderRight: "1px solid #e2e8f0", textAlign: "center", color: "#64748b" }}>#</th>
                                  {columns.map((col, cIdx) => (
                                    <th key={cIdx} style={{ padding: "6px 10px", borderRight: "1px solid #e2e8f0", textAlign: "left", color: "#0f172a", fontWeight: 700 }}>
                                      {col.label}
                                    </th>
                                  ))}
                                  <th style={{ width: "42px", padding: "6px 8px", textAlign: "center", color: "#64748b" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {rows.length === 0 ? (
                                  <tr>
                                    <td colSpan={columns.length + 2} style={{ textAlign: "center", padding: "1.25rem", color: "#64748b" }}>
                                      <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", fontStyle: "italic" }}>
                                        No data recorded in database for this table. Fill it manually below:
                                      </p>
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        style={{ padding: "4px 12px", fontSize: "0.78rem" }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const newRow = {};
                                          columns.forEach(c => { newRow[c.key] = ""; });
                                          if (onUpdateDynamicTable) {
                                            onUpdateDynamicTable(field.id, [newRow]);
                                          }
                                        }}
                                      >
                                        <Plus size={13} /> + Click here to Add and Fill Row
                                      </button>
                                    </td>
                                  </tr>
                                ) : (
                                  rows.map((row, rIdx) => (
                                    <tr 
                                      key={rIdx} 
                                      style={{ borderBottom: "1px solid #e2e8f0" }}
                                      className={isPopulated ? "field-just-populated" : ""}
                                    >
                                      <td style={{ padding: "6px 8px", borderRight: "1px solid #e2e8f0", textAlign: "center", fontWeight: 600, color: "#64748b" }}>
                                        {rIdx + 1}
                                      </td>
                                      {columns.map((col, cIdx) => {
                                        const isDateCol = col.key.toLowerCase().includes("date");
                                        const isNumberCol = col.key.toLowerCase().includes("fee") || col.key.toLowerCase().includes("claim") || col.key.toLowerCase().includes("page");

                                        return (
                                          <td key={cIdx} style={{ padding: "3px 6px", borderRight: "1px solid #e2e8f0" }}>
                                            <input
                                              type={isDateCol ? "date" : isNumberCol ? "number" : "text"}
                                              style={{
                                                width: "100%",
                                                border: "1px solid #e2e8f0",
                                                padding: "4px 6px",
                                                fontSize: "0.78rem",
                                                borderRadius: "4px",
                                                background: "#ffffff",
                                                color: "#0f172a",
                                                outline: "none"
                                              }}
                                              onFocus={(e) => { e.target.style.borderColor = "#2563eb"; }}
                                              onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
                                              value={row[col.key] || ""}
                                              onChange={(e) => {
                                                const updated = [...rows];
                                                updated[rIdx] = { ...updated[rIdx], [col.key]: e.target.value };
                                                if (onUpdateDynamicTable) {
                                                  onUpdateDynamicTable(field.id, updated);
                                                }
                                              }}
                                              placeholder={col.placeholder || "—"}
                                            />
                                          </td>
                                        );
                                      })}
                                      <td style={{ padding: "4px 6px", textAlign: "center" }}>
                                        <button
                                          type="button"
                                          style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: "3px" }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const updated = rows.filter((_, idx) => idx !== rIdx);
                                            if (onUpdateDynamicTable) {
                                              onUpdateDynamicTable(field.id, updated);
                                            }
                                          }}
                                          title="Delete row"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    }

                    // ==============================================================
                    // 3. FULLY INTERACTIVE FORM FIELDS (Text, Date, Number, Dropdown, Textarea)
                    // ==============================================================
                    return (
                      <div
                        key={field.id}
                        className={`canvas-field-cell ${isSelected ? "selected" : ""} ${isFieldDropTarget ? "drop-target-active" : ""}`}
                        style={gridSpan}
                        onClick={() => onSelectField(field.id)}
                        onDragOver={(e) => handleFieldDragOver(e, field.id)}
                        onDragLeave={(e) => handleFieldDragLeave(e, field.id)}
                        onDrop={(e) => handleFieldDrop(e, field.id, section.id)}
                      >
                        {isAutoCaptured && (
                          <div className="auto-captured-indicator" title="Auto Captured through API lookup" />
                        )}

                        {fieldActionBar}

                        <label className="canvas-field-label">
                          <span>{field.label || field.name}</span>
                          {field.required && <span className="req">*</span>}
                        </label>

                        {/* Interactive Form Controls */}
                        {field.type === "textarea" ? (
                          <div className={`canvas-native-control-wrap ${isPopulated ? "field-just-populated" : ""}`}>
                            <textarea
                              className="canvas-field-native-textarea"
                              rows={3}
                              value={currentValue}
                              onChange={(e) => onUpdateFieldValue && onUpdateFieldValue(field.id, e.target.value)}
                              placeholder={field.placeholder || "Please provide details..."}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={() => onSelectField(field.id)}
                            />
                            <div className="rich-text-toolbar" style={{ marginTop: "4px", background: "#f8fafc", borderRadius: "4px" }}>
                              <Bold size={12} />
                              <Italic size={12} />
                              <Strikethrough size={12} />
                              <span style={{ color: "#cbd5e1" }}>|</span>
                              <List size={12} />
                              <ListOrdered size={12} />
                              <Link2 size={12} />
                            </div>
                          </div>
                        ) : field.type === "dropdown" || field.type === "select" ? (
                          <div className={`canvas-native-control-wrap ${isPopulated ? "field-just-populated" : ""}`}>
                            <select
                              className="canvas-field-native-input canvas-field-native-select"
                              value={currentValue}
                              onChange={(e) => onUpdateFieldValue && onUpdateFieldValue(field.id, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={() => onSelectField(field.id)}
                            >
                              <option value="">{field.placeholder || "Choose from dropdown..."}</option>
                              {(field.options && field.options.length > 0 ? field.options : [
                                { label: "Standard Application", value: "Standard Application" },
                                { label: "Ordinary Application", value: "Ordinary Application" },
                                { label: "Convention Application", value: "Convention Application" },
                                { label: "PCT National Phase", value: "PCT National Phase" },
                                { label: "Patent of Addition", value: "Patent of Addition" },
                                { label: "Divisional Application", value: "Divisional Application" }
                              ]).map((opt, oIdx) => {
                                const val = typeof opt === "string" ? opt : (opt.value !== undefined ? opt.value : opt.label);
                                const lbl = typeof opt === "string" ? opt : (opt.label || opt.value);
                                return <option key={oIdx} value={val}>{lbl}</option>;
                              })}
                            </select>
                          </div>
                        ) : field.type === "date" ? (
                          <div className={`canvas-native-control-wrap ${isPopulated ? "field-just-populated" : ""}`}>
                            <input
                              type="date"
                              className="canvas-field-native-input"
                              value={currentValue}
                              onChange={(e) => onUpdateFieldValue && onUpdateFieldValue(field.id, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={() => onSelectField(field.id)}
                            />
                          </div>
                        ) : field.type === "number" || field.type === "currency" ? (
                          <div className={`canvas-native-control-wrap ${isPopulated ? "field-just-populated" : ""}`}>
                            <input
                              type="number"
                              className="canvas-field-native-input"
                              value={currentValue}
                              onChange={(e) => onUpdateFieldValue && onUpdateFieldValue(field.id, e.target.value)}
                              placeholder={field.placeholder || "0"}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={() => onSelectField(field.id)}
                            />
                          </div>
                        ) : field.type === "checkbox" || field.type === "yesno" ? (
                          <div className={`canvas-native-control-wrap ${isPopulated ? "field-just-populated" : ""}`}>
                            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.82rem", color: "#1e293b" }} onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={Boolean(currentValue)}
                                onChange={(e) => onUpdateFieldValue && onUpdateFieldValue(field.id, e.target.checked)}
                                onFocus={() => onSelectField(field.id)}
                              />
                              <span>{field.placeholder || (currentValue ? "Yes / Confirmed" : "No / Unchecked")}</span>
                            </label>
                          </div>
                        ) : field.type === "upload" ? (
                          <div className={`canvas-native-control-wrap ${isPopulated ? "field-just-populated" : ""}`}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <input
                                type="text"
                                className="canvas-field-native-input"
                                value={currentValue}
                                onChange={(e) => onUpdateFieldValue && onUpdateFieldValue(field.id, e.target.value)}
                                placeholder="Attached document filename or URL..."
                                onClick={(e) => e.stopPropagation()}
                                onFocus={() => onSelectField(field.id)}
                              />
                              <label className="btn btn-secondary btn-sm" style={{ cursor: "pointer", whiteSpace: "nowrap" }} onClick={(e) => e.stopPropagation()}>
                                <Upload size={13} /> Browse
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      onUpdateFieldValue && onUpdateFieldValue(field.id, e.target.files[0].name);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        ) : (
                          // Default Text input
                          <div className={`canvas-native-control-wrap ${isPopulated ? "field-just-populated" : ""}`}>
                            <input
                              type="text"
                              className="canvas-field-native-input"
                              value={currentValue}
                              onChange={(e) => onUpdateFieldValue && onUpdateFieldValue(field.id, e.target.value)}
                              placeholder={field.placeholder || "Enter value..."}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={() => onSelectField(field.id)}
                            />
                          </div>
                        )}

                        {field.helpText && (
                          <span style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "3px" }}>
                            {field.helpText}
                          </span>
                        )}

                        {isAutoCaptured && (
                          <div className="auto-captured-label">
                            <Sparkles size={11} />
                            <span>Auto Captured</span>
                            {field.apiMapping && (
                              <span style={{ color: "#0284c7", marginLeft: "4px", fontSize: "0.68rem" }}>
                                ({field.apiMapping})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}

        {/* Add Section Button */}
        <div style={{ marginTop: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.82rem", gap: "6px" }}
            onClick={onAddSection}
          >
            <Plus size={15} /> Add New Section
          </button>
        </div>

      </div>
    </div>
  );
}
