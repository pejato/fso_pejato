const { test, describe, after, beforeEach } = require('node:test');
const assert = require('assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const testHelper = require('./blogs_test_helper');

const api = supertest(app);

describe('blogs controller', () => {
  // MARK: - Tests

  test('response is in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs in db are returned', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, 2);
  });

  test('blog has id', async () => {
    const response = await api.get(`/api/blogs`);
    const blogIds = response.body.map((b) => b.id);

    for (let i = 0; i < blogIds.length; i += 1) {
      assert(blogIds[i]);
    }
  });

  test('a valid blog can be added', async () => {
    const blog = new Blog({
      author: 'foo',
      title: 'bar',
      url: 'google.com',
      likes: 75,
    });
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const notesInDb = await testHelper.notesInDb();
    assert.strictEqual(notesInDb.length, 3);
  });

  test('adding a blog without likes defaults to zero likes', async () => {
    const blog = {
      author: 'foo',
      title: 'bar',
      url: 'google.com',
    };
    const savedBlog = await api.post('/api/blogs').send(blog).expect(201);
    assert.strictEqual(savedBlog.body.likes, 0);
  });

  test('adding a blog without title returns 400', async () => {
    const blog = {
      author: 'foo',
      url: 'google.com',
    };
    await api.post('/api/blogs').send(blog).expect(400);
  });

  test('adding a blog without url returns 400', async () => {
    const blog = {
      author: 'foo',
      title: 'baz',
    };
    await api.post('/api/blogs').send(blog).expect(400);
  });

  // MARK: - Setup & Teardown

  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogs = testHelper.initialBlogs.map((b) => new Blog(b));
    await Promise.all(blogs.map((b) => b.save()));
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
