# DOM: Selectors, Traversal, and Manipulation

## Overview — What is the DOM?

The **Document Object Model (DOM)** is the browser's in-memory tree representation of an HTML (or XML) document. The DOM exposes the document's structure as objects (nodes and elements) which scripts can read and manipulate. Changes you make via JavaScript to the DOM are reflected visually when the browser recalculates layout and repaints.

Key points:

- The DOM is a tree of **Nodes**. The most commonly used nodes are **Element** nodes (e.g. `<div>`, `<p>`), **Text** nodes (text content) and **Comment** nodes.
- `document` is the root entry point to interact with the DOM in web pages.
- DOM APIs are synchronous (they run on the main thread) — heavy DOM work may cause jank.

## Node vs Element vs HTMLElement

- `Node` is the base interface (represents any object in the DOM tree).
- `Element` extends `Node` and adds element-specific properties (attributes, `classList`, etc.).
- `HTMLElement` extends `Element` and represents HTML-specific elements (e.g. `HTMLButtonElement`).

Use `node.nodeType` or `node.nodeName` for low-level checks or `instanceof Element` for type-safe checks.

## Selecting elements — query APIs

There are multiple ways to select elements. Use modern, predictable methods in most cases:

### 1. `document.getElementById(id)`

- Fast and returns a single `HTMLElement` or `null`.
- Use when you need a single element by its `id`.

### 2. `document.getElementsByClassName(className)`

- Returns a **live HTMLCollection** of elements.
- Live collection updates as the DOM changes — can cause surprises in loops.

### 3. `document.getElementsByTagName(tagName)`

- Returns a **live HTMLCollection**.

### 4. `document.querySelector(selector)`

- Returns the **first matching Element** or `null`.
- Accepts any CSS selector; flexible and widely used.

### 5. `document.querySelectorAll(selector)`

- Returns a **static NodeList** of matching elements.
- Use `forEach` or spread `[...]` to convert to an array if needed.

**Recommendation:** Prefer `querySelector`/`querySelectorAll` for flexibility and predictable static NodeList behavior. Use `getElementById` for single-element performance-critical lookups.

## Live vs Static collections

- `HTMLCollection` (from `getElementsBy*`) is **live**: it reflects DOM changes automatically.
- `NodeList` from `querySelectorAll` is **static**: it’s a snapshot at the time of querying.

Live collections can be confusing in loops if you modify the DOM while iterating. Use static NodeLists or convert to an array to avoid unintended behavior.

## Traversal — moving through the DOM tree

Useful properties to move between nodes (prefer the `Element` variants when you want elements only):

- `parentNode` / `parentElement` — parent node/element.
- `children` — **element-only** children (HTMLCollection).
- `childNodes` — all child nodes including text (NodeList-like).
- `firstChild` / `firstElementChild` — first child (node vs element).
- `lastChild` / `lastElementChild` — last child (node vs element).
- `nextSibling` / `nextElementSibling` — next sibling node/element.
- `previousSibling` / `previousElementSibling` — previous sibling node/element.
- `closest(selector)` — traverse upward to find the nearest ancestor matching selector (including self).
- `matches(selector)` — check if element matches a CSS selector.

**When to use `closest`/`matches`:** common in event delegation (see below).

## Manipulation — reading and changing content & attributes

### Text and HTML

- `element.textContent` — gets/sets the text content of the element and its descendants. Fast and safe (does not parse HTML). Use this by default when inserting untrusted text.
- `element.innerText` — gets/sets the rendered text. Causes reflow to compute style and excludes hidden text. Slower; avoid when not needed.
- `element.innerHTML` — gets/sets HTML content. Powerful but can introduce XSS vulnerabilities if used with untrusted data. When using `innerHTML`, **sanitize** input or use `textContent` or DOM APIs to construct nodes.

### Value for form controls

- `input.value`, `textarea.value`, `select.value` — use to read/write form control values.

### Attributes

- `element.getAttribute(name)` / `element.setAttribute(name, value)` / `element.removeAttribute(name)` — generic attribute API.
- `element.id`, `element.src`, `element.href`, etc. — element-specific properties often map to attributes but are more direct.
- `element.dataset` — reads/writes `data-*` attributes as an object, with camelCased keys.

### Classes

- `element.classList` — preferred API for class manipulation. Methods: `add()`, `remove()`, `toggle()`, `contains()`, `replace()`.

### Styles

- `element.style` — inline styles only (direct `CSSStyleDeclaration`).
- To get computed styles use `getComputedStyle(element)`.

## Creating, inserting, moving, and removing elements

- `document.createElement(tagName)` — creates an element node.
- `document.createTextNode(text)` — optional; often `textContent` is easier.
- `parent.appendChild(node)` — append node as last child.
- `parent.insertBefore(newNode, referenceNode)` — insert before reference.
- `element.replaceChild(newNode, oldNode)` — replace child.
- `element.removeChild(child)` — remove a child.
- `element.remove()` — remove element itself (modern API).
- `node.cloneNode(deep)` — clone node; `deep` clones subtree.
- `document.createDocumentFragment()` — powerful technique to batch DOM inserts (avoids multiple reflows).

**Pattern:** build nodes in a DocumentFragment, then append the fragment once.

## Event handling — addEventListener and delegation

- `element.addEventListener(type, listener, options)` — attach event listeners. Use `options` to set `{ capture, passive, once }`.
- `removeEventListener` requires the same listener reference and options.

**Event phases:** capturing → target → bubbling. Default is bubbling (`capture: false`).

### Event Delegation

Instead of adding listeners to many child elements, attach one listener to a common ancestor and check the event's `target` or use `event.target.closest(selector)` to find relevant child. This reduces memory overhead and works for dynamic children.

Example:

```js
container.addEventListener("click", (e) => {
  const btn = e.target.closest(".item-button");
  if (!btn) return;
  // handle button click
});
```

## Forms and input handling

- Use `FormData(formElement)` to easily read form values (works for files and multi-values).
- Validate inputs with the Constraint Validation API (`input.checkValidity()`, `input.setCustomValidity()`), and prefer semantic HTML5 form types and attributes (`required`, `pattern`, `min`, `max`, `type=email`, etc.).
- Debounce input handlers when doing expensive DOM updates or network requests.

## Templates and cloning

Use `<template>` for reusable chunks of HTML. The content of `<template>` is inert; clone its `content` and append into the DOM.

Example:

```html
<template id="card-template">
  <article class="card">
    <h3></h3>
    <p></p>
  </article>
</template>
```

Use `const clone = template.content.cloneNode(true)` then populate and append.

## MutationObserver — reacting to DOM changes

`MutationObserver` lets you observe changes to the DOM (attributes, child list, subtree). Use it sparingly; it’s powerful for building UI tools but can be abused.

Basic usage:

```js
const obs = new MutationObserver((mutations) => {
  for (const m of mutations) {
    // inspect m.type, m.addedNodes, m.removedNodes, m.attributeName
  }
});
obs.observe(root, { childList: true, subtree: true, attributes: true });
```

## Accessibility and semantics

- Manipulating the DOM should preserve semantic HTML and ARIA attributes.
- Use proper tags (`button` instead of clickable `div`) to keep keyboard accessibility and semantics.
- When adding/removing elements, ensure focus management: move focus to newly created interactive elements or to a sensible fallback.

## Security: XSS and safe insertion

- Never `innerHTML` untrusted strings. Prefer `textContent` or building elements directly.
- If you must insert HTML, sanitize it on the server or use a trusted sanitizer library.

## Performance considerations

1. **Minimize layout thrashing:** reading layout properties (like `offsetWidth`, `getComputedStyle`) followed by writes (`style`, `classList`) causes reflow. Batch reads and writes separately.
2. **Use DocumentFragment** when adding many nodes.
3. **Use `requestAnimationFrame`** for visual updates to align with the browser's paint cycle.
4. **Debounce** or **throttle** rapid event handlers (resize, scroll, input).
5. **Prefer classes** over direct inline `style` changes for many updates.
6. **Avoid unnecessary `querySelectorAll`** calls inside loops; cache references.

## NodeList iteration and convenient patterns

- `NodeList.forEach()` is widely supported; for older browsers, convert via `Array.from(nodeList)`.
- Use destructuring and spread when helpful: `const items = [...container.querySelectorAll('.item')]`.

## Modern & useful APIs

- `element.closest(selector)` — bubble up to nearest ancestor matching selector.
- `template` & `DocumentFragment` for efficient DOM creation.
- `classList` for robust class management.
- `dataset` for `data-*` attributes.
- `Element.closest`/`Element.matches` for delegation.

## Common pitfalls and gotchas

- Mixing `innerText` and `textContent` without understanding the difference.
- Mutating a live `HTMLCollection` while iterating it.
- Using `innerHTML` with untrusted content (XSS risk).
- Forgetting to remove event listeners for long-lived components, causing memory leaks.
- Relying on implicit type coercion for attributes (e.g., `element.disabled = 'false'` — any string is truthy; set boolean properties explicitly).

## Cheatsheet — Quick API reference

- Select: `#id` → `getElementById`, `.class` → `getElementsByClassName` / `querySelectorAll`, `div > p` → `querySelectorAll` with selector
- Traverse: `el.parentElement`, `el.children`, `el.firstElementChild`, `el.nextElementSibling`, `el.closest('form')`
- Manipulate: `el.textContent = '...'`, `el.innerHTML = '...'`, `el.setAttribute('role', 'button')`, `el.classList.add('open')`
- Create/insert: `const el = document.createElement('li')`, `frag.appendChild(el)`, `ul.appendChild(frag)`
- Event: `el.addEventListener('click', handler, { once: true })`
