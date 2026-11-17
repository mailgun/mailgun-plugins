# Changelog

Each release is tagged `v<version>` and published as a GitHub Release with installable Claude and Gemini archives. See [docs/release-process.md](docs/release-process.md).

## Unreleased

- Build Claude and Gemini release archives with `npm run build`, and attach them to a GitHub Release when a `v*` tag is pushed.
- Add `npm run bump <version>` and fail validation when package, manifest, and marketplace versions disagree.

## 0.1.2

- Pin plugin MCP startup configs to `@mailgun/mcp-server@2.3.1`.
