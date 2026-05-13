import { api } from './client';
import type { PromotionCampaign, ListPromotionsParams, PaginatedResponse } from './types';

export const promotionsApi = {
  list(params?: ListPromotionsParams) {
    return api.get<PaginatedResponse<PromotionCampaign>>(
      '/promotion-campaigns',
      params as Record<string, unknown>
    );
  },

  getById(id: number) {
    return api.get<{ data: PromotionCampaign }>(`/promotion-campaigns/${id}`);
  },
};
