import { ProductRepository } from './product.repository.mjs';
import { Product } from '../models/product.model.mjs';
import mongoose from 'mongoose';

// Mock the Product model
jest.mock('../models/product.model.mjs');

// Set a higher timeout for MongoDB operations
jest.setTimeout(10000);

describe('ProductRepository', () => {
  let productRepository;

  beforeAll(async () => {
    // Ensure MongoDB connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  beforeEach(() => {
    productRepository = new ProductRepository();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Clean up the database
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    // Close the MongoDB connection
    await mongoose.disconnect();
  });

  describe('create', () => {
    it('should create a new product and return the product document', async () => {
      const mockProductData = { name: 'Test Product', price: 100 };
      const mockCreatedProduct = { _id: '123', ...mockProductData };
      
      const mockSave = jest.fn().mockResolvedValue(mockCreatedProduct);
      Product.mockImplementation(() => ({
        save: mockSave,
        ...mockProductData,
      }));

      const result = await productRepository.create(mockProductData);

      expect(Product).toHaveBeenCalledWith(mockProductData);
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(mockCreatedProduct);
    });

    it('should throw an error if product creation fails', async () => {
      const mockProductData = { name: 'Test Product', price: 100 };
      const mockError = new Error('Database error');
      
      const mockSave = jest.fn().mockRejectedValue(mockError);
      Product.mockImplementation(() => ({
        save: mockSave,
        ...mockProductData,
      }));

      await expect(productRepository.create(mockProductData)).rejects.toThrow('Database error');
      expect(Product).toHaveBeenCalledWith(mockProductData);
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a product and return the updated document', async () => {
      const mockProductId = '123';
      const mockUpdateData = { name: 'Updated Product', price: 150 };
      const mockUpdatedProduct = { _id: mockProductId, ...mockUpdateData };
      
      Product.findByIdAndUpdate.mockResolvedValue(mockUpdatedProduct);

      const result = await productRepository.update(mockProductId, mockUpdateData);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(mockProductId, mockUpdateData, { new: true });
      expect(result).toEqual(mockUpdatedProduct);
    });

    it('should return null if product to update is not found', async () => {
      const mockProductId = '123';
      const mockUpdateData = { name: 'Updated Product', price: 150 };
      
      Product.findByIdAndUpdate.mockResolvedValue(null);

      const result = await productRepository.update(mockProductId, mockUpdateData);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(mockProductId, mockUpdateData, { new: true });
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const mockProductId = '123';
      const mockUpdateData = { name: 'Updated Product', price: 150 };
      const mockError = new Error('Database error');
      
      Product.findByIdAndUpdate.mockRejectedValue(mockError);

      await expect(productRepository.update(mockProductId, mockUpdateData)).rejects.toThrow('Database error');
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(mockProductId, mockUpdateData, { new: true });
    });
  });

  describe('delete', () => {
    it('should delete a product and return the deleted document', async () => {
      const mockProductId = '123';
      const mockDeletedProduct = { _id: mockProductId, name: 'Test Product', price: 100 };
      
      Product.findByIdAndDelete.mockResolvedValue(mockDeletedProduct);

      const result = await productRepository.delete(mockProductId);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(mockProductId);
      expect(result).toEqual(mockDeletedProduct);
    });

    it('should return null if product to delete is not found', async () => {
      const mockProductId = '123';
      
      Product.findByIdAndDelete.mockResolvedValue(null);

      const result = await productRepository.delete(mockProductId);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(mockProductId);
      expect(result).toBeNull();
    });

    it('should throw an error if delete fails', async () => {
      const mockProductId = '123';
      const mockError = new Error('Database error');
      
      Product.findByIdAndDelete.mockRejectedValue(mockError);

      await expect(productRepository.delete(mockProductId)).rejects.toThrow('Database error');
      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(mockProductId);
    });
  });

  describe('findAll', () => {
    it('should retrieve products with pagination and filter', async () => {
      const mockFilter = { name: { $regex: 'test', $options: 'i' } };
      const mockPage = 2;
      const mockLimit = 10;
      const mockProducts = [
        { _id: '123', name: 'Test Product', price: 100 },
        { _id: '124', name: 'Test Product 2', price: 150 },
      ];
      const mockTotal = 25;
      const mockSkip = (mockPage - 1) * mockLimit;

      Product.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockProducts),
      });
      Product.countDocuments.mockResolvedValue(mockTotal);

      const result = await productRepository.findAll(mockFilter, mockPage, mockLimit);

      expect(Product.find).toHaveBeenCalledWith(mockFilter);
      expect(Product.find().skip).toHaveBeenCalledWith(mockSkip);
      expect(Product.find().limit).toHaveBeenCalledWith(mockLimit);
      expect(Product.countDocuments).toHaveBeenCalledWith(mockFilter);
      expect(result).toEqual({
        total: mockTotal,
        page: mockPage,
        limit: mockLimit,
        products: mockProducts,
      });
    });

    it('should return empty products array if no products match filter', async () => {
      const mockFilter = { name: { $regex: 'test', $options: 'i' } };
      const mockPage = 1;
      const mockLimit = 10;
      const mockProducts = [];
      const mockTotal = 0;
      const mockSkip = (mockPage - 1) * mockLimit;

      Product.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockProducts),
      });
      Product.countDocuments.mockResolvedValue(mockTotal);

      const result = await productRepository.findAll(mockFilter, mockPage, mockLimit);

      expect(Product.find).toHaveBeenCalledWith(mockFilter);
      expect(Product.find().skip).toHaveBeenCalledWith(mockSkip);
      expect(Product.find().limit).toHaveBeenCalledWith(mockLimit);
      expect(Product.countDocuments).toHaveBeenCalledWith(mockFilter);
      expect(result).toEqual({
        total: mockTotal,
        page: mockPage,
        limit: mockLimit,
        products: mockProducts,
      });
    });

    it('should throw an error if findAll fails', async () => {
      const mockFilter = { name: { $regex: 'test', $options: 'i' } };
      const mockPage = 1;
      const mockLimit = 10;
      const mockError = new Error('Database error');

      Product.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockRejectedValue(mockError),
      });

      await expect(productRepository.findAll(mockFilter, mockPage, mockLimit)).rejects.toThrow('Database error');
      expect(Product.find).toHaveBeenCalledWith(mockFilter);
      expect(Product.find().skip).toHaveBeenCalledWith(0);
      expect(Product.find().limit).toHaveBeenCalledWith(mockLimit);
    });
  });
});