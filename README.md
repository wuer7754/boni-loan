# boni-loan

Premium fintech borrower funnel built with Next.js App Router and TypeScript.

Setup

```bash
npm install
npm run dev
```

Files of interest:

- [app/layout.tsx](app/layout.tsx) — global layout and navbar
- [app/page.tsx](app/page.tsx) — landing
- [app/prequal/page.tsx](app/prequal/page.tsx) — ZIP prequal
- [app/offer/page.tsx](app/offer/page.tsx) — calculator and lead submit
- [app/api/lead/route.ts](app/api/lead/route.ts) — lead API route
- [styles/globals.css](styles/globals.css) — design system

Integrations (where to plug in):

- Supabase / PostgreSQL: replace console.log in `app/api/lead/route.ts` with a DB insert.
- HubSpot: send lead data to HubSpot via their API from the API route.
- Stripe: for loan payments or fees processing, integrate in the API route or a server-side function.

Deploy to Vercel: push to a Git repo and import to Vercel. Ensure environment variables are set for any integrations.
