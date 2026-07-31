// Extends Jest's `expect` with helpful DOM matchers (toBeInTheDocument, etc.)
import '@testing-library/jest-dom';

// jsdom's localStorage persists across tests within the same file. Since
// CartProvider reads/writes it, clear it before every test so cart state
// from one test never leaks into the next. Guarded because some test files
// (e.g. auth.test.ts) intentionally run in the Node environment, where
// `window` does not exist.
beforeEach(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
  }
});
