import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../api/cart';
import { queryKeys } from './queryKeys';
import type { CreateCartBody, UpdateCartBody, ListCartsParams, ApiError } from '../api/types';

export function useCarts(params?: ListCartsParams) {
  return useQuery({
    queryKey: queryKeys.cart.list(params),
    queryFn: () => cartApi.list(params),
    enabled: !!params?.userId,
  });
}

export function useCart(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.cart.detail(id),
    queryFn: () => cartApi.getById(id),
    enabled,
  });
}

export function useCreateCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateCartBody) => cartApi.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useUpdateCart(id: number) {
  const qc = useQueryClient();
  return useMutation<unknown, ApiError, UpdateCartBody>({
    mutationFn: (body) => cartApi.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.detail(id) });
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}
