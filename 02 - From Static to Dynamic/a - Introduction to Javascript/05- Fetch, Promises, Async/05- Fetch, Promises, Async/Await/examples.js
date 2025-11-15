// combined_examples.js

// BASIC FETCH
async function basicFetch() {
  const res = await fetch("https://api.example.com/data");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  console.log("Data:", data);
}

// FETCH WITH ERROR HANDLING
async function fetchWithErrors() {
  try {
    const res = await fetch("https://api.example.com/unknown");
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

// ABORTING A REQUEST
async function fetchWithAbort() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch("https://api.example.com/slow", {
      signal: controller.signal,
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Request was aborted");
    } else {
      console.error("Fetch error:", err);
    }
  } finally {
    clearTimeout(timeout);
  }
}

// PARALLEL FETCHES
async function parallelFetches() {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then((r) => r.json()),
    fetch("/api/posts").then((r) => r.json()),
  ]);

  console.log("Users:", users);
  console.log("Posts:", posts);
}

// SEQUENTIAL VS PARALLEL
async function sequentialTasks() {
  await fetch("/task1");
  await fetch("/task2");
}

async function parallelTasks() {
  await Promise.all([fetch("/task1"), fetch("/task2")]);
}

// CUSTOM PROMISE
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runWait() {
  await wait(1000);
  console.log("Waited 1 second");
}

// PROMISE.ALLSETTLED
async function allSettledExample() {
  const results = await Promise.allSettled([
    Promise.resolve(1),
    Promise.reject("Failed"),
    Promise.resolve(2),
  ]);
  console.log(results);
}

// FETCH BASICS (PROMISE VERSION)
fetch("https://api.example.com/data")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Fetch error:", err));

// FETCH WITH OPTIONS
fetch("https://api.example.com/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John", age: 21 }),
});

// STATUS CHECKING
fetch("https://api.example.com/users")
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// ASYNC AWAIT FETCH
async function getUsers() {
  try {
    const res = await fetch("https://api.example.com/users");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// PARALLEL WITH PROMISE.ALL
async function getParallel() {
  try {
    const [posts, comments] = await Promise.all([
      fetch("https://api.example.com/posts").then((r) => r.json()),
      fetch("https://api.example.com/comments").then((r) => r.json()),
    ]);

    console.log("Posts:", posts);
    console.log("Comments:", comments);
  } catch (err) {
    console.error("Parallel fetch failed:", err);
  }
}

// PROMISE CHAINING
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(1000)
  .then(() => console.log("1 second passed"))
  .then(() => delay(1000))
  .then(() => console.log("2 seconds passed"));

// ERROR HANDLING
fetch("https://api.example.com/product")
  .then((res) => res.json())
  .then((product) => {
    if (!product.inStock) throw new Error("Out of stock");
    return product;
  })
  .catch((err) => console.error("Error:", err));

// ABORTING A FETCH (BASIC)
const controller = new AbortController();
setTimeout(() => controller.abort(), 100);

fetch("https://api.example.com/slow", { signal: controller.signal })
  .then((res) => res.json())
  .catch((err) => console.error("Aborted:", err.name));
