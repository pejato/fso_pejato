const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');

// MARK: - Test Data

const testBlogs = [
  new Blog({
    author: 'foo',
    likes: 20,
    title: 'bar',
    url: 'asdklff',
  }),
  new Blog({
    author: 'foo',
    likes: 50,
    title: 'bafr',
    url: 'asdfsadf',
  }),
  new Blog({
    author: 'fooaaa',
    likes: 30,
    title: 'bar',
    url: 'asdf',
  }),
];

// MARK: - Tests

describe('dummy', () => {
  test('returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe('totalLikes', () => {
  test('with no blogs returns 0', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test('with one blog returns its likes', () => {
    const blogs = [testBlogs[0]];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 20);
  });

  test('with multiple blog returns their sum of likes', () => {
    const blogs = testBlogs;
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 100);
  });
});

describe('favoriteBlog', () => {
  test('with no blogs returns null', () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, null);
  });

  test('with a single blog returns that blog', () => {
    const blogs = [testBlogs[0]];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, testBlogs[0]);
  });

  test('with multiple blogs returns the blog with most likes', () => {
    const blogs = testBlogs;
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, testBlogs[1]);
  });
});

describe('mostBlogs', () => {
  test('with no blogs returns null', () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    assert.strictEqual(result, null);
  });

  test('with one blog returns that blogs author and blogs is one', () => {
    const blogs = [testBlogs[1]];
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: 'foo', blogs: 1 });
  });

  test('with multiple blogs returns the blogger with most blogs and the number', () => {
    const blogs = testBlogs;
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: 'foo', blogs: 2 });
  });
});

describe('mostLikes', () => {
  test('with no blogs returns null', () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    assert.strictEqual(result, null);
  });

  test('with one blog returns that blogs author and blogs is one', () => {
    const blogs = [testBlogs[1]];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: 'foo', likes: 50 });
  });

  test('with multiple blogs returns the blogger with most blogs and the number', () => {
    const blogs = testBlogs;
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: 'foo', likes: 70 });
  });
});
