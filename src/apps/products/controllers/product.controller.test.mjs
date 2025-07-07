import { ProductController } from './product.controller.mjs';
import { ProductUsecase } from '../usecases/product.usecase.mjs';
import { getPagination } from '../../../utils/pagination.utils.mjs';
import { getSearchQuery } from '../../../utils/search.utils.mjs';
import {
  HTTP_STATUS_CODES,
  PRODUCT_MESSAGES,
} from '../../../infrasructure/constants/constants.mjs';

// Mock dependencies
jest.mock('../usecases/product.usecase.mjs');
jest.mock('../../../utils/pagination.utils.mjs');
jest.mock('../../../utils/search.utils.mjs');

describe('ProductController', () => {
  let productController;
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    productController = new ProductController();
    mockRequest = {
      body: {},
      params: {},
      query: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('addProduct', () => {
    it('should add a new product and return 201 status', async () => {
      const mockProductData = { name: 'Test Product', price: 100 };
      const mockCreatedProduct = { _id: '123', ...mockProductData };
      
      ProductUsecase.prototype.addProduct.mockResolvedValue(mockCreatedProduct);
      mockRequest.body = mockProductData;

      await productController.addProduct(mockRequest, mockResponse, mockNext);

      expect(ProductUsecase.prototype.addProduct).toHaveBeenCalledWith(mockProductData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: PRODUCT_MESSAGES.ADDED,
        product: mockCreatedProduct,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error when addProduct fails', async () => {
      const mockProductData = { name: 'Test Product', price: 100 };
      const mockError = new Error('Add product failed');
      
      ProductUsecase.prototype.addProduct.mockRejectedValue(mockError);
      mockRequest.body = mockProductData;

      await productController.addProduct(mockRequest, mockResponse, mockNext);

      expect(ProductUsecase.prototype.addProduct).toHaveBeenCalledWith(mockProductData);
      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('updateProduct', () => {
    it('should update a product and return 200 status', async () => {
      const mockProductId = '123';
      const mockUpdateData = { name: 'Updated Product', price: 150 };
      const mockUpdatedProduct = { _id: mockProductId, ...mockUpdateData };
      
      ProductUsecase.prototype.updateProduct.mockResolvedValue(mockUpdatedProduct);
      mockRequest.params = { id: mockProductId };
      mockRequest.body = mockUpdateData;

      await productController.updateProduct(mockRequest, mockResponse, mockNext);

      expect(ProductUsecase.prototype.updateProduct).toHaveBeenCalledWith(mockProductId, mockUpdateData);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: PRODUCT_MESSAGES.UPDATED,
        product: mockUpdatedProduct,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error when updateProduct fails', async () => {
      const mockProductId = '123';
      const mockUpdateData = { name: 'Updated Product', price: 150 };
      const mockError = new Error('Update product failed');
      
      ProductUsecase.prototype.updateProduct.mockRejectedValue(mockError);
      mockRequest.params = { id: mockProductId };
      mockRequest.body = mockUpdateData;

      await productController.updateProduct(mockRequest, mockResponse, mockNext);

      expect(ProductUsecase.prototype.updateProduct).toHaveBeenCalledWith(mockProductId, mockUpdateData);
      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return 200 status', async () => {
      const mockProductId = '123';
      
      ProductUsecase.prototype.deleteProduct.mockResolvedValue();
      mockRequest.params = { id: mockProductId };

      await productController.deleteProduct(mockRequest, mockResponse, mockNext);

      expect(ProductUsecase.prototype.deleteProduct).toHaveBeenCalledWith(mockProductId);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: PRODUCT_MESSAGES.DELETED,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error when deleteProduct fails', async () => {
      const mockProductId = '123';
      const mockError = new Error('Delete product failed');
      
      ProductUsecase.prototype.deleteProduct.mockRejectedValue(mockError);
      mockRequest.params = { id: mockProductId };

      await productController.deleteProduct(mockRequest, mockResponse, mockNext);

      expect(ProductUsecase.prototype.deleteProduct).toHaveBeenCalledWith(mockProductId);
      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('getAllProducts', () => {
    it('should retrieve all products with pagination and search query', async () => {
      const mockQuery = { search: 'test' };
      const mockPagination = { page: 1, limit: 10 };
      const mockSearchQuery = { name: { $regex: 'test', $options: 'i' } };
      const mockProducts = [
        { _id: '123', name: 'Test Product', price: 100 },
        { _id: '124', name: 'Test Product 2', price: 150 },
      ];
      
      getPagination.mockReturnValue(mockPagination);
      getSearchQuery.mockReturnValue(mockSearchQuery);
      ProductUsecase.prototype.getAllProducts.mockResolvedValue(mockProducts);
      mockRequest.query = mockQuery;

      await productController.getAllProducts(mockRequest, mockResponse, mockNext);

      expect(getPagination).toHaveBeenCalledWith(mockQuery);
      expect(getSearchQuery).toHaveBeenCalledWith(mockQuery);
      expect(ProductUsecase.prototype.getAllProducts).toHaveBeenCalledWith(
        mockSearchQuery,
        mockPagination.page,
        mockPagination.limit
      );
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error when getAllProducts fails', async () => {
      const mockQuery = { search: 'test' };
      const mockPagination = { page: 1, limit: 10 };
      const mockSearchQuery = { name: { $regex: 'test', $options: 'i' } };
      const mockError = new Error('Get products failed');
      
      getPagination.mockReturnValue(mockPagination);
      getSearchQuery.mockReturnValue(mockSearchQuery);
      ProductUsecase.prototype.getAllProducts.mockRejectedValue(mockError);
      mockRequest.query = mockQuery;

      await productController.getAllProducts(mockRequest, mockResponse, mockNext);

      expect(getPagination).toHaveBeenCalledWith(mockQuery);
      expect(getSearchQuery).toHaveBeenCalledWith(mockQuery);
      expect(ProductUsecase.prototype.getAllProducts).toHaveBeenCalledWith(
        mockSearchQuery,
        mockPagination.page,
        mockPagination.limit
      );
      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });
});