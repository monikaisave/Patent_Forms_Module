import React from "react";
import { 
  PALETTE_CATEGORIES, 
  FIELD_TEMPLATES 
} from "../../types/fieldTypes";
import { 
  SearchCode, 
  Type, 
  AlignLeft, 
  ChevronDownSquare, 
  Calendar, 
  Hash, 
  CheckSquare, 
  CircleDot, 
  Mail, 
  Phone, 
  Table, 
  PenTool, 
  AlertCircle,
  Plus
} from "lucide-react";

// Icon mapping dictionary
const ICON_MAP = {
  SearchCode,
  Type,
  AlignLeft,
  ChevronDownSquare,
  Calendar,
  Hash,
  CheckSquare,
  CircleDot,
  Mail,
  Phone,
  Table,
  PenTool,
  AlertCircle
};

export function ComponentPalette({ onAddField }) {
  const handleDragStart = (e, template) => {
    e.dataTransfer.setData("application/json", JSON.stringify(template));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <aside className="palette-sidebar">
      <div className="sidebar-header">
        <h2>
          <span>Palette</span>
          <span className="badge badge-cyan">{FIELD_TEMPLATES.length} Components</span>
        </h2>
        <p>Drag onto canvas or click + to append</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {PALETTE_CATEGORIES.map(category => {
          const items = FIELD_TEMPLATES.filter(f => f.category === category.id);
          if (items.length === 0) return null;

          return (
            <div key={category.id} className="palette-category">
              <div className="palette-category-title">
                <span>{category.title}</span>
                <span style={{ opacity: 0.6 }}>({items.length})</span>
              </div>

              <div className="palette-items-grid">
                {items.map(template => {
                  const IconComp = ICON_MAP[template.icon] || Type;
                  const isPatent = template.category === "patent_specific";

                  return (
                    <div
                      key={template.type}
                      className={`palette-item ${isPatent ? "patent-type" : ""}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, template)}
                      onClick={() => onAddField(template)}
                      title={`Drag or click to add ${template.label}`}
                    >
                      <div className="palette-item-icon">
                        <IconComp size={16} />
                      </div>
                      <div className="palette-item-info">
                        <span className="palette-item-name">{template.label}</span>
                        <span className="palette-item-desc">{template.description}</span>
                      </div>
                      <button 
                        className="btn-icon" 
                        style={{ padding: "3px 5px", flexShrink: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddField(template);
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
