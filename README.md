# Royal Crest General Contractors — website

The single-page marketing site for Royal Crest General Contractors, a roofing and
home-improvement contractor in Dallas, TX. Live at <https://www.royalcrestgc.com/>.

Built with Vite, React 19, TypeScript and Tailwind CSS v4. There is no backend: the
quote form posts to Web3Forms, and everything else is static.

## Development

CI uses Node 22.

```bash
npm ci           # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check and build to dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
```

Lint and build must both pass; CI runs them on every pull request and before every deploy.

## Deployment

The site is hosted on GitHub Pages, served from the `gh-pages` branch at the custom
domain `www.royalcrestgc.com`. Nobody commits to `gh-pages` by hand; two workflows in
`.github/workflows/` write to it.

**Production — `deploy.yml`.** Every push to `main` (or a manual run) lints, builds and
publishes `dist/` to the root of `gh-pages` using
[`JamesIves/github-pages-deploy-action`](https://github.com/JamesIves/github-pages-deploy-action).
Files that are no longer part of the build, such as old hashed bundles, are deleted.
The `pr-preview/` directory is excluded from that clean-up.

**Pull request previews — `pr-preview.yml`.** Every pull request is built and published
to `https://www.royalcrestgc.com/pr-preview/pr-<number>/` using
[`rossjrw/pr-preview-action`](https://github.com/rossjrw/pr-preview-action), which
comments the link on the PR and removes the preview when the PR is closed. Previews are
built with `VITE_BASE_URL` set to that sub-path, and `robots.txt` asks crawlers to skip
them. Previews only work for branches in this repository, not forks.

Two files at the root of `gh-pages` exist only for GitHub Pages: `CNAME` holds the
custom domain, and `.nojekyll` tells Pages to serve the files as they are instead of
running Jekyll. The production workflow writes both into `dist/` before every deploy.
They are deliberately not in `public/`, so they stay out of PR previews.

To roll back a bad deploy, revert the offending commit on `main`; the push redeploys
the previous version.

## Conventions

[`CLAUDE.md`](./CLAUDE.md) documents the project structure, design tokens, styling and
component conventions, and the performance and accessibility decisions to preserve.
Read it before changing the UI.
