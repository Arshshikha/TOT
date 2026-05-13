import { api } from './client';
import type { Product, ListProductsParams, PaginatedResponse } from './types';

export const productsApi = {
  list(params?: ListProductsParams) {
    return api.get<PaginatedResponse<Product>>('/products', params as Record<string, unknown>);
  },

  getById(id: number) {
    return api.get<{ data: Product }>(`/products/${id}`);
  },
};
