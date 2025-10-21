# JavaScript ES6+ Array Methods

JavaScript ES6+ introduced a number of modern array methods that make data handling and transformation easier, cleaner, and more expressive.
Below is an overview of the most important methods every developer should understand when working with arrays.

---

## Core Iteration and Transformation Methods

- **`map()`** – Used to transform each element in an array and return a new array with the transformed values. Ideal for creating new data structures based on existing ones.
- **`filter()`** – Returns a new array containing only the elements that meet a specific condition. Commonly used for searching or narrowing down datasets.
- **`reduce()`** – Reduces all elements of an array into a single output value, often used for sums, totals, or constructing complex objects.
- **`forEach()`** – Executes a function on each array element but does not return a new array. Useful for looping through arrays when you just want to perform side effects such as logging or DOM manipulation.
- **`find()`** and **`findIndex()`** – Used to locate the first element (or its index) that matches a specific condition. Unlike `filter()`, these methods return only the first match.

---

## Search, Check and Validation Methods

- **`some()`** – Checks whether at least one element in the array meets a given condition.
- **`every()`** – Checks whether all elements in the array meet a given condition.
- **`includes()`** – Determines if an array contains a specific value and returns `true` or `false` accordingly.

---

## Array Construction and Copying

- **`Array.from()`** – Converts array-like or iterable objects (such as strings or NodeLists) into real arrays.
- **`Array.of()`** – Creates a new array using the provided arguments.
- **Spread Operator (`...`)** – A convenient syntax to copy arrays, merge them, or expand elements.

---

## Flattening and Combining

- **`flat()`** – Flattens nested arrays into a single-level array. You can specify the depth to control how deep the flattening goes.
- **`flatMap()`** – Combines mapping and flattening into one method, ideal for transforming and flattening data in one step.

---

## Sorting and Reordering

- **`sort()`** – Sorts elements of an array _in place_, modifying the original array. Often used with a compare function for numeric or alphabetical sorting.
- **`reverse()`** – Reverses the order of elements in an array, also modifying the original.

---

## Slicing and Modifying

- **`slice()`** – Returns a portion of the array without modifying the original one. Commonly used to copy or extract parts of an array.
- **`splice()`** – Adds or removes elements directly from the array, modifying it in place.

---

## Modern ES2023+ Additions

- **`toSorted()`**, **`toReversed()`**, and **`toSpliced()`** –
  New immutable versions of the classic methods `sort()`, `reverse()`, and `splice()`.
  These return modified copies instead of altering the original array, making them safer to use in functional programming or React-style state management.
