// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface RequestOtpBody {
  phone: string;
}

export interface RequestOtpResponse {
  data: { expiresAt: string };
}

export interface RegisterCompleteBody {
  phone: string;
  otp: string;
  email: string;
  firstName?: string;
  lastName?: string;
  locale?: string;
  newsletterOptIn?: boolean;
  preferences?: Record<string, unknown>;
  avatarUrl?: string;
}

export interface LoginVerifyBody {
  phone: string;
  otp: string;
}

export interface AuthUser {
  id: number;
  phone: string;
  email: string;
  role: 'customer' | 'store_admin' | 'admin' | 'master_admin';
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  data: {
    accessToken: string;
    tokenType: 'Bearer';
    expiresAt: string;
    user: AuthUser;
  };
}

// ─── Store ────────────────────────────────────────────────────────────────────

export type StoreStatus = 'active' | 'inactive' | 'suspended';

export interface Store {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: StoreStatus;
  supportEmail?: string;
  supportPhone?: string;
  defaultCurrency: string;
  logoUrl?: string;
  bannerUrl?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  settings?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ListStoresParams extends PaginationParams {
  search?: string;
  status?: StoreStatus;
}

export interface NearbyStoresParams {
  latitude: number;
  longitude: number;
  radiusKm?: number;
  limit?: number;
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parentCategoryId?: number;
  iconUrl?: string;
  path: string;
  isActive: boolean;
  createdAt: string;
}

export interface ListCategoriesParams extends PaginationParams {
  search?: string;
  isActive?: boolean;
}

// ─── Brand ────────────────────────────────────────────────────────────────────

export interface Brand {
  id: number;
  name: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  countryOfOrigin?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ListBrandsParams extends PaginationParams {
  search?: string;
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface ProductImages {
  primary?: string;
  thumbnail?: string;
  gallery?: string[];
  swatch?: string | null;
  lookbook?: string | null;
}

export interface Product {
  id: number;
  storeId: number;
  brandId?: number;
  categoryId?: number;
  groupId?: number;
  name: string;
  sku: string;
  description?: string;
  shortDescription?: string;
  priceInCents: number;
  currency: string;
  isActive: boolean;
  availableSizes?: string[];
  availableColors?: string[];
  merchandisingTags?: string[];
  variantAttributes?: Record<string, unknown>;
  images: ProductImages;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ListProductsParams extends PaginationParams {
  storeId?: number;
  search?: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export type CartStatus = 'active' | 'merged' | 'converted' | 'expired';

export interface Cart {
  id: number;
  userId: number;
  storeId: number;
  status: CartStatus;
  currency: string;
  subtotalInCents: number;
  discountTotalInCents: number;
  taxTotalInCents: number;
  shippingTotalInCents: number;
  appliedPromotionIds?: number[];
  promotionSnapshot?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  expiresAt?: string;
  createdAt: string;
}

export interface CreateCartBody {
  userId: number;
  storeId: number;
  currency?: string;
}

export interface UpdateCartBody {
  subtotalInCents?: number;
  discountTotalInCents?: number;
  taxTotalInCents?: number;
  shippingTotalInCents?: number;
  appliedPromotionIds?: number[];
  promotionSnapshot?: Record<string, unknown>;
  status?: CartStatus;
}

export interface ListCartsParams extends PaginationParams {
  userId?: number;
  storeId?: number;
  status?: CartStatus;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'placed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'unpaid' | 'paid' | 'partial' | 'refunded';
export type FulfillmentStatus = 'unfulfilled' | 'partial' | 'fulfilled' | 'returned';

export interface ShippingAddress {
  line1: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  storeId: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  subtotalInCents: number;
  discountTotalInCents: number;
  taxTotalInCents: number;
  shippingTotalInCents: number;
  totalInCents: number;
  currency: string;
  shippingAddress?: ShippingAddress;
  notes?: string;
  placedAt?: string;
  createdAt: string;
}

export interface ListOrdersParams extends PaginationParams {
  userId?: number;
  storeId?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  fulfillmentStatus?: FulfillmentStatus;
  placedAfter?: string;
  placedBefore?: string;
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export interface Wishlist {
  id: number;
  userId: number;
  storeId?: number;
  productIds: number[];
  label?: string;
  isShared: boolean;
  lastSyncedAt?: string;
  createdAt: string;
}

export interface CreateWishlistBody {
  userId: number;
  storeId?: number;
  productIds?: number[];
  label?: string;
  isShared?: boolean;
}

export interface UpdateWishlistBody {
  productIds?: number[];
  label?: string;
  isShared?: boolean;
  lastSyncedAt?: string;
}

export interface ListWishlistsParams extends PaginationParams {
  userId?: number;
  storeId?: number;
  isShared?: boolean;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export type ModerationStatus = 'pending' | 'approved' | 'rejected';

export interface ProductReview {
  id: number;
  productId: number;
  userId: number;
  orderId?: number;
  rating: number;
  title?: string;
  body?: string;
  imageUrls?: string[];
  videoUrl?: string;
  isVerifiedPurchase?: boolean;
  moderationStatus: ModerationStatus;
  isFeatured?: boolean;
  createdAt: string;
}

export interface CreateReviewBody {
  productId: number;
  userId: number;
  orderId?: number;
  rating: number;
  title?: string;
  body?: string;
  imageUrls?: string[];
  videoUrl?: string;
  isVerifiedPurchase?: boolean;
}

export interface ListReviewsParams extends PaginationParams {
  productId?: number;
  userId?: number;
  moderationStatus?: ModerationStatus;
  isFeatured?: boolean;
  rating?: number;
}

// ─── Promotion ────────────────────────────────────────────────────────────────

export type DiscountType = 'percentage' | 'fixed_amount';

export interface PromotionCampaign {
  id: number;
  name: string;
  code?: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  startsAt: string;
  endsAt?: string;
  minOrderSubtotalInCents?: number;
  appliesAutomatically: boolean;
  isStackable: boolean;
  isActive: boolean;
}

export interface ListPromotionsParams extends PaginationParams {
  storeId?: number;
  isActive?: boolean;
  startsBefore?: string;
  endsAfter?: string;
  search?: string;
}

// ─── API Error ────────────────────────────────────────────────────────────────

export interface ApiError {
  status: number;
  message: string;
  issues?: {
    fieldErrors: Record<string, string[]>;
    formErrors: string[];
  };
}
