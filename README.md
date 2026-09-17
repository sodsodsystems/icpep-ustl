# KumEng: Refactor — website source

## Continue development
Extract this ZIP and open the `kumeng-website` folder in your editor (including Antigravity). This is a plain HTML, CSS, and JavaScript website. There is no framework, build step, npm dependency, or required API key.

## Run locally
From this folder, run:

```sh
python -m http.server 8000
```

On Windows, `py -m http.server 8000` also works when the Python launcher is installed. Open http://localhost:8000 in your browser. Alternatively use your editor's static HTTP server. Serve over HTTP: opening index.html directly with file:// can block the JSON requests used by the roster and curriculum.

## Files
- index.html: all homepage sections, event links, and text.
- style.css: responsive layouts, theme, and Valorant heading font.
- app.js: officer selection and curriculum year switching.
- assets/agents.json: 19 officer/committee entries and draft role descriptions.
- assets/courses.json: subjects organized by year and term.
- assets/curriculum.md: downloadable curriculum source.
- assets/: supplied artwork, photos, logo, and font with credit.
- reference/: organization brief and development handoff.

The files at the root are the editable source, even though the hosted copy originally used a dist folder. No build is needed. Keep relative paths intact when deploying to any static host.

## Current state
This export matches the private website after the About, Events, and officer-description updates. It is a single-page mockup with anchor navigation, not separate pages. Officer names/photos remain placeholders. Event links are supplied by the owner; Facebook content could not be fetched to verify additional details. Curriculum edition: Revised SY 2022–2023; applicability to current batches remains unconfirmed. The map does not imply prerequisites. Foundation courses are conditional.

No Git history, credentials, hosting account identifiers, or machine-specific generator scripts are included. Local changes do not automatically update the existing hosted website. Private access on the current host is not implemented in this static source; choose your desired access settings when deploying elsewhere.
