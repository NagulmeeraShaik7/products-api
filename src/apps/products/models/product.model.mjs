import mongoose from "mongoose";
import {
  COLLECTION_NAMES,
  PRODUCT_FIELDS,
} from "../../../infrasructure/constants/constants.mjs";

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
    [PRODUCT_FIELDS.NAME]: { type: String, required: true },
    [PRODUCT_FIELDS.CATEGORY]: { type: String, required: true },
    [PRODUCT_FIELDS.PRICE]: { type: Number, required: true },
    [PRODUCT_FIELDS.DESCRIPTION]: { type: String },
    [PRODUCT_FIELDS.IMAGE]: { type: String },
  },
  { timestamps: true }
);

/**
 * Mongoose model for the Product collection.
 * @type {mongoose.Model}
 */
export const Product = mongoose.model(COLLECTION_NAMES.PRODUCT, productSchema);
