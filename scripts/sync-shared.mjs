import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);

const copyDir = async (from, to) => {
  await rm(to, { recursive: true, force: true });
  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to, { recursive: true });
};

const copyCommandDir = async (platform) => {
  const from = path.join(root, "shared", "commands", platform);
  try {
    if (!(await stat(from)).isDirectory()) return;
  } catch {
    return;
  }
  const target =
    platform === "gemini"
      ? path.join(root, "plugins", "mailgun-gemini", "commands")
      : path.join(root, "plugins", `mailgun-${platform}`, "commands");
  await copyDir(from, target);
};

await Promise.all([
  copyDir(path.join(root, "shared", "skills"), path.join(root, "plugins", "mailgun-cursor", "skills")),
  copyDir(path.join(root, "shared", "skills"), path.join(root, "plugins", "mailgun-claude", "skills")),
  copyDir(path.join(root, "shared", "skills"), path.join(root, "plugins", "mailgun-gemini", "skills")),
  copyDir(path.join(root, "shared", "rules"), path.join(root, "plugins", "mailgun-cursor", "rules")),
  copyDir(path.join(root, "shared", "rules"), path.join(root, "plugins", "mailgun-claude", "rules")),
  copyCommandDir("cursor"),
  copyCommandDir("claude"),
  copyCommandDir("gemini")
]);

const synced = [];
for (const platform of ["cursor", "claude", "gemini"]) {
  const dir = path.join(root, "plugins", `mailgun-${platform}`, "skills");
  synced.push(`${platform}:${(await readdir(dir)).length} skills`);
}

console.log(`Synced shared content (${synced.join(", ")}).`);
