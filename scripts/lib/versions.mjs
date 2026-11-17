import { readFile } from "node:fs/promises";
import path from "node:path";

// Every file that carries the release version. `npm` files are rewritten with npm's JSON
// formatting; the rest have their "version" values replaced in place.
export const VERSIONED_FILES = [
  { file: "package.json", format: "npm" },
  { file: "package-lock.json", format: "npm" },
  { file: "plugins/mailgun-claude/.claude-plugin/plugin.json" },
  { file: "plugins/mailgun-cursor/.cursor-plugin/plugin.json" },
  { file: "plugins/mailgun-gemini/gemini-extension.json" },
  { file: ".claude-plugin/marketplace.json" },
  { file: ".cursor-plugin/marketplace.json" }
];

const versionFields = (file, json) => {
  if (file === "package-lock.json") {
    return [
      ["version", json.version],
      ['packages[""].version', json.packages?.[""]?.version]
    ];
  }
  if (file.endsWith("marketplace.json")) {
    const fields = [];
    if (json.metadata?.version !== undefined) fields.push(["metadata.version", json.metadata.version]);
    if (json.version !== undefined) fields.push(["version", json.version]);
    for (const [index, plugin] of (json.plugins ?? []).entries()) {
      if (plugin.version !== undefined) fields.push([`plugins[${index}] (${plugin.name}).version`, plugin.version]);
    }
    return fields;
  }
  return [["version", json.version]];
};

export const collectVersions = async (root) => {
  const versions = [];
  for (const { file } of VERSIONED_FILES) {
    const json = JSON.parse(await readFile(path.join(root, file), "utf8"));
    for (const [field, version] of versionFields(file, json)) {
      versions.push({ label: `${file} ${field}`, version });
    }
  }
  return versions;
};
