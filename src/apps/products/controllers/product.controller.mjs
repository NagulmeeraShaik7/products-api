import { ProductUsecase } from "../usecases/product.usecase.mjs";
import { ProductRepository } from "../repositories/product.repository.mjs";
import { getPagination } from "../../../utils/pagination.utils.mjs";
import { getSearchQuery } from "../../../utils/search.utils.mjs";

const productUsecase = new ProductUsecase(new ProductRepository());

/**
 * Controller for handling product-related HTTP requests.
 */
export class ProductController {
  /**
   * Adds a new product.
   * @param {Object} req - The HTTP request object containing product data in req.body.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} Responds with a JSON object containing the created product.
   */
  async addProduct(req, res, next) {
    try {
      const product = await productUsecase.addProduct(req.body);
      res.status(201).json({ message: "Product added", product });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an existing product by ID.
   * @param {Object} req - The HTTP request object containing product ID in req.params and update data in req.body.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} Responds with a JSON object containing the updated product.
   */
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productUsecase.updateProduct(id, req.body);
      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a product by ID.
   * @param {Object} req - The HTTP request object containing product ID in req.params.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} Responds with a JSON object confirming deletion.
   */
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      await productUsecase.deleteProduct(id);
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all products with optional pagination and search query.
   * @param {Object} req - The HTTP request object containing pagination and search parameters in req.query.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} Responds with a JSON object containing the list of products.
   */
  async getAllProducts(req, res, next) {
    try {
      const { page, limit } = getPagination(req.query);
      const searchQuery = getSearchQuery(req.query);
      const products = await productUsecase.getAllProducts(searchQuery, page, limit);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
}