# Wired Backend APIs

Last updated: 2026-05-13

Backend base URL:

```env
VITE_API_URL=https://linkdeck00-production.up.railway.app
```

## Status Legend

- `[x]` Wired in frontend
- `[-]` Partially wired
- `[ ]` Not wired

## Core API Client Behavior

- `[x]` Base URL uses `VITE_API_URL`
- `[x]` Requests send credentials/cookies
- `[x]` `401` + `TOKEN_EXPIRED` triggers `POST /api/v1/auth/refresh` and retries the original request
- `[x]` Unauthorized session falls back to login through auth bootstrap and route protection
- `[x]` Auth bootstrap falls back to `POST /api/v1/auth/refresh` when `GET /api/v1/profiles/me` is unavailable

## Auth Endpoints

- `[x]` `GET /api/v1/auth/google/start`
- `[ ]` `GET /api/v1/auth/google/callback`
- `[x]` `GET /api/v1/auth/linkedin/start`
- `[ ]` `GET /api/v1/auth/linkedin/callback`
- `[x]` `POST /api/v1/auth/signup`
- `[x]` `POST /api/v1/auth/signin`
- `[x]` `POST /api/v1/auth/logout`
- `[x]` `POST /api/v1/auth/refresh`
- `[x]` `POST /api/v1/auth/forgot-password`
- `[x]` `POST /api/v1/auth/reset-password`

## Profile Endpoints

- `[x]` `GET /api/v1/profiles/me`
- `[x]` `GET /api/v1/profiles`
- `[x]` `POST /api/v1/profiles/connect`
- `[x]` `DELETE /api/v1/profiles/:id`

## Accounts Endpoints

- `[x]` `GET /api/v1/accounts`
- `[x]` `GET /api/v1/accounts/active`
- `[x]` `GET /api/v1/accounts/badges`
- `[x]` `POST /api/v1/accounts/switch`

## Posts Endpoints

- `[ ]` `POST /api/v1/posts`
- `[ ]` `GET /api/v1/posts`
- `[ ]` `GET /api/v1/posts/:id`
- `[ ]` `PATCH /api/v1/posts/:id`
- `[ ]` `DELETE /api/v1/posts/:id`
- `[ ]` `POST /api/v1/posts/:id/publish-now`

## Media Endpoints

- `[ ]` `POST /api/v1/media/upload`

## Analytics Endpoints

- `[ ]` `GET /api/v1/analytics/posts/:postId`
- `[ ]` `GET /api/v1/analytics/summary`

## Analytics Widgets Endpoints

- `[ ]` `GET /api/v1/analytics/widgets`
- `[ ]` `POST /api/v1/analytics/widgets`
- `[ ]` `PATCH /api/v1/analytics/widgets/reorder`
- `[ ]` `GET /api/v1/analytics/widgets/:id/data`
- `[ ]` `PATCH /api/v1/analytics/widgets/:id`
- `[ ]` `DELETE /api/v1/analytics/widgets/:id`

## Columns Endpoints

- `[ ]` `GET /api/v1/columns`
- `[ ]` `POST /api/v1/columns`
- `[ ]` `PATCH /api/v1/columns/reorder`
- `[ ]` `PATCH /api/v1/columns/:id`
- `[ ]` `DELETE /api/v1/columns/:id`

## Teams Endpoints

- `[ ]` `POST /api/v1/teams`
- `[ ]` `GET /api/v1/teams/:id/members`
- `[ ]` `POST /api/v1/teams/:id/invite`
- `[ ]` `PATCH /api/v1/teams/:id/members/:userId`
- `[ ]` `GET /api/v1/teams/:id/activity`
- `[ ]` `GET /api/v1/teams/:id/dashboard`
- `[ ]` `PATCH /api/v1/teams/:id/dashboard`
- `[ ]` `GET /api/v1/activity`

## Delegation Endpoints

- `[ ]` `GET /api/v1/delegation/permissions`
- `[ ]` `POST /api/v1/delegation/invite`
- `[ ]` `GET /api/v1/delegation`
- `[ ]` `PATCH /api/v1/delegation/:id`
- `[ ]` `DELETE /api/v1/delegation/:id`
- `[ ]` `GET /api/v1/delegation/roles`
- `[ ]` `POST /api/v1/delegation/roles`
- `[ ]` `PATCH /api/v1/delegation/roles/:id`
- `[ ]` `DELETE /api/v1/delegation/roles/:id`
- `[ ]` `x-on-behalf-of` delegated action header support

## Messages Endpoints

- `[ ]` `POST /api/v1/messages`
- `[ ]` `GET /api/v1/messages/conversation`
- `[ ]` `GET /api/v1/messages/recent`
- `[ ]` `POST /api/v1/messages/mark-read`

## Notifications Endpoints

- `[ ]` `GET /api/v1/notifications`
- `[ ]` `PATCH /api/v1/notifications/mark-all-read`
- `[ ]` `PATCH /api/v1/notifications/:id/read`
- `[ ]` `DELETE /api/v1/notifications/:id`

## Onboarding Endpoints

- `[ ]` `GET /api/v1/onboarding`
- `[ ]` `PATCH /api/v1/onboarding`

## Saved Searches Endpoints

- `[ ]` `GET /api/v1/searches`
- `[ ]` `POST /api/v1/searches`
- `[ ]` `PATCH /api/v1/searches/:id`
- `[ ]` `DELETE /api/v1/searches/:id`

## Prospect Lists Endpoints

- `[ ]` `GET /api/v1/prospects`
- `[ ]` `POST /api/v1/prospects`
- `[ ]` `PATCH /api/v1/prospects/:id`
- `[ ]` `DELETE /api/v1/prospects/:id`
- `[ ]` `POST /api/v1/prospects/:id/members`
- `[ ]` `DELETE /api/v1/prospects/:id/members/:prospectId`

## AI Endpoints

- `[ ]` `POST /api/v1/ai/suggest-replies`
- `[ ]` `GET /api/v1/ai/profile-summary/:id`
- `[ ]` `POST /api/v1/ai/suggest-comments`

## Contact Notes Endpoints

- `[ ]` `GET /api/v1/contacts/:contactId/notes`
- `[ ]` `POST /api/v1/contacts/:contactId/notes`
- `[ ]` `PATCH /api/v1/contacts/:contactId/notes/:noteId`
- `[ ]` `DELETE /api/v1/contacts/:contactId/notes/:noteId`
- `[ ]` `GET /api/v1/contacts/:contactId/notes/:noteId/history`

## LinkedIn Engagement Endpoints

- `[ ]` `POST /api/v1/engagement/like`
- `[ ]` `POST /api/v1/engagement/unlike`
- `[ ]` `POST /api/v1/engagement/comment`
- `[ ]` `DELETE /api/v1/engagement/comment`

## Real-Time Endpoints

- `[ ]` WebSocket `wss://linkdeck00-production.up.railway.app`
- `[ ]` `GET /api/v1/sse`

## Summary

Currently wired backend APIs are concentrated in:

- Auth start/sign-in/sign-up/logout/refresh/forgot-password/reset-password
- Profile bootstrap/list/connect/delete
- Accounts list/active/badges/switch
- Shared client-side auth retry logic

Everything else is still pending frontend integration.
