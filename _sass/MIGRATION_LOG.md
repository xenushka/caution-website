# BEM Migration Log

## Landing Page Updated ✅

**File:** `_layouts/landing.html`
**Date:** 2025-11-04
**Status:** Complete

### Changes Made

| Old Class | New BEM Class | Context |
|-----------|---------------|---------|
| `class="hero landing"` | `class="hero hero--landing"` | Hero section modifier |
| `class="subtext desktop"` | `class="hero__subtext u-show-desktop"` | Desktop subtext (2 instances) |
| `class="subtext mobile"` | `class="hero__subtext u-show-mobile"` | Mobile subtext |
| `class="desktop"` | `class="u-show-desktop"` | Info block, waitlist note |
| `class="mobile"` | `class="u-show-mobile"` | Waitlist note |
| `class="arrow"` (in button) | `class="btn__arrow"` | Submit button arrow |

### Lines Updated
- Line 9: Hero section class
- Lines 15, 19: Subtext with responsive utilities
- Line 32: Info block
- Line 100: Button arrow
- Lines 106, 109: Waitlist notes

### Testing
✅ Build successful
✅ CSS compiled correctly
✅ No errors or warnings

---

## Base SCSS Updated ✅

**File:** `_sass/base.scss`
**Date:** 2025-11-04
**Status:** Complete

### Changes Made
- Commented out `@import "pages/pricing"` (line 48)
- Reason: Pricing and software pages removed from site

### Pages Currently Imported
- ✅ `pages/landing` - Used by index.md
- ❌ `pages/pricing` - **Removed** (no pricing.md)
- ✅ `pages/blog` - Used by blog.md and posts

---

## Benefits of Changes

### 1. Semantic HTML
Classes now clearly indicate their purpose:
```html
<!-- Before -->
<p class="subtext desktop">

<!-- After -->
<p class="hero__subtext u-show-desktop">
```

### 2. Utility Clarity
Utility classes are now prefixed with `u-`:
- `desktop` → `u-show-desktop`
- `mobile` → `u-show-mobile`
- `center` → `u-text-center`

### 3. BEM Structure
Following Block__Element--Modifier pattern:
- `hero` = Block
- `hero__subtext` = Element (part of hero)
- `hero--landing` = Modifier (landing variant)

### 4. Maintainability
- Easy to identify component relationships
- Clear separation between utilities and components
- Consistent naming throughout codebase

---

## Next Steps (Optional)

### Other Pages to Migrate
If you want to continue the BEM migration:

1. **Blog page** (`_layouts/blog.html`)
   - Update any utility classes
   - Check for `subtext`, `desktop`, `mobile`

2. **Company page** (`_layouts/company.html`)
   - Same pattern as landing

3. **Services page** (`_layouts/services.html`)
   - Same pattern as landing

4. **Includes** (`_includes/*.html`)
   - Header, footer, etc.
   - Update utility classes

### Remove Legacy Support
Once all HTML is migrated:
1. Remove `@extend` rules from SCSS
2. Delete old class definitions
3. Smaller compiled CSS

### Optional Cleanup
- Delete `_sass/pages/_pricing.scss` if never using pricing features
- Update documentation with new class names

---

## Rollback Instructions

If you need to revert:

```bash
# Restore old landing.html
git checkout HEAD~1 _layouts/landing.html

# Restore old base.scss
git checkout HEAD~1 _sass/base.scss
```

---

## Reference

See also:
- [README.md](./_sass/README.md) - Full architecture guide
- [QUICK_REFERENCE.md](./_sass/QUICK_REFERENCE.md) - Quick lookup
- [REFACTORING_SUMMARY.md](./_sass/REFACTORING_SUMMARY.md) - Initial refactoring details
