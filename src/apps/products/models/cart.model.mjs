import mongoose from "mongoose";
import {
  COLLECTION_NAMES,
  CART_FIELDS,
  PRODUCT_FIELDS,
  USER_FIELDS,
} from "../../../infrasructure/constants/constants.mjs";

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
    [CART_FIELDS.USER_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_NAMES.USER,
      required: true,
    },
    [CART_FIELDS.ITEMS]: [
      {
        [PRODUCT_FIELDS.PRODUCT_ID]: {
          type: mongoose.Schema.Types.ObjectId,
          ref: COLLECTION_NAMES.PRODUCT,
        },
        [PRODUCT_FIELDS.QUANTITY]: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

/**
 * Mongoose model for the Cart collection.
 * @type {mongoose.Model}
 */
export const Cart = mongoose.model(COLLECTION_NAMES.CART, cartSchema);
