// =======================================
// example.js — Timers & Memory Leaks
// =======================================

// SECTION 1 — Basic Timers
// ------------------------

// 1. setTimeout - runs once after a delay
setTimeout(() => {
  console.log("Hello after 2 seconds");
}, 2000);

// 2. setInterval - runs repeatedly
const intervalId = setInterval(() => {
  console.log("Repeating every second");
}, 1000);

// Stop the interval after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Interval cleared");
}, 5000);

// 3. Recursive setTimeout for flexible scheduling
function runTask() {
  console.log("Running task...");
  setTimeout(runTask, 1000); // schedule next run manually
}
// runTask(); // uncomment to test — safer than setInterval

// SECTION 2 — Common Pitfalls
// ---------------------------

// Example: Forgetting to clear an interval (leak)
function startLeakyInterval() {
  const largeArray = new Array(1_000_000).fill("🚀");
  setInterval(() => {
    // This closure keeps largeArray alive forever
    console.log(largeArray[0]);
  }, 1000);
}
// startLeakyInterval(); // DO NOT RUN long-term — memory leak example

// SECTION 3 — Proper Cleanup Patterns
// -----------------------------------

// a) Manual cleanup
function safeInterval() {
  const id = setInterval(() => console.log("tick"), 1000);
  // Stop it after 3 seconds
  setTimeout(() => clearInterval(id), 3000);
}
// safeInterval();

// b) React-style cleanup pattern (pseudo example)
function mockReactComponent() {
  let timerId;
  function onMount() {
    timerId = setInterval(() => console.log("Component running..."), 1000);
  }
  function onUnmount() {
    clearInterval(timerId);
    console.log("Component unmounted and timer cleared");
  }
  onMount();
  setTimeout(onUnmount, 4000);
}
// mockReactComponent();

// SECTION 4 — Event Listeners and Cleanup
// ---------------------------------------

function addResizeListener() {
  const onResize = () => console.log("Resized!");
  window.addEventListener("resize", onResize);

  // Simulate cleanup after some time
  setTimeout(() => {
    window.removeEventListener("resize", onResize);
    console.log("Listener removed");
  }, 5000);
}
// addResizeListener();

// SECTION 5 — Closures and Memory Retention
// -----------------------------------------

function closureLeak() {
  let bigData = new Array(500_000).fill("🧠");
  return function showData() {
    console.log(bigData[0]); // holds reference to bigData
  };
}
const leakyFn = closureLeak();
// Even if bigData is not used again, it's retained through leakyFn

// SECTION 6 — WeakMap Example (auto cleanup by GC)
// ------------------------------------------------
const cache = new WeakMap();
function processUser(user) {
  if (!cache.has(user)) {
    cache.set(user, { data: `Processed for ${user.name}` });
  }
  return cache.get(user);
}

let userObj = { name: "Alice" };
console.log(processUser(userObj)); // { data: 'Processed for Alice' }

// When userObj becomes unreachable, GC can reclaim memory
userObj = null;

// SECTION 7 — Monitoring Memory
// ------------------------------
// In Node.js you can log process memory usage:
function logMemory() {
  const used = process.memoryUsage();
  console.log("Heap used (MB):", (used.heapUsed / 1024 / 1024).toFixed(2));
}
// logMemory();

// SECTION 8 — Avoiding Accidental Globals
// ---------------------------------------

// BAD: Implicit global (no 'let' or 'const')
function badGlobal() {
  leakedVariable = "Oops! Global now.";
  console.log(leakedVariable);
}
// badGlobal();
// console.log(window.leakedVariable); // accessible globally

// GOOD: Scoped variable
function goodScope() {
  const safeVar = "I vanish after function ends";
  console.log(safeVar);
}
// goodScope();

// SECTION 9 — Using requestAnimationFrame for Smooth Timers
// ---------------------------------------------------------
let animationId;
function animate() {
  console.log("Animating frame...");
  animationId = requestAnimationFrame(animate);
}
function stopAnimation() {
  cancelAnimationFrame(animationId);
  console.log("Animation stopped");
}
// animate();
// setTimeout(stopAnimation, 3000);

// SECTION 10 — Debugging Memory Leaks
// -----------------------------------
// Browser DevTools → Memory tab → take heap snapshots.
// Node.js → run with `node --inspect example.js`
// Use `console.memory` or `process.memoryUsage()` to check growth.
