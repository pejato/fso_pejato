const { test, describe, after, beforeEach } = require('node:test');
const assert = require('assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const testHelper = require('./api_test_helper');
const Comment = require('../models/comment');

const api = supertest(app);

describe('when there are blogs in the database', () => {
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
    const blogs = await testHelper.blogsInDb();
    const blogIds = blogs.map((b) => b.id);

    for (let i = 0; i < blogIds.length; i += 1) {
      assert(blogIds[i]);
    }
  });

  test('basic_view returns title, author, likes, and id only', async () => {
    const blogs = await testHelper.blogsInDb();
    const response = await api.get('/api/blogs/basic_view');
    const basicBlogs = response.body.toSorted((a, b) => a.id - b.id);
    const expectedBasicBlogs = blogs
      .map((b) => {
        return { author: b.author, title: b.title, id: b.id, likes: b.likes };
      })
      .toSorted((a, b) => a.id - b.id);
    assert.deepStrictEqual(basicBlogs, expectedBasicBlogs);
  });

  test('blogs can be fetched by id', async () => {
    const blogs = await testHelper.blogsInDb();
    const blogId = blogs[0].id;
    const blogResponse = await api.get(`/api/blogs/${blogId}`);
    assert.deepStrictEqual(blogs[0], blogResponse.body);
  });

  describe('adding a blog', () => {
    test('that is valid returns 201 and the blog', async () => {
      const blog = {
        author: 'foo',
        title: 'bar',
        url: 'google.com',
        likes: 75,
      };
      await api
        .post('/api/blogs')
        .set('Authorization', testHelper.testAuthValue)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const blogsInDb = await testHelper.blogsInDb();
      assert.strictEqual(blogsInDb.length, 3);
    });

    test('without likes defaults to zero likes', async () => {
      const blog = {
        author: 'foo',
        title: 'bar',
        url: 'google.com',
      };
      const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization', testHelper.testAuthValue)
        .send(blog)
        .expect(201);
      assert.strictEqual(savedBlog.body.likes, 0);
    });

    test('without title returns 400', async () => {
      const blog = {
        author: 'foo',
        url: 'google.com',
      };
      await api
        .post('/api/blogs')
        .set('Authorization', testHelper.testAuthValue)
        .send(blog)
        .expect(400);
    });

    test('without url returns 400', async () => {
      const blog = {
        author: 'foo',
        title: 'baz',
      };
      await api
        .post('/api/blogs')
        .set('Authorization', testHelper.testAuthValue)
        .send(blog)
        .expect(400);
    });

    test('without token returns 401', async () => {
      const blog = {
        author: 'foo',
        title: 'baz',
      };
      const response = await api.post('/api/blogs').send(blog).expect(401);
      assert.deepStrictEqual(response.body, { error: 'invalid token' });
    });

    test('with an invalid token returns 401', async () => {
      const blog = {
        author: 'foo',
        title: 'baz',
      };
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `${testHelper.testAuthValue}&`)
        .send(blog)
        .expect(401);
      assert.deepStrictEqual(response.body, { error: 'invalid token' });
    });
  });

  describe('deleting a blog', () => {
    test('returns 204', async () => {
      const blogs = await testHelper.blogsInDb();
      const blogId = blogs[0].id;
      await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', testHelper.testAuthValue)
        .expect(204);
      const blogsWithDeletion = await testHelper.blogsInDb();
      for (let i = 0; i < blogsWithDeletion.length; i += 1) {
        assert.notStrictEqual(blogsWithDeletion[i].id, blogId);
      }
    });
  });

  describe('modifying a blog', () => {
    test('with valid fields returns 200 and the updated blog', async () => {
      const blogs = await testHelper.blogsInDb();
      const blogId = blogs[0].id;
      const update = {
        title: 'Glorious new title',
      };
      const response = await api
        .patch(`/api/blogs/${blogId}`)
        .set('Authorization', testHelper.testAuthValue)
        .send(update)
        .expect(200);

      const updatedBlog = response.body;
      assert.strictEqual(updatedBlog.title, update.title);
      const updatedBlogs = await testHelper.blogsInDb();
      assert.strictEqual(updatedBlogs[0].title, update.title);
    });

    test('with an invalid field returns 400', async () => {
      const blogs = await testHelper.blogsInDb();
      const blogId = blogs[0].id;
      const update = {
        title: 'Glorious new title',
        let_me_add_a_field_pls: 9001,
      };
      await await api
        .patch(`/api/blogs/${blogId}`)
        .set('Authorization', testHelper.testAuthValue)
        .send(update)
        .expect(400);
      const updatedBlogs = await testHelper.blogsInDb();
      assert.deepStrictEqual(updatedBlogs, blogs);
    });
  });

  describe('replacing a blog', () => {
    test('returns a 200 and the updated blog', async () => {
      const blogs = await testHelper.blogsInDb();
      const blogId = blogs[0].id;
      const update = {
        title: 'Glorious new title',
        author: 'mine now',
        url: 'google.com',
        likes: 2000,
      };
      const response = await api
        .put(`/api/blogs/${blogId}`)
        .set('Authorization', testHelper.testAuthValue)
        .send(update)
        .expect(200);

      const updatedBlog = response.body;
      assert.strictEqual(updatedBlog.title, update.title);
      assert.strictEqual(updatedBlog.author, update.author);
      assert.strictEqual(updatedBlog.url, update.url);
      assert.strictEqual(updatedBlog.likes, update.likes);
    });
  });

  describe('blog comments', () => {
    test('can be fetched by blog id', async () => {
      const blogId = testHelper.initialComments[0].blog.toString();
      const response = await api
        .get(`/api/blogs/${blogId}/comments`)
        .set('Authorization', testHelper.testAuthValue)
        .expect(200);
      const comments = response.body;
      assert.strictEqual(comments.length, 1);
      assert.strictEqual(comments[0].text, 'wolf');
    });

    test('can be created', async () => {
      const blogId = testHelper.initialBlogs[1]._id.toString();
      const newComment = {
        text: 'get lost!',
      };
      const response = await api
        .post(`/api/blogs/${blogId}/comments`)
        .set('Authorization', testHelper.testAuthValue)
        .send(newComment)
        .expect(201);

      const comment = response.body;
      assert.strictEqual(comment.text, 'get lost!');
    });

    test('are associated with blogs on creation', async () => {
      const blogId = testHelper.initialBlogs[1]._id.toString();
      const newComment = {
        text: 'see ya!',
      };
      const response = await api
        .post(`/api/blogs/${blogId}/comments`)
        .set('Authorization', testHelper.testAuthValue)
        .send(newComment)
        .expect(201);

      const dbComments = await testHelper.commentsInDb();
      const dbBlogs = await testHelper.blogsInDb();

      const dbBlog = dbBlogs.find((b) => b.id === blogId);
      assert.notStrictEqual(dbBlog, null);

      const newBlogComment = dbBlog.comments.find(
        (c) => c.id === response.body.id,
      );
      assert.notStrictEqual(newBlogComment, null);

      const newDbComment = dbComments.find((c) => c.id === response.body.id);
      assert.deepStrictEqual(
        { text: newDbComment.text, id: newDbComment.id },
        newBlogComment,
      );
      assert.strictEqual(newDbComment.blog.id, dbBlog.id);
    });
  });

  // MARK: - Setup & Teardown

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await Comment.deleteMany({});
    const blogs = testHelper.initialBlogs.map((b) => new Blog(b));
    const users = testHelper.initialUsers.map((u) => new User(u));
    const comments = testHelper.initialComments.map((c) => new Comment(c));
    await Promise.all(blogs.map((b) => b.save()));
    await Promise.all(users.map((u) => u.save()));
    await Promise.all(comments.map((c) => c.save()));
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
