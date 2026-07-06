const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

// POST - Create Order
router.post("/", async (req, res) => {
  try {
    const { userId, items, orderDate } = req.body;

    const builtItems = await Promise.all(
      items.map(async (it) => {
        const prod = await Product.findById(it.productId);
        if (!prod) throw new Error("Product not found: " + it.productId);
        return {
          productId: prod._id,
          quantity: it.quantity,
          price: prod.price,
        };
      })
    );

    const totalAmount = builtItems.reduce(
      (s, i) => s + i.price * i.quantity,
      0
    );

    const order = new Order({
      userId,
      items: builtItems,
      totalAmount,
      orderDate: orderDate || new Date(), // ✅ use frontend date or current date
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("userId")
    .populate("items.productId")
    .sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
