// ========================================
// Local Component State (Using Closures)
// ========================================

function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    getValue() {
      return count;
    },
  };
}

// Example usage:
// const counter = createCounter();
// counter.increment();
// console.log(counter.getValue());

// ========================================
// Pub/Sub Pattern (EventEmitter-like)
// ========================================

function createPubSub() {
  const events = {};

  return {
    subscribe(event, callback) {
      if (!events[event]) {
        events[event] = [];
      }
      events[event].push(callback);
      return () => this.unsubscribe(event, callback);
    },

    unsubscribe(event, callback) {
      if (!events[event]) return;
      events[event] = events[event].filter((cb) => cb !== callback);
    },

    publish(event, data) {
      if (!events[event]) return;
      events[event].forEach((callback) => callback(data));
    },
  };
}

// Example usage:
// const bus = createPubSub();
// const unsub = bus.subscribe('add', (data) => console.log('received', data));
// bus.publish('add', { value: 10 });
// unsub();

// ========================================
// Minimal Reactive Observable (Observer Pattern)
// ========================================

function createObservable(initialValue) {
  let value = initialValue;
  const observers = new Set();

  return {
    get() {
      return value;
    },

    set(newValue) {
      if (newValue === value) return;
      value = newValue;
      observers.forEach((obs) => obs(value));
    },

    subscribe(observer) {
      observers.add(observer);
      return () => observers.delete(observer);
    },
  };
}

// Example usage:
// const obs = createObservable(0);
// const unsub = obs.subscribe((v) => console.log('new', v));
// obs.set(5);
// unsub();

// ========================================
// Simple Global Store (With Subscribe/Unsubscribe)
// ========================================

function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState() {
      return state;
    },

    setState(update) {
      const nextState = typeof update === "function" ? update(state) : update;
      state = nextState;
      this.notify();
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    notify() {
      listeners.forEach((listener) => listener(state));
    },
  };
}

// Favorites Toggle Example using Store:
// const store = createStore({ favorites: [] });
// store.subscribe((s) => console.log('state updated:', s));
//
// function toggleFavorite(item) {
//   store.setState((prev) => {
//     const exists = prev.favorites.includes(item);
//     return {
//       ...prev,
//       favorites: exists
//         ? prev.favorites.filter((i) => i !== item)
//         : [...prev.favorites, item],
//     };
//   });
// }
//
// toggleFavorite("JS");
// toggleFavorite("React");
// toggleFavorite("JS");

// ========================================
// Simple Event Bus with Namespaced Events
// Demonstrates scalability beyond basic Pub/Sub
// ========================================

function createEventBus() {
  const registry = new Map();

  return {
    on(event, handler) {
      if (!registry.has(event)) {
        registry.set(event, new Set());
      }
      registry.get(event).add(handler);
      return () => registry.get(event).delete(handler);
    },

    emit(event, payload) {
      if (!registry.has(event)) return;
      registry.get(event).forEach((handler) => handler(payload));
    },

    clear(event) {
      if (registry.has(event)) registry.get(event).clear();
    },
  };
}

// Example usage:
// const bus = createEventBus();
// const logger = (x) => console.log("log:", x);
// const off = bus.on("task:completed", logger);
// bus.emit("task:completed", { id: 1 });
// off();

// ========================================
// Reactive List Example (Extending Observable)
// Shows how simple primitives compose into patterns
// ========================================

function createReactiveList(initial = []) {
  let list = [...initial];
  const observers = new Set();

  function notify() {
    observers.forEach((fn) => fn(list));
  }

  return {
    subscribe(fn) {
      observers.add(fn);
      return () => observers.delete(fn);
    },

    add(item) {
      list.push(item);
      notify();
    },

    remove(item) {
      list = list.filter((i) => i !== item);
      notify();
    },

    get() {
      return list;
    },
  };
}

// Example usage:
// const rlist = createReactiveList(["a"]);
// rlist.subscribe((l) => console.log("updated list:", l));
// rlist.add("b");
// rlist.remove("a");
