import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const claude = process.env.CLAUDE_BIN ?? "claude";
const targets = process.argv.length > 2 ? process.argv.slice(2) : [".", "plugins/mailgun-claude"];

// The validator flags "mailgun-claude" as reading like an Anthropic plugin name. Renaming
// the plugin is pending a decision, so only that warning is tolerated. Remove this
// allowance once the plugin is renamed.
const isPendingRenameWarning = (warning) =>
  /^(name|plugins\[\d+\]\.name)$/.test(warning.path ?? "") && /reads as one of Anthropic's own/.test(warning.message);

const failures = [];
for (const target of targets) {
  const { stdout } = await execFileAsync(claude, ["plugin", "validate", "--strict", "--json", target], {
    maxBuffer: 1024 * 1024 * 10
  }).catch((error) => {
    if (!error.stdout) throw error;
    return error;
  });
  const report = JSON.parse(stdout);
  const issues = [report.manifest, ...(report.contents ?? [])].filter(Boolean);
  const errors = issues.flatMap((issue) => issue.errors ?? []);
  const warnings = issues.flatMap((issue) => issue.warnings ?? []).filter((warning) => !isPendingRenameWarning(warning));
  for (const problem of [...errors, ...warnings]) failures.push(`${target}: ${problem.path ?? ""} ${problem.message}`);
  console.log(`${target}: ${errors.length} errors, ${warnings.length} warnings (pending-rename warning ignored)`);
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Claude plugin validation passed.");
