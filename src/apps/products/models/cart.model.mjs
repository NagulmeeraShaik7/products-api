import mongoose from "mongoose";

/**
 * Mongoose schema for the Cart model.
 * @typedef {Object} CartSchema
 * @property {mongoose.Schema.Types.ObjectId} userId - Reference to the User model. Required.
 * @property {Array<Object>} items - Array of items in the cart.
 * @property {mongoose.Schema.Types.ObjectId} items.productId - Reference to the Product model.
 * @property {number} items.quantity - Quantity of the product in the cart. Defaults to 1.
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

/**
 * Mongoose model for the Cart collection.
 * @type {mongoose.Model}
 */
export const Cart = mongoose.model("Cart", cartSchema);