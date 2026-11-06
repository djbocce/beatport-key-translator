# Beatport Key Translator

A Chrome extension that displays musical key notations in Camelot notation alongside the original key on Beatport.

## Features

- **Camelot Notation**: Automatically converts musical keys (e.g., "C Minor") to Camelot notation (e.g., "5A")
- **Multiple Locations**: Works on track details, track tables, and search filters
- **Toggle Control**: Enable/disable the translation via the extension popup
- **Real-time Updates**: Dynamically updates as you browse Beatport

## Installation

1. Clone this repository or download it as a ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the extension folder

## How It Works

The extension uses a Camelot wheel mapping system to convert musical keys:

- **Minor Keys**: A♭ Minor through D♭ Minor (1A through 12A)
- **Major Keys**: B Major through E Major (1B through 12B)

Keys are displayed as: `Original Key | Camelot Notation`

Example: `C Minor | 5A`

## Usage

1. Navigate to [beatport.com](https://www.beatport.com)
2. The extension will automatically display Camelot notation alongside track keys
3. Use the extension popup to toggle the feature on/off
4. Your preference is saved automatically

## Files

- `content.js` - Main extension logic for DOM manipulation and key translation
- `popup.html` - UI for the extension toggle
- `popup.js` - Manages toggle state persistence
- `manifest.json` - Chrome extension manifest
- `icons/` - Extension icon assets

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements.

## Disclaimer

This extension is not affiliated with Beatport. Use at your own discretion.
