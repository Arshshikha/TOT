import { api } from './client';
import type {
  Wishlist,
  CreateWishlistBody,
  UpdateWishlistBody,
  ListWishlistsParams,
  PaginatedResponse,
} from './types';

export const wishlistsApi = {
  create(body: CreateWishlistBody) {
    return api.post<{ data: Wishlist }>('/wishlists', body);
  },

  getById(id: number) {
    return api.get<{ data: Wishlist }>(`/wishlists/${id}`);
  },

  update(id: number, body: UpdateWishlistBody) {
    return api.put<{ data: Wishlist }>(`/wishlists/${id}`, body);
  },

  list(params?: ListWishlistsParams) {
    return api.get<PaginatedResponse<Wishlist>>('/wishlists', params as Record<string, unknown>);
  },

  delete(id: number) {
    return api.delete<void>(`/wishlists/${id}`);
  },
};
