const assert = require('assert');
const { describe, test, beforeEach, after } = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const api = require('../app');
const User = require('../models/user');
const testHelper = require('./api_test_helper');

const app = supertest(api);

describe('users controller', async () => {
  // MARK: - Setup & Teardown

  beforeEach(async () => {
    await User.deleteMany({});
    const users = testHelper.initialUsers.map((u) => new User(u));
    await Promise.all(users.map((u) => u.save()));
  });
  after(async () => {
    await mongoose.connection.close();
  });

  // MARK: Tests

  test('can fetch all users', async () => {
    const response = await app
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const users = response.body;
    assert.strictEqual(users.length, 2);
  });

  describe('when creating users', async () => {
    test('can create user with username & password if they are at least three characters', async () => {
      const user = {
        username: 'foo',
        name: 'baz',
        password: 'bar',
      };
      const response = await app
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const { username, name } = response.body;
      assert.strictEqual(username, user.username);
      assert.strictEqual(name, user.name);
    });

    test('cannot create user with username less than 3 characters', async () => {
      const user = {
        username: 'fo',
        name: 'baz',
        password: 'bar',
      };
      const response = await app
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      assert.deepStrictEqual(response.body, {
        error: 'username must be at least 3 characters',
      });
    });

    test('cannot create user with password less than 3 characters', async () => {
      const user = {
        username: 'foo',
        name: 'baz',
        password: 'ba',
      };
      const response = await app
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      assert.deepStrictEqual(response.body, {
        error: 'password must be at least 3 characters',
      });
    });
  });
});
