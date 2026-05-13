import { useQuery } from '@tanstack/react-query';
import { promotionsApi } from '../api/promotions';
import { queryKeys } from './queryKeys';
import type { ListPromotionsParams } from '../api/types';

export function usePromotions(params?: ListPromotionsParams) {
  return useQuery({
    queryKey: queryKeys.promotions.list(params),
    queryFn: () => promotionsApi.list(params),
  });
}

export function usePromotion(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.promotions.detail(id),
    queryFn: () => promotionsApi.getById(id),
    enabled,
  });
}
