import { assert, describe, test } from 'vitest';
import createBlogFormReducer, {
  clearFields,
  setAuthor,
  setTitle,
  setUrl,
} from './createBlogFormReducer';

describe('createBlogFormReducer', () => {
  test('setTitle sets state.title', () => {
    const state = createBlogFormReducer({}, setTitle('alright'));
    assert.strictEqual(state.title, 'alright');
  });
  test('setAuthor sets state.author', () => {
    const state = createBlogFormReducer({}, setAuthor('jcole'));
    assert.strictEqual(state.author, 'jcole');
  });
  test('setUrl sets state.url', () => {
    const state = createBlogFormReducer({}, setUrl('wikipedia.org'));
    assert.strictEqual(state.url, 'wikipedia.org');
  });
  test('clearFields sets title, author, and url to empty string', () => {
    const state = createBlogFormReducer({}, clearFields);
    assert.deepStrictEqual(state, { title: '', author: '', url: '' });
  });
});
