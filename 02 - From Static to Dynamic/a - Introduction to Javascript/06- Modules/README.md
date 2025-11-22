# Modules & Project Structure – Class Notes

## 1. Why Modules Matter

Modules allow you to split your code into separate, self-contained files. This improves:

- **Maintainability**: Easier to locate, update, and debug features.
- **Reusability**: Shared logic becomes importable across files.
- **Testability**: Smaller units make mocking and isolated testing simpler.
- **Scalability**: Clean structure prevents large projects from becoming messy.

Modern JavaScript uses **ES Modules (ESM)**, which are supported in browsers and Node.js.

---

## 2. ES Modules Basics

### Exporting

There are two main types of exports:

#### **Default Export**

- One allowed per file.
- Imported without curly braces.
- Typically used for the “main thing” a module provides.

#### **Named Exports**

- Zero or many per file.
- Require curly braces when importing.
- Good for utilities or multiple functions.

### Importing

- Imports are **static** (resolved at compile time).
- Must be at the top level (not inside functions or conditions).

---

## 3. Bundlers vs Native ESM

### **Native ESM in Browsers**

- No build step.
- Simpler and great for learning.
- Use `<script type="module">`.
- Drawback: loading many files separately can reduce performance.

### **Bundlers (Vite, Webpack, Parcel, etc.)**

Pros:

- Combine files into optimized bundles.
- Support JSX, TypeScript, Sass, image imports, etc.
- Better caching and faster load times.

Cons:

- Adds a build step and configuration.

Use bundlers when building production apps; use native ESM for prototypes.

---

## 4. Common Project Structure Patterns

### **controllers/**

- Handle user interactions, coordinate between views and services.
- Should not contain business logic.

### **services/**

- Contain business logic, state management, and API calls.
- Reusable across controllers or components.

### **components/**

- UI elements (HTML templates, JS logic, CSS).
- In modern frameworks: reusable encapsulated UI pieces.

### **utils/**

- Small, stateless helper functions.
- No side effects.

### **styles/**

- CSS or preprocessor files.

Organize by **feature** or **layer**, depending on project size.

---

## 5. Tips, Pitfalls & Best Practices

### ✔ **Tips**

- Keep modules small and focused (single responsibility principle).
- Use named exports for flexibility.
- Default exports for primary module responsibilities.
- Group related modules in folders.
- Use index.js files to re-export groups of functions (barrel files).

### **Pitfalls**

- Circular imports (Module A imports B, and B imports A) → avoid by moving shared logic to a utils/service.
- Mixing CommonJS (`require`) and ESM (`import`) can cause errors.
- Forgetting `type="module"` in HTML prevents ESM from working.
- Using relative imports (`../..`) excessively → refactor with clearer structure.

### **Cheatsheet**

#### Exports

```js
export default function () {}
export function helper() {}
export const value = 42;
```

#### Imports

```js
import mainThing from "./file.js";
import { helper, value } from "./file.js";
```

#### HTML

```html
<script type="module" src="app.js"></script>
```
