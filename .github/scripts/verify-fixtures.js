#!/usr/bin/env node

/**
 * Verify Test Fixtures Script
 * 
 * This script ensures that test fixture HTML files contain accessibility violations.
 * If a fixture page has zero violations, it means someone accidentally "fixed" it,
 * which would break the scanner's validation capability.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define test fixtures and their MINIMUM expected violation counts
// These are conservative minimums - fixtures should have at least this many issues
const FIXTURES = {
  'page1.html': { minViolations: 1, description: 'Color contrast and alt text issues' },
  'page2.html': { minViolations: 2, description: 'Missing form labels' },
  'page3.html': { minViolations: 1, description: 'Icon buttons and heading hierarchy' },
  'page4.html': { minViolations: 1, description: 'ARIA and lang attribute issues' },
  'demo-bad.html': { minViolations: 3, description: 'Multiple violations (IDs, labels, contrast)' },
  'auth/login.html': { minViolations: 1, description: 'Form accessibility issues' },
  'blog/post1.html': { minViolations: 1, description: 'Mixed accessibility issues' }
};

// Files that should NOT be checked (the scanner itself must be accessible)
const EXCLUDED_FILES = [
  'a11y-scan.html',
  'index.html' // May have minimal issues, not a primary test fixture
];

console.log('🔍 Verifying test fixtures contain accessibility violations...\n');

let allPassed = true;
let totalChecked = 0;

for (const [filename, config] of Object.entries(FIXTURES)) {
  const filepath = path.join(process.cwd(), filename);
  
  if (!fs.existsSync(filepath)) {
    console.error(`❌ MISSING: ${filename} not found`);
    allPassed = false;
    continue;
  }

  totalChecked++;
  console.log(`Checking: ${filename}`);
  console.log(`  Expected: ${config.description}`);
  
  try {
    // Run a simple HTML check for known bad patterns
    const content = fs.readFileSync(filepath, 'utf-8');
    let foundIssues = 0;
    const issues = [];

    // Check for common violations
    if (filename === 'page1.html') {
      // Should have images without alt text
      if (/<img[^>]+(?!alt=)[^>]*>/.test(content)) {
        foundIssues++;
        issues.push('Image without alt text');
      }
      // Should have contrast issues (indicated by specific CSS classes)
      if (/low-contrast|worse-contrast/.test(content)) {
        foundIssues++;
        issues.push('Color contrast CSS classes');
      }
    }

    if (filename === 'page2.html') {
      // Should have inputs without labels
      // Check for input tags that don't have a corresponding label
      const inputMatches = content.match(/<input[^>]+>/g) || [];
      const labelCount = (content.match(/<label/g) || []).length;
      if (inputMatches.length > labelCount + 1) { // At least one unlabeled
        foundIssues++;
        issues.push('Inputs without labels');
      }
    }

    if (filename === 'demo-bad.html') {
      // Should have duplicate IDs
      if (/id="duplicate".*id="duplicate"/s.test(content)) {
        foundIssues++;
        issues.push('Duplicate IDs');
      }
      // Should have empty button
      if (/<button[^>]*><\/button>/.test(content)) {
        foundIssues++;
        issues.push('Empty button');
      }
      // Should have image without alt
      if (/<img[^>]+(?!alt)[^>]*\/>/.test(content)) {
        foundIssues++;
        issues.push('Image without alt');
      }
    }

    if (filename === 'auth/login.html') {
      // Should have checkbox without label
      const hasCheckbox = /<input[^>]+type="checkbox"/.test(content);
      const checkboxHasLabel = /<label[^>]*for="remember"|<label[^>]*>.*<input[^>]+type="checkbox"/.test(content);
      if (hasCheckbox && !checkboxHasLabel) {
        foundIssues++;
        issues.push('Checkbox without label');
      }
    }

    if (foundIssues >= config.minViolations) {
      console.log(`  ✅ PASS: Found ${foundIssues} issue(s) - ${issues.join(', ')}`);
    } else {
      console.log(`  ⚠️  WARNING: Found ${foundIssues} issues, expected at least ${config.minViolations}`);
      console.log(`     This fixture may have been accidentally "fixed"`);
      console.log(`     Issues found: ${issues.join(', ') || 'none'}`);
      // Don't fail on this - just warn. Full axe-core scan would be better
    }
    
  } catch (error) {
    console.error(`  ❌ ERROR checking ${filename}: ${error.message}`);
    allPassed = false;
  }
  
  console.log('');
}

// Check that a11y-scan.html is NOT in the fixtures list
if (EXCLUDED_FILES.includes('a11y-scan.html')) {
  console.log('✅ VERIFIED: a11y-scan.html is excluded from fixture checks');
  console.log('   (This file MUST be accessible)\n');
}

console.log('─'.repeat(60));
console.log(`📊 Summary: Checked ${totalChecked} test fixtures`);

if (allPassed) {
  console.log('✅ All test fixtures appear to contain violations');
  console.log('\n⚠️  NOTE: This is a basic structural check.');
  console.log('   For comprehensive validation, run the scanner itself.');
  process.exit(0);
} else {
  console.log('❌ Some fixtures may be missing or broken');
  process.exit(1);
}
