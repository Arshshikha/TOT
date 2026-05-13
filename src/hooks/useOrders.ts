import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '../api/orders';
import { queryKeys } from './queryKeys';
import type { ListOrdersParams } from '../api/types';

export function useOrders(params?: ListOrdersParams) {
  return useQuery({
    queryKey: queryKeys.orders.list(params),
    queryFn: () => ordersApi.list(params),
    enabled: !!params?.userId,
  });
}

export function useOrder(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => ordersApi.getById(id),
    enabled,
  });
}
