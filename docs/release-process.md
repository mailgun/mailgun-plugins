# Release Process

This repo versions plugin packaging separately from `@mailgun/mcp-server`, while pinning the compatible MCP package version in platform startup configs.

## Version Bump Checklist

1. Review the target `@mailgun/mcp-server` release notes.
2. Update every MCP startup config:
   - `plugins/mailgun-cursor/mcp.json`
   - `plugins/mailgun-claude/.mcp.json`
   - `plugins/mailgun-gemini/gemini-extension.json`
3. Update the MCP version in:
   - `package.json`
   - `scripts/validate.mjs`
   - `README.md`
   - `shared/docs/mailgun-capabilities.md`
   - `shared/examples/mcp-config.json`
4. Update plugin manifest versions when plugin content changes.
5. Run:

```bash
npm run sync
npm run validate
npm run check:sync
npm run build:gemini
```

6. Update changelogs.
7. Tag the repository release.
8. Refresh platform marketplace submissions or listings.
9. Confirm the `Publish Gemini Extension Branch` workflow has updated the `gemini-extension` branch before announcing Gemini install instructions.

## Publication Notes

Cursor and Claude marketplace publication usually happens outside this repository. Keep manifests complete and validated so a publisher can submit the repo without local surgery.

Gemini CLI installs from a repository root containing `gemini-extension.json`. This repo keeps Gemini source under `plugins/mailgun-gemini`, builds `dist/gemini/mailgun-gemini`, and publishes that directory to the `gemini-extension` branch. Users install with:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins --ref gemini-extension
```

## Compatibility Policy

Patch releases should keep the same MCP version unless content-only guidance changes are being shipped. Minor releases may bump `@mailgun/mcp-server` when new tools, tags, or behaviors are required by plugin skills or commands.
