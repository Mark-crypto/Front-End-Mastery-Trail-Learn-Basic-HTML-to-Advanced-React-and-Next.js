// -----------------------------
// 1. Basic Named Exports
// -----------------------------
export const API_URL = "https://api.example.com";
export function add(a, b) {
  return a + b;
}

// -----------------------------
// 2. Exporting Multiple Utilities
// -----------------------------
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// -----------------------------
// 3. Default Export
// -----------------------------
export default class UserService {
  constructor(api = API_URL) {
    this.api = api;
  }

  async fetchUsers() {
    const res = await fetch(`${this.api}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  }
}

// -----------------------------
// 4. Importing Named + Default
// -----------------------------
// import UserService, { API_URL, formatDate } from "./examples.js";
// const service = new UserService();
// console.log(formatDate(Date.now()));

// -----------------------------
// 5. Folder Structure Example
// controllers/userController.js
export function initUserUI(userService) {
  const btn = document.querySelector("#load-users");
  btn.addEventListener("click", async () => {
    const users = await userService.fetchUsers();
    console.log(users);
  });
}

// services/userService.js
export class UserService2 {
  constructor(api) {
    this.api = api;
  }

  async getUser(id) {
    const res = await fetch(`${this.api}/users/${id}`);
    return res.json();
  }
}

// utils/dom.js
export function qs(selector) {
  return document.querySelector(selector);
}

// components/Card.js
export function Card({ title, body }) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h3>${title}</h3><p>${body}</p>`;
  return div;
}

// styles/index.css (ESM doesn't import CSS natively without bundler)
// Using bundler you could: import "../styles/index.css";

// -----------------------------
// 6. Avoiding Circular Imports
// -----------------------------
// utils/math.js
export function square(n) {
  return n * n;
}

// utils/calc.js
// BAD: import { square } from "./calc.js" (circular)
export function computeArea(r) {
  return Math.PI * square(r);
}

// -----------------------------
// 7. Barrel File Example
// utils/index.js (barrel)
export * from "./dom.js";
export * from "./math.js";
export * from "./calc.js";

// Now you can import all utilities from one place:
// import { qs, square, computeArea } from "./utils/index.js";

// -----------------------------
// 8. Dynamic Imports
// -----------------------------
export async function loadAnalytics() {
  const module = await import("./analytics.js");
  module.trackPage();
}

// analytics.js
export function trackPage() {
  console.log("Analytics event sent");
}

// -----------------------------
// 9. Realistic Project Structure Simulation
// project/
//   controllers/
//   services/
//   utils/
//   components/
//   styles/
//   main.js

// main.js
// import { initUserUI } from "./controllers/userController.js";
// import UserService from "./services/userService.js";
// const service = new UserService();
// initUserUI(service);

// -----------------------------
// 10. Common Errors Demonstration
// -----------------------------
// WRONG: export default with multiple values
// export default a; export default b; // ❌ Not allowed

// WRONG: importing named exports that don’t exist
// import { missing } from "./utils.js"; // ❌ undefined

// WRONG: forgot file extension
// import x from "./utils"; // ❌ Browser ESM requires .js extension

// -----------------------------
// END OF EXAMPLES
// -----------------------------
