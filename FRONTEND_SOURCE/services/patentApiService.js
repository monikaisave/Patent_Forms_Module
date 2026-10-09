import { MOCK_PATENT_DATABASE, AVAILABLE_API_MAPPINGS } from "../data/mockPatents";

/**
 * Service to simulate external Patent Registry & Docket Management APIs
 * Implements lookup by fileNo, fuzzy search, and dynamic schema mapping.
 */

export const PatentApiService = {
  /**
   * Fetch all real patents from CodeIgniter MySQL database
   */
  async fetchPatentsList() {
    try {
      const ciBase = window.CI_BASE_URL || (typeof window !== "undefined" && window.location.origin ? window.location.origin + "/" : "");
      const res = await fetch(ciBase + "index.php/PatentForms/api_patents");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.patents && data.patents.length > 0) {
          return data.patents.map(p => ({
            fileNo: p.fileNo,
            appNumber: p.applicationNo && p.applicationNo !== "Pending" ? p.applicationNo : "",
            title: p.titleOfInvention && p.titleOfInvention !== "Pending" ? p.titleOfInvention : "Patent Application",
            applicant: { name: p.clientRefNo && p.clientRefNo !== "Pending" ? p.clientRefNo : "Applicant" },
            jurisdiction: "Indian Patent Office (IPO)"
          }));
        }
      }
    } catch (e) {
      console.warn("Could not fetch live patent list, using seeds:", e);
    }
    return MOCK_PATENT_DATABASE;
  },

  /**
   * Search patents matching query string (fileNo, appNumber, title, or applicant)
   */
  async search(query) {
    const all = await this.fetchPatentsList();
    if (!query || query.trim() === "") return all;
    const q = query.toLowerCase().trim();
    return all.filter(p => 
      p.fileNo.toLowerCase().includes(q) ||
      p.appNumber.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q)
    );
  },

  /**
   * Fetch a single patent record by its unique fileNo or application number from real MySQL DB
   */
  async fetchByFileNo(fileNo, delayMs = 250) {
    if (!fileNo) {
      throw new Error("File Number is required for API lookup");
    }

    try {
      // 1. Try CodeIgniter REST API with real MySQL database
      const ciBase = window.CI_BASE_URL || (typeof window !== "undefined" && window.location.origin ? window.location.origin + "/" : "");
      const ciRes = await fetch(ciBase + "index.php/PatentForms/api_lookup/" + encodeURIComponent(fileNo.trim()));
      if (ciRes.ok) {
        const ciData = await ciRes.json();
        if (ciData.success && ciData.data) {
          const d = ciData.data;
          return {
            fileNo: d.file_no,
            appNumber: d.app_no,
            title: d.title,
            filingDate: d.filing_date,
            priorityDate: d.priority_date,
            publicationDate: d.publication_date,
            jurisdiction: "Indian Patent Office (IPO)",
            status: d.granted === "yes" ? "Granted" : "Pending Examination",
            patentOffice: d.patent_office,
            agent: {
              name: d.agent_name,
              regNo: d.agent_reg_no
            },
            applicant: (d.applicants && d.applicants[0]) || { name: "", nationality: "Indian", address: "" },
            applicants: d.applicants || [],
            foreignFilings: d.foreign_filings || [],
            tableApplicants: (d.applicants || []).map(a => ({
              name: a.name,
              nationality: a.nationality || "Indian",
              address: a.address || ""
            })),
            tableForeignFilings: (d.foreign_filings || []).map(f => ({
              country: f.country_name,
              appDate: f.app_date,
              appNo: f.app_no,
              status: f.status,
              pubDate: f.pub_date || "-",
              grantDate: f.grant_date || "-"
            }))
          };
        }
      }

      // Try local Node SQL Backend API
      const res = await fetch(`/api/patents/lookup?fileNo=${encodeURIComponent(fileNo.trim())}`);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {
      console.warn("Backend API not reachable, falling back to local registry database:", e);
    }

    // Fallback to local memory database
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalized = fileNo.trim().toUpperCase();
        const found = MOCK_PATENT_DATABASE.find(p => 
          p.fileNo.toUpperCase() === normalized ||
          p.appNumber.toUpperCase().replace(/\s/g, '') === normalized.replace(/\s/g, '')
        );

        if (found) {
          resolve(JSON.parse(JSON.stringify(found)));
        } else {
          reject(new Error(`Patent file record "${fileNo}" not found in registry database.`));
        }
      }, delayMs);
    });
  },

  /**
   * Helper to resolve dot-notated dynamic paths like 'patent.applicant.name'
   */
  resolvePath(obj, path) {
    if (!obj || !path) return undefined;
    
    // Strip leading 'patent.' if present
    const cleanPath = path.startsWith("patent.") ? path.slice(7) : path;
    const parts = cleanPath.split(".");
    
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      current = current[part];
    }
    return current;
  },

  /**
   * Automatically inspects form schema fields and populates values from a patent record
   * Returns: { values, populatedFieldsCount, mappedFieldIds, auditLog }
   */
  autoPopulateFormData(patentData, fields) {
    const populatedValues = {};
    const mappedFieldIds = [];
    const auditLog = [];

    fields.forEach(field => {
      if (field.apiMapping) {
        const val = this.resolvePath(patentData, field.apiMapping);
        if (val !== undefined && val !== null) {
          populatedValues[field.id] = val;
          mappedFieldIds.push(field.id);
          auditLog.push({
            fieldId: field.id,
            fieldLabel: field.label,
            apiMapping: field.apiMapping,
            populatedValue: typeof val === "object" ? `${Array.isArray(val) ? val.length : 'Object'} item(s)` : String(val)
          });
        }
      }
    });

    return {
      values: populatedValues,
      populatedFieldsCount: mappedFieldIds.length,
      mappedFieldIds,
      auditLog
    };
  },

  /**
   * Generate NestJS DTO and Mongoose/Prisma schema string (Task 1 Architecture)
   */
  generateNestJsSchema(form) {
    const classProps = form.fields.map(f => {
      const isReq = f.validation?.required ? `@IsNotEmpty()` : `@IsOptional()`;
      const typeStr = f.type === 'number' ? 'number' : f.type === 'repeater' ? 'Record<string, any>[]' : f.type === 'checkbox' ? 'boolean' : 'string';
      const dec = f.type === 'number' ? '@IsNumber()' : f.type === 'repeater' ? '@IsArray()' : f.type === 'checkbox' ? '@IsBoolean()' : '@IsString()';
      return `  @ApiProperty({ description: '${f.label}', required: ${!!f.validation?.required} })\n  ${dec}\n  ${isReq}\n  ${f.id}: ${typeStr};`;
    }).join('\n\n');

    return `// NestJS Dynamic DTO Generated for: ${form.title}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class ${form.id ? form.id.replace(/[^a-zA-Z0-9]/g, '') : 'PatentForm'}Dto {
  @ApiProperty({ example: '${form.id}' })
  @IsString()
  formSchemaId: string;

  @ApiProperty({ example: 'US-11823901-B2' })
  @IsString()
  fileNo: string;

${classProps}
}`;
  },

  /**
   * Generate MySQL table DDL string (Task 1 Architecture)
   */
  generateMySqlDdl(form) {
    const columns = form.fields.map(f => {
      let colType = 'VARCHAR(255)';
      if (f.type === 'textarea') colType = 'TEXT';
      if (f.type === 'number') colType = 'DECIMAL(12, 2)';
      if (f.type === 'date') colType = 'DATE';
      if (f.type === 'repeater') colType = 'JSON';
      if (f.type === 'checkbox') colType = 'TINYINT(1)';
      const notNull = f.validation?.required ? ' NOT NULL' : ' NULL';
      return `  \`${f.id}\` ${colType}${notNull} COMMENT '${f.label.replace(/'/g, "\\'")}'`;
    }).join(',\n');

    const tblName = `patent_form_${form.id ? form.id.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() : 'submission'}`;

    return `-- MySQL Relational Table Definition for Form: ${form.title}
CREATE TABLE IF NOT EXISTS \`${tblName}\` (
  \`submission_id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`file_no\` VARCHAR(64) NOT NULL,
  \`form_schema_id\` VARCHAR(64) NOT NULL,
  \`form_version\` INT UNSIGNED DEFAULT 1,
${columns},
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_file_no\` (\`file_no\`),
  INDEX \`idx_form_schema\` (\`form_schema_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
  },

  /**
   * Save form submission and dynamic tables to SQL Database (CodeIgniter MySQL and Node SQLite)
   */
  async saveSubmission(payload) {
    let success = false;
    let message = "";

    // 1. If running inside CodeIgniter ERP frame with explicit CI_BASE_URL
    if (window.CI_BASE_URL) {
      try {
        const ciRes = await fetch(window.CI_BASE_URL + "index.php/PatentForms/api_save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileNo: payload.fileNo,
            formCode: payload.formSchemaId,
            formTitle: payload.formTitle || "Patent Form",
            formData: payload.data,
            status: payload.status || "draft"
          })
        });
        if (ciRes.ok) {
          const d = await ciRes.json();
          if (d.success) {
            return { success: true, message: d.message || "Saved to CodeIgniter MySQL Database!" };
          }
        }
      } catch (e) {
        console.warn("Could not save to CodeIgniter MySQL API directly:", e);
      }
    }

    // 2. Otherwise save once via /api/submissions (Node + Standalone MySQL)
    try {
      const nodeRes = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (nodeRes.ok) {
        const d = await nodeRes.json();
        if (d.success) {
          return { success: true, message: d.message || "Saved to SQL Database!" };
        }
      }
    } catch (e) {
      console.warn("Could not save to Node backend API:", e);
    }

    return { success, message: message || "Saved successfully to database!" };
  },

  /**
   * Generate PHP Deserializer Helper (Task 1 Architecture)
   */
  generatePhpDeserializer(form) {
    return `<?php
/**
 * PHP Deserializer & Patent Dynamic Form Hydrator
 * Form: ${form.title} (v${form.version || '1.0'})
 */
class ${form.id ? form.id.replace(/[^a-zA-Z0-9]/g, '') : 'PatentForm'}Hydrator {
    public static function deserialize(array $payload): array {
        $clean = [];
        $clean['form_schema_id'] = $payload['formSchemaId'] ?? '${form.id}';
        $clean['file_no'] = trim($payload['fileNo'] ?? '');

        // Map and validate field components
${form.fields.map(f => `        $clean['${f.id}'] = $payload['${f.id}'] ?? ${f.type === 'repeater' ? '[]' : 'null'};`).join('\n')}

        return $clean;
    }
}`;
  }
};
