
/**
 * Use case class for handling product-related business logic.
 */
export class ProductUsecase {
  /**
   * Creates an instance of ProductUsecase.
   * @param {Object} productRepository - The repository for handling product-related database operations.
   */
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Adds a new product.
   * @param {Object} data - The product data to create a new product.
   * @returns {Promise<Object>} The created product document.
   */
  async addProduct(data) {
    return await this.productRepository.create(data);
  }

  /**
   * Updates an existing product by ID.
   * @param {string} id - The ID of the product to update.
   * @param {Object} data - The updated product data.
   * @returns {Promise<Object|null>} The updated product document, or null if not found.
   */
  async updateProduct(id, data) {
    return await this.productRepository.update(id, data);
  }

  /**
   * Deletes a product by ID.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<Object|null>} The deleted product document, or null if not found.
   */
  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }

  /**
   * Retrieves all products with optional filtering and pagination.
   * @param {Object} filter - The query filter for searching products.
   * @param {number} page - The page number for pagination.
   * @param {number} limit - The number of products per page.
   * @returns {Promise<Object>} An object containing the total count, current page, limit, and products.
   */
  async getAllProducts(filter, page, limit) {
    return await this.productRepository.findAll(filter, page, limit);
  }
}