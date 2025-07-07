import { Product } from "../models/product.model.mjs";

export class ProductRepository {
  async create(data) {
    const product = new Product(data);
    return await product.save();
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  async findAll(filter, page, limit) {
    const skip = (page - 1) * limit;
    const products = await Product.find(filter).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);
    return { total, page, limit, products };
  }
}
