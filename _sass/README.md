# SCSS Architecture Documentation

## Overview

This stylesheet has been refactored following the **7-1 Pattern** for better scalability and maintainability. The architecture separates concerns into logical partials that are easy to find and update.

## Folder Structure

```
_sass/
├── abstracts/           # Variables, mixins (no CSS output)
│   ├── _variables.scss  # Colors, spacing, breakpoints
│   └── _mixins.scss     # Reusable patterns
├── base/                # Foundation styles
│   ├── _reset.scss      # CSS reset and base HTML
│   ├── _typography.scss # Font faces and text styles
│   └── _utilities.scss  # Utility classes
├── components/          # Reusable components
│   ├── _animations.scss # Fade-in, waves effect
│   ├── _badges.scss     # Pills and tags
│   ├── _buttons.scss    # All button styles
│   ├── _cards.scss      # Pricing and plan cards
│   ├── _forms.scss      # Waitlist form and inputs
│   └── _lists.scss      # Check lists
├── layout/              # Major layout sections
│   ├── _container.scss  # Container wrapper
│   ├── _footer.scss     # Site footer
│   ├── _header.scss     # Nav and header
│   └── _hero.scss       # Hero section
├── pages/               # Page-specific styles
│   ├── _blog.scss       # Blog and post styles
│   ├── _landing.scss    # Landing page
│   └── _pricing.scss    # Pricing page + FAQ
└── base.scss            # Main import file
```

## Class Naming Convention

### BEM (Block Element Modifier)

We use BEM for component structure:

```scss
.block {}              // Component
.block__element {}     // Part of component
.block--modifier {}    // Variant of component
```

**Examples:**
```scss
// ✅ Good
.hero {}
.hero__title {}
.hero__subtext {}
.hero__subtext--landing {}

.btn {}
.btn--secondary {}
.btn--on-demand {}
.btn__arrow {}

// ❌ Avoid
.hero-title {}           // Use .hero__title
.subtext.landing {}      // Use .hero__subtext--landing
```

### Utility Classes

Utility classes use the `u-` prefix:

```scss
.u-text-center {}
.u-show-desktop {}
.u-show-mobile {}
.sr-only {}  // Exception: standard screen-reader class
```

### Legacy Support

For backward compatibility, old class names are supported using `@extend`:

```scss
// New class
.hero__subtext { /* styles */ }

// Legacy support
.subtext {
  @extend .hero__subtext;
}
```

**Migration path:** Update HTML to use new classes, then remove legacy support.

## CSS Variables

All design tokens are defined in `abstracts/_variables.scss`:

```scss
// Colors
var(--color-dark)
var(--color-pink)
var(--color-blue-light)

// Spacing
var(--spacing-xs)  // 0.5rem
var(--spacing-sm)  // 1rem
var(--spacing-md)  // 1.5rem
var(--spacing-lg)  // 2rem

// Radius
var(--radius-sm)   // 6px
var(--radius-md)   // 10px
var(--radius-full) // 9999px

// Shadows
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)

// Transitions
var(--transition-fast)  // 0.15s
var(--transition-base)  // 0.2s
var(--transition-slow)  // 0.3s
```

## Mixins

Common patterns are available as mixins in `abstracts/_mixins.scss`:

```scss
// Media queries
@include media-mobile { }    // max-width: 768px
@include media-tablet { }    // max-width: 960px
@include media-desktop { }   // max-width: 1090px

// Layout patterns
@include flex-center;
@include absolute-center;

// Effects
@include glass-effect;
@include frosted-card;
@include hover-lift;

// Utilities
@include visually-hidden;
@include focus-visible;
@include truncate;
```

## How to Add New Styles

### 1. Adding a New Component

Create a new file in `components/`:

```scss
// _sass/components/_modal.scss
.modal {
  // Base styles

  &__header { }
  &__body { }
  &__footer { }

  &--large { }
  &--centered { }
}
```

Import in `base.scss`:
```scss
@import "components/modal";
```

### 2. Adding Page-Specific Styles

Create a new file in `pages/`:

```scss
// _sass/pages/_contact.scss
.contact-form { }
.contact-hero { }
```

Import in `base.scss`:
```scss
@import "pages/contact";
```

### 3. Adding Utility Classes

Add to `base/_utilities.scss`:

```scss
.u-margin-top-lg {
  margin-top: var(--spacing-lg);
}
```

## Benefits of This Architecture

### ✅ Maintainability
- Easy to find where styles are defined
- Clear separation of concerns
- Reduced file sizes per partial

### ✅ Scalability
- Simple to add new components
- Consistent naming patterns
- Reusable mixins and variables

### ✅ Performance
- No duplicate code
- Centralized design tokens
- Better caching with modular files

### ✅ Collaboration
- Clear conventions
- Self-documenting structure
- Easier code reviews

## Migration Notes

### Updated Class Names

| Old Class | New Class | Status |
|-----------|-----------|--------|
| `.subtext` | `.hero__subtext` | Legacy supported |
| `.subtext.landing` | `.hero__subtext--landing` | Legacy supported |
| `.btn-secondary` | `.btn--secondary` | Legacy supported |
| `.center` | `.u-text-center` | Legacy supported |
| `.desktop` | `.u-show-desktop` | Legacy supported |
| `.mobile` | `.u-show-mobile` | Legacy supported |

### Removed Code

The following were removed during refactoring:
- Duplicate `.fade-in` definitions
- Duplicate `#lp-post-img` rules
- Commented-out code blocks
- Redundant `.email-input:focus` styles

## Next Steps

1. **Update HTML templates** to use new BEM class names
2. **Remove legacy `@extend` rules** once HTML is updated
3. **Add new components** following the established patterns
4. **Consider migrating to `@use`/`@forward`** to eliminate deprecation warnings

## Questions?

Refer to this documentation when adding new styles. Follow the established patterns and naming conventions for consistency.
