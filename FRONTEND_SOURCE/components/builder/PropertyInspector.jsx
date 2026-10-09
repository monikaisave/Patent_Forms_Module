import React, { useState } from "react";
import { AVAILABLE_API_MAPPINGS } from "../../data/mockPatents";
import { 
  Zap, 
  Settings, 
  ShieldCheck, 
  SlidersHorizontal, 
  Trash2, 
  Plus, 
  Info,
  ExternalLink
} from "lucide-react";

export function PropertyInspector({
  selectedField,
  allFields,
  sections,
  onUpdateField
}) {
  const [activeTab, setActiveTab] = useState("api"); // Default to dynamic API tab!

  if (!selectedField) {
    return (
      <aside className="inspector-sidebar">
        <div className="sidebar-header">
          <h2>Property Inspector</h2>
          <p>Select any field on the canvas to configure</p>
        </div>
        <div style={{ padding: "3rem 1.5rem", textAlign: "center", color: "#64748b" }}>
          <SlidersHorizontal size={36} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
          <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>No field currently selected</p>
          <span style={{ fontSize: "0.75rem" }}>
            Click any field card on the canvas to configure dynamic API mapping, validation rules, or layout.
          </span>
        </div>
      </aside>
    );
  }

  const handleTextChange = (key, val) => {
    onUpdateField(selectedField.id, { [key]: val });
  };

  const handleValidationChange = (key, val) => {
    onUpdateField(selectedField.id, {
      validation: {
        ...(selectedField.validation || {}),
        [key]: val
      }
    });
  };

  const handleRuleChange = (key, val) => {
    onUpdateField(selectedField.id, {
      conditionalRule: {
        ...(selectedField.conditionalRule || {}),
        [key]: val
      }
    });
  };

  // Group mappings for easy browsing
  const groupedMappings = AVAILABLE_API_MAPPINGS.reduce((acc, curr) => {
    acc[curr.group] = acc[curr.group] || [];
    acc[curr.group].push(curr);
    return acc;
  }, {});

  const currentMappingMeta = AVAILABLE_API_MAPPINGS.find(m => m.key === selectedField.apiMapping);

  return (
    <aside className="inspector-sidebar">
      {/* Inspector Header */}
      <div className="sidebar-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2>
            <span>Field Settings</span>
            <span className="badge badge-blue">{selectedField.type}</span>
          </h2>
        </div>
        <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#38bdf8" }}>
          ID: {selectedField.id}
        </p>
      </div>

      {/* Tabs */}
      <div className="inspector-tabs">
        <button
          className={`inspector-tab ${activeTab === "api" ? "active" : ""}`}
          onClick={() => setActiveTab("api")}
          title="Dynamic Patent API Mapping"
        >
          <Zap size={13} style={{ display: "inline", marginRight: "4px" }} />
          API Auto-Fetch
        </button>
        <button
          className={`inspector-tab ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          <Settings size={13} style={{ display: "inline", marginRight: "4px" }} />
          General
        </button>
        <button
          className={`inspector-tab ${activeTab === "validation" ? "active" : ""}`}
          onClick={() => setActiveTab("validation")}
        >
          <ShieldCheck size={13} style={{ display: "inline", marginRight: "4px" }} />
          Validation
        </button>
        <button
          className={`inspector-tab ${activeTab === "rules" ? "active" : ""}`}
          onClick={() => setActiveTab("rules")}
        >
          <SlidersHorizontal size={13} style={{ display: "inline", marginRight: "4px" }} />
          Rules
        </button>
      </div>

      {/* Tab Contents */}
      <div className="inspector-content">
        {/* ============================================================== */}
        {/* TAB 1: DYNAMIC PATENT API MAPPING (Core User Requirement)       */}
        {/* ============================================================== */}
        {activeTab === "api" && (
          <>
            <div className="api-mapping-card">
              <h4>
                <Zap size={15} />
                <span>Dynamic Patent API Binding</span>
              </h4>
              <p className="form-help">
                When a user enters a Patent File Number, this field automatically populates with live data fetched via API.
              </p>

              <div className="form-group" style={{ marginTop: "0.5rem" }}>
                <label className="form-label">
                  <span>Patent Attribute Key</span>
                  {selectedField.apiMapping && (
                    <button
                      className="btn-ghost"
                      style={{ fontSize: "0.68rem", color: "#f43f5e", padding: 0 }}
                      onClick={() => handleTextChange("apiMapping", "")}
                    >
                      Clear Binding
                    </button>
                  )}
                </label>
                <select
                  className="form-select"
                  value={selectedField.apiMapping || ""}
                  onChange={(e) => handleTextChange("apiMapping", e.target.value)}
                >
                  <option value="">-- No API Binding (Manual Entry Only) --</option>
                  {Object.entries(groupedMappings).map(([groupName, mappings]) => (
                    <optgroup key={groupName} label={groupName}>
                      {mappings.map(m => (
                        <option key={m.key} value={m.key}>
                          {m.label} ({m.key})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {currentMappingMeta ? (
                <div style={{
                  background: "rgba(6, 182, 212, 0.1)",
                  border: "1px dashed rgba(6, 182, 212, 0.35)",
                  borderRadius: "6px",
                  padding: "0.75rem",
                  fontSize: "0.76rem"
                }}>
                  <div style={{ color: "#22d3ee", fontWeight: 700, marginBottom: "0.25rem" }}>
                    Connected to Registry Path:
                  </div>
                  <code style={{ color: "#67e8f9", display: "block", marginBottom: "0.4rem" }}>
                    {currentMappingMeta.key}
                  </code>
                  <div style={{ color: "#94a3b8" }}>
                    <strong>Live Sample Data:</strong>
                    <div style={{ color: "#e2e8f0", marginTop: "2px", fontStyle: "italic" }}>
                      &ldquo;{currentMappingMeta.example}&rdquo;
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: "0.65rem",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderRadius: "6px",
                  fontSize: "0.73rem",
                  color: "#64748b"
                }}>
                  Select an attribute above to enable automatic dynamic retrieval from USPTO, PCT, or IPO registries.
                </div>
              )}
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px",
              padding: "0.85rem",
              fontSize: "0.75rem",
              color: "#94a3b8"
            }}>
              <strong style={{ color: "#cbd5e1", display: "block", marginBottom: "0.3rem" }}>
                How Dynamic Auto-Fetch Works:
              </strong>
              1. User inputs or selects file number (e.g. <code>US-11823901-B2</code>).<br />
              2. <code>PatentApiService.fetchByFileNo()</code> queries registry endpoint.<br />
              3. Dynamic schema deserializer maps payload keys to form state.<br />
              4. Mapped inputs illuminate with smooth emerald pulse.
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* TAB 2: GENERAL FIELD SETTINGS                                  */}
        {/* ============================================================== */}
        {activeTab === "general" && (
          <>
            <div className="form-group">
              <label className="form-label">Field Label</label>
              <input
                type="text"
                className="form-input"
                value={selectedField.label || ""}
                onChange={(e) => handleTextChange("label", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Field ID / Key</label>
              <input
                type="text"
                className="form-input"
                value={selectedField.id || ""}
                onChange={(e) => handleTextChange("id", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              />
              <span className="form-help">Used for JSON serialization and DB columns.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Target Section</label>
              <select
                className="form-select"
                value={selectedField.sectionId || ""}
                onChange={(e) => handleTextChange("sectionId", e.target.value)}
              >
                {sections.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Grid Width (Column Span)</label>
              <select
                className="form-select"
                value={selectedField.width || 100}
                onChange={(e) => handleTextChange("width", parseInt(e.target.value, 10))}
              >
                <option value={33}>33% (One Third Column)</option>
                <option value={50}>50% (Half Column)</option>
                <option value={66}>66% (Two Thirds Column)</option>
                <option value={100}>100% (Full Row Width)</option>
              </select>
            </div>

            {selectedField.type !== "checkbox" && selectedField.type !== "repeater" && (
              <div className="form-group">
                <label className="form-label">Placeholder Hint</label>
                <input
                  type="text"
                  className="form-input"
                  value={selectedField.placeholder || ""}
                  onChange={(e) => handleTextChange("placeholder", e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Helper Instruction</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={selectedField.helperText || ""}
                onChange={(e) => handleTextChange("helperText", e.target.value)}
                placeholder="Optional guidance shown below the input"
              />
            </div>

            {/* Dropdown Options Editor */}
            {selectedField.type === "select" && (
              <div className="form-group">
                <label className="form-label">Dropdown Options</label>
                {(selectedField.options || []).map((opt, oIdx) => (
                  <div key={oIdx} style={{ display: "flex", gap: "0.4rem", marginBottom: "0.4rem" }}>
                    <input
                      type="text"
                      className="form-input"
                      value={opt.label}
                      onChange={(e) => {
                        const newOpts = [...(selectedField.options || [])];
                        newOpts[oIdx] = { label: e.target.value, value: e.target.value };
                        handleTextChange("options", newOpts);
                      }}
                    />
                    <button
                      className="field-tool-btn danger"
                      onClick={() => {
                        const newOpts = selectedField.options.filter((_, i) => i !== oIdx);
                        handleTextChange("options", newOpts);
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ alignSelf: "flex-start", marginTop: "0.3rem" }}
                  onClick={() => {
                    const newOpts = [...(selectedField.options || []), { label: `Option ${(selectedField.options?.length || 0) + 1}`, value: `Option ${(selectedField.options?.length || 0) + 1}` }];
                    handleTextChange("options", newOpts);
                  }}
                >
                  <Plus size={12} /> Add Option
                </button>
              </div>
            )}
          </>
        )}

        {/* ============================================================== */}
        {/* TAB 3: VALIDATION RULES (Task 5)                               */}
        {/* ============================================================== */}
        {activeTab === "validation" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0" }}>
              <input
                type="checkbox"
                id="rule-required"
                checked={!!selectedField.validation?.required}
                onChange={(e) => handleValidationChange("required", e.target.checked)}
                style={{ width: "16px", height: "16px" }}
              />
              <label htmlFor="rule-required" style={{ fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                Mandatory Field (Required for submission)
              </label>
            </div>

            {(selectedField.type === "text" || selectedField.type === "textarea") && (
              <>
                <div className="form-group">
                  <label className="form-label">Minimum Character Length</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedField.validation?.minLength || ""}
                    onChange={(e) => handleValidationChange("minLength", parseInt(e.target.value, 10) || undefined)}
                    placeholder="e.g. 5"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Maximum Character Length</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedField.validation?.maxLength || ""}
                    onChange={(e) => handleValidationChange("maxLength", parseInt(e.target.value, 10) || undefined)}
                    placeholder="e.g. 250"
                  />
                </div>
              </>
            )}

            {selectedField.type === "number" && (
              <>
                <div className="form-group">
                  <label className="form-label">Minimum Value</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedField.validation?.min ?? ""}
                    onChange={(e) => handleValidationChange("min", parseFloat(e.target.value) || undefined)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Maximum Value</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedField.validation?.max ?? ""}
                    onChange={(e) => handleValidationChange("max", parseFloat(e.target.value) || undefined)}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Custom Error Message</label>
              <input
                type="text"
                className="form-input"
                value={selectedField.validation?.errorMessage || ""}
                onChange={(e) => handleValidationChange("errorMessage", e.target.value)}
                placeholder="e.g. Please enter a valid registration number"
              />
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CONDITIONAL SHOW / HIDE RULES (Task 5)                  */}
        {/* ============================================================== */}
        {activeTab === "rules" && (
          <div className="rule-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <strong style={{ fontSize: "0.85rem", color: "#a5b4fc" }}>
                Conditional Display Rule
              </strong>
              <input
                type="checkbox"
                id="rule-enabled"
                checked={!!selectedField.conditionalRule?.enabled}
                onChange={(e) => handleRuleChange("enabled", e.target.checked)}
                style={{ width: "16px", height: "16px" }}
              />
            </div>

            <p className="form-help">
              Show this field dynamically ONLY when a condition in another field is satisfied.
            </p>

            {selectedField.conditionalRule?.enabled && (
              <>
                <div className="form-group" style={{ marginTop: "0.5rem" }}>
                  <label className="form-label">If Field:</label>
                  <select
                    className="form-select"
                    value={selectedField.conditionalRule?.sourceFieldId || ""}
                    onChange={(e) => handleRuleChange("sourceFieldId", e.target.value)}
                  >
                    <option value="">-- Choose Field --</option>
                    {allFields
                      .filter(f => f.id !== selectedField.id)
                      .map(f => (
                        <option key={f.id} value={f.id}>{f.label} ({f.id})</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Condition Operator:</label>
                  <select
                    className="form-select"
                    value={selectedField.conditionalRule?.operator || "equals"}
                    onChange={(e) => handleRuleChange("operator", e.target.value)}
                  >
                    <option value="equals">Equals (Exact match)</option>
                    <option value="not_equals">Does Not Equal</option>
                    <option value="contains">Contains Substring</option>
                    <option value="is_filled">Is Not Empty / Checked</option>
                  </select>
                </div>

                {selectedField.conditionalRule?.operator !== "is_filled" && (
                  <div className="form-group">
                    <label className="form-label">Expected Value:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={selectedField.conditionalRule?.value || ""}
                      onChange={(e) => handleRuleChange("value", e.target.value)}
                      placeholder="e.g. Micro Entity or Yes"
                    />
                  </div>
                )}

                <div style={{
                  background: "rgba(99, 102, 241, 0.12)",
                  padding: "0.65rem",
                  borderRadius: "6px",
                  fontSize: "0.74rem",
                  color: "#c7d2fe"
                }}>
                  Rule Preview: Field will only be visible when <strong>{selectedField.conditionalRule?.sourceFieldId || "field"}</strong> {selectedField.conditionalRule?.operator} &ldquo;{selectedField.conditionalRule?.value || ""}&rdquo;.
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
