const baseUrl = (process.env.VITE_API_URL || "https://linkdeck00-production.up.railway.app").replace(/\/$/, "");
const uniqueId = Date.now();
const credentials = {
  name: `Codex Smoke ${uniqueId}`,
  email: `codex-smoke-${uniqueId}@example.com`,
  password: "Password1234",
};

const cookieJar = new Map();

function storeCookies(headers) {
  const setCookie = headers.get("set-cookie");
  if (!setCookie) return;

  const cookiePairs = setCookie.split(/,(?=[^;]+=[^;]+)/g);
  for (const cookie of cookiePairs) {
    const [pair] = cookie.split(";");
    const [name, value] = pair.split("=");
    if (name && value) {
      cookieJar.set(name.trim(), value.trim());
    }
  }
}

function getCookieHeader() {
  return Array.from(cookieJar.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
}

async function request(path, { method = "GET", body, expectedStatuses = [200], headers = {} } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(cookieJar.size > 0 ? { Cookie: getCookieHeader() } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  storeCookies(response.headers);

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  const ok = expectedStatuses.includes(response.status);

  return {
    ok,
    status: response.status,
    data,
  };
}

function printResult(label, result) {
  const prefix = result.ok ? "[PASS]" : "[FAIL]";
  console.log(`${prefix} ${label} -> HTTP ${result.status}`);

  if (!result.ok) {
    console.log(JSON.stringify(result.data, null, 2));
  }
}

async function main() {
  console.log(`Testing against ${baseUrl}`);
  console.log(`Using smoke-test account ${credentials.email}`);

  const results = [];

  results.push(["GET /api/v1/auth/google/start", await request("/api/v1/auth/google/start")]);
  results.push(["GET /api/v1/auth/linkedin/start", await request("/api/v1/auth/linkedin/start")]);
  results.push(["POST /api/v1/auth/signup", await request("/api/v1/auth/signup", { method: "POST", body: credentials, expectedStatuses: [200, 201] })]);
  results.push(["GET /api/v1/profiles/me", await request("/api/v1/profiles/me")]);
  results.push(["GET /api/v1/profiles", await request("/api/v1/profiles")]);
  results.push(["GET /api/v1/accounts", await request("/api/v1/accounts")]);
  results.push(["GET /api/v1/accounts/active", await request("/api/v1/accounts/active")]);
  results.push(["GET /api/v1/accounts/badges", await request("/api/v1/accounts/badges")]);
  results.push(["POST /api/v1/auth/logout", await request("/api/v1/auth/logout", { method: "POST" })]);
  results.push(["POST /api/v1/auth/signin", await request("/api/v1/auth/signin", { method: "POST", body: { email: credentials.email, password: credentials.password } })]);
  results.push(["POST /api/v1/auth/refresh", await request("/api/v1/auth/refresh", { method: "POST" })]);
  results.push(["POST /api/v1/auth/forgot-password", await request("/api/v1/auth/forgot-password", { method: "POST", body: { email: credentials.email } })]);

  const accountsBadgesResult = results.find(([label]) => label === "GET /api/v1/accounts/badges")?.[1];
  const firstSwitchableProfileId =
    accountsBadgesResult?.data?.accounts?.[0]?.profileId ||
    accountsBadgesResult?.data?.accounts?.[0]?.id ||
    null;

  if (firstSwitchableProfileId) {
    results.push([
      "POST /api/v1/accounts/switch",
      await request("/api/v1/accounts/switch", {
        method: "POST",
        body: { profileId: firstSwitchableProfileId },
      }),
    ]);
  } else {
    console.log("[SKIP] POST /api/v1/accounts/switch -> no available profileId in badges response");
  }

  for (const [label, result] of results) {
    printResult(label, result);
  }

  const failed = results.filter(([, result]) => !result.ok);

  if (failed.length > 0) {
    process.exitCode = 1;
    console.log(`\n${failed.length} endpoint checks failed.`);
    return;
  }

  console.log("\nAll endpoint checks passed.");
}

main().catch((error) => {
  console.error("Smoke test crashed.");
  console.error(error);
  process.exitCode = 1;
});
