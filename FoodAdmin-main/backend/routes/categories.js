const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  const cats = await Category.find().sort({createdAt:-1});
  res.json(cats);
});

router.post('/', async (req, res) => {
  try {
    const c = new Category(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) { res.status(400).json({error: err.message}); }
});

router.put('/:id', async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message:'Deleted' });
});

module.exports = router;
