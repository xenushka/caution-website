# Design System Archive

This document contains archived components and styling that are no longer part of the active design system but may be referenced in the future.

---

## Liquid Glass Cards

**Status:** Archived - Replaced by simplified glassmorphism components
**Date:** 2025-01-19

### Overview
Liquid glass cards were an advanced glassmorphic card component with complex reflection effects, dynamic hover states, and customizable backdrop filters. These have been replaced with simpler `.card-glass` and `.card-glass--dark` components.

### Component Structure

#### 1. Neutral Glass (Default)
```html
{% include liquid-glass-card.html
  title="Neutral Glass"
  description="The default balanced glass effect with moderate transparency and blur."
  button_link="#liquid-glass"
  card_id="neutral-card"
%}
```

**CSS Properties:**
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: brightness(1) blur(20px);
border: 1px solid rgba(255, 255, 255, 0.18);
```

#### 2. Heavy Frosted Glass
```html
<div class="liquid-glass-card" data-card-id="frosted-card">
  <div class="liquid-glass-card__glass"
       style="
         background: rgba(255, 255, 255, 0.2);
         backdrop-filter: brightness(1) blur(20px);
         -webkit-backdrop-filter: brightness(1) blur(20px);
         border: 1px solid rgba(255, 255, 255, 0.1);
       ">
    <div class="liquid-glass-card__content">
      <h3 class="liquid-glass-card__title">Heavy Frosted Glass</h3>
      <p class="liquid-glass-card__description">
        Maximum blur with higher opacity for a deeply frosted appearance.
      </p>
      <a href="#liquid-glass" class="liquid-glass-card__button">
        Learn More
        <span class="liquid-glass-card__button-arrow">→</span>
      </a>
    </div>
  </div>
  <div class="liquid-glass-card__reflection" aria-hidden="true"></div>
</div>
```

**CSS Properties:**
```css
background: rgba(255, 255, 255, 0.2);
backdrop-filter: brightness(1.0) blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

#### 3. Dark Tinted Glass
```html
<div class="liquid-glass-card" data-card-id="dark-card">
  <div class="liquid-glass-card__glass"
       style="
         background: rgba(0, 0, 0, 0.2);
         backdrop-filter: brightness(0.8) blur(12px);
         -webkit-backdrop-filter: brightness(0.8) blur(12px);
         border: 1px solid rgba(255, 255, 255, 0.1);
       ">
    <div class="liquid-glass-card__content">
      <h3 class="liquid-glass-card__title" style="color: rgba(255, 255, 255, 0.95)">
        Dark Tinted Glass
      </h3>
      <p class="liquid-glass-card__description" style="color: rgba(255, 255, 255, 0.85)">
        Dark background with reduced brightness for dramatic contrast.
      </p>
      <a href="#liquid-glass" class="liquid-glass-card__button">
        Learn More
        <span class="liquid-glass-card__button-arrow">→</span>
      </a>
    </div>
  </div>
  <div class="liquid-glass-card__reflection" aria-hidden="true"></div>
</div>
```

**CSS Properties:**
```css
background: rgba(0, 0, 0, 0.2);
backdrop-filter: brightness(0.8) blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Customization Properties

#### 1. Glass Background Transparency
```scss
.liquid-glass-card__glass {
  background: rgba(255, 255, 255, 0.1);  // Change 0.1 (10% opacity)
                                         // Higher = more opaque/visible
                                         // Lower = more transparent
}
```

#### 2. Backdrop Blur Intensity
```scss
.liquid-glass-card__glass {
  backdrop-filter: brightness(1.1) blur(10px);  // Change blur amount
  // blur(5px) = subtle frosting
  // blur(15px) = heavy frosting
  // blur(20px) = very blurred
}
```

#### 3. Brightness Adjustment
```scss
backdrop-filter: brightness(1.1) blur(10px);  // Change 1.1
// brightness(1.0) = normal
// brightness(1.2) = lighter glass
// brightness(0.9) = darker glass
```

#### 4. Border Opacity
```scss
.liquid-glass-card__glass {
  border: 1px solid rgba(255, 255, 255, 0.18);  // Change 0.18
  // Higher = more visible border
  // Lower = more subtle border
}
```

#### 5. Glossy Edge Reflections
```scss
.liquid-glass-card__reflection {
  box-shadow:
    inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7),  // Top-left highlight
    inset 0 0 12px 1px rgba(255, 255, 255, 0.4),      // Overall glow
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.2); // Bottom-right

  // Adjust opacity values (0.7, 0.4, 0.2)
  // Adjust blur (12px) and spread (1px)
}
```

#### 6. Card Shadow Depth
```scss
.liquid-glass-card {
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.15),  // Main shadow
    0 2px 8px 0 rgba(0, 0, 0, 0.08);       // Subtle shadow

  // Change blur (32px, 8px) and opacity (0.15, 0.08)
}
```

#### 7. Hover Effects
```scss
.liquid-glass-card:hover & {
  background: rgba(255, 255, 255, 0.15);  // Brighter on hover
  backdrop-filter: brightness(1.15) blur(12px);  // More blur on hover
}
```

#### 8. Border Radius
```scss
border-radius: 24px;  // Change for rounded corners
// 12px = slightly rounded
// 32px = very rounded
// 50% = circular (if square)
```

### Related Files
- Component: `_includes/liquid-glass-card.html`
- Styles: `_sass/components/_liquid-glass-card.scss`
- Demo background: `/assets/imgs/fractal.png`

### Reason for Archival
The liquid glass cards were replaced with a simpler, more maintainable glassmorphism system using:
- `.card-glass` (light variant with `glassmorphism-light` mixin)
- `.card-glass--dark` (dark variant with `glassmorphism-dark` mixin)
- `.btn-glass` and `.btn-glass--dark` for buttons
- `.email-input--glass` for form inputs

The new system uses Display-P3 color space, consolidated mixins, and eliminates the complex reflection layer for better performance and easier maintenance.
