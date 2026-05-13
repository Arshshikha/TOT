export const queryKeys = {
  stores: {
    all: ['stores'] as const,
    list: (params?: object) => ['stores', 'list', params] as const,
    nearby: (params: object) => ['stores', 'nearby', params] as const,
    detail: (id: number) => ['stores', id] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: (params?: object) => ['categories', 'list', params] as const,
    detail: (id: number) => ['categories', id] as const,
  },
  brands: {
    all: ['brands'] as const,
    list: (params?: object) => ['brands', 'list', params] as const,
    detail: (id: number) => ['brands', id] as const,
  },
  products: {
    all: ['products'] as const,
    list: (params?: object) => ['products', 'list', params] as const,
    detail: (id: number) => ['products', id] as const,
  },
  cart: {
    all: ['cart'] as const,
    list: (params?: object) => ['cart', 'list', params] as const,
    detail: (id: number) => ['cart', id] as const,
  },
  orders: {
    all: ['orders'] as const,
    list: (params?: object) => ['orders', 'list', params] as const,
    detail: (id: number) => ['orders', id] as const,
  },
  wishlists: {
    all: ['wishlists'] as const,
    list: (params?: object) => ['wishlists', 'list', params] as const,
    detail: (id: number) => ['wishlists', id] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    list: (params?: object) => ['reviews', 'list', params] as const,
    detail: (id: number) => ['reviews', id] as const,
  },
  promotions: {
    all: ['promotions'] as const,
    list: (params?: object) => ['promotions', 'list', params] as const,
    detail: (id: number) => ['promotions', id] as const,
  },
};
