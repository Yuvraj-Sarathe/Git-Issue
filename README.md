# Global Issue Explorer

**Git Issue** — cross-repo GitHub issue search. Browse, filter, and sort issues across all of GitHub with label tracking, language filters, and customizable views — entirely client-side.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## GitHub Token — Why & How

This app uses the **GitHub Search API**, which has stricter limits than the core REST API:

| | Without token | With token |
|---|---|---|
| **Requests per minute** | 10 | 30 |
| **Reset** | Every minute | Every minute |

The counter resets **every minute** (not hourly). You can check your current status at `https://api.github.com/rate_limit`.

### How to get a token

1. Go to **GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens** (or [click here](https://github.com/settings/tokens?type=beta))
2. Click **Generate new token**
3. Give it a name (e.g., `git-issue`)
4. Set **Repository access** to `Public Repositories (read-only)` — no scopes are needed for public repo issue queries
5. Click **Generate token** and copy the token value
6. Add it to `.env.local`:
   ```
   GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
   ```

