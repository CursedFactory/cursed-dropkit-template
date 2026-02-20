import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildScopedDirectories, createDropkitPlugin } from "cursed-dropkit";

export type CreateTemplateDropkitPluginOptions = {
  service?: string;
  namespace?: string;
  includeGlobal?: boolean;
  includeProject?: boolean;
  summaryToolName?: string | false;
};

/// Create a ready-to-customize dropkit plugin using this package defaults.
export function createTemplateDropkitPlugin(options: CreateTemplateDropkitPluginOptions = {}) {
  const packageRoot = dirname(fileURLToPath(import.meta.url));
  const pluginRootDir = join(packageRoot, "files");

  return createDropkitPlugin({
    service: options.service ?? "dropkit-template",
    summaryToolName: options.summaryToolName,
    directories: (root) =>
      buildScopedDirectories({
        pluginRootDir,
        root,
        namespace: options.namespace ?? "dropkit-template",
        includeGlobal: options.includeGlobal,
        includeProject: options.includeProject,
      }),
  });
}
