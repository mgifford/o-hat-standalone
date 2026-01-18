# O-Hat Standalone Component

This repository contains the **standalone component** of the [O-Hat Scanner](https://github.com/mgifford/o-hat-scanner) ecosystem. It provides a single-file solution for accessibility testing that can run entirely within a browser, without requiring complex server-side infrastructure.

## 🚀 Features

The **Standalone Scanner** (`a11y-scan.html`) allows you to:
- **Scan Local Directories:** Drag and drop a folder of HTML files directly into the browser to scan them instantly. Perfect for testing static site builds locally.
- **Scan Live Sites:** Scan a live website same-origin via `sitemap.xml` or a custom list of URLs.
- **No Server Required:** Runs entirely in the browser using `axe-core`.
- **Export Results:** 
  - **CSV Export:** Oobee-compatible schema (14 columns).
  - **JSON Export:** Full raw data from axe-core.
- **Interactive UI:** Real-time progress tracking, rule summaries, and detailed violation reports.

## 🛠️ Installation & Setup

1. **Copy the Scanner:**
   Place `a11y-scan.html` in your project's root or public folder.

2. **Add Axe-Core:**
   The scanner requires `axe.min.js`. You can either:
   - Download it from `node_modules/axe-core/axe.min.js` and place it in an `assets/` folder relative to the scanner (default path `../assets/axe.min.js` or `assets/axe.min.js`).
   - Or, update the **Axe Script Path** in the UI to point to a CDN:  
     `https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js`

## 📖 Usage

### Method 1: Local Directory (Drag & Drop)
**Best for:** Local development, static site generators.
1. Open `a11y-scan.html` in your browser.
2. Select **Scan Source: Local Directory (Drag/Drop)**.
3. Drag a folder containing `.html` files onto the blue target area.
4. Click **Start Scan**.

### Method 2: Sitemap or URL List
**Best for:** Deployed sites (requires same-origin access).
1. Deploy `a11y-scan.html` to your web server (e.g., `https://yoursite.com/a11y-scan.html`).
2. Visit the page with the secret token: `?token=A11Y-SECRET` (configure this in the code!).
3. Select **Sitemap** or **Custom List** to defined which pages to scan.

## 🔐 Security Warning

**⚠️ Important:**
- **Access Control:** This tool allows scanning of any page the user's browser can access. If scanning a live site, **password protect** this file (e.g., using Basic Auth or VPN) to prevent unauthorized use.
- **Authenticated Scanning:** If you run this while logged into a CMS, it will scan admin pages. Use with caution.
- **DoS Risk:** Scanning thousands of pages can stress a server. The tool enforces a 1000ms delay between requests.

## 🧪 Test Fixtures

The `standalone/` directory (this repo) contains intentional "broken" pages (`page1.html`, `auth/login.html`, etc.) used to validate the scanner. **Do not fix accessibility issues in these files.** See [AGENTS.md](AGENTS.md) for details.

## License

AGPL-3.0 - See LICENSE for details.
