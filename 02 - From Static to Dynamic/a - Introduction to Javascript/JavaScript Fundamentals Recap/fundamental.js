// 01 - Variable declaration
// You do not need to specify the data type explicitly in JavaScript

let fullName = "John Doe"; // String data type
const age = 30; // Number data type

//var use is highly discouraged in modern JavaScript
var isEmployed = true; // Boolean data type

// 02 - arrow functions

const greet = (yourName) => {
  return "Hello, " + yourName + "!";
};

// Shortened further for single parameter and single return statement
const greetShort = (yourName) => "Hello, " + yourName + "!";
console.log(greet(fullName)); // Output: Hello, John Doe!

// Arrow functions in callbacks
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map((num) => num * num);
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]

// 03 - Template literals

// Multi-line strings
const multiLineString = `This is a string
that spans multiple
lines.`;
console.log(multiLineString);

// String interpolation using template literals
const introduction = `My name is ${fullName} and I am ${age} years old.`;
console.log(introduction); // Output: My name is John Doe and I am 30 years old.

// 04 - Destructuring

// Array destructuring
const rgb = [255, 0, 0];
const [red, green, blue] = rgb;
console.log(`Red: ${red}, Green: ${green}, Blue: ${blue}`); // Output: Red: 255, Green: 0, Blue: 0

// Object destructuring
const person = {
  firstName: "Jane",
  lastName: "Smith",
  age: 25,
};

const { firstName, lastName, age: personAge } = person;
console.log(
  `First Name: ${firstName}, Last Name: ${lastName}, Age: ${personAge}`
); // Output: First Name: Jane, Last Name: Smith, Age: 25

// 05 - Spread and rest operators

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArr = [...arr1, ...arr2];
console.log(combinedArr); // Output: [1, 2, 3, 4, 5, 6]

// Rest operator
const sum = (...numbers) => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};
console.log(sum(1, 2, 3, 4, 5)); // Output: 15

// 06 - Core Iterations and Transformations for Arrays

const fruits = ["apple", "banana", "cherry", "date"];

// forEach - Iterating over an array
fruits.forEach((fruit, index) => {
  console.log(`Fruit at index ${index}: ${fruit}`);
});

// map - Transforming an array
const upperCaseFruits = fruits.map((fruit) => fruit.toUpperCase());
console.log(upperCaseFruits); // Output: ['APPLE', 'BANANA', 'CHERRY', 'DATE']

// filter - Filtering an array
const longNamedFruits = fruits.filter((fruit) => fruit.length > 5);
console.log(longNamedFruits); // Output: ['banana', 'cherry']

// reduce - Reducing an array to a single value
const totalLength = fruits.reduce((acc, fruit) => acc + fruit.length, 0);
console.log(totalLength); // Output: 20

// find and findIndex - Searching in an array
const foundFruit = fruits.find((fruit) => fruit.startsWith("c"));
console.log(foundFruit); // Output: 'cherry'

const foundIndex = fruits.findIndex((fruit) => fruit.startsWith("d"));
console.log(foundIndex); // Output: 3

// 07 - Searhch, Check and Validation Methods

// some - Check if at least one element meets a condition
const hasLongNamedFruit = fruits.some((fruit) => fruit.length > 6);
console.log(hasLongNamedFruit); // Output: false

// every - Check if all elements meet a condition
const allFruitsHaveMoreThanTwoLetters = fruits.every(
  (fruit) => fruit.length > 2
);
console.log(allFruitsHaveMoreThanTwoLetters); // Output: true

//includes - Check if an array includes a specific value
const includesBanana = fruits.includes("banana");
console.log(includesBanana); // Output: true

// 08 - Array construction and copying
const originalArray = [1, 2, 3];

// Using Array.from
const arrayFrom = Array.from(originalArray);
console.log(arrayFrom); // Output: [1, 2, 3]

// Using Array.of
const arrayOf = Array.of(4, 5, 6);
console.log(arrayOf); // Output: [4, 5, 6]

// Using the spread operator
const spreadArray = [...originalArray];
console.log(spreadArray); // Output: [1, 2, 3]

// 09 - Flattening and combining arrays

const nestedArray = [1, [2, [3, 4]], 5];

// Using flat to flatten the array
const flattenedArray = nestedArray.flat(2);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5]

// using flatMap to map and flatten
const words = ["hello world", "foo bar", "baz qux"];
const flattenedWords = words.flatMap((phrase) => phrase.split(" "));
console.log(flattenedWords); // Output: ['hello', 'world', 'foo', 'bar', 'baz', 'qux']

// 10 - Sorting and reordering arrays
const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6];

// Sorting the array in ascending order
const sortedArray = unsortedArray.slice().sort((a, b) => a - b);
console.log(sortedArray); // Output: [1, 1, 2, 3, 4, 5, 6, 9]

// Reversing the array
const reversedArray = unsortedArray.slice().reverse();
console.log(reversedArray); // Output: [6, 2, 9, 5, 1, 4, 1, 3]

// 11 - Slicing and modifying arrays
const modifiableArray = [10, 20, 30, 40, 50];

// Slicing the array
const slicedArray = modifiableArray.slice(1, 4);
console.log(slicedArray); // Output: [20, 30, 40]

// Modifying the array using splice
const splicedArray = modifiableArray.slice();
splicedArray.splice(2, 1, 99); // Remove 1 element at index 2 and add 99
console.log(splicedArray); // Output: [10, 20, 99, 40, 50]

// 12 - Modern ES23 Features for Arrays

const es23Array = [1, 2, 3, 4, 5];
// Using toSorted (ES23)
const toSortedArray = es23Array.toSorted((a, b) => b - a);
console.log(toSortedArray); // Output: [5, 4, 3, 2, 1]
// Using toReversed (ES23)
const toReversedArray = es23Array.toReversed();
console.log(toReversedArray); // Output: [5, 4, 3, 2, 1]
// Using toSpliced (ES23)
const toSplicedArray = es23Array.toSpliced(1, 2, 99, 100);
console.log(toSplicedArray); // Output: [1, 99, 100, 4, 5]
