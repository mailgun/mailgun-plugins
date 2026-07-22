import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const MCP_VERSION = "2.1.0";
const failures = [];

const exists = async (file) => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

const readJson = async (file) => {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    failures.push(`${path.relative(root, file)} is not valid JSON: ${error.message}`);
    return {};
  }
};

const requireFile = async (file) => {
  if (!(await exists(file))) failures.push(`Missing required file: ${path.relative(root, file)}`);
};

const requireFields = (object, fields, label) => {
  for (const field of fields) {
    if (object[field] === undefined || object[field] === "") failures.push(`${label} missing ${field}`);
  }
};

const assertPath = async (base, reference, label) => {
  await requireFile(path.resolve(base, reference));
  if (reference.includes("\\")) failures.push(`${label} must use POSIX-style paths`);
};

const validateMarketplace = async (platform, file, expectedName) => {
  const marketplace = await readJson(file);
  requireFields(marketplace, ["name", "plugins"], `${platform} marketplace`);
  const entry = marketplace.plugins?.find((plugin) => plugin.name === expectedName);
  if (!entry) failures.push(`${platform} marketplace missing ${expectedName}`);
  if (entry?.source && !(await exists(path.resolve(root, entry.source)))) {
    failures.push(`${platform} marketplace source does not exist: ${entry.source}`);
  }
};

const validateMcpConfig = async (file) => {
  const config = await readJson(file);
  const server = config.mcpServers?.mailgun;
  if (!server) failures.push(`${path.relative(root, file)} missing mcpServers.mailgun`);
  if (server?.command !== "npx") failures.push(`${path.relative(root, file)} should launch with npx`);
  const args = server?.args ?? [];
  if (!args.includes(`@mailgun/mcp-server@${MCP_VERSION}`)) {
    failures.push(`${path.relative(root, file)} must pin @mailgun/mcp-server@${MCP_VERSION}`);
  }
  if (server?.env?.MAILGUN_API_KEY !== "${MAILGUN_API_KEY}") {
    failures.push(`${path.relative(root, file)} must map MAILGUN_API_KEY from the user environment`);
  }
};

const validatePlugin = async ({ platform, dir, manifestPath, commandKey, mcpPath }) => {
  const manifestFile = path.join(root, dir, manifestPath);
  const manifest = await readJson(manifestFile);
  requireFields(manifest, ["name", "version", "description", "author", "license", "keywords"], `${platform} plugin`);
  if (!manifest.skills) failures.push(`${platform} plugin missing skills`);
  if (manifest.skills) await assertPath(path.join(root, dir), manifest.skills, `${platform} skills`);
  if (manifest[commandKey]) {
    for (const command of manifest[commandKey]) await assertPath(path.join(root, dir), command, `${platform} command`);
  }
  if (manifest.mcpServers) await assertPath(path.join(root, dir), manifest.mcpServers, `${platform} MCP config`);
  await validateMcpConfig(path.join(root, dir, mcpPath));
};

const validateSkills = async (dir) => {
  const skillsRoot = path.join(root, dir);
  for (const skillName of await readdir(skillsRoot)) {
    const skillFile = path.join(skillsRoot, skillName, "SKILL.md");
    await requireFile(skillFile);
    const text = await readFile(skillFile, "utf8");
    if (!text.startsWith("---\n")) failures.push(`${path.relative(root, skillFile)} missing YAML frontmatter`);
    if (!/^name:\s*[-a-z0-9]+/m.test(text)) failures.push(`${path.relative(root, skillFile)} missing skill name`);
    if (!/^description:\s*.+/m.test(text)) failures.push(`${path.relative(root, skillFile)} missing skill description`);
  }
};

await validateMarketplace("Cursor", path.join(root, ".cursor-plugin", "marketplace.json"), "mailgun-cursor");
await validateMarketplace("Claude", path.join(root, ".claude-plugin", "marketplace.json"), "mailgun-claude");

await validatePlugin({
  platform: "Cursor",
  dir: "plugins/mailgun-cursor",
  manifestPath: ".cursor-plugin/plugin.json",
  commandKey: "commands",
  mcpPath: "mcp.json"
});
await validatePlugin({
  platform: "Claude",
  dir: "plugins/mailgun-claude",
  manifestPath: ".claude-plugin/plugin.json",
  commandKey: "commands",
  mcpPath: ".mcp.json"
});

const gemini = await readJson(path.join(root, "plugins/mailgun-gemini/gemini-extension.json"));
requireFields(gemini, ["name", "version", "description", "author", "license", "mcpServers", "settings"], "Gemini extension");
if (gemini.mcpServers?.mailgun?.args?.includes(`@mailgun/mcp-server@${MCP_VERSION}`) !== true) {
  failures.push(`Gemini extension must pin @mailgun/mcp-server@${MCP_VERSION}`);
}

for (const dir of [
  "shared/skills",
  "plugins/mailgun-cursor/skills",
  "plugins/mailgun-claude/skills",
  "plugins/mailgun-gemini/skills"
]) {
  await validateSkills(dir);
}

for (const file of [
  "README.md",
  "docs/architecture.md",
  "docs/platform-support.md",
  "docs/release-process.md",
  "shared/docs/mailgun-capabilities.md",
  ".github/workflows/validate.yml"
]) {
  await requireFile(path.join(root, file));
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Mailgun plugin repository validation passed.");
