import { cp, mkdir, mkdtemp, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import os from "node:os";
import path from "node:path";

const execFileAsync = promisify(execFile);
const root = path.resolve(new URL("..", import.meta.url).pathname);
const temp = await mkdtemp(path.join(os.tmpdir(), "mailgun-plugins-sync-"));

try {
  const copyRoot = path.join(temp, path.basename(root));
  await mkdir(copyRoot, { recursive: true });
  await cp(root, copyRoot, {
    recursive: true,
    filter: (source) => !source.includes(`${path.sep}node_modules`) && !source.includes(`${path.sep}dist`)
  });
  await execFileAsync("node", ["scripts/sync-shared.mjs"], { cwd: copyRoot });
  const { stdout } = await execFileAsync("git", ["diff", "--no-index", "--", root, copyRoot], {
    cwd: root,
    maxBuffer: 1024 * 1024 * 10
  }).catch((error) => error);
  if (stdout) {
    console.error("Generated platform content is out of sync. Run `npm run sync`.");
    console.error(stdout);
    process.exit(1);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
