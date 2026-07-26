# Release Process

This repo versions plugin packaging separately from `@mailgun/mcp-server`, while pinning the compatible MCP package version in platform startup configs.

## Version Bump Checklist

1. Verify the target `@mailgun/mcp-server` version is published:

```bash
npm view @mailgun/mcp-server version dist-tags time --json
npm view @mailgun/mcp-server@<version> version --json
```

2. Review the target `@mailgun/mcp-server` release notes.
3. Update every MCP startup config:
   - `plugins/mailgun-cursor/mcp.json`
   - `plugins/mailgun-claude/.mcp.json`
   - `plugins/mailgun-gemini/gemini-extension.json`
4. Update the MCP version in:
   - `package.json`
   - `scripts/validate.mjs`
   - `README.md`
   - `shared/docs/mailgun-capabilities.md`
   - `shared/examples/mcp-config.json`
5. Run `npm run sync` so generated platform Skills pick up any shared guidance changes.
6. Update plugin manifest versions when plugin content changes.
7. Run:

```bash
npm run check:mcp-version
npm run validate
npm run check:sync
npm run build:gemini
```

8. Update changelogs.
9. Tag the repository release.
10. Refresh platform marketplace submissions or listings.
11. Confirm the `Publish Gemini Extension Branch` workflow has updated the `gemini-extension` branch before announcing Gemini install instructions.

## MCP Version Freshness

The `Check MCP Version` GitHub Actions workflow runs daily and can be triggered manually. It compares the pinned MCP version in `scripts/validate.mjs` with npm's `latest` dist-tag for `@mailgun/mcp-server`.

If the workflow fails, update the pinned version with the checklist above. The normal `Validate` workflow checks repo consistency, while `Check MCP Version` checks whether this repo is behind npm.

## Publication Notes

Cursor and Claude marketplace publication usually happens outside this repository. Keep manifests complete and validated so a publisher can submit the repo without local surgery.

Gemini CLI installs from a repository root containing `gemini-extension.json`. This repo keeps Gemini source under `plugins/mailgun-gemini`, builds `dist/gemini/mailgun-gemini`, and publishes that directory to the `gemini-extension` branch. Users install with:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins --ref gemini-extension
```

## Compatibility Policy

Patch releases should keep the same MCP version unless only guidance content is changing. Minor releases may bump `@mailgun/mcp-server` when new tools, tags, or behaviors are required by plugin skills or commands.
