#!/usr/bin/env bun

import { findRepoRoot } from "./helpers/run_root.sh.ts";

const repoRoot = findRepoRoot(import.meta.dir);
const packageJsonPath = `${repoRoot}/package.json`;
const versionArg = Bun.argv[2];

if (!versionArg || versionArg === "--help" || versionArg === "-h") {
  console.log("Usage: bun scripts/version.sh.ts <semver>");
  console.log("Example: bun scripts/version.sh.ts 0.1.1");
  process.exit(versionArg ? 0 : 1);
}

if (!/^\d+\.\d+\.\d+$/.test(versionArg)) {
  throw new Error(`Invalid version '${versionArg}'. Expected semver like 0.1.1`);
}

const packageJson = await Bun.file(packageJsonPath).json();
const previousVersion = String(packageJson.version ?? "");
packageJson.version = versionArg;

await Bun.write(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

console.log(`Updated version to ${versionArg}`);
console.log(`- package.json: ${previousVersion} -> ${versionArg}`);
