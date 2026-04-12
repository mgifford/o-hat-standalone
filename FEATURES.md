# O-Hat Standalone: Features & Use Cases

A comprehensive guide to what the O-Hat standalone accessibility scanner offers and how small, locally developed projects can benefit from it.

---

## What Is O-Hat Standalone?

O-Hat Standalone is a **single-file, browser-based accessibility scanner** built on [axe-core v4.11.0](https://github.com/dequelabs/axe-core) — the industry-standard accessibility testing engine. It requires no backend server, no build pipeline, and no paid subscriptions. Drop two files into any project and you have a fully functional WCAG 2.x auditing tool.

```
Your project/
├── a11y-scan.html     ← the scanner
└── assets/
    └── axe.min.js     ← the engine
```

---

## Feature Overview

### 🗂️ Three Scan Modes

| Mode | Best For | Requirements |
|------|----------|--------------|
| **Local Directory (Drag & Drop)** | Local development, static site generators, CI pre-flight | None — works fully offline |
| **Sitemap** | Deployed sites — reads `sitemap.xml` automatically | Same-origin deployment |
| **Custom URL List** | Targeted audits of specific pages | Same-origin deployment |

#### Local Directory (Drag & Drop)
The scanner uses the browser's **File System Access API** to read `.html` files directly from disk. No web server is required. Drag a folder onto the drop zone and click **Start Scan**. axe-core is injected into a sandboxed `<iframe>` for each file and results are collected in the browser.

#### Sitemap Mode
When deployed alongside a live site, the scanner fetches `sitemap.xml`, parses all `<loc>` entries, and queues them for scanning. A configurable delay (minimum 1 000 ms) prevents accidental denial-of-service to the host server.

#### Custom URL List
Paste any list of same-origin URLs (one per line) to audit only the pages that matter for a given sprint or release.

---

### 🔍 axe-core 4.11 — 100+ Automated Rules

The scanner runs the full axe-core 4.11 rule set, covering:

| Standard | Rules |
|----------|-------|
| WCAG 2.0 Level A & AA | 68 rules |
| WCAG 2.1 Level A & AA | 26 rules |
| WCAG 2.2 Level A & AA | 1 rule (opt-in) |
| Best Practices | 30+ rules |

Categories include text alternatives, ARIA attributes and roles, form labels, heading hierarchy, color contrast, keyboard focus, tables, lists, language declarations, landmarks, and more. See [AXE_RULES_COVERAGE.md](AXE_RULES_COVERAGE.md) for the full rule catalogue.

---

### ⚙️ Configurable Scan Options

| Option | Default | Range | Purpose |
|--------|---------|-------|---------|
| **Max Pages** | 50 | 1 – 5 000 | Prevent runaway scans on large sites |
| **Delay (ms)** | 1 000 | 1 000 + | Rate-limit requests to the server |
| **Timeout (ms)** | 20 000 | 1 000 – 120 000 | Time allowed per page before skipping |
| **Axe Script Path** | `assets/axe.min.js` | Any URL | Point to local file or CDN |
| **Include Passes** | Off | On / Off | Also report what is passing |
| **Include Incomplete** | Off | On / Off | Report "needs review" items |
| **Exclude Substrings** | — | Comma-separated | Skip URLs containing keywords (e.g. `admin, logout`) |

---

### 📊 Results Dashboard

After a scan completes, the scanner renders an interactive report in-page:

- **Summary cards** — total pages scanned, pages with violations, total violation instances, "must fix" count (critical/serious), and "good to fix" count (moderate/minor).
- **Top pages table** — pages ranked by issue count so the worst offenders are visible at a glance.
- **Issues grouped by impact** — violations sorted into *Must Fix* (critical, serious) and *Good to Fix* (moderate, minor) sections with expand/collapse detail panels.
- **Per-issue detail** — rule name, impact badge, affected HTML selector, axe help URL linking to Deque University documentation, and the count of affected pages.
- **Real-time progress** — live counters update while scanning is in progress; a status pill shows current state (Scanning / Done / Error).
- **Activity log** — a scrollable log stream shows each URL as it is processed.

---

### 📤 Export Formats

#### CSV — Oobee-Compatible Schema
Exports a 14-column CSV ready for import into the [Oobee](https://github.com/GovTechSG/oobee) reporting platform or any spreadsheet tool. Columns include:

`order`, `timestamp`, `issueId`, `issueDescription`, `wcagConformance`, `url`, `pageTitle`, `context`, `howToFix`, `axeImpact`, `severity`, `occurrences`, `xpath`, `tags`

This format is particularly useful for teams that need to share results with project managers, clients, or accessibility auditors.

#### JSON — Raw axe-core Output
Exports the complete run data — configuration snapshot, per-URL results, violation nodes, selectors, WCAG tags, and help URLs — as a pretty-printed JSON file. Suitable for automated post-processing, diffing against previous runs, or feeding into CI dashboards.

---

### 🔐 Access Control

The scanner is protected by a URL token (`?token=A11Y-SECRET`). Requests without the correct token display an access-denied screen. Teams should change the default token before deploying to any shared or public environment.

Because the scanner inherits the browser's session cookies, it can audit authenticated pages — CMS admin panels, logged-in dashboards, etc. — without additional configuration.

---

### 🏗️ No-Infrastructure Deployment

| Requirement | O-Hat Standalone | Typical SaaS Scanner |
|-------------|-----------------|----------------------|
| Server / backend | ❌ None | ✅ Required |
| Internet connection | ❌ Optional | ✅ Required |
| Account / subscription | ❌ None | ✅ Usually required |
| Build pipeline changes | ❌ Optional | ✅ Often required |
| Data leaves your machine | ❌ Never (local mode) | ✅ Always |

---

## Benefits for Small, Locally Developed Projects

### 1. Zero Cost, Zero Friction
There is nothing to install, no npm scripts to wire up, and no paid tier. Copy two files, open a browser, and scan. For solo developers and small teams without a DevOps function, this removes every barrier to starting an accessibility practice.

### 2. Works Fully Offline
The drag-and-drop mode needs no network connection after the initial file copy. This is ideal for:
- Developers on restricted corporate networks
- Projects in air-gapped environments
- Scanning a local build artifact before committing

### 3. Scans the Actual Built Output
Because you drag the real output folder (e.g. a Jekyll `_site/` directory, a Next.js `out/` folder, or a plain collection of `.html` files) directly into the scanner, you audit **exactly what will be shipped** — not a synthetic representation of it.

### 4. Catches Issues Before They Reach Production
Running a scan takes seconds for small sites. Developers can make it a personal habit to scan after any significant template or CSS change, catching regressions immediately rather than discovering them during a formal audit.

### 5. Detailed, Actionable Reports
Every violation links directly to Deque University documentation explaining the rule, why it matters, and how to fix it. This is valuable for teams where accessibility knowledge is still growing — the scanner teaches as it reports.

### 6. Prioritized Remediation
Results are split into **Must Fix** (critical/serious — barriers for disabled users) and **Good to Fix** (moderate/minor — improvements). Small teams with limited time can focus effort where it has the most impact.

### 7. Exportable Evidence
The CSV and JSON exports give small projects a lightweight paper trail for:
- Internal stakeholder reporting
- Client deliverables
- Government or procurement accessibility compliance statements
- Tracking remediation progress over time

### 8. Covers the Widest WCAG Surface Automatically
With 100+ axe-core rules covering WCAG 2.0, 2.1, and 2.2 at Levels A and AA, a single scan checks more ground than most manual review checklists. This is especially valuable for small teams without a dedicated accessibility specialist.

### 9. Authenticated Page Scanning
Because the scanner runs in the developer's own browser session, it can audit pages behind login walls without proxy configuration or credential management. A developer can log into their staging CMS and run a scan that covers the admin interface.

### 10. Audits Specific Pages on Demand
The custom URL list mode is ideal for scoping work to a single sprint: paste only the URLs that changed this iteration, scan them, and confirm fixes before merging.

---

## Typical Workflows for Small Projects

### Static Site Generator (e.g. Jekyll, Hugo, Eleventy)

```
build site → drag _site/ folder into scanner → review results → fix → rebuild → rescan
```

1. Run your build command (`jekyll build`, `hugo`, `npx eleventy`, etc.)
2. Open `a11y-scan.html?token=A11Y-SECRET` in Chrome or Edge
3. Select **Local Directory (Drag/Drop)**
4. Drag your build output folder onto the drop zone
5. Click **Start Scan**
6. Fix violations in templates / CSS
7. Rebuild and rescan to confirm

### Pre-Commit / Pre-Push Local Check

While the scanner has no CLI mode, developers can keep a terminal tab running a simple local server and make it a habit to scan before pushing:

```bash
# In one terminal — leave running during development
python3 -m http.server 8082

# In browser — scan the live local server
# Open: http://localhost:8082/a11y-scan.html?token=A11Y-SECRET
# Mode: Sitemap or Custom URL List pointing at http://localhost:8082
```

### Staged Deployment Audit

Before promoting a build from staging to production:

1. Deploy `a11y-scan.html` + `assets/axe.min.js` to the staging environment
2. Visit `https://staging.example.com/a11y-scan.html?token=YOUR-TOKEN`
3. Select **Sitemap** mode (reads `sitemap.xml` automatically)
4. Export CSV for sign-off record

### Page-by-Page Sprint Review

At the end of each sprint, paste only the URLs that changed into the **Custom URL List** mode. This keeps scan time short and the report focused on what the team actually touched.

---

## Integration with CI/CD Pipelines

While O-Hat Standalone is primarily a browser-based tool, its JSON export enables lightweight CI integration:

1. **Run a headless browser** (Playwright, Puppeteer) to open the scanner and trigger a scan against the local build server.
2. **Save the JSON export** as a build artifact.
3. **Post-process the JSON** to fail the build if `critical` or `serious` violations appear above a threshold.

The structured JSON output — with WCAG tags, impact levels, selectors, and URLs — provides all the data needed for custom pass/fail logic.

---

## Included Test Fixtures

The repository ships with a complete set of deliberately broken HTML pages that serve as a validation suite for the scanner itself. They also double as a learning resource — developers can open any fixture page, run the scanner against it, and see exactly how each class of violation is detected and reported.

| Page | Violations Demonstrated |
|------|------------------------|
| `page1.html` | Missing image alt text, color contrast failures |
| `page2.html` | Unlabeled form inputs, missing select labels |
| `page3.html` | Icon buttons without accessible names, heading hierarchy skip |
| `page4.html` | Missing `lang` attribute, invalid ARIA roles |
| `page5.html` | Videos without captions, iframes without titles, unlabeled SVGs |
| `page6.html` | Table headers not associated with cells, broken list structure |
| `auth/login.html` | Form labels, autocomplete attributes, tabindex misuse |
| `blog/post1.html` | Heading order, missing alt text, landmark structure |
| `demo-bad.html` | Duplicate IDs, empty elements, multiple mixed violations |

---

## Browser Compatibility

| Browser | Local Drag/Drop | Sitemap / URL List |
|---------|-----------------|-------------------|
| Chrome 90+ | ✅ Full support | ✅ Full support |
| Edge 90+ | ✅ Full support | ✅ Full support |
| Firefox | ⚠️ Fallback file picker | ✅ Full support |
| Safari | ⚠️ Limited drag/drop | ✅ Full support |

> **Recommended:** Chrome or Edge for drag-and-drop local directory scanning.

---

## Files Reference

| File | Size | Purpose |
|------|------|---------|
| `a11y-scan.html` | ~35 KB | Complete scanner application — the only file users interact with |
| `assets/axe.min.js` | ~240 KB | axe-core v4.11.0 engine — injected into each scanned page |
| `sitemap.xml` | ~1 KB | Optional — used by Sitemap scan mode |

---

## Further Reading

- [README.md](README.md) — Installation, setup, and deployment guide
- [QUICK_START.md](QUICK_START.md) — Five-minute condensed reference
- [AXE_RULES_COVERAGE.md](AXE_RULES_COVERAGE.md) — All 100+ axe-core rules by category
- [AXE_RULES_REFERENCE.md](AXE_RULES_REFERENCE.md) — Rule-to-test-page mapping
- [TEST_COVERAGE.md](TEST_COVERAGE.md) — Expected violations per fixture page
- [axe-core documentation](https://www.deque.com/axe/core-documentation/) — Upstream engine docs
- [Deque University Rules](https://dequeuniversity.com/rules/axe/html/4.11) — Per-rule remediation guidance
- [Parent project: o-hat-scanner](https://github.com/mgifford/o-hat-scanner) — Full server-based scanner ecosystem
