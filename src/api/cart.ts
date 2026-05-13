import { api } from './client';
import type {
  Cart,
  CreateCartBody,
  UpdateCartBody,
  ListCartsParams,
  PaginatedResponse,
} from './types';

export const cartApi = {
  create(body: CreateCartBody) {
    return api.post<{ data: Cart }>('/carts', body);
  },

  getById(id: number) {
    return api.get<{ data: Cart }>(`/carts/${id}`);
  },

  update(id: number, body: UpdateCartBody) {
    return api.put<{ data: Cart }>(`/carts/${id}`, body);
  },

  list(params?: ListCartsParams) {
    return api.get<PaginatedResponse<Cart>>('/carts', params as Record<string, unknown>);
  },
};
