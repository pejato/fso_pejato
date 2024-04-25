const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    user: 0,
  });
  response.json(users);
});

router.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  if (!username || username.length < 3) {
    return response
      .status(400)
      .json({ error: 'username must be at least 3 characters' });
  }
  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password must be at least 3 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

module.exports = router;
