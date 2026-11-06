/**
 * Beatport Key Translator
 * Finds musical keys in page text (e.g. "F Minor") and appends the
 * Camelot notation (e.g. "F Minor | 4A"). Independent of Beatport's
 * class names, so UI redesigns shouldn't break it.
 */

// A = Minor keys, B = Major keys
const keyMap = {
  "A♭ Minor": "1A",  "G♯ Minor": "1A",
  "E♭ Minor": "2A",  "D♯ Minor": "2A",
  "B♭ Minor": "3A",  "A♯ Minor": "3A",
  "F Minor": "4A",
  "C Minor": "5A",
  "G Minor": "6A",
  "D Minor": "7A",
  "A Minor": "8A",
  "E Minor": "9A",
  "B Minor": "10A",
  "F♯ Minor": "11A", "G♭ Minor": "11A",
  "D♭ Minor": "12A", "C♯ Minor": "12A",
  "B Major": "1B",
  "F♯ Major": "2B", "G♭ Major": "2B",
  "D♭ Major": "3B", "C♯ Major": "3B",
  "A♭ Major": "4B", "G♯ Major": "4B",
  "E♭ Major": "5B", "D♯ Major": "5B",
  "B♭ Major": "6B", "A♯ Major": "6B",
  "F Major": "7B",
  "C Major": "8B",
  "G Major": "9B",
  "D Major": "10B",
  "A Major": "11B",
  "E Major": "12B"
};

// Matches e.g. "F Minor", "C♯ Major", "Db Major", "F# Min".
// The negative lookahead skips keys we've already tagged with " | ".
const KEY_REGEX = /\b([A-G])([♭♯#b]?)\s(Major|Minor|Maj|Min)\b(?!\s*\|)/g;

function toCamelot(letter, accidental, mode) {
  const acc = accidental.replace("b", "♭").replace("#", "♯");
  const fullMode = mode.startsWith("Maj") ? "Major" : "Minor";
  return keyMap[`${letter}${acc} ${fullMode}`] || null;
}

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"]);

function translateTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName) || parent.isContentEditable) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const original = node.nodeValue;
    if (!original || original.length > 200) return; // keys live in short text
    KEY_REGEX.lastIndex = 0;
    if (!KEY_REGEX.test(original)) return;

    KEY_REGEX.lastIndex = 0;
    const updated = original.replace(KEY_REGEX, (match, letter, acc, mode) => {
      const camelot = toCamelot(letter, acc, mode);
      return camelot ? `${match} | ${camelot}` : match;
    });

    if (updated !== original) node.nodeValue = updated;
  });
}

// Debounced so rapid DOM changes don't cause excessive work
let timeout = null;
function debouncedReplace() {
  clearTimeout(timeout);
  timeout = setTimeout(() => translateTextNodes(document.body), 100);
}

const observer = new MutationObserver(debouncedReplace);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
});

debouncedReplace();