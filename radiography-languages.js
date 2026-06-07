(function () {
  'use strict';

  var SETTINGS_STORAGE_KEY = 'radiographyAnalysis.settings';
  var LEGACY_SETTINGS_STORAGE_KEY = 'fractal' + 'MD.settings';
  var LANGUAGE_STORAGE_KEY = 'radiographyAnalysis.language';

  var RA_LANGUAGES = {
    tr: { code: 'tr', label: 'T\u00fcrk\u00e7e', shortLabel: 'TR', flag: '\ud83c\uddf9\ud83c\uddf7', labels: { tr: 'T\u00fcrk\u00e7e', en: 'Turkish', de: 'T\u00fcrkisch' }, title: 'Radiography Analysis | Dental Radyografi ROI ve Fraktal Analizi' },
    en: { code: 'en', label: 'English', shortLabel: 'EN', flag: '\ud83c\uddec\ud83c\udde7', labels: { tr: '\u0130ngilizce', en: 'English', de: 'Englisch' }, title: 'Radiography Analysis | Dental Radiography ROI & Fractal Analysis' },
    de: { code: 'de', label: 'Deutsch', shortLabel: 'DE', flag: '\ud83c\udde9\ud83c\uddea', labels: { tr: 'Almanca', en: 'German', de: 'Deutsch' }, title: 'Radiography Analysis | Dentale Radiographie ROI- & Fraktalanalyse' }
  };

  var TR_TO_EN = {
    'Dil': 'Language', 'Dil se\u00e7imi': 'Language selector', 'Kılavuz': 'Guide', 'Dikdörtgen': 'Rectangle', 'Daire': 'Circle', 'Yeni ROI': 'New ROI', 'Hizala': 'Align', 'Hesapla': 'Calculate', 'Filtreler': 'Filters', 'Otomatik': 'Automatic', 'Overlay': 'Overlay', 'İçe Aktar': 'Import',
    'Görsel ekleyin': 'Add image(s)', 'Görsel Seç': 'Choose image(s)', 'Parlaklık': 'Brightness', 'Kontrast': 'Contrast', 'Pozlama': 'Exposure',
    'Bir ya da birden fazla panoramik radyografi yükleyebilirsiniz. Tek görselde analiz yapılır; 2+ görselde ilk görsel referanstır ve diğerleri ona hizalanır.': 'You can load one or more panoramic radiographs. A single image runs analysis mode; with 2+ images, the first image is the reference and the others are aligned to it.',
    'Görsel işlemler sonuca etki etsin': 'Apply visual processing to results', 'Kapalıyken FD ham analiz hattıyla hesaplanır': 'When disabled, FD is calculated through the raw analysis pipeline',
    'Referans ön işlemleri': 'Reference preprocessing', 'Arka plan çıkarma, Otsu, morfoloji ve Zhang iskelet': 'Background subtraction, Otsu, morphology and Zhang skeleton',
    '8-bit normalizasyon': '8-bit normalization', 'Önizleme verisini 0-255 aralığına sıkıştırır': 'Compresses preview data into the 0-255 range',
    'Siyah-beyaz görünüm': 'Black-and-white preview', 'RGB tonlarını gri skalaya indirger; eşikleme yapmaz': 'Converts RGB tones to grayscale; does not threshold',
    'Otomatik kontrast': 'Auto contrast', 'Görsel önizlemede tonu güçlendirir': 'Enhances tone in the image preview', 'CLAHE önizleme': 'CLAHE preview', 'Lokal kontrast önizlemesini güçlendirir': 'Enhances local contrast preview',
    'Analiz modu': 'Analysis mode', 'Özel': 'Custom', 'Diş hekimi': 'Dentist', 'Diş hekimi ön ayarı': 'Dentist preset', 'Genel klinik görüntü güçlendirme': 'General clinical image enhancement', 'Kullanıcının seçtiği manuel ayarlar': 'Manual settings selected by the user',
    'Kemik trabekül': 'Bone trabeculae', 'CLAHE + doku kontrastı': 'CLAHE + texture contrast', 'Trabeküler ağ, FD ve lacunarity için lokal kontrastı öne çıkarır': 'Emphasizes local contrast for trabecular network, FD and lacunarity',
    'Periapikal lezyon': 'Periapical lesion', 'Sınır ve radyolüsensi': 'Boundary and radiolucency', 'Radyolüsent sınırları ve lezyon çevresini vurgular': 'Highlights radiolucent borders and the lesion periphery',
    'Mine demineralizasyon': 'Enamel demineralization', 'Gri değer korunumu': 'Gray-value preservation', 'Gri değer takibi için agresif lokal kontrastı kapalı tutar': 'Keeps aggressive local contrast off for gray-value tracking',
    'İmplant alanı': 'Implant site', 'Kret/kemik yoğunluğu': 'Ridge/bone density', 'Kret ve implant çevresi kemik yoğunluğu için dengeli kontrast': 'Balanced contrast for ridge and peri-implant bone density', 'Sıfırla': 'Reset',
    'Hizalama Overlay': 'Alignment Overlay', 'Referans altta': 'Reference below', 'Hedef yarı saydam üstte': 'Target translucent above', 'Hedef opaklığı:': 'Target opacity:', 'Hizalama sonrası hedef görsel referans üzerine bindirilir. Kenar ve anatomik yapı kaymaları burada gözle kontrol edilir.': 'After alignment, the target image is overlaid on the reference. Edge and anatomical-structure shifts are visually checked here.',
    'Analiz ve Bilgilendirme': 'Analysis & Information', 'Analiz Sonucu': 'Analysis Result', 'BEKLİYOR': 'WAITING', 'HAZIR': 'READY', 'HESAPLANIYOR': 'CALCULATING', 'HİZALANIYOR': 'ALIGNING', 'HATA': 'ERROR', 'WORKER': 'WORKER',
    'Fraktal Boyut (D)': 'Fractal Dimension (D)', 'Fraktal (D)': 'Fractal (D)', 'Karmaşıklık': 'Complexity', 'Bekliyor': 'Waiting', 'Gecikme': 'Latency', 'Densitometri ve Yapısal Ölçümler': 'Densitometry & Structural Measurements', 'Alan Oranı': 'Area Fraction',
    'Kalibrasyon': 'Calibration', 'mm ölçümleri için 1 pikselin mm karşılığı': 'mm value of one pixel for physical measurements', 'ROI Bilgileri': 'ROI Information', 'Açı': 'Angle', 'Karşılaştırma Tablosu': 'Comparison Table', 'Bölge': 'Region', 'İşlem': 'Action', 'ROI ekleyin...': 'Add ROI...', 'Tüm Sonuçları Kopyala (Excel)': 'Copy All Results (Excel)',
    'Regresyon Kalitesi': 'Regression Quality', 'Nokta': 'Points', 'Eğim SE': 'Slope SE', 'Kutu Ölçekleri': 'Box Scales', 'ROI Min': 'ROI Min', 'Kontrol': 'QC', 'Elenen Ölçekler': 'Excluded Scales',
    'İşlem Hattı': 'Pipeline', 'ROI işlem önizlemeleri': 'ROI processing previews', 'Seçili görsel / ROI': 'Selected image / ROI', 'Gri ton': 'Grayscale', 'Analiz tonu': 'Analysis tone', 'Kenar': 'Edge', 'Eşikleme': 'Thresholding', 'Morfoloji': 'Morphology', 'Ön mask': 'Foreground mask', 'İskelet': 'Skeleton',
    'Seçili alan bekleniyor': 'Waiting for selected region', 'Sonuca uygulanıyor': 'Applied to result', 'Gri ton, arka plan çıkarma ve Otsu': 'Grayscale, background subtraction and Otsu', 'Zhang iskelet çıkarımı': 'Zhang skeleton extraction', 'Sayım': 'Counting', 'Kutu sayımı ölçekleri bekleniyor': 'Waiting for box-counting scales',
    'Görüntü Bilgileri': 'Image Information', 'Görüntü bekleniyor...': 'Waiting for image...', 'Piksel yoğunluk histogramı': 'Pixel intensity histogram', 'Std / Aralık': 'Std / Range', 'Entropi': 'Entropy', 'Görsel yüklendiğinde histogram hesaplanır; ROI hesaplanınca bu alan seçili ROI yoğunluğuna geçer.': 'The histogram is calculated after an image is loaded; after ROI calculation, this area switches to the selected ROI intensity.',
    'Hazır': 'Ready', 'DÜŞÜK': 'LOW', 'ORTA': 'MEDIUM', 'YÜKSEK': 'HIGH', 'Yok': 'None', 'Evet': 'Yes', 'Hayır': 'No', 'Referans': 'Reference', 'Hedef': 'Target', 'Güven': 'Confidence', 'Yöntem': 'Method',
    'Referans görsel': 'Reference image', 'Hedef görsel': 'Target image', 'GÜVEN SKORU': 'CONFIDENCE SCORE', 'Ortak eşleşme': 'Common matches', 'Düşük güven': 'Low confidence', 'Güçlü': 'Strong', 'Orta': 'Medium', 'Zayıf': 'Weak',
    'Analiz bekleniyor': 'Waiting for analysis', 'Önizleme yok': 'No preview', 'Eşik yok': 'No threshold', 'İskelet yok': 'No skeleton', 'Hesaplanmadı': 'Not calculated', 'Bu seçim hesaplanmadı': 'This selection has not been calculated', 'ROI yok': 'No ROI',
    'Log(Sayı) vs Log(Boyut)': 'Log(Count) vs Log(Size)', 'Regresyon Hattı': 'Regression Line', 'Excel için Kopyala': 'Copy for Excel', 'Overlay panelini kapat': 'Close overlay panel', 'Paneli küçült / büyüt': 'Collapse / expand panel', 'Referans ve hedef görseli yarı saydam üst üste göster': 'Show reference and target as a translucent overlay', 'Yeniden adlandırmak için tıkla': 'Click to rename',
    'Tam görsel': 'Full image', 'Tüm fotoğraf': 'Full image', 'Analiz edildi': 'Analyzed', 'Analiz bekliyor': 'Analysis pending', 'Çakıştırıldı': 'Matched', 'Orijinal görsel': 'Original image', 'Referans/hizalanmış çalışma uzayı': 'Reference/aligned workspace', 'Orijinal görsel / Referans/hizalanmış çalışma uzayı': 'Original image / reference-aligned workspace', 'Referans analiz hattı': 'Reference analysis pipeline',
    'Kalibrasyon yok; fiziksel mm değerleri boş bırakıldı.': 'No calibration; physical mm values were left blank.', 'Başlıklar dahil Excel formatında kopyalandı': 'Copied in Excel format, including headers', 'Kopyalama başarısız. Tarayıcı pano iznini kontrol edin.': 'Copy failed. Check browser clipboard permission.',
    'Dil Türkçe olarak ayarlandı.': 'Language set to Turkish.', 'Language set to English.': 'Language set to English.', 'Dil Almanca olarak ayarlandı.': 'Language set to German.',
    'Arayüz olayları bağlanamadı; sayfayı yeniden yükleyin.': 'UI events could not be attached; reload the page.', 'Analiz motoru başlatılamadı. Sayfa açık kaldı; lütfen bağlantıyı/OpenCV yüklemesini kontrol edin.': 'Analysis engine could not start. The page remains open; check the connection/OpenCV loading.', 'Analiz motoru oluşturulamadı. Arayüz çalışıyor; hesaplama için sayfayı yeniden yükleyin.': 'Analysis engine could not be created. The UI is running; reload the page for calculation.', 'Beklenmeyen işlem hatası oluştu; konsolu kontrol edin.': 'Unexpected operation error; check the console.',
    'Yeni ROI eklemek için referans görseli açın. Karşılaştırma modunda ilk görsel referanstır; diğerleri ona hizalanır.': 'Open the reference image to add a new ROI. In comparison mode, the first image is the reference and others align to it.', 'Karşılaştırma modu: diğer görseller ilk referans görsele hizalanıyor ve aktif ROI kopyalanıyor...': 'Comparison mode: target images are aligning to the first reference and the active ROI is being copied...', 'Hizalama tamamlandı. ROI koordinatları referansa göre güncellendi.': 'Alignment complete. ROI coordinates were updated relative to the reference.', 'Aktif ROI yok. Tüm görseller için genel analiz başlatılıyor.': 'No active ROI. Starting full-image analysis for all images.', 'Analiz tamamlanamadı:': 'Analysis failed:'
  };

  var TR_TO_DE = {
    'Dil': 'Sprache', 'Dil se\u00e7imi': 'Sprachauswahl', 'Kılavuz': 'Handbuch', 'Dikdörtgen': 'Rechteck', 'Daire': 'Kreis', 'Yeni ROI': 'Neue ROI', 'Hizala': 'Ausrichten', 'Hesapla': 'Berechnen', 'Filtreler': 'Filter', 'Otomatik': 'Automatik', 'Overlay': 'Overlay', 'İçe Aktar': 'Importieren',
    'Görsel ekleyin': 'Bild(er) hinzufügen', 'Görsel Seç': 'Bild(er) auswählen', 'Parlaklık': 'Helligkeit', 'Kontrast': 'Kontrast', 'Pozlama': 'Belichtung',
    'Bir ya da birden fazla panoramik radyografi yükleyebilirsiniz. Tek görselde analiz yapılır; 2+ görselde ilk görsel referanstır ve diğerleri ona hizalanır.': 'Sie können eine oder mehrere Panorama-Radiographien laden. Ein einzelnes Bild startet den Analysemodus; ab 2 Bildern ist das erste Bild die Referenz und die anderen werden daran ausgerichtet.',
    'Görsel işlemler sonuca etki etsin': 'Bildverarbeitung auf Ergebnisse anwenden', 'Kapalıyken FD ham analiz hattıyla hesaplanır': 'Wenn deaktiviert, wird FD über die rohe Analyse-Pipeline berechnet',
    'Referans ön işlemleri': 'Referenz-Vorverarbeitung', 'Arka plan çıkarma, Otsu, morfoloji ve Zhang iskelet': 'Hintergrundabzug, Otsu, Morphologie und Zhang-Skelett', '8-bit normalizasyon': '8-Bit-Normalisierung', 'Önizleme verisini 0-255 aralığına sıkıştırır': 'Komprimiert Vorschaudaten in den Bereich 0–255',
    'Siyah-beyaz görünüm': 'Schwarzweiß-Vorschau', 'RGB tonlarını gri skalaya indirger; eşikleme yapmaz': 'Wandelt RGB-Töne in Graustufen um; keine Schwellenwertbildung', 'Otomatik kontrast': 'Automatischer Kontrast', 'Görsel önizlemede tonu güçlendirir': 'Verstärkt den Ton in der Bildvorschau', 'CLAHE önizleme': 'CLAHE-Vorschau', 'Lokal kontrast önizlemesini güçlendirir': 'Verstärkt die lokale Kontrastvorschau',
    'Analiz modu': 'Analysemodus', 'Özel': 'Benutzerdefiniert', 'Diş hekimi': 'Zahnarzt', 'Diş hekimi ön ayarı': 'Zahnarzt-Voreinstellung', 'Genel klinik görüntü güçlendirme': 'Allgemeine klinische Bildverbesserung', 'Kullanıcının seçtiği manuel ayarlar': 'Manuelle Einstellungen des Benutzers',
    'Kemik trabekül': 'Knochentrabekel', 'CLAHE + doku kontrastı': 'CLAHE + Texturkontrast', 'Trabeküler ağ, FD ve lacunarity için lokal kontrastı öne çıkarır': 'Betont lokalen Kontrast für Trabekelnetz, FD und Lacunarity', 'Periapikal lezyon': 'Periapikale Läsion', 'Sınır ve radyolüsensi': 'Grenze und Radioluzenz', 'Radyolüsent sınırları ve lezyon çevresini vurgular': 'Hebt radioluzente Grenzen und Läsionsumgebung hervor',
    'Mine demineralizasyon': 'Schmelzdemineralisation', 'Gri değer korunumu': 'Erhaltung der Grauwerte', 'Gri değer takibi için agresif lokal kontrastı kapalı tutar': 'Deaktiviert aggressiven lokalen Kontrast für Grauwertverfolgung', 'İmplant alanı': 'Implantatbereich', 'Kret/kemik yoğunluğu': 'Kamm-/Knochendichte', 'Kret ve implant çevresi kemik yoğunluğu için dengeli kontrast': 'Ausgewogener Kontrast für Kamm und periimplantäre Knochendichte', 'Sıfırla': 'Zurücksetzen',
    'Hizalama Overlay': 'Ausrichtungs-Overlay', 'Referans altta': 'Referenz unten', 'Hedef yarı saydam üstte': 'Ziel halbtransparent oben', 'Hedef opaklığı:': 'Ziel-Deckkraft:', 'Hizalama sonrası hedef görsel referans üzerine bindirilir. Kenar ve anatomik yapı kaymaları burada gözle kontrol edilir.': 'Nach der Ausrichtung wird das Zielbild über die Referenz gelegt. Kanten- und anatomische Verschiebungen werden hier visuell geprüft.',
    'Analiz ve Bilgilendirme': 'Analyse & Information', 'Analiz Sonucu': 'Analyseergebnis', 'BEKLİYOR': 'WARTET', 'HAZIR': 'BEREIT', 'HESAPLANIYOR': 'BERECHNET', 'HİZALANIYOR': 'RICHTET AUS', 'HATA': 'FEHLER', 'WORKER': 'WORKER',
    'Fraktal Boyut (D)': 'Fraktale Dimension (D)', 'Fraktal (D)': 'Fraktal (D)', 'Karmaşıklık': 'Komplexität', 'Bekliyor': 'Wartet', 'Gecikme': 'Latenz', 'Densitometri ve Yapısal Ölçümler': 'Densitometrie & Strukturmessungen', 'Alan Oranı': 'Flächenanteil', 'Kalibrasyon': 'Kalibrierung', 'mm ölçümleri için 1 pikselin mm karşılığı': 'mm-Wert eines Pixels für physische Messungen', 'ROI Bilgileri': 'ROI-Informationen', 'Açı': 'Winkel',
    'Karşılaştırma Tablosu': 'Vergleichstabelle', 'Bölge': 'Region', 'İşlem': 'Aktion', 'ROI ekleyin...': 'ROI hinzufügen...', 'Tüm Sonuçları Kopyala (Excel)': 'Alle Ergebnisse kopieren (Excel)', 'Regresyon Kalitesi': 'Regressionsqualität', 'Nokta': 'Punkte', 'Eğim SE': 'Steigungs-SE', 'Kutu Ölçekleri': 'Box-Skalen', 'ROI Min': 'ROI Min', 'Kontrol': 'QC', 'Elenen Ölçekler': 'Ausgeschlossene Skalen',
    'İşlem Hattı': 'Pipeline', 'ROI işlem önizlemeleri': 'ROI-Verarbeitungsvorschauen', 'Seçili görsel / ROI': 'Ausgewähltes Bild / ROI', 'Gri ton': 'Graustufe', 'Analiz tonu': 'Analyseton', 'Kenar': 'Kante', 'Eşikleme': 'Schwellenwert', 'Morfoloji': 'Morphologie', 'Ön mask': 'Vordergrundmaske', 'İskelet': 'Skelett', 'Seçili alan bekleniyor': 'Wartet auf ausgewählte Region', 'Sonuca uygulanıyor': 'Wird auf Ergebnis angewendet', 'Gri ton, arka plan çıkarma ve Otsu': 'Graustufe, Hintergrundabzug und Otsu', 'Zhang iskelet çıkarımı': 'Zhang-Skelett-Extraktion', 'Sayım': 'Zählung', 'Kutu sayımı ölçekleri bekleniyor': 'Wartet auf Box-Counting-Skalen',
    'Görüntü Bilgileri': 'Bildinformationen', 'Görüntü bekleniyor...': 'Wartet auf Bild...', 'Piksel yoğunluk histogramı': 'Pixelintensitäts-Histogramm', 'Std / Aralık': 'Std / Bereich', 'Entropi': 'Entropie', 'Görsel yüklendiğinde histogram hesaplanır; ROI hesaplanınca bu alan seçili ROI yoğunluğuna geçer.': 'Das Histogramm wird nach dem Laden eines Bildes berechnet; nach der ROI-Berechnung wechselt dieser Bereich zur Intensität der ausgewählten ROI.',
    'Hazır': 'Bereit', 'DÜŞÜK': 'NIEDRIG', 'ORTA': 'MITTEL', 'YÜKSEK': 'HOCH', 'Yok': 'Keine', 'Evet': 'Ja', 'Hayır': 'Nein', 'Referans': 'Referenz', 'Hedef': 'Ziel', 'Güven': 'Konfidenz', 'Yöntem': 'Methode', 'Referans görsel': 'Referenzbild', 'Hedef görsel': 'Zielbild', 'GÜVEN SKORU': 'KONFIDENZWERT', 'Ortak eşleşme': 'Gemeinsame Treffer', 'Düşük güven': 'Niedrige Konfidenz', 'Güçlü': 'Stark', 'Orta': 'Mittel', 'Zayıf': 'Schwach',
    'Analiz bekleniyor': 'Analyse ausstehend', 'Önizleme yok': 'Keine Vorschau', 'Eşik yok': 'Kein Schwellenwert', 'İskelet yok': 'Kein Skelett', 'Hesaplanmadı': 'Nicht berechnet', 'Bu seçim hesaplanmadı': 'Diese Auswahl wurde nicht berechnet', 'ROI yok': 'Keine ROI', 'Log(Sayı) vs Log(Boyut)': 'Log(Anzahl) vs Log(Größe)', 'Regresyon Hattı': 'Regressionslinie', 'Excel için Kopyala': 'Für Excel kopieren', 'Overlay panelini kapat': 'Overlay-Panel schließen', 'Paneli küçült / büyüt': 'Panel ein-/ausklappen', 'Referans ve hedef görseli yarı saydam üst üste göster': 'Referenz und Ziel halbtransparent überlagern', 'Yeniden adlandırmak için tıkla': 'Zum Umbenennen klicken',
    'Tam görsel': 'Vollbild', 'Tüm fotoğraf': 'Vollbild', 'Analiz edildi': 'Analysiert', 'Analiz bekliyor': 'Analyse ausstehend', 'Çakıştırıldı': 'Abgeglichen', 'Orijinal görsel': 'Originalbild', 'Referans/hizalanmış çalışma uzayı': 'Referenz-/ausgerichteter Arbeitsbereich', 'Orijinal görsel / Referans/hizalanmış çalışma uzayı': 'Originalbild / referenz-ausgerichteter Arbeitsbereich', 'Referans analiz hattı': 'Referenz-Analysepipeline',
    'Kalibrasyon yok; fiziksel mm değerleri boş bırakıldı.': 'Keine Kalibrierung; physische mm-Werte bleiben leer.', 'Başlıklar dahil Excel formatında kopyalandı': 'Im Excel-Format inklusive Kopfzeilen kopiert', 'Kopyalama başarısız. Tarayıcı pano iznini kontrol edin.': 'Kopieren fehlgeschlagen. Prüfen Sie die Zwischenablage-Berechtigung des Browsers.',
    'Dil Türkçe olarak ayarlandı.': 'Sprache auf Türkisch gesetzt.', 'Language set to English.': 'Sprache auf Englisch gesetzt.', 'Dil Almanca olarak ayarlandı.': 'Sprache auf Deutsch gesetzt.',
    'Arayüz olayları bağlanamadı; sayfayı yeniden yükleyin.': 'UI-Ereignisse konnten nicht verbunden werden; laden Sie die Seite neu.', 'Analiz motoru başlatılamadı. Sayfa açık kaldı; lütfen bağlantıyı/OpenCV yüklemesini kontrol edin.': 'Analyse-Engine konnte nicht gestartet werden. Die Seite bleibt offen; prüfen Sie Verbindung/OpenCV-Laden.', 'Analiz motoru oluşturulamadı. Arayüz çalışıyor; hesaplama için sayfayı yeniden yükleyin.': 'Analyse-Engine konnte nicht erstellt werden. Die Oberfläche läuft; laden Sie die Seite für Berechnungen neu.', 'Beklenmeyen işlem hatası oluştu; konsolu kontrol edin.': 'Unerwarteter Vorgangsfehler; prüfen Sie die Konsole.',
    'Yeni ROI eklemek için referans görseli açın. Karşılaştırma modunda ilk görsel referanstır; diğerleri ona hizalanır.': 'Öffnen Sie das Referenzbild, um eine neue ROI hinzuzufügen. Im Vergleichsmodus ist das erste Bild die Referenz; die anderen werden daran ausgerichtet.', 'Karşılaştırma modu: diğer görseller ilk referans görsele hizalanıyor ve aktif ROI kopyalanıyor...': 'Vergleichsmodus: Zielbilder werden am ersten Referenzbild ausgerichtet und die aktive ROI wird kopiert...', 'Hizalama tamamlandı. ROI koordinatları referansa göre güncellendi.': 'Ausrichtung abgeschlossen. ROI-Koordinaten wurden relativ zur Referenz aktualisiert.', 'Aktif ROI yok. Tüm görseller için genel analiz başlatılıyor.': 'Keine aktive ROI. Vollbildanalyse für alle Bilder wird gestartet.', 'Analiz tamamlanamadı:': 'Analyse fehlgeschlagen:'
  };

  // Public release translation hardening: export headers, dynamic statuses and QA labels.
  Object.assign(TR_TO_EN, {
    "Dil se\u00e7imi": "Language selector",
    "Referans G\u00f6rsel": "Reference Image", "G\u00f6rsel": "Image", "ROI Grup": "ROI Group", "ROI Durumu": "ROI Status", "E\u015fle\u015fme G\u00fcveni": "Match Confidence", "\u015eekil": "Shape", "Koordinat Uzay\u0131": "Coordinate Space",
    "Seçilen X": "Selected X", "Seçilen Y": "Selected Y", "Seçilen X": "Selected X", "Seçilen Y": "Selected Y", "Orijinal X": "Original X", "Orijinal Y": "Original Y", "Orijinal W": "Original W", "Orijinal H": "Original H", "Orijinal A\u00e7\u0131": "Original Angle",
    "\u00c7al\u0131\u015fma X": "Workspace X", "\u00c7al\u0131\u015fma Y": "Workspace Y", "\u00c7al\u0131\u015fma W": "Workspace W", "\u00c7al\u0131\u015fma H": "Workspace H", "\u00c7al\u0131\u015fma A\u00e7\u0131": "Workspace Angle", "\u00c7al\u0131\u015fma ROI": "Workspace ROI",
    "Analiz X": "Analysis X", "Analiz Y": "Analysis Y", "Analiz W": "Analysis W", "Analiz H": "Analysis H", "Analiz \u00d6n \u0130\u015flem": "Analysis Preprocessing", "Analiz Preseti": "Analysis Preset",
    "Karma\u015f\u0131kl\u0131k": "Complexity", "Nokta": "Points", "E\u011fim SE": "Slope SE", "Kutu \u00d6l\u00e7ekleri": "Box Scales", "Elenen \u00d6l\u00e7ekler": "Excluded Scales", "G\u00fcvenilirlik": "Reliability", "Uyar\u0131": "Warning",
    "Referans \u00d6n \u0130\u015flemleri": "Reference Preprocessing", "G\u00f6rsel \u0130\u015flemler Sonuca": "Visual Processing Applied", "Siyah-Beyaz G\u00f6r\u00fcn\u00fcm": "Black-and-White Preview", "Otomatik Kontrast": "Auto Contrast", "CLAHE \u00d6nizleme": "CLAHE Preview",
    "\u00c7AKI\u015eTI": "ALIGNED", "REFERANS": "REFERENCE", "B\u0130L\u0130NM\u0130YOR": "UNKNOWN", "Y\u00fcksek": "High", "D\u00fc\u015f\u00fck": "Low", "D\u00fc\u015f\u00fck g\u00fcven": "Low confidence", "Orta g\u00fcven": "Medium confidence", "Y\u00fcksek g\u00fcven": "High confidence", "G\u00fcven: --": "Confidence: --", "Referans: --": "Reference: --", "Y\u00f6ntem: --": "Method: --",
    "Ge\u00e7ti": "Passed", "D\u00fczeltildi": "Adjusted", "Riskli": "Risky", "\u0130ncele": "Review", "evet": "yes", "hay\u0131r": "no", "hayir": "no",
    "G\u00f6rsel histogram\u0131": "Image histogram", "G\u00f6r\u00fcnen/analiz \u00f6nizleme histogram\u0131": "Visible/analysis preview histogram", "Ham g\u00f6r\u00fcnt\u00fc": "Raw image", "ham g\u00f6r\u00fcnt\u00fc": "raw image", "Referansa \u00e7ak\u0131\u015ft\u0131r\u0131ld\u0131": "Aligned to reference", "Referans/hizalanm\u0131\u015f uzay": "Reference/aligned space",
    "Tek g\u00f6rsel analiz": "Single-image analysis", "Kar\u015f\u0131la\u015ft\u0131rma": "Comparison", "Referans (ilk g\u00f6rsel)": "Reference (first image)", "Referansa hizalanan g\u00f6rsel": "Image aligned to reference", "ROI bu g\u00f6rsel \u00fczerinde hesaplan\u0131r.": "ROI is calculated on this image.", "\u0130lk g\u00f6rsel referanst\u0131r; di\u011fer g\u00f6rseller Hizala/Hesapla ile referansa \u00e7ak\u0131\u015ft\u0131r\u0131l\u0131r.": "The first image is the reference; other images are aligned to it with Align/Calculate.",
    "1 g\u00f6rsel y\u00fcklendi. Tek g\u00f6rsel analiz modundas\u0131n\u0131z; ROI ekleyip Hesapla\u2019ya bas\u0131n.": "1 image loaded. You are in single-image analysis mode; add an ROI and click Calculate.", "Tek g\u00f6rsel analiz modundas\u0131n\u0131z; hizalama gerekmiyor. ROI ekleyip Hesapla\u2019ya basabilirsiniz.": "You are in single-image analysis mode; alignment is not required. You can add an ROI and click Calculate.",
    "Analiz i\u00e7in en az 1 r\u00f6ntgen dosyas\u0131 se\u00e7in.": "Select at least 1 radiograph file for analysis.", "Hesaplama i\u00e7in \u00f6nce en az 1 g\u00f6rsel y\u00fckleyin.": "Load at least 1 image before calculation.", "Hizalama i\u00e7in \u00f6nce en az 1 g\u00f6rsel y\u00fckleyin.": "Load at least 1 image before alignment.", "Kar\u015f\u0131la\u015ft\u0131rma i\u00e7in en az iki g\u00f6rsel y\u00fckleyin.": "Load at least two images for comparison.", "G\u00f6rsellerden biri y\u00fcklenemedi. L\u00fctfen desteklenen r\u00f6ntgen dosyalar\u0131 se\u00e7in.": "One of the images could not be loaded. Please choose supported radiograph files.", "G\u00f6rsel yok": "No image", "Analiz kaynak g\u00f6rseli haz\u0131r de\u011fil.": "The analysis source image is not ready.",
    "Aktif ROI di\u011fer g\u00f6rsellere hizaland\u0131. Gerekirse d\u00fczeltip Hesapla'ya bas\u0131n.": "The active ROI was aligned to the other images. Adjust if needed, then click Calculate.", "Aktif ROI i\u00e7in t\u00fcm \u00f6l\u00e7\u00fcmler hesaplan\u0131yor...": "All measurements are being calculated for the active ROI...", "ROI yok: t\u00fcm foto\u011fraf i\u00e7in \u00f6l\u00e7\u00fcmler hesaplan\u0131yor...": "No ROI: measurements are being calculated for the full image...", "ROI ayarland\u0131. Sonu\u00e7lar\u0131 \u00fcretmek i\u00e7in Hesapla'ya bas\u0131n.": "ROI has been adjusted. Click Calculate to produce results.",
    "Kalibrasyon de\u011fi\u015fti. Fiziksel mm de\u011ferleri i\u00e7in Hesapla'ya bas\u0131n.": "Calibration changed. Click Calculate for physical mm values.", "Referans g\u00f6rsel g\u00fcncellendi. Yeni hizalama i\u00e7in Hesapla'ya bas\u0131n.": "Reference image updated. Click Calculate for a new alignment.", "Hizalamak i\u00e7in bir ROI se\u00e7in.": "Select an ROI to align.", "Hizalama ba\u015flat\u0131lamad\u0131.": "Alignment could not be started.", "Hizalama hatas\u0131:": "Alignment error:", "Hizalama zaman a\u015f\u0131m\u0131; \u00f6l\u00e7ek tabanl\u0131 g\u00fcvenli yedek kullan\u0131ld\u0131.": "Alignment timed out; scale-based safe fallback was used.", "Homografi \u00fcretilemedi": "Homography could not be produced", "RANSAC i\u00e7in yeterli e\u015fle\u015fme yok": "Not enough matches for RANSAC", "Yeterli ortak \u00f6zellik noktas\u0131 yok": "Not enough shared feature points",
    "Overlay i\u00e7in en az 2 g\u00f6rsel gerekir.": "Overlay requires at least 2 images.", "Overlay i\u00e7in referans + hedef g\u00f6rsel bekleniyor": "Waiting for reference + target image for overlay", "Bu hedef hen\u00fcz referansa hizalanmam\u0131\u015f; overlay ham hedefi g\u00f6steriyor. Daha do\u011fru kontrol i\u00e7in \u00f6nce Hizala\u2019ya bas\u0131n.": "This target has not been aligned to the reference yet; the overlay shows the raw target. For a more accurate check, click Align first.",
    "Hedef g\u00f6rsel referans koordinat\u0131na \u00e7ak\u0131\u015ft\u0131r\u0131lm\u0131\u015f halde bindirildi. Anatomik kenarlar \u00fcst \u00fcste gelmiyorsa ROI\u2019yi elle d\u00fczeltin.": "The target image is overlaid after alignment to the reference coordinate space. If anatomical edges do not overlap, adjust the ROI manually.", "Se\u00e7ili ROI b\u00fcy\u00fct\u00fclerek bindirildi. Camg\u00f6be\u011fi referans, yar\u0131 saydam katman hedef ROI\u2019dir; piksel/kontur kaymas\u0131n\u0131 buradan kontrol edin.": "The selected ROI is enlarged and overlaid. Cyan is the reference, the translucent layer is the target ROI; check pixel/contour drift here.", "Se\u00e7ili ROI b\u00fcy\u00fct\u00fclm\u00fc\u015f halde g\u00f6steriliyor; hedef hen\u00fcz referansa hizalanmam\u0131\u015fsa \u00f6nce Hizala\u2019ya bas\u0131n.": "The selected ROI is shown enlarged; if the target is not aligned yet, click Align first.",
    "Se\u00e7ili g\u00f6rsel/ROI i\u00e7in i\u015flem hatt\u0131 bekliyor. Hesapla'ya bas\u0131n.": "The pipeline is waiting for the selected image/ROI. Click Calculate.", "Referans analiz hatt\u0131 bekleniyor": "Waiting for reference analysis pipeline", "\u00d6n i\u015flemler kapal\u0131": "Preprocessing disabled", "Python referans FD": "Python reference FD", "Python uyumlu kutu say\u0131m\u0131": "Python-compatible box counting", "Python referans FD + FD d\u0131\u015f\u0131 metrik/\u00f6nizleme": "Python reference FD + non-FD metric/preview", "Index2 referans FD: g\u00f6rsel ayarlar\u0131 fraktal hesab\u0131ndan ayr\u0131 tutulur": "Index2 reference FD: visual settings are kept separate from fractal calculation", "sabit referans ad\u0131mlar\u0131": "fixed reference steps", "kutu say\u0131m\u0131": "box counting", "Otsu e\u015fikleme": "Otsu thresholding", "ham Otsu e\u015fikleme": "raw Otsu thresholding", "Gaussian arka plan \u00e7\u0131karma": "Gaussian background subtraction", "negatif k\u0131rpma + 128 uint8": "negative clipping + 128 uint8",
    "metrik/\u00f6nizleme: 8-bit veri korunumu (FD d\u0131\u015f\u0131)": "metric/preview: 8-bit data preservation (non-FD)", "metrik/\u00f6nizleme: gri skala (FD d\u0131\u015f\u0131)": "metric/preview: grayscale (non-FD)", "metrik/\u00f6nizleme: otomatik kontrast (FD d\u0131\u015f\u0131)": "metric/preview: auto contrast (non-FD)", "metrik/\u00f6nizleme: CLAHE (FD d\u0131\u015f\u0131)": "metric/preview: CLAHE (non-FD)",
    "Analiz ba\u015flat\u0131lamad\u0131. ROI ve g\u00f6rsel s\u0131n\u0131rlar\u0131 kontrol edildi.": "Analysis could not be started. ROI and image boundaries were checked.", "Analiz haz\u0131rlama hatas\u0131:": "Analysis preparation error:", "Hesaplama ba\u015flat\u0131lamad\u0131.": "Calculation could not be started.", "Hesaplama hatas\u0131:": "Calculation error:", "Hesaplan\u0131yor": "Calculating", "Analiz Hatas\u0131": "Analysis Error", "Worker Hatas\u0131:": "Worker Error:", "Worker ba\u015flatma hatas\u0131:": "Worker startup error:", "Worker olu\u015fturulamad\u0131:": "Worker could not be created:", "Uygulama hatas\u0131:": "Application error:", "Yakalanmam\u0131\u015f i\u015flem hatas\u0131:": "Uncaught operation error:", "Aray\u00fcz olaylar\u0131 ba\u011flanamad\u0131:": "UI events could not be attached:", "OpenCV y\u00fcklenemedi veya zaman a\u015f\u0131m\u0131na u\u011frad\u0131.": "OpenCV could not load or timed out.", "OpenCV kay\u0131t hatt\u0131 ba\u015flat\u0131lamad\u0131": "OpenCV registration pipeline could not start", "OpenCV.js feature/homography API yok": "OpenCV.js feature/homography API is unavailable",
    "Otomatik ayarlar s\u0131f\u0131rland\u0131": "Automatic settings reset", "Otomatik ayar hatas\u0131:": "Automatic setting error:", "Otomatik ayar uygulanamad\u0131; \u00e7al\u0131\u015fma korunuyor.": "Automatic setting could not be applied; current work is preserved.", "\u00d6nizleme ayar\u0131 uygulanamad\u0131.": "Preview setting could not be applied.", "\u00d6nizleme filtresi hatas\u0131:": "Preview filter error:", "Grafik kurulumu atland\u0131:": "Chart setup skipped:", "S\u00fcr\u00fcklenebilir panel kurulumu atland\u0131:": "Draggable panel setup skipped:", "Ayarlar taray\u0131c\u0131da saklanamad\u0131:": "Settings could not be saved in the browser:", "Varsay\u0131lan ayarlar saklanamad\u0131:": "Default settings could not be saved:", "ROI boyutu taray\u0131c\u0131da saklanamad\u0131:": "ROI size could not be saved in the browser:", "Kopyalama hatas\u0131:": "Copy error:", "Kopyalama izni al\u0131namad\u0131": "Copy permission was not granted", "Kay\u0131t hatas\u0131": "Registration error",
    "B\u00f6lge ismini de\u011fi\u015ftir:": "Rename region:", "Se\u00e7ili ROI": "Selected ROI", "ROI verisi yok": "No ROI data", "\u00d6l\u00e7\u00fcm bekliyor": "Waiting for measurement", "Ge\u00e7erli piksel bulunamad\u0131.": "No valid pixel found.", "Regresyon i\u00e7in yeterli ge\u00e7erli \u00f6l\u00e7ek bulunamad\u0131.": "Not enough valid scales for regression.", "Regresyonda 4 adetten az ge\u00e7erli \u00f6l\u00e7ek var.": "Regression has fewer than 4 valid scales.", "R\u00b2 0.95 alt\u0131nda; log-log uyumu zay\u0131f.": "R\u00b2 is below 0.95; log-log fit is weak.", "E\u011fim standart hatas\u0131 y\u00fcksek; sonu\u00e7 dikkatle yorumlanmal\u0131.": "Slope standard error is high; interpret the result carefully.", "ROI k\u0131sa kenar\u0131 64 px alt\u0131nda; FD de\u011feri k\u00fc\u00e7\u00fck \u00f6rneklem nedeniyle yan\u0131lt\u0131c\u0131 olabilir.": "The ROI short edge is below 64 px; FD may be misleading due to small sample size.", "E\u015fle\u015fme g\u00fcveni d\u00fc\u015f\u00fck; ROI elle kontrol edilmeli": "Match confidence is low; ROI should be checked manually", "Lokal ROI d\u00fczeltmesi reddedildi; global hizalama kullan\u0131ld\u0131": "Local ROI correction was rejected; global alignment was used",
    "Histogram i\u00e7in \u00f6nce bir g\u00f6rsel veya ROI gerekli.": "An image or ROI is required before histogram calculation.", "Histogram bilgisi d\u00fc\u015f\u00fck; \u00e7ok d\u00fcz/tekd\u00fcze alan olabilir.": "Histogram information is low; the region may be too flat/uniform.", "Dinamik aral\u0131k dar; kontrast d\u00fc\u015f\u00fck olabilir.": "Dynamic range is narrow; contrast may be low.", "G\u00f6r\u00fcnt\u00fc koyu b\u00f6lgede yo\u011funla\u015f\u0131yor.": "The image is concentrated in dark tones.", "G\u00f6r\u00fcnt\u00fc parlak b\u00f6lgede yo\u011funla\u015f\u0131yor.": "The image is concentrated in bright tones.", "Gri de\u011fer da\u011f\u0131l\u0131m\u0131 homojen; doku ayr\u0131m\u0131 zay\u0131f g\u00f6r\u00fcnebilir.": "Gray-value distribution is homogeneous; tissue separation may appear weak.", "Siyah/beyaz u\u00e7larda k\u0131rp\u0131lma var.": "There is clipping at black/white extremes.", "Pozlama ve gri de\u011fer da\u011f\u0131l\u0131m\u0131 analiz i\u00e7in dengeli g\u00f6r\u00fcn\u00fcyor.": "Exposure and gray-value distribution look balanced for analysis.", "ROI piksel uzay\u0131": "ROI pixel space"
  });
  Object.assign(TR_TO_DE, {
    "Dil se\u00e7imi": "Sprachauswahl",
    "Referans G\u00f6rsel": "Referenzbild", "G\u00f6rsel": "Bild", "ROI Grup": "ROI-Gruppe", "ROI Durumu": "ROI-Status", "E\u015fle\u015fme G\u00fcveni": "Abgleich-Konfidenz", "\u015eekil": "Form", "Koordinat Uzay\u0131": "Koordinatenraum",
    "Seçilen X": "Auswahl X", "Seçilen Y": "Auswahl Y", "Seçilen X": "Auswahl X", "Seçilen Y": "Auswahl Y", "Orijinal X": "Original X", "Orijinal Y": "Original Y", "Orijinal W": "Original B", "Orijinal H": "Original H", "Orijinal A\u00e7\u0131": "Originalwinkel",
    "\u00c7al\u0131\u015fma X": "Arbeitsbereich X", "\u00c7al\u0131\u015fma Y": "Arbeitsbereich Y", "\u00c7al\u0131\u015fma W": "Arbeitsbereich B", "\u00c7al\u0131\u015fma H": "Arbeitsbereich H", "\u00c7al\u0131\u015fma A\u00e7\u0131": "Arbeitsbereich Winkel", "\u00c7al\u0131\u015fma ROI": "Arbeitsbereich-ROI",
    "Analiz X": "Analyse X", "Analiz Y": "Analyse Y", "Analiz W": "Analyse B", "Analiz H": "Analyse H", "Analiz \u00d6n \u0130\u015flem": "Analyse-Vorverarbeitung", "Analiz Preseti": "Analyse-Voreinstellung",
    "Karma\u015f\u0131kl\u0131k": "Komplexit\u00e4t", "Nokta": "Punkte", "E\u011fim SE": "Steigungs-SE", "Kutu \u00d6l\u00e7ekleri": "Box-Skalen", "Elenen \u00d6l\u00e7ekler": "Ausgeschlossene Skalen", "G\u00fcvenilirlik": "Zuverl\u00e4ssigkeit", "Uyar\u0131": "Warnung",
    "Referans \u00d6n \u0130\u015flemleri": "Referenz-Vorverarbeitung", "G\u00f6rsel \u0130\u015flemler Sonuca": "Bildverarbeitung angewendet", "Siyah-Beyaz G\u00f6r\u00fcn\u00fcm": "Schwarzwei\u00df-Vorschau", "Otomatik Kontrast": "Automatischer Kontrast", "CLAHE \u00d6nizleme": "CLAHE-Vorschau",
    "\u00c7AKI\u015eTI": "AUSGERICHTET", "REFERANS": "REFERENZ", "B\u0130L\u0130NM\u0130YOR": "UNBEKANNT", "Y\u00fcksek": "Hoch", "D\u00fc\u015f\u00fck": "Niedrig", "D\u00fc\u015f\u00fck g\u00fcven": "Niedrige Konfidenz", "Orta g\u00fcven": "Mittlere Konfidenz", "Y\u00fcksek g\u00fcven": "Hohe Konfidenz", "G\u00fcven: --": "Konfidenz: --", "Referans: --": "Referenz: --", "Y\u00f6ntem: --": "Methode: --",
    "Ge\u00e7ti": "Bestanden", "D\u00fczeltildi": "Angepasst", "Riskli": "Risikobehaftet", "\u0130ncele": "Pr\u00fcfen", "evet": "ja", "hay\u0131r": "nein", "hayir": "nein",
    "G\u00f6rsel histogram\u0131": "Bildhistogramm", "G\u00f6r\u00fcnen/analiz \u00f6nizleme histogram\u0131": "Sichtbares/Analyse-Vorschauhistogramm", "Ham g\u00f6r\u00fcnt\u00fc": "Rohbild", "ham g\u00f6r\u00fcnt\u00fc": "Rohbild", "Referansa \u00e7ak\u0131\u015ft\u0131r\u0131ld\u0131": "An Referenz ausgerichtet", "Referans/hizalanm\u0131\u015f uzay": "Referenz-/ausgerichteter Raum",
    "Tek g\u00f6rsel analiz": "Einzelbildanalyse", "Kar\u015f\u0131la\u015ft\u0131rma": "Vergleich", "Referans (ilk g\u00f6rsel)": "Referenz (erstes Bild)", "Referansa hizalanan g\u00f6rsel": "An Referenz ausgerichtetes Bild", "ROI bu g\u00f6rsel \u00fczerinde hesaplan\u0131r.": "Die ROI wird auf diesem Bild berechnet.", "\u0130lk g\u00f6rsel referanst\u0131r; di\u011fer g\u00f6rseller Hizala/Hesapla ile referansa \u00e7ak\u0131\u015ft\u0131r\u0131l\u0131r.": "Das erste Bild ist die Referenz; andere Bilder werden mit Ausrichten/Berechnen daran ausgerichtet.",
    "1 g\u00f6rsel y\u00fcklendi. Tek g\u00f6rsel analiz modundas\u0131n\u0131z; ROI ekleyip Hesapla\u2019ya bas\u0131n.": "1 Bild geladen. Sie befinden sich im Einzelbild-Analysemodus; f\u00fcgen Sie eine ROI hinzu und klicken Sie auf Berechnen.", "Tek g\u00f6rsel analiz modundas\u0131n\u0131z; hizalama gerekmiyor. ROI ekleyip Hesapla\u2019ya basabilirsiniz.": "Sie befinden sich im Einzelbild-Analysemodus; Ausrichtung ist nicht erforderlich. Sie k\u00f6nnen eine ROI hinzuf\u00fcgen und Berechnen klicken.",
    "Analiz i\u00e7in en az 1 r\u00f6ntgen dosyas\u0131 se\u00e7in.": "W\u00e4hlen Sie mindestens 1 R\u00f6ntgendatei f\u00fcr die Analyse.", "Hesaplama i\u00e7in \u00f6nce en az 1 g\u00f6rsel y\u00fckleyin.": "Laden Sie vor der Berechnung mindestens 1 Bild.", "Hizalama i\u00e7in \u00f6nce en az 1 g\u00f6rsel y\u00fckleyin.": "Laden Sie vor der Ausrichtung mindestens 1 Bild.", "Kar\u015f\u0131la\u015ft\u0131rma i\u00e7in en az iki g\u00f6rsel y\u00fckleyin.": "Laden Sie mindestens zwei Bilder f\u00fcr den Vergleich.", "G\u00f6rsellerden biri y\u00fcklenemedi. L\u00fctfen desteklenen r\u00f6ntgen dosyalar\u0131 se\u00e7in.": "Eines der Bilder konnte nicht geladen werden. Bitte w\u00e4hlen Sie unterst\u00fctzte R\u00f6ntgendateien.", "G\u00f6rsel yok": "Kein Bild", "Analiz kaynak g\u00f6rseli haz\u0131r de\u011fil.": "Das Quellbild f\u00fcr die Analyse ist nicht bereit.",
    "Aktif ROI di\u011fer g\u00f6rsellere hizaland\u0131. Gerekirse d\u00fczeltip Hesapla'ya bas\u0131n.": "Die aktive ROI wurde an die anderen Bilder angepasst. Bei Bedarf korrigieren und Berechnen klicken.", "Aktif ROI i\u00e7in t\u00fcm \u00f6l\u00e7\u00fcmler hesaplan\u0131yor...": "Alle Messungen f\u00fcr die aktive ROI werden berechnet...", "ROI yok: t\u00fcm foto\u011fraf i\u00e7in \u00f6l\u00e7\u00fcmler hesaplan\u0131yor...": "Keine ROI: Messungen werden f\u00fcr das gesamte Bild berechnet...", "ROI ayarland\u0131. Sonu\u00e7lar\u0131 \u00fcretmek i\u00e7in Hesapla'ya bas\u0131n.": "ROI wurde angepasst. Klicken Sie auf Berechnen, um Ergebnisse zu erzeugen.",
    "Kalibrasyon de\u011fi\u015fti. Fiziksel mm de\u011ferleri i\u00e7in Hesapla'ya bas\u0131n.": "Kalibrierung ge\u00e4ndert. Klicken Sie auf Berechnen f\u00fcr physische mm-Werte.", "Referans g\u00f6rsel g\u00fcncellendi. Yeni hizalama i\u00e7in Hesapla'ya bas\u0131n.": "Referenzbild aktualisiert. Klicken Sie auf Berechnen f\u00fcr eine neue Ausrichtung.", "Hizalamak i\u00e7in bir ROI se\u00e7in.": "W\u00e4hlen Sie eine ROI zum Ausrichten.", "Hizalama ba\u015flat\u0131lamad\u0131.": "Ausrichtung konnte nicht gestartet werden.", "Hizalama hatas\u0131:": "Ausrichtungsfehler:", "Hizalama zaman a\u015f\u0131m\u0131; \u00f6l\u00e7ek tabanl\u0131 g\u00fcvenli yedek kullan\u0131ld\u0131.": "Zeit\u00fcberschreitung bei der Ausrichtung; skalierungsbasierter sicherer Ersatz wurde verwendet.", "Homografi \u00fcretilemedi": "Homographie konnte nicht erzeugt werden", "RANSAC i\u00e7in yeterli e\u015fle\u015fme yok": "Nicht gen\u00fcgend Treffer f\u00fcr RANSAC", "Yeterli ortak \u00f6zellik noktas\u0131 yok": "Nicht gen\u00fcgend gemeinsame Merkmalspunkte",
    "Overlay i\u00e7in en az 2 g\u00f6rsel gerekir.": "Overlay erfordert mindestens 2 Bilder.", "Overlay i\u00e7in referans + hedef g\u00f6rsel bekleniyor": "Warten auf Referenz- und Zielbild f\u00fcr Overlay", "Bu hedef hen\u00fcz referansa hizalanmam\u0131\u015f; overlay ham hedefi g\u00f6steriyor. Daha do\u011fru kontrol i\u00e7in \u00f6nce Hizala\u2019ya bas\u0131n.": "Dieses Ziel wurde noch nicht an die Referenz ausgerichtet; das Overlay zeigt das Rohziel. F\u00fcr eine genauere Pr\u00fcfung zuerst Ausrichten klicken.",
    "Hedef g\u00f6rsel referans koordinat\u0131na \u00e7ak\u0131\u015ft\u0131r\u0131lm\u0131\u015f halde bindirildi. Anatomik kenarlar \u00fcst \u00fcste gelmiyorsa ROI\u2019yi elle d\u00fczeltin.": "Das Zielbild wurde nach Ausrichtung im Referenzkoordinatensystem \u00fcberlagert. Wenn anatomische Kanten nicht deckungsgleich sind, korrigieren Sie die ROI manuell.", "Se\u00e7ili ROI b\u00fcy\u00fct\u00fclerek bindirildi. Camg\u00f6be\u011fi referans, yar\u0131 saydam katman hedef ROI\u2019dir; piksel/kontur kaymas\u0131n\u0131 buradan kontrol edin.": "Die ausgew\u00e4hlte ROI wird vergr\u00f6\u00dfert \u00fcberlagert. Cyan ist die Referenz, die halbtransparente Ebene ist die Ziel-ROI; pr\u00fcfen Sie hier Pixel-/Konturversatz.", "Se\u00e7ili ROI b\u00fcy\u00fct\u00fclm\u00fc\u015f halde g\u00f6steriliyor; hedef hen\u00fcz referansa hizalanmam\u0131\u015fsa \u00f6nce Hizala\u2019ya bas\u0131n.": "Die ausgew\u00e4hlte ROI wird vergr\u00f6\u00dfert angezeigt; wenn das Ziel noch nicht ausgerichtet ist, klicken Sie zuerst auf Ausrichten.",
    "Se\u00e7ili g\u00f6rsel/ROI i\u00e7in i\u015flem hatt\u0131 bekliyor. Hesapla'ya bas\u0131n.": "Die Pipeline wartet auf das ausgew\u00e4hlte Bild/die ROI. Klicken Sie auf Berechnen.", "Referans analiz hatt\u0131 bekleniyor": "Warten auf Referenz-Analysepipeline", "\u00d6n i\u015flemler kapal\u0131": "Vorverarbeitung deaktiviert", "Python referans FD": "Python-Referenz-FD", "Python uyumlu kutu say\u0131m\u0131": "Python-kompatibles Box-Counting", "Python referans FD + FD d\u0131\u015f\u0131 metrik/\u00f6nizleme": "Python-Referenz-FD + Nicht-FD-Metrik/Vorschau", "Index2 referans FD: g\u00f6rsel ayarlar\u0131 fraktal hesab\u0131ndan ayr\u0131 tutulur": "Index2-Referenz-FD: Bildeinstellungen werden von der Fraktalberechnung getrennt gehalten", "sabit referans ad\u0131mlar\u0131": "feste Referenzschritte", "kutu say\u0131m\u0131": "Box-Counting", "Otsu e\u015fikleme": "Otsu-Schwellenwert", "ham Otsu e\u015fikleme": "rohe Otsu-Schwellenwertbildung", "Gaussian arka plan \u00e7\u0131karma": "Gau\u00dfscher Hintergrundabzug", "negatif k\u0131rpma + 128 uint8": "negatives Clipping + 128 uint8",
    "metrik/\u00f6nizleme: 8-bit veri korunumu (FD d\u0131\u015f\u0131)": "Metrik/Vorschau: 8-Bit-Datenerhalt (nicht FD)", "metrik/\u00f6nizleme: gri skala (FD d\u0131\u015f\u0131)": "Metrik/Vorschau: Graustufen (nicht FD)", "metrik/\u00f6nizleme: otomatik kontrast (FD d\u0131\u015f\u0131)": "Metrik/Vorschau: automatischer Kontrast (nicht FD)", "metrik/\u00f6nizleme: CLAHE (FD d\u0131\u015f\u0131)": "Metrik/Vorschau: CLAHE (nicht FD)",
    "Analiz ba\u015flat\u0131lamad\u0131. ROI ve g\u00f6rsel s\u0131n\u0131rlar\u0131 kontrol edildi.": "Analyse konnte nicht gestartet werden. ROI- und Bildgrenzen wurden gepr\u00fcft.", "Analiz haz\u0131rlama hatas\u0131:": "Fehler bei der Analysevorbereitung:", "Hesaplama ba\u015flat\u0131lamad\u0131.": "Berechnung konnte nicht gestartet werden.", "Hesaplama hatas\u0131:": "Berechnungsfehler:", "Hesaplan\u0131yor": "Berechnung l\u00e4uft", "Analiz Hatas\u0131": "Analysefehler", "Worker Hatas\u0131:": "Worker-Fehler:", "Worker ba\u015flatma hatas\u0131:": "Worker-Startfehler:", "Worker olu\u015fturulamad\u0131:": "Worker konnte nicht erstellt werden:", "Uygulama hatas\u0131:": "Anwendungsfehler:", "Yakalanmam\u0131\u015f i\u015flem hatas\u0131:": "Nicht abgefangener Vorgangsfehler:", "Aray\u00fcz olaylar\u0131 ba\u011flanamad\u0131:": "UI-Ereignisse konnten nicht verbunden werden:", "OpenCV y\u00fcklenemedi veya zaman a\u015f\u0131m\u0131na u\u011frad\u0131.": "OpenCV konnte nicht geladen werden oder Zeit\u00fcberschreitung.", "OpenCV kay\u0131t hatt\u0131 ba\u015flat\u0131lamad\u0131": "OpenCV-Registrierungspipeline konnte nicht gestartet werden", "OpenCV.js feature/homography API yok": "OpenCV.js-Feature/Homographie-API ist nicht verf\u00fcgbar",
    "Otomatik ayarlar s\u0131f\u0131rland\u0131": "Automatische Einstellungen zur\u00fcckgesetzt", "Otomatik ayar hatas\u0131:": "Fehler bei automatischer Einstellung:", "Otomatik ayar uygulanamad\u0131; \u00e7al\u0131\u015fma korunuyor.": "Automatische Einstellung konnte nicht angewendet werden; aktueller Stand bleibt erhalten.", "\u00d6nizleme ayar\u0131 uygulanamad\u0131.": "Vorschaueinstellung konnte nicht angewendet werden.", "\u00d6nizleme filtresi hatas\u0131:": "Vorschau-Filterfehler:", "Grafik kurulumu atland\u0131:": "Diagrammeinrichtung \u00fcbersprungen:", "S\u00fcr\u00fcklenebilir panel kurulumu atland\u0131:": "Einrichtung des ziehbaren Panels \u00fcbersprungen:", "Ayarlar taray\u0131c\u0131da saklanamad\u0131:": "Einstellungen konnten im Browser nicht gespeichert werden:", "Varsay\u0131lan ayarlar saklanamad\u0131:": "Standardeinstellungen konnten nicht gespeichert werden:", "ROI boyutu taray\u0131c\u0131da saklanamad\u0131:": "ROI-Gr\u00f6\u00dfe konnte im Browser nicht gespeichert werden:", "Kopyalama hatas\u0131:": "Kopierfehler:", "Kopyalama izni al\u0131namad\u0131": "Kopierberechtigung wurde nicht erteilt", "Kay\u0131t hatas\u0131": "Registrierungsfehler",
    "B\u00f6lge ismini de\u011fi\u015ftir:": "Region umbenennen:", "Se\u00e7ili ROI": "Ausgew\u00e4hlte ROI", "ROI verisi yok": "Keine ROI-Daten", "\u00d6l\u00e7\u00fcm bekliyor": "Warten auf Messung", "Ge\u00e7erli piksel bulunamad\u0131.": "Kein g\u00fcltiges Pixel gefunden.", "Regresyon i\u00e7in yeterli ge\u00e7erli \u00f6l\u00e7ek bulunamad\u0131.": "Nicht gen\u00fcgend g\u00fcltige Skalen f\u00fcr Regression.", "Regresyonda 4 adetten az ge\u00e7erli \u00f6l\u00e7ek var.": "Regression enth\u00e4lt weniger als 4 g\u00fcltige Skalen.", "R\u00b2 0.95 alt\u0131nda; log-log uyumu zay\u0131f.": "R\u00b2 liegt unter 0,95; Log-Log-Anpassung ist schwach.", "E\u011fim standart hatas\u0131 y\u00fcksek; sonu\u00e7 dikkatle yorumlanmal\u0131.": "Standardfehler der Steigung ist hoch; Ergebnis vorsichtig interpretieren.", "ROI k\u0131sa kenar\u0131 64 px alt\u0131nda; FD de\u011feri k\u00fc\u00e7\u00fck \u00f6rneklem nedeniyle yan\u0131lt\u0131c\u0131 olabilir.": "Die kurze ROI-Kante liegt unter 64 px; FD kann wegen kleiner Stichprobe irref\u00fchrend sein.", "E\u015fle\u015fme g\u00fcveni d\u00fc\u015f\u00fck; ROI elle kontrol edilmeli": "Abgleich-Konfidenz ist niedrig; ROI sollte manuell gepr\u00fcft werden", "Lokal ROI d\u00fczeltmesi reddedildi; global hizalama kullan\u0131ld\u0131": "Lokale ROI-Korrektur wurde verworfen; globale Ausrichtung verwendet",
    "Histogram i\u00e7in \u00f6nce bir g\u00f6rsel veya ROI gerekli.": "F\u00fcr das Histogramm ist zuerst ein Bild oder eine ROI erforderlich.", "Histogram bilgisi d\u00fc\u015f\u00fck; \u00e7ok d\u00fcz/tekd\u00fcze alan olabilir.": "Histogramminformation ist gering; der Bereich kann zu flach/einheitlich sein.", "Dinamik aral\u0131k dar; kontrast d\u00fc\u015f\u00fck olabilir.": "Der Dynamikbereich ist eng; der Kontrast kann niedrig sein.", "G\u00f6r\u00fcnt\u00fc koyu b\u00f6lgede yo\u011funla\u015f\u0131yor.": "Das Bild konzentriert sich in dunklen Tonwerten.", "G\u00f6r\u00fcnt\u00fc parlak b\u00f6lgede yo\u011funla\u015f\u0131yor.": "Das Bild konzentriert sich in hellen Tonwerten.", "Gri de\u011fer da\u011f\u0131l\u0131m\u0131 homojen; doku ayr\u0131m\u0131 zay\u0131f g\u00f6r\u00fcnebilir.": "Grauwertverteilung ist homogen; Gewebetrennung kann schwach wirken.", "Siyah/beyaz u\u00e7larda k\u0131rp\u0131lma var.": "An Schwarz-/Wei\u00df-Enden liegt Clipping vor.", "Pozlama ve gri de\u011fer da\u011f\u0131l\u0131m\u0131 analiz i\u00e7in dengeli g\u00f6r\u00fcn\u00fcyor.": "Belichtung und Grauwertverteilung wirken f\u00fcr die Analyse ausgewogen.", "ROI piksel uzay\u0131": "ROI-Pixelraum"
  });


  // Public release translation completion: static UI, dynamic labels and export headers.
  Object.assign(TR_TO_EN, {
    "Mean Gray":"Mean Gray", "Median":"Median", "Std Dev":"Std Dev", "Lacunarity":"Lacunarity", "Tb.Th / Tb.Sp":"Tb.Th / Tb.Sp", "Mean / Median":"Mean / Median", "Clipping":"Clipping", "P5 - P95":"P5 - P95", "Otsu":"Otsu", "R\u00b2":"R\u00b2", "ROI":"ROI", "px":"px",
    "DOSYA":"FILE", "\u00c7\u00d6Z\u00dcN\u00dcRL\u00dcK":"RESOLUTION", "BOYUT":"SIZE", "T\u0130P":"TYPE", "H\u0130ZALAMA":"ALIGNMENT", "MOD":"MODE", "ROL":"ROLE", "AKI\u015e":"FLOW", "E\u015eLE\u015eME":"MATCH", "H\u0130ZALAMA G\u00dcVEN\u0130":"ALIGNMENT CONFIDENCE", "\u0130\u00c7ER\u0130K SKORU":"CONTENT SCORE", "\u00d6ZELL\u0130K Y\u00d6NTEM\u0130":"FEATURE METHOD",
    "DOSYA:":"FILE:", "\u00c7\u00d6Z\u00dcN\u00dcRL\u00dcK:":"RESOLUTION:", "BOYUT:":"SIZE:", "T\u0130P:":"TYPE:", "H\u0130ZALAMA:":"ALIGNMENT:", "MOD:":"MODE:", "ROL:":"ROLE:", "AKI\u015e:":"FLOW:", "E\u015eLE\u015eME:":"MATCH:", "H\u0130ZALAMA G\u00dcVEN\u0130:":"ALIGNMENT CONFIDENCE:", "\u0130\u00c7ER\u0130K SKORU:":"CONTENT SCORE:", "\u00d6ZELL\u0130K Y\u00d6NTEM\u0130:":"FEATURE METHOD:",
    "aday":"candidate", "kullan\u0131lan":"used", "uyar\u0131":"warning", "inlier":"inlier", "G":"C", "Ref":"Ref",
    "G\u00f6rsel i\u015flemler sonuca uygulanacak":"Visual processing will be applied to results", "Mod":"Mode", "Export kolon kontrol\u00fc":"Export column check", "Orijinal ROI":"Original ROI",
    "Hedef: --":"Target: --", "G\u00fcven: --":"Confidence: --", "Y\u00f6ntem: --":"Method: --", "E\u015fle\u015fme: --":"Match: --", "ROI Min":"ROI Min", "ImageJ-compatible":"ImageJ-compatible",
    "Area px\u00b2":"Area px\u00b2", "Area mm\u00b2":"Area mm\u00b2", "Perimeter px":"Perimeter px", "Perimeter mm":"Perimeter mm", "Feret px":"Feret px", "Feret mm":"Feret mm", "MinFeret px":"MinFeret px", "MinFeret mm":"MinFeret mm",
    "Bounding Width px":"Bounding Width px", "Bounding Height px":"Bounding Height px", "Bounding Width mm":"Bounding Width mm", "Bounding Height mm":"Bounding Height mm",
    "Fit Ellipse Major px":"Fit Ellipse Major px", "Fit Ellipse Minor px":"Fit Ellipse Minor px", "Fit Ellipse Major mm":"Fit Ellipse Major mm", "Fit Ellipse Minor mm":"Fit Ellipse Minor mm", "Ellipse Angle":"Ellipse Angle",
    "Circularity":"Circularity", "Roundness":"Roundness", "Solidity":"Solidity", "Aspect Ratio":"Aspect Ratio", "Standard Deviation":"Standard Deviation", "Skewness":"Skewness", "Kurtosis":"Kurtosis", "Area Fraction %":"Area Fraction %",
    "Centroid X":"Centroid X", "Centroid Y":"Centroid Y", "Center of Mass X":"Center of Mass X", "Center of Mass Y":"Center of Mass Y", "Stack Position":"Stack Position", "Otsu Threshold":"Otsu Threshold",
    "Trabecular Thickness px":"Trabecular Thickness px", "Trabecular Thickness mm":"Trabecular Thickness mm", "Trabecular Separation px":"Trabecular Separation px", "Trabecular Separation mm":"Trabecular Separation mm"
  });
  Object.assign(TR_TO_DE, {
    "Mean Gray":"Mittlerer Grauwert", "Median":"Median", "Std Dev":"Std.-Abw.", "Lacunarity":"Lacunarit\u00e4t", "Tb.Th / Tb.Sp":"Tb.Th / Tb.Sp", "Mean / Median":"Mittelwert / Median", "Clipping":"Clipping", "P5 - P95":"P5 - P95", "Otsu":"Otsu", "R\u00b2":"R\u00b2", "ROI":"ROI", "px":"px",
    "DOSYA":"DATEI", "\u00c7\u00d6Z\u00dcN\u00dcRL\u00dcK":"AUFL\u00d6SUNG", "BOYUT":"GR\u00d6SSE", "T\u0130P":"TYP", "H\u0130ZALAMA":"AUSRICHTUNG", "MOD":"MODUS", "ROL":"ROLLE", "AKI\u015e":"ABLAUF", "E\u015eLE\u015eME":"ABGLEICH", "H\u0130ZALAMA G\u00dcVEN\u0130":"AUSRICHTUNGS-KONFIDENZ", "\u0130\u00c7ER\u0130K SKORU":"INHALTSSCORE", "\u00d6ZELL\u0130K Y\u00d6NTEM\u0130":"MERKMALSMETHODE",
    "DOSYA:":"DATEI:", "\u00c7\u00d6Z\u00dcN\u00dcRL\u00dcK:":"AUFL\u00d6SUNG:", "BOYUT:":"GR\u00d6SSE:", "T\u0130P:":"TYP:", "H\u0130ZALAMA:":"AUSRICHTUNG:", "MOD:":"MODUS:", "ROL:":"ROLLE:", "AKI\u015e:":"ABLAUF:", "E\u015eLE\u015eME:":"ABGLEICH:", "H\u0130ZALAMA G\u00dcVEN\u0130:":"AUSRICHTUNGS-KONFIDENZ:", "\u0130\u00c7ER\u0130K SKORU:":"INHALTSSCORE:", "\u00d6ZELL\u0130K Y\u00d6NTEM\u0130:":"MERKMALSMETHODE:",
    "aday":"Kandidaten", "kullan\u0131lan":"verwendet", "uyar\u0131":"Warnung", "inlier":"Inlier", "G":"K", "Ref":"Ref",
    "G\u00f6rsel i\u015flemler sonuca uygulanacak":"Bildverarbeitung wird auf Ergebnisse angewendet", "Mod":"Modus", "Export kolon kontrol\u00fc":"Export-Spaltenpr\u00fcfung", "Orijinal ROI":"Original-ROI",
    "Hedef: --":"Ziel: --", "G\u00fcven: --":"Konfidenz: --", "Y\u00f6ntem: --":"Methode: --", "E\u015fle\u015fme: --":"Abgleich: --", "ROI Min":"ROI Min", "ImageJ-compatible":"ImageJ-kompatibel",
    "Mean Gray Value":"Mittlerer Grauwert", "Median Gray Value":"Median-Grauwert", "Integrated Density":"Integrierte Dichte", "Minimum Gray Value":"Minimaler Grauwert", "Maximum Gray Value":"Maximaler Grauwert", "Grayscale Profile":"Grauwertprofil",
    "Area px\u00b2":"Fl\u00e4che px\u00b2", "Area mm\u00b2":"Fl\u00e4che mm\u00b2", "Perimeter px":"Umfang px", "Perimeter mm":"Umfang mm", "Feret px":"Feret px", "Feret mm":"Feret mm", "MinFeret px":"MinFeret px", "MinFeret mm":"MinFeret mm",
    "Bounding Width px":"Begrenzungsbreite px", "Bounding Height px":"Begrenzungsh\u00f6he px", "Bounding Width mm":"Begrenzungsbreite mm", "Bounding Height mm":"Begrenzungsh\u00f6he mm",
    "Fit Ellipse Major px":"Ellipse Hauptachse px", "Fit Ellipse Minor px":"Ellipse Nebenachse px", "Fit Ellipse Major mm":"Ellipse Hauptachse mm", "Fit Ellipse Minor mm":"Ellipse Nebenachse mm", "Ellipse Angle":"Ellipsenwinkel",
    "Circularity":"Zirkularit\u00e4t", "Roundness":"Rundheit", "Solidity":"Solidit\u00e4t", "Aspect Ratio":"Seitenverh\u00e4ltnis", "Standard Deviation":"Standardabweichung", "Skewness":"Schiefe", "Kurtosis":"Kurtosis", "Area Fraction %":"Fl\u00e4chenanteil %",
    "Centroid X":"Zentroid X", "Centroid Y":"Zentroid Y", "Center of Mass X":"Massenzentrum X", "Center of Mass Y":"Massenzentrum Y", "Stack Position":"Stack-Position", "Otsu Threshold":"Otsu-Schwelle",
    "Trabecular Thickness px":"Trabekeldicke px", "Trabecular Thickness mm":"Trabekeldicke mm", "Trabecular Separation px":"Trabekelabstand px", "Trabecular Separation mm":"Trabekelabstand mm"
  });


  // Final language completion: export headers, guide column labels and compact selector metadata.
  Object.assign(TR_TO_EN, {
  "ImageJ:Label": "ImageJ:Label",
  "ImageJ:Area": "ImageJ:Area",
  "ImageJ:Mean": "ImageJ:Mean",
  "ImageJ:StdDev": "ImageJ:StdDev",
  "ImageJ:Mode": "ImageJ:Mode",
  "ImageJ:Min": "ImageJ:Min",
  "ImageJ:Max": "ImageJ:Max",
  "ImageJ:X": "ImageJ:X",
  "ImageJ:Y": "ImageJ:Y",
  "ImageJ:XM": "ImageJ:XM",
  "ImageJ:YM": "ImageJ:YM",
  "ImageJ:Perim.": "ImageJ:Perim.",
  "ImageJ:BX": "ImageJ:BX",
  "ImageJ:BY": "ImageJ:BY",
  "ImageJ:Width": "ImageJ:Width",
  "ImageJ:Height": "ImageJ:Height",
  "ImageJ:Major": "ImageJ:Major",
  "ImageJ:Minor": "ImageJ:Minor",
  "ImageJ:Angle": "ImageJ:Angle",
  "ImageJ:Circ.": "ImageJ:Circ.",
  "ImageJ:Feret": "ImageJ:Feret",
  "ImageJ:IntDen": "ImageJ:IntDen",
  "ImageJ:Median": "ImageJ:Median",
  "ImageJ:Skew": "ImageJ:Skew",
  "ImageJ:Kurt": "ImageJ:Kurt",
  "ImageJ:%Area": "ImageJ:%Area",
  "ImageJ:RawIntDen": "ImageJ:RawIntDen",
  "ImageJ:Slice": "ImageJ:Slice",
  "ImageJ:FeretX": "ImageJ:FeretX",
  "ImageJ:FeretY": "ImageJ:FeretY",
  "ImageJ:FeretAngle": "ImageJ:FeretAngle",
  "ImageJ:MinFeret": "ImageJ:MinFeret",
  "ImageJ:AR": "ImageJ:AR",
  "ImageJ:Round": "ImageJ:Round",
  "ImageJ:Solidity": "ImageJ:Solidity",
  "R\u00b2": "R\u00b2",
  "Mean Gray Value": "Mean Gray Value",
  "Median Gray Value": "Median Gray Value",
  "Integrated Density": "Integrated Density",
  "Minimum Gray Value": "Minimum Gray Value",
  "Maximum Gray Value": "Maximum Gray Value",
  "Grayscale Profile": "Grayscale Profile",
  "Area px\u00b2": "Area px\u00b2",
  "Area mm\u00b2": "Area mm\u00b2",
  "Perimeter px": "Perimeter px",
  "Perimeter mm": "Perimeter mm",
  "Feret px": "Feret px",
  "Feret mm": "Feret mm",
  "MinFeret px": "MinFeret px",
  "MinFeret mm": "MinFeret mm",
  "Bounding Width px": "Bounding Width px",
  "Bounding Height px": "Bounding Height px",
  "Bounding Width mm": "Bounding Width mm",
  "Bounding Height mm": "Bounding Height mm",
  "Fit Ellipse Major px": "Fit Ellipse Major px",
  "Fit Ellipse Minor px": "Fit Ellipse Minor px",
  "Fit Ellipse Major mm": "Fit Ellipse Major mm",
  "Fit Ellipse Minor mm": "Fit Ellipse Minor mm",
  "Ellipse Angle": "Ellipse Angle",
  "Circularity": "Circularity",
  "Roundness": "Roundness",
  "Solidity": "Solidity",
  "Aspect Ratio": "Aspect Ratio",
  "Standard Deviation": "Standard Deviation",
  "Skewness": "Skewness",
  "Kurtosis": "Kurtosis",
  "Area Fraction %": "Area Fraction %",
  "Centroid X": "Centroid X",
  "Centroid Y": "Centroid Y",
  "Center of Mass X": "Center of Mass X",
  "Center of Mass Y": "Center of Mass Y",
  "Stack Position": "Stack Position",
  "Lacunarity": "Lacunarity",
  "Trabecular Thickness px": "Trabecular Thickness px",
  "Trabecular Thickness mm": "Trabecular Thickness mm",
  "Trabecular Separation px": "Trabecular Separation px",
  "Trabecular Separation mm": "Trabecular Separation mm",
  "Otsu Threshold": "Otsu Threshold",
  "Mean Gray": "Mean Gray",
  "Median": "Median",
  "Std Dev": "Std Dev",
  "Tb.Th / Tb.Sp": "Tb.Th / Tb.Sp",
  "Mean / Median": "Mean / Median",
  "Clipping": "Clipping",
  "P5 - P95": "P5 - P95",
  "Otsu": "Otsu",
  "ROI": "ROI",
  "px": "px",
  "Column": "Column",
  "Group": "Group",
  "Explanation": "Explanation",
  "Note": "Note"
});
  Object.assign(TR_TO_DE, {
  "ImageJ:Label": "ImageJ:Label",
  "ImageJ:Area": "ImageJ:Fl\u00e4che",
  "ImageJ:Mean": "ImageJ:Mittelwert",
  "ImageJ:StdDev": "ImageJ:StdAbw",
  "ImageJ:Mode": "ImageJ:Modus",
  "ImageJ:Min": "ImageJ:Min",
  "ImageJ:Max": "ImageJ:Max",
  "ImageJ:X": "ImageJ:X",
  "ImageJ:Y": "ImageJ:Y",
  "ImageJ:XM": "ImageJ:XM",
  "ImageJ:YM": "ImageJ:YM",
  "ImageJ:Perim.": "ImageJ:Umfang",
  "ImageJ:BX": "ImageJ:BX",
  "ImageJ:BY": "ImageJ:BY",
  "ImageJ:Width": "ImageJ:Breite",
  "ImageJ:Height": "ImageJ:H\u00f6he",
  "ImageJ:Major": "ImageJ:Hauptachse",
  "ImageJ:Minor": "ImageJ:Nebenachse",
  "ImageJ:Angle": "ImageJ:Winkel",
  "ImageJ:Circ.": "ImageJ:Zirk.",
  "ImageJ:Feret": "ImageJ:Feret",
  "ImageJ:IntDen": "ImageJ:IntDichte",
  "ImageJ:Median": "ImageJ:Median",
  "ImageJ:Skew": "ImageJ:Schiefe",
  "ImageJ:Kurt": "ImageJ:Kurt",
  "ImageJ:%Area": "ImageJ:%Fl\u00e4che",
  "ImageJ:RawIntDen": "ImageJ:RohIntDichte",
  "ImageJ:Slice": "ImageJ:Slice",
  "ImageJ:FeretX": "ImageJ:FeretX",
  "ImageJ:FeretY": "ImageJ:FeretY",
  "ImageJ:FeretAngle": "ImageJ:FeretWinkel",
  "ImageJ:MinFeret": "ImageJ:MinFeret",
  "ImageJ:AR": "ImageJ:SV",
  "ImageJ:Round": "ImageJ:Rund",
  "ImageJ:Solidity": "ImageJ:Solidit\u00e4t",
  "R\u00b2": "R\u00b2",
  "Mean Gray Value": "Mittlerer Grauwert",
  "Median Gray Value": "Median-Grauwert",
  "Integrated Density": "Integrierte Dichte",
  "Minimum Gray Value": "Minimaler Grauwert",
  "Maximum Gray Value": "Maximaler Grauwert",
  "Grayscale Profile": "Grauwertprofil",
  "Area px\u00b2": "Fl\u00e4che px\u00b2",
  "Area mm\u00b2": "Fl\u00e4che mm\u00b2",
  "Perimeter px": "Umfang px",
  "Perimeter mm": "Umfang mm",
  "Feret px": "Feret px",
  "Feret mm": "Feret mm",
  "MinFeret px": "MinFeret px",
  "MinFeret mm": "MinFeret mm",
  "Bounding Width px": "Begrenzungsbreite px",
  "Bounding Height px": "Begrenzungsh\u00f6he px",
  "Bounding Width mm": "Begrenzungsbreite mm",
  "Bounding Height mm": "Begrenzungsh\u00f6he mm",
  "Fit Ellipse Major px": "Ellipse Hauptachse px",
  "Fit Ellipse Minor px": "Ellipse Nebenachse px",
  "Fit Ellipse Major mm": "Ellipse Hauptachse mm",
  "Fit Ellipse Minor mm": "Ellipse Nebenachse mm",
  "Ellipse Angle": "Ellipsenwinkel",
  "Circularity": "Zirkularit\u00e4t",
  "Roundness": "Rundheit",
  "Solidity": "Solidit\u00e4t",
  "Aspect Ratio": "Seitenverh\u00e4ltnis",
  "Standard Deviation": "Standardabweichung",
  "Skewness": "Schiefe",
  "Kurtosis": "Kurtosis",
  "Area Fraction %": "Fl\u00e4chenanteil %",
  "Centroid X": "Zentroid X",
  "Centroid Y": "Zentroid Y",
  "Center of Mass X": "Massenzentrum X",
  "Center of Mass Y": "Massenzentrum Y",
  "Stack Position": "Stack-Position",
  "Lacunarity": "Lacunarit\u00e4t",
  "Trabecular Thickness px": "Trabekeldicke px",
  "Trabecular Thickness mm": "Trabekeldicke mm",
  "Trabecular Separation px": "Trabekelabstand px",
  "Trabecular Separation mm": "Trabekelabstand mm",
  "Otsu Threshold": "Otsu-Schwelle",
  "Mean Gray": "Mittlerer Grauwert",
  "Median": "Median",
  "Std Dev": "Std.-Abw.",
  "Tb.Th / Tb.Sp": "Tb.Th / Tb.Sp",
  "Mean / Median": "Mittelwert / Median",
  "Clipping": "Clipping",
  "P5 - P95": "P5 - P95",
  "Otsu": "Otsu",
  "ROI": "ROI",
  "px": "px",
  "Column": "Spalte",
  "Group": "Gruppe",
  "Explanation": "Erkl\u00e4rung",
  "Note": "Hinweis"
});


  // Runtime-safe export/header language completion. Keep this block additive so future languages can extend it cleanly.
  Object.assign(TR_TO_EN, {
    "8-bit Normalizasyon": "8-bit Normalization",
    "8-bit normalizasyon": "8-bit normalization",
    "G\u00f6rsel \u0130\u015flemler Sonuca": "Visual Processing Applied",
    "Referans \u00d6n \u0130\u015flemleri": "Reference Preprocessing",
    "Siyah-Beyaz G\u00f6r\u00fcn\u00fcm": "Black-and-White Preview",
    "CLAHE \u00d6nizleme": "CLAHE Preview",
    "Otomatik Kontrast": "Auto Contrast",
    "Analiz Preseti": "Analysis Preset",
    "Kalibrasyon": "Calibration",
    "Parlakl\u0131k": "Brightness",
    "Kontrast": "Contrast",
    "Pozlama": "Exposure"
  });
  Object.assign(TR_TO_DE, {
    "8-bit Normalizasyon": "8-Bit-Normalisierung",
    "8-bit normalizasyon": "8-Bit-Normalisierung",
    "G\u00f6rsel \u0130\u015flemler Sonuca": "Bildverarbeitung angewendet",
    "Referans \u00d6n \u0130\u015flemleri": "Referenz-Vorverarbeitung",
    "Siyah-Beyaz G\u00f6r\u00fcn\u00fcm": "Schwarzwei\u00df-Vorschau",
    "CLAHE \u00d6nizleme": "CLAHE-Vorschau",
    "Otomatik Kontrast": "Automatischer Kontrast",
    "Analiz Preseti": "Analyse-Voreinstellung",
    "Kalibrasyon": "Kalibrierung",
    "Parlakl\u0131k": "Helligkeit",
    "Kontrast": "Kontrast",
    "Pozlama": "Belichtung"
  });


  // Final release translation hardening: runtime messages and notification labels.
  Object.assign(TR_TO_EN, {
    "Ham ROI önizlemesi çizilemedi:": "Raw ROI preview could not be drawn:",
    "Bildirimler": "Notifications",
    "Bildirimi kapat": "Dismiss notification",
    "Kapat": "Close",
    "Detay": "Details",
    "Yeni bildirim": "New notification"
  });
  Object.assign(TR_TO_DE, {
    "Ham ROI önizlemesi çizilemedi:": "Rohe ROI-Vorschau konnte nicht gezeichnet werden:",
    "Bildirimler": "Benachrichtigungen",
    "Bildirimi kapat": "Benachrichtigung schließen",
    "Kapat": "Schließen",
    "Detay": "Details",
    "Yeni bildirim": "Neue Benachrichtigung"
  });


  // Full-image Excel export completion messages.
  Object.assign(TR_TO_EN, {
    "Analiz motoru haz\u0131r de\u011fil; tam g\u00f6rsel \u00f6l\u00e7\u00fcmleri Excel i\u00e7in tamamlanamad\u0131.": "Analysis engine is not ready; full-image measurements could not be completed for Excel.",
    "Excel \u00e7\u0131kt\u0131s\u0131 i\u00e7in tam g\u00f6rsel \u00f6l\u00e7\u00fcmleri haz\u0131rlan\u0131yor...": "Preparing full-image measurements for Excel export...",
    "Baz\u0131 tam g\u00f6rsel \u00f6l\u00e7\u00fcmleri tamamlanamad\u0131; Excel \u00e7\u0131kt\u0131s\u0131nda uyar\u0131 alanlar\u0131n\u0131 kontrol edin.": "Some full-image measurements could not be completed; check warning fields in the Excel export.",
    "Tam g\u00f6rsel \u00f6l\u00e7\u00fcmleri tamamland\u0131; Excel \u00e7\u0131kt\u0131s\u0131 g\u00fcncellendi.": "Full-image measurements are complete; Excel export has been updated.",
    "Excel \u00e7\u0131kt\u0131s\u0131 haz\u0131rlanamad\u0131.": "Excel export could not be prepared."
  });
  Object.assign(TR_TO_DE, {
    "Analiz motoru haz\u0131r de\u011fil; tam g\u00f6rsel \u00f6l\u00e7\u00fcmleri Excel i\u00e7in tamamlanamad\u0131.": "Analyse-Engine ist nicht bereit; Vollbildmessungen konnten f\u00fcr Excel nicht abgeschlossen werden.",
    "Excel \u00e7\u0131kt\u0131s\u0131 i\u00e7in tam g\u00f6rsel \u00f6l\u00e7\u00fcmleri haz\u0131rlan\u0131yor...": "Vollbildmessungen f\u00fcr den Excel-Export werden vorbereitet...",
    "Baz\u0131 tam g\u00f6rsel \u00f6l\u00e7\u00fcmleri tamamlanamad\u0131; Excel \u00e7\u0131kt\u0131s\u0131nda uyar\u0131 alanlar\u0131n\u0131 kontrol edin.": "Einige Vollbildmessungen konnten nicht abgeschlossen werden; Warnfelder im Excel-Export pr\u00fcfen.",
    "Tam g\u00f6rsel \u00f6l\u00e7\u00fcmleri tamamland\u0131; Excel \u00e7\u0131kt\u0131s\u0131 g\u00fcncellendi.": "Vollbildmessungen sind abgeschlossen; der Excel-Export wurde aktualisiert.",
    "Excel \u00e7\u0131kt\u0131s\u0131 haz\u0131rlanamad\u0131.": "Excel-Export konnte nicht vorbereitet werden."
  });



  // Notification/status translation completion for product UI.
  Object.assign(TR_TO_EN, {
    "Bildirimler": "Notifications",
    "Bildirimi kapat": "Dismiss notification",
    "Bilgi": "Info",
    "Tamamlandı": "Completed",
    "Uyarı": "Warning",
    "Hata": "Error",
    "Bildirim": "Notification",
    "Hesaplama": "Calculation",
    "HAZIR": "READY",
    "HESAPLANIYOR": "CALCULATING",
    "HİZALANIYOR": "ALIGNING",
    "HATA": "ERROR",
    "BEKLİYOR": "WAITING",
    "Beklenmeyen işlem hatası oluştu; konsolu kontrol edin.": "Unexpected runtime error; check the console.",
    "Arayüz olayları bağlanamadı; sayfayı yeniden yükleyin.": "Interface events could not be attached; reload the page.",
    "Analiz motoru başlatılamadı. Sayfa açık kaldı; lütfen bağlantıyı/OpenCV yüklemesini kontrol edin.": "The analysis engine could not start. The page stayed open; please check the connection/OpenCV loading.",
    "Analiz motoru oluşturulamadı. Arayüz çalışıyor; hesaplama için sayfayı yeniden yükleyin.": "The analysis engine could not be created. The interface is running; reload the page before calculation.",
    "Kopyalama başarısız. Tarayıcı pano iznini kontrol edin.": "Copy failed. Check the browser clipboard permission.",
    "Otomatik ayar uygulanamadı; çalışma korunuyor.": "Automatic setting could not be applied; the workspace was preserved.",
    "Otomatik ayarlar sıfırlandı": "Automatic settings reset.",
    "Overlay için en az 2 görsel gerekir.": "At least 2 images are required for the overlay.",
    "Önizleme ayarı uygulanamadı.": "Preview setting could not be applied.",
    "Analiz için en az 1 röntgen dosyası seçin.": "Select at least 1 radiograph file for analysis.",
    "Görsellerden biri yüklenemedi. Lütfen desteklenen röntgen dosyaları seçin.": "One of the images could not be loaded. Please select supported radiograph files.",
    "Yeni ROI eklemek için referans görseli açın. Karşılaştırma modunda ilk görsel referanstır; diğerleri ona hizalanır.": "Open the reference image before adding a new ROI. In comparison mode, the first image is the reference; the others align to it.",
    "Analiz başlatılamadı. ROI ve görsel sınırları kontrol edildi.": "Analysis could not be started. ROI and image boundaries were checked.",
    "Hizalamak için bir ROI seçin.": "Select an ROI to align.",
    "Hizalama için önce en az 1 görsel yükleyin.": "Load at least 1 image before alignment.",
    "Tek görsel analiz modundasınız; hizalama gerekmiyor. ROI ekleyip Hesapla’ya basabilirsiniz.": "You are in single-image analysis mode; alignment is not required. Add an ROI and press Calculate.",
    "Karşılaştırma modu: diğer görseller ilk referans görsele hizalanıyor ve aktif ROI kopyalanıyor...": "Comparison mode: other images are being aligned to the first reference image and the active ROI is being copied...",
    "Aktif ROI diğer görsellere hizalandı. Gerekirse düzeltip Hesapla'ya basın.": "The active ROI was aligned to the other images. Adjust if needed, then press Calculate.",
    "Hizalama başlatılamadı.": "Alignment could not be started.",
    "Hesaplama için önce en az 1 görsel yükleyin.": "Load at least 1 image before calculation.",
    "Aktif ROI için tüm ölçümler hesaplanıyor...": "Calculating all measurements for the active ROI...",
    "ROI yok: tüm fotoğraf için ölçümler hesaplanıyor...": "No ROI: calculating measurements for the full image(s)...",
    "Hesaplama başlatılamadı.": "Calculation could not be started.",
    "Analiz edilecek ROI bulunamadı.": "No ROI task was found for analysis.",
    "Analiz motoru hazır değil; hesaplama başlatılamadı.": "Analysis engine is not ready; calculation could not start.",
    "Hesaplanıyor": "Calculating",
    "Analiz bekleniyor": "Waiting for analysis",
    "Bekliyor": "Waiting",
    "Yok": "None",
    "Geçti": "Passed",
    "İncele": "Review"
  });
  Object.assign(TR_TO_DE, {
    "Bildirimler": "Benachrichtigungen",
    "Bildirimi kapat": "Benachrichtigung schließen",
    "Bilgi": "Info",
    "Tamamlandı": "Abgeschlossen",
    "Uyarı": "Warnung",
    "Hata": "Fehler",
    "Bildirim": "Benachrichtigung",
    "Hesaplama": "Berechnung",
    "HAZIR": "BEREIT",
    "HESAPLANIYOR": "BERECHNET",
    "HİZALANIYOR": "AUSRICHTUNG",
    "HATA": "FEHLER",
    "BEKLİYOR": "WARTET",
    "Beklenmeyen işlem hatası oluştu; konsolu kontrol edin.": "Unerwarteter Laufzeitfehler; Konsole prüfen.",
    "Arayüz olayları bağlanamadı; sayfayı yeniden yükleyin.": "Oberflächenereignisse konnten nicht verbunden werden; Seite neu laden.",
    "Analiz motoru başlatılamadı. Sayfa açık kaldı; lütfen bağlantıyı/OpenCV yüklemesini kontrol edin.": "Die Analyse-Engine konnte nicht gestartet werden. Die Seite blieb geöffnet; bitte Verbindung/OpenCV-Ladevorgang prüfen.",
    "Analiz motoru oluşturulamadı. Arayüz çalışıyor; hesaplama için sayfayı yeniden yükleyin.": "Die Analyse-Engine konnte nicht erstellt werden. Die Oberfläche läuft; vor der Berechnung Seite neu laden.",
    "Kopyalama başarısız. Tarayıcı pano iznini kontrol edin.": "Kopieren fehlgeschlagen. Browser-Zwischenablageberechtigung prüfen.",
    "Otomatik ayar uygulanamadı; çalışma korunuyor.": "Automatische Einstellung konnte nicht angewendet werden; Arbeitsbereich wurde beibehalten.",
    "Otomatik ayarlar sıfırlandı": "Automatische Einstellungen zurückgesetzt.",
    "Overlay için en az 2 görsel gerekir.": "Für das Overlay sind mindestens 2 Bilder erforderlich.",
    "Önizleme ayarı uygulanamadı.": "Vorschaueinstellung konnte nicht angewendet werden.",
    "Analiz için en az 1 röntgen dosyası seçin.": "Wählen Sie mindestens 1 Röntgendatei für die Analyse aus.",
    "Görsellerden biri yüklenemedi. Lütfen desteklenen röntgen dosyaları seçin.": "Eines der Bilder konnte nicht geladen werden. Bitte unterstützte Röntgendateien auswählen.",
    "Yeni ROI eklemek için referans görseli açın. Karşılaştırma modunda ilk görsel referanstır; diğerleri ona hizalanır.": "Zum Hinzufügen einer neuen ROI das Referenzbild öffnen. Im Vergleichsmodus ist das erste Bild die Referenz; die anderen werden daran ausgerichtet.",
    "Analiz başlatılamadı. ROI ve görsel sınırları kontrol edildi.": "Analyse konnte nicht gestartet werden. ROI- und Bildgrenzen wurden geprüft.",
    "Hizalamak için bir ROI seçin.": "Wählen Sie eine ROI zum Ausrichten.",
    "Hizalama için önce en az 1 görsel yükleyin.": "Laden Sie vor der Ausrichtung mindestens 1 Bild.",
    "Tek görsel analiz modundasınız; hizalama gerekmiyor. ROI ekleyip Hesapla’ya basabilirsiniz.": "Sie sind im Einzelbild-Analysemodus; Ausrichtung ist nicht erforderlich. ROI hinzufügen und Berechnen drücken.",
    "Karşılaştırma modu: diğer görseller ilk referans görsele hizalanıyor ve aktif ROI kopyalanıyor...": "Vergleichsmodus: Andere Bilder werden am ersten Referenzbild ausgerichtet und die aktive ROI wird kopiert...",
    "Aktif ROI diğer görsellere hizalandı. Gerekirse düzeltip Hesapla'ya basın.": "Die aktive ROI wurde an die anderen Bilder angepasst. Bei Bedarf korrigieren und Berechnen drücken.",
    "Hizalama başlatılamadı.": "Ausrichtung konnte nicht gestartet werden.",
    "Hesaplama için önce en az 1 görsel yükleyin.": "Laden Sie vor der Berechnung mindestens 1 Bild.",
    "Aktif ROI için tüm ölçümler hesaplanıyor...": "Alle Messwerte für die aktive ROI werden berechnet...",
    "ROI yok: tüm fotoğraf için ölçümler hesaplanıyor...": "Keine ROI: Messwerte für das/die Vollbild(er) werden berechnet...",
    "Hesaplama başlatılamadı.": "Berechnung konnte nicht gestartet werden.",
    "Analiz edilecek ROI bulunamadı.": "Keine ROI-Aufgabe für die Analyse gefunden.",
    "Analiz motoru hazır değil; hesaplama başlatılamadı.": "Analyse-Engine ist nicht bereit; Berechnung konnte nicht gestartet werden.",
    "Hesaplanıyor": "Berechnung",
    "Analiz bekleniyor": "Analyse ausstehend",
    "Bekliyor": "Wartet",
    "Yok": "Keine",
    "Geçti": "Bestanden",
    "İncele": "Prüfen"
  });



  // Excel copy and release polish translations.
  Object.assign(TR_TO_EN, {
    "Excel çıktısı hazırlanıyor: tüm fotoğraf analizleri ve ROI ölçümleri kontrol ediliyor...": "Preparing Excel export: checking full-image analyses and ROI measurements...",
    "Excel verisi hazırlandı ve kopyalandı.": "Excel data is ready and copied.",
    "Kopyalanacak Excel verisi yok.": "No Excel data to copy.",
    "Kopyalama alanı": "Copy area",
    "Excel verisi seçildi": "Excel data selected",
    "Kopyalama tarayıcı tarafından engellendi. Metin seçildi; Ctrl+C ile kopyalayabilirsiniz.": "Copying was blocked by the browser. The text is selected; press Ctrl+C to copy it.",
    "Tekrar kopyala": "Copy again",
    "Kopyalama başarısız. Tarayıcı pano iznini kontrol edin.": "Copy failed. Check the browser clipboard permission.",
    "Excel çıktısı hazırlanamadı.": "Excel export could not be prepared.",
    "Başlıklar dahil Excel formatında kopyalandı": "Copied in Excel format, including headers."
  });
  Object.assign(TR_TO_DE, {
    "Excel çıktısı hazırlanıyor: tüm fotoğraf analizleri ve ROI ölçümleri kontrol ediliyor...": "Excel-Export wird vorbereitet: Vollbildanalysen und ROI-Messwerte werden geprüft...",
    "Excel verisi hazırlandı ve kopyalandı.": "Excel-Daten sind bereit und wurden kopiert.",
    "Kopyalanacak Excel verisi yok.": "Keine Excel-Daten zum Kopieren.",
    "Kopyalama alanı": "Kopierbereich",
    "Excel verisi seçildi": "Excel-Daten ausgewählt",
    "Kopyalama tarayıcı tarafından engellendi. Metin seçildi; Ctrl+C ile kopyalayabilirsiniz.": "Kopieren wurde vom Browser blockiert. Der Text ist ausgewählt; mit Strg+C kopieren.",
    "Tekrar kopyala": "Erneut kopieren",
    "Kopyalama başarısız. Tarayıcı pano iznini kontrol edin.": "Kopieren fehlgeschlagen. Browser-Zwischenablageberechtigung prüfen.",
    "Excel çıktısı hazırlanamadı.": "Excel-Export konnte nicht vorbereitet werden.",
    "Başlıklar dahil Excel formatında kopyalandı": "Im Excel-Format inklusive Kopfzeilen kopiert."
  });

  // Public release texture/quality metric translations.
  Object.assign(TR_TO_EN, {
    "Histogram Entropy": "Histogram Entropy",
    "P01 Gray": "P01 Gray",
    "P05 Gray": "P05 Gray",
    "P10 Gray": "P10 Gray",
    "P25 Gray": "P25 Gray",
    "P75 Gray": "P75 Gray",
    "P90 Gray": "P90 Gray",
    "P95 Gray": "P95 Gray",
    "P99 Gray": "P99 Gray",
    "Dynamic Range Gray": "Dynamic Range Gray",
    "Robust Range P05-P95": "Robust Range P05-P95",
    "IQR Gray": "IQR Gray",
    "Mean Absolute Deviation": "Mean Absolute Deviation",
    "Coefficient of Variation": "Coefficient of Variation",
    "SNR dB": "SNR dB",
    "Clipping %": "Clipping %",
    "RMS Contrast": "RMS Contrast",
    "Normalized RMS Contrast": "Normalized RMS Contrast",
    "Tenengrad Sharpness": "Tenengrad Sharpness",
    "Edge Energy": "Edge Energy",
    "Laplacian Variance": "Laplacian Variance",
    "Gradient Pixel Count": "Gradient Pixel Count",
    "GLCM Quantization Levels": "GLCM Quantization Levels",
    "GLCM Pair Count": "GLCM Pair Count",
    "GLCM Contrast": "GLCM Contrast",
    "GLCM Dissimilarity": "GLCM Dissimilarity",
    "GLCM Homogeneity": "GLCM Homogeneity",
    "GLCM ASM": "GLCM ASM",
    "GLCM Energy": "GLCM Energy",
    "GLCM Entropy": "GLCM Entropy",
    "GLCM Correlation": "GLCM Correlation",
    "Tam fotoğraf ölçümü": "Full-image measurement",
    "Fraktal boyut atlandı": "Fractal dimension skipped",
    "Yapısal tam-görüntü metrikleri atlandı": "Structural full-image metrics skipped",
    "Tam fotoğraf satırında fraktal boyut ve yapısal tüm-görüntü metrikleri hesaplanmadı.": "Fractal dimension and structural full-image metrics were not calculated for the full-image row."
  });
  Object.assign(TR_TO_DE, {
    "Histogram Entropy": "Histogramm-Entropie",
    "P01 Gray": "P01 Grauwert",
    "P05 Gray": "P05 Grauwert",
    "P10 Gray": "P10 Grauwert",
    "P25 Gray": "P25 Grauwert",
    "P75 Gray": "P75 Grauwert",
    "P90 Gray": "P90 Grauwert",
    "P95 Gray": "P95 Grauwert",
    "P99 Gray": "P99 Grauwert",
    "Dynamic Range Gray": "Dynamikbereich Grauwert",
    "Robust Range P05-P95": "Robuster Bereich P05-P95",
    "IQR Gray": "IQR Grauwert",
    "Mean Absolute Deviation": "Mittlere absolute Abweichung",
    "Coefficient of Variation": "Variationskoeffizient",
    "SNR dB": "SNR dB",
    "Clipping %": "Clipping %",
    "RMS Contrast": "RMS-Kontrast",
    "Normalized RMS Contrast": "Normalisierter RMS-Kontrast",
    "Tenengrad Sharpness": "Tenengrad-Schaerfe",
    "Edge Energy": "Kantenenergie",
    "Laplacian Variance": "Laplace-Varianz",
    "Gradient Pixel Count": "Gradienten-Pixelanzahl",
    "GLCM Quantization Levels": "GLCM-Quantisierungsstufen",
    "GLCM Pair Count": "GLCM-Paaranzahl",
    "GLCM Contrast": "GLCM-Kontrast",
    "GLCM Dissimilarity": "GLCM-Unaehnlichkeit",
    "GLCM Homogeneity": "GLCM-Homogenitaet",
    "GLCM ASM": "GLCM ASM",
    "GLCM Energy": "GLCM-Energie",
    "GLCM Entropy": "GLCM-Entropie",
    "GLCM Correlation": "GLCM-Korrelation",
    "Tam fotoğraf ölçümü": "Vollbildmessung",
    "Fraktal boyut atlandı": "Fraktale Dimension uebersprungen",
    "Yapısal tam-görüntü metrikleri atlandı": "Strukturelle Vollbildmetriken uebersprungen",
    "Tam fotoğraf satırında fraktal boyut ve yapısal tüm-görüntü metrikleri hesaplanmadı.": "Fraktale Dimension und strukturelle Vollbildmetriken wurden fuer die Vollbildzeile nicht berechnet."
  });

  var TRANSLATIONS = { en: TR_TO_EN, de: TR_TO_DE };
  var EXPORT_HEADERS = { en: { 'Referans Görsel':'Reference Image','Görsel':'Image','ROI Grup':'ROI Group','ROI Durumu':'ROI Status','Eşleşme Güveni':'Match Confidence','Şekil':'Shape','Koordinat Uzayı':'Coordinate Space','Seçilen X':'Selected X','Seçilen Y':'Selected Y','Seçilen X':'Selected X','Seçilen Y':'Selected Y','Orijinal X':'Original X','Orijinal Y':'Original Y','Seçilen W':'Selected W','Seçilen H':'Selected H','Seçilen Açı':'Selected Angle','Orijinal W':'Original W','Orijinal H':'Original H','Orijinal Açı':'Original Angle','Çalışma X':'Workspace X','Çalışma Y':'Workspace Y','Çalışma W':'Workspace W','Çalışma H':'Workspace H','Çalışma Açı':'Workspace Angle','Analiz X':'Analysis X','Analiz Y':'Analysis Y','Analiz W':'Analysis W','Analiz H':'Analysis H','Fraktal Boyut (D)':'Fractal Dimension (D)','Karmaşıklık':'Complexity','Nokta':'Points','Eğim SE':'Slope SE','Kutu Ölçekleri':'Box Scales','Elenen Ölçekler':'Excluded Scales','Güvenilirlik':'Reliability','Uyarı':'Warning','Analiz Ön İşlem':'Analysis Preprocessing','Kalibrasyon':'Calibration','Analiz Preseti':'Analysis Preset','Parlaklık':'Brightness','Kontrast':'Contrast','Pozlama':'Exposure','Görsel İşlemler Sonuca':'Visual Processing Applied','Referans Ön İşlemleri':'Reference Preprocessing','8-bit Normalizasyon':'8-bit Normalization','Siyah-Beyaz Görünüm':'Black-and-White Preview','Otomatik Kontrast':'Auto Contrast','CLAHE Önizleme':'CLAHE Preview' }, de: { 'Referans Görsel':'Referenzbild','Görsel':'Bild','ROI Grup':'ROI-Gruppe','ROI Durumu':'ROI-Status','Eşleşme Güveni':'Abgleich-Konfidenz','Şekil':'Form','Koordinat Uzayı':'Koordinatenraum','Seçilen X':'Auswahl X','Seçilen Y':'Auswahl Y','Seçilen X':'Auswahl X','Seçilen Y':'Auswahl Y','Orijinal X':'Original X','Orijinal Y':'Original Y','Seçilen W':'Auswahl B','Seçilen H':'Auswahl H','Seçilen Açı':'Auswahlwinkel','Orijinal W':'Original B','Orijinal H':'Original H','Orijinal Açı':'Originalwinkel','Çalışma X':'Arbeitsbereich X','Çalışma Y':'Arbeitsbereich Y','Çalışma W':'Arbeitsbereich B','Çalışma H':'Arbeitsbereich H','Çalışma Açı':'Arbeitsbereich Winkel','Analiz X':'Analyse X','Analiz Y':'Analyse Y','Analiz W':'Analyse B','Analiz H':'Analyse H','Fraktal Boyut (D)':'Fraktale Dimension (D)','Karmaşıklık':'Komplexität','Nokta':'Punkte','Eğim SE':'Steigungs-SE','Kutu Ölçekleri':'Box-Skalen','Elenen Ölçekler':'Ausgeschlossene Skalen','Güvenilirlik':'Zuverlässigkeit','Uyarı':'Warnung','Analiz Ön İşlem':'Analyse-Vorverarbeitung','Kalibrasyon':'Kalibrierung','Analiz Preseti':'Analyse-Voreinstellung','Parlaklık':'Helligkeit','Kontrast':'Kontrast','Pozlama':'Belichtung','Görsel İşlemler Sonuca':'Bildverarbeitung angewendet','Referans Ön İşlemleri':'Referenz-Vorverarbeitung','8-bit Normalizasyon':'8-Bit-Normalisierung','Siyah-Beyaz Görünüm':'Schwarzweiß-Vorschau','Otomatik Kontrast':'Automatischer Kontrast','CLAHE Önizleme':'CLAHE-Vorschau' } };
  var PREFIX_TR = ['Referans:', 'Hedef:', 'G\u00fcven:', 'Y\u00f6ntem:', 'G\u00f6rsel histogram\u0131:', 'ROI histogram\u0131:', 'Tam g\u00f6rsel histogram\u0131:', 'E\u015fle\u015fme g\u00fcveni', 'G\u00dcVEN:', 'G\u00dcVEN SKORU:', 'DOSYA:', '\u00c7\u00d6Z\u00dcN\u00dcRL\u00dcK:', 'BOYUT:', 'T\u0130P:', 'H\u0130ZALAMA:', 'MOD:', 'ROL:', 'AKI\u015e:', 'E\u015eLE\u015eME:', 'H\u0130ZALAMA G\u00dcVEN\u0130:', '\u0130\u00c7ER\u0130K SKORU:', '\u00d6ZELL\u0130K Y\u00d6NTEM\u0130:', 'Mod '];
  var PREFIX_TO = { en: ['Reference:', 'Target:', 'Confidence:', 'Method:', 'Image histogram:', 'ROI histogram:', 'Full-image histogram:', 'Alignment confidence', 'CONFIDENCE:', 'CONFIDENCE SCORE:', 'FILE:', 'RESOLUTION:', 'SIZE:', 'TYPE:', 'ALIGNMENT:', 'MODE:', 'ROLE:', 'FLOW:', 'MATCH:', 'ALIGNMENT CONFIDENCE:', 'CONTENT SCORE:', 'FEATURE METHOD:', 'Mode '], de: ['Referenz:', 'Ziel:', 'Konfidenz:', 'Methode:', 'Bildhistogramm:', 'ROI-Histogramm:', 'Vollbild-Histogramm:', 'Ausrichtungs-Konfidenz', 'KONFIDENZ:', 'KONFIDENZWERT:', 'DATEI:', 'AUFL\u00d6SUNG:', 'GR\u00d6SSE:', 'TYP:', 'AUSRICHTUNG:', 'MODUS:', 'ROLLE:', 'ABLAUF:', 'ABGLEICH:', 'AUSRICHTUNGS-KONFIDENZ:', 'INHALTSSCORE:', 'MERKMALSMETHODE:', 'Modus '] };
  function normalizeLanguage(lang) { var v = String(lang || '').toLowerCase().slice(0, 2); return RA_LANGUAGES[v] ? v : 'tr'; }
  function safeJson(value) { try { return JSON.parse(value || '{}'); } catch (_) { return {}; } }
  function readSavedSettings() { try { return safeJson(localStorage.getItem(SETTINGS_STORAGE_KEY) || localStorage.getItem(LEGACY_SETTINGS_STORAGE_KEY) || '{}'); } catch (_) { return {}; } }
  function writeSavedSettings(settings) { localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings || {})); }
  function getInitialLanguage() { try { var urlLang = new URLSearchParams(window.location.search).get('lang'); if (urlLang) return normalizeLanguage(urlLang); var stored = localStorage.getItem(LANGUAGE_STORAGE_KEY); if (stored) return normalizeLanguage(stored); var saved = readSavedSettings(); if (saved.language) return normalizeLanguage(saved.language); } catch (_) {} return normalizeLanguage((navigator.language || 'tr').slice(0,2)); }
  function reverseMap(map) { var out = {}; Object.keys(map || {}).forEach(function(k){ out[String(map[k]).trim().replace(/\s+/g, ' ')] = String(k).trim().replace(/\s+/g, ' '); }); return out; }
  var REVERSE = { en: reverseMap(TR_TO_EN), de: reverseMap(TR_TO_DE) };
  function normalizeTextKey(value) { return String(value == null ? '' : value).trim().replace(/\s+/g, ' '); }
  function canonicalText(text) { var value = normalizeTextKey(text); if (!value) return value; Object.keys(REVERSE).some(function(lang){ if (REVERSE[lang][value]) { value = REVERSE[lang][value]; return true; } return false; }); return value; }
  function translatePrefix(value) { var clean = String(value == null ? '' : value).trim(); var canonical = clean; Object.keys(PREFIX_TO).some(function(lang){ return PREFIX_TO[lang].some(function(prefix, i){ if (canonical.indexOf(prefix) === 0) { canonical = PREFIX_TR[i] + canonical.slice(prefix.length); return true; } return false; }); }); if (window.currentLanguage === 'tr') return canonical !== clean ? canonical : null; var targetPrefixes = PREFIX_TO[window.currentLanguage] || []; for (var i=0; i<PREFIX_TR.length; i++) if (canonical.indexOf(PREFIX_TR[i]) === 0) return (targetPrefixes[i] || PREFIX_TR[i]) + canonical.slice(PREFIX_TR[i].length); return null; }
  function t(text) { var raw = String(text == null ? '' : text); var trimmed = raw.trim(); if (!trimmed) return raw; var prefixed = translatePrefix(trimmed); var canonical = canonicalText(trimmed); var translated = prefixed || (window.currentLanguage === 'tr' ? canonical : ((TRANSLATIONS[window.currentLanguage] || {})[canonical] || canonical)); return raw.replace(trimmed, translated); }
  function localizeExportHeader(header) { return window.currentLanguage === 'tr' ? header : header.map(function(item){ return t(item); }); }
  function localizeExportCell(value) { if (window.currentLanguage === 'tr') return value; var clean = String(value == null ? '' : value).trim(); return (TRANSLATIONS[window.currentLanguage] || {})[canonicalText(clean)] || translatePrefix(clean) || value; }
  function persistLanguage() { try { localStorage.setItem(LANGUAGE_STORAGE_KEY, window.currentLanguage); var saved = readSavedSettings(); saved.language = window.currentLanguage; writeSavedSettings(saved); } catch (err) { console.warn('Language preference could not be saved:', err); } }
  function getLanguageLabel(code, uiLang) { var item = RA_LANGUAGES[normalizeLanguage(code)] || RA_LANGUAGES.tr; var lang = normalizeLanguage(uiLang || window.currentLanguage); return (item.labels && item.labels[lang]) || item.label || item.shortLabel || code; }
  function getNativeLanguageLabel(code) { var item = RA_LANGUAGES[normalizeLanguage(code)] || RA_LANGUAGES.tr; return item.label || getLanguageLabel(code, code); }
  function getLanguageFlag(code) { var item = RA_LANGUAGES[normalizeLanguage(code)] || RA_LANGUAGES.tr; return item.flag || ''; }
  function setLanguageOptions(select) { if (!select) return; var current = normalizeLanguage(select.value || window.currentLanguage); select.innerHTML = ''; Object.keys(RA_LANGUAGES).forEach(function(code){ var item = RA_LANGUAGES[code]; var opt = document.createElement('option'); opt.value = code; opt.textContent = (item.flag ? item.flag + ' ' : '') + (item.label || getLanguageLabel(code, code)); select.appendChild(opt); }); select.value = current; select.setAttribute('aria-label', t('Dil se\u00e7imi')); }
  function isI18nSkipped(el) { while (el && el.nodeType === 1) { if (el.hasAttribute && (el.hasAttribute('data-i18n-skip') || el.hasAttribute('data-no-i18n'))) return true; el = el.parentElement; } return false; }
  function translateRemainder(tail) { if (!tail) return tail; var lead = (tail.match(/^\s*/) || [''])[0]; var end = (tail.match(/\s*$/) || [''])[0]; var core = tail.slice(lead.length, tail.length - end.length); if (!core) return tail; var canonical = canonicalText(core); var map = TRANSLATIONS[window.currentLanguage] || {}; var translated = window.currentLanguage === 'tr' ? canonical : (map[canonical] || canonical); return lead + translated + end; }
  function translatePrefix(value) { var clean = String(value == null ? '' : value).trim(); var canonical = clean; Object.keys(PREFIX_TO).some(function(lang){ return PREFIX_TO[lang].some(function(prefix, i){ if (canonical.indexOf(prefix) === 0) { canonical = PREFIX_TR[i] + canonical.slice(prefix.length); return true; } return false; }); }); if (window.currentLanguage === 'tr') return canonical !== clean ? canonical : null; var targetPrefixes = PREFIX_TO[window.currentLanguage] || []; for (var i=0; i<PREFIX_TR.length; i++) if (canonical.indexOf(PREFIX_TR[i]) === 0) return (targetPrefixes[i] || PREFIX_TR[i]) + translateRemainder(canonical.slice(PREFIX_TR[i].length)); return null; }
  function localizeTextNode(node) { if (!node || node.nodeType !== Node.TEXT_NODE) return; var p = node.parentElement; if (!p || isI18nSkipped(p) || ['SCRIPT','STYLE','TEXTAREA','CODE','PRE','CANVAS','OPTION'].indexOf(p.tagName) >= 0) return; var next = t(node.nodeValue); if (next !== node.nodeValue) node.nodeValue = next; }
  function localizeAttributes(el) { if (!el || el.nodeType !== Node.ELEMENT_NODE || isI18nSkipped(el)) return; ['title','placeholder','aria-label'].forEach(function(attr){ if (!el.hasAttribute(attr)) return; var v = el.getAttribute(attr); var next = t(v); if (next !== v) el.setAttribute(attr, next); }); }
  var i18nApplying = false, i18nObserver = null;
  function updateLanguageChrome() { document.querySelectorAll('select[data-language-select], #language-select').forEach(function(select){ setLanguageOptions(select); select.value = window.currentLanguage; }); document.querySelectorAll('[data-language-current], .language-current').forEach(function(el){ el.textContent = getNativeLanguageLabel(window.currentLanguage); }); document.querySelectorAll('[data-language-flag], .language-flag').forEach(function(el){ el.textContent = getLanguageFlag(window.currentLanguage); }); document.querySelectorAll('[data-language-code]').forEach(function(el){ var item = RA_LANGUAGES[window.currentLanguage] || RA_LANGUAGES.tr; el.textContent = item.shortLabel || window.currentLanguage.toUpperCase(); }); }
  function applyI18n(root) { root = root || document.body; if (!root || i18nApplying) return; i18nApplying = true; try { document.documentElement.lang = window.currentLanguage; document.documentElement.setAttribute('data-current-language', window.currentLanguage); document.title = (RA_LANGUAGES[window.currentLanguage] || RA_LANGUAGES.tr).title; document.querySelectorAll('[data-language]').forEach(function(btn){ btn.classList.toggle('active', btn.dataset.language === window.currentLanguage); btn.setAttribute('aria-pressed', btn.dataset.language === window.currentLanguage ? 'true' : 'false'); }); var guideLink = document.getElementById('guide-link'); if (guideLink) guideLink.href = 'user-guide.html?lang=' + window.currentLanguage; var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function(node){ var p=node.parentElement; if(!p || isI18nSkipped(p) || ['SCRIPT','STYLE','TEXTAREA','CODE','PRE','CANVAS','OPTION'].indexOf(p.tagName)>=0) return NodeFilter.FILTER_REJECT; return NodeFilter.FILTER_ACCEPT; } }); var nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode); nodes.forEach(localizeTextNode); if (root.nodeType === Node.ELEMENT_NODE) localizeAttributes(root); if (root.querySelectorAll) root.querySelectorAll('[title], [placeholder], [aria-label]').forEach(localizeAttributes); updateLanguageChrome(); } finally { i18nApplying = false; } }
  function setupLanguageSwitcher() { document.querySelectorAll('select[data-language-select], #language-select').forEach(function(select){ setLanguageOptions(select); select.value = window.currentLanguage; select.onchange = function(){ setLanguage(select.value); }; }); document.querySelectorAll('[data-language]').forEach(function(btn){ btn.onclick = function(){ setLanguage(btn.dataset.language); }; }); if (!i18nObserver && document.body) { var pending=false; i18nObserver = new MutationObserver(function(){ if(i18nApplying || pending) return; pending=true; requestAnimationFrame(function(){ pending=false; applyI18n(document.body); }); }); i18nObserver.observe(document.body, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:['title','placeholder','aria-label'] }); } applyI18n(document.body); }
  function setLanguage(lang) { var next = normalizeLanguage(lang); window.currentLanguage = next; persistLanguage(); applyI18n(document.body); try { window.dispatchEvent(new CustomEvent('radiography-language-change', { detail: { language: next } })); } catch (_) {} var msg = next === 'tr' ? 'Dil T\u00fcrk\u00e7e olarak ayarland\u0131.' : next === 'de' ? 'Dil Almanca olarak ayarland\u0131.' : 'Language set to English.'; if (typeof window.updateStatus === 'function') window.updateStatus(msg, 'success'); }
  function registerRadiographyLanguage(code, config, translations, exportHeaders) { code = String(code || '').toLowerCase().slice(0,2); if (!code) return; RA_LANGUAGES[code] = Object.assign({ code: code, label: code.toUpperCase(), shortLabel: code.toUpperCase(), title: 'Radiography Analysis' }, config || {}); TRANSLATIONS[code] = translations || {}; REVERSE[code] = reverseMap(TRANSLATIONS[code]); EXPORT_HEADERS[code] = exportHeaders || {}; }


  // 2026-06-04 release UI completion: mobile menu and Excel guide labels.
  Object.assign(TR_TO_EN, {
    "Men\u00fc": "Menu",
    "Mobil uygulama men\u00fcs\u00fc": "Mobile application menu",
    "Ana men\u00fc": "Main menu",
    "Analiz ara\u00e7lar\u0131 ve ba\u011flant\u0131lar": "Analysis tools and links",
    "Kullan\u0131m k\u0131lavuzu": "User guide",
    "AllJect yerel": "AllJect local",
    "Yeni Excel \u00f6zellikleri": "New Excel features",
    "Tam foto\u011fraf kalite sat\u0131rlar\u0131": "Full-image quality rows",
    "ROI \u00f6l\u00e7\u00fcm sat\u0131rlar\u0131": "ROI measurement rows",
    "Kalite kolonlar\u0131": "Quality columns",
    "A\u00e7\u0131klar\u0131 kapat": "Close open items",
    "H\u0131zl\u0131 okuma \u00f6nerisi": "Quick reading suggestion"
  });
  Object.assign(TR_TO_DE, {
    "Men\u00fc": "Men\u00fc",
    "Mobil uygulama men\u00fcs\u00fc": "Mobiles Anwendungsmen\u00fc",
    "Ana men\u00fc": "Hauptmen\u00fc",
    "Analiz ara\u00e7lar\u0131 ve ba\u011flant\u0131lar": "Analysewerkzeuge und Links",
    "Kullan\u0131m k\u0131lavuzu": "Benutzerhandbuch",
    "AllJect yerel": "AllJect lokal",
    "Yeni Excel \u00f6zellikleri": "Neue Excel-Funktionen",
    "Tam foto\u011fraf kalite sat\u0131rlar\u0131": "Vollbild-Qualit\u00e4tszeilen",
    "ROI \u00f6l\u00e7\u00fcm sat\u0131rlar\u0131": "ROI-Messzeilen",
    "Kalite kolonlar\u0131": "Qualit\u00e4tsspalten",
    "A\u00e7\u0131klar\u0131 kapat": "Ge\u00f6ffnete schlie\u00dfen",
    "H\u0131zl\u0131 okuma \u00f6nerisi": "Schnelle Leseempfehlung"
  });



  // 2026-06-04 derived radiographic Excel indices.
  Object.assign(TR_TO_EN, {
    "Research Usability Score": "Research Usability Score",
    "Exposure Balance Score": "Exposure Balance Score",
    "Robust Contrast Score": "Robust Contrast Score",
    "Clipping Risk Class": "Clipping Risk Class",
    "Saturation Margin %": "Saturation Margin %",
    "Sharpness-to-Noise Index": "Sharpness-to-Noise Index",
    "Radiographic CNR Proxy": "Radiographic CNR Proxy",
    "Texture Heterogeneity Score": "Texture Heterogeneity Score",
    "Trabecular Thickness/Separation Ratio": "Trabecular Thickness/Separation Ratio",
    "Trabecular Porosity Index %": "Trabecular Porosity Index %",
    "Mean-Median Delta": "Mean-Median Delta",
    "Technical Review Flag": "Technical Review Flag",
    "Low": "Low",
    "Moderate": "Moderate",
    "High": "High",
    "Review": "Review",
    "Pass": "Pass"
  });
  Object.assign(TR_TO_DE, {
    "Research Usability Score": "Forschungs-Nutzbarkeitsscore",
    "Exposure Balance Score": "Belichtungs-Balance-Score",
    "Robust Contrast Score": "Robuster Kontrastscore",
    "Clipping Risk Class": "Clipping-Risikoklasse",
    "Saturation Margin %": "Sättigungsreserve %",
    "Sharpness-to-Noise Index": "Schärfe-Rausch-Index",
    "Radiographic CNR Proxy": "Radiographischer CNR-Proxy",
    "Texture Heterogeneity Score": "Textur-Heterogenitätsscore",
    "Trabecular Thickness/Separation Ratio": "Trabekeldicke/Abstands-Verhältnis",
    "Trabecular Porosity Index %": "Trabekulärer Porositätsindex %",
    "Mean-Median Delta": "Mittelwert-Median-Delta",
    "Technical Review Flag": "Technische Prüfflagge",
    "Low": "Niedrig",
    "Moderate": "Moderat",
    "High": "Hoch",
    "Review": "Prüfen",
    "Pass": "Bestanden"
  });

  REVERSE.en = reverseMap(TR_TO_EN); REVERSE.de = reverseMap(TR_TO_DE);
  window.currentLanguage = getInitialLanguage(); window.RA_LANGUAGES = RA_LANGUAGES; window.RA_TRANSLATIONS = TRANSLATIONS; window.registerRadiographyLanguage = registerRadiographyLanguage; window.normalizeLanguage = normalizeLanguage; window.readSavedSettings = readSavedSettings; window.writeSavedSettings = writeSavedSettings; window.t = t; window.getLanguageLabel = getLanguageLabel; window.localizeExportHeader = localizeExportHeader; window.localizeExportCell = localizeExportCell; window.persistLanguage = persistLanguage; window.applyI18n = applyI18n; window.setupLanguageSwitcher = setupLanguageSwitcher; window.setLanguage = setLanguage;
}());
