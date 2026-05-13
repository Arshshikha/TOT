import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '../api/categories';
import { queryKeys } from './queryKeys';
import type { ListCategoriesParams } from '../api/types';

export function useCategories(params?: ListCategoriesParams) {
  return useQuery({
    queryKey: queryKeys.categories.list(params),
    queryFn: () => categoriesApi.list(params),
  });
}

export function useCategory(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => categoriesApi.getById(id),
    enabled,
  });
}
