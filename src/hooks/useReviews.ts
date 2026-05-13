import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../api/reviews';
import { queryKeys } from './queryKeys';
import type { CreateReviewBody, ListReviewsParams, ApiError } from '../api/types';

export function useReviews(params?: ListReviewsParams) {
  return useQuery({
    queryKey: queryKeys.reviews.list(params),
    queryFn: () => reviewsApi.list(params),
    enabled: !!params?.productId || !!params?.userId,
  });
}

export function useReview(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.reviews.detail(id),
    queryFn: () => reviewsApi.getById(id),
    enabled,
  });
}

export function useSubmitReview() {
  const qc = useQueryClient();
  return useMutation<unknown, ApiError, CreateReviewBody>({
    mutationFn: reviewsApi.create,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: queryKeys.reviews.list({ productId: vars.productId }) });
    },
  });
}
