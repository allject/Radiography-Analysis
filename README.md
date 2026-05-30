# Radiography Analysis

**Radiography Analysis** is a public-ready, static browser application for dental radiography ROI alignment, fractal dimension analysis, densitometry/morphometry measurements, histogram QA, overlay verification and ImageJ-compatible Excel export.

Producer: **AllJect | AllJect Design & Development | [https://allject.com](https://allject.com)**

---

## 🚀 How to Use / Nasıl Kullanılır?

### Option 1: Run Instantly in Your Browser (Recommended)
You don't need to download anything. Click the button below to open the application directly in your web browser:
👉 [![Open in Browser](https://img.shields.io/badge/Launch-Live_Application-success?style=for-the-badge&logo=google-chrome&logoColor=white)](https://allject.github.io/Radiography-Analysis/)

---

### Option 2: Download for Offline Use (Bilgisayara İndir)
If you prefer to use the application offline, follow these simple steps:

1. Click the big green button below to download the application package (.zip):
   📥 [![Download Zip](https://img.shields.io/badge/Download-Application_ZIP-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/allject/Radiography-Analysis/archive/refs/tags/v1.0.0.zip)
2. **Extract the ZIP file** (Zipli dosyayı klasöre çıkartın).
3. Open the folder and double-click the **`index.html`** file to start the application.

## Languages

The interface and guide support **Turkish, English and German** through an extensible dropdown-based language registry in `radiography-languages.js`. The last selected language is remembered in the browser.

- Turkish: `README-TURKISH.md`
- English: `README-ENGLISH.md`
- German: `README-GERMAN.md`

## Quick start

1. Open `index.html` locally or publish this folder with GitHub Pages.
2. Import one or more radiographs. One image runs analysis mode; two or more images use reference-first comparison mode.
3. Draw ROI, align, verify with Overlay, calculate, then copy Excel output.
4. Open `user-guide.html` for the detailed trilingual manual and Excel column dictionary.

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

Repository Settings -> Pages -> Deploy from branch -> `main` / root. The application opens from `index.html`.
