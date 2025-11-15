# 1. Fetch API — The Modern Way to Make HTTP Requests

The Fetch API provides a clean, Promise-based interface for making network requests.

---

## Core Concepts

### `fetch()` returns a Promise

```js
fetch(url, options?) → Promise<Response>
```

`Response` is **not** the data. You must parse it.

---

### You MUST parse the response manually

```js
const res = await fetch("/api");
const json = await res.json();
```

Fetch provides many parser methods:

- `res.json()` — parse JSON
- `res.text()` — raw text
- `res.blob()` — files (images, pdfs)
- `res.formData()` — form submissions
- `res.arrayBuffer()` — low-level binary

Once you call one parser, you cannot call another (body streams are one-time).

---

## Fetch Does NOT throw on HTTP error

Common mistake:

```js
const res = await fetch("/bad-url");
// No error thrown even for 404 or 500
```

You must check:

```js
if (!res.ok) throw new Error(`HTTP ${res.status}`);
```

`fetch()` only rejects on _network errors_ (offline, DNS failure, blocked request etc.).

---

## CORS Misunderstood

If you get a CORS error, you **cannot fix it from frontend**.
The server MUST allow:

- valid `Access-Control-Allow-Origin`
- valid `Access-Control-Allow-Methods`
- valid `Access-Control-Allow-Headers`

Browsers block CORS errors before JS can catch them. They do NOT appear as normal errors.

---

## Fetch Options

Most-used options:

```js
{
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | ...,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
  credentials: 'include', // send cookies
  signal: AbortController.signal
}
```

---

## Fetch does NOT timeout automatically

If the server hangs, fetch hangs forever unless you cancel it.
Use `AbortController`.

---

# 2. AbortController — Canceling Fetch Requests

Essential for:

- component cleanup
- avoiding memory leaks
- preventing unwanted state updates

```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();
```

When aborted, fetch rejects with error `{ name: 'AbortError' }`.

---

# 3. Promises — The Foundation

Promises represent values that resolve in the future.

---

## Promise States

1. **pending**
2. **fulfilled**
3. **rejected**

---

## Creating a Promise

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});
```

---

## Promise Consumption

```js
p.then((result) => {})
  .catch((error) => {})
  .finally(() => {});
```

---

## Promise Combinators (very important)

### `Promise.all()`

Fails fast — rejects if **any** promise fails.

### `Promise.allSettled()`

Waits for all promises regardless of success/failure.

### `Promise.race()`

Returns first completed promise.

### `Promise.any()`

Returns first _successful_ promise.

---

# 4. async/await — Synchronous Look, Asynchronous Reality

Built on top of Promises.

---

## Rules

### `async` makes a function return a Promise

### `await` pauses execution until Promise resolves

```js
async function loadData() {
  const res = await fetch("/api");
  return res.json();
}
```

---

## Error Handling (always required)

```js
try {
  const result = await fetchData();
} catch (err) {
  console.error(err);
}
```

---

# Common async/await Pitfalls

### 1. Forgetting `await`

```js
const res = fetch("/api"); // wrong
```

### 2. Sequential async tasks by accident

```js
await task1();
await task2(); // slow
```

Instead:

```js
await Promise.all([task1(), task2()]); // fast
```

### 3. Mixing `.then()` and `await`

Bad style:

```js
const data = await fetch("/api").then((r) => r.json());
```

Use one or the other.

### 4. Missing try/catch

Unhandled rejections can crash React.

---

# 5. Performance Considerations

### ✔ Use `Promise.all` for parallel fetches

### ✔ Avoid re-parsing JSON repeatedly

### ✔ Cache repeated API calls when possible

### ✔ Abort slow or unnecessary requests

### ✔ Reduce network chatter by combining requests

---

# 6. Best Practices (Production-Ready)

### ✔ Always check `res.ok`

### ✔ Always wrap awaits in try/catch

### ✔ Use AbortController for cleanup

### ✔ Use async/await consistently instead of mixed styles

### ✔ Validate JSON shape before using it

### ✔ Do not block main thread with expensive synchronous code

---

# 7. Summary Cheat Sheet

| Topic           | Key Insight                                     |
| --------------- | ----------------------------------------------- |
| Fetch           | Must parse response, must check errors manually |
| Promises        | States, chaining, combinators                   |
| async/await     | Cleaner syntax but requires try/catch           |
| AbortController | Cancels fetch requests                          |

---
