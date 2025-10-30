/**
 * DOM Selectors, Traversal and Manipulation
 * --------------------------------------------------------
 * DEMO USAGE:
 *
 * Create an HTML file with this basic markup:
 *
 * <!DOCTYPE html>
 * <html lang="en">
 * <head>
 *   <meta charset="UTF-8" />
 *   <title>DOM Examples</title>
 *   <style>
 *     body { font-family: Arial, sans-serif; margin: 2rem; }
 *     .highlight { background-color: yellow; }
 *     .card { border: 1px solid #ccc; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; }
 *     .remove { color: red; cursor: pointer; }
 *   </style>
 * </head>
 * <body>
 *   <h1>DOM Examples Demo</h1>
 *
 *   <div id="container">
 *     <p class="intro">Hello <strong>World!</strong></p>
 *     <ul id="list">
 *       <li class="item">Apples</li>
 *       <li class="item">Bananas</li>
 *       <li class="item">Cherries</li>
 *     </ul>
 *     <button id="addBtn">Add Item</button>
 *
 *     <form id="demoForm">
 *       <input name="username" placeholder="Enter name" required />
 *       <button type="submit">Submit</button>
 *     </form>
 *
 *     <template id="cardTemplate">
 *       <div class="card">
 *         <h3></h3>
 *         <p></p>
 *       </div>
 *     </template>
 *   </div>
 *
 *   <script src="examples.js"></script>
 * </body>
 * </html>
 */

// ----------------------------------------------------------
// 1. DOM SELECTORS
// ----------------------------------------------------------

const container = document.getElementById("container");
const intro = document.querySelector(".intro");
const allItems = document.querySelectorAll(".item"); // static NodeList
const liveItems = document.getElementsByClassName("item"); // live HTMLCollection

console.log("Container:", container);
console.log("Intro text:", intro.textContent);
console.log("Static NodeList length:", allItems.length);
console.log("Live HTMLCollection length:", liveItems.length);

// ----------------------------------------------------------
// 2. DOM TRAVERSAL
// ----------------------------------------------------------

const firstItem = document.querySelector(".item");
console.log("Parent element:", firstItem.parentElement);
console.log("Next sibling:", firstItem.nextElementSibling.textContent);
console.log("Previous sibling:", firstItem.previousElementSibling); // null for first
console.log("First child of container:", container.firstElementChild.tagName);
console.log("Closest UL ancestor:", firstItem.closest("ul").id);

// ----------------------------------------------------------
// 3. READING & WRITING CONTENT
// ----------------------------------------------------------

const textExample = document.createElement("div");
textExample.innerHTML = "<b>Bold</b> and <i>Italic</i>";
console.log("innerHTML:", textExample.innerHTML);
console.log("textContent:", textExample.textContent);
console.log("innerText:", textExample.innerText);

// Safe text insertion
const unsafeString = "<img src=x onerror=alert(1)>Hi";
const safe = document.createElement("p");
safe.textContent = unsafeString; // safe against XSS
container.appendChild(safe);

// ----------------------------------------------------------
// 4. ATTRIBUTES, CLASSES & DATASETS
// ----------------------------------------------------------

firstItem.setAttribute("data-id", "123");
console.log("Dataset example:", firstItem.dataset.id);

firstItem.classList.add("highlight");
console.log("Has highlight class?", firstItem.classList.contains("highlight"));
firstItem.classList.toggle("highlight"); // remove it
console.log("After toggle:", firstItem.className);

// ----------------------------------------------------------
// 5. STYLES
// ----------------------------------------------------------

firstItem.style.color = "blue";
firstItem.style.fontWeight = "bold";
console.log("Computed color:", getComputedStyle(firstItem).color);

// ----------------------------------------------------------
// 6. CREATING, INSERTING, AND REMOVING ELEMENTS
// ----------------------------------------------------------

const newLi = document.createElement("li");
newLi.textContent = "Dragonfruit";
newLi.className = "item";
document.getElementById("list").appendChild(newLi); // adds to end
console.log("New item added:", newLi.textContent);

const anotherLi = document.createElement("li");
anotherLi.textContent = "Avocado";
const list = document.getElementById("list");
list.insertBefore(anotherLi, list.firstElementChild); // insert at start

// remove an element
setTimeout(() => {
  anotherLi.remove();
  console.log("Removed Avocado item");
}, 2000);

// ----------------------------------------------------------
// 7. DOCUMENT FRAGMENT (Batch insertion for performance)
// ----------------------------------------------------------

const fruits = ["Grapes", "Mangoes", "Pineapples"];
const frag = document.createDocumentFragment();

for (const fruit of fruits) {
  const li = document.createElement("li");
  li.className = "item";
  li.textContent = fruit;
  frag.appendChild(li);
}
list.appendChild(frag);
console.log("Appended multiple items using DocumentFragment");

// ----------------------------------------------------------
// 8. EVENT HANDLING
// ----------------------------------------------------------

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.className = "item";
  li.textContent = "New Fruit";
  list.appendChild(li);
});

// ----------------------------------------------------------
// 9. EVENT DELEGATION
// ----------------------------------------------------------

list.addEventListener("click", (e) => {
  const clicked = e.target.closest(".item");
  if (!clicked) return;
  clicked.classList.toggle("highlight");
  console.log("Clicked item toggled highlight:", clicked.textContent);
});

// ----------------------------------------------------------
// 10. FORMS & FORM DATA
// ----------------------------------------------------------

const form = document.getElementById("demoForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  for (const [key, value] of data.entries()) {
    console.log(`Form ${key}:`, value);
  }
  form.reset();
});

// ----------------------------------------------------------
// 11. TEMPLATE USAGE
// ----------------------------------------------------------

const cardTemplate = document.getElementById("cardTemplate");
function addCard(title, text) {
  const clone = cardTemplate.content.cloneNode(true);
  const card = clone.querySelector(".card");
  card.querySelector("h3").textContent = title;
  card.querySelector("p").textContent = text;
  container.appendChild(clone);
}

addCard("Template Card", "Created from <template> element");

// ----------------------------------------------------------
// 12. MUTATION OBSERVER
// ----------------------------------------------------------

const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    console.log("Mutation type:", m.type);
    if (m.type === "childList") {
      console.log(
        "Added:",
        m.addedNodes.length,
        "Removed:",
        m.removedNodes.length
      );
    }
  }
});

observer.observe(list, { childList: true });

// ----------------------------------------------------------
// 13. SAFE vs UNSAFE DOM INSERTION
// ----------------------------------------------------------

function safeInsert(text) {
  const div = document.createElement("div");
  div.textContent = text;
  container.appendChild(div);
}

function unsafeInsert(html) {
  const div = document.createElement("div");
  div.innerHTML = html; // DO NOT use with untrusted content
  container.appendChild(div);
}

safeInsert("This is safe text.");
unsafeInsert("<b>Trusted bold text</b>");

// ----------------------------------------------------------
// 14. PERFORMANCE — Batch DOM operations
// ----------------------------------------------------------

function badPerformanceExample() {
  // Triggers layout repeatedly
  for (let i = 0; i < 5; i++) {
    const width = list.offsetWidth; // read
    list.style.width = width + 1 + "px"; // write → forces reflow
  }
}

function goodPerformanceExample() {
  const width = list.offsetWidth; // single read
  list.style.width = width + "px"; // single write
}

// Run once for demo
goodPerformanceExample();

// ----------------------------------------------------------
// 15. CLEANUP (disconnect observer after 10s)
// ----------------------------------------------------------

setTimeout(() => {
  observer.disconnect();
  console.log("MutationObserver disconnected.");
}, 10000);
