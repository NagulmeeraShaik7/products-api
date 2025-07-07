import { ProductUsecase } from "../usecases/product.usecase.mjs";
import { ProductRepository } from "../repositories/product.repository.mjs";
import { getPagination } from "../../../utils/pagination.utils.mjs";
import { getSearchQuery } from "../../../utils/search.utils.mjs";

const productUsecase = new ProductUsecase(new ProductRepository());

export class ProductController {
  addProduct = async (req, res, next) => {
    try {
      const product = await productUsecase.addProduct(req.body);
      res.status(201).json({ message: "Product added", product });
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productUsecase.updateProduct(id, req.body);
      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      await productUsecase.deleteProduct(id);
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (req, res, next) => {
    try {
      const { page, limit } = getPagination(req.query);
      const searchQuery = getSearchQuery(req.query);
      const products = await productUsecase.getAllProducts(searchQuery, page, limit);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };
}
