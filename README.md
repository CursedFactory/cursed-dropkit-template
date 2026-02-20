# cursed-dropkit-template

Template repository for shipping an npm-publishable dropkit package backed by `cursed-dropkit`.

## What this template includes

- A publish-ready package (`package.json`, version, exports, files)
- A plugin factory in `plugin.ts`
- Skeletons for all supported dropkit content types:
  - `files/agent/*.md`
  - `files/command/*.md`
  - `files/skills/*/SKILL.md`
- Bun script workflow for check/test/build/version/publish-dry-run

## File tree

```text
.
├── index.ts
├── plugin.ts
├── files/
│   ├── agent/
│   │   └── example-agent.md
│   ├── command/
│   │   └── example-command.md
│   └── skills/
│       └── example-skill/
│           └── SKILL.md
├── scripts/
│   ├── build.sh.ts
│   ├── check.sh.ts
│   ├── check_manifest.sh.ts
│   ├── ci.sh.ts
│   ├── npm_publish_dry_run.sh.ts
│   ├── smoke_import.sh.ts
│   ├── test.sh.ts
│   ├── version.sh.ts
│   └── helpers/
│       ├── run_command.sh.ts
│       └── run_root.sh.ts
├── package.json
└── README.md
```

## Install

```bash
npm install
```

## Scripts

- `bun run check`
- `bun run test`
- `bun run build`
- `bun run ci`
- `bun run version:set -- 0.1.1`
- `bun run publish:npm:dry-run`

## Use in OpenCode plugin config

Create a plugin file in your project, for example `.opencode/plugins/my-dropkit.ts`:

```ts
import { createTemplateDropkitPlugin } from "@cursed-factory/dropkit-template";

export const MyDropkit = createTemplateDropkitPlugin({
  service: "my-dropkit",
  namespace: "my-dropkit",
});
```

Then register that plugin in your `opencode.json` plugin list.

## Publish checklist

1. Update package name and metadata in `package.json`
2. Set version: `bun run version:set -- 0.1.1`
3. Run `bun run ci`
4. Dry run: `bun run publish:npm:dry-run`
5. Publish: `npm publish`
