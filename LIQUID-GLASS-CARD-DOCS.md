# Liquid Glass Card Component

A production-ready glassmorphism card with SVG liquid displacement effect for Jekyll websites.

## 📋 Features

- **Pure CSS/SVG**: Zero JavaScript dependencies
- **Responsive**: Mobile-optimized with graceful scaling
- **Customizable**: Liquid template variables for content
- **Performance**: GPU-accelerated SVG filters
- **Accessible**: Semantic HTML with ARIA labels
- **Modern**: Supports Chrome 76+, Safari 9+, Firefox 103+

## 🚀 Quick Start

### 1. Basic Usage

```liquid
{% include liquid-glass-card.html
   title="Featured Project"
   description="Check out my latest work on this amazing project"
   button_text="View Project"
   button_link="/projects/latest"
%}
```

### 2. Multiple Cards on Same Page

When using multiple cards, provide unique `card_id` to avoid SVG filter conflicts:

```liquid
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px;">
   {% include liquid-glass-card.html
      title="Project One"
      description="First amazing project"
      button_text="Learn More"
      button_link="/project-1"
      card_id="card-1"
   %}

   {% include liquid-glass-card.html
      title="Project Two"
      description="Second amazing project"
      button_text="Learn More"
      button_link="/project-2"
      card_id="card-2"
   %}
</div>
```

### 3. Card Without Button

```liquid
{% include liquid-glass-card.html
   title="Simple Card"
   description="This card displays only title and description"
%}
```

## 🎨 Customization Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `title` | String | Yes | - | Card heading text |
| `description` | String | Yes | - | Card body text |
| `button_text` | String | No | - | Text for CTA button |
| `button_link` | String | No | - | URL for button |
| `card_id` | String | No | `"liquid-card-1"` | Unique ID for SVG filter |

## 🎛️ Advanced Customization

### Modify Liquid Effect Intensity

Edit `_includes/liquid-glass-card.html` and adjust the SVG filter parameters:

```html
<feTurbulence
   baseFrequency="0.015"  <!-- Lower = subtle, Higher = intense (0.01-0.02) -->
   numOctaves="2"         <!-- Complexity: 2-3 recommended -->
/>

<feDisplacementMap
   scale="180"            <!-- Distortion intensity (150-200) -->
/>
```

### Modify Glass Blur

Edit `_sass/components/_liquid-glass-card.scss`:

```scss
.liquid-glass-card__glass {
   backdrop-filter: brightness(1.1) blur(10px);  // Adjust blur value (8px-12px)
}
```

### Change Card Size

Three built-in variants available via utility classes:

```liquid
<!-- Default: 400×400px -->
{% include liquid-glass-card.html title="Standard" description="Default size" %}

<!-- Compact: 320×320px -->
<div class="liquid-glass-card--compact">
   {% include liquid-glass-card.html title="Compact" description="Smaller card" %}
</div>

<!-- Full Width (max 500px) -->
<div class="liquid-glass-card--full-width">
   {% include liquid-glass-card.html title="Full Width" description="Responsive width" %}
</div>
```

Or customize in SCSS:

```scss
.liquid-glass-card {
   width: 500px;   // Your custom width
   height: 500px;  // Your custom height
}
```

## 📱 Responsive Behavior

- **Desktop**: 400×400px
- **Mobile (≤768px)**: 340×340px
- **Small Mobile (≤380px)**: 100% width, 380px height

## 🎨 Best Practices

### Background Recommendations

The card works best on colorful gradient backgrounds:

```css
/* Example backgrounds that showcase the glass effect */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
background: radial-gradient(circle, #667eea 0%, #764ba2 100%);
```

### Performance Tips

1. **Limit card count**: Use 1-3 cards per page for optimal performance
2. **GPU acceleration**: The card uses `transform: translateZ(0)` for hardware acceleration
3. **Test on mobile**: SVG filters can be resource-intensive on lower-end devices

### Accessibility

- All decorative elements use `aria-hidden="true"`
- Buttons include `aria-label` for screen readers
- Semantic HTML structure (h3, p, a tags)

## 🔧 Troubleshooting

### Card appears solid (no glass effect)

**Issue**: Browser doesn't support `backdrop-filter`

**Solution**: The card gracefully degrades to a solid background. Add a fallback:

```scss
.liquid-glass-card__glass {
   background: rgba(255, 255, 255, 0.8); // Fallback for older browsers
}
```

### Liquid effect not visible

**Issue**: SVG filter not applying

**Solutions**:
1. Ensure each card has a unique `card_id`
2. Check browser DevTools for SVG filter errors
3. Verify the filter ID matches in both SVG and CSS

### Cards overlap on mobile

**Issue**: Grid layout needs adjustment

**Solution**: Add responsive grid:

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px;">
   {% include liquid-glass-card.html ... %}
</div>
```

## 📂 File Structure

```
website/
├── _includes/
│   └── liquid-glass-card.html          # Component template
├── _sass/
│   └── components/
│       └── _liquid-glass-card.scss     # Component styles
└── _sass/
    └── base.scss                        # Import added here
```

## 🎨 Example Page Integration

Create a page (e.g., `projects.html`):

```liquid
---
layout: default
title: Projects
---

<div class="container" style="padding: 80px 0;">
   <h1 style="text-align: center; margin-bottom: 60px;">Our Projects</h1>

   <div style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;
   ">
      {% include liquid-glass-card.html
         title="Project Alpha"
         description="Revolutionary new approach to web design"
         button_text="View Case Study"
         button_link="/projects/alpha"
         card_id="alpha"
      %}

      {% include liquid-glass-card.html
         title="Project Beta"
         description="Innovative solution for modern challenges"
         button_text="Explore Project"
         button_link="/projects/beta"
         card_id="beta"
      %}
   </div>
</div>
```

## 🎯 Design System Integration

To add the card to your design system page:

```html
<section id="liquid-glass" class="ds-section">
   <h2 class="ds-section__title">Liquid Glass Card</h2>

   <div class="ds-component-demo">
      {% include liquid-glass-card.html
         title="Demo Card"
         description="Interactive glassmorphism card with liquid SVG displacement"
         button_text="Click Me"
         button_link="#liquid-glass"
         card_id="demo-card"
      %}
   </div>

   <div class="ds-code">
      &lt;%&#x25; include liquid-glass-card.html
         title="Your Title"
         description="Your description"
         button_text="Button Text"
         button_link="/your-link"
         card_id="unique-id"
      %&gt;
   </div>
</section>
```

## 🔬 Technical Details

### SVG Filter Breakdown

```xml
<feTurbulence>
   <!-- Creates Perlin noise pattern -->
   baseFrequency: Controls pattern detail (0.015 = medium detail)
   numOctaves: Adds complexity layers (2 = balanced)
   type: "turbulence" creates organic liquid look
</feTurbulence>

<feDisplacementMap>
   <!-- Distorts pixels based on turbulence -->
   scale: Displacement intensity (180 = noticeable but not excessive)
   xChannelSelector/yChannelSelector: Which color channels control X/Y displacement
</feDisplacementMap>
```

### CSS Backdrop Filter

```scss
backdrop-filter: brightness(1.1) blur(10px);
```

- `brightness(1.1)`: Slight lightening for glass effect
- `blur(10px)`: Frosted glass appearance
- Browser applies filter to content BEHIND the element

### Glossy Edge Reflections

```scss
box-shadow:
   inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7),   // Top-left highlight
   inset 0 0 12px 1px rgba(255, 255, 255, 0.4),        // Overall glow
   inset -1px -1px 0px 0px rgba(255, 255, 255, 0.2);   // Bottom-right accent
```

## 📄 License

This component is part of your Caution website project.

## 🆘 Support

For issues or questions:
1. Check this documentation
2. Review browser console for errors
3. Verify all files are properly imported
4. Test in supported browsers

---

**Created**: 2025
**Last Updated**: 2025-11-16
**Version**: 1.0.0
