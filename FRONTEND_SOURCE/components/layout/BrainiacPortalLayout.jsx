import React, { useState } from "react";
import {
  FileText,
  Award,
  ChevronDown,
  ChevronRight,
  Menu,
  Clock,
  Layers,
  Files,
  Table,
  User,
  Search,
  Shield
} from "lucide-react";

export function BrainiacPortalLayout({
  activeNav = "patent_list", // "add_patent" | "patent_list" | "patent_reminder" | "patent_builder" | "patent_fill"
  onNavigate,
  children
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [patentSectionOpen, setPatentSectionOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate("patent_fill", searchQuery.trim());
    }
  };

  return (
    <div className="brainiac-portal-root" style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      width: "100%",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      overflowX: "hidden"
    }}>
      {/* 1. CLEAN LIGHT TOP NAVBAR */}
      <header style={{
        height: "56px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "stretch",
        position: "sticky",
        top: 0,
        zIndex: 1030,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        borderBottom: "1px solid #e2e8f0"
      }}>
        {/* Brand / Firm Logo Section - Rich Light Blue */}
        <div 
          onClick={() => onNavigate("patent_list")}
          title="Brainiac IP Solutions - Patent & Legal Practice Enterprise"
          style={{
            width: sidebarCollapsed ? "60px" : "260px",
            backgroundColor: "#cbe2fc",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            color: "#0f172a",
            fontWeight: 700,
            cursor: "pointer",
            transition: "width 0.2s ease",
            overflow: "hidden",
            whiteSpace: "nowrap",
            borderRight: "1px solid #93c5fd"
          }}
        >
          {sidebarCollapsed ? (
            <div style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              backgroundColor: "#9ec5f8",
              border: "1px solid #60a5fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "14px",
              color: "#0f368e"
            }}>
              ⚖️
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                backgroundColor: "#9ec5f8",
                border: "1px solid #60a5fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "16px",
                color: "#0f368e",
                boxShadow: "0 1px 3px rgba(29,78,216,0.15)"
              }}>
                🏛️
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "15px", fontWeight: 800, letterSpacing: "-0.2px", lineHeight: 1.1, color: "#0c2856" }}>
                  BRAINIAC IP
                </span>
                <span style={{ fontSize: "10px", color: "#1d4ed8", fontWeight: 700, letterSpacing: "0.5px" }}>
                  PATENT PRACTICE SUITE
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navbar Center & Right Toolbar */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          gap: "16px"
        }}>
          {/* Left Controls: Hamburger Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                backgroundColor: "#e0effe",
                border: "1px solid #bfdbfe",
                color: "#1e40af",
                cursor: "pointer",
                padding: "7px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#bfdbfe";
                e.currentTarget.style.color = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#e0effe";
                e.currentTarget.style.color = "#1e40af";
              }}
              title="Toggle Sidebar Navigation"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Quick Universal File No Lookup Form */}
          <form 
            onSubmit={handleQuickSearch}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f8fafc",
              borderRadius: "6px",
              padding: "6px 14px",
              maxWidth: "420px",
              flex: 1,
              border: "1px solid #e2e8f0",
              transition: "border-color 0.15s ease"
            }}
          >
            <Search size={14} style={{ color: "#64748b", marginRight: "8px" }} />
            <input
              type="text"
              placeholder="Search File No (e.g. 645P, 1336P)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#0f172a",
                fontSize: "12px",
                width: "100%",
                fontWeight: 500
              }}
            />
          </form>

          {/* Senior Attorney Profile Card */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#0f172a",
              fontSize: "12px",
              fontWeight: 600,
              padding: "5px 12px",
              backgroundColor: "#e0effe",
              borderRadius: "6px",
              border: "1px solid #bfdbfe"
            }}>
              <div style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                backgroundColor: "#bfdbfe",
                border: "1px solid #93c5fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1d4ed8",
                fontWeight: 800,
                fontSize: "11px"
              }}>
                PA
              </div>
              <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                <span style={{ lineHeight: 1.1, color: "#1e3a8a" }}>Dr. Suneet Sabale</span>
                <span style={{ fontSize: "9px", color: "#2563eb", fontWeight: 600 }}>Reg. IN/PA-1773</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT: RICHER BLUE SIDEBAR + MAIN CONTENT */}
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {/* LEFT SIDEBAR - VISIBLY RICHER BLUE THEME */}
        <aside style={{
          width: sidebarCollapsed ? "60px" : "260px",
          backgroundColor: "#cbe2fc", // Richer Light Blue
          minHeight: "calc(100vh - 56px)",
          transition: "width 0.2s ease",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          userSelect: "none",
          zIndex: 1020,
          borderRight: "1px solid #93c5fd",
          boxShadow: "2px 0 10px rgba(30,58,138,0.08)"
        }}>
          {/* Navigation Links List - ONLY PATENT SECTION VISIBLE ON LEFT SIDE */}
          <nav style={{ display: "flex", flexDirection: "column", padding: "10px 0" }}>
            {/* PATENT SECTION ROOT */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                onClick={() => setPatentSectionOpen(!patentSectionOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  color: "#0b2559",
                  backgroundColor: "#b4d5fa",
                  borderLeft: "4px solid #1d4ed8",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                  transition: "background-color 0.15s ease"
                }}
                title="Patent & Design Practice Section"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Award size={18} style={{ color: "#1d4ed8" }} />
                  {!sidebarCollapsed && <span>Patent Section</span>}
                </div>
                {!sidebarCollapsed && (
                  patentSectionOpen ? <ChevronDown size={14} style={{ color: "#0b2559" }} /> : <ChevronRight size={14} style={{ color: "#0b2559" }} />
                )}
              </div>

              {/* Patent Section 5 Submenus - Harmonious Light Blue Styling */}
              {patentSectionOpen && (
                <div style={{ backgroundColor: "#d5e7fd", display: "flex", flexDirection: "column", padding: "6px 0", borderBottom: "1px solid #b3d3fb" }}>
                  {/* 1. Add Patent/Design Application */}
                  <div
                    onClick={() => onNavigate("add_patent")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: sidebarCollapsed ? "11px 0" : "11px 18px 11px 28px",
                      color: activeNav === "add_patent" ? "#065f46" : "#0f2b5c",
                      fontWeight: activeNav === "add_patent" ? 700 : 600,
                      backgroundColor: activeNav === "add_patent" ? "#a7f3d0" : "transparent",
                      borderLeft: activeNav === "add_patent" ? "4px solid #059669" : "4px solid transparent",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (activeNav !== "add_patent") {
                        e.currentTarget.style.color = "#0a224a";
                        e.currentTarget.style.backgroundColor = "#bedbfc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeNav !== "add_patent") {
                        e.currentTarget.style.color = "#0f2b5c";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                    title="Add Patent/Design Application"
                  >
                    <Files size={16} style={{ color: activeNav === "add_patent" ? "#059669" : "#1d4ed8" }} />
                    {!sidebarCollapsed && <span>Add Patent/Design Application</span>}
                  </div>

                  {/* 2. Patent/Design List */}
                  <div
                    onClick={() => onNavigate("patent_list")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: sidebarCollapsed ? "11px 0" : "11px 18px 11px 28px",
                      color: activeNav === "patent_list" ? "#0b2559" : "#0f2b5c",
                      fontWeight: activeNav === "patent_list" ? 700 : 600,
                      backgroundColor: activeNav === "patent_list" ? "#9ec7f8" : "transparent",
                      borderLeft: activeNav === "patent_list" ? "4px solid #1d4ed8" : "4px solid transparent",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (activeNav !== "patent_list") {
                        e.currentTarget.style.color = "#0a224a";
                        e.currentTarget.style.backgroundColor = "#bedbfc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeNav !== "patent_list") {
                        e.currentTarget.style.color = "#0f2b5c";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                    title="Patent/Design List"
                  >
                    <Table size={16} style={{ color: activeNav === "patent_list" ? "#1d4ed8" : "#1d4ed8" }} />
                    {!sidebarCollapsed && <span>Patent/Design List</span>}
                  </div>

                  {/* 3. Reminder Panel */}
                  <div
                    onClick={() => onNavigate("patent_reminder")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: sidebarCollapsed ? "11px 0" : "11px 18px 11px 28px",
                      color: activeNav === "patent_reminder" ? "#7c2d12" : "#0f2b5c",
                      fontWeight: activeNav === "patent_reminder" ? 700 : 600,
                      backgroundColor: activeNav === "patent_reminder" ? "#fed7aa" : "transparent",
                      borderLeft: activeNav === "patent_reminder" ? "4px solid #ea580c" : "4px solid transparent",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (activeNav !== "patent_reminder") {
                        e.currentTarget.style.color = "#0a224a";
                        e.currentTarget.style.backgroundColor = "#bedbfc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeNav !== "patent_reminder") {
                        e.currentTarget.style.color = "#0f2b5c";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                    title="Statutory Reminder Panel"
                  >
                    <Clock size={16} style={{ color: activeNav === "patent_reminder" ? "#ea580c" : "#1d4ed8" }} />
                    {!sidebarCollapsed && <span>Reminder Panel</span>}
                  </div>

                  {/* 4. Patent Forms Builder */}
                  <div
                    onClick={() => onNavigate("patent_builder")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: sidebarCollapsed ? "11px 0" : "11px 18px 11px 28px",
                      color: activeNav === "patent_builder" ? "#075985" : "#0f2b5c",
                      fontWeight: activeNav === "patent_builder" ? 700 : 600,
                      backgroundColor: activeNav === "patent_builder" ? "#a5f3fc" : "transparent",
                      borderLeft: activeNav === "patent_builder" ? "4px solid #0284c7" : "4px solid transparent",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (activeNav !== "patent_builder") {
                        e.currentTarget.style.color = "#0a224a";
                        e.currentTarget.style.backgroundColor = "#bedbfc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeNav !== "patent_builder") {
                        e.currentTarget.style.color = "#0f2b5c";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                    title="Patent Forms Builder"
                  >
                    <Layers size={16} style={{ color: activeNav === "patent_builder" ? "#0284c7" : "#1d4ed8" }} />
                    {!sidebarCollapsed && <span>Patent Forms Builder</span>}
                  </div>

                  {/* 5. Fill Patent Form (Auto-Fill) */}
                  <div
                    onClick={() => onNavigate("patent_fill")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: sidebarCollapsed ? "11px 0" : "11px 18px 11px 28px",
                      color: activeNav === "patent_fill" ? "#5b21b6" : "#0f2b5c",
                      fontWeight: activeNav === "patent_fill" ? 700 : 600,
                      backgroundColor: activeNav === "patent_fill" ? "#ddd6fe" : "transparent",
                      borderLeft: activeNav === "patent_fill" ? "4px solid #7c3aed" : "4px solid transparent",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (activeNav !== "patent_fill") {
                        e.currentTarget.style.color = "#0a224a";
                        e.currentTarget.style.backgroundColor = "#bedbfc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeNav !== "patent_fill") {
                        e.currentTarget.style.color = "#0f2b5c";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                    title="Fill Patent Form (Auto-Fill)"
                  >
                    <FileText size={16} style={{ color: activeNav === "patent_fill" ? "#7c3aed" : "#1d4ed8" }} />
                    {!sidebarCollapsed && <span>Fill Patent Form (Auto-Fill)</span>}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Bottom Enterprise Legal Firm Card */}
          {!sidebarCollapsed && (
            <div style={{
              marginTop: "auto",
              padding: "16px",
              backgroundColor: "#bcdbfb",
              borderTop: "1px solid #93c5fd"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px"
              }}>
                <Shield size={14} style={{ color: "#1d4ed8" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#0c2856" }}>
                  Brainiac IP Solutions LLP
                </span>
              </div>
              <p style={{
                fontSize: "10px",
                color: "#1d4ed8",
                margin: 0,
                lineHeight: 1.4,
                fontWeight: 600
              }}>
                Statutory Patent Filing & Form Automation Module v4.2 · IPO E-Filing System Compliance
              </p>
            </div>
          )}
        </aside>

        {/* 3. MAIN CONTENT VIEWPORT */}
        <main style={{
          flex: 1,
          backgroundColor: "#f8fafc",
          minHeight: "calc(100vh - 56px)",
          display: "flex",
          flexDirection: "column",
          overflow: "auto"
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
