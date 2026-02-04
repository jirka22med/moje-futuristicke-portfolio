# 🖖 NÁVOD PRO NOOBY: 8 Sliderů Font Size
## S ukázkami PŘED/PO a přesnými řádky

**Pro:** Více admirál Jiřík  
**Styl:** Krok za krokem s ukázkami - pro absolutní začátečníky  

---

# 📋 SEZNAM ZMĚN (RYCHLÝ PŘEHLED)

| Krok | Kde (řádek) | Co dělám | Akce |
|------|------------|----------|------|
| 1 | 33-34 | currentSettings | SMAŽ 2 řádky, PŘIDEJ 17 nových |
| 2 | 196-210 | HTML slidery | SMAŽ 15 řádků, PŘIDAJ 103 nových |
| 3 | Za 699 | Event listenery | PŘIDEJ 53 řádků |
| 4 | Za 1290 | Funkce applyFontSizes | PŘIDEJ 73 řádků |
| 5 | Cca 960 | loadSettingsFromModal | PŘIDEJ 41 řádků |
| 6 | Cca 1065 | applySettingsToModal | PŘIDEJ 11 řádků |
| 7 | 74-76 | Fullscreen listenery | UPRAV 3 řádky |
| 8 | 80-83 | Resize listener | UPRAV 1 řádek |
| 9 | Za 85 | Init | PŘIDEJ 1 řádek |

---

# 🎯 KROK 1: Aktualizace currentSettings

## 📍 KDE TO NAJDU?
Otevři `playlistSettings.js` a najdi **řádek 33-34**

## 👀 JAK TO TEĎKA VYPADÁ (PŘED):

```javascript
        trackSpacing: 'normal',
        headerFontSizePx: 24,                    // ← ŘÁDEK 33 - SMAŽ
        trackTitleFontSizePx: 20,                // ← ŘÁDEK 34 - SMAŽ
        customColors: {
```

## ❌ CO UDĚLÁM:
1. **SMAŽ** řádky 33-34 (ty dva s `headerFontSizePx` a `trackTitleFontSizePx`)

## ✅ JAK TO MÁ VYPADAT (PO):

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

## 📍 KDE TO NAJDU?
Najdi **řádek 196** - začíná to s `<div class="setting-item">`

## 👀 JAK TO TEĎKA VYPADÁ (PŘED):

```html
                    </div>
                </div>
                    
                

                    <div class="setting-item">              <!-- ← ŘÁDEK 196 - OD TADY MAŽU -->
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
                    </div>                                  <!-- ← ŘÁDEK 210 - DO TADY MAŽU -->
                 
                  <!-- ═══════════════════════════════════════════════════ -->
                <!-- 🎯 NOVÁ SEKCE: VÝŠKA PLAYLISTU (4 SLIDERY)        -->
```

## ❌ CO UDĚLÁM:
1. **SMAŽ** všechno od řádku 196 do řádku 210 (včetně)

## ✅ JAK TO MÁ VYPADAT (PO):

```html
                    </div>
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

# 🎯 KROK 3: Event Listenery

## 📍 KDE TO NAJDU?
Najdi **řádek 699** - končí to s `});` u mobil fullscreen slideru

## 👀 JAK TO TEĎKA VYPADÁ (PŘED):

```javascript
                });
            }
            
        },  // ← ŘÁDEK 699 - ZA TENHLE ŘÁDEK PŘIDÁVÁM NOVÝ KÓD

        // Aplikace nastavení do modal okna
        applySettingsToModal() {
```

## ➕ CO UDĚLÁM:
**PŘIDÁM** nový kód **ZA řádek 699** (mezi `},` a `// Aplikace nastavení`)

## ✅ JAK TO MÁ VYPADAT (PO):

```javascript
                });
            }
            
        },  // ← ŘÁDEK 699

// ═══════════════════════════════════════════════════════════════
// 🎯 FONT SIZE SLIDERY - Event Listeners (8 sliderů)
// Více admirál Jiřík - Pattern stejný jako u výšky playlistu
// ═══════════════════════════════════════════════════════════════
attachFontSizeListeners() {
    const fontSliders = this.DOM.modal.querySelectorAll('.font-slider');
    
    fontSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            const type = e.target.dataset.type;   // 'header' nebo 'track'
            const mode = e.target.dataset.mode;   // 'desktopNormal', 'desktopFullscreen', atd.
            const valueSpan = e.target.nextElementSibling;
            
            // Aktualizace zobrazené hodnoty
            if (valueSpan && valueSpan.classList.contains('range-value')) {
                valueSpan.textContent = value + 'px';
            }
            
            // Uložení do currentSettings
            if (type === 'header') {
                switch(mode) {
                    case 'desktopNormal':
                        this.currentSettings.headerFontSizeDesktopNormal = parseInt(value);
                        break;
                    case 'desktopFullscreen':
                        this.currentSettings.headerFontSizeDesktopFullscreen = parseInt(value);
                        break;
                    case 'mobileNormal':
                        this.currentSettings.headerFontSizeMobileNormal = parseInt(value);
                        break;
                    case 'mobileFullscreen':
                        this.currentSettings.headerFontSizeMobileFullscreen = parseInt(value);
                        break;
                }
            } else if (type === 'track') {
                switch(mode) {
                    case 'desktopNormal':
                        this.currentSettings.trackTitleFontSizeDesktopNormal = parseInt(value);
                        break;
                    case 'desktopFullscreen':
                        this.currentSettings.trackTitleFontSizeDesktopFullscreen = parseInt(value);
                        break;
                    case 'mobileNormal':
                        this.currentSettings.trackTitleFontSizeMobileNormal = parseInt(value);
                        break;
                    case 'mobileFullscreen':
                        this.currentSettings.trackTitleFontSizeMobileFullscreen = parseInt(value);
                        break;
                }
            }
            
            // Okamžitá aplikace změny
            this.applyFontSizes();
            
            this.log(`Font slider změněn: ${type} ${mode} = ${value}px`);
        });
    });
},

        // Aplikace nastavení do modal okna
        applySettingsToModal() {
```

---

# 🎯 KROK 4: Funkce applyFontSizes()

## 📍 KDE TO NAJDU?
Najdi **řádek 1290** - končí funkce `applyPlaylistHeight()` s `},`

## 👀 JAK TO TEĎKA VYPADÁ (PŘED):

```javascript
            this.log(`✅ Playlist výška aplikována [${mode} ${screen}]: ${playlistHeight}px`);
        },  // ← ŘÁDEK 1290 - ZA TENHLE ŘÁDEK PŘIDÁVÁM

        // Uložení nastavení do localStorage
        saveSettingsToLocalStorage() {
```

## ➕ CO UDĚLÁM:
**PŘIDÁM** funkci `applyFontSizes()` **ZA řádek 1290**

## ✅ JAK TO MÁ VYPADAT (PO):

```javascript
            this.log(`✅ Playlist výška aplikována [${mode} ${screen}]: ${playlistHeight}px`);
        },  // ← ŘÁDEK 1290

// ═══════════════════════════════════════════════════════════════
// 🎯 Aplikace velikosti písma podle zařízení a režimu
// Více admirál Jiřík - Dynamické přepínání jako u výšky playlistu
// ═══════════════════════════════════════════════════════════════
applyFontSizes() {
    if (!this.DOM.playlist) {
        this.log('Playlist element nenalezen pro aplikaci font sizes!', null, 'warn');
        return;
    }
    
    // Detekce zařízení a režimu
    const isMobile = window.innerWidth <= 768;
    const isFullscreen = document.fullscreenElement || 
                        document.webkitFullscreenElement || 
                        document.mozFullScreenElement;
    
    // Výběr správné hodnoty pro HEADER
    let headerSize;
    if (isMobile) {
        headerSize = isFullscreen 
            ? this.currentSettings.headerFontSizeMobileFullscreen 
            : this.currentSettings.headerFontSizeMobileNormal;
    } else {
        headerSize = isFullscreen 
            ? this.currentSettings.headerFontSizeDesktopFullscreen 
            : this.currentSettings.headerFontSizeDesktopNormal;
    }
    
    // Výběr správné hodnoty pro TRACK TITLE
    let trackSize;
    if (isMobile) {
        trackSize = isFullscreen 
            ? this.currentSettings.trackTitleFontSizeMobileFullscreen 
            : this.currentSettings.trackTitleFontSizeMobileNormal;
    } else {
        trackSize = isFullscreen 
            ? this.currentSettings.trackTitleFontSizeDesktopFullscreen 
            : this.currentSettings.trackTitleFontSizeDesktopNormal;
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
    
    const mode = isMobile ? 'Mobil' : 'Desktop';
    const screen = isFullscreen ? 'Fullscreen' : 'Normal';
    
    this.log(`✅ Font sizes aplikovány [${mode} ${screen}]: Header=${headerSize}px, Track=${trackSize}px`);
},

        // Uložení nastavení do localStorage
        saveSettingsToLocalStorage() {
```

---

# 🎯 KROK 5: Načtení hodnot v loadSettingsFromModal()

## 📍 KDE TO NAJDU?
Najdi funkci `loadSettingsFromModal()` - hledej text "playlistHeightMobileFullscreen"

## 👀 HLEDÁM TOTO:

```javascript
        const mobileFullscreenSlider = this.DOM.modal.querySelector('#height-mobile-fullscreen');
        if (mobileFullscreenSlider) {
            this.currentSettings.playlistHeightMobileFullscreen = parseInt(mobileFullscreenSlider.value);
        }
        // ← ZA TENHLE ŘÁDEK PŘIDÁVÁM NOVÝ KÓD
```

## ➕ CO UDĚLÁM:
**PŘIDÁM** za načítání height sliderů

## ✅ PŘIDÁM TENTO KÓD:

```javascript
// ═══════════════════════════════════════════════════════════════
// 🎯 FONT SIZE SLIDERY - Načtení hodnot z modalu
// ═══════════════════════════════════════════════════════════════

// Header Font Sizes
const headerDesktopNormal = this.DOM.modal.querySelector('#header-font-desktop-normal');
if (headerDesktopNormal) {
    this.currentSettings.headerFontSizeDesktopNormal = parseInt(headerDesktopNormal.value);
}

const headerDesktopFullscreen = this.DOM.modal.querySelector('#header-font-desktop-fullscreen');
if (headerDesktopFullscreen) {
    this.currentSettings.headerFontSizeDesktopFullscreen = parseInt(headerDesktopFullscreen.value);
}

const headerMobileNormal = this.DOM.modal.querySelector('#header-font-mobile-normal');
if (headerMobileNormal) {
    this.currentSettings.headerFontSizeMobileNormal = parseInt(headerMobileNormal.value);
}

const headerMobileFullscreen = this.DOM.modal.querySelector('#header-font-mobile-fullscreen');
if (headerMobileFullscreen) {
    this.currentSettings.headerFontSizeMobileFullscreen = parseInt(headerMobileFullscreen.value);
}

// Track Title Font Sizes
const trackDesktopNormal = this.DOM.modal.querySelector('#track-font-desktop-normal');
if (trackDesktopNormal) {
    this.currentSettings.trackTitleFontSizeDesktopNormal = parseInt(trackDesktopNormal.value);
}

const trackDesktopFullscreen = this.DOM.modal.querySelector('#track-font-desktop-fullscreen');
if (trackDesktopFullscreen) {
    this.currentSettings.trackTitleFontSizeDesktopFullscreen = parseInt(trackDesktopFullscreen.value);
}

const trackMobileNormal = this.DOM.modal.querySelector('#track-font-mobile-normal');
if (trackMobileNormal) {
    this.currentSettings.trackTitleFontSizeMobileNormal = parseInt(trackMobileNormal.value);
}

const trackMobileFullscreen = this.DOM.modal.querySelector('#track-font-mobile-fullscreen');
if (trackMobileFullscreen) {
    this.currentSettings.trackTitleFontSizeMobileFullscreen = parseInt(trackMobileFullscreen.value);
}
```

---

# 🎯 KROK 6: Aplikace hodnot v applySettingsToModal()

## 📍 KDE TO NAJDU?
Najdi funkci `applySettingsToModal()` - hledej "setSliderValue" pro height

## 👀 HLEDÁM TOTO:

```javascript
        this.setSliderValue('#height-desktop-normal', this.currentSettings.playlistHeightDesktopNormal);
        this.setSliderValue('#height-desktop-fullscreen', this.currentSettings.playlistHeightDesktopFullscreen);
        this.setSliderValue('#height-mobile-normal', this.currentSettings.playlistHeightMobileNormal);
        this.setSliderValue('#height-mobile-fullscreen', this.currentSettings.playlistHeightMobileFullscreen);
        // ← ZA TENHLE ŘÁDEK PŘIDÁVÁM
```

## ➕ PŘIDÁM TENTO KÓD:

```javascript
// ═══════════════════════════════════════════════════════════════
// 🎯 FONT SIZE SLIDERY - Aplikace hodnot do modalu
// ═══════════════════════════════════════════════════════════════

// Header Font Sizes
this.setSliderValue('#header-font-desktop-normal', this.currentSettings.headerFontSizeDesktopNormal);
this.setSliderValue('#header-font-desktop-fullscreen', this.currentSettings.headerFontSizeDesktopFullscreen);
this.setSliderValue('#header-font-mobile-normal', this.currentSettings.headerFontSizeMobileNormal);
this.setSliderValue('#header-font-mobile-fullscreen', this.currentSettings.headerFontSizeMobileFullscreen);

// Track Title Font Sizes
this.setSliderValue('#track-font-desktop-normal', this.currentSettings.trackTitleFontSizeDesktopNormal);
this.setSliderValue('#track-font-desktop-fullscreen', this.currentSettings.trackTitleFontSizeDesktopFullscreen);
this.setSliderValue('#track-font-mobile-normal', this.currentSettings.trackTitleFontSizeMobileNormal);
this.setSliderValue('#track-font-mobile-fullscreen', this.currentSettings.trackTitleFontSizeMobileFullscreen);
```

---

# 🎯 KROK 7: Připojení event listenerů v attachEventListeners()

## 📍 KDE TO NAJDU?
Najdi funkci `attachEventListeners()` - hledej kde končí

## 👀 HLEDÁM KONEC FUNKCE:

```javascript
        this.attachHeightListeners();
        
        this.log('Event listenery připojeny.');
    }, // ← TADY KONČÍ attachEventListeners
```

## ✏️ UPRAV:
**PŘIDEJ** volání `this.attachFontSizeListeners();`

## ✅ MÁ TO VYPADAT TAKTO:

```javascript
        this.attachHeightListeners();
        this.attachFontSizeListeners();  // ← PŘIDEJ TENTO ŘÁDEK
        
        this.log('Event listenery připojeny.');
    },
```

---

# 🎯 KROK 8: Fullscreen listenery v init()

## 📍 KDE TO NAJDU?
Najdi v `init()` funkci **řádek 74** - fullscreen event listenery

## 👀 JAK TO TEĎKA VYPADÁ (PŘED):

```javascript
        document.addEventListener('fullscreenchange', () => this.applyPlaylistHeight());
        document.addEventListener('webkitfullscreenchange', () => this.applyPlaylistHeight());
        document.addEventListener('mozfullscreenchange', () => this.applyPlaylistHeight());
```

## ✏️ UPRAV NA:

```javascript
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

## 📍 KDE TO NAJDU?
Hned pod fullscreen listenery - **řádek 79-83**

## 👀 JAK TO TEĎKA VYPADÁ (PŘED):

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

## 📍 KDE TO NAJDU?
Na konci `init()` funkce - **řádek 85**

## 👀 JAK TO TEĎKA VYPADÁ (PŘED):

```javascript
        this.log('PlaylistSettings modul inicializován.');
    },  // ← Konec init funkce
```

## ✏️ UPRAV NA:

```javascript
        // Aplikace font sizes při startu
        this.applyFontSizes();
        
        this.log('PlaylistSettings modul inicializován.');
    },  // ← Konec init funkce
```

---

# ✅ KONTROLNÍ CHECKLIST

Po dokončení zkontroluj:

- [ ] **Krok 1** - Máš v `currentSettings` 8 nových properties (řádek 33)
- [ ] **Krok 2** - Máš v HTML 8 sliderů (místo původních 2)
- [ ] **Krok 3** - Máš funkci `attachFontSizeListeners()`
- [ ] **Krok 4** - Máš funkci `applyFontSizes()`
- [ ] **Krok 5** - `loadSettingsFromModal()` načítá 8 hodnot
- [ ] **Krok 6** - `applySettingsToModal()` nastavuje 8 sliderů
- [ ] **Krok 7** - `attachFontSizeListeners()` se volá v `attachEventListeners()`
- [ ] **Krok 8** - Fullscreen listenery volají `applyFontSizes()`
- [ ] **Krok 9** - Resize listener volá `applyFontSizes()`
- [ ] **Krok 10** - `applyFontSizes()` se volá při startu v `init()`

---

# 🧪 TESTOVÁNÍ

## Test 1: Otevři nastavení
1. Otevři stránku
2. Klikni na ⚙️ tlačítko
3. Mělo by se ti zobrazit 8 sliderů:
   - 4 pro Header
   - 4 pro Track Title

## Test 2: Změň hodnotu
1. Posuň slider "Desktop Normal - Header"
2. Font size nadpisu by se měl okamžitě změnit

## Test 3: Fullscreen
1. Nastav různé hodnoty pro Normal vs Fullscreen
2. Stiskni F11 (fullscreen)
3. Font size by se měl automaticky změnit

## Test 4: Mobil
1. Otevři DevTools (F12)
2. Zapni Device Toolbar (Ctrl+Shift+M)
3. Změň na mobilní zařízení
4. Font size by se měl změnit na mobile hodnoty

---

# 🚨 MOŽNÉ PROBLÉMY

## Problém: Slidery se nezobrazují
**Řešení:** Zkontroluj Krok 2 - jestli jsi správně SMAZAL staré řádky 196-210

## Problém: Nic se neděje při změně slideru
**Řešení:** Zkontroluj Krok 3 a Krok 7 - event listenery musí být připojené

## Problém: Chyba v konzoli "applyFontSizes is not a function"
**Řešení:** Zkontroluj Krok 4 - funkce musí být přidaná do objektu PlaylistSettings

## Problém: Fullscreen nepřepíná font size
**Řešení:** Zkontroluj Krok 8 - fullscreen listenery musí volat `applyFontSizes()`

---

🖖 **HOTOVO! Máš kompletní návod krok za krokem!** 🚀

**Vytvořil:** Admirál Claude.AI  
**Pro:** Více admirál Jiřík  
**Styl:** Pro úplné začátečníky (noobs)  
**Datum:** 2026-02-04
