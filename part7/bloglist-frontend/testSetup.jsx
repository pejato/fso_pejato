import { afterEach, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';

afterEach(() => {
  cleanup();
});

const thunkMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };

export const createStore = () => {
  const store = {
    getState: vi.fn(() => ({})),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
  };
  const next = vi.fn();

  const invoke = (action) => thunkMiddleware(store)(next)(action);

  return { store, next, invoke };
};

export const renderWithProviders = (element, options) => {
  const { store = createStore().store, ...renderOptions } = { ...options };
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(element, { wrapper: Wrapper, ...renderOptions }) };
};
