# Cloudflare Pages deployment

GitHub pushes to `main` and a daily scheduled workflow build the site as static files, then deploy them to Cloudflare Pages on the free tier. The daily rebuild refreshes the GitHub activity card.

## One-time setup

1. Create a Cloudflare API token with **Account > Cloudflare Pages > Edit**, and copy the Cloudflare Account ID.
2. Create the Pages project with `npx wrangler pages project create myprofilesite --production-branch main`.
3. Add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, and repository variable `SITE_URL` set to `https://<domain>`.
4. In the Pages project, add the domain under **Custom domains** (the domain must already use Cloudflare DNS).
5. Enable Cloudflare Web Analytics on the Pages project for free, code-free analytics.

## Local preview

Run `npm run build && npm start` to preview the static export locally.
