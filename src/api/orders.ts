import { api } from './client';
import type { Order, ListOrdersParams, PaginatedResponse } from './types';

export const ordersApi = {
  list(params?: ListOrdersParams) {
    return api.get<PaginatedResponse<Order>>('/orders', params as Record<string, unknown>);
  },

  getById(id: number) {
    return api.get<{ data: Order }>(`/orders/${id}`);
  },
};
