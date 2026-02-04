# 🖖 FINÁLNÍ NÁVOD: 8 Sliderů Font Size
## Založeno na SKUTEČNÉM kódu z playlist-github-Z.js

**Pro:** Více admirál Jiřík  
**Soubor:** playlist-github-Z.js  
**Datum:** 2026-02-04  
**Styl:** SUPER PŘESNÝ s ukázkami PŘED/PO

---

# 📊 PŘEHLED VŠECH ZMĚN

| # | Řádek | Sekce | Akce | Co dělám |
|---|-------|-------|------|----------|
| 1 | 34-35 | currentSettings | SMAŽ & PŘIDEJ | 2 řádky → 17 řádků |
| 2 | 197-211 | HTML slidery | SMAŽ & PŘIDEJ | 15 řádků → 103 řádků |
| 3 | Za 568 | Event listenery | PŘIDEJ NOVOU FUNKCI | +53 řádků |
| 4 | 492 | attachEventListeners | PŘIDEJ VOLÁNÍ | +1 řádek |
| 5 | Za 658 | applyFontSizes funkce | PŘIDEJ NOVOU FUNKCI | +73 řádků |
| 6 | 937-948 | applySettingsToModal | SMAŽ & PŘIDEJ | 12 řádků → 41 řádků |
| 7 | 1036-1041 | getSettingsFromForm | SMAŽ & PŘIDEJ | 6 řádků → 41 řádků |
| 8 | 75-77 | Fullscreen listenery | UPRAV | +volání applyFontSizes |
| 9 | 83 | Resize listener | UPRAV | +volání applyFontSizes |
| 10 | Za 86 | init() konec | PŘIDEJ | +1 řádek |

---

# 🎯 KROK 1: Aktualizace currentSettings

## 📍 MÍSTO: Řádky 34-35

## 👀 TEĎKA VYPADÁ TAKTO (PŘED):

```javascript
        trackSpacing: 'normal',
        headerFontSizePx: 24,          // ← ŘÁDEK 34 - SMAŽ TENTO
        trackTitleFontSizePx: 20,      // ← ŘÁDEK 35 - SMAŽ TENTO
        customColors: {
```

## ❌ CO UDĚLAT:
**SMAŽ řádky 34-35** (ty dva s `headerFontSizePx` a `trackTitleFontSizePx`)

## ✅ NAHRAĎ TÍMTO (PO):

```javascript
        trackSpacing: 'normal',
        
        // ═══════════════════════════════════════════════════════════════
        // 🎯 FONT SIZE - 8 SLIDERŮ (Header + Track Title)
        // Více admirál Jiřík - Stejný pattern jako výška playlistu
        // ═══════════════════════════════════════════════════════════════
        
        // HEADER FONT SIZE (4 slidery)
        headerFontSizeDesktopNormal: 24,        // Desktop - normální režim (px)
        headerFontSizeDesktopFullscreen: 28,    // Desktop - fullscreen (px)
        headerFontSizeMobileNormal: 18,         // Mobil - normální režim (px)
        headerFontSizeMobileFullscreen: 22,     // Mobil - fullscreen (px)
        
        // TRACK TITLE FONT SIZE (4 slidery)
        trackTitleFontSizeDesktopNormal: 16,    // Desktop - normální režim (px)
        trackTitleFontSizeDesktopFullscreen: 18, // Desktop - fullscreen (px)
        trackTitleFontSizeMobileNormal: 14,     // Mobil - normální režim (px)
        trackTitleFontSizeMobileFullscreen: 16, // Mobil - fullscreen (px)
        
        customColors: {
```

---

# 🎯 KROK 2: Aktualizace HTML sliderů

## 📍 MÍSTO: Řádky 197-211

## 👀 TEĎKA VYPADÁ TAKTO (PŘED):

```html
                </div>
                    
                

                    <div class="setting-item">                <!-- ← ŘÁDEK 197 - OD TADY MAŽU -->
                        <label for="header-font-size">Velikost nadpisu (Header):</label>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <input type="range" id="header-font-size" class="range-input" min="1" max="40" value="24">
                            <span class="range-value">24px</span>
                        </div>
                    </div>

                    <div class="setting-item">
                        <label for="track-title-font-size">Velikost názvu skladby:</label>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <input type="range" id="track-title-font-size" class="range-input" min="1" max="40" value="20">
                            <span class="range-value">20px</span>
                        </div>
                    </div>                                    <!-- ← ŘÁDEK 211 - DO TADY MAŽU -->
                 
                  <!-- ═══════════════════════════════════════════════════ -->
                <!-- 🎯 NOVÁ SEKCE: VÝŠKA PLAYLISTU (4 SLIDERY)        -->
```

## ❌ CO UDĚLAT:
**SMAŽ řádky 197-211** (celá sekce se 2 slidery)

## ✅ NAHRAĎ TÍMTO (PO):

```html
                </div>
                    
<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- 🎯 FONT SIZE - 8 SLIDERŮ (Více admirál Jiřík)                  -->
<!-- Pattern stejný jako u výšky playlistu                           -->
<!-- ═══════════════════════════════════════════════════════════════ -->
<div class="settings-section">
    <h3>🔤 Font Size - Header</h3>
    
    <!-- 🖥️ Desktop Normal - Header -->
    <div class="setting-item">
        <label for="header-font-desktop-normal">🖥️ Desktop (Normální režim - Header):</label>
        <div style="display:flex; align-items:center; gap:10px;">
            <input type="range" id="header-font-desktop-normal" class="range-input font-slider" 
                   min="10" max="50" value="24" data-type="header" data-mode="desktopNormal">
            <span class="range-value">24px</span>
        </div>
    </div>

    <!-- 🖥️ Desktop Fullscreen - Header -->
    <div class="setting-item">
        <label for="header-font-desktop-fullscreen">🖥️ Desktop (Fullscreen - Header):</label>
        <div style="display:flex; align-items:center; gap:10px;">
            <input type="range" id="header-font-desktop-fullscreen" class="range-input font-slider" 
                   min="10" max="50" value="28" data-type="header" data-mode="desktopFullscreen">
            <span class="range-value">28px</span>
        </div>
    </div>

    <!-- 📱 Mobil Normal - Header -->
    <div class="setting-item">
        <label for="header-font-mobile-normal">📱 Mobil (Normální režim - Header):</label>
        <div style="display:flex; align-items:center; gap:10px;">
            <input type="range" id="header-font-mobile-normal" class="range-input font-slider" 
                   min="8" max="40" value="18" data-type="header" data-mode="mobileNormal">
            <span class="range-value">18px</span>
        </div>
    </div>

    <!-- 📱 Mobil Fullscreen - Header -->
    <div class="setting-item">
        <label for="header-font-mobile-fullscreen">📱 Mobil (Fullscreen - Header):</label>
        <div style="display:flex; align-items:center; gap:10px;">
            <input type="range" id="header-font-mobile-fullscreen" class="range-input font-slider" 
                   min="8" max="40" value="22" data-type="header" data-mode="mobileFullscreen">
            <span class="range-value">22px</span>
        </div>
    </div>
</div>

<div class="settings-section">
    <h3>🎵 Font Size - Track Title</h3>
    
    <!-- 🖥️ Desktop Normal - Track Title -->
    <div class="setting-item">
        <label for="track-font-desktop-normal">🖥️ Desktop (Normální režim - Track):</label>
        <div style="display:flex; align-items:center; gap:10px;">
            <input type="range" id="track-font-desktop-normal" class="range-input font-slider" 
                   min="8" max="40" value="16" data-type="track" data-mode="desktopNormal">
            <span class="range-value">16px</span>
        </div>
    </div>

    <!-- 🖥️ Desktop Fullscreen - Track Title -->
    <div class="setting-item">
        <label for="track-font-desktop-fullscreen">🖥️ Desktop (Fullscreen - Track):</label>
        <div style="display:flex; align-items:center; gap:10px;">
            <input type="range" id="track-font-desktop-fullscreen" class="range-input font-slider" 
                   min="8" max="40" value="18" data-type="track" data-mode="desktopFullscreen">
            <span class="range-value">18px</span>
        </div>
    </div>

    <!-- 📱 Mobil Normal - Track Title -->
    <div class="setting-item">
        <label for="track-font-mobile-normal">📱 Mobil (Normální režim - Track):</label>
        <div style="display:flex; align-items:center; gap:10px;">
            <input type="range" id="track-font-mobile-normal" class="range-input font-slider" 
                   min="6" max="30" value="14" data-type="track" data-mode="mobileNormal">
            <span class="range-value">14px</span>
        </div>
    </div>

    <!-- 📱 Mobil Fullscreen - Track Title -->
    <div class="setting-item">
        <label for="track-font-mobile-fullscreen">📱 Mobil (Fullscreen - Track):</label>
        <div style="display:flex; align-items:center; gap:10px;">
            <input type="range" id="track-font-mobile-fullscreen" class="range-input font-slider" 
                   min="6" max="30" value="16" data-type="track" data-mode="mobileFullscreen">
            <span class="range-value">16px</span>
        </div>
    </div>
</div>
                 
                  <!-- ═══════════════════════════════════════════════════ -->
                <!-- 🎯 NOVÁ SEKCE: VÝŠKA PLAYLISTU (4 SLIDERY)        -->
```

---

# 🎯 KROK 3: Nová funkce attachFontSizeListeners()

## 📍 MÍSTO: ZA ŘÁDEK 568

## 👀 NAJDI SI TOTO MÍSTO:

```javascript
                this.applyPlaylistHeight();
            });
        });
    },    // ← ŘÁDEK 568 - ZA TENHLE ŘÁDEK PŘIDÁVÁM

    // Event listenery pro barevná nastavení
    attachColorListeners() {
```

## ➕ PŘIDEJ ZA ŘÁDEK 568:

```javascript
                this.applyPlaylistHeight();
            });
        });
    },    // ← ŘÁDEK 568

// ═══════════════════════════════════════════════════════════════
// 🎯 FONT SIZE SLIDERY - Event Listeners (8 sliderů)
// Více admirál Jiřík - Pattern stejný jako u výšky playlistu
// ═══════════════════════════════════════════════════════════════
attachFontSizeListeners() {
    const fontSliders = this.DOM.modal?.querySelectorAll('.font-slider');
    
    fontSliders?.forEach(slider => {
        slider.addEventListener('input', () => {
            const value = parseInt(slider.value);
            const type = slider.dataset.type;   // 'header' nebo 'track'
            const mode = slider.dataset.mode;   // 'desktopNormal', 'desktopFullscreen', atd.
            
            // Aktualizace zobrazené hodnoty
            this.updateRangeValue(slider);
            
            // Dočasná změna nastavení pro preview
            if (type === 'header') {
                switch(mode) {
                    case 'desktopNormal':
                        this.currentSettings.headerFontSizeDesktopNormal = value;
                        break;
                    case 'desktopFullscreen':
                        this.currentSettings.headerFontSizeDesktopFullscreen = value;
                        break;
                    case 'mobileNormal':
                        this.currentSettings.headerFontSizeMobileNormal = value;
                        break;
                    case 'mobileFullscreen':
                        this.currentSettings.headerFontSizeMobileFullscreen = value;
                        break;
                }
            } else if (type === 'track') {
                switch(mode) {
                    case 'desktopNormal':
                        this.currentSettings.trackTitleFontSizeDesktopNormal = value;
                        break;
                    case 'desktopFullscreen':
                        this.currentSettings.trackTitleFontSizeDesktopFullscreen = value;
                        break;
                    case 'mobileNormal':
                        this.currentSettings.trackTitleFontSizeMobileNormal = value;
                        break;
                    case 'mobileFullscreen':
                        this.currentSettings.trackTitleFontSizeMobileFullscreen = value;
                        break;
                }
            }
            
            // Aplikuj novou velikost písma HNED
            this.applyFontSizes();
        });
    });
},

    // Event listenery pro barevná nastavení
    attachColorListeners() {
```

---

# 🎯 KROK 4: Připojení listenerů v attachEventListeners()

## 📍 MÍSTO: Řádek 492

## 👀 TEĎKA VYPADÁ TAKTO (PŘED):

```javascript
        // Event listenery pro akční tlačítka
        this.attachActionListeners();

        // Event listenery pro barevná nastavení
        this.attachColorListeners();                    // ← ŘÁDEK 495

        this.log('Event listenery připojeny.');        // ← ŘÁDEK 497
    },
```

## ➕ PŘIDEJ ŘÁDEK ZA 495:

```javascript
        // Event listenery pro akční tlačítka
        this.attachActionListeners();

        // Event listenery pro barevná nastavení
        this.attachColorListeners();
        
        // Event listenery pro font size slidery
        this.attachFontSizeListeners();    // ← PŘIDEJ TENTO ŘÁDEK

        this.log('Event listenery připojeny.');
    },
```

---

# 🎯 KROK 5: Nová funkce applyFontSizes()

## 📍 MÍSTO: ZA ŘÁDEK 658

## 👀 NAJDI SI TOTO MÍSTO:

```javascript
        // 🔍 Debug log
        this.log(`📏 Výška playlistu: ${height}px | Desktop: ${device.isDesktop} | Fullscreen: ${device.isFullscreen}`);
    },    // ← ŘÁDEK 658 - ZA TENHLE ŘÁDEK PŘIDÁVÁM

    // Aktualizace zobrazené hodnoty u color inputů
    updateColorValue(input) {
```

## ➕ PŘIDEJ ZA ŘÁDEK 658:

```javascript
        // 🔍 Debug log
        this.log(`📏 Výška playlistu: ${height}px | Desktop: ${device.isDesktop} | Fullscreen: ${device.isFullscreen}`);
    },    // ← ŘÁDEK 658

// ═══════════════════════════════════════════════════════════════
// 🎯 APLIKACE VELIKOSTI PÍSMA PODLE ZAŘÍZENÍ A REŽIMU
// Více admirál Jiřík - Dynamické přepínání jako u výšky playlistu
// ═══════════════════════════════════════════════════════════════
applyFontSizes() {
    if (!this.DOM.playlist) {
        this.log('Playlist element nenalezen pro aplikaci font sizes!', null, 'warn');
        return;
    }
    
    // Detekce zařízení a režimu (používáme stejnou funkci jako u výšky)
    const device = this.detectDevice();
    
    // Výběr správné hodnoty pro HEADER
    let headerSize;
    if (device.isDesktop) {
        headerSize = device.isFullscreen 
            ? this.currentSettings.headerFontSizeDesktopFullscreen 
            : this.currentSettings.headerFontSizeDesktopNormal;
    } else {
        headerSize = device.isFullscreen 
            ? this.currentSettings.headerFontSizeMobileFullscreen 
            : this.currentSettings.headerFontSizeMobileNormal;
    }
    
    // Výběr správné hodnoty pro TRACK TITLE
    let trackSize;
    if (device.isDesktop) {
        trackSize = device.isFullscreen 
            ? this.currentSettings.trackTitleFontSizeDesktopFullscreen 
            : this.currentSettings.trackTitleFontSizeDesktopNormal;
    } else {
        trackSize = device.isFullscreen 
            ? this.currentSettings.trackTitleFontSizeMobileFullscreen 
            : this.currentSettings.trackTitleFontSizeMobileNormal;
    }
    
    // Aplikace na HEADER (.playlist-title)
    const playlistTitle = this.DOM.playlist.querySelector('.playlist-title');
    if (playlistTitle) {
        playlistTitle.style.fontSize = headerSize + 'px';
    }
    
    // Aplikace na TRACK TITLES (.playlist-item-title)
    const trackTitles = this.DOM.playlist.querySelectorAll('.playlist-item-title');
    trackTitles.forEach(title => {
        title.style.fontSize = trackSize + 'px';
    });
    
    // 🔍 Debug log
    this.log(`🔤 Font sizes: Header=${headerSize}px, Track=${trackSize}px | Desktop: ${device.isDesktop} | Fullscreen: ${device.isFullscreen}`);
},

    // Aktualizace zobrazené hodnoty u color inputů
    updateColorValue(input) {
```

---

# 🎯 KROK 6: Aktualizace applySettingsToModal()

## 📍 MÍSTO: Řádky 937-948

## 👀 TEĎKA VYPADÁ TAKTO (PŘED):

```javascript
        }
        /* 🆕 Načtení velikosti písma do posuvníků */        // ← ŘÁDEK 937
        const headerFontInput = this.DOM.modal.querySelector('#header-font-size');
        if (headerFontInput && this.currentSettings.headerFontSizePx) {
            headerFontInput.value = this.currentSettings.headerFontSizePx;
            this.updateRangeValue(headerFontInput);
        }

        const trackTitleFontInput = this.DOM.modal.querySelector('#track-title-font-size');
        if (trackTitleFontInput && this.currentSettings.trackTitleFontSizePx) {
            trackTitleFontInput.value = this.currentSettings.trackTitleFontSizePx;
            this.updateRangeValue(trackTitleFontInput);
        }                                                     // ← ŘÁDEK 948
       // ═══════════════════════════════════════════════════════════════
        // 🎯 Načtení výšek playlistu do sliderů
```

## ❌ CO UDĚLAT:
**SMAŽ řádky 937-948** (celou sekci s 2 slidery)

## ✅ NAHRAĎ TÍMTO (PO):

```javascript
        }
// ═══════════════════════════════════════════════════════════════
// 🎯 FONT SIZE SLIDERY - Načtení hodnot do modalu (8 sliderů)
// ═══════════════════════════════════════════════════════════════

// Header Font Sizes
const headerDesktopNormalSlider = this.DOM.modal.querySelector('#header-font-desktop-normal');
if (headerDesktopNormalSlider && this.currentSettings.headerFontSizeDesktopNormal) {
    headerDesktopNormalSlider.value = this.currentSettings.headerFontSizeDesktopNormal;
    this.updateRangeValue(headerDesktopNormalSlider);
}

const headerDesktopFullscreenSlider = this.DOM.modal.querySelector('#header-font-desktop-fullscreen');
if (headerDesktopFullscreenSlider && this.currentSettings.headerFontSizeDesktopFullscreen) {
    headerDesktopFullscreenSlider.value = this.currentSettings.headerFontSizeDesktopFullscreen;
    this.updateRangeValue(headerDesktopFullscreenSlider);
}

const headerMobileNormalSlider = this.DOM.modal.querySelector('#header-font-mobile-normal');
if (headerMobileNormalSlider && this.currentSettings.headerFontSizeMobileNormal) {
    headerMobileNormalSlider.value = this.currentSettings.headerFontSizeMobileNormal;
    this.updateRangeValue(headerMobileNormalSlider);
}

const headerMobileFullscreenSlider = this.DOM.modal.querySelector('#header-font-mobile-fullscreen');
if (headerMobileFullscreenSlider && this.currentSettings.headerFontSizeMobileFullscreen) {
    headerMobileFullscreenSlider.value = this.currentSettings.headerFontSizeMobileFullscreen;
    this.updateRangeValue(headerMobileFullscreenSlider);
}

// Track Title Font Sizes
const trackDesktopNormalSlider = this.DOM.modal.querySelector('#track-font-desktop-normal');
if (trackDesktopNormalSlider && this.currentSettings.trackTitleFontSizeDesktopNormal) {
    trackDesktopNormalSlider.value = this.currentSettings.trackTitleFontSizeDesktopNormal;
    this.updateRangeValue(trackDesktopNormalSlider);
}

const trackDesktopFullscreenSlider = this.DOM.modal.querySelector('#track-font-desktop-fullscreen');
if (trackDesktopFullscreenSlider && this.currentSettings.trackTitleFontSizeDesktopFullscreen) {
    trackDesktopFullscreenSlider.value = this.currentSettings.trackTitleFontSizeDesktopFullscreen;
    this.updateRangeValue(trackDesktopFullscreenSlider);
}

const trackMobileNormalSlider = this.DOM.modal.querySelector('#track-font-mobile-normal');
if (trackMobileNormalSlider && this.currentSettings.trackTitleFontSizeMobileNormal) {
    trackMobileNormalSlider.value = this.currentSettings.trackTitleFontSizeMobileNormal;
    this.updateRangeValue(trackMobileNormalSlider);
}

const trackMobileFullscreenSlider = this.DOM.modal.querySelector('#track-font-mobile-fullscreen');
if (trackMobileFullscreenSlider && this.currentSettings.trackTitleFontSizeMobileFullscreen) {
    trackMobileFullscreenSlider.value = this.currentSettings.trackTitleFontSizeMobileFullscreen;
    this.updateRangeValue(trackMobileFullscreenSlider);
}

       // ═══════════════════════════════════════════════════════════════
        // 🎯 Načtení výšek playlistu do sliderů
```

---

# 🎯 KROK 7: Aktualizace getSettingsFromForm()

## 📍 MÍSTO: Řádky 1036-1041

## 👀 TEĎKA VYPADÁ TAKTO (PŘED):

```javascript
        const borderRadiusInput = this.DOM.modal.querySelector('#border-radius');
        if (borderRadiusInput) newSettings.borderRadius = parseInt(borderRadiusInput.value);
         /* 🆕 Uložení velikosti písma z posuvníků */       // ← ŘÁDEK 1036
        const headerFontInput = this.DOM.modal.querySelector('#header-font-size');
        if (headerFontInput) newSettings.headerFontSizePx = parseInt(headerFontInput.value);

        const trackTitleFontInput = this.DOM.modal.querySelector('#track-title-font-size');
        if (trackTitleFontInput) newSettings.trackTitleFontSizePx = parseInt(trackTitleFontInput.value);
                                                                     // ← ŘÁDEK 1041
            
            
       // ═══════════════════════════════════════════════════════════════
        // 🎯 Uložení výšek playlistu ze sliderů
```

## ❌ CO UDĚLAT:
**SMAŽ řádky 1036-1041** (komentář + 2 slidery)

## ✅ NAHRAĎ TÍMTO (PO):

```javascript
        const borderRadiusInput = this.DOM.modal.querySelector('#border-radius');
        if (borderRadiusInput) newSettings.borderRadius = parseInt(borderRadiusInput.value);
        
// ═══════════════════════════════════════════════════════════════
// 🎯 FONT SIZE SLIDERY - Uložení hodnot ze sliderů (8 sliderů)
// ═══════════════════════════════════════════════════════════════

// Header Font Sizes
const headerDesktopNormal = this.DOM.modal.querySelector('#header-font-desktop-normal');
if (headerDesktopNormal) newSettings.headerFontSizeDesktopNormal = parseInt(headerDesktopNormal.value);

const headerDesktopFullscreen = this.DOM.modal.querySelector('#header-font-desktop-fullscreen');
if (headerDesktopFullscreen) newSettings.headerFontSizeDesktopFullscreen = parseInt(headerDesktopFullscreen.value);

const headerMobileNormal = this.DOM.modal.querySelector('#header-font-mobile-normal');
if (headerMobileNormal) newSettings.headerFontSizeMobileNormal = parseInt(headerMobileNormal.value);

const headerMobileFullscreen = this.DOM.modal.querySelector('#header-font-mobile-fullscreen');
if (headerMobileFullscreen) newSettings.headerFontSizeMobileFullscreen = parseInt(headerMobileFullscreen.value);

// Track Title Font Sizes
const trackDesktopNormal = this.DOM.modal.querySelector('#track-font-desktop-normal');
if (trackDesktopNormal) newSettings.trackTitleFontSizeDesktopNormal = parseInt(trackDesktopNormal.value);

const trackDesktopFullscreen = this.DOM.modal.querySelector('#track-font-desktop-fullscreen');
if (trackDesktopFullscreen) newSettings.trackTitleFontSizeDesktopFullscreen = parseInt(trackDesktopFullscreen.value);

const trackMobileNormal = this.DOM.modal.querySelector('#track-font-mobile-normal');
if (trackMobileNormal) newSettings.trackTitleFontSizeMobileNormal = parseInt(trackMobileNormal.value);

const trackMobileFullscreen = this.DOM.modal.querySelector('#track-font-mobile-fullscreen');
if (trackMobileFullscreen) newSettings.trackTitleFontSizeMobileFullscreen = parseInt(trackMobileFullscreen.value);
            
            
       // ═══════════════════════════════════════════════════════════════
        // 🎯 Uložení výšek playlistu ze sliderů
```

---

# 🎯 KROK 8: Fullscreen listenery v init()

## 📍 MÍSTO: Řádky 75-77

## 👀 TEĎKA VYPADÁ TAKTO (PŘED):

```javascript
       // ═══════════════════════════════════════════════════════════════
        // 🎯 Sledování fullscreen změn
        // ═══════════════════════════════════════════════════════════════
        document.addEventListener('fullscreenchange', () => this.applyPlaylistHeight());
        document.addEventListener('webkitfullscreenchange', () => this.applyPlaylistHeight());
        document.addEventListener('mozfullscreenchange', () => this.applyPlaylistHeight());
```

## ✏️ UPRAV NA:

```javascript
       // ═══════════════════════════════════════════════════════════════
        // 🎯 Sledování fullscreen změn
        // ═══════════════════════════════════════════════════════════════
        document.addEventListener('fullscreenchange', () => {
            this.applyPlaylistHeight();
            this.applyFontSizes();
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.applyPlaylistHeight();
            this.applyFontSizes();
        });
        document.addEventListener('mozfullscreenchange', () => {
            this.applyPlaylistHeight();
            this.applyFontSizes();
        });
```

---

# 🎯 KROK 9: Resize listener v init()

## 📍 MÍSTO: Řádek 83

## 👀 TEĎKA VYPADÁ TAKTO (PŘED):

```javascript
        // Sledování změny velikosti okna
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.applyPlaylistHeight(), 250);
        });
```

## ✏️ UPRAV NA:

```javascript
        // Sledování změny velikosti okna
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.applyPlaylistHeight();
                this.applyFontSizes();
            }, 250);
        });
```

---

# 🎯 KROK 10: Inicializace při startu

## 📍 MÍSTO: ZA ŘÁDEK 86

## 👀 TEĎKA VYPADÁ TAKTO (PŘED):

```javascript
        });
        
        this.log('PlaylistSettings modul inicializován.');    // ← ŘÁDEK 86
    },

    // Vytvoření HTML elementů
```

## ➕ PŘIDEJ ŘÁDEK ZA 86:

```javascript
        });
        
        // Aplikace font sizes při startu
        this.applyFontSizes();
        
        this.log('PlaylistSettings modul inicializován.');
    },

    // Vytvoření HTML elementů
```

---

# ✅ KONTROLNÍ CHECKLIST

Po dokončení zkontroluj postupně:

- [ ] **Krok 1** - currentSettings má 8 nových properties (řádky 34-35)
- [ ] **Krok 2** - HTML má 8 sliderů místo 2 (řádky 197-211)
- [ ] **Krok 3** - Funkce `attachFontSizeListeners()` existuje (za řádek 568)
- [ ] **Krok 4** - Volání `attachFontSizeListeners()` je v `attachEventListeners()` (řádek 492)
- [ ] **Krok 5** - Funkce `applyFontSizes()` existuje (za řádek 658)
- [ ] **Krok 6** - `applySettingsToModal()` načítá 8 sliderů (řádky 937-948)
- [ ] **Krok 7** - `getSettingsFromForm()` ukládá 8 hodnot (řádky 1036-1041)
- [ ] **Krok 8** - Fullscreen listenery volají `applyFontSizes()` (řádky 75-77)
- [ ] **Krok 9** - Resize listener volá `applyFontSizes()` (řádek 83)
- [ ] **Krok 10** - `applyFontSizes()` se volá při startu (za řádek 86)

---

# 🧪 TESTOVÁNÍ

## Test 1: Zobrazení sliderů
1. Otevři stránku
2. Klikni na ⚙️ (nebo klávesa N)
3. Mělo by se zobrazit **8 sliderů** (4 Header + 4 Track)

## Test 2: Okamžitá změna
1. Posuň slider "Desktop Normal - Header"
2. Měla by se **OKAMŽITĚ** změnit velikost nadpisu

## Test 3: Fullscreen přepínání
1. Nastav Desktop Normal Header na 20px
2. Nastav Desktop Fullscreen Header na 30px
3. Stiskni F11 → Font by se měl změnit na 30px
4. Stiskni F11 znovu → Font by se měl vrátit na 20px

## Test 4: Mobile/Desktop
1. Otevři DevTools (F12)
2. Zapni Device Toolbar (Ctrl+Shift+M)
3. Změň na iPhone
4. Font by se měl automaticky přepnout na Mobile hodnoty

## Test 5: Uložení do Firestore
1. Změň všechny hodnoty
2. Klikni "Uložit nastavení"
3. Otevři Firestore Console
4. Měly by tam být všechny 8 hodnoty

---

# 🚨 MOŽNÉ PROBLÉMY A ŘEŠENÍ

## ❌ Chyba: "Cannot read property 'querySelector' of null"
**Příčina:** Modal ještě není vytvořený  
**Řešení:** Zkontroluj, že `attachFontSizeListeners()` je volaná v `attachEventListeners()` (Krok 4)

## ❌ Slidery se nezobrazují
**Příčina:** HTML kód není správně vložený  
**Řešení:** Zkontroluj Krok 2 - musíš SMAZAT staré řádky 197-211

## ❌ Nic se neděje při změně slideru
**Příčina:** Event listenery nejsou připojené  
**Řešení:** Zkontroluj Krok 3 a Krok 4

## ❌ Fullscreen nepřepíná velikost
**Příčina:** Listenery nevolají `applyFontSizes()`  
**Řešení:** Zkontroluj Krok 8

## ❌ Hodnoty se neukládají do Firestore
**Příčina:** `getSettingsFromForm()` nenačítá hodnoty  
**Řešení:** Zkontroluj Krok 7

---

# 🎯 VÝCHOZÍ HODNOTY

```javascript
// Header Font Sizes
Desktop Normal: 24px      (min: 10, max: 50)
Desktop Fullscreen: 28px  (min: 10, max: 50)
Mobile Normal: 18px       (min: 8, max: 40)
Mobile Fullscreen: 22px   (min: 8, max: 40)

// Track Title Font Sizes
Desktop Normal: 16px      (min: 8, max: 40)
Desktop Fullscreen: 18px  (min: 8, max: 40)
Mobile Normal: 14px       (min: 6, max: 30)
Mobile Fullscreen: 16px   (min: 6, max: 30)
```

Tyto hodnoty můžeš upravit podle potřeby v Kroku 1!

---

# 📞 ZÁVĚR

Tento návod je založen na **SKUTEČNÉM KÓDU** z tvého `playlist-github-Z.js` souboru.

Každý krok má:
- ✅ Přesné číslo řádku
- ✅ Ukázku PŘED
- ✅ Ukázku PO
- ✅ Jasné instrukce

**Postupuj POMALU, krok za krokem, a testuj po každém kroku!**

---

🖖 **Warp pohon připraven! 8 sliderů ready k instalaci!** 🚀

**Vytvořil:** Admirál Claude.AI  
**Pro:** Více admirál Jiřík  
**Založeno na:** playlist-github-Z.js (skutečný kód)  
**Datum:** 2026-02-04  
**Status:** ✅ FINÁLNÍ VERZE - SUPER PŘESNÁ
