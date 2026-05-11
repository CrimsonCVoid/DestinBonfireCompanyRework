#!/usr/bin/env node
/**
 * Discover the PostHog project's public api_token (phc_*) and numeric id
 * using the Personal API key (phx_*), and append them to .env.local.
 *
 * Idempotent — won't duplicate keys; skips lines already present.
 *
 * Usage:
 *   node scripts/posthog-discover.mjs
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Load .env.local manually (Node doesn't read it without next).
const ENV_PATH = path.join(process.cwd(), ".env.local");
let envText = "";
try {
  envText = await readFile(ENV_PATH, "utf8");
} catch {
  console.error("× .env.local not found. Run from the project root.");
  process.exit(1);
}

function readVar(name) {
  const re = new RegExp(`^\\s*${name}\\s*=\\s*(.*)\\s*$`, "m");
  const m = envText.match(re);
  return m ? m[1].replace(/^["']|["']$/g, "").trim() : "";
}

const personalKey = readVar("POSTHOG_PERSONAL_API_KEY");
const host = (readVar("POSTHOG_HOST") || "https://us.posthog.com").replace(/\/$/, "");

if (!personalKey || !personalKey.startsWith("phx_")) {
  console.error("× POSTHOG_PERSONAL_API_KEY (phx_...) is missing in .env.local.");
  process.exit(1);
}

const r = await fetch(`${host}/api/projects/`, {
  headers: { Authorization: `Bearer ${personalKey}` },
});
if (!r.ok) {
  console.error(`× PostHog returned ${r.status} ${r.statusText}. Check key + host.`);
  process.exit(1);
}
const json = await r.json();
const project = json?.results?.[0];
if (!project) {
  console.error("× No projects returned for this account.");
  process.exit(1);
}

const apiToken = project.api_token;
const projectId = String(project.id);
if (!apiToken || !apiToken.startsWith("phc_")) {
  console.error("× Project response did not include a phc_ api_token.");
  process.exit(1);
}

function upsert(name, value) {
  const re = new RegExp(`^\\s*${name}\\s*=.*$`, "m");
  if (re.test(envText)) {
    envText = envText.replace(re, `${name}=${value}`);
    return "updated";
  }
  if (!envText.endsWith("\n")) envText += "\n";
  envText += `${name}=${value}\n`;
  return "appended";
}

const a = upsert("NEXT_PUBLIC_POSTHOG_KEY", apiToken);
const b = upsert("NEXT_PUBLIC_POSTHOG_HOST", host);
const c = upsert("POSTHOG_PROJECT_ID", projectId);

await writeFile(ENV_PATH, envText, "utf8");

console.log("✓ PostHog project discovered:");
console.log(`  • name:       ${project.name}`);
console.log(`  • id:         ${projectId}`);
console.log(`  • host:       ${host}`);
console.log(`  • api_token:  phc_...${apiToken.slice(-4)}  (written to .env.local, not printed in full)`);
console.log("");
console.log(`  NEXT_PUBLIC_POSTHOG_KEY:   ${a}`);
console.log(`  NEXT_PUBLIC_POSTHOG_HOST:  ${b}`);
console.log(`  POSTHOG_PROJECT_ID:        ${c}`);
console.log("");
console.log("Restart `npm run dev` for changes to take effect.");
