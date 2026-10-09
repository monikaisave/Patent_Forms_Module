import React from "react";
import { 
  FileText, 
  GitBranch, 
  ShieldCheck, 
  X, 
  Eye, 
  Zap, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  Database,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { MOCK_PATENT_DATABASE } from "../../data/mockPatents";

export function DashboardHeader({
  title,
  onTitleChange,
  activeTab,
  onTabChange,
  onReviewChanges,
  onSaveDraft,
  onNewBlankForm,
  onAutoFetchApi,
  isLoadingApi,
  selectedFileNo,
  onSelectFileNo,
  lastPopulatedCount,
  patentsList = [],
  currentFormId,
  onSelectFormById,
  availableForms = [],
  onBackToList,
  onGoToFill
}) {
  return (
    <>
      {/* Top Header matching exact screenshot */}
      <header className="builder-topbar">
        <div className="topbar-left" style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          {onBackToList && (
            <button
              onClick={onBackToList}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "#f1f5f9",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                padding: "0.35rem 0.65rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1e293b",
                cursor: "pointer",
                transition: "all 150ms ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e2e8f0"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f1f5f9"}
              title="Return to Patent Forms Table"
            >
              <ArrowLeft size={14} />
              <span>Forms List</span>
            </button>
          )}

          <input
            type="text"
            className="topbar-title-edit"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>

        {/* Topbar Right */}
        <div className="topbar-right">
          <span className="saved-indicator">Last Saved: Now</span>

          <button 
            className="btn-review-changes" 
            onClick={onSaveDraft}
            style={{ background: "#f0fdf4", color: "#166534", borderColor: "#bbf7d0" }}
            title="Save draft progress to SQL database"
          >
            Save Draft &amp; Edit
          </button>

          <button 
            className="btn-review-changes" 
            onClick={onNewBlankForm}
            style={{ background: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" }}
            title="Create an all-new blank form from scratch"
          >
            + All New Form
          </button>

          <button className="btn-review-changes" onClick={onReviewChanges}>
            Review &amp; Export PDF
          </button>

          {onBackToList && (
            <button className="btn-close-modal" onClick={onBackToList} title="Close Builder">
              <X size={16} />
            </button>
          )}
        </div>
      </header>
    </>
  );
}
