import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const source = path.join(root, "plugins", "mailgun-gemini");
const target = path.join(root, "dist", "gemini", "mailgun-gemini");

await rm(target, { recursive: true, force: true });
await mkdir(path.dirname(target), { recursive: true });
await cp(source, target, { recursive: true });

await stat(path.join(target, "gemini-extension.json"));
await stat(path.join(target, "skills"));
await stat(path.join(target, "commands"));

console.log(`Built Gemini extension at ${path.relative(root, target)}.`);
