# Release Process

This repo versions plugin packaging separately from `@mailgun/mcp-server`, while pinning the compatible MCP package version in platform startup configs. One version covers `package.json` and every plugin and marketplace manifest, and each release is a `v<version>` tag.

## Cut a Release

1. Bump the version on a branch:

```bash
npm run bump 0.1.3
```

This sets the version in `package.json`, `package-lock.json`, the Claude, Cursor, and Gemini manifests, and every `version` field in `.claude-plugin/marketplace.json` and `.cursor-plugin/marketplace.json`. `npm run validate` fails if any of them disagree.

2. In `CHANGELOG.md`, rename `## Unreleased` to `## 0.1.3` and add anything missing. A release fails if `CHANGELOG.md` has no heading for its version.
3. Run `npm test`. It runs `check:sync`, `validate`, and `build`.
4. Open a pull request, get it reviewed, and merge it to `main`.
5. Tag the merge commit and push the tag:

```bash
git switch main
git pull
git tag v0.1.3
git push origin v0.1.3
```

Tag names must be `v` plus the package version. A tag with a hyphen, such as `v0.2.0-rc.1`, publishes a prerelease.

## What CI Does on a Tag

The `Release` workflow runs on every pushed `v*` tag:

1. `npm ci --ignore-scripts`, `npm run check:sync`, and `npm run validate` with `RELEASE_TAG` set, which fails when the tag isn't `v<package version>` or `CHANGELOG.md` has no entry for it.
2. Installs pinned copies of the Claude Code CLI and Gemini CLI from npm. Neither needs a sign-in to validate.
3. `npm run build`.
4. Unzips both archives and validates them: `npm run validate:claude` runs `claude plugin validate --strict` on the repo marketplace, `plugins/mailgun-claude`, and the unzipped Claude archive, and `gemini extensions validate` checks the unzipped Gemini archive.
5. `gh release create "$GITHUB_REF_NAME" dist/release/* --generate-notes --verify-tag`, adding `--prerelease` for hyphenated tags.
6. Calls the `Publish Gemini Extension Branch` workflow, which force-pushes the Gemini package to the `gemini-extension` branch. Prereleases skip this step.

`validate:claude` tolerates exactly one warning: the validator says `mailgun-claude` reads like an Anthropic plugin name. Any other warning or error fails the release. Remove the allowance in `scripts/validate-claude.mjs` if the plugin is renamed.

If a release fails, fix the problem on `main`, delete the tag with `git push origin :refs/tags/v0.1.3`, and tag again. Delete any partial GitHub Release first with `gh release delete v0.1.3`.

## Release Assets

`npm run build` stages each package under `dist/<platform>/` and writes `dist/release/`:

| Asset | Contents | Used by |
| --- | --- | --- |
| `mailgun-claude-<version>.zip` | `plugins/mailgun-claude` without `rules/` | Claude desktop's Upload a plugin screen |
| `mailgun-gemini-<version>.zip` | `plugins/mailgun-gemini` | Manual download |
| `darwin.mailgun-gemini.zip`, `linux.mailgun-gemini.zip`, `win32.mailgun-gemini.zip` | Same bytes as `mailgun-gemini-<version>.zip` | `gemini extensions install https://github.com/mailgun/mailgun-plugins` |
| `SHA256SUMS` | SHA-256 of every archive | `shasum -a 256 -c SHA256SUMS` |

Cursor installs from its marketplace, so it has no archive.

Each archive has its manifest at the root, not inside a folder, and never includes `.DS_Store`. The build fails if an archive is missing its manifest, MCP config, `skills/`, a skill's `SKILL.md`, `commands/`, or any path the manifest references, or if the manifest version differs from `package.json`.

Gemini CLI picks a release asset whose name starts with the user's platform (`darwin.`, `linux.`, `win32.`), or the only asset when a release has one. Because a release here has several assets, the Gemini archive is also published under the three platform names. Without them, Gemini falls back to the source tarball, which has no `gemini-extension.json` at its root.

Archives are reproducible: entries are sorted and stamped with the commit time, so the same commit builds byte-identical zips locally and in CI.

Build one platform with `node scripts/build-packages.mjs <platform>`. `npm run build:gemini` is shorthand for `gemini`.

## MCP Version Bump Checklist

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
6. Run `npm run check:mcp-version` and `npm test`.
7. Cut a release as above.

## MCP Version Freshness

The `Check MCP Version` GitHub Actions workflow runs daily and can be triggered manually. It compares the pinned MCP version in `scripts/validate.mjs` with npm's `latest` dist-tag for `@mailgun/mcp-server`.

If the workflow fails, update the pinned version with the checklist above. The normal `Validate` workflow checks repo consistency, while `Check MCP Version` checks whether this repo is behind npm.

## Publication Notes

Cursor and Claude marketplace publication happens outside this repository. Keep manifests complete and validated so a publisher can submit the repo without local surgery.

Gemini users install either from GitHub Releases or from the `gemini-extension` branch. Release installs check the **Latest** GitHub Release for updates. Branch installs compare commits on `gemini-extension`, which the `Publish Gemini Extension Branch` workflow force-pushes on every Gemini-related push to `main` and on every release.

After a release, confirm the GitHub Release has all assets, then refresh platform marketplace listings.

## Compatibility Policy

Patch releases should keep the same MCP version unless only guidance content is changing. Minor releases may bump `@mailgun/mcp-server` when new tools, tags, or behaviors are required by plugin skills or commands.
