# Changelog

## 2026-06-01 - Release copy and notification stabilization

- Fixed the Excel copy action so both copy buttons use the finalized TSV export path.
- Restored and verified full-image rows in every Excel copy output, alongside ROI rows.
- Reworked notifications into one visible bottom toast surface; the legacy status element is now an invisible live region only.
- Added grouped notification updates so progress/completion messages replace each other instead of duplicating.
- Verified image upload, Turkish/English Excel copy output, desktop notification geometry and mobile toast placement.

## 2026-05-31 - Public release polish

- Notification cards now match the analysis/info panel width and sit beside it with an 8px desktop gap.
- Mobile/tablet notification placement was tightened so it no longer overlaps the analysis panel.
- Excel copy now uses one shared robust export pipeline for both copy buttons.
- Copying prepares missing full-image analyses first, then exports both full-image and ROI rows together.
- Added a browser fallback copy panel when clipboard permission is blocked.
- Verified desktop/mobile notification geometry, translated copy notifications and Excel TSV content.

## 2026-05-30 - Full-image Excel export completion

- Excel copy now waits for missing full-image analyses before generating the TSV output.
- Full-image rows now receive ImageJ/Fiji-compatible measurement values through the same measurement bundle used by ROI rows.
- Added localized progress/warning/success notifications for full-image export preparation.
- Verified full-image export row/header length parity and populated measurement fields with a browser simulation.


## 2026-05-30 - Final release candidate

- Completed a final translation hardening pass for Turkish, English and German.
- Added localized Excel-header behavior and guide column localization checks.
- Added a toast-style notification system with accessible status updates and dismiss controls.
- Improved responsive behavior for desktop, tablet and mobile layouts.
- Expanded the trilingual user guide with advanced protocols, decision trees, mobile/tablet notes and publication checks.
- Preserved validated fractal calculation behavior.


## 2026-05-30 - Final public language and guide hardening

- Fixed compact flag-and-language dropdown behavior.
- Localized Excel copy headers and user-guide column names in Turkish, English and German.
- Expanded the detailed operating manual with UI map, ROI, overlay, Excel and QA protocols.
- Matched guide styling more closely to the application chrome.
- Re-synchronized root and public package files.

## 2026-05-30 - Public release hardening

- Completed Turkish, English and German language coverage pass.
- Rebuilt the language selector as an extensible dropdown menu.
- Restored and expanded the detailed trilingual user guide.
- Synchronized public package files for GitHub Pages deployment.
- Preserved validated fractal calculation behavior and ROI-size memory.

## 2026-05-28 - Trilingual release base

- Renamed public package files to English names.
- Added multilingual README and deployment notes.
- Added ImageJ-compatible export mode and detailed Excel columns.
