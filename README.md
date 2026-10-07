# Favour weds Godswill

A static, Vercel-ready Next.js wedding invitation for Favour Ntiense Oton and Godswill Alexander Abiodun, #GodsFav'26.

## Stack

- Next.js App Router and TypeScript
- React 19
- Tailwind CSS v4 via PostCSS
- Motion for reveal, parallax, and tactile interactions
- React Three Fiber for an optional shader-gradient and petal atmosphere
- Generated visual assets in `public/wedding/`

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Production checks:

```bash
./node_modules/.bin/eslint . --max-warnings=0
./node_modules/.bin/tsc --noEmit
pnpm build
```

## Deploying to Vercel

Import the repository into Vercel. The standard Next.js preset works without environment variables or backend services. If the final deployment uses a custom domain, update `metadataBase` in `app/layout.tsx` so Open Graph image URLs use the canonical domain.

## Content notes

The bank details are visible in the gifts section with copy buttons. Account numbers are not included in metadata or social preview assets. The wishlist mirrors the supplied reference with product images, names, and naira prices. Calendar, directions, copy, and share actions are all client-side and require no external service configuration.
