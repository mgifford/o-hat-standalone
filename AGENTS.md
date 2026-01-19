# ⚠️ Test Fixtures — Do Not "Fix" Accessibility Issues

## Critical Rule: Only ONE File Must Be Accessible

This repository contains **two distinct types of HTML files** with **opposite requirements**:

### 1. **The Scanner Tool (MUST be accessible)**

**File:** `a11y-scan.html` — The standalone accessibility scanner UI

**Requirement:** This file **MUST meet WCAG 2.2 Level AA** conformance.
- ✅ **DO** fix accessibility issues in `a11y-scan.html`
- ✅ **DO** add proper labels, ARIA attributes, semantic HTML
- ✅ **DO** ensure proper color contrast, keyboard navigation, focus visibility
- ✅ **DO** validate HTML and CSS quality

**Quality Standards:**
- Valid HTML5 markup
- No inline styles (use CSS classes)
- Proper ARIA live regions for dynamic content
- All interactive elements keyboard accessible
- Focus indicators visible on all controls

### 2. **Test Fixture Pages (MUST remain broken)**

**Files:** ALL other HTML files in this repository

**Critical Requirement:** These pages **MUST contain accessibility errors** to validate the scanner.

**Files that MUST stay broken:**
- `index.html` — Test site homepage (may have minor issues)
- `page1.html` — Images without alt text, color contrast violations
- `page2.html` — Form inputs without proper labels
- `page3.html` — Icon buttons without accessible names, heading hierarchy problems
- `page4.html` — Missing lang attribute, incorrect ARIA usage
- `demo-bad.html` — Multiple violations (duplicate IDs, missing labels, bad contrast, etc.)
- `blog/post1.html` — Mixed accessibility issues
- `auth/login.html` — Form accessibility violations

**What NOT to do to test fixtures:**
- ❌ **DO NOT** add labels to unlabeled inputs
- ❌ **DO NOT** fix color contrast issues
- ❌ **DO NOT** add missing alt text to images
- ❌ **DO NOT** improve heading hierarchy
- ❌ **DO NOT** remove invalid ARIA attributes
- ❌ **DO NOT** add proper form associations
- ❌ **DO NOT** fix duplicate IDs
- ❌ **DO NOT** add missing lang attributes
- ❌ **DO NOT** run HTML validators or linters on these files

**Why?** If these pages are "fixed," the test suite cannot validate that the scanner correctly identifies violations. They are intentional bad examples.

## For Future AI Agents and Developers

**Before making ANY changes to HTML files, read this:**

### Decision Tree: Should I Fix This Accessibility Issue?

```
Is the file a11y-scan.html?
├─ YES → ✅ FIX IT! This must be WCAG 2.2 Level AA compliant
└─ NO  → ❌ DO NOT FIX! This is a test fixture and must remain broken
```

### If Asked to "Improve Accessibility" or "Fix Accessibility Problems"

1. **Check the filename** you are modifying
2. **If it's `a11y-scan.html`**:
   - ✅ YES, fix accessibility issues
   - ✅ YES, improve HTML/CSS quality
   - ✅ YES, add proper ARIA attributes
   - ✅ YES, ensure WCAG 2.2 Level AA conformance

3. **If it's ANY other HTML file**:
   - ❌ NO, do not fix accessibility issues
   - ❌ NO, do not add labels or alt text
   - ❌ NO, do not improve color contrast
   - ❌ NO, do not run HTML validators
   - ⚠️ These are intentional test fixtures

### Common Mistakes to Avoid

- **"I found unlabeled inputs in page2.html"** → Leave them! That's the point.
- **"The color contrast in page1.html fails WCAG"** → Correct! Don't fix it.
- **"There are duplicate IDs in demo-bad.html"** → Intentional! Leave them.
- **"Should I run HTMLHint on all files?"** → Only on `a11y-scan.html`

## Test Validation

### Automated Testing (GitHub Actions)

This repository uses GitHub Actions to enforce quality standards:

**QA checks on `a11y-scan.html` only:**
- ✅ HTML validation (W3C validator)
- ✅ CSS quality checks (no inline styles)
- ✅ Accessibility validation (using the scanner itself)
, adding features or fixing *its* accessibility), verify it using the **Local Directory (Drag/Drop)** feature:

1. Open `a11y-scan.html?token=A11Y-SECRET` in a browser
2. Select "Local Directory" from the dropdown
3. Drag the root folder of this workspace (containing `page1.html` etc.) onto the drop zone
4. Run the scan
5. Ensure it detects the expected violations in the fixture pages
6. Verify NO violations are reported for `a11y-scan.html` itself

### Running Quality Checks Locally

```bash
# Install dependencies
npm install --save-dev htmlhint stylelint

# Check a11y-scan.html only
npx htmlhint a11y-scan.html

# Run the full QA suite (if available)
npm test
```

## Summary

- **ONE file must be accessible:** `a11y-scan.html`
- **ALL other HTML files must have errors:** They are test fixtures
- **GitHub Actions enforces this:** Quality checks only run on the scanner
- **Manual testing validates both:** Scanner works AND fixtures remain broken

**When in doubt:** If it's not `a11y-scan.html`, don't fix accessibility issues!
See `.github/workflows/qa.yml` for implementation details.

### Manual Testing

These fixture pages are also used for manual testing:

1. Open `a11y-scan.html?token=A11Y-SECRET` in a browser
2. Select "Local Directory" from the dropdown
3. Drag the root folder of this workspace onto the drop zone
4. Run the scan
5. Verify it detects the expected violations in each test fixture

**Expected violations per page:**
- `page1.html` — Missing alt text, color contrast issues
- `page2.html` — Unlabeled form inputs
- `page3.html` — Icon buttons without text, heading hierarchy
- `page4.html` — Missing/invalid ARIA, lang attribute issues
- `demo-bad.html` — Duplicate IDs, missing labels, contrast, empty elements
- `auth/login.html` — Missing labels, unclear button text
- `blog/post1.html` — Various mixed issues

## Verifying Scanner Changes

If you modify `a11y-scan.html` (e.g. adding features or fixing *its* accessibility), verify it using the **Local Directory (Drag/Drop)** feature:
1. Open `a11y-scan.html` in a browser.
2. Select "Local Directory" from the dropdown.
3. Drag the root folder of this workspace (containing `page1.html` etc.) onto the drop zone.
4. Run the scan and ensure it detects the expected violations in the fixture pages.
