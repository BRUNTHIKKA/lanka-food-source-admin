import api from '@/lib/api';
import { Product, CreateProductDTO, UpdateProductDTO, Category } from '@/types/product';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  },

  createProduct: async (data: CreateProductDTO): Promise<Product> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: UpdateProductDTO): Promise<Product> => {
    const response = await api.patch(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
