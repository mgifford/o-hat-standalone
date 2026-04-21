# O-Hat Standalone Component

This repository contains the **standalone component** of the [O-Hat Scanner](https://github.com/mgifford/o-hat-scanner) ecosystem. It provides a single-file solution for accessibility testing that can run entirely within a browser, without requiring complex server-side infrastructure.

> **🚀 Quick Start:** See [QUICK_START.md](QUICK_START.md) for a condensed reference guide with commands and configuration options.

## 🚀 Features

The **Standalone Scanner** (`a11y-scan.html`) allows you to:
- **Scan Local Directories:** Drag and drop a folder of HTML files directly into the browser to scan them instantly. Perfect for testing static site builds locally.
- **Scan Live Sites:** Scan a live website same-origin via `sitemap.xml` or a custom list of URLs.
- **No Server Required:** Runs entirely in the browser using **axe-core v4.11.0**.
- **Export Results:** 
  - **CSV Export:** [Oobee](https://github.com/GovTechSG/oobee)-compatible schema (14 columns).
  - **JSON Export:** Full raw data from axe-core.
- **Interactive UI:** Real-time progress tracking, rule summaries, and detailed violation reports.

## 🛠️ Installation & Setup

### Prerequisites

This scanner requires **axe-core v4.11.0** (included in `assets/axe.min.js`).

### Quick Start (Local Testing)

1. **Clone this repository:**
   ```bash
   git clone https://github.com/mgifford/o-hat-standalone.git
   cd o-hat-standalone
   ```

2. **Start a local web server:**, offline testing.

1. Open `a11y-scan.html?token=A11Y-SECRET` in your browser
2. Select **Scan Source: Local Directory (Drag/Drop)**
3. Drag a folder containing `.html` files onto the blue target area
4. Click **Start Scan**

**Note:** When scanning local files, the scanner will inject the axe-core script directly into each page. The `assets/axe.min.js` file must be accessible via the path configured in the scanner UI.

### Method 2: Sitemap or URL List
**Best for:** Deployed sites, live websites (requires same-origin access).

1. Deploy `a11y-scan.html` and `assets/axe.min.js` to your web server (e.g., `https://yoursite.com/a11y-scan.html`)
2. Visit the page with the secret token: `?token=A11Y-SECRET` (configure this in the code!)
3. Select **Sitemap** (uses `sitemap.xml`) or **Custom List** (enter URLs manually)
4. Click **Start Scan**

**Note:** The scanner must be deployed on the same origin (domain) as the pages you want to scan due to browser security policies

3. **Open in browser:**
   Navigate to `http://localhost:8082/a11y-scan.html?token=A11Y-SECRET`

4. **Test with included fixtures:**
   - Select "Local Directory (Drag/Drop)"
   - Drag the project folder onto the drop zone
   - Click "Start Scan" to scan the test pages

### Deployment Setup

1. **Copy files to your project:**
   - `a11y-scan.html` → Your project's root or public folder
   - `assets/axe.min.js` → Same relative path (or update the path in the scanner)

2. **Configure Axe-Core path:**
   
   The scanner looks for `assets/axe.min.js` by default. You can either:
   
   **Option A: Use the included file** (recommended)
   - Copy `assets/axe.min.js` (v4.7.0) to your project
   - Ensure the relative path matches (e.g., `assets/axe.min.js` or `../assets/axe.min.js`)
   
   **Option B: Use a CDN**
   - Open the scanner UI
   - Update the **Axe Script Path** field to:  
     `https://cdn.jsdelivr.net/npm/axe-core@4.11.0/axe.min.js`
   
   **Option C: Install via npm**
   ```bash
   npm install axe-core@4.11.0
   cp node_modules/axe-core/axe.min.js assets/
   ```

3. **Secure the scanner:**
   - Change the token in the code (search for `A11Y-SECRET`)
   - Add Basic Auth or VPN protection for production deployments

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

This repository contains intentional "broken" pages (`page1.html`, `page2.html`, `auth/login.html`, etc.) used to validate the scanner. **Do not fix accessibility issues in these files** — they are test fixtures.

### Included Test Site

The repository includes a complete test site with intentional accessibility violations:

- **`index.html`** — Test site homepage with links to all test pages
- **`page1.html`** — Images without alt text, color contrast violations  
- **`page2.html`** — Form inputs without proper labels
- **`page3.html`** — Icon buttons without accessible names, heading hierarchy problems
- **`page4.html`** — Missing lang attribute, incorrect ARIA usage
- **`demo-bad.html`** — Multiple violations (duplicate IDs, missing labels, bad contrast, etc.)
- **`blog/post1.html`** — Mixed accessibility issues
- **`auth/login.html`** — Form accessibility violations

**To use the test site locally:**

1. Start a web server in the project directory:
   ```bash
   python3 -m http.server 8082
   ```

2. Open `http://localhost:8082/index.html` in your browser

3. Open the scanner at `http://localhost:8082/a11y-scan.html?token=A11Y-SECRET`

4. Use "Local Directory (Drag/Drop)" or scan individual test pages

**Important:** Only `a11y-scan.html` (the scanner itself) must be accessible and meet WCAG 2.2 Level AA. All other HTML files must contain violations. See [AGENTS.md](AGENTS.md) for details.

## 🔬 Quality Assurance

This project uses GitHub Actions to enforce quality standards:

- **Scanner validation**: `a11y-scan.html` is checked for HTML/CSS quality and must have no inline styles
- **Fixture validation**: Test pages are verified to contain accessibility violations
- **Automated enforcement**: Prevents accidental "fixes" to test fixtures

Run quality checks locally:
```bash
npm install
npm test                    # Run all checks
npm run test:html          # Validate a11y-scan.html only
npm run test:fixtures      # Verify fixtures have errors
npm run test:inline-styles # Check for inline styles
```

See [.github/workflows/README.md](.github/workflows/README.md) for details.

## 📦 Technical Details

### Axe-Core Version

This project uses **axe-core v4.11.0** (latest, released 2025) for accessibility testing.

- **Location:** `assets/axe.min.js`
- **License:** Mozilla Public License 2.0
- **Rules Documentation:** https://dequeuniversity.com/rules/axe/html/4.11
- **Core Documentation:** https://www.deque.com/axe/core-documentation/
- **GitHub:** https://github.com/dequelabs/axe-core

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses File System Access API for drag-and-drop (supported in Chrome/Edge)
- Falls back to standard file inputs in other browsers

### Files Required for Scanner

| File | Purpose | Required |
|------|---------|----------|
| `a11y-scan.html` | Main scanner application | ✅ Yes |
| `assets/axe.min.js` | Axe-core accessibility engine (v4.11.0) | ✅ Yes |
| `sitemap.xml` | For sitemap-based scanning | Optional |

**Note:** Both `a11y-scan.html` and `index.html` reference `assets/axe.min.js`. Ensure this file is present for local testing.

## 🔗 Related Projects

> **[mgifford/o-hat-scanner](https://github.com/mgifford/o-hat-scanner)** — the full CI-powered scanner built on Playwright + Axe, with scheduled runs, multi-mode discovery, and GitHub Pages reports.

> **[mgifford/open-scans](https://github.com/mgifford/open-scans)** — issue-driven accessibility scanning via a public GitHub Pages form, supporting multi-engine comparisons (axe-core, ALFA, IBM Equal Access, AccessLint, QualWeb) in a single run.

**Use open-scans instead if you:**

- Want to scan a batch of URLs without forking or configuring a repo.
- Need **multi-engine comparisons** in a single run.
- Prefer a simple submit-URL-and-wait workflow rather than managing configuration files and cron schedules.

**Use o-hat-scanner instead if you:**

- Need **scheduled, automated scanning** of your own sites on a recurring basis.
- Want full control over the scanning pipeline (modes, concurrency, discovery queries, viewport/color-scheme variants).
- Are integrating accessibility scanning into your own CI/CD workflow.

**Use o-hat-standalone (this repo) if you:**

- Need a **zero-dependency, single-file scanner** that runs entirely in the browser.
- Want to test a local static build by dragging a folder onto the page.
- Are deploying the scanner alongside your own site for same-origin live scanning.

## License

AGPL-3.0 - See LICENSE for details.
