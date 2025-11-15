# CSS Quick Reference Card

## 🎯 Where Do I Find...?

| Looking for... | File |
|---------------|------|
| **Colors** | `abstracts/_variables.scss` |
| **Spacing values** | `abstracts/_variables.scss` |
| **Media queries** | `abstracts/_mixins.scss` |
| **Buttons** | `components/_buttons.scss` |
| **Cards** | `components/_cards.scss` |
| **Forms** | `components/_forms.scss` |
| **Pills/Badges** | `components/_badges.scss` |
| **Header/Nav** | `layout/_header.scss` |
| **Footer** | `layout/_footer.scss` |
| **Hero section** | `layout/_hero.scss` |
| **Landing page** | `pages/_landing.scss` |
| **Pricing page** | `pages/_pricing.scss` |
| **Blog styles** | `pages/_blog.scss` |

## 🎨 Common Variables

```scss
// Colors
var(--color-dark)      // #0f0f0f
var(--color-pink)      // #f048b5
var(--color-blue-mid)  // #c7e8ff
var(--color-grey-mid)  // #ccc

// Spacing
var(--spacing-xs)   // 0.5rem
var(--spacing-sm)   // 1rem
var(--spacing-md)   // 1.5rem
var(--spacing-lg)   // 2rem
var(--spacing-xl)   // 2.5rem

// Border Radius
var(--radius-sm)    // 6px
var(--radius-md)    // 10px
var(--radius-lg)    // 20px
var(--radius-full)  // 9999px

// Transitions
var(--transition-fast)  // 0.15s
var(--transition-base)  // 0.2s
var(--transition-slow)  // 0.3s
```

## 🔧 Common Mixins

```scss
// Responsive
@include media-mobile { }    // max-width: 768px
@include media-tablet { }    // max-width: 960px
@include media-desktop { }   // max-width: 1090px

// Layout
@include flex-center;        // Display flex, center items
@include absolute-center;    // Absolute position, centered

// Effects
@include glass-effect;       // Glassmorphism backdrop blur
@include frosted-card;       // Frosted glass card effect
@include hover-lift;         // Lift on hover

// Utilities
@include visually-hidden;    // Screen reader only
@include focus-visible;      // Focus outline style
```

## 📝 BEM Naming Examples

```scss
// Component
.hero { }

// Element (part of component)
.hero__title { }
.hero__subtext { }
.hero__content { }

// Modifier (variant)
.hero__subtext--landing { }
.hero__title--thankyou { }

// Button component
.btn { }
.btn--secondary { }
.btn--on-demand { }
.btn__arrow { }

// Card component
.pricing-card { }
.card-title { }
.card-body { }
.card-corner { }
```

## ⚡ Quick Tasks

### Add a new color
```scss
// abstracts/_variables.scss
:root {
  --color-new-name: #123456;
}
```

### Add a new component
```scss
// 1. Create: components/_component-name.scss
.component-name {
  &__element { }
  &--modifier { }
}

// 2. Import in base.scss
@import "components/component-name";
```

### Add responsive styles
```scss
.my-element {
  font-size: 2rem;

  @include media-mobile {
    font-size: 1.5rem;
  }
}
```

### Use design tokens
```scss
// ✅ Good
.card {
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  color: var(--color-dark);
}

// ❌ Avoid
.card {
  padding: 2rem;
  border-radius: 10px;
  color: #0f0f0f;
}
```

## 🚀 Build & Test

```bash
# Build the site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve

# Build and watch
bundle exec jekyll serve --livereload
```

## 📚 More Info

- Full documentation: [`README.md`](./README.md)
- Refactoring details: [`REFACTORING_SUMMARY.md`](./REFACTORING_SUMMARY.md)
