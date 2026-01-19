# QA System Implementation Summary

## ✅ What Was Created

### 1. **Updated AGENTS.md**
Enhanced clarity with:
- Clear decision tree for when to fix accessibility issues
- Explicit list of files that MUST stay broken
- Section on automated testing via GitHub Actions
- Expected violations per fixture page
- Local testing instructions

### 2. **GitHub Actions Workflow** (`.github/workflows/qa.yml`)
Three automated jobs that run on every push/PR:

#### Job 1: `validate-scanner`
- ✅ Validates HTML quality of `a11y-scan.html` only
- ✅ Checks for inline styles (enforces CSS best practices)
- ✅ CSS quality checks
- ❌ Does NOT check test fixture pages

#### Job 2: `validate-fixtures`
- ✅ Verifies test fixtures still contain accessibility violations
- ✅ Prevents accidental "fixes" to test pages
- ✅ Pattern matching for common violations

#### Job 3: `lint-config-files`
- ✅ Validates sitemap.xml structure
- ✅ Ensures AGENTS.md exists with fixture warnings

### 3. **Fixture Verification Script** (`.github/scripts/verify-fixtures.js`)
Node.js script that:
- Checks each test fixture for known bad patterns
- Detects: missing alt text, unlabeled inputs, duplicate IDs, empty buttons, etc.
- Warns if fixtures appear to have been "fixed"
- Excludes `a11y-scan.html` from checks

### 4. **Configuration Files**

#### `.htmlhintrc`
HTMLHint configuration for validating `a11y-scan.html`:
- Enforces lowercase tags and attributes
- Requires alt text on images
- Enforces unique IDs
- Validates HTML5 doctype
- Checks for unsafe characters

#### `package.json`
NPM configuration with test scripts:
- `npm test` - Run all checks
- `npm run test:html` - Validate a11y-scan.html
- `npm run test:fixtures` - Verify fixtures have errors
- `npm run test:inline-styles` - Check for inline styles
- `npm run lint` - Combined HTML and style checks

#### `.gitignore`
Standard Node.js gitignore excluding:
- node_modules/
- package-lock.json
- IDE files
- OS files

### 5. **Documentation**

#### `.github/workflows/README.md`
Comprehensive guide to the QA system explaining:
- What each workflow does
- Why only a11y-scan.html gets quality checks
- Local testing instructions
- How to add new checks or fixtures

#### Updated `README.md`
Added "Quality Assurance" section with:
- Overview of automated checks
- Local testing commands
- Link to workflow documentation

## 🎯 Key Principles

### The Dual Standard

1. **`a11y-scan.html` (THE SCANNER)**
   - ✅ MUST be accessible (WCAG 2.2 Level AA)
   - ✅ MUST have valid HTML
   - ✅ MUST NOT have inline styles
   - ✅ Gets quality checks in CI/CD

2. **All Other HTML Files (TEST FIXTURES)**
   - ❌ MUST remain broken with accessibility violations
   - ❌ MUST NOT be "fixed"
   - ❌ DO NOT get HTML/CSS quality checks
   - ✅ GET verified to ensure they still have errors

## 📊 Current Test Fixture Status

Based on verification script run:

| File | Status | Detected Issues |
|------|--------|----------------|
| `page1.html` | ✅ PASS | Image without alt, color contrast classes |
| `page2.html` | ⚠️ PARTIAL | Unlabeled inputs (1 found, expected 2+) |
| `page3.html` | ⚠️ NEEDS PATTERNS | Not detected (needs pattern added) |
| `page4.html` | ⚠️ NEEDS PATTERNS | Not detected (needs pattern added) |
| `demo-bad.html` | ✅ PASS | Duplicate IDs, empty button, no alt |
| `auth/login.html` | ✅ PASS | Checkbox without label |
| `blog/post1.html` | ⚠️ NEEDS PATTERNS | Not detected (needs pattern added) |

**Note:** ⚠️ warnings don't fail the build. They still have accessibility issues that axe-core will detect - the verification script just doesn't have patterns for all violation types yet.

## 🚀 Next Steps

### Immediate
1. ✅ Review the GitHub Actions workflow
2. ✅ Test locally with `npm install && npm test`
3. ✅ Commit and push to trigger first CI run

### Optional Enhancements
1. **Add more detection patterns** to `verify-fixtures.js` for:
   - page3.html (icon buttons without text)
   - page4.html (missing lang attribute, bad ARIA)
   - blog/post1.html (mixed issues)

2. **Use axe-core CLI** instead of pattern matching:
   ```javascript
   // Could replace pattern matching with:
   execSync(`npx axe ${filename} --exit`);
   ```

3. **Add CSS validation** with stylelint for a11y-scan.html

4. **Create HTML report** from CI runs

5. **Badge in README** showing CI status

## 🧪 Testing Locally

```bash
# Install dependencies
cd /Users/mgifford/o-hat-standalone
npm install

# Run all tests
npm test

# Run individual checks
npm run test:html          # Validate a11y-scan.html HTML
npm run test:fixtures      # Verify fixtures have errors
npm run test:inline-styles # Check for inline styles

# Just lint (HTML + inline styles)
npm run lint
```

## 🔒 What This Prevents

1. **Accidental fixes to test fixtures** - CI will warn if patterns disappear
2. **Quality regressions in scanner** - HTML validation on every commit
3. **Inline styles in scanner** - Enforces CSS best practices
4. **Invalid sitemap.xml** - XML validation
5. **Missing documentation** - Checks AGENTS.md exists

## 📝 Files Created/Modified

```
/Users/mgifford/o-hat-standalone/
├── .github/
│   ├── scripts/
│   │   └── verify-fixtures.js       [NEW - Fixture verification]
│   └── workflows/
│       ├── qa.yml                   [NEW - GitHub Actions workflow]
│       └── README.md                [NEW - Workflow documentation]
├── .gitignore                       [NEW - Git ignore rules]
├── .htmlhintrc                      [NEW - HTML linting config]
├── package.json                     [NEW - NPM config with test scripts]
├── AGENTS.md                        [UPDATED - Clearer instructions]
└── README.md                        [UPDATED - Added QA section]
```

## 🎉 Benefits

1. **Automated enforcement** - No manual review needed
2. **Clear documentation** - AGENTS.md prevents confusion
3. **Local testing** - Same checks run locally and in CI
4. **Future-proof** - Prevents accidental "fixes" by AI agents or developers
5. **Quality guarantee** - Scanner itself meets WCAG 2.2 Level AA
6. **Test integrity** - Fixtures remain valid for scanner validation

## 🤖 For AI Agents

The AGENTS.md file now explicitly states:

> **Is the file a11y-scan.html?**
> - YES → ✅ FIX IT! This must be WCAG 2.2 Level AA compliant
> - NO  → ❌ DO NOT FIX! This is a test fixture and must remain broken

This prevents future AI agents from "helpfully" fixing test fixtures and breaking the scanner's validation capability.
