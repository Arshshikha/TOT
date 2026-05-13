import { api } from './client';
import type {
  ProductReview,
  CreateReviewBody,
  ListReviewsParams,
  PaginatedResponse,
} from './types';

export const reviewsApi = {
  create(body: CreateReviewBody) {
    return api.post<{ data: ProductReview }>('/product-reviews', body);
  },

  list(params?: ListReviewsParams) {
    return api.get<PaginatedResponse<ProductReview>>(
      '/product-reviews',
      params as Record<string, unknown>
    );
  },

  getById(id: number) {
    return api.get<{ data: ProductReview }>(`/product-reviews/${id}`);
  },
};
