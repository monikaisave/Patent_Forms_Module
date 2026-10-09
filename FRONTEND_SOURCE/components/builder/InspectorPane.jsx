import React, { useState } from "react";
import { 
  Settings, 
  ShieldCheck, 
  Eye, 
  Palette, 
  Binary, 
  Type, 
  Trash2, 
  X,
  Zap,
  Info
} from "lucide-react";
import { AVAILABLE_API_MAPPINGS } from "../../data/mockPatents";

export function InspectorPane({
  selectedField,
  allFields,
  onUpdateField,
  onDeleteField,
  onClose
}) {
  const [activeTab, setActiveTab] = useState("settings");

  if (!selectedField) {
    return (
      <aside className="inspector-pane">
        <div className="inspector-pane-header">
          <span style={{ fontWeight: 600, color: "#64748b" }}>Field Properties</span>
        </div>
        <div style={{ padding: "3rem 1.5rem", textAlign: "center", color: "#94a3b8" }}>
          <Settings size={36} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
          <p style={{ fontWeight: 600, color: "#475569" }}>No field selected</p>
          <span style={{ fontSize: "0.75rem" }}>Click any field on the canvas to configure its settings and API mapping.</span>
        </div>
      </aside>
    );
  }

  const handleChange = (key, value) => {
    onUpdateField(selectedField.id, { [key]: value });
  };

  return (
    <aside className="inspector-pane">
      {/* Header matching screenshot: Icon + Type Name + Close */}
      <div className="inspector-pane-header">
        <div className="inspector-field-type-tag">
          <Type size={16} color="#64748b" />
          <span>{selectedField.label || selectedField.name || "Text"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <button 
            className="section-action-btn" 
            onClick={() => onDeleteField(selectedField.id)}
            title="Delete Field"
          >
            <Trash2 size={14} color="#ef4444" />
          </button>
          <button className="section-action-btn" onClick={onClose} title="Close Panel">
            <X size={15} />
          </button>
        </div>
      </div>

      {/* 5 Tabs: Settings | Validation | Visibility | Style | Fx */}
      <div className="inspector-tabs-nav">
        <button
          className={`inspector-tab-item ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={14} />
          <span>Settings</span>
        </button>

        <button
          className={`inspector-tab-item ${activeTab === "validation" ? "active" : ""}`}
          onClick={() => setActiveTab("validation")}
        >
          <ShieldCheck size={14} />
          <span>Validation</span>
        </button>

        <button
          className={`inspector-tab-item ${activeTab === "visibility" ? "active" : ""}`}
          onClick={() => setActiveTab("visibility")}
        >
          <Eye size={14} />
          <span>Visibility</span>
        </button>

        <button
          className={`inspector-tab-item ${activeTab === "style" ? "active" : ""}`}
          onClick={() => setActiveTab("style")}
        >
          <Palette size={14} />
          <span>Style</span>
        </button>

        <button
          className={`inspector-tab-item ${activeTab === "fx" ? "active" : ""}`}
          onClick={() => setActiveTab("fx")}
        >
          <Binary size={14} />
          <span>Fx</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="inspector-scroll-content">
        {/* ============================================================== */}
        {/* SETTINGS TAB (Exact match to screenshot)                       */}
        {/* ============================================================== */}
        {activeTab === "settings" && (
          <>
            {/* Name * */}
            <div className="insp-group">
              <label className="insp-label">Name *</label>
              <input
                type="text"
                className="insp-input"
                value={selectedField.label || selectedField.name || ""}
                onChange={(e) => {
                  handleChange("label", e.target.value);
                  handleChange("name", e.target.value);
                }}
              />
            </div>

            {/* Field type */}
            <div className="insp-group">
              <label className="insp-label">Field type</label>
              <select
                className="insp-select"
                value={selectedField.type || "text"}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <option value="text">Text</option>
                <option value="textarea">Text area</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="upload">Upload File</option>
              </select>
            </div>

            {/* Required? Toggle Switch */}
            <div className="insp-switch-row">
              <span className="insp-switch-label">Required?</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!!selectedField.required}
                  onChange={(e) => handleChange("required", e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Field ID * */}
            <div className="insp-group">
              <label className="insp-label">Field ID *</label>
              <input
                type="text"
                className="insp-input"
                value={selectedField.id || ""}
                onChange={(e) => handleChange("id", e.target.value)}
              />
            </div>

            {/* Help text */}
            <div className="insp-group">
              <label className="insp-label">Help text</label>
              <input
                type="text"
                className="insp-input"
                value={selectedField.helpText || ""}
                onChange={(e) => handleChange("helpText", e.target.value)}
                placeholder="Guidance shown below input"
              />
            </div>

            {/* Default value */}
            <div className="insp-group">
              <label className="insp-label">Default value</label>
              <input
                type="text"
                className="insp-input"
                value={selectedField.defaultValue || ""}
                onChange={(e) => handleChange("defaultValue", e.target.value)}
                placeholder="Initial default value"
              />
            </div>

            {/* Is this a computed field? */}
            <div className="insp-switch-row">
              <span className="insp-switch-label">Is this a computed field?</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!!selectedField.isComputed}
                  onChange={(e) => handleChange("isComputed", e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Auto-Captured / API Auto-Fill Toggle */}
            <div className="api-fx-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h4>
                  <Zap size={14} color="#16a34a" />
                  <span>Auto-Fill through API</span>
                </h4>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!!selectedField.isAutoCaptured || !!selectedField.apiMapping}
                    onChange={(e) => {
                      handleChange("isAutoCaptured", e.target.checked);
                      if (!e.target.checked) handleChange("apiMapping", "");
                    }}
                  />
                  <span className="slider" />
                </label>
              </div>

              <p style={{ fontSize: "0.72rem", color: "#166534" }}>
                Displays green corner triangle fold and automatically fills from live API response.
              </p>

              {(selectedField.isAutoCaptured || selectedField.apiMapping) && (
                <div className="insp-group" style={{ marginTop: "0.3rem" }}>
                  <label className="insp-label" style={{ color: "#166534" }}>Target API Field Path:</label>
                  <select
                    className="insp-select"
                    value={selectedField.apiMapping || ""}
                    onChange={(e) => handleChange("apiMapping", e.target.value)}
                  >
                    <option value="">-- Select API Mapping --</option>
                    {AVAILABLE_API_MAPPINGS.map(m => (
                      <option key={m.key} value={m.key}>{m.label} ({m.key})</option>
                    ))}
                    <option value="requester.name">Requester Full Name</option>
                    <option value="department.name">Requester Department</option>
                    <option value="request.date">Current Request Date</option>
                  </select>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* VALIDATION TAB                                                 */}
        {/* ============================================================== */}
        {activeTab === "validation" && (
          <>
            <div className="insp-group">
              <label className="insp-label">Minimum Length</label>
              <input
                type="number"
                className="insp-input"
                value={selectedField.validation?.minLength || ""}
                onChange={(e) => handleChange("validation", { ...selectedField.validation, minLength: e.target.value })}
                placeholder="e.g. 5"
              />
            </div>
            <div className="insp-group">
              <label className="insp-label">Custom Error Message</label>
              <input
                type="text"
                className="insp-input"
                value={selectedField.validation?.errorMessage || ""}
                onChange={(e) => handleChange("validation", { ...selectedField.validation, errorMessage: e.target.value })}
                placeholder="Error message displayed to user"
              />
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* VISIBILITY TAB (Conditional Rules)                             */}
        {/* ============================================================== */}
        {activeTab === "visibility" && (
          <div className="insp-group">
            <label className="insp-label">Conditional Display</label>
            <p style={{ fontSize: "0.74rem", color: "#64748b" }}>
              Show this field only when another field equals a specific value.
            </p>
            <select
              className="insp-select"
              value={selectedField.conditionalRule?.sourceFieldId || ""}
              onChange={(e) => handleChange("conditionalRule", { ...selectedField.conditionalRule, sourceFieldId: e.target.value, enabled: true })}
            >
              <option value="">Always Visible</option>
              {allFields.filter(f => f.id !== selectedField.id).map(f => (
                <option key={f.id} value={f.id}>Only when: {f.label || f.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* ============================================================== */}
        {/* STYLE TAB                                                      */}
        {/* ============================================================== */}
        {activeTab === "style" && (
          <div className="insp-group">
            <label className="insp-label">Width (Column Span)</label>
            <select
              className="insp-select"
              value={selectedField.width || 50}
              onChange={(e) => handleChange("width", parseInt(e.target.value, 10))}
            >
              <option value={50}>50% (Half Row Width)</option>
              <option value={100}>100% (Full Row Width)</option>
              <option value={33}>33% (One Third Row)</option>
              <option value={66}>66% (Two Thirds Row)</option>
            </select>
          </div>
        )}

        {/* ============================================================== */}
        {/* FX TAB (Calculated Formulas & API Bindings)                    */}
        {/* ============================================================== */}
        {activeTab === "fx" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e293b" }}>Formula &amp; API Functions</span>
            <p style={{ fontSize: "0.74rem", color: "#64748b" }}>
              Configure automatic lookup calculations or dynamic API endpoints to hydrate this field automatically.
            </p>
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "0.75rem",
              fontSize: "0.74rem",
              fontFamily: "monospace",
              color: "#0369a1"
            }}>
              API_LOOKUP(&quot;{selectedField.apiMapping || "patent.fileNo"}&quot;)
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
