import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URL, fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { execFileSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const ASSETS_DIR = path.join(__dirname, "COMPILED_ASSETS");
const DB_FILE = path.join(__dirname, "patent_forms_local.db");
const PHP_EXE = "C:\\wamp64\\bin\\php\\php7.4.33\\php.exe";

// 1. Embedded SQLite Database Engine (for offline fallback resilience)
const db = new DatabaseSync(DB_FILE);

db.exec(`
  CREATE TABLE IF NOT EXISTS patent_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_no TEXT UNIQUE NOT NULL,
    app_no TEXT NOT NULL,
    title TEXT NOT NULL,
    filing_date TEXT NOT NULL,
    priority_date TEXT,
    publication_date TEXT,
    patent_office TEXT DEFAULT 'The Patent Office at Mumbai',
    agent_name TEXT DEFAULT 'Suneet Baliram Sabale',
    agent_reg_no TEXT DEFAULT 'IN/PA-1773',
    applicants_json TEXT NOT NULL,
    foreign_filings_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS patent_form_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_no TEXT NOT NULL,
    form_code TEXT NOT NULL,
    form_title TEXT NOT NULL,
    form_data TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 2. MySQL / MariaDB Standalone Database Connector (`patent_forms_standalone_db`)
function queryStandaloneMySql(action, params = {}) {
  try {
    const script = `
      $mysqli = @new mysqli("127.0.0.1", "root", "", "patent_forms_standalone_db", 3307);
      if ($mysqli->connect_error) {
        echo json_encode(["success" => false, "error" => $mysqli->connect_error]);
        exit;
      }
      
      $action = $argv[1] ?? "";
      
      if ($action === "patents") {
        $res = $mysqli->query("SELECT patentId, fileNo, type, clientRefNo, applicationNo, titleOfInvention, dateOfFiling, applicantsId FROM patentapplication ORDER BY patentId ASC");
        $list = [];
        while ($row = $res->fetch_assoc()) {
          $list[] = $row;
        }
        echo json_encode(["success" => true, "count" => count($list), "patents" => $list]);
        exit;
      }
      
      if ($action === "lookup") {
        $fileNo = $argv[2] ?? "";
        $stmt = $mysqli->prepare("SELECT * FROM patentapplication WHERE fileNo = ? OR applicationNo = ?");
        $stmt->bind_param("ss", $fileNo, $fileNo);
        $stmt->execute();
        $p = $stmt->get_result()->fetch_assoc();
        if (!$p) {
          echo json_encode(["success" => false, "message" => "Not found"]);
          exit;
        }
        
        $applicants = [];
        if (!empty($p["applicantsId"])) {
          $ids = explode(",", $p["applicantsId"]);
          $idList = implode(",", array_map("intval", $ids));
          if (!empty($idList)) {
            $aRes = $mysqli->query("SELECT * FROM applicants WHERE applicantId IN ($idList)");
            while ($aRow = $aRes->fetch_assoc()) {
              $applicants[] = [
                "id" => $aRow["applicantId"],
                "name" => $aRow["applicantName"],
                "nationality" => "Indian",
                "address" => $aRow["applicantAddress"],
                "email" => $aRow["applicantEmail"],
                "phone" => $aRow["applicantPhone"]
              ];
            }
          }
        }
        
        $foreign = [];
        $stmtF = $mysqli->prepare("SELECT * FROM patentcountry WHERE fileNo = ?");
        $stmtF->bind_param("ss", $p["fileNo"]);
        $stmtF->execute();
        $fRes = $stmtF->get_result();
        while ($fRow = $fRes->fetch_assoc()) {
          $foreign[] = [
            "id" => $fRow["pCountryId"],
            "country_name" => $fRow["countryAbbreviation"],
            "app_date" => $fRow["countryDate"],
            "app_no" => $fRow["countryComment"],
            "status" => ($fRow["isStop"] == 1) ? "Abandoned" : "Pending Examination",
            "pub_date" => "-",
            "grant_date" => "-"
          ];
        }
        
        $payload = [
          "id" => $p["patentId"],
          "file_no" => $p["fileNo"],
          "type" => $p["type"],
          "client_ref_no" => $p["clientRefNo"],
          "title" => $p["titleOfInvention"],
          "app_no" => $p["applicationNo"],
          "type_of_application" => $p["typeOfApplication"],
          "filing_date" => $p["dateOfFiling"],
          "priority_date" => $p["priorityDate"],
          "publication_date" => $p["publicationDate"],
          "patent_office" => "The Patent Office at Mumbai",
          "agent_name" => "Suneet Baliram Sabale",
          "agent_reg_no" => "IN/PA-1773",
          "applicants" => $applicants,
          "foreign_filings" => $foreign
        ];
        
        echo json_encode(["success" => true, "data" => $payload]);
        exit;
      }
      
      if ($action === "save") {
        $fileNo = $argv[2] ?? "GENERAL";
        $formCode = $argv[3] ?? "FORM_1";
        $formTitle = $argv[4] ?? "Patent Form";
        $status = $argv[5] ?? "draft";
        $formData = file_get_contents("php://stdin");
        
        $stmt = $mysqli->prepare("INSERT INTO patent_form_submissions (file_no, form_code, form_title, form_data, status) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE form_data = VALUES(form_data), status = VALUES(status)");
        $stmt->bind_param("sssss", $fileNo, $formCode, $formTitle, $formData, $status);
        $stmt->execute();
        echo json_encode(["success" => true, "id" => $stmt->insert_id, "message" => "Saved successfully to patent_forms_standalone_db"]);
        exit;
      }
      
      if ($action === "delete") {
        $subId = intval($argv[2] ?? 0);
        if ($subId > 0) {
          $stmt = $mysqli->prepare("DELETE FROM patent_form_submissions WHERE id = ?");
          $stmt->bind_param("i", $subId);
          $stmt->execute();
        }
        echo json_encode(["success" => true]);
        exit;
      }
      
      if ($action === "submissions") {
        $res = $mysqli->query("SELECT * FROM patent_form_submissions ORDER BY id DESC LIMIT 50");
        $list = [];
        while ($row = $res->fetch_assoc()) {
          $list[] = $row;
        }
        echo json_encode(["success" => true, "submissions" => $list]);
        exit;
      }
    `;

    const args = ["-r", script, action];
    if (params.fileNo) args.push(params.fileNo);
    if (params.formCode) args.push(params.formCode);
    if (params.formTitle) args.push(params.formTitle);
    if (params.status) args.push(params.status);
    if (params.subId !== undefined) args.push(String(params.subId));

    const inputData = params.formData ? (typeof params.formData === "string" ? params.formData : JSON.stringify(params.formData)) : undefined;

    const out = execFileSync(PHP_EXE, args, { input: inputData, encoding: "utf8", timeout: 4000 });
    return JSON.parse(out);
  } catch (err) {
    return null;
  }
}

// MIME types map for static file server
const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf"
};

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsedUrl.pathname;

  const sendJson = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  const getBody = () => new Promise((resolve) => {
    let raw = "";
    req.on("data", chunk => { raw += chunk; });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });

  // --- API ENDPOINTS ---

  // Health check
  if (pathname === "/api/health") {
    sendJson(200, {
      status: "ok",
      module: "Patent Forms Standalone Project",
      port: PORT,
      database: "MySQL: patent_forms_standalone_db (Port 3307) + SQLite Fallback Engine"
    });
    return;
  }

  // 1. List all patents from separate database: patent_forms_standalone_db
  if (pathname === "/api/patents" || pathname.includes("api_patents")) {
    const dbRes = queryStandaloneMySql("patents");
    if (dbRes && dbRes.success && dbRes.patents) {
      sendJson(200, dbRes);
      return;
    }

    // Fallback SQLite
    const rows = db.prepare("SELECT * FROM patent_records ORDER BY id ASC").all();
    sendJson(200, {
      success: true,
      count: rows.length,
      patents: rows.map(r => ({
        patentId: String(r.id),
        fileNo: r.file_no,
        type: "Patent",
        clientRefNo: r.file_no,
        applicationNo: r.app_no,
        titleOfInvention: r.title,
        dateOfFiling: r.filing_date,
        applicantsId: ""
      }))
    });
    return;
  }

  // 2. Lookup single patent by File No
  if (pathname.includes("api_lookup") || pathname === "/api/patents/lookup") {
    let fileNo = parsedUrl.searchParams.get("fileNo");
    if (!fileNo) {
      const parts = pathname.split("/");
      fileNo = decodeURIComponent(parts[parts.length - 1]);
    }

    if (fileNo) {
      const dbRes = queryStandaloneMySql("lookup", { fileNo });
      if (dbRes && dbRes.success && dbRes.data) {
        sendJson(200, dbRes);
        return;
      }

      // Fallback SQLite
      const row = db.prepare("SELECT * FROM patent_records WHERE UPPER(file_no) = UPPER(?) OR UPPER(app_no) = UPPER(?)").get(fileNo.trim(), fileNo.trim());
      if (row) {
        sendJson(200, {
          success: true,
          data: {
            id: row.id,
            file_no: row.file_no,
            type: "Patent",
            client_ref_no: row.file_no,
            title: row.title,
            app_no: row.app_no,
            type_of_application: "Ordinary Application",
            filing_date: row.filing_date,
            priority_date: row.priority_date,
            publication_date: row.publication_date,
            patent_office: row.patent_office,
            agent_name: row.agent_name,
            agent_reg_no: row.agent_reg_no,
            applicants: JSON.parse(row.applicants_json || "[]"),
            foreign_filings: JSON.parse(row.foreign_filings_json || "[]")
          }
        });
        return;
      }
    }

    sendJson(404, { success: false, message: `File No '${fileNo}' not found` });
    return;
  }

  // 3. Save Form submission into patent_forms_standalone_db
  if ((pathname.includes("api_save") || pathname === "/api/submissions") && req.method === "POST") {
    const body = await getBody();
    const fileNo = body.fileNo || body.file_no || "GENERAL";
    const formCode = body.formCode || body.form_code || body.formSchemaId || "FORM_1";
    const formTitle = body.formTitle || body.form_title || "Statutory Patent Form";
    const formData = typeof body.formData === "object" ? JSON.stringify(body.formData) : (typeof body.data === "object" ? JSON.stringify(body.data) : (body.formData || "{}"));
    const status = body.status || "draft";

    // Save to separate MySQL: patent_forms_standalone_db
    const dbRes = queryStandaloneMySql("save", { fileNo, formCode, formTitle, formData, status });

    // Also persist with deduplication into local SQLite
    let subId = dbRes?.id;
    try {
      const existing = db.prepare("SELECT id FROM patent_form_submissions WHERE file_no = ? AND form_code = ?").get(fileNo, formCode);
      if (existing) {
        db.prepare(`
          UPDATE patent_form_submissions 
          SET form_title = ?, form_data = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
          WHERE id = ?
        `).run(formTitle, formData, status, existing.id);
        if (!subId) subId = existing.id;
      } else {
        const info = db.prepare(`
          INSERT INTO patent_form_submissions (file_no, form_code, form_title, form_data, status)
          VALUES (?, ?, ?, ?, ?)
        `).run(fileNo, formCode, formTitle, formData, status);
        if (!subId) subId = info.lastInsertRowid;
      }
    } catch (e) {}

    sendJson(200, {
      success: true,
      id: subId,
      message: "Form saved successfully!"
    });
    return;
  }

  // 4. Delete Submission
  if ((pathname.startsWith("/api/submissions/") || pathname.includes("api_delete")) && req.method === "DELETE") {
    const parts = pathname.split("/");
    const subId = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(subId) && subId > 0) {
      queryStandaloneMySql("delete", { subId });
      try {
        db.prepare("DELETE FROM patent_form_submissions WHERE id = ?").run(subId);
      } catch (e) {}
    }
    sendJson(200, { success: true, message: "Submission deleted successfully" });
    return;
  }

  // 5. List Submissions
  if (pathname.includes("api_submissions") || (pathname === "/api/submissions" && req.method === "GET")) {
    const dbRes = queryStandaloneMySql("submissions");
    if (dbRes && dbRes.success && dbRes.submissions && dbRes.submissions.length > 0) {
      sendJson(200, dbRes);
      return;
    }

    const rows = db.prepare("SELECT * FROM patent_form_submissions ORDER BY id DESC LIMIT 50").all();
    sendJson(200, {
      success: true,
      submissions: rows.map(r => ({
        id: String(r.id),
        file_no: r.file_no,
        form_code: r.form_code,
        form_title: r.form_title,
        form_data: r.form_data,
        status: r.status,
        created_at: r.created_at,
        updated_at: r.updated_at
      }))
    });
    return;
  }

  // --- STATIC FILE SERVER ---
  let filePath = path.join(ASSETS_DIR, pathname === "/" ? "index.html" : pathname);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(ASSETS_DIR, "index.html");
  }

  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const content = fs.readFileSync(filePath);

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 File Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`🏛️  Patent Forms Standalone Project is RUNNING!`);
  console.log(`🌐  Local URL:  http://localhost:${PORT}`);
  console.log(`🗄️  Database:   MySQL 'patent_forms_standalone_db' (Port 3307)`);
  console.log(`================================================================`);
});
