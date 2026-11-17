import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { createZip, readZip } from "./lib/zip.mjs";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const dist = path.join(root, "dist");
const releaseDir = path.join(dist, "release");
const { version } = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const IGNORED_FILES = new Set([".DS_Store"]);

// `required` lists archive paths that must exist; a trailing slash means a non-empty directory.
const PLATFORMS = {
  claude: {
    manifest: ".claude-plugin/plugin.json",
    omit: ["rules"],
    required: [".claude-plugin/plugin.json", ".mcp.json", "skills/", "commands/"]
  },
  gemini: {
    manifest: "gemini-extension.json",
    required: ["gemini-extension.json", "skills/", "commands/"],
    // Gemini CLI installs from a GitHub Release only when an asset name starts with the
    // user's platform, or when the release has a single asset.
    releaseAliases: ["darwin.mailgun-gemini.zip", "linux.mailgun-gemini.zip", "win32.mailgun-gemini.zip"]
  }
};

const archiveTimestamp = () => {
  try {
    return new Date(Number(execFileSync("git", ["log", "-1", "--format=%ct"], { cwd: root, encoding: "utf8" })) * 1000);
  } catch {
    return new Date(Date.UTC(2000, 0, 1));
  }
};

const listEntries = async (dir, prefix = "") => {
  const entries = [];
  const children = (await readdir(path.join(dir, prefix), { withFileTypes: true }))
    .filter((child) => !IGNORED_FILES.has(child.name))
    .sort((a, b) => a.name.localeCompare(b.name));
  for (const child of children) {
    const name = `${prefix}${child.name}`;
    if (child.isDirectory()) {
      entries.push({ name: `${name}/` });
      entries.push(...(await listEntries(dir, `${name}/`)));
    } else {
      entries.push({ name, data: await readFile(path.join(dir, name)) });
    }
  }
  return entries;
};

const manifestReferences = (manifest) => {
  const references = [manifest.skills, manifest.rules, manifest.mcpServers, manifest.commands];
  return references
    .flat()
    .filter((reference) => typeof reference === "string")
    .map((reference) => reference.replace(/^\.\//, ""));
};

const verifyArchive = (platform, config, archive) => {
  const entries = readZip(archive);
  const names = [...entries.keys()];
  const failures = [];
  const has = (reference) => {
    const directory = `${reference.replace(/\/$/, "")}/`;
    return reference.endsWith("/")
      ? names.some((name) => name.startsWith(directory) && !name.endsWith("/"))
      : entries.has(reference) || names.some((name) => name.startsWith(directory));
  };

  for (const required of config.required) {
    if (!has(required)) failures.push(`missing ${required}`);
  }
  const manifest = JSON.parse(entries.get(config.manifest)?.().toString("utf8") ?? "{}");
  if (manifest.version !== version) failures.push(`${config.manifest} version ${manifest.version} does not match ${version}`);
  for (const reference of manifestReferences(manifest)) {
    if (!has(reference)) failures.push(`${config.manifest} references missing ${reference}`);
  }
  const skillDirs = new Set(names.map((name) => name.match(/^skills\/([^/]+)\//)?.[1]).filter(Boolean));
  for (const skill of skillDirs) {
    if (!entries.has(`skills/${skill}/SKILL.md`)) failures.push(`missing skills/${skill}/SKILL.md`);
  }
  for (const omitted of config.omit ?? []) {
    if (has(omitted)) failures.push(`must not include ${omitted}`);
  }
  if (names.some((name) => IGNORED_FILES.has(path.posix.basename(name)))) failures.push("contains .DS_Store");

  return failures.map((failure) => `${platform}: ${failure}`);
};

const buildPlatform = async (platform, modified) => {
  const config = PLATFORMS[platform];
  const source = path.join(root, "plugins", `mailgun-${platform}`);
  const stage = path.join(dist, platform);
  const omitted = new Set((config.omit ?? []).map((name) => path.join(source, name)));

  await rm(stage, { recursive: true, force: true });
  await cp(source, stage, {
    recursive: true,
    filter: (file) => !IGNORED_FILES.has(path.basename(file)) && !omitted.has(file)
  });

  const archive = createZip(await listEntries(stage), modified);
  const failures = verifyArchive(platform, config, archive);
  const fileNames = [`mailgun-${platform}-${version}.zip`, ...(config.releaseAliases ?? [])];
  for (const fileName of fileNames) await writeFile(path.join(releaseDir, fileName), archive);
  return { fileNames, failures };
};

const requested = process.argv.slice(2);
const unknown = requested.filter((platform) => !PLATFORMS[platform]);
if (unknown.length > 0) {
  console.error(`Unknown platform: ${unknown.join(", ")}. Expected one of: ${Object.keys(PLATFORMS).join(", ")}.`);
  process.exit(1);
}

await rm(releaseDir, { recursive: true, force: true });
await mkdir(releaseDir, { recursive: true });

const modified = archiveTimestamp();
const failures = [];
const built = [];
for (const platform of requested.length > 0 ? requested : Object.keys(PLATFORMS)) {
  const result = await buildPlatform(platform, modified);
  failures.push(...result.failures);
  built.push(...result.fileNames);
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

const sums = [];
for (const fileName of built.sort()) {
  const digest = createHash("sha256").update(await readFile(path.join(releaseDir, fileName))).digest("hex");
  sums.push(`${digest}  ${fileName}`);
}
await writeFile(path.join(releaseDir, "SHA256SUMS"), `${sums.join("\n")}\n`);

console.log(`Built ${built.length} archives for ${version} in ${path.relative(root, releaseDir)}:`);
for (const fileName of built) console.log(`  ${fileName}`);
