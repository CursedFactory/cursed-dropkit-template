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

## Agent prompt: install this dropkit in OpenCode

Copy/paste this prompt to an agent:

```md
Install this dropkit plugin into my OpenCode setup.

First ask me where to install it:
1) System level (`~/.config/opencode`)
2) Project level (`.opencode` in current repo)
3) Custom config dir path

After I choose, do all setup steps end-to-end:
- Add dependency in `<CONFIG_DIR>/package.json`:
  - `"@cursed-factory/dropkit-template": "<VERSION_OR_SOURCE>"`
- Add plugin wrapper file at `<CONFIG_DIR>/plugins/my_dropkit.ts`:
  - import `createTemplateDropkitPlugin` from `@cursed-factory/dropkit-template`
  - export plugin created with service/namespace values I confirm
- Run `bun install --cwd <CONFIG_DIR>`
- Verify by importing the wrapper with `bun --cwd <CONFIG_DIR> -e "import('./plugins/my_dropkit.ts')..."`
- Confirm which agents/skills/commands are now available and how to invoke them.

If I choose custom path, use that path exactly.
If package source is not published npm, ask whether to use `file:`, `git+https`, or `github:` source string.
```

Relevant OpenCode docs:

- https://opencode.ai/docs/
- https://opencode.ai/docs/config/
- https://opencode.ai/docs/plugins/
- https://opencode.ai/docs/agents/

Reference snippets (embedded so agents do not need web fetch):

```jsonc
// Config locations and precedence (later overrides earlier):
// 1) Inline env config
// 2) .opencode directories
// 3) Project opencode.json
// 4) OPENCODE_CONFIG custom file
// 5) ~/.config/opencode/opencode.json
// 6) Remote org config
//
// Global config path:
// ~/.config/opencode/opencode.json
```

```text
Plugin directories auto-loaded at startup:
- ~/.config/opencode/plugins/   (global)
- .opencode/plugins/            (project)
```

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@my-org/custom-plugin"]
}
```

```markdown
---
description: Reviews code for quality and best practices
mode: subagent
model: anthropic/claude-sonnet-4-20250514
---
```

```text
Agent markdown files:
- ~/.config/opencode/agents/  (global)
- .opencode/agents/           (project)
```

## Publish checklist

1. Update package name and metadata in `package.json`
2. Set version: `bun run version:set -- 0.1.1`
3. Run `bun run ci`
4. Dry run: `bun run publish:npm:dry-run`
5. Publish: `npm publish`
