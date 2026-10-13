# Locale slot repro

A parallel-route slot matched by `[...catchAll]` keeps showing the previous locale after a client-side navigation that only changes the root `[locale]` param. The rest of the page renders in the new locale.

Next.js 16.4.0, React 19.3.0, `cacheComponents: true`, `partialPrefetching: true`.

## Setup

- `app/[locale]/layout.tsx` is the root layout, with `generateStaticParams` for `en` and `fr`.
- Every server component reads the locale with `rootParams.locale()` from `next/root-params`. The read is wrapped in React `cache()`, the same way next-intl's `getLocale()` does it.
- `(portal)/layout.tsx` renders the `@localeSwitch` slot twice, in the header and the footer.
- The `@localeSwitch` slot has:
  - `page.tsx` for `/`
  - `[...catchAll]/page.tsx` for every other URL
  - `about/media/page.tsx`, an explicit page used as the control
  - `default.tsx`
- `(portal)/[...catchAll]/page.tsx` calls `notFound()`. Its param name is the same as the slot's.
- The language link is a client component that mounts only when the switch menu is opened. It navigates with `<Link replace scroll={false}>`.

Each page shows three labels: **Layout** (the `(portal)` layout segment), **Page** (the page segment) and **Slot** (the `@localeSwitch` segment).

## Steps

The bug has only been seen in a production build.

```bash
npm install
```

```bash
npm run build
```

```bash
npm run start
```

1. Open `http://localhost:3000/en/about/people`.
2. Click the slot button (`Slot: EN ▾`), then **Switch to FR**.
3. Compare the three labels.

Then try other paths:

- Switch on `/en/books`, which is also served by the catch-all slot.
- Switch on `/en/about/media`, the control.
- Go from `/en/about/people` to `/en/books` with the nav, then switch.
- Open `/en`, navigate to `/en/about/people`, then switch.

## Expected

After switching, Layout, Page and Slot all show `FR`.

## Actual (in the real app)

Layout and Page show `FR`. Slot still shows `EN` in both the header and the footer, and its menu offers "Switch to FR" again. Reloading the page fixes it. On `/about/media`, which has an explicit slot page, the slot updates.

## Variations to try if it doesn't reproduce

- Set `partialPrefetching: false` in `next.config.ts`.
- Rename the slot's `[...catchAll]` to `[...rest]` so the param name no longer matches the not-found catch-all.
- Render the language link always, instead of only when the menu is open, so it prefetches on page load.
- Add next-intl back (`getLocale()` from `next-intl/server` with a `getRequestConfig` that reads `rootParams.locale()`).

## Related

- [vercel/next.js#99675](https://github.com/vercel/next.js/issues/99675): a prefetched optional catch-all page is shown for sibling URLs because its vary params are missing a param.
# locale-slot-repro
