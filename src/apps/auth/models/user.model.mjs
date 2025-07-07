import mongoose from "mongoose";
import { ROLES, COLLECTION_NAMES } from "../../../infrasructure/constants/constants.mjs";

/**
 * Mongoose schema for the User model.
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user. Required.
 * @property {string} email - The email address of the user. Required and must be unique.
 * @property {string} password - The password of the user. Required.
 * @property {string} role - The role of the user, either "customer" or "admin". Defaults to "customer".
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES.CUSTOMER, ROLES.ADMIN],
      default: ROLES.CUSTOMER,
    },
  },
  { timestamps: true }
);

/**
 * Mongoose model for the User collection.
 * @type {mongoose.Model}
 */
export const User = mongoose.model(COLLECTION_NAMES.ORDER, userSchema);
