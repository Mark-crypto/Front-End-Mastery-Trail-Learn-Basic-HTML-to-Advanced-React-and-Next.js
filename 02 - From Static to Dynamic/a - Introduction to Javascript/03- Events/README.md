# JavaScript Events — Binding · Propagation · Delegation

## 1. What is an Event?

In JavaScript and the DOM, an _event_ is an action or occurrence detected by the browser—such as a user click, keyboard press, form submission, page load, mouse movement, etc. When such an action occurs, you can respond by _listening_ for the event and executing a handler (callback).
Events form the backbone of interactive web pages.

---

## 2. Event Binding (Listening)

### Inline vs DOM API vs Framework

You can bind event handlers in several ways:

- Inline HTML attribute: `<button onclick="doSomething()">Click me</button>`

  - Downside: mixes markup & logic, harder to maintain.

- DOM API:

  ```js
  const btn = document.querySelector("button");
  btn.addEventListener("click", handler);
  ```

- Framework methods (React, Vue, etc) often wrap this under the hood.

### `addEventListener` basics

- Syntax: `element.addEventListener(type, listener, optionsOrUseCapture)`
- `type`: e.g., `'click'`, `'keydown'`, `'submit'`
- `listener`: a function receiving an Event object
- `optionsOrUseCapture`: can be a boolean (true = capture) or an object (`{ capture: true, once: true, passive: true }`)
- Example:

  ```js
  btn.addEventListener("click", function (event) {
    console.log("Button clicked!", event);
  });
  ```

### Removing listeners / memory concerns

- You may remove a listener with `element.removeEventListener(type, listener, options)`.
- If you attach many listeners (especially dynamically created elements) and forget to remove them you risk memory leaks or unintended behaviors.
- Using delegation (see later) helps reduce the number of attached listeners.

---

## 3. Event Propagation

When an event occurs in the DOM, it doesn’t just fire on the target element—it _propagates_ through the DOM tree. There are three phases:

### Phases: Capturing → Target → Bubbling

- **Capturing phase** (also “capture”): The event starts at the top of the document (e.g., `window` → `document` → `<html>` → `<body>` …) and travels _down_ toward the target element.
- **Target phase**: The event reaches the target element.
- **Bubbling phase** (default): The event then bubbles _up_ from the target back through its ancestors (parent → grandparent → … → `document` → `window`).

In practice:

1. If you attach a listener with `{capture: true}`, it runs in the capture phase.
2. If you attach a listener with the default (or `{capture: false}`) it runs during or after the target phase, in the bubbling phase.

### `event.target`, `event.currentTarget`, `this`

- `event.target`: the element on which the event originally occurred (the deepest node in the event path).
- `event.currentTarget`: the element to which the event handler is attached (the element whose listener is currently executing).
- `this` inside the listener (if using non-arrow function) is also the `currentTarget`.

### Methods to intervene

- `event.stopPropagation()`: prevents further propagation (bubbling or capturing) of the event. Use when you don’t want ancestors to respond.
- `event.stopImmediatePropagation()`: stops other listeners of the same event on the same element _and_ further propagation.
- `event.preventDefault()`: prevents the default browser action associated with the event (e.g., link navigation, form submission). Note: this doesn’t stop propagation by itself.

---

## 4. Event Delegation

### Why use it?

When you have many similar child elements (for example a list of buttons, table cells, dynamically added items), rather than adding a separate listener to each one, you can attach one listener to a parent container. That parent listens for events bubbling from children, then you check `event.target` (or related) to decide which child was interacted with. This is **event delegation**.

Benefits

- Fewer event listeners = less memory overhead, cleaner code.
- Works automatically for future dynamically added children (you don’t need to attach new listeners).
- Centralized event logic = easier to maintain.

### How it works (leveraging propagation)

Steps

1. Identify a parent container that contains the dynamic children.
2. Attach a listener on the parent:

   ```js
   parent.addEventListener("click", function (event) {
     const clicked = event.target;
     if (clicked.matches(".child-selector")) {
       // handle it
     }
   });
   ```

3. Inside your handler, determine **which** child triggered the event, often via `event.target` or climbing the DOM tree via `event.target.closest()`.
4. Optionally stop propagation or default behavior if needed.

### Use-cases & dynamic content

- Lists where items are added/removed dynamically (e.g., todo list, chat messages).
- Tables with many cells, grids.
- UI components where you want to intercept many similar child events in one place.

### When **not** to use delegation

- If the event type does _not_ bubble (some events do **not** bubble).
- If the parent is very far up the DOM and many irrelevant events will trigger the listener (causing performance issues). Then filtering becomes critical.

---

## 5. Cheat Sheets

### Quick Reference: Phases

| Phase     | Order                           | Listener option                                 |
| --------- | ------------------------------- | ----------------------------------------------- |
| Capturing | Top → … → Target                | `addEventListener(type, fn, { capture: true })` |
| Target    | The event at the target element | n/a                                             |
| Bubbling  | Target → … → Top                | Default `addEventListener(type, fn)`            |

### Event Object properties

- `event.type` → name of the event (e.g., `'click'`)
- `event.target` → original hit element
- `event.currentTarget` → element whose handler is running
- `event.bubbles` → boolean, whether the event bubbles (some don’t)
- `event.cancelable` → boolean, whether default action can be prevented
- `event.defaultPrevented` → boolean, whether `preventDefault()` has been called

### Delegation pattern steps

1. Attach listener to parent container.
2. Inside handler: check `event.target` or `event.target.matches(selector)` / `closest()` to ensure it’s one of the child elements of interest.
3. Handle accordingly.
4. Optional: use `event.stopPropagation()` or `preventDefault()` if you want to limit onward propagation or default action.

---

## 6. Common Pitfalls & Gotchas

- **Assuming all events bubble**: Some events do _not_ bubble (e.g., `focus`, `blur`, `mouseenter`, `mouseleave`, `scroll`). Delegation won’t work for them.
- **Attaching many listeners unnecessarily**: This can degrade performance, especially in long-living apps, and cause memory leaks.
- **Wrong target filtering** in delegation: If you don’t correctly check `event.target` or use `closest()`, you might respond to unintended elements (e.g., child of child).
- **StopPropagation misuse**: Using `event.stopPropagation()` indiscriminately can break third-party analytics or parent logic that expects to listen for events.
- **Confusion between `event.target` and `event.currentTarget`**: Overlooking this leads to bugs—`target` is where the event _started_, `currentTarget` is where the listener is placed.
- **Ordering issues**: If you set a listener with capture true and another with default (bubbling) you may get unexpected order.
- **Dynamic removal of elements**: If you remove child elements but had bound listeners to each, you must unbind them — or rely on delegation to avoid this burden.

---

## 7. Best Practices

- Prefer using `addEventListener` over inline handlers for separation of concerns.
- Use delegation where many similar child elements exist or when children are dynamic.
- Only attach listeners when necessary and remove them when not needed (especially for one-time UI flows).
- Use `once: true` option (in `addEventListener({ once: true })`) for handlers that should run only once.
- Clearly document when you are using capturing versus bubbling—especially if you use `{ capture: true }`.
- Filter in delegation handlers thoughtfully (`event.target.matches()`, `closest()`) to avoid false positives.
- Avoid mixing complex propagation logic if you don’t need to: simpler is better.
- Use `preventDefault()` for default browser behavior suppression (e.g., form submit, link click) and `stopPropagation()` only when necessary and after thinking through side-effects.
- Test with dynamically added/removed elements to ensure delegation logic covers them.

---

## 8. Summary

Mastering event binding, propagation, and delegation gives you strong control over interactive UI in JavaScript. You’ll write cleaner, more efficient code when you:

- Bind event listeners in the right place with the right options.
- Understand how events travel in the DOM (capturing → target → bubbling).
- Leverage delegation to manage many child elements with a single parent listener.
- Avoid common pitfalls around propagation, non-bubbling events, and performance.

With these foundations, your frontend code becomes more scalable and maintainable. Happy coding!

---

> _“When you add an event listener for a certain event, the name of the event listener is added to a list… So the event listener is just an ordinary object, and the “listening” methods are just ordinary methods that get called by other code at the appropriate time.”_

---
