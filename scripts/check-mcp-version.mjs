import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const validateSource = await readFile(path.join(root, "scripts", "validate.mjs"), "utf8");
const pinned = validateSource.match(/const MCP_VERSION = "([^"]+)";/)?.[1];

if (!pinned) {
  console.error("Could not determine pinned MCP version from scripts/validate.mjs");
  process.exit(1);
}

const response = await fetch("https://registry.npmjs.org/@mailgun%2fmcp-server/latest");
if (!response.ok) {
  console.error(`Could not fetch npm latest version: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const latest = (await response.json()).version;
if (!latest) {
  console.error("npm latest response did not include a version");
  process.exit(1);
}

if (pinned !== latest) {
  console.error(`Pinned @mailgun/mcp-server version is ${pinned}, but npm latest is ${latest}.`);
  console.error("Update plugin MCP configs, docs, scripts/validate.mjs, then run npm test.");
  process.exit(1);
}

console.log(`Pinned @mailgun/mcp-server version ${pinned} matches npm latest.`);
