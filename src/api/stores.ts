import { api } from './client';
import type {
  Store,
  ListStoresParams,
  NearbyStoresParams,
  PaginatedResponse,
} from './types';

export const storesApi = {
  list(params?: ListStoresParams) {
    return api.get<PaginatedResponse<Store>>('/stores', params as Record<string, unknown>);
  },

  nearby(params: NearbyStoresParams) {
    return api.get<PaginatedResponse<Store>>('/stores/nearby', params as unknown as Record<string, unknown>);
  },

  getById(id: number) {
    return api.get<{ data: Store }>(`/stores/${id}`);
  },
};
