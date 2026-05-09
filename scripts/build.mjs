import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd());
const outDir = join(root, "dist");

const excluded = new Set([
  "dist",
  "node_modules",
  ".git",
  ".cursor",
  "terminals",
  "agent-transcripts",
  "mcps",
  "scripts",
  "package.json",
  "package-lock.json"
]);

function copyEntry(name) {
  if (excluded.has(name)) return;

  const source = join(root, name);
  const target = join(outDir, name);
  const stats = statSync(source);

  if (stats.isDirectory()) {
    cpSync(source, target, { recursive: true });
    return;
  }

  cpSync(source, target);
}

if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
}

mkdirSync(outDir, { recursive: true });

for (const entry of readdirSync(root)) {
  copyEntry(entry);
}

console.log("Build completado.");
console.log("Salida:", outDir);
