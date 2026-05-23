# GitHub release automation — reference

## One-time repo setup

```bash
# Labels
gh label create "release:major" --color d73a4a --description "Semver major bump"
gh label create "release:minor" --color 0e8a16 --description "Semver minor bump"
gh label create "release:patch" --color 1d76db --description "Semver patch bump"
gh label create "release:none"  --color cccccc --description "No version bump"

# Verify
gh label list | grep release:
```

## GitHub Action: label PR from commits (optional)

`.github/workflows/pr-release-label.yml` — runs on `pull_request` to `develop` or `main`:

```yaml
name: PR release label
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [develop, main]

permissions:
  pull-requests: write
  contents: read

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/labeler@v5
        with:
          sync-labels: true
      # Or use a small script:
      - name: Apply semver label from commits
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          BASE="${{ github.event.pull_request.base.sha }}"
          HEAD="${{ github.event.pull_request.head.sha }}"
          LOG=$(git log --format=%B "${BASE}..${HEAD}")
          LABEL="release:none"
          if echo "$LOG" | grep -qE 'BREAKING CHANGE|^[a-z]+(\([^)]+\))?!:'; then
            LABEL="release:major"
          elif echo "$LOG" | grep -qE '^feat(\([^)]+\))?:'; then
            LABEL="release:minor"
          elif echo "$LOG" | grep -qE '^(fix|perf)(\([^)]+\))?:'; then
            LABEL="release:patch"
          fi
          gh pr edit "${{ github.event.pull_request.number }}" \
            --add-label "$LABEL" \
            --remove-label "release:major" \
            --remove-label "release:minor" \
            --remove-label "release:patch" \
            --remove-label "release:none" 2>/dev/null || true
          gh pr edit "${{ github.event.pull_request.number }}" --add-label "$LABEL"
```

## GitHub Action: release on merge to main (optional)

`.github/workflows/release.yml`:

```yaml
name: Release
on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: read

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Determine bump from merged PR labels
        id: bump
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Get PR for this merge commit
          PR=$(gh pr list --state merged --base main --limit 20 --json number,mergeCommit,labels)
          # Simplified: use release:major|minor|patch label on latest merged PR
          BUMP=patch
          echo "bump=$BUMP" >> "$GITHUB_OUTPUT"
      - uses: google-github-actions/release-please-action@v4
        # OR: softprops/action-gh-release with computed tag
```

For a greenfield repo, prefer **release-please** or **semantic-release** once `package.json` version exists.

## Manual release with gh (agent-assisted)

```bash
# List merged PRs and labels
gh pr list --state merged --base main --limit 5

# Create annotated tag + release
git tag -a v1.2.0 -m "v1.2.0"
git push origin v1.2.0
gh release create v1.2.0 --generate-notes
```

## Semver decision matrix

| PR labels present | Next version (from v1.2.3) |
|-------------------|----------------------------|
| `release:major` | v2.0.0 |
| `release:minor` (no major) | v1.3.0 |
| `release:patch` only | v1.2.4 |
| `release:none` | No tag (or chore tag only if user requests) |

If multiple labels exist, use **highest**: major > minor > patch > none.

## Commit message → label (agent script logic)

```
if BREAKING CHANGE or type!: → release:major
else if type == feat → release:minor
else if type in (fix, perf) → release:patch
else → release:none
```

Types parsed from first line: `^(\w+)(\(.*\))?(!)?:`.
