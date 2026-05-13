import { api } from './client';
import type { Brand, ListBrandsParams, PaginatedResponse } from './types';

export const brandsApi = {
  list(params?: ListBrandsParams) {
    return api.get<PaginatedResponse<Brand>>('/brands', params as Record<string, unknown>);
  },

  getById(id: number) {
    return api.get<{ data: Brand }>(`/brands/${id}`);
  },
};
