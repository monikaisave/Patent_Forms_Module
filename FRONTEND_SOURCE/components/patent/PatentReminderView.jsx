import React, { useState } from "react";
import { 
  Bell, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  FileText, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

export function PatentReminderView({ onOpenFillForm }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const remindersData = [
    {
      id: 1,
      fileNo: "1336P",
      appNo: "202411039821",
      client: "BioNano Diagnostics Inc.",
      title: "AI-Powered Microfluidic Biosensor for Rapid Pathogen Detection",
      type: "Provisional to Complete",
      dueDate: "23 Oct 2026",
      daysLeft: 14,
      priority: "high",
      recommendedForm: "indian_patent_form_2"
    },
    {
      id: 2,
      fileNo: "796P",
      appNo: "202221019842",
      client: "AutoThermal Dynamics Ltd",
      title: "Adaptive Thermal Energy Harvesting System for Automotive Applications",
      type: "Form 18 Request for Examination",
      dueDate: "21 Oct 2026",
      daysLeft: 12,
      priority: "critical",
      recommendedForm: "indian_patent_form_18"
    },
    {
      id: 3,
      fileNo: "797P",
      appNo: "202221019843",
      client: "AutoThermal Dynamics Ltd",
      title: "Multi-junction Thermoelectric Generator for Exhaust Heat Recovery",
      type: "Form 18 Request for Examination",
      dueDate: "28 Oct 2026",
      daysLeft: 19,
      priority: "high",
      recommendedForm: "indian_patent_form_18"
    },
    {
      id: 4,
      fileNo: "1028P",
      appNo: "PCT/IB2024/050123",
      client: "Cognizant AI Labs",
      title: "Real-time Edge Computing Vision Architecture",
      type: "PCT National Phase Deadline",
      dueDate: "23 Oct 2026",
      daysLeft: 14,
      priority: "critical",
      recommendedForm: "indian_patent_form_1"
    },
    {
      id: 5,
      fileNo: "467P",
      appNo: "202121008741",
      client: "EcoRide Technologies Pvt Ltd",
      title: "Modular Battery Swapping Platform for Light Electric Vehicles",
      type: "Response to First Examination Report (FER)",
      dueDate: "23 Oct 2026",
      daysLeft: 14,
      priority: "critical",
      recommendedForm: "indian_patent_form_3"
    },
    {
      id: 6,
      fileNo: "634P",
      appNo: "634P/ 2021",
      client: "EcoRide Technologies Pvt Ltd",
      title: "Petrol-powered two-wheelers to electrically powered conversion kit",
      type: "Section 8 Form 3 Foreign Filing Statement",
      dueDate: "15 Nov 2026",
      daysLeft: 37,
      priority: "medium",
      recommendedForm: "indian_patent_form_3"
    }
  ];

  const filtered = remindersData.filter(r => {
    const q = searchQuery.toLowerCase();
    const matchSearch = r.fileNo.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.client.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q);

    const matchTab = activeTab === "all" ||
      (activeTab === "form18" && r.type.includes("Form 18")) ||
      (activeTab === "provisional" && r.type.includes("Provisional")) ||
      (activeTab === "fer" && r.type.includes("Examination Report"));

    return matchSearch && matchTab;
  });

  return (
    <div style={{ padding: "20px 25px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header & Breadcrumb */}
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 500, margin: 0, color: "#333333" }}>
          Patent Reminder Panel &amp; Statutory Deadlines
        </h1>
        <div style={{ fontSize: "13px", color: "#777", marginTop: "4px" }}>
          Patent Section &gt; <span style={{ color: "#3c8dbc" }}>Reminder Panel</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
        <div style={{
          backgroundColor: "#ffffff",
          padding: "16px 20px",
          borderRadius: "3px",
          borderLeft: "4px solid #dd4b39",
          boxShadow: "0 1px 1px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", fontWeight: 600 }}>
            Critical (Next 15 Days)
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#dd4b39", marginTop: "4px" }}>
            4 Files
          </div>
        </div>

        <div style={{
          backgroundColor: "#ffffff",
          padding: "16px 20px",
          borderRadius: "3px",
          borderLeft: "4px solid #f39c12",
          boxShadow: "0 1px 1px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", fontWeight: 600 }}>
            Form 18 Due (48 Months)
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#f39c12", marginTop: "4px" }}>
            2 Files
          </div>
        </div>

        <div style={{
          backgroundColor: "#ffffff",
          padding: "16px 20px",
          borderRadius: "3px",
          borderLeft: "4px solid #00a65a",
          boxShadow: "0 1px 1px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", fontWeight: 600 }}>
            FER Examination Responses
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#00a65a", marginTop: "4px" }}>
            1 File
          </div>
        </div>

        <div style={{
          backgroundColor: "#ffffff",
          padding: "16px 20px",
          borderRadius: "3px",
          borderLeft: "4px solid #3c8dbc",
          boxShadow: "0 1px 1px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", fontWeight: 600 }}>
            Section 8 Statements
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#3c8dbc", marginTop: "4px" }}>
            1 File
          </div>
        </div>
      </div>

      {/* Main Table Box */}
      <div style={{
        backgroundColor: "#ffffff",
        borderTop: "3px solid #3c8dbc",
        borderRadius: "3px",
        boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        {/* Filters */}
        <div style={{
          padding: "15px 20px",
          borderBottom: "1px solid #f4f4f4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          backgroundColor: "#fafafa"
        }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "all", label: "All Reminders" },
              { id: "form18", label: "Form 18 Deadlines" },
              { id: "provisional", label: "Provisional to Complete" },
              { id: "fer", label: "FER Examination" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  backgroundColor: activeTab === tab.id ? "#3c8dbc" : "#fff",
                  color: activeTab === tab.id ? "#fff" : "#555",
                  boxShadow: activeTab === tab.id ? "0 1px 2px rgba(0,0,0,0.15)" : "none",
                  border: activeTab === tab.id ? "none" : "1px solid #ddd"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", width: "280px" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", top: "9px", color: "#888" }} />
            <input
              type="text"
              placeholder="Search file no, title, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "6px 10px 6px 30px",
                fontSize: "13px",
                border: "1px solid #d2d6de",
                borderRadius: "3px",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9", borderBottom: "2px solid #e1e4e8", color: "#444", textAlign: "left" }}>
                <th style={{ padding: "11px 14px" }}>File No</th>
                <th style={{ padding: "11px 14px" }}>Client</th>
                <th style={{ padding: "11px 14px", minWidth: "260px" }}>Invention Title</th>
                <th style={{ padding: "11px 14px" }}>Reminder Type</th>
                <th style={{ padding: "11px 14px" }}>Due Date</th>
                <th style={{ padding: "11px 14px" }}>Days Left</th>
                <th style={{ padding: "11px 14px", textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #f1f1f1",
                    backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fbfbfb"
                  }}
                >
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#3c8dbc" }}>
                    {item.fileNo}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#444" }}>{item.client}</td>
                  <td style={{ padding: "10px 14px", color: "#222" }}>{item.title}</td>
                  <td style={{ padding: "10px 14px", color: "#555" }}>{item.type}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: "#333" }}>{item.dueDate}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      padding: "2px 8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      borderRadius: "3px",
                      backgroundColor: item.daysLeft <= 15 ? "#fde8e8" : "#fef3c7",
                      color: item.daysLeft <= 15 ? "#c81e1e" : "#b45309"
                    }}>
                      {item.daysLeft} days
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "right" }}>
                    {onOpenFillForm && (
                      <button
                        onClick={() => onOpenFillForm(item.fileNo)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "5px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          backgroundColor: "#0284c7",
                          color: "#fff",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer"
                        }}
                        title={`Open Auto-Fill for File ${item.fileNo}`}
                      >
                        <FileText size={12} /> Auto-Fill Form &rarr;
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
