import mongoose from "mongoose";
import {
  COLLECTION_NAMES,
  ORDER_FIELDS,
  ORDER_STATUS,
  PRODUCT_FIELDS,
} from "../../../infrasructure/constants/constants.mjs";

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
    [ORDER_FIELDS.USER_ID]: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_NAMES.USER,
      required: true,
    },
    [ORDER_FIELDS.ITEMS]: [
      {
        [PRODUCT_FIELDS.PRODUCT_ID]: {
          type: mongoose.Schema.Types.ObjectId,
          ref: COLLECTION_NAMES.PRODUCT,
        },
        [PRODUCT_FIELDS.QUANTITY]: {
          type: Number,
          required: true,
        },
      },
    ],
    [ORDER_FIELDS.TOTAL_AMOUNT]: {
      type: Number,
      required: true,
    },
    [ORDER_FIELDS.STATUS]: {
      type: String,
      enum: [
        ORDER_STATUS.PLACED,
        ORDER_STATUS.SHIPPED,
        ORDER_STATUS.DELIVERED,
      ],
      default: ORDER_STATUS.PLACED,
    },
  },
  { timestamps: true }
);

/**
 * Mongoose model for the Order collection.
 * @type {mongoose.Model}
 */
export const Order = mongoose.model(COLLECTION_NAMES.ORDER, orderSchema);
