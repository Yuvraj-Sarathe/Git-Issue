# Contributing to Global Issue Explorer

Thank you for considering contributing! This document outlines how to submit code cleanly and consistently.

---

## Development Setup

1. **Fork and clone** the repo.
2. Ensure **Node.js 18+** is installed.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file with your GitHub token (see [README](./README.md#github-token--why--how)):
   ```env
   GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000).

---

## Branching Strategy

- **`main`** — production-ready code. Do not commit directly to `main`.
- **Feature branches** — create a branch from `main` for each change:
  ```bash
  git checkout -b feat/your-feature-name
  ```
  Use prefixes like `feat/`, `fix/`, `chore/`, or `refactor/`.

---

## Code Style

- **TypeScript** — write strict, typed code. Avoid `any`.
- **Lint** — run the linter before committing:
  ```bash
  npm run lint
  ```
  Fix any errors or warnings.
- **Formatting** — keep it consistent with the existing code. No trailing whitespace.
- **Components** — use the existing patterns in `components/`. Prefer `@/` path aliases.
- **Imports** — group and order: external libs → internal modules → styles.
- **No commented-out code** — delete it. Use git history if you need it back.

---

## Pull Request Process

1. **Ensure your branch is up-to-date** with `main`:
   ```bash
   git remote add upstream https://github.com/yuvraj-sarathe/git-issue.git
   git fetch upstream
   git rebase upstream/main
   ```
2. **Run the linter** and confirm the build succeeds:
   ```bash
   npm run lint
   npm run build
   ```
3. **Write a clear PR title** (e.g. `feat: add label color filter`).
4. **Describe your changes** in the PR body — what, why, and how to test.
5. **Link any related issues** using `Closes #123`.
6. **Assign a reviewer** if applicable.
7. PRs require **at least one approval** before merging.
8. **Squash-merge** into `main` when approved.

---

## Questions?

Open a [discussion](https://github.com/yuvraj-sarathe/git-issue/discussions) or file an issue.
