# Vercel Deployment Risk Audit

## Status

This repository is a new Next.js App Router project for Vercel deployment. It has not been linked to a Vercel project yet, and local package installation could not be completed in this desktop environment because `npm` is not available on the machine PATH.

## Risks Found And Handled

- Admin-only data access: submissions are not rendered on the public page. The admin inbox is guarded by an HTTP-only signed cookie and a server-side password check.
- Static-site privacy risk: the project is not implemented as a static-only site because static HTML cannot securely hide submissions from other visitors.
- Serverless persistence risk: submissions use Upstash Redis REST when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are configured. Without those variables, local development uses in-memory storage only, which is not durable on Vercel.
- Cache risk: `/admin` is forced dynamic so private admin state is evaluated per request.
- Secret leakage risk: `.env*.local` and `.vercel` are ignored by Git. Real secrets should only be stored in Vercel environment variables.
- Browser hardening: common security headers are configured in `next.config.ts`.
- Framework security risk: dependencies target patched modern versions: `next@^16.1.6`, `react@^19.2.4`, and `react-dom@^19.2.4`.

## Required Before Production

- Set `ADMIN_PASSWORD` to a long private value.
- Set `SESSION_SECRET` to a random value of at least 32 characters.
- Provision Upstash Redis or another persistent store, then set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- Run `npm install` and `npm run build` in an environment with npm before deploying.
- Consider adding abuse protection such as rate limiting or a lightweight challenge if the form becomes public.

## Residual Risk

Anonymous free-text forms can still receive personal information if users type it themselves. The UI warns users not to include names, contact details, or school names, but technical systems cannot fully prevent voluntary disclosure without additional content filtering.
