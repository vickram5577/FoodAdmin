const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categoryId: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    image: String,

    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
