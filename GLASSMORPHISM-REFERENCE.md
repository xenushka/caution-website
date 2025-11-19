# Glassmorphism Effect Reference

This document outlines the final glassmorphism styling used across the Caution website. This effect creates a frosted glass appearance with subtle transparency, blur, and depth.

## Overview

The glassmorphism effect is characterized by:
- **High transparency** with very low opacity values (0.01-0.05)
- **Strong backdrop blur** for the frosted glass effect
- **Layered gradients** using Display-P3 color space for wider color gamut
- **Subtle inset shadows** for depth and highlights
- **Complex blend modes** for visual richness

## Core Implementation

### Complete SCSS Code

```scss
.glassmorphic-element {
  border-radius: 32px;

  // Fallback for non-P3 displays (sRGB)
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.5) 32.69%
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%),
    linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.3) 100%
    ),
    rgba(240, 240, 240, 0.25);

  // Display-P3 wide color gamut (overrides sRGB on supported displays)
  background: linear-gradient(
      180deg,
      color(display-p3 0 0 0 / 0.01) 0%,      // Very subtle dark overlay at top
      color(display-p3 0 0 0 / 0.01) 35%
    ),
    linear-gradient(
      180deg,
      color(display-p3 1 1 1 / 0) 50%,         // Transparent white gradient
      color(display-p3 1 1 1 / 0.05) 100%      // 5% white at bottom
    ),
    linear-gradient(
      0deg,
      color(display-p3 1 1 1 / 0.01) 0%,       // 1% white overlay
      color(display-p3 1 1 1 / 0.01) 100%
    ),
    linear-gradient(
      0deg,
      color(display-p3 1 1 1 / 0.03) 0%,       // 3% white gradient
      color(display-p3 1 1 1 / 0.05) 100%      // 5% white gradient
    ),
    color(display-p3 0.95 0.95 0.95 / 0.03);   // 3% light gray base

  // Blend modes create depth and visual complexity
  background-blend-mode: plus-lighter, plus-lighter, normal, color-burn, overlay;

  // Fallback shadows (sRGB)
  box-shadow: 16px 16px 9px -18px #fff inset,
    -12px -12px 6px -14px #e0e0e0 inset,
    2px 2px 1px -2px #e0e0e0 inset,
    0 0 22px 0 rgba(242, 242, 242, 0.5) inset;

  // Display-P3 shadows (overrides sRGB on supported displays)
  box-shadow: 16px 16px 9px -18px color(display-p3 1 1 1) inset,           // Bright highlight
    -12px -12px 6px -14px color(display-p3 0.88 0.88 0.88) inset,          // Subtle shadow
    2px 2px 1px -2px color(display-p3 0.88 0.88 0.88) inset,               // Edge highlight
    0 0 22px 0 color(display-p3 0.949 0.949 0.949 / 0.3) inset;            // Glow effect

  // The key to the frosted glass effect
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);  // Safari support
}
```

## Property Breakdown

### 1. Background Gradients (Display-P3)

The effect uses **5 layered gradients**:

```scss
// Layer 1: Top subtle dark overlay (1% black)
linear-gradient(180deg, color(display-p3 0 0 0 / 0.01) 0%, color(display-p3 0 0 0 / 0.01) 35%)

// Layer 2: Bottom white gradient (0% to 5%)
linear-gradient(180deg, color(display-p3 1 1 1 / 0) 50%, color(display-p3 1 1 1 / 0.05) 100%)

// Layer 3: Uniform white overlay (1%)
linear-gradient(0deg, color(display-p3 1 1 1 / 0.01) 0%, color(display-p3 1 1 1 / 0.01) 100%)

// Layer 4: White gradient (3% to 5%)
linear-gradient(0deg, color(display-p3 1 1 1 / 0.03) 0%, color(display-p3 1 1 1 / 0.05) 100%)

// Layer 5: Base light gray (3% opacity)
color(display-p3 0.95 0.95 0.95 / 0.03)
```

### 2. Background Blend Modes

```scss
background-blend-mode: plus-lighter, plus-lighter, normal, color-burn, overlay;
```

- **plus-lighter** (layers 1-2): Brightens overlapping areas
- **normal** (layer 3): Standard blend
- **color-burn** (layer 4): Darkens and adds contrast
- **overlay** (layer 5): Combines multiply and screen for depth

### 3. Box Shadows (Display-P3)

```scss
// Top-right bright highlight
16px 16px 9px -18px color(display-p3 1 1 1) inset

// Top-left subtle shadow
-12px -12px 6px -14px color(display-p3 0.88 0.88 0.88) inset

// Small edge highlight
2px 2px 1px -2px color(display-p3 0.88 0.88 0.88) inset

// Central glow effect
0 0 22px 0 color(display-p3 0.949 0.949 0.949 / 0.3) inset
```

### 4. Backdrop Filter

```scss
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
```

**Critical**: This creates the frosted glass effect by blurring content behind the element.

## Opacity Control Guide

### Making More Transparent
To increase transparency (more see-through):
- **Decrease** alpha values: `/0.05` → `/0.02`
- **Increase** blur: `5px` → `10px` or `20px`

### Making More Opaque
To decrease transparency (more solid):
- **Increase** alpha values: `/0.05` → `/0.15`
- **Decrease** blur: `5px` → `2px`

## Tint Control Guide

### Reducing Greyish Tint (More White)
Replace grey gradients with pure white:
```scss
// Change from:
color(display-p3 0.95 0.95 0.95 / 0.03)

// To:
color(display-p3 1 1 1 / 0.03)
```

### Increasing Greyish Tint (More Grey)
Use darker grey values:
```scss
// Change from:
color(display-p3 0.95 0.95 0.95 / 0.03)

// To:
color(display-p3 0.7 0.7 0.7 / 0.05)
```

## Browser Support

### Modern Browsers (Full Support)
- **Chrome/Edge 76+**: Full support including Display-P3
- **Safari 9+**: Full support including Display-P3
- **Firefox 103+**: Full support

### Fallbacks Provided
- **sRGB backgrounds**: Fallback for non-P3 displays
- **sRGB box-shadows**: Fallback shadows
- **-webkit-backdrop-filter**: Safari-specific prefix

### Not Supported
- **Internet Explorer 11**: No backdrop-filter support (degrades gracefully)

## Performance Notes

1. **Backdrop-filter is GPU-accelerated** in modern browsers
2. **May impact performance** on lower-end devices
3. **Recommended usage**: 1-5 elements per page
4. **Use sparingly**: Don't apply to every element
5. **Mobile considerations**: Reduce blur values on mobile if needed

## Current Usage in Caution Website

### Feature Item Icons
**File**: `_sass/pages/_landing.scss` (lines 372-431)
```scss
.feature-item__icon {
  width: 130px;
  height: 130px;
  border-radius: 32px;
  backdrop-filter: blur(5px);
  // ... (full glassmorphism code)
}
```

### Liquid Glass Card
**File**: `_sass/components/_liquid-glass-card.scss` (lines 62-132)
```scss
.liquid-glass-card__glass {
  border-radius: 24px;
  backdrop-filter: blur(30px);  // Higher blur for stronger effect
  // ... (full glassmorphism code)
}
```

## Color Space Explanation

### Display-P3 vs sRGB

**Display-P3**:
- Wider color gamut (25% more colors than sRGB)
- Supported by modern displays (iPhones, MacBooks, high-end monitors)
- Format: `color(display-p3 R G B / alpha)`
- Values: 0-1 for each channel

**sRGB**:
- Standard color space
- Universal browser support
- Format: `rgba(R, G, B, alpha)`
- Values: 0-255 for RGB, 0-1 for alpha

### Why Both?
The CSS includes both formats. Browsers that support Display-P3 will use it (and ignore the sRGB fallback). Older browsers will use the sRGB version.

## Quick Reference Values

| Property | Current Value | Purpose |
|----------|---------------|---------|
| Border Radius | `32px` (icons), `24px` (cards) | Smooth corners |
| Backdrop Blur | `5px` (icons), `30px` (cards) | Frosted glass effect |
| Base Opacity | `0.01` - `0.05` | Extreme transparency |
| Shadow Spread | `-18px` to `9px` | Creates depth |
| Blend Modes | `plus-lighter, color-burn, overlay` | Visual complexity |

## Common Adjustments

### For Different Backgrounds

**Light Backgrounds** (current):
- Use current settings
- Very low opacity (0.01-0.05)
- White/light grey tints

**Dark Backgrounds**:
```scss
// Increase opacity slightly
color(display-p3 0.1 0.1 0.1 / 0.15)

// Adjust shadows to be lighter
box-shadow: 16px 16px 9px -18px color(display-p3 0.3 0.3 0.3) inset
```

**Colorful Backgrounds**:
- Increase blur: `blur(20px)` or higher
- Keep opacity very low: `0.01-0.03`
- Use pure white: `color(display-p3 1 1 1 / alpha)`

## Troubleshooting

### Glass Effect Not Visible
1. Check backdrop-filter support
2. Ensure element has content behind it
3. Increase blur value
4. Verify opacity values aren't too high

### Too Opaque/Solid Looking
1. Decrease alpha values
2. Increase backdrop-filter blur
3. Remove some gradient layers

### Too Transparent/Invisible
1. Increase alpha values
2. Add more white to gradients
3. Increase box-shadow opacity

### Greyish Tint Unwanted
1. Replace grey values with pure white (1 1 1)
2. Adjust blend modes
3. Remove `color-burn` blend mode

## Notes

- Always test on multiple backgrounds
- Preview on both P3 and sRGB displays if possible
- Consider performance impact on mobile
- Maintain accessibility (ensure text contrast)
- Test in different browsers

---

**Last Updated**: 2025-11-19
**Version**: 1.0 - Final glassmorphism effect for Caution website
**Author**: Caution Design System
