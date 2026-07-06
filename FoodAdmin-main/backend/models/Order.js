const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    orderDate: { type: Date, default: Date.now }, // ✅ new field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
