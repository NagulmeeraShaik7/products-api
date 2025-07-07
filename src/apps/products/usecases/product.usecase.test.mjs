import { ProductUsecase } from './product.usecase.mjs';
import { ProductRepository } from '../repositories/product.repository.mjs';

// Mock the ProductRepository
jest.mock('../repositories/product.repository.mjs');

describe('ProductUsecase', () => {
  let productUsecase;
  let mockProductRepository;

  beforeEach(() => {
    mockProductRepository = new ProductRepository();
    productUsecase = new ProductUsecase(mockProductRepository);
    jest.clearAllMocks();
  });

  describe('addProduct', () => {
    it('should add a new product and return the product document', async () => {
      const mockProductData = { name: 'Test Product', price: 100 };
      const mockCreatedProduct = { _id: '123', ...mockProductData };
      
      mockProductRepository.create.mockResolvedValue(mockCreatedProduct);

      const result = await productUsecase.addProduct(mockProductData);

      expect(mockProductRepository.create).toHaveBeenCalledWith(mockProductData);
      expect(result).toEqual(mockCreatedProduct);
    });

    it('should throw an error if addProduct fails', async () => {
      const mockProductData = { name: 'Test Product', price: 100 };
      const mockError = new Error('Create product failed');
      
      mockProductRepository.create.mockRejectedValue(mockError);

      await expect(productUsecase.addProduct(mockProductData)).rejects.toThrow('Create product failed');
      expect(mockProductRepository.create).toHaveBeenCalledWith(mockProductData);
    });
  });

  describe('updateProduct', () => {
    it('should update a product and return the updated document', async () => {
      const mockProductId = '123';
      const mockUpdateData = { name: 'Updated Product', price: 150 };
      const mockUpdatedProduct = { _id: mockProductId, ...mockUpdateData };
      
      mockProductRepository.update.mockResolvedValue(mockUpdatedProduct);

      const result = await productUsecase.updateProduct(mockProductId, mockUpdateData);

      expect(mockProductRepository.update).toHaveBeenCalledWith(mockProductId, mockUpdateData);
      expect(result).toEqual(mockUpdatedProduct);
    });

    it('should return null if product to update is not found', async () => {
      const mockProductId = '123';
      const mockUpdateData = { name: 'Updated Product', price: 150 };
      
      mockProductRepository.update.mockResolvedValue(null);

      const result = await productUsecase.updateProduct(mockProductId, mockUpdateData);

      expect(mockProductRepository.update).toHaveBeenCalledWith(mockProductId, mockUpdateData);
      expect(result).toBeNull();
    });

    it('should throw an error if updateProduct fails', async () => {
      const mockProductId = '123';
      const mockUpdateData = { name: 'Updated Product', price: 150 };
      const mockError = new Error('Update product failed');
      
      mockProductRepository.update.mockRejectedValue(mockError);

      await expect(productUsecase.updateProduct(mockProductId, mockUpdateData)).rejects.toThrow('Update product failed');
      expect(mockProductRepository.update).toHaveBeenCalledWith(mockProductId, mockUpdateData);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return the deleted document', async () => {
      const mockProductId = '123';
      const mockDeletedProduct = { _id: mockProductId, name: 'Test Product', price: 100 };
      
      mockProductRepository.delete.mockResolvedValue(mockDeletedProduct);

      const result = await productUsecase.deleteProduct(mockProductId);

      expect(mockProductRepository.delete).toHaveBeenCalledWith(mockProductId);
      expect(result).toEqual(mockDeletedProduct);
    });

    it('should return null if product to delete is not found', async () => {
      const mockProductId = '123';
      
      mockProductRepository.delete.mockResolvedValue(null);

      const result = await productUsecase.deleteProduct(mockProductId);

      expect(mockProductRepository.delete).toHaveBeenCalledWith(mockProductId);
      expect(result).toBeNull();
    });

    it('should throw an error if deleteProduct fails', async () => {
      const mockProductId = '123';
      const mockError = new Error('Delete product failed');
      
      mockProductRepository.delete.mockRejectedValue(mockError);

      await expect(productUsecase.deleteProduct(mockProductId)).rejects.toThrow('Delete product failed');
      expect(mockProductRepository.delete).toHaveBeenCalledWith(mockProductId);
    });
  });

  describe('getAllProducts', () => {
    it('should retrieve products with pagination and filter', async () => {
      const mockFilter = { name: { $regex: 'test', $options: 'i' } };
      const mockPage = 2;
      const mockLimit = 10;
      const mockResult = {
        total: 25,
        page: mockPage,
        limit: mockLimit,
        products: [
          { _id: '123', name: 'Test Product', price: 100 },
          { _id: '124', name: 'Test Product 2', price: 150 },
        ],
      };
      
      mockProductRepository.findAll.mockResolvedValue(mockResult);

      const result = await productUsecase.getAllProducts(mockFilter, mockPage, mockLimit);

      expect(mockProductRepository.findAll).toHaveBeenCalledWith(mockFilter, mockPage, mockLimit);
      expect(result).toEqual(mockResult);
    });

    it('should return empty products array if no products match filter', async () => {
      const mockFilter = { name: { $regex: 'test', $options: 'i' } };
      const mockPage = 1;
      const mockLimit = 10;
      const mockResult = {
        total: 0,
        page: mockPage,
        limit: mockLimit,
        products: [],
      };
      
      mockProductRepository.findAll.mockResolvedValue(mockResult);

      const result = await productUsecase.getAllProducts(mockFilter, mockPage, mockLimit);

      expect(mockProductRepository.findAll).toHaveBeenCalledWith(mockFilter, mockPage, mockLimit);
      expect(result).toEqual(mockResult);
    });

    it('should throw an error if getAllProducts fails', async () => {
      const mockFilter = { name: { $regex: 'test', $options: 'i' } };
      const mockPage = 1;
      const mockLimit = 10;
      const mockError = new Error('Get products failed');
      
      mockProductRepository.findAll.mockRejectedValue(mockError);

      await expect(productUsecase.getAllProducts(mockFilter, mockPage, mockLimit)).rejects.toThrow('Get products failed');
      expect(mockProductRepository.findAll).toHaveBeenCalledWith(mockFilter, mockPage, mockLimit);
    });
  });
});