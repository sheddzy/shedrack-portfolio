# Shedrack Ebete Portfolio

Personal portfolio for operations management, project management, HR operations, corporate training and business systems.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS

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

## Deploy to Render
This repository includes a `render.yaml` Blueprint for a Node.js web service.

1. Sign in to Render and choose **New + → Blueprint**.
2. Connect `sheddzy/shedrack-portfolio`.
3. Render will detect `render.yaml` and create the web service.
4. Wait for the first deployment to finish.
5. Add the custom domain in the service's **Settings → Custom Domains**.
6. Configure the DNS records Render displays at your domain provider.
7. Enable HTTPS and verify the domain.

The service uses Node.js 20, `npm install && npm run build`, and `npm run start`.

## Content verification
Project descriptions are intentionally conservative. Confirm implementation status, responsibilities, dates and measurable outcomes before adding case-study claims. Add the approved portrait at `public/images/shedrack-ebete.jpg` and the final CV before launch. Set the actual custom domain in the site's metadata once confirmed.
