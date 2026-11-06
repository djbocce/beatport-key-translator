/**
 * Camelot Wheel notation mapping
 * Maps musical key notations to their corresponding Camelot numbers (1-12) and types (A/B)
 * A = Minor keys, B = Major keys
 */
const keyMap = {
    "A♭ Minor": "1A",
    "G♯ Minor": "1A",
    "E♭ Minor": "2A",
    "D♯ Minor": "2A",
    "B♭ Minor": "3A",
    "A♯ Minor": "3A",
    "F Minor": "4A",
    "C Minor": "5A",
    "G Minor": "6A",
    "D Minor": "7A",
    "A Minor": "8A",
    "E Minor": "9A",
    "B Minor": "10A",
    "F♯ Minor": "11A",
    "G♭ Minor": "11A",
    "D♭ Minor": "12A",
    "C♯ Minor": "12A",
    "B Major": "1B",
    "F♯ Major": "2B",
    "G♭ Major": "2B",
    "D♭ Major": "3B",
    "C♯ Major": "3B",
    "A♭ Major": "4B",
    "G♯ Major": "4B",
    "E♭ Major": "5B",
    "D♯ Major": "5B",
    "B♭ Major": "6B",
    "A♯ Major": "6B",
    "F Major": "7B",
    "C Major": "8B",
    "G Major": "9B",
    "D Major": "10B",
    "A Major": "11B",
    "E Major": "12B"
  };
  
  /**
   * Normalizes key notation from ASCII symbols to musical symbols
   * Converts 'b' to '♭' (flat) and '#' to '♯' (sharp)
   * @param {string} key - The key notation to normalize
   * @returns {string} The normalized key with musical symbols
   */
  function normalizeKeyName(key) {
  /**
   * Translates a musical key to Camelot notation
   * @param {string} text - The musical key text to translate
   * @returns {string|null} The Camelot notation (e.g., "5A") or null if not found
   */
      .replace("b", "♭")
      .replace("#", "♯");
  }
  
  // Function to translate the key into Camelot notation
  function translateKeyText(text) {
  /**
   * Replaces keys displayed in the main track metadata section
   * Looks for elements matching the TrackMeta-style class pattern
   */t.trim());
    return keyMap[normalized] || null;
  }
  
  // Function to replace the main track key
  function replaceMainTrackKey() {
    const metaItems = document.querySelectorAll('div[class^="TrackMeta-style__MetaItem"]');
    metaItems.forEach((item) => {
      const divLabel = item.querySelector("div");
      const spanValue = item.querySelector("span");
  
      if (divLabel?.textContent.trim().startsWith("Key") && spanValue) {
        const originalKey = spanValue.textContent.trim();
        const translatedKey = translateKeyText(originalKey);
        if (translatedKey && !spanValue.innerHTML.includes("|")) {
            spanValue.innerHTML = `${originalKey} | ${translatedKey}`;
        }
      }
   /**
   * Replaces keys displayed in track result tables
   * Looks for BPM cells that contain key information formatted as "XXX BPM - Key"
   */
  }
  
  // Function to replace keys in tables of tracks
  function replaceTableTrackKeys() {
    const bpmCells = document.querySelectorAll('div[class*="cell bpm"] > div');
  
    bpmCells.forEach((div) => {
      const text = div.textContent.trim();
      const match = text.match(/^(.*BPM)\s*-\s*(.+)$/);  // e.g. "125 BPM - F Minor"
  
      if (match) {
        const [_, bpmPart, keyPart] = match;
        const translatedKey = translateKeyText(keyPart);
        if (translatedKey && !text.includes("|")) {
  /**
   * Replaces keys displayed in the search filter sidebar
   * Updates key filter labels with Camelot notation
   */
            div.innerHTML = `${bpmPart} - ${keyPart} | ${translatedKey}`;
        }
      }
    });
  }

  function replaceSearchFilterKeys() {
    const keyLabels = document.querySelectorAll('span.FacetFilter-style__FilterCheckBoxLabelText-sc-5c7554e0-12');
  
    keyLabels.forEach(span => {
      const keyText = span.textContent.trim();
      const translatedKey = translateKeyText(keyText);
  /**
   * Debounced replacement function that triggers on DOM changes
   * Uses 100ms delay to avoid excessive processing on rapid mutations
   */
      if (translatedKey && !span.textContent.includes("|")) {
        span.textContent = `${keyText} | ${translatedKey}`;
      }
    });
  }
  
  // Debounced observer with 100ms delay
  
  // Set up MutationObserver to monitor DOM changes and update key translations
  const observer = new MutationObserver(debouncedReplace);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Run initial replacement on page load
    timeout = setTimeout(() => {
      replaceMainTrackKey();
      replaceTableTrackKeys();
      replaceSearchFilterKeys();
    }, 100);
  }
  
  let timeout = null;
  const observer = new MutationObserver(debouncedReplace);
  observer.observe(document.body, { childList: true, subtree: true });
  debouncedReplace();