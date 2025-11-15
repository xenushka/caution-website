# Carousel Component Documentation

## Overview

The carousel component creates an infinite, auto-scrolling display of client logos with smooth animations and fade effects on the edges.

## Files

- **HTML:** `_includes/companies-carousel.html`
- **CSS:** `_sass/components/_carousel.scss`

---

## Usage

### Basic Usage

Include the carousel in any layout or page:

```liquid
{% include companies-carousel.html %}
```

### Hide Title

To hide the "trusted by industry leaders" title:

```liquid
{% include companies-carousel.html hide_title='true' %}
```

---

## Features

### ✨ Auto-Scroll Animation
- Infinite seamless loop
- 40-second duration (desktop)
- 30-second duration (mobile)
- Pause on hover

### 🎨 Visual Effects
- **Grayscale logos** - Desaturated by default
- **Hover effects** - Color and slight zoom on hover
- **Edge fade** - Gradient fade on left/right edges
- **Smooth transitions** - All interactions animated

### ♿ Accessibility
- Duplicate logos marked with `aria-hidden="true"`
- Alt text on all primary logos
- Keyboard accessible (pause on focus)

---

## How It Works

### Infinite Scroll Technique

The carousel uses CSS animation to create a seamless infinite loop:

1. **Duplicate logos** - Each logo set is duplicated
2. **Animate 50%** - Animation moves only halfway (to duplicate set)
3. **Loop restarts** - When animation resets, it's visually identical

```html
<div class="logo-slider">
  <!-- First set -->
  <img src="logo1.svg" alt="Logo 1">
  <img src="logo2.svg" alt="Logo 2">

  <!-- Duplicate set (creates seamless loop) -->
  <img src="logo1.svg" alt="Logo 1" aria-hidden="true">
  <img src="logo2.svg" alt="Logo 2" aria-hidden="true">
</div>
```

### Animation CSS

```scss
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); // Moves to duplicate set
  }
}

.logo-slider {
  animation: scroll 40s linear infinite;

  &:hover {
    animation-play-state: paused; // Pause on hover
  }
}
```

---

## Customization

### Speed

Adjust animation duration in `_sass/components/_carousel.scss`:

```scss
.logo-slider {
  animation: scroll 40s linear infinite; // Change 40s
}

@include media-mobile {
  .logo-slider {
    animation-duration: 30s; // Mobile speed
  }
}
```

### Logo Spacing

Change gap between logos:

```scss
.logo-slider {
  gap: clamp(3rem, 5vw, 6rem); // Adjust these values
}
```

### Logo Size

```scss
.logo-slider img {
  height: clamp(35px, 5vw, 50px); // Min, preferred, max
}
```

### Fade Effect Width

```scss
.logo-section {
  &::before,
  &::after {
    width: 150px; // Fade gradient width
  }
}
```

### Colors

The carousel adapts to page background via fade gradient:

```scss
.logo-section::before {
  background: linear-gradient(
    to right,
    var(--color-blue-light) 0%, // Change to match page bg
    transparent 100%
  );
}
```

---

## Adding/Removing Logos

### To Add a Logo

1. Add to **first set** (with alt text):
```html
<img src="/assets/base/companies/new-logo.svg" alt="Company Name">
```

2. Add to **duplicate set** (with `aria-hidden`):
```html
<img src="/assets/base/companies/new-logo.svg" alt="Company Name" aria-hidden="true">
```

### To Remove a Logo

Remove from **both** the first set AND duplicate set.

### Logo Requirements

- **Format:** SVG, PNG (transparent background preferred)
- **Color:** White/light logos work best
- **Size:** Will be resized to 35-50px height
- **Path:** Must be in `/assets/base/companies/`

### Logo Styling

Apply inline styles if needed:

```html
<!-- Adjust height -->
<img style="height: 60px" src="logo.svg" alt="Company">

<!-- Color inversion (for dark logos) -->
<img style="filter: invert(100)" src="logo.svg" alt="Company">

<!-- Complex filter (for specific colors) -->
<img style="filter: invert(100%) brightness(102%)" src="logo.svg" alt="Company">
```

---

## Responsive Behavior

### Desktop (> 768px)
- Larger logos (35-50px height)
- Wider spacing (3-6rem gap)
- 40-second scroll duration
- 150px fade gradients

### Mobile (≤ 768px)
- Smaller logos (30-40px height)
- Tighter spacing (2-3rem gap)
- 30-second scroll duration (faster)
- 80px fade gradients (narrower)

---

## Accessibility Notes

### ARIA Attributes

```html
<!-- Primary logos (accessible) -->
<img src="logo.svg" alt="Company Name">

<!-- Duplicate logos (hidden from screen readers) -->
<img src="logo.svg" alt="Company Name" aria-hidden="true">
```

### Keyboard Navigation

- Carousel is not focusable (it's decorative)
- Animation pauses on hover for better visibility
- Reduce motion respected (via `@media (prefers-reduced-motion)`)

### Screen Readers

- Title announces: "trusted by industry leaders"
- Each logo announced once (duplicates hidden)
- No interactive elements (purely visual)

---

## Troubleshooting

### Logos Not Scrolling

**Check:**
1. CSS imported in `base.scss`: `@import "components/carousel";`
2. Both sets of logos present in HTML
3. Browser supports CSS animations

### Gap at Loop Point

**Solution:** Ensure logos are duplicated exactly:
- Same number in both sets
- Same order
- Same inline styles

### Logos Cut Off

**Check:**
- Container has `overflow: hidden`
- Fade gradients not too wide
- Logo height not exceeding container

### Animation Too Fast/Slow

**Adjust duration:**
```scss
.logo-slider {
  animation-duration: 40s; // Increase for slower
}
```

---

## Browser Support

- ✅ Chrome/Edge (v88+)
- ✅ Firefox (v85+)
- ✅ Safari (v14+)
- ✅ Mobile browsers
- ⚠️ IE11 not supported (CSS animations)

---

## Examples

### Minimal Example

```liquid
<!-- Just the carousel, no title -->
{% include companies-carousel.html hide_title='true' %}
```

### With Custom Wrapper

```html
<section class="client-showcase">
  <div class="container">
    <h2>Our Clients</h2>
    {% include companies-carousel.html hide_title='true' %}
  </div>
</section>
```

### Multiple Carousels

You can include multiple carousels on the same page:

```liquid
<!-- Partners -->
<h3>Partners</h3>
{% include companies-carousel.html %}

<!-- Clients -->
<h3>Clients</h3>
{% include companies-carousel.html hide_title='true' %}
```

---

## Performance

### Optimization Tips

1. **Use SVG** - Vector graphics scale perfectly
2. **Optimize images** - Compress PNGs before upload
3. **Limit logos** - 10-20 logos optimal
4. **Lazy load** - Consider lazy loading if carousel is below fold

### File Sizes

Current carousel with 15 logos:
- **HTML:** ~2KB
- **CSS:** ~1KB (minified)
- **Images:** Varies (SVGs typically < 5KB each)

---

## Related Components

- [Badges](./_badges.scss) - For pill/badge styles
- [Animations](./_animations.scss) - For other animation effects

---

## Support

For issues or questions:
1. Check this documentation
2. Review [QUICK_REFERENCE.md](../_sass/QUICK_REFERENCE.md)
3. Test in browser console for CSS issues
