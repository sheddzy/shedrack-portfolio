# Shedrack Ebete Portfolio

Personal portfolio for operations management, project management, HR operations, corporate training, business systems, professional email setup and website setup.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- GitHub-backed portfolio content manager
- Render hosting

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run start
```

## Render deployment
The Render web service is configured to deploy from `main` automatically.

- Service: https://dashboard.render.com/web/srv-dc2m9q68bjmc7384n730
- Temporary service URL: https://shedrack-portfolio.onrender.com
- Intended custom domain: https://shedrackebete.online

Add `shedrackebete.online` in Render under **Settings → Custom Domains**, then point the DNS records Render provides at the domain's DNS host. The custom domain is not confirmed as attached until Render shows it as verified.

## Admin dashboard setup

The private content manager is at `/admin`. It supports adding, editing and removing:
- Projects
- Other work and case studies
- Training records

Admin changes are committed to `src/data/portfolio.json` in this repository. With Render auto-deploy enabled, the public portfolio rebuilds using the updated content.

Set these environment variables in the Render service's **Environment** page:

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | A long, unique password for the admin login |
| `ADMIN_SESSION_SECRET` | A separate random secret used to sign the secure admin session cookie |
| `GITHUB_TOKEN` | Fine-grained GitHub token with Contents read/write access to this repository |
| `GITHUB_REPOSITORY` | `sheddzy/shedrack-portfolio` |

Keep all secrets server-side. Do not prefix them with `NEXT_PUBLIC_` and do not commit them to GitHub. After setting them, redeploy the service. The admin login will then work at `https://shedrackebete.online/admin`.

An example variable template is in `.env.example`.

## Images and logos
The portrait is referenced at `public/images/shedrack-ebete.jpg`; add the approved original portrait file at that exact path before launch. The admin project editor accepts public image and logo URLs, and the public project cards will display those assets when supplied. Project websites were not reachable by the automated page retriever during this build, so no third-party logos or screenshots have been fabricated. Add approved screenshots or logo URLs through the admin dashboard once available.

## Content accuracy
Project descriptions are conservative. Confirm implementation status, responsibilities, dates and measurable outcomes before adding case-study claims. Keep product development and completed client work clearly distinguished.
