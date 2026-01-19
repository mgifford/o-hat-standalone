# GitHub Actions Workflows

## Overview

This directory contains GitHub Actions workflows for automated quality assurance.

## Workflows

### `qa.yml` - Quality Assurance

Runs on every push and pull request to `main` and `develop` branches.

**Three jobs:**

#### 1. `validate-scanner`
Validates `a11y-scan.html` for quality and accessibility.

**Checks:**
- ✅ HTML validation using HTMLHint
- ✅ No inline styles allowed (enforces CSS best practices)
- ✅ CSS quality checks

**Why only a11y-scan.html?**
This is the only file that must be accessible. All other HTML files are intentional test fixtures with accessibility violations.

#### 2. `validate-fixtures`
Verifies that test fixture pages contain accessibility violations.

**Checks:**
- ✅ Runs basic pattern matching to detect known violations
- ✅ Ensures fixtures haven't been accidentally "fixed"

**Fixtures checked:**
- `page1.html` - Missing alt text, color contrast
- `page2.html` - Unlabeled form inputs
- `page3.html` - Icon buttons, heading issues
- `page4.html` - ARIA and lang problems
- `demo-bad.html` - Multiple violations
- `auth/login.html` - Form issues
- `blog/post1.html` - Mixed issues

#### 3. `lint-config-files`
Validates configuration and documentation files.

**Checks:**
- ✅ `sitemap.xml` is valid XML
- ✅ `AGENTS.md` exists and contains fixture warnings

## Local Testing

Run the same checks locally:

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific checks
npm run test:html          # HTML validation
npm run test:fixtures      # Fixture verification
npm run test:inline-styles # Check for inline styles

# Full lint
npm run lint
```

## Key Points

1. **a11y-scan.html is special**: It's the ONLY file that gets quality checks
2. **Test fixtures must stay broken**: They're intentional bad examples
3. **AGENTS.md prevents accidents**: Clear warnings for AI agents and developers
4. **Automated enforcement**: GitHub Actions prevents accidental fixes

## Adding New Checks

To add new quality checks for `a11y-scan.html`:

1. Add check to `validate-scanner` job in `qa.yml`
2. Update `.htmlhintrc` for HTML rules
3. Add npm script to `package.json` for local testing

To add new test fixtures:

1. Add file to `FIXTURES` object in `.github/scripts/verify-fixtures.js`
2. Specify minimum violation count
3. Add detection pattern if needed
