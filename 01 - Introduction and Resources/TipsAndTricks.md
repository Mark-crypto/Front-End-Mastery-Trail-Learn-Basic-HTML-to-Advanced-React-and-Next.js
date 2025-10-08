# HTML & CSS — Tips, Best Practices, Pitfalls and Industry Guidance

This README is a compact but practical guide for learners in the HTML/CSS module of your frontend course. It brings together actionable tips, industry best practices, common pitfalls, style/syntax guidance and extra resources so students can write clean, maintainable, accessible and performant front-end code.

---

## Quick overview (what to remember)

- **Use semantic HTML** — it helps accessibility, SEO and maintainability.
- **Mobile-first responsive design** — design for small screens first, then scale up.
- **Prefer CSS custom properties & utility classes** for maintainability.
- **Use tools**: Prettier, Stylelint, EditorConfig and browser DevTools.
- **Accessibility and performance matter** as much as visuals.

---

# 1. HTML — Best Practices & Syntax Guide

## Semantic structure (do this)

- Always start with the HTML5 boilerplate:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Page title</title>
  </head>
  <body>
    <header>…</header>
    <main>…</main>
    <footer>…</footer>
  </body>
</html>
```

- Use semantic tags: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>`, `<figure>`, `<figcaption>`.
- Use headings (`<h1>`–`<h6>`) in order. One `<h1>` per page is recommended.

## Accessibility-first HTML

- Always provide `alt` for images. If decorative, use `alt=""`.
- Use `<label for="id">` with form inputs — clickable and accessible.
- Provide ARIA roles only when semantic HTML cannot express the purpose.
- Ensure keyboard focus order and visible focus styles (e.g., `:focus { outline: ... }`).

## Forms & inputs

- Use `type` appropriately: `email`, `tel`, `number`, `url`, `date`, `search`, `password`.
- Use `required`, `min`, `max`, `pattern` where meaningful, but validate on server too.
- Use `autocomplete` attributes to improve UX.

## Images & media

- Prefer modern formats (WebP, AVIF) where supported; fallback to JPEG/PNG.
- Use `srcset` and `sizes` for responsive images.
- Use `<picture>` for art direction (different crops at different sizes).
- Provide captions and transcripts for audio/video where appropriate.

## Microcopy & metadata

- Write meaningful `<title>` and `<meta name="description">`.
- Use Open Graph/Twitter cards for social link previews.

## Common HTML pitfalls to avoid

- Don’t use `<div>` when a semantic element exists.
- Don’t nest interactive elements (e.g., `<button>` inside `<a>`).
- Don’t rely only on placeholder text for input labels.
- Avoid inline styles (`style="..."`) for layout and structure.

---

# 2. CSS — Best Practices, Architecture & Syntax

## Modern CSS syntax practices

- Use **CSS custom properties** (variables) for theme tokens:

```css
:root {
  --color-primary: #6c5ce7;
  --space-1: 8px;
}
.button {
  background: var(--color-primary);
  padding: calc(var(--space-1) * 2);
}
```

- Use `rem` for typographic sizing, `px` for borders or hairline details, `vw`/`vh` sparingly, and `min()`/`max()` where helpful.
- Prefer `gap` with Flexbox/Grid instead of manual margins.

## Layout: mobile-first & tools

- Mobile-first media queries:

```css
/* base = mobile */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

- Use **Flexbox** for 1D layout and **Grid** for 2D layout.
- Use `place-items`, `align-items`, `justify-content` for centering.

## CSS Architecture & naming

- Choose a methodology and apply consistently:

  - **BEM** (Block\_\_Element--Modifier) for clarity.
  - **SMACSS / OOCSS** for larger apps.

- Example BEM:

```html
<div class="card card--featured">
  <h2 class="card__title">Title</h2>
  <p class="card__body">...</p>
</div>
```

## Component-first & scoping

- Use scoped classes per component (avoid styling by tag globally).
- Use utility classes for small, frequently used style patterns (e.g., `.u-mt-1`).

## Performance & build

- Use `prefers-reduced-motion` for accessibility:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- Minimize CSS that forces repaint/reflow (avoid heavy use of `box-shadow` or expensive selectors in hot paths).
- Use `will-change` carefully; it can hurt performance if overused.

## Tooling (industry standard)

- Format with **Prettier**.
- Lint with **Stylelint** (establish rules for your team).
- Autoprefixer via PostCSS for vendor prefixes.
- Consider CSS bundlers: Vite/Parcel/Webpack; use PostCSS for transformations.

## Common CSS pitfalls to avoid

- Overly specific selectors that break reusability.
- Heavy reliance on `!important`.
- Global resets that remove useful defaults without restoring accessibility (e.g. removing focus outlines without replacement).
- Using inline styles for layout or theming.

---

# 3. File structure & project organization (recommended)

```
/project
  /src
    /components
      /Header
        Header.html
        header.css
    /styles
      _variables.css
      _utilities.css
      main.css
    index.html
  package.json
  .editorconfig
  .prettierrc
  .stylelintrc
```

- Group component-specific styles near components (or use CSS modules / scoped styles).
- Keep global tokens (colors, spacing) in a single place.

---

# 4. Accessibility & Inclusive Design (must-do)

- Use semantic HTML first. Screen readers love it.
- Ensure color contrast meets WCAG AA (contrast-checker).
- Provide keyboard-accessible controls and focus states.
- Use `aria-*` sparingly to enhance semantics where HTML falls short (e.g., custom widgets).
- Test with screen readers (NVDA/VoiceOver) periodically.

---

# 5. Debugging tips & DevTools workflow

- Inspect layout: use Elements panel, check box model, see computed styles.
- Network: check resource sizes and caching.
- Performance: Lighthouse audits and performance tab for paint, CPU usage and long tasks.
- Simulate mobile: device toolbar to test touch and viewport sizes.
- Use `console.log` and `debugger` for JS; for CSS, toggle rules in DevTools to see changes in real time.

---

# 6. Common learning pitfalls & how to overcome them

- **Pitfall:** Trying to learn everything at once (Grid, Flex, animations, preprocessors) → _Fix:_ Learn layout fundamentals first: box model → flexbox → grid.
- **Pitfall:** Copy-pasting styles without understanding → _Fix:_ Reproduce designs by hand and explain each rule.
- **Pitfall:** Ignoring accessibility → _Fix:_ Build a habit: every component must be keyboard navigable.
- **Pitfall:** Not using Version Control → _Fix:_ Create small commits and descriptive messages; push to GitHub early.
- **Pitfall:** Over-optimization early → _Fix:_ First make it correct & usable, then optimize.

---

# 7. Style & syntax conventions (suggested team rules)

- HTML:

  - Lowercase tag and attribute names.
  - Always quote attribute values: `class="card"`.
  - Self-close void elements consistently (HTML5 allows `<img>` vs `<img />`; choose one pattern).

- CSS:

  - Use hyphen-case for class names (BEM: `.component__element--modifier`).
  - One declaration per line. (Prettier enforces.)
  - Group related properties (positioning, box-model, typography, visual).

- Comments:

  - Use comments to document sections, not to explain obvious code:

    ```css
    /* Layout */
    .grid {
      display: grid;
    }
    ```

---

# 8. Quick checklists

## HTML checklist before PR

- [ ] Semantic tags used where appropriate
- [ ] Alt text for images
- [ ] Form inputs have labels
- [ ] Headings in logical order
- [ ] Title & meta description present

## CSS checklist before PR

- [ ] No `!important` unless justified
- [ ] Variables used for colors/spacing where appropriate
- [ ] Responsive breakpoints checked
- [ ] Stylelint & Prettier pass
- [ ] Accessibility checks (contrast, focus)

---

# 9. Learning exercises & practice suggestions

- Rebuild a simple landing page with **mobile-first** approach.
- Make a responsive nav with accessible keyboard controls.
- Convert a design to components and extract variables.
- Build a dashboard widget using Grid and Flexbox and add responsive behavior.

---

# 10. Useful resources & cheat sheets

- MDN Web Docs — HTML & CSS (canonical reference)
- CSS-Tricks — practical articles and patterns
- Flexbox Froggy / Grid Garden — interactive layout games
- W3C & WebAIM — accessibility guides
- Can I Use — browser compatibility
- Lighthouse — performance & best-practices auditing tool

---

# 11. Example snippets (copy/paste friendly)

## Clean semantic header

```html
<header class="site-header">
  <div class="container">
    <a href="/" class="site-logo">Brand</a>
    <nav class="main-nav" aria-label="Main navigation">
      <ul class="main-nav__list">
        <li><a href="/about">About</a></li>
        <li><a href="/projects">Projects</a></li>
      </ul>
    </nav>
  </div>
</header>
```

## Minimal responsive card (BEM + vars)

```css
:root {
  --gap: 1rem;
  --card-bg: #fff;
  --card-radius: 8px;
  --shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.card {
  background: var(--card-bg);
  border-radius: var(--card-radius);
  box-shadow: var(--shadow);
  padding: calc(var(--gap) * 1.5);
}

.card__title {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}
.card__body {
  color: #444;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .card {
    padding: calc(var(--gap) * 2);
  }
}
```

---

# 12. Final advice (short)

- Write semantic HTML first. Style later.
- Keep CSS modular and predictable.
- Test on real devices and with assistive tech.
- Automate formatting & linting.
- Iterate: build, test, optimize.

---
