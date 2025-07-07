import { Product } from "../models/product.model.mjs";

/**
 * Repository class for handling product-related database operations.
 */
export class ProductRepository {
  /**
   * Creates a new product in the database.
   * @param {Object} data - The product data to create a new product.
   * @returns {Promise<Object>} The created product document.
   */
  async create(data) {
    const product = new Product(data);
    return await product.save();
  }

  /**
   * Updates an existing product by ID.
   * @param {string} id - The ID of the product to update.
   * @param {Object} data - The updated product data.
   * @returns {Promise<Object|null>} The updated product document, or null if not found.
   */
  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Deletes a product by ID.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<Object|null>} The deleted product document, or null if not found.
   */
  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  /**
   * Retrieves all products with optional filtering and pagination.
   * @param {Object} filter - The query filter for searching products.
   * @param {number} page - The page number for pagination.
   * @param {number} limit - The number of products per page.
   * @returns {Promise<Object>} An object containing the total count, current page, limit, and products.
   */
  async findAll(filter, page, limit) {
    const skip = (page - 1) * limit;
    const products = await Product.find(filter).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);
    return { total, page, limit, products };
  }
}