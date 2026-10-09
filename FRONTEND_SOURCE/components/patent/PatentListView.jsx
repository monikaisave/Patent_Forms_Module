import React, { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  RotateCcw, 
  FileText, 
  Layers, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Filter,
  ExternalLink,
  Table as TableIcon
} from "lucide-react";

export function PatentListView({
  patentsList = [],
  onOpenFillForm,
  onOpenBuilder,
  onAddNewPatent
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [patents, setPatents] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Combine props list, custom localStorage records, and default seeds
    const custom = JSON.parse(localStorage.getItem("custom_patents_records") || "[]");
    const baseList = patentsList && patentsList.length > 0 ? patentsList : [
      {
        id: 1,
        type: "Patent",
        fileNo: "645P",
        clientRefNo: "CRN-645P",
        applicationNo: "645P/ 2021",
        titleOfInvention: "Automated System for Opening and Closing Sliding Doors",
        typeOfApplication: "Ordinary Application",
        dateOfFiling: "2021-08-14",
        priorityDate: "2020-08-15",
        applicantName: "Brainiac IP Client Solutions",
        granted: "No"
      },
      {
        id: 2,
        type: "Patent",
        fileNo: "634P",
        clientRefNo: "CRN-634P",
        applicationNo: "634P/ 2021",
        titleOfInvention: "Petrol-powered two-wheelers to electrically powered conversion kit",
        typeOfApplication: "Ordinary Application",
        dateOfFiling: "2021-06-20",
        priorityDate: "2020-07-01",
        applicantName: "EcoRide Technologies Pvt Ltd",
        granted: "Yes"
      },
      {
        id: 3,
        type: "Design",
        fileNo: "641D",
        clientRefNo: "CRN-641D",
        applicationNo: "641D/ 2021",
        titleOfInvention: "Industrial Ergonomic Handle for Surgical Instruments",
        typeOfApplication: "Ordinary Application",
        dateOfFiling: "2021-07-05",
        priorityDate: "2021-01-10",
        applicantName: "MedTech Innovations Ltd",
        granted: "Yes"
      },
      {
        id: 4,
        type: "Patent",
        fileNo: "1336P",
        clientRefNo: "CRN-1336P",
        applicationNo: "202411039821",
        titleOfInvention: "AI-Powered Microfluidic Biosensor for Rapid Pathogen Detection",
        typeOfApplication: "PCT National Phase Application",
        dateOfFiling: "2024-03-12",
        priorityDate: "2023-09-15",
        applicantName: "BioNano Diagnostics Inc.",
        granted: "No"
      },
      {
        id: 5,
        type: "Patent",
        fileNo: "796P",
        clientRefNo: "CRN-796P",
        applicationNo: "202221019842",
        titleOfInvention: "Adaptive Thermal Energy Harvesting System for Automotive Applications",
        typeOfApplication: "Ordinary Application",
        dateOfFiling: "2022-11-20",
        priorityDate: "2021-12-05",
        applicantName: "AutoThermal Dynamics Ltd",
        granted: "No"
      }
    ];

    // Merge custom with base avoiding duplicate fileNo
    const combined = [...custom];
    baseList.forEach(item => {
      const fNo = item.fileNo || item.file_no;
      if (!combined.some(c => (c.fileNo || c.file_no) === fNo)) {
        combined.push({
          id: item.patentId || item.id,
          type: item.type || "Patent",
          fileNo: fNo,
          clientRefNo: item.clientRefNo || item.client_ref_no || "-",
          applicationNo: item.applicationNo || item.application_no || item.appNumber || "-",
          titleOfInvention: item.titleOfInvention || item.title || "Patent Invention",
          typeOfApplication: item.typeOfApplication || item.type_of_application || "Ordinary Application",
          dateOfFiling: item.dateOfFiling || item.filing_date || "-",
          priorityDate: item.priorityDate || item.priority_date || "-",
          applicantName: item.applicantName || item.applicant_name || (item.applicants && item.applicants[0]?.name) || "Patent Applicant",
          granted: item.granted || "No"
        });
      }
    });

    setPatents(combined);
  }, [patentsList]);

  // Filter logic
  const filtered = patents.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = (
      (p.fileNo || "").toLowerCase().includes(q) ||
      (p.titleOfInvention || "").toLowerCase().includes(q) ||
      (p.clientRefNo || "").toLowerCase().includes(q) ||
      (p.applicationNo || "").toLowerCase().includes(q) ||
      (p.applicantName || "").toLowerCase().includes(q)
    );

    const matchType = typeFilter === "all" || (p.type || "").toLowerCase() === typeFilter.toLowerCase();
    return matchSearch && matchType;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: "20px 25px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header & Breadcrumb */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 500, margin: 0, color: "#333333" }}>
            Patent / Design List
          </h1>
          <div style={{ fontSize: "13px", color: "#777", marginTop: "4px" }}>
            Patent Section &gt; <span style={{ color: "#3c8dbc" }}>Patent/Design List</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {onAddNewPatent && (
            <button
              onClick={onAddNewPatent}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#3c8dbc",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              <Plus size={16} /> Add Patent/Design Application
            </button>
          )}
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
        {/* Search & Filter Toolbar */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, maxWidth: "450px" }}>
            <div style={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center"
            }}>
              <Search size={16} style={{ position: "absolute", left: "10px", color: "#888" }} />
              <input
                type="text"
                placeholder="Search by File No, Title, Applicant, Application No..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{
                  width: "100%",
                  padding: "7px 10px 7px 32px",
                  fontSize: "13px",
                  border: "1px solid #d2d6de",
                  borderRadius: "3px",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
              <span style={{ color: "#555", fontWeight: 600 }}>Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                style={{
                  padding: "6px 10px",
                  fontSize: "13px",
                  border: "1px solid #d2d6de",
                  borderRadius: "3px"
                }}
              >
                <option value="all">All Types</option>
                <option value="patent">Patents</option>
                <option value="design">Designs</option>
              </select>
            </div>

            <span style={{ fontSize: "13px", color: "#777" }}>
              Total: <strong>{filtered.length}</strong> records
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{
                backgroundColor: "#f9f9f9",
                borderBottom: "2px solid #e1e4e8",
                color: "#444",
                textAlign: "left"
              }}>
                <th style={{ padding: "11px 14px", width: "45px" }}>#</th>
                <th style={{ padding: "11px 14px", width: "90px" }}>Type</th>
                <th style={{ padding: "11px 14px", fontWeight: 700, color: "#3c8dbc" }}>File No.</th>
                <th style={{ padding: "11px 14px" }}>Client Ref No</th>
                <th style={{ padding: "11px 14px" }}>Application No</th>
                <th style={{ padding: "11px 14px", minWidth: "250px" }}>Title of Invention</th>
                <th style={{ padding: "11px 14px", minWidth: "180px" }}>Applicant</th>
                <th style={{ padding: "11px 14px" }}>Filing Date</th>
                <th style={{ padding: "11px 14px" }}>Status</th>
                <th style={{ padding: "11px 14px", textAlign: "right", minWidth: "160px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: "30px", textAlign: "center", color: "#888" }}>
                    No patent or design records found matching your query.
                  </td>
                </tr>
              ) : (
                paginated.map((p, idx) => (
                  <tr
                    key={p.id || idx}
                    style={{
                      borderBottom: "1px solid #f1f1f1",
                      backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fbfbfb",
                      transition: "background 0.15s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f7fd"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#ffffff" : "#fbfbfb"}
                  >
                    <td style={{ padding: "10px 14px", color: "#888" }}>{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{
                        padding: "2px 8px",
                        fontSize: "11px",
                        fontWeight: 600,
                        borderRadius: "3px",
                        backgroundColor: p.type === "Design" ? "#e0f2fe" : "#ecfdf5",
                        color: p.type === "Design" ? "#0284c7" : "#059669"
                      }}>
                        {p.type || "Patent"}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px", fontWeight: 700, color: "#3c8dbc" }}>
                      {p.fileNo}
                    </td>
                    <td style={{ padding: "10px 14px", color: "#666" }}>{p.clientRefNo || "-"}</td>
                    <td style={{ padding: "10px 14px", color: "#444", fontWeight: 500 }}>{p.applicationNo || "-"}</td>
                    <td style={{ padding: "10px 14px", color: "#222", lineHeight: 1.3 }}>
                      {p.titleOfInvention}
                    </td>
                    <td style={{ padding: "10px 14px", color: "#555" }}>{p.applicantName || "-"}</td>
                    <td style={{ padding: "10px 14px", color: "#666" }}>{p.dateOfFiling || "-"}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{
                        padding: "2px 8px",
                        fontSize: "11px",
                        fontWeight: 600,
                        borderRadius: "3px",
                        backgroundColor: p.granted === "Yes" ? "#d1fae5" : "#fef3c7",
                        color: p.granted === "Yes" ? "#065f46" : "#92400e"
                      }}>
                        {p.granted === "Yes" ? "Granted" : "Pending"}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                        {onOpenFillForm && (
                          <button
                            onClick={() => onOpenFillForm(p.fileNo)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "4px 8px",
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "#ffffff",
                              backgroundColor: "#0284c7",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer"
                            }}
                            title="Auto-Fill Statutory Patent Forms with this File No"
                          >
                            <FileText size={12} /> Fill Form
                          </button>
                        )}

                        {onOpenBuilder && (
                          <button
                            onClick={() => onOpenBuilder(p.fileNo)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "4px 8px",
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "#ffffff",
                              backgroundColor: "#00a65a",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer"
                            }}
                            title="Open Forms Builder"
                          >
                            <Layers size={12} /> Builder
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div style={{
          padding: "12px 20px",
          backgroundColor: "#fafafa",
          borderTop: "1px solid #f4f4f4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
          color: "#666"
        }}>
          <div>
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} entries
          </div>

          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "4px 10px",
                border: "1px solid #ddd",
                backgroundColor: currentPage === 1 ? "#f5f5f5" : "#fff",
                color: currentPage === 1 ? "#aaa" : "#333",
                borderRadius: "3px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer"
              }}
            >
              Previous
            </button>
            <span style={{ padding: "4px 10px", backgroundColor: "#3c8dbc", color: "#fff", borderRadius: "3px", fontWeight: 600 }}>
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: "4px 10px",
                border: "1px solid #ddd",
                backgroundColor: currentPage === totalPages ? "#f5f5f5" : "#fff",
                color: currentPage === totalPages ? "#aaa" : "#333",
                borderRadius: "3px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer"
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
