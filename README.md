# Radiography Analysis

### 🇹🇷 Özet (Quick Overview - TR)
**Radiography Analysis**, dental radyografi ROI hizalama, fraktal boyut analizi, dansitometri/morfometri ölçümleri, histogram kalite kontrolü, çakıştırma doğrulaması ve ImageJ uyumlu Excel dışa aktarımı sağlayan, tarayıcı tabanlı statik bir uygulamadır. 
- 🌐 **Canlı Uygulama (GitHub Pages):** [https://allject.github.io/Radiography-Analysis/](https://allject.github.io/Radiography-Analysis/)
- 📖 **Kullanım Kılavuzu:** [user-guide.html](https://allject.github.io/Radiography-Analysis/user-guide.html)
- 📦 **Son Sürüm (Release):** [v1.1.0](https://github.com/allject/Radiography-Analysis/releases/tag/v1.1.0)
- 💾 **Doğrudan İndirme (.zip):** [v1.1.0 Sürümünü İndir](https://github.com/allject/Radiography-Analysis/archive/refs/tags/v1.1.0.zip)

### 🇬🇧 Overview (Quick Overview - EN)
**Radiography Analysis** is a public-ready, static browser application for dental radiography ROI alignment, fractal dimension analysis, densitometry/morphometry measurements, histogram QA, overlay verification, and ImageJ-compatible Excel export.
- 🌐 **Live Application (GitHub Pages):** [https://allject.github.io/Radiography-Analysis/](https://allject.github.io/Radiography-Analysis/)
- 📖 **User Guide:** [user-guide.html](https://allject.github.io/Radiography-Analysis/user-guide.html)
- 📦 **Latest Release:** [v1.1.0](https://github.com/allject/Radiography-Analysis/releases/tag/v1.1.0)
- 💾 **Direct Download (.zip):** [Download v1.1.0](https://github.com/allject/Radiography-Analysis/archive/refs/tags/v1.1.0.zip)

### 🇩🇪 Übersicht (Quick Overview - DE)
**Radiography Analysis** ist eine einsatzbereite, statische Browser-Anwendung für die Ausrichtung von dentalen Radiographie-ROIs, Fraktalanalysen, Densitometrie-/Morphometriemessungen, Histogramm-QS, Overlay-Verifizierungen und den ImageJ-kompatiblen Excel-Export.
- 🌐 **Live-Anwendung (GitHub Pages):** [https://allject.github.io/Radiography-Analysis/](https://allject.github.io/Radiography-Analysis/)
- 📖 **Bedienungsanleitung:** [user-guide.html](https://allject.github.io/Radiography-Analysis/user-guide.html)
- 📦 **Neueste Version (Release):** [v1.1.0](https://github.com/allject/Radiography-Analysis/releases/tag/v1.1.0)
- 💾 **Direkter Download (.zip):** [v1.1.0 Herunterladen](https://github.com/allject/Radiography-Analysis/archive/refs/tags/v1.1.0.zip)

---

Producer: **AllJect | AllJect Design & Development | https://allject.com**

## Languages

The interface and guide support **Turkish, English and German** through an extensible dropdown-based language registry in `radiography-languages.js`. The last selected language is remembered in the browser.

## Quick start

1. Open `radiography-analysis.html` locally, download the [Latest ZIP](https://github.com/allject/Radiography-Analysis/archive/refs/tags/v1.1.0.zip), or access it via [GitHub Pages](https://allject.github.io/Radiography-Analysis/).
2. Import one or more radiographs. One image runs analysis mode; two or more images use reference-first comparison mode.
3. Draw ROI, align, verify with Overlay, calculate, then copy Excel output.
4. Open the [Online User Guide](https://allject.github.io/Radiography-Analysis/user-guide.html) (or local `user-guide.html`) for the detailed trilingual manual and Excel column dictionary.

## Release notes (v1.1.0)

This package represents the stable GitHub release for **Radiography Analysis**. It includes final TR/EN/DE language hardening, localized Excel copy headers, an expanded trilingual user guide, improved notifications, and responsive UI refinements for desktop, tablet and mobile use.

## Final QA scope

- Compact TR/EN/DE language dropdown with remembered selection.
- Excel copy headers localize to the selected language, including ImageJ-compatible measurement names.
- `user-guide.html` contains the trilingual operating manual, workflow protocols and searchable Excel column dictionary. Link: [Trilingual User Guide](https://allject.github.io/Radiography-Analysis/user-guide.html).
- Root app and guide files are synchronized for static GitHub Pages publishing.

## Public release notes

- Project name: **Radiography Analysis**.
- Static deployment: no build step required.
- Core files use English filenames.
- Patient-identifiable images must not be committed to public repositories.
- This software is for research, measurement standardization and decision support. It is not a diagnostic medical device.
