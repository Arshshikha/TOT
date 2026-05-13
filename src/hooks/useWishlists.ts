import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistsApi } from '../api/wishlists';
import { queryKeys } from './queryKeys';
import type {
  CreateWishlistBody,
  UpdateWishlistBody,
  ListWishlistsParams,
  ApiError,
} from '../api/types';

export function useWishlists(params?: ListWishlistsParams) {
  return useQuery({
    queryKey: queryKeys.wishlists.list(params),
    queryFn: () => wishlistsApi.list(params),
    enabled: !!params?.userId,
  });
}

export function useWishlist(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.wishlists.detail(id),
    queryFn: () => wishlistsApi.getById(id),
    enabled,
  });
}

export function useCreateWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateWishlistBody) => wishlistsApi.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wishlists.all });
    },
  });
}

export function useUpdateWishlist(id: number) {
  const qc = useQueryClient();
  return useMutation<unknown, ApiError, UpdateWishlistBody>({
    mutationFn: (body) => wishlistsApi.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wishlists.detail(id) });
      qc.invalidateQueries({ queryKey: queryKeys.wishlists.all });
    },
  });
}

export function useDeleteWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => wishlistsApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wishlists.all });
    },
  });
}
