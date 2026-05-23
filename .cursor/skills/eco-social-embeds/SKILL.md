---
name: eco-social-embeds
description: Embeds YouTube, Facebook, and Instagram content on the Eco Retreat site using server-side oEmbed, caching, and CSP-safe fallbacks. Use for social feeds, video sections, or follow-us blocks.
---

# Eco Social Embeds

## Principles

- **No secrets in client** for YouTube Data API — fetch server-side only.
- **Lazy load** embeds below fold; fixed aspect-ratio container (prevent CLS).
- **Fallback**: static “Follow us” cards with icons if oEmbed fails.

## WhatsApp (not embed)

Use links per [CONVENTIONS.md](../CONVENTIONS.md):

```
https://wa.me/918197799572?text=Hello%20The%20Eco%20Retreat%2C%20I%20would%20like%20to%20...
```

- Floating action button component `WhatsAppFab`.
- Pre-filled messages per page context (booking vs general).

## YouTube

- Option A: latest video via Data API v3 (server route `/api/social/youtube`, cache 1h).
- Option B: hardcode playlist/channel embed iframe with `loading="lazy"`.
- CSP: `frame-src https://www.youtube.com https://www.youtube-nocookie.com`.

## Instagram / Facebook

- Prefer official oEmbed endpoints or Meta embed URLs.
- Server Component fetches oEmbed HTML; sanitize allowed tags only.
- Cache responses in Redis/filesystem (TTL 6h).

## Component structure

```
components/social/
  SocialFeedSection.tsx    # Server Component wrapper
  YouTubeEmbed.tsx
  InstagramCard.tsx        # fallback card
  FollowUsLinks.tsx
```

## Workflow

1. List required social URLs from user (channel, page, profile).
2. Add origins to CSP draft in `eco-security-privacy`.
3. Implement with fallbacks; test offline API failure.
4. Run `eco-performance` for CLS on embed section.

## Handoff

- [ ] CSP updated for all embed origins.
- [ ] Fallback UI works without API keys.
- **Previous**: `eco-implementer`  
- **Next**: `eco-performance`, `eco-security-privacy`
