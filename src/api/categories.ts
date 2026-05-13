import { api } from './client';
import type { Category, ListCategoriesParams, PaginatedResponse } from './types';

export const categoriesApi = {
  list(params?: ListCategoriesParams) {
    return api.get<PaginatedResponse<Category>>('/categories', params as Record<string, unknown>);
  },

  getById(id: number) {
    return api.get<{ data: Category }>(`/categories/${id}`);
  },
};
