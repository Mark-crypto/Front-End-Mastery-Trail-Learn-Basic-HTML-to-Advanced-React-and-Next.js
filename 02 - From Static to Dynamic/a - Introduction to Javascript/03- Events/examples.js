/* ============================================================
   examples.js — JavaScript Event Binding, Propagation, Delegation
   ============================================================ */

/* 
  1. BASIC EVENT BINDING
------------------------------------------------------------ */
const btn = document.querySelector("#clickBtn");

function handleClick(event) {
  console.log("Button clicked!", event.type);
}
btn.addEventListener("click", handleClick);

// Remove the listener after 5 clicks (example of cleanup)
let count = 0;
btn.addEventListener("click", function tempHandler() {
  count++;
  if (count >= 5) {
    btn.removeEventListener("click", handleClick);
    btn.removeEventListener("click", tempHandler);
    console.log("Removed click listeners after 5 clicks.");
  }
});

/* 
  2. INLINE VS ADD-EVENT-LISTENER
------------------------------------------------------------ */
// Inline (HTML): <button onclick="alert('Hi!')">Click me</button>
// Preferred (JS): Using addEventListener for better separation of concerns
document
  .querySelector("#inlineExample")
  .addEventListener("click", () => alert("Preferred: JS listener"));

/* 
  3. EVENT PROPAGATION — CAPTURING & BUBBLING
------------------------------------------------------------ */
const outer = document.querySelector("#outer");
const middle = document.querySelector("#middle");
const inner = document.querySelector("#inner");

function logPhase(phase, id) {
  console.log(`${phase.toUpperCase()} PHASE → ${id}`);
}

// Capturing phase listeners (top → bottom)
outer.addEventListener("click", () => logPhase("capturing", "outer"), true);
middle.addEventListener("click", () => logPhase("capturing", "middle"), true);
inner.addEventListener("click", () => logPhase("capturing", "inner"), true);

// Bubbling phase listeners (bottom → top)
outer.addEventListener("click", () => logPhase("bubbling", "outer"));
middle.addEventListener("click", () => logPhase("bubbling", "middle"));
inner.addEventListener("click", () => logPhase("bubbling", "inner"));

// Click #inner to see order of console logs

/* 
  4. STOPPING PROPAGATION
------------------------------------------------------------ */
const bubbleBox = document.querySelector("#bubbleBox");
const bubbleChild = document.querySelector("#bubbleChild");

bubbleBox.addEventListener("click", () => console.log("Parent clicked"));
bubbleChild.addEventListener("click", (event) => {
  event.stopPropagation(); // prevents parent’s listener
  console.log("Child clicked, propagation stopped.");
});

/* 
  5. PREVENTING DEFAULT BEHAVIOR
------------------------------------------------------------ */
const link = document.querySelector("#myLink");
link.addEventListener("click", (event) => {
  event.preventDefault(); // stops navigation
  console.log("Default action prevented!");
});

/* 
  6. EVENT OBJECT INSIGHTS
------------------------------------------------------------ */
const box = document.querySelector("#eventBox");
box.addEventListener("click", function (event) {
  console.log("Type:", event.type);
  console.log("Target:", event.target);
  console.log("Current Target:", event.currentTarget);
  console.log("This:", this);
});

/* 
  7. EVENT DELEGATION
------------------------------------------------------------ */
// Assume <ul id="list"><li>Item 1</li><li>Item 2</li></ul>
const list = document.querySelector("#list");

list.addEventListener("click", function (event) {
  const target = event.target;

  // Filter: only handle clicks on <li>
  if (target.matches("li")) {
    console.log(`Clicked list item: ${target.textContent}`);
  }
});

// Dynamically adding new items — still works!
const addItemBtn = document.querySelector("#addItem");
addItemBtn.addEventListener("click", () => {
  const newItem = document.createElement("li");
  newItem.textContent = `Item ${list.children.length + 1}`;
  list.appendChild(newItem);
});

/* 
  8. USING closest() FOR SAFER DELEGATION
------------------------------------------------------------ */
const table = document.querySelector("#userTable");

table.addEventListener("click", (event) => {
  const row = event.target.closest("tr");
  if (!row) return; // click outside row
  console.log(`Row clicked for user: ${row.dataset.user}`);
});

/* 
  9. NON-BUBBLING EVENTS (focus, blur, mouseenter, etc.)
------------------------------------------------------------ */
// These events do NOT bubble, so delegation doesn’t work directly
const form = document.querySelector("#loginForm");
form.addEventListener(
  "focus",
  (e) => {
    console.log("Focus detected:", e.target);
  },
  true
); // must use capture phase if you want to "delegate" focus

/* 
  10. ONCE OPTION
------------------------------------------------------------ */
const onceBtn = document.querySelector("#onceBtn");
onceBtn.addEventListener(
  "click",
  () => {
    console.log("This runs only once!");
  },
  { once: true }
);

/* 
  11. PASSIVE EVENT LISTENER (performance)
------------------------------------------------------------ */
// Example: scroll listener that tells the browser we won't call preventDefault()
window.addEventListener(
  "scroll",
  () => {
    // lightweight scroll logic here
    console.log("Scrolling...");
  },
  { passive: true }
);

/* 
  12. CLEANUP ON COMPONENT UNMOUNT / PAGE CHANGE
------------------------------------------------------------ */
function attachTemporaryListener() {
  const tempEl = document.querySelector("#temp");
  const handler = () => console.log("Temp click");
  tempEl.addEventListener("click", handler);

  // simulate cleanup (like React unmount)
  setTimeout(() => {
    tempEl.removeEventListener("click", handler);
    console.log("Cleaned up temp listener");
  }, 5000);
}

/* 
  13. NESTED DELEGATION EXAMPLE (advanced)
------------------------------------------------------------ */
document.body.addEventListener("click", (event) => {
  if (event.target.closest(".delete-btn")) {
    console.log("Delete button clicked");
  } else if (event.target.closest(".edit-btn")) {
    console.log("Edit button clicked");
  }
});
