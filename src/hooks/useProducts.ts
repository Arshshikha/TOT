import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { queryKeys } from './queryKeys';
import type { ListProductsParams } from '../api/types';

export function useProducts(params?: ListProductsParams) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productsApi.list(params),
  });
}

export function useProduct(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled,
  });
}
