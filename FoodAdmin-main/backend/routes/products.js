
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, categoryId, price, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = new Product({ name, categoryId, price, status, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
