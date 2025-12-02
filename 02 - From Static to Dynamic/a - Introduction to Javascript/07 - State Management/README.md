# State Management Patterns (Vanilla JavaScript)

## Overview

This module covers foundational state management patterns using only vanilla JavaScript. These concepts help students understand how modern state management libraries work internally. By learning them without frameworks, students gain a clearer mental model that will transfer naturally into React, Vue, or similar ecosystems.

The objectives of this module are:

- To understand local component state using closures and simple objects
- To learn the Pub/Sub pattern for managing global events
- To implement minimal reactive primitives using the observer pattern
- To understand when introducing a state library becomes necessary
- To build a simple store with subscribe/unsubscribe functionality

---

## Local Component State

Local state refers to data owned and managed within a single component or function. In vanilla JavaScript, this is accomplished through closures or simple object encapsulation.

### Key Concepts

- Encapsulation: local state should not be directly modifiable from the outside
- Controlled updates: state changes should occur through defined functions
- Predictable scope: closures allow functions to remember variables even after execution completes

### Pitfalls

- Mutating internal objects exposes state unintentionally
- Excessive closure nesting makes debugging difficult
- Mixing state logic with DOM manipulation leads to tightly coupled code

### Best Practices

- Keep state private; only expose methods
- Maintain single responsibility per component
- Use pure functions when deriving new values

---

## Pub/Sub Pattern

The Publish/Subscribe pattern allows decoupled parts of an application to communicate through events.

### Key Concepts

- Subscribers register callbacks for certain events
- Publishers trigger events which notify all subscribers
- Useful for simple global communication when state is not shared

### Pitfalls

- Overuse leads to disorganized event flows
- Hard to debug when many components subscribe to the same event
- No built-in state storage; only conveys notifications

### Best Practices

- Use descriptive event names
- Unsubscribe listeners when no longer needed
- Keep event handlers small and predictable

---

## Minimal Reactive Primitives (Observer Pattern)

This pattern introduces observable values that notify observers when they change. It is a foundational pattern behind many UI frameworks.

### Key Concepts

- Observables hold values
- Observers register to be notified of changes
- Updating the observable triggers the observers

### Pitfalls

- Circular updates can be introduced accidentally
- Observers can accumulate if not cleaned up
- Excessive observables lead to uncoordinated state flows

### Best Practices

- Keep observable responsibilities narrow
- Always implement an unsubscribe mechanism
- Avoid direct dependencies between observers

---

## When to Introduce a Library

Understanding at what scale or complexity a library becomes useful is crucial.

### Guidelines for introducing a library

- When state must persist across many components
- When multiple views depend on shared state
- When asynchronous updates become difficult to coordinate manually
- When predictable state transitions are required

### Indicators a library is unnecessary

- Application has minimal global state
- Only a few components need synchronization
- State logic is simple and well-contained

---

## Exercise: Build a Simple Store

Students will implement a small global store with:

- Internal state
- subscribe() and unsubscribe() methods
- setState() to update the value
- notify() method to execute callbacks

This is intentionally minimal so students can clearly understand state flow.

---

## Tips for Working with Vanilla State Management

- Always separate data logic from UI manipulation
- Think in terms of input → update → output
- Avoid creating global variables; use modules or closures
- Document state shape to reduce confusion
- Start small and expand only when necessary

---

## Cheatsheet

### Local State

- Use closures for encapsulation
- Expose getter and setter functions

### Pub/Sub

- pub(event, data)
- sub(event, callback)
- unsub(event, callback)

### Observer Pattern

- createObservable(initialValue)
- observable.get()
- observable.set(value)
- observable.subscribe(fn)
- observable.unsubscribe(fn)

### When to Use a Library

- Shared global state
- Complex updates
- Multiple async operations
- Predictability required
