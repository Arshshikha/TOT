import { useQuery } from '@tanstack/react-query';
import { brandsApi } from '../api/brands';
import { queryKeys } from './queryKeys';
import type { ListBrandsParams } from '../api/types';

export function useBrands(params?: ListBrandsParams) {
  return useQuery({
    queryKey: queryKeys.brands.list(params),
    queryFn: () => brandsApi.list(params),
  });
}

export function useBrand(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.brands.detail(id),
    queryFn: () => brandsApi.getById(id),
    enabled,
  });
}
