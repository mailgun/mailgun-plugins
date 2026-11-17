# Platform Support

This repo supports Cursor, Claude Code / Claude compatible plugins, and Gemini CLI extensions.

| Feature | Cursor | Claude Code / Claude compatible | Gemini CLI |
| --- | --- | --- | --- |
| Root marketplace | `.cursor-plugin/marketplace.json` | `.claude-plugin/marketplace.json` | Not used by Gemini CLI |
| Plugin manifest | `plugins/mailgun-cursor/.cursor-plugin/plugin.json` | `plugins/mailgun-claude/.claude-plugin/plugin.json` | `plugins/mailgun-gemini/gemini-extension.json` |
| MCP config | `mcp.json` | `.mcp.json` | `mcpServers` in `gemini-extension.json` |
| Skills | Native `skills/` directory | Native `skills/` directory | `skills/` directory included with extension |
| Rules | Native `rules/*.mdc` | Included as guidance files where supported | No direct equivalent |
| Commands | Markdown commands listed in plugin manifest | Markdown commands listed in plugin manifest | TOML commands under `commands/mailgun/` |
| Shared content | Generated from `shared/` | Generated from `shared/` | Generated from `shared/` |
| Release archive | None; install from the marketplace | `mailgun-claude-<version>.zip`, upload to Claude desktop | `darwin.`/`linux.`/`win32.mailgun-gemini.zip`, installed by Gemini CLI from the GitHub Release |
| Full support | Yes | Yes, with platform differences | Yes, with platform differences |

Every tagged release attaches the Claude and Gemini archives to its [GitHub Release](https://github.com/mailgun/mailgun-plugins/releases), with a `SHA256SUMS` file. Each archive has its manifest at the root. See [release-process.md](release-process.md#release-assets) for what each contains.

## Cursor

Cursor has the richest package in this repo. It includes marketplace metadata, a plugin manifest, MCP wiring, skills, rules, and commands.

## Claude Code

The Claude package includes a root marketplace, plugin manifest, `.mcp.json`, skills, and commands. The release archive leaves out `rules/`, which Claude doesn't load.

Claude Code CLI:

```bash
claude plugin marketplace add mailgun/mailgun-plugins
claude plugin install mailgun-claude@mailgun
```

Claude desktop: download `mailgun-claude-<version>.zip` from the GitHub Release and choose it on the **Upload a plugin** screen. The desktop app doesn't read shell profile exports, so `MAILGUN_API_KEY` has to be set for GUI apps (on macOS, `launchctl setenv MAILGUN_API_KEY "key-..."`, then restart the app).

## Gemini CLI

Gemini uses a single extension manifest with MCP server settings. The source package lives under `plugins/mailgun-gemini`, but Gemini requires `gemini-extension.json` at the extension root. `npm run build:gemini` stages `dist/gemini` and its release archives, and the `Publish Gemini Extension Branch` workflow publishes `dist/gemini` to the `gemini-extension` branch.

Install the latest GitHub Release, which checks for updates against the latest release:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins
```

Pin a release with `--ref v<version>`. Gemini finds the archive through the `darwin.`, `linux.`, and `win32.` asset names; without them it would fall back to the source tarball, which has no manifest at its root.

Or track the `gemini-extension` branch, which moves on every Gemini-related change to `main` and on every release. Gemini first looks for a release tagged `gemini-extension`, then asks to fall back to `git clone`; answer yes, or pass `--consent`:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins --ref gemini-extension
```

## Known Gaps

- Marketplace publication steps are platform controlled and intentionally documented rather than automated here.
- The Gemini CLI marketplace and distribution flow can differ by organization; this repo publishes a dedicated extension branch for GitHub installs.
- No platform package includes Mailgun API business logic. Any tool addition must happen in `mailgun-mcp-server` first.
