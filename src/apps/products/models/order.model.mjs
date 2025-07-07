import mongoose from "mongoose";

/**
 * Mongoose schema for the Order model.
 * @typedef {Object} OrderSchema
 * @property {mongoose.Schema.Types.ObjectId} userId - Reference to the User model. Required.
 * @property {Array<Object>} items - Array of items in the order.
 * @property {mongoose.Schema.Types.ObjectId} items.productId - Reference to the Product model.
 * @property {number} items.quantity - Quantity of the product in the order. Required.
 * @property {number} totalAmount - Total amount for the order. Required.
 * @property {string} status - Status of the order, one of "placed", "shipped", or "delivered". Defaults to "placed".
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["placed", "shipped", "delivered"], default: "placed" },
  },
  { timestamps: true }
);

/**
 * Mongoose model for the Order collection.
 * @type {mongoose.Model}
 */
export const Order = mongoose.model("Order", orderSchema);