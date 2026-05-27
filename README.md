# Radiography Analysis

**English** — A local HTML application for ROI-based dental radiograph alignment, fractal dimension analysis, densitometry/morphometry measurements and ImageJ-compatible Excel export.

**Türkçe** — Dental radyografilerde ROI tabanlı hizalama, fraktal boyut analizi, densitometri/morfometri ölçümleri ve ImageJ uyumlu Excel çıktısı üreten yerel HTML uygulaması.

**Deutsch** — Eine lokale HTML-Anwendung für ROI-basierte dentale Radiographie-Ausrichtung, fraktale Dimension, Densitometrie/Morphometrie und ImageJ-kompatiblen Excel-Export.

Producer / Yapımcı / Hersteller: **AllJect | AllJect Design & Development | https://allject.com**

## Languages

The application supports **Turkish, English and German** through an extensible language registry in `radiography-languages.js`. The last selected language is remembered in the browser.

## Quick start

1. Open `index.html` in a browser or publish the folder with GitHub Pages.
2. Load one or more radiographs. The first image is the reference; other images align to it.
3. Draw an ROI, align, verify with overlay, calculate, then copy Excel output.
4. Open `user-guide.html` for the full trilingual guide.

## Core features

- Single-image analysis mode and multi-image comparison mode.
- Reference-first alignment model.
- Enlarged ROI overlay preview.
- Presets: bone trabeculae, periapical lesion, enamel demineralization, implant site.
- Validated fractal calculation behavior preserved.
- ImageJ-compatible export columns.
- Extensible TR/EN/DE language layer.

## Clinical disclaimer

This software is not a diagnostic medical device. It is intended for research, measurement standardization and decision support. Clinical decisions must be made by qualified clinicians with patient history, examination and applicable protocols.

## GitHub Pages

Settings → Pages → Deploy from branch → `main` / root. The app opens from `index.html`.
