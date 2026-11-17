import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { VERSIONED_FILES, collectVersions } from "./lib/versions.mjs";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const next = process.argv[2]?.replace(/^v/, "");

if (!next || !/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(next)) {
  console.error("Usage: npm run bump <version>, for example npm run bump 0.1.3");
  process.exit(1);
}

for (const { file, format } of VERSIONED_FILES) {
  const absolute = path.join(root, file);
  const text = await readFile(absolute, "utf8");
  let updated;
  if (format === "npm") {
    // package.json and package-lock.json use npm's own JSON formatting, and the lockfile
    // can hold dependency versions that must not change.
    const json = JSON.parse(text);
    json.version = next;
    if (json.packages?.[""]) json.packages[""].version = next;
    updated = `${JSON.stringify(json, null, 2)}\n`;
  } else {
    // Manifests keep hand-formatted inline arrays, so only the version values are rewritten.
    updated = text.replace(/("version"\s*:\s*)"[^"]*"/g, `$1"${next}"`);
  }
  if (updated !== text) await writeFile(absolute, updated);
}

const mismatches = (await collectVersions(root)).filter(({ version }) => version !== next);
if (mismatches.length > 0) {
  console.error(mismatches.map(({ label, version }) => `- ${label} is ${version}, expected ${next}`).join("\n"));
  process.exit(1);
}

console.log(`Set version ${next} in ${VERSIONED_FILES.map(({ file }) => file).join(", ")}.`);
console.log("Next: add a CHANGELOG.md entry, then run npm test.");
