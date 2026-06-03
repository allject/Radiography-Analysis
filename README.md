# Radiography Analysis

**Radiography Analysis** is a public-ready, static browser application for dental radiography ROI alignment, fractal dimension analysis, densitometry/morphometry measurements, histogram QA, overlay verification and ImageJ-compatible Excel export.

Producer: **AllJect | AllJect Design & Development | https://allject.com**

## Languages

The interface and guide support **Turkish, English and German** through an extensible dropdown-based language registry in `radiography-languages.js`. The last selected language is remembered in the browser.

- Turkish: `README-TURKISH.md`
- English: `README-ENGLISH.md`
- German: `README-GERMAN.md`

## Quick start

1. Open `radiography-analysis.html` locally or publish this folder with GitHub Pages.
2. Import one or more radiographs. One image runs analysis mode; two or more images use reference-first comparison mode.
3. Draw ROI, align, verify with Overlay, calculate, then copy Excel output.
4. Open `user-guide.html` for the detailed trilingual manual and Excel column dictionary.

## Release candidate 2026-05-30

This package is prepared as the public GitHub release candidate for **Radiography Analysis**. It includes final TR/EN/DE language hardening, localized Excel copy headers, an expanded trilingual user guide, improved notifications, and responsive UI refinements for desktop, tablet and mobile use.

## Final QA scope

- Compact TR/EN/DE language dropdown with remembered selection.
- Excel copy headers localize to the selected language, including ImageJ-compatible measurement names.
- `user-guide.html` contains the trilingual operating manual, workflow protocols and searchable Excel column dictionary.
- Root app and guide files are synchronized for static GitHub Pages publishing.

## Public release notes

- Project name: **Radiography Analysis**.
- Static deployment: no build step required.
- Core files use English filenames.
- Patient-identifiable images must not be committed to public repositories.
- This software is for research, measurement standardization and decision support. It is not a diagnostic medical device.

## GitHub Pages

Repository Settings -> Pages -> Deploy from branch -> `main` / root. Open the application at `radiography-analysis.html`; the guide is `user-guide.html`.
