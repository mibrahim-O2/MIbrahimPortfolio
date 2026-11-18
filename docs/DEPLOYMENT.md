# Deployment: GitHub → Vercel → Your Phone

The site is hosted on **Vercel** and connected to this GitHub repository. You never run commands yourself:
every change is a commit, and Vercel builds and deploys it automatically.

```
 edit on a branch ──► Vercel builds a PREVIEW ──► you check it on your phone
                                                      │
                                      looks good? ────┴──► merge the pull request into main
                                                                     │
                                                    Vercel deploys PRODUCTION (your live site)
```

## Branches

| Branch | What happens when it changes |
|---|---|
| `main` | **Production.** Vercel deploys it to your real domain. Only merge reviewed changes here. |
| any other branch (e.g. `claude/…`, `update-projects`) | **Preview.** Vercel deploys it to a separate, temporary URL. The live site is untouched. |

**Rule:** never commit directly to `main`. If a change breaks something, it breaks only the Preview.

## Preview deployments

Every push to a non-`main` branch creates a Preview deployment with its own URL, like
`https://<project>-git-<branch-name>-<account>.vercel.app`.

Where to find the Preview URL:

1. **Pull request page on GitHub** (easiest): the Vercel bot posts a comment with a **Visit Preview** link,
   and the checks section shows "Vercel — Deployment has completed".
2. **Vercel app or vercel.com** → your project → **Deployments** → the newest deployment for that branch.
3. **The AI agent** reports it after pushing.

If the build fails, the pull request shows a red ✗ and Vercel shows the error log. **Production is not
affected:** the live site keeps the last good version.

## Checking a Preview on your phone

Open the Preview URL and go through this list:

1. **Homepage loads** and scrolls smoothly, with no sideways scrolling.
2. **What you changed** is visible and correct (text, links, images).
3. **Tap every new or changed link/button** (Demo, GitHub, email, phone).
4. **Open the menu** (☰) and tap a few items.
5. For projects: open `/projects` and the project's detail page `/projects/<id>`.
6. **Rotate the phone** to landscape once.
7. If possible, also check in desktop mode (in Chrome/Safari: ⋮ / aA → "Request desktop site").

Tip: Vercel preview pages show a small Vercel toolbar; it's not part of your site.

## Publishing to production (merging)

1. On GitHub, open the pull request for the branch (create one with **Compare & pull request** if needed).
2. Check that the Vercel check is ✅ and you reviewed the Preview.
3. Tap **Merge pull request → Confirm merge**.
4. Vercel automatically deploys `main` to production (usually 1–2 minutes).
5. Open your live site and confirm the change. Use a private tab if you still see the old version.

## Undoing a bad release

In Vercel (app or website): **Deployments** → choose the last good production deployment → **⋯ → Promote to
Production** (or **Instant Rollback**). This takes seconds and needs no code. Then fix the problem on a branch
as usual.

On GitHub you can also open the merged pull request and tap **Revert**, which creates a new pull request
that undoes it.

## Environment variables

The site needs **no secrets**. One optional variable exists:

| Name | Purpose | Needed? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your public URL, used in link previews, `sitemap.xml` and `robots.txt` | Optional. Without it the site uses Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`, set by Vercel automatically) and finally `https://mibrahimdev.tech` (`utils/siteUrl.js`). Set it if your domain is different. |

Set it in Vercel → Project → **Settings → Environment Variables**. Changes take effect on the next deployment.

## Things worth checking once in Vercel settings

- **Settings → Git → Production Branch** = `main`.
- **Settings → Domains**: your custom domain is listed and marked as production.
- **Settings → Git**: "Automatically expose System Environment Variables" is on (the default).

## Contact form

The site has no backend. The contact form opens the visitor's own email app with the message already
written, addressed to the `email` in `data/personal.js`. The visitor then taps send. Nothing needs to be
configured in Vercel for it.

## Security headers

`next.config.js` adds security headers (no framing of the site, no MIME sniffing, strict referrer, no
camera/mic/location access) and a **Content-Security-Policy** that only allows the outside sites the portfolio
really uses: the Font Awesome and Devicon stylesheets, the GitHub profile photo, YouTube video embeds and the
Vercel preview toolbar. They apply automatically on every deployment.

If you ever add something that loads from a **new outside website** (a different image host for your photo,
a Vimeo video, an analytics script), add that host to the matching line of `csp` at the top of
`next.config.js` (`img-src` for images, `frame-src` for embedded videos, `script-src` for scripts), otherwise the
browser blocks it. Links to other sites (buttons) are not affected.
