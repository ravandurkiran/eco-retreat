# Cursor hooks templates — copy to `.cursor/hooks.json` at Phase 0

Adjust commands after `package.json` exists.

## hooks.json (starter)

```json
{
  "version": 1,
  "hooks": {
    "sessionStart": [
      {
        "type": "command",
        "command": "echo '[eco-retreat] Read .cursor/skills/QUALITY_GATES.md for current phase before merging.'"
      }
    ],
    "afterFileEdit": [
      {
        "type": "command",
        "command": "npm run lint --if-present",
        "matcher": ".*\\.(ts|tsx)$"
      }
    ],
    "beforeShellExecution": [
      {
        "type": "command",
        "command": ".cursor/hooks/block-dangerous-git.sh",
        "matcher": "git"
      }
    ]
  }
}
```

## block-dangerous-git.sh

```bash
#!/usr/bin/env bash
# .cursor/hooks/block-dangerous-git.sh — exit 1 to block command
INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.command // empty')
if echo "$CMD" | grep -qE 'git push.*--force.*(main|master)'; then
  echo "Blocked: force push to main/master" >&2
  exit 1
fi
if echo "$CMD" | grep -qE 'git commit.*\\.env'; then
  echo "Blocked: committing .env files" >&2
  exit 1
fi
exit 0
```

Make executable: `chmod +x .cursor/hooks/block-dangerous-git.sh`

## Optional: prompt hook after phase work

Use a `subagentStop` or `sessionEnd` prompt hook to remind:

> List QUALITY_GATES items for the completed phase and pass/fail status. Suggest eco-github-release if tests passed.

See Cursor docs for `type: prompt` hook format in your Cursor version.
