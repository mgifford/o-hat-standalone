# Quick Reference: O-Hat Standalone

## 🚀 Local Testing (5 Steps)

```bash
# 1. Clone repository
git clone https://github.com/mgifford/o-hat-standalone.git
cd o-hat-standalone

# 2. Start web server
python3 -m http.server 8082

# 3. Open scanner in browser
# http://localhost:8082/a11y-scan.html?token=A11Y-SECRET

# 4. View test site
# http://localhost:8082/index.html

# 5. Scan test fixtures
# Use "Local Directory (Drag/Drop)" and drag the project folder
```

## 📁 Required Files

| File | Purpose | Size | Version |
|------|---------|------|---------|
| `a11y-scan.html` | Scanner UI | ~35 KB | 1.0 |
| `assets/axe.min.js` | Axe-core engine | ~240 KB | 4.7.0 |
| `sitemap.xml` | Optional URL list | ~1 KB | - |

## 🔑 Access Token

Default token: `A11Y-SECRET`

To change, edit line ~220 in `a11y-scan.html`:
```javascript
const REQUIRED_TOKEN = "YOUR-SECRET-HERE";
```

## 🎯 Scan Modes

### 1. Local Directory (Drag & Drop)
- **Use case:** Local development, static sites
- **Requirements:** None (works offline)
- **How:** Drag folder onto drop zone

### 2. Sitemap (sitemap.xml)
- **Use case:** Deployed websites
- **Requirements:** Same-origin, sitemap.xml file
- **How:** Scanner reads sitemap.xml automatically

### 3. Custom URL List
- **Use case:** Specific pages
- **Requirements:** Same-origin URLs
- **How:** Paste URLs (one per line)

## 🧪 Test Fixtures Included

| Page | Violations | Purpose |
|------|------------|---------|
| `page1.html` | Missing alt text, low contrast | Image accessibility |
| `page2.html` | Missing form labels | Form accessibility |
| `page3.html` | Missing button text, heading hierarchy | Semantic structure |
| `page4.html` | Invalid ARIA, missing lang | ARIA and language |
| `demo-bad.html` | Duplicate IDs, empty elements | Multiple issues |
| `auth/login.html` | Form issues | Real-world forms |
| `blog/post1.html` | Mixed violations | Blog content |

## 📊 Export Formats

### CSV Export
- **Format:** Oobee-compatible (14 columns)
- **Use for:** Spreadsheet analysis, reporting
- **Columns:** URL, severity, issue ID, description, WCAG tags, etc.

### JSON Export
- **Format:** Raw axe-core results
- **Use for:** Automated processing, CI/CD integration
- **Structure:** Complete violation data with selectors

## ⚙️ Configuration Options

| Setting | Default | Range | Purpose |
|---------|---------|-------|---------|
| Max Pages | 50 | 1-5000 | Limit scan size |
| Delay (ms) | 1000 | 1000+ | Rate limiting |
| Timeout (ms) | 20000 | 1000-120000 | Page load timeout |
| Axe Path | `assets/axe.min.js` | Any URL | Axe-core location |

## 🔒 Security Notes

1. **Access Control:** Password protect in production (Basic Auth/VPN)
2. **Token Protection:** Change default token before deployment
3. **Cookie Access:** Scanner inherits browser cookies (scans authenticated pages)
4. **DoS Risk:** Enforce delays when scanning large sites
5. **Same-Origin Only:** Cannot scan cross-origin sites (browser security)

## 🛠️ Development

```bash
# Install QA tools
npm install

# Run quality checks
npm test                    # All checks
npm run test:html          # HTML validation (a11y-scan.html only)
npm run test:fixtures      # Verify test pages have errors
npm run test:inline-styles # Check for inline styles

# Lint
npm run lint
```

## 📚 Key Files Reference

```
o-hat-standalone/
├── a11y-scan.html          # Scanner (MUST be accessible)
├── index.html              # Test site homepage
├── assets/
│   └── axe.min.js          # Axe-core v4.7.0 ⚠️ REQUIRED
├── page1.html              # Test fixture (MUST stay broken)
├── page2.html              # Test fixture (MUST stay broken)
├── page3.html              # Test fixture (MUST stay broken)
├── page4.html              # Test fixture (MUST stay broken)
├── demo-bad.html           # Test fixture (MUST stay broken)
├── auth/
│   └── login.html          # Test fixture (MUST stay broken)
├── blog/
│   └── post1.html          # Test fixture (MUST stay broken)
├── sitemap.xml             # URL list for scanning
├── AGENTS.md               # ⚠️ DO NOT FIX TEST FIXTURES
├── README.md               # Full documentation
└── .github/
    ├── workflows/
    │   └── qa.yml          # GitHub Actions QA
    └── scripts/
        └── verify-fixtures.js  # Fixture validation
```

## 🐛 Troubleshooting

### "No files loaded"
- Ensure you dragged a folder, not individual files
- Check browser console for errors
- Try a different browser (Chrome/Edge recommended)

### "Failed to load axe script"
- Verify `assets/axe.min.js` exists
- Check Axe Script Path in UI matches file location
- Try using CDN URL: `https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js`

### "Skipping cross-origin URL"
- Scanner and target pages must be on same origin
- Use "Local Directory" mode for local files
- Deploy scanner to same domain as target site

### "Access Denied" screen
- Add `?token=A11Y-SECRET` to URL
- Check token matches value in code (line ~220)

## 📖 More Information

- **Full Documentation:** [README.md](README.md)
- **Test Fixture Rules:** [AGENTS.md](AGENTS.md)
- **QA Workflows:** [.github/workflows/README.md](.github/workflows/README.md)
- **Axe-Core Docs:** https://www.deque.com/axe/core-documentation/
- **Parent Project:** https://github.com/mgifford/o-hat-scanner
