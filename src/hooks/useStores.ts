import { useQuery } from '@tanstack/react-query';
import { storesApi } from '../api/stores';
import { queryKeys } from './queryKeys';
import type { ListStoresParams, NearbyStoresParams } from '../api/types';

export function useStores(params?: ListStoresParams) {
  return useQuery({
    queryKey: queryKeys.stores.list(params),
    queryFn: () => storesApi.list(params),
  });
}

export function useNearbyStores(params: NearbyStoresParams, enabled = true) {
  return useQuery({
    queryKey: queryKeys.stores.nearby(params),
    queryFn: () => storesApi.nearby(params),
    enabled,
  });
}

export function useStore(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.stores.detail(id),
    queryFn: () => storesApi.getById(id),
    enabled,
  });
}
