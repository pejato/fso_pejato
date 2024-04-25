import { test, describe, expect } from 'vitest';
import notificationReducer, {
  setNotification,
  removeNotification,
} from './notificationReducer';

describe('notificationReducer', () => {
  describe('/setNotification', () => {
    test('sets message and id', () => {
      const state = notificationReducer(
        { message: null, id: 0 },
        setNotification({ message: 'emergency!', id: 1 }),
      );
      expect(state).toStrictEqual({ message: 'emergency!', id: 1 });
    });
  });

  describe('/removeNotification', () => {
    test('when state id is given id, sets message to null', () => {
      const state = notificationReducer(
        { message: 'emergency!', id: 1 },
        removeNotification(1),
      );
      expect(state.message).toBeNull();
    });
    test('when state id is not given id, does nothing', () => {
      const state = notificationReducer(
        { message: 'emergency!', id: 2 },
        removeNotification(1),
      );
      expect(state).toStrictEqual({ message: 'emergency!', id: 2 });
    });
  });
});
