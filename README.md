# Master Data — Work Management prototype

Interactive UX prototype of the Master Data workspace.

**Stack:** Vite · React · TypeScript · Tailwind CSS · shadcn/ui · React Router · TanStack Query · Supabase · Netlify

## Run locally

```sh
npm install
cp .env.example .env.local   # then add Supabase URL + anon key
npm run dev                  # http://localhost:5173
```

## Folders

- `src/routes/` — one file per screen in the journey
- `src/components/ui/` — base components (shadcn/ui, restyled to Figma)
- `src/components/layout/` — app shell (sidebar, top bar)
- `src/components/master-data/` — Master Data–specific pieces
- `src/data/` — functions that read/write Supabase
- `src/types/` — data shapes
- `src/lib/supabase.ts` — Supabase connection
- `src/index.css` — theme tokens (to be mapped from Figma)
- `supabase/migrations/` — database table definitions

## Deploy

Netlify reads `netlify.toml`. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
under Site configuration → Environment variables.
