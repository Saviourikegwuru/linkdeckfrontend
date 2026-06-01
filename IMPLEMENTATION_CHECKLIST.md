# Linkdeck Frontend Integration Checklist

Last updated: 2026-05-13

## Status Legend

- `[x]` Implemented
- `[-]` Partially implemented
- `[ ]` Not implemented yet

## Foundation

- `[x]` Shared API client created
- `[x]` `VITE_API_URL` support added
- `[x]` Cookie-based requests enabled
- `[x]` JWT refresh retry flow for `TOKEN_EXPIRED` added
- `[x]` Auth session bootstrap from `GET /api/v1/profiles/me` added
- `[x]` Protected routes added for authenticated pages
- `[x]` Public-only routes added for login/signup/forgot-password

## Authentication

- `[x]` Email sign up wired to `POST /api/v1/auth/signup`
- `[x]` Email sign in wired to `POST /api/v1/auth/signin`
- `[x]` Logout action wired to `POST /api/v1/auth/logout`
- `[x]` Forgot password wired to `POST /api/v1/auth/forgot-password`
- `[x]` Reset password page wired to `POST /api/v1/auth/reset-password`
- `[x]` Google auth start wired to `GET /api/v1/auth/google/start`
- `[x]` LinkedIn auth start wired to `GET /api/v1/auth/linkedin/start`
- `[x]` Refresh session wired to `POST /api/v1/auth/refresh`
- `[x]` Invalid or missing token handling redirects to login through route protection/session bootstrap

## Profiles

- `[x]` Current user bootstrap wired to `GET /api/v1/profiles/me`
- `[x]` Connect LinkedIn page exists in UI
- `[x]` LinkedIn profile connection wired to `POST /api/v1/profiles/connect`
- `[x]` Profiles list wired to `GET /api/v1/profiles`
- `[x]` Disconnect profile wired to `DELETE /api/v1/profiles/:id`

## Accounts

- `[x]` Accounts list wired to `GET /api/v1/accounts`
- `[x]` Active account wired to `GET /api/v1/accounts/active`
- `[x]` Account badges wired to `GET /api/v1/accounts/badges`
- `[x]` Account switcher wired to `POST /api/v1/accounts/switch`
- `[ ]` `account_switched` socket event handling implemented

## Posts

- `[ ]` Create post wired to `POST /api/v1/posts`
- `[ ]` Posts list wired to `GET /api/v1/posts`
- `[ ]` Post detail wired to `GET /api/v1/posts/:id`
- `[ ]` Update post wired to `PATCH /api/v1/posts/:id`
- `[ ]` Delete post wired to `DELETE /api/v1/posts/:id`
- `[ ]` Publish now wired to `POST /api/v1/posts/:id/publish-now`
- `[ ]` Draft/scheduled/published/failed state handling implemented

## Media

- `[ ]` Media upload handshake wired to `POST /api/v1/media/upload`
- `[ ]` Upload-to-returned-URL flow implemented
- `[ ]` Media attachment flow connected to post composer

## Analytics

- `[ ]` Post analytics wired to `GET /api/v1/analytics/posts/:postId`
- `[ ]` Analytics summary wired to `GET /api/v1/analytics/summary`
- `[-]` Analytics UI exists with mock/demo state switching
- `[ ]` Analytics UI connected to live backend data

## Analytics Widgets

- `[ ]` Widgets list wired to `GET /api/v1/analytics/widgets`
- `[ ]` Create widget wired to `POST /api/v1/analytics/widgets`
- `[ ]` Reorder widgets wired to `PATCH /api/v1/analytics/widgets/reorder`
- `[ ]` Widget data wired to `GET /api/v1/analytics/widgets/:id/data`
- `[ ]` Update widget wired to `PATCH /api/v1/analytics/widgets/:id`
- `[ ]` Delete widget wired to `DELETE /api/v1/analytics/widgets/:id`

## Columns / Monitoring Dashboard

- `[-]` Dashboard and column UI exists locally
- `[ ]` Columns list wired to `GET /api/v1/columns`
- `[ ]` Create column wired to `POST /api/v1/columns`
- `[ ]` Reorder columns wired to `PATCH /api/v1/columns/reorder`
- `[ ]` Update column wired to `PATCH /api/v1/columns/:id`
- `[ ]` Delete column wired to `DELETE /api/v1/columns/:id`
- `[ ]` Column filters connected to backend data

## Teams

- `[-]` Team UI exists locally
- `[ ]` Create team wired to `POST /api/v1/teams`
- `[ ]` Team members wired to `GET /api/v1/teams/:id/members`
- `[ ]` Invite member wired to `POST /api/v1/teams/:id/invite`
- `[ ]` Update member role wired to `PATCH /api/v1/teams/:id/members/:userId`
- `[ ]` Team activity wired to `GET /api/v1/teams/:id/activity`
- `[ ]` Team dashboard wired to `GET /api/v1/teams/:id/dashboard`
- `[ ]` Team dashboard update wired to `PATCH /api/v1/teams/:id/dashboard`
- `[ ]` Global activity wired to `GET /api/v1/activity`

## Delegation

- `[ ]` Permissions list wired to `GET /api/v1/delegation/permissions`
- `[ ]` Invite delegation wired to `POST /api/v1/delegation/invite`
- `[ ]` Delegation list wired to `GET /api/v1/delegation`
- `[ ]` Update delegation wired to `PATCH /api/v1/delegation/:id`
- `[ ]` Delete delegation wired to `DELETE /api/v1/delegation/:id`
- `[ ]` Custom roles list wired to `GET /api/v1/delegation/roles`
- `[ ]` Custom role creation wired to `POST /api/v1/delegation/roles`
- `[ ]` Custom role update wired to `PATCH /api/v1/delegation/roles/:id`
- `[ ]` Custom role delete wired to `DELETE /api/v1/delegation/roles/:id`
- `[ ]` `x-on-behalf-of` request header support implemented

## Messages

- `[-]` Inbox/messages UI exists locally
- `[ ]` Send message wired to `POST /api/v1/messages`
- `[ ]` Conversation list wired to `GET /api/v1/messages/conversation`
- `[ ]` Recent conversations wired to `GET /api/v1/messages/recent`
- `[ ]` Mark read wired to `POST /api/v1/messages/mark-read`

## Notifications

- `[-]` Notification UI exists locally
- `[ ]` Notifications list wired to `GET /api/v1/notifications`
- `[ ]` Mark all read wired to `PATCH /api/v1/notifications/mark-all-read`
- `[ ]` Mark one read wired to `PATCH /api/v1/notifications/:id/read`
- `[ ]` Delete notification wired to `DELETE /api/v1/notifications/:id`

## Onboarding

- `[ ]` Onboarding state wired to `GET /api/v1/onboarding`
- `[ ]` Onboarding update wired to `PATCH /api/v1/onboarding`
- `[ ]` Automatic frontend refresh of onboarding progress implemented

## Real-Time

- `[ ]` WebSocket client setup implemented
- `[ ]` Socket auth with JWT token implemented
- `[ ]` User and team room subscriptions implemented
- `[ ]` `notification` event handling implemented
- `[ ]` `new_message` event handling implemented
- `[ ]` `account_switched` event handling implemented
- `[ ]` `team_activity` event handling implemented
- `[ ]` `shared_dashboard_updated` event handling implemented
- `[ ]` SSE fallback wired to `GET /api/v1/sse`

## Saved Searches

- `[ ]` Searches list wired to `GET /api/v1/searches`
- `[ ]` Create search wired to `POST /api/v1/searches`
- `[ ]` Update search wired to `PATCH /api/v1/searches/:id`
- `[ ]` Delete search wired to `DELETE /api/v1/searches/:id`

## Prospect Lists

- `[ ]` Prospect lists wired to `GET /api/v1/prospects`
- `[ ]` Create prospect list wired to `POST /api/v1/prospects`
- `[ ]` Update prospect list wired to `PATCH /api/v1/prospects/:id`
- `[ ]` Delete prospect list wired to `DELETE /api/v1/prospects/:id`
- `[ ]` Add prospect member wired to `POST /api/v1/prospects/:id/members`
- `[ ]` Remove prospect member wired to `DELETE /api/v1/prospects/:id/members/:prospectId`

## AI Features

- `[ ]` Suggest replies wired to `POST /api/v1/ai/suggest-replies`
- `[ ]` Profile summary wired to `GET /api/v1/ai/profile-summary/:id`
- `[ ]` Suggest comments wired to `POST /api/v1/ai/suggest-comments`

## Contact Notes

- `[ ]` Contact notes list wired to `GET /api/v1/contacts/:contactId/notes`
- `[ ]` Create contact note wired to `POST /api/v1/contacts/:contactId/notes`
- `[ ]` Update contact note wired to `PATCH /api/v1/contacts/:contactId/notes/:noteId`
- `[ ]` Delete contact note wired to `DELETE /api/v1/contacts/:contactId/notes/:noteId`
- `[ ]` Note history wired to `GET /api/v1/contacts/:contactId/notes/:noteId/history`

## LinkedIn Engagement

- `[ ]` Like post wired to `POST /api/v1/engagement/like`
- `[ ]` Unlike post wired to `POST /api/v1/engagement/unlike`
- `[ ]` Comment on post wired to `POST /api/v1/engagement/comment`
- `[ ]` Delete comment wired to `DELETE /api/v1/engagement/comment`

## Current Priority Recommendation

- `[x]` Authentication completed as first integration slice
- `[x]` Profiles module integrated
- `[x]` Accounts module integrated
- `[ ]` Then wire dashboard columns and posts so the core workspace becomes functional
