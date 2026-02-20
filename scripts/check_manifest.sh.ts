#!/usr/bin/env bun

import { findRepoRoot } from "./helpers/run_root.sh.ts";

const repoRoot = findRepoRoot(import.meta.dir);
const packageJsonPath = `${repoRoot}/package.json`;
const packageJson = await Bun.file(packageJsonPath).json();

if (packageJson.exports?.["."] !== "./index.ts") {
  throw new Error(`Unexpected package.json exports['.']: ${String(packageJson.exports?.["."])}`);
}

if (!Array.isArray(packageJson.files) || !packageJson.files.includes("plugin")) {
  throw new Error("package.json files must include 'plugin'");
}

console.log("Manifest check passed");
