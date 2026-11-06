# Lost & Found Board

A small, mobile-first web app where students post and browse lost or found items on campus. Built for the INFO3130 midterm project (Project 01).

**Live site:** https://dpeleg.github.io/info3130-lost-and-found/

## What it does

- Post a **lost** or **found** item (title, category, location, date, description).
- Browse listings, filter by type, category, location and date, and search by keyword.
- On someone else's listing, tap **This is mine** (Found) or **I found it** (Lost) to notify the poster.
- On your own listing, tap **Item returned** to close the post and remove it from the board.

## Scope notes

- No backend. Listings are stored in your browser's `localStorage` and seeded with four sample posts. Clear the site's storage to reset them.
- Logged-in users are simulated: posts made in this browser count as yours, and one sample post is pre-assigned to you so the owner view can be tried.
- The email to the poster and the photo upload are **UI placeholders only**. Nothing is sent or uploaded.

## Run locally

The app uses native ES modules, so it must be served over HTTP (opening `index.html` directly won't work):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Project structure

```
index.html          static shell with the views, dialog and toast
assets/icons.svg    icon sprite
css/                tokens, base, layout, components, responsive
js/
  main.js           entry point
  router.js         hash router
  routes/           one module per screen
  components/       reusable UI pieces
  features/listings/  data store, filters, constants, seed data
  lib/              small DOM, date and form helpers
```

No build step and no dependencies. DM Sans is loaded from Google Fonts, with a system-font fallback.

## Accessibility

Semantic landmarks and headings, labelled form fields with linked inline errors, visible focus styles, keyboard-operable controls, a native modal dialog with focus return, and Lost/Found shown by icon and text as well as color. Checked with the WAVE extension (0 errors, 0 contrast errors) and by keyboard.
