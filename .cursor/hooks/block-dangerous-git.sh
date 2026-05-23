#!/usr/bin/env bash
# Block dangerous git operations (force push to main, committing .env)
INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.command // empty' 2>/dev/null || echo "$INPUT")
if echo "$CMD" | grep -qE 'git push.*--force.*(main|master)'; then
  echo "Blocked: force push to main/master" >&2
  exit 1
fi
if echo "$CMD" | grep -qE 'git commit.*\.env'; then
  echo "Blocked: committing .env files" >&2
  exit 1
fi
exit 0
