# Radiography Analysis

**Radiography Analysis** is a public-ready, static browser application for dental radiography ROI alignment, fractal dimension analysis, densitometry/morphometry measurements, histogram QA, overlay verification and ImageJ-compatible Excel export.

Producer: **AllJect | AllJect Design & Development | https://allject.com**

## Languages

The application and `user-guide.html` support **Turkish, English and German** through the extensible language registry in `radiography-languages.js`. The last selected language is remembered in the browser; no separate build or external translation file is required.

## Quick start

1. Open `radiography-analysis.html` locally or publish this folder with GitHub Pages.
2. Import one or more radiographs. One image runs analysis mode; two or more images use reference-first comparison mode.
3. Draw ROI, align, verify with Overlay, calculate, then copy Excel output.
4. Open `user-guide.html` for the detailed trilingual manual and Excel column dictionary.

## Public release 2026-06-05

This package is prepared as the public GitHub release for **Radiography Analysis**. It includes the finalized offline asset package, TR/EN/DE language hardening, localized Excel copy headers, expanded 163-column Excel measurement documentation, a dark pastel responsive interface, mobile command menu, non-blocking notifications, verified mobile panel/canvas interaction, and GitHub Pages compatible static delivery.

## Final QA scope

- Compact TR/EN/DE language dropdown with remembered selection.
- Mobile command menu exposes ROI tools, alignment, calculation, overlay, import, guide links and language shortcuts on small screens.
- Excel copy headers localize to the selected language, including ImageJ-compatible measurement names.
- Derived radiographic quality indices add exposure balance, robust contrast, clipping risk, sharpness/noise, CNR proxy, texture heterogeneity and trabecular ratio fields without adding expensive image passes.
- `user-guide.html` contains the operating manual, workflow protocols, full-image/ROI Excel guidance and searchable Excel column dictionary.
- Root app, guide, favicon and vendor files are synchronized for static GitHub Pages publishing without CDN dependency.
- Mobile upload, analysis panel toggle and canvas drag were live-tested with Chrome mobile emulation.

## Public release notes

- Project name: **Radiography Analysis**.
- Static deployment: no build step required.
- Core files use English filenames.
- Patient-identifiable images must not be committed to public repositories.
- This software is for research, measurement standardization and decision support. It is not a diagnostic medical device.

## GitHub Pages

Repository Settings -> Pages -> Deploy from branch -> `main` / root. Open the application at `radiography-analysis.html`; the guide is `user-guide.html`.
