# MCP setup for Eco Retreat development

## Already enabled (workspace)

- **cursor-ide-browser** — visual QA, booking flow tests
- **cursor-app-control** — open files, workspace navigation

## Recommended: GitHub MCP

1. Create a GitHub Personal Access Token (repo scope).
2. Cursor Settings → MCP → Add server:

```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
  }
}
```

3. Use for PRs, CI status, and issues from chat with `eco-github-release`.

## Optional (Phase 2+)

- **Supabase/Postgres MCP** — inspect bookings and capacity
- **Figma MCP** — design tokens if mockups exist

Do not store tokens in this repository.
