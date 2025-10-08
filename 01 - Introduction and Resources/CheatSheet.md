# HTML & CSS Cheat Sheet

> Quick Reference for Frontend Beginners

---

## **HTML Essentials**

### Boilerplate

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Webpage</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

### Common Tags

| Purpose   | Tag Example                                         |
| --------- | --------------------------------------------------- |
| Headings  | `<h1>` – `<h6>`                                     |
| Paragraph | `<p>`                                               |
| Links     | `<a href="#">Link</a>`                              |
| Images    | `<img src="img.jpg" alt="description" />`           |
| Lists     | `<ul><li>Item</li></ul>` / `<ol><li>Item</li></ol>` |
| Buttons   | `<button>Click Me</button>`                         |
| Forms     | `<form><input type="text" /></form>`                |
| Div/Span  | `<div></div>` / `<span></span>`                     |

### Semantic Tags

`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>`, `<nav>`, `<figure>`, `<figcaption>`

### Attributes

| Attribute         | Use                               |
| ----------------- | --------------------------------- |
| `class`           | Styling hook for CSS              |
| `id`              | Unique identifier                 |
| `alt`             | Image description (accessibility) |
| `href`            | Link destination                  |
| `src`             | Image/video source                |
| `target="_blank"` | Open link in new tab              |

---

## **CSS Essentials**

### Basic Syntax

```css
selector {
  property: value;
}
```

### Selectors

| Type         | Example                 | Description                |
| ------------ | ----------------------- | -------------------------- |
| Element      | `p {}`                  | All `<p>` elements         |
| Class        | `.card {}`              | Elements with class `card` |
| ID           | `#main {}`              | Element with ID `main`     |
| Descendant   | `.nav a {}`             | `<a>` inside `.nav`        |
| Pseudo-class | `a:hover {}`            | When link is hovered       |
| Attribute    | `input[type="text"] {}` | Selects specific attribute |

---

## **Box Model**

```
+---------------------+
|     Margin          |
|  +---------------+  |
|  |   Border      |  |
|  | +-----------+ |  |
|  | | Padding   | |  |
|  | | +-------+ | |  |
|  | | |Content| | |  |
|  | | +-------+ | |  |
|  | +-----------+ |  |
|  +---------------+  |
+---------------------+
```

### Common Properties

```css
margin: 10px;
padding: 10px;
border: 1px solid #ccc;
width: 200px;
height: 100px;
```

---

## **Positioning**

| Property   | Description                             |
| ---------- | --------------------------------------- |
| `static`   | Default                                 |
| `relative` | Offset from normal position             |
| `absolute` | Positioned relative to nearest ancestor |
| `fixed`    | Stays fixed when scrolling              |
| `sticky`   | Scrolls until fixed in place            |

---

## **Flexbox**

```css
.container {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center; /* vertical */
  gap: 1rem;
}
```

| Property          | Description            |
| ----------------- | ---------------------- |
| `flex-direction`  | row / column           |
| `justify-content` | main axis alignment    |
| `align-items`     | cross axis alignment   |
| `flex-wrap`       | wrap items to new line |

👉 Try: [Flexbox Froggy](https://flexboxfroggy.com)

---

## **CSS Grid**

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

| Property                   | Description         |
| -------------------------- | ------------------- |
| `grid-template-columns`    | Defines columns     |
| `grid-template-rows`       | Defines rows        |
| `gap`                      | Space between items |
| `grid-column` / `grid-row` | Span elements       |

👉 Try: [Grid Garden](https://cssgridgarden.com)

---

## **Responsive Design**

```css
@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}
```

**Mobile-first tip:**
Start small, then use media queries for larger screens.

---

## **Colors & Units**

```css
color: #ff6600;
background: rgb(255, 255, 255);
opacity: 0.9;
```

| Unit        | Use                        |
| ----------- | -------------------------- |
| `px`        | Fixed size                 |
| `rem`       | Relative to root font size |
| `%`         | Relative to parent         |
| `vh` / `vw` | Viewport height/width      |

---

## **Typography**

```css
body {
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 400;
}
```

| Property         | Description                        |
| ---------------- | ---------------------------------- |
| `font-family`    | Sets the font                      |
| `font-size`      | Size of text                       |
| `line-height`    | Spacing between lines              |
| `text-align`     | left / right / center              |
| `text-transform` | uppercase / lowercase / capitalize |

---

## **Transitions & Animations**

```css
.button {
  transition: all 0.3s ease;
}
.button:hover {
  transform: scale(1.1);
}
```

---

## **Accessibility Quick Tips**

- Always use **`alt`** on `<img>`.
- Use **labels** with form inputs.
- Maintain **color contrast**.
- Don’t remove **focus outlines**.

---

## **Common Pitfalls**

Inline styles — hard to maintain.
Missing alt text — poor accessibility.
Fixed pixel layouts — break responsiveness.
Overusing `!important` — bad maintainability.
Forgetting the box model — layout bugs.

---

## **Tools & Resources**

- [MDN Web Docs](https://developer.mozilla.org/) — Official HTML & CSS Reference
- [Can I Use](https://caniuse.com/) — Check browser support
- [CSS Tricks](https://css-tricks.com/) — Practical guides
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Accessibility
- [Prettier](https://prettier.io/) — Code formatter
- [Stylelint](https://stylelint.io/) — CSS linter

---

## **HTML & CSS Checklist**

- Semantic tags
- Alt text on images
- Responsive layout
- No `!important` misuse
- Accessibility tested
- Clean and consistent indentation

---

## Final Tip

> “Write HTML for meaning.
> Style CSS for clarity.
> Test for everyone.”

---
