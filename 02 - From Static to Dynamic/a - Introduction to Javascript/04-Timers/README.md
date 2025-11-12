# Session: Timers & Memory Leaks in JavaScript

> “How to schedule code, manage it properly and avoid subtle resource-bugs that degrade apps over time.”

---

## 1. Why This Topic Matters

- Modern web apps (browser + Node) often use timers (`setTimeout`, `setInterval`), async callbacks and long-running tasks.
- Mistakes in managing these lead to memory leaks — objects never freed, resources pinned, app slows or crashes.
- For front-end: a “tab that gets slower over time” often means a leak. For back-end: a process consuming more memory and never releasing it.
- Understanding both **timers** and **memory/leak** interplay gives you power: build performant, stable apps.

---

## 2. JavaScript Timers: What & How

### 2.1 `setTimeout`

- Signature: `let timerId = setTimeout(callback, delay, ...args)`
- Executes **once** after `delay` milliseconds.
- Cancel it: `clearTimeout(timerId)`

**Use-cases:** delayed action, debouncing UI, timeout logic.

### 2.2 `setInterval`

- Signature: `let intervalId = setInterval(callback, delay, ...args)`
- Executes repeatedly every `delay` milliseconds (until cancelled).
- Cancel it: `clearInterval(intervalId)`

**Use-cases:** polling, updates (clock), animations (though `requestAnimationFrame` often better).

### 2.3 Differences & Best Practices

- If you only need a one-off delay → use `setTimeout`, not `setInterval`.
- `setInterval` can lead to drift (callback takes time) or stack up if callback slow.
- Many experts prefer using recursive `setTimeout` for flexible scheduling.
- Always store timer IDs, so you can clear them when needed.

### 2.4 Limitations & gotchas

- JavaScript is single-threaded (in browser main thread) → timers are queued tasks. There's no guarantee **exact timing**.
- Nested timers or many short intervals can tax CPU/GC.
- If callback references large objects or closures, memory can grow.
- In SPAs (Single Page Apps), switching routes/components without clearing timers leads to leaks.

---

## 3. Memory Leaks in JavaScript: Explanation

### 3.1 What is a memory leak?

- In JS, the engine (V8, SpiderMonkey etc.) uses garbage collection (GC). Objects with **no reachable references** are eligible for GC.
- A memory leak occurs when the program unintentionally holds references to objects that are no longer needed → GC cannot free them.
- Over time, these “orphaned but referenced” objects accumulate → increased memory usage, degraded performance, possible crash.

### 3.2 Why they are “silent”.

- Unlike syntax errors, leaks often don’t trigger immediate failure — they gradually slow the app.
- Hard to detect unless you know what to look for (heap snapshots, memory growth charts).

---

## 4. Common Causes of Memory Leaks

Here are patterns you must teach and watch out for:

| Cause                                | Description                                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Un-cleared timers/intervals**      | A `setInterval` or `setTimeout` callback still holds references and isn’t cleared. (Especially when component unmounts).  |
| **Event listeners not removed**      | E.g., `window.addEventListener('resize', handler)` and forgetting to `removeEventListener`. Creates lingering references. |
| **Detached DOM nodes**               | Elements removed from the page still held by JS references or event handlers.                                             |
| **Closures retaining large objects** | A function capturing outer variables keeps those in memory.                                                               |
| **Globals / accidental globals**     | Variables not scoped properly live for entire page life.                                                                  |
| **Large caches without eviction**    | Data structures keep growing indefinitely and never get trimmed.                                                          |
| **Third-party libs with leaks**      | You might inherit leaks via dependencies.                                                                                 |

---

## 5. Timers + Memory Leaks: How They Intersect

This is key for your session: how **timers** lead to leaks.

- A `setInterval` callback references some object (`obj`) in its scope. Even if the object is no longer needed elsewhere, because the timer callback still references it, GC cannot free it.
- If you navigate away from a component but forgot `clearInterval`, you're still running that callback in the background.
- Many timer examples on the web show memory usage slowly increasing until GC kicks in (the “saw-tooth” pattern).
- The longer the timer runtime, the more chance of accumulation of data in its callback or state.
- For long-lived apps (dashboards, SPAs) these timer-based leaks are major sources of performance degradation.

---

## 6. Best Practices & Tips

### 6.1 For Timers

- Always keep a handle:

  ```js
  const id = setInterval(...);
  // then:
  clearInterval(id);
  ```

- In React (or other UI frameworks) clean up on unmount:

  ```js
  useEffect(() => {
    const id = setInterval(...);
    return () => clearInterval(id);
  }, []);
  ```

- Prefer `setTimeout` for flexible scheduling rather than `setInterval`.
- Consider using `requestAnimationFrame` for animations instead of intervals.
- Use `AbortController` / custom cancellation patterns if you need to cancel tasks.

### 6.2 For Preventing Memory Leaks

- Remove event listeners when no longer needed.
- Avoid keeping references to DOM nodes that are removed.
- Use local scope variables (`let`, `const`), avoid accidental globals.
- Avoid capturing huge objects in closures unless needed.
- Use `WeakMap` / `WeakSet` when storing caches keyed by objects, allowing GC.
- Monitor memory during development: take heap snapshots, compare before/after actions.
- In production, use monitoring tools (browser devtools, Node profiling) to track memory growth.

### 6.3 Performance & UX Benefits

- Properly managed timers + memory = smoother UI, less jank, better battery life on mobile.
- Apps that don’t leak memory behave consistently even after hours.
- Less risk of browser crashes or forced refreshes due to high memory.
- Cleaner resource usage implies easier maintenance and scalability.

---

## 7. Pitfalls & Gotchas to Watch Out For

- **Anonymous timers**: If you call `setInterval` without storing the ID, you cannot clear it.
- **Multiple duplicate timers**: Mistakenly schedule same task twice.
- **Unbound callbacks**: Using closures that reference parent context heavily.
- **Assuming GC handles everything**: GC reclaims _unreachable_ objects; it cannot remove objects still referenced.
- **Mistaking saw-tooth memory graph for leak**: Some memory growth is normal until GC runs — problems are when memory grows _over time_ without decreasing.
- **Relying on garbage collector timings**: You cannot force GC in production reliably.
- **Timers in hidden/inactive tabs**: Browsers may throttle timers; interval behavior may change.
- **Timers + SPA navigation**: Component mounts/unmounts repeatedly without cleanup = more and more timers.

---

## 8. Debugging & Detection Techniques

### 8.1 Browser DevTools (Frontend)

- In Chrome → DevTools → **Memory** tab → take **Heap Snapshots**. Look for retained objects, detached DOM nodes.
- In Chrome → **Performance** tab → record timeline while using app → check for increasing memory over time.
- Use `console.profile()` and `console.memory` APIs.
- Browser Task Manager (Shift+Esc in Chrome) shows per-tab memory usage.

### 8.2 Node.js / Server-side

- Use `--inspect` to open Node process in Chrome DevTools, take snapshots.
- Use tools like `heapdump`, `memwatch`.
- Monitor process memory usage (`process.memoryUsage()`) over time.
- Use process manager (PM2) with `max_memory_restart` to auto-restart if memory grows beyond threshold.

### 8.3 What to look for

- Memory usage steadily climbs over time (no plateau)
- Large arrays or objects that should be freed but aren’t
- Detached DOM nodes shown in snapshots
- Timers/intervals still running long after component unmount
- Event listeners bound on elements that are removed

---

## 9. Real-World Examples & Patterns

### Example: Timer without cleanup → leak

```js
function startPolling() {
  const hugeObject = new Array(1000000).fill("x");
  setInterval(() => {
    console.log(hugeObject[0]);
  }, 1000);
}
// Call startPolling() twice → memory grows
```

### Example: React component forgetting cleanup

```jsx
function MyComponent() {
  useEffect(() => {
    const id = setInterval(() => {
      // some periodic task
    }, 1000);
    // ✗ forgetting return cleanup
  }, []);
}
```

### Safe alternative

```jsx
function MyComponent() {
  useEffect(() => {
    const id = setInterval(() => {
      /* ... */
    }, 1000);
    return () => {
      clearInterval(id);
      console.log("Timer cleared");
    };
  }, []);
}
```

### Using `WeakMap` for caches

```js
const cache = new WeakMap();
function process(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, heavyComputation(obj));
  }
  return cache.get(obj);
}
// When `obj` is unreachable elsewhere, it can be GC-ed
```

---

## 10. Summary & Key Take-Aways

- Use `setTimeout` for one-time delays, `setInterval` for repeating but only if you can clear it.
- Always store timer IDs and clear them when they’re no longer needed.
- Memory leaks happen when objects remain reachable even though they should be freed.
- Timers, event listeners, closures, globals — these are main leak sources.
- In SPAs or long-running apps, leaks accumulate slowly but cause big problems later.
- Use browser DevTools, heap snapshots, performance monitoring to detect leaks.
- Adopt best practices: cleanup handlers, avoid accidental globals, prefer weak references for caches.
- Good timer + memory management = smoother UX, stable performance, less debugging pain.

---

## Assignment for This Week

1. Identify all timers (`setTimeout`, `setInterval`) in your project. Ensure each has a corresponding `clear…()` or cleanup logic.
2. Using Chrome DevTools, take heap snapshots of your SPA: after load, after 5 minutes idle, compare counts of detached nodes or uncollected objects.
3. Build a small component that uses a repeating timer and then navigates away without cleanup — record memory growth. Then fix it and compare.
4. Write a short explanation (200 words) of one real-world scenario where you or a team encountered performance degradation because of a timer or leak.
