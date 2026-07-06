const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET 
router.get('/', async (req, res) => {
  const users = await User.find().sort({createdAt:-1});
  res.json(users);
});

// POST
router.post('/', async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    const user = new User({ name, email, mobile });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT 
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(user);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;
