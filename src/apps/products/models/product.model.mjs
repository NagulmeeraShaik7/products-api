import mongoose from "mongoose";

/**
 * Mongoose schema for the Product model.
 * @typedef {Object} ProductSchema
 * @property {string} name - The name of the product. Required.
 * @property {string} category - The category of the product. Required.
 * @property {number} price - The price of the product. Required.
 * @property {string} [description] - The description of the product. Optional.
 * @property {string} [image] - The URL or path to the product image. Optional.
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

/**
 * Mongoose model for the Product collection.
 * @type {mongoose.Model}
 */
export const Product = mongoose.model("Product", productSchema);