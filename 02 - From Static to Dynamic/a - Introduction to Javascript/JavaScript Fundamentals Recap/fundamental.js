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
