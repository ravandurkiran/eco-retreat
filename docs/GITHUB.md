# GitHub setup (ravandurkiran)

The repo remote uses **SSH** so pushes use your `ravandurkiran` SSH key:

```text
git@github.com:ravandurkiran/eco-retreat.git
```

## GitHub CLI (optional)

HTTPS/git credential issues happen when macOS Keychain still has another account (e.g. `vaghblogger`). To use `gh` and HTTPS as **ravandurkiran**:

```bash
gh auth login
# GitHub.com → SSH → Login with browser → choose ravandurkiran

gh auth setup-git
```

## Push / pull

```bash
git push origin main
git pull origin main
```

Repo: https://github.com/ravandurkiran/eco-retreat
