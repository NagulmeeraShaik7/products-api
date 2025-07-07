export class ProductUsecase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async addProduct(data) {
    return await this.productRepository.create(data);
  }

  async updateProduct(id, data) {
    return await this.productRepository.update(id, data);
  }

  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }

  async getAllProducts(filter, page, limit) {
    return await this.productRepository.findAll(filter, page, limit);
  }
}
