# Customer App — API Integration Guide

**Audience:** Frontend / mobile developers building the end-user (shopper) experience.  
**Base URL:** `https://<your-api-host>/api`  
**Protocol:** HTTPS — all requests and responses are JSON.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Authentication Overview](#2-authentication-overview)
3. [Registration Flow](#3-registration-flow)
4. [Login Flow](#4-login-flow)
5. [Token Management](#5-token-management)
6. [Request Format](#6-request-format)
7. [Response Format](#7-response-format)
8. [Error Handling](#8-error-handling)
9. [Rate Limits](#9-rate-limits)
10. [Browsing the Catalog](#10-browsing-the-catalog)
    - [Stores](#101-stores)
    - [Categories](#102-categories)
    - [Brands](#103-brands)
    - [Product Groups](#104-product-groups)
    - [Products](#105-products)
11. [Shopping Cart](#11-shopping-cart)
12. [Orders](#12-orders)
13. [Wishlists](#13-wishlists)
14. [Product Reviews](#14-product-reviews)
15. [User Profile](#15-user-profile)
16. [Assets (Images)](#16-assets-images)
17. [Promotion Campaigns](#17-promotion-campaigns)
18. [Pagination](#18-pagination)
19. [TypeScript API Client](#19-typescript-api-client)
20. [End-to-End Flows](#20-end-to-end-flows)

---

## 1. Quick Start

### Health Check

Before integrating, you can verify the API is reachable:

```
GET /health
```

**Response `200`:** `{ "status": "ok" }` — no authentication required.

### Prerequisites

- HTTPS support on your client
- Ability to store a short-lived JWT token (memory or secure storage — never `localStorage` on web)
- Phone number in international format (e.g. `+14155552671`)

### Minimal "Hello World" Flow

```
1. POST /api/auth/customer/register/request-otp   → sends OTP to phone
2. POST /api/auth/customer/register/complete       → returns accessToken
3. GET  /api/products?limit=10                     → browse products (with Bearer token)
```

---

## 2. Authentication Overview

The API uses **JWT Bearer tokens** (HS256). Every protected endpoint expects:

```
Authorization: Bearer <accessToken>
```

Tokens expire in **15 minutes** by default (configurable server-side via `JWT_ACCESS_TOKEN_TTL_SECONDS`). When a token expires you will receive `401 Unauthorized` — re-authenticate by running the login flow again.

There is **no refresh token** endpoint — the OTP login flow is intentionally lightweight to re-obtain a token.

---

## 3. Registration Flow

New users register in two steps:

### Step 1 — Request OTP

```
POST /api/auth/customer/register/request-otp
```

**Body:**

```json
{
  "phone": "+14155552671"
}
```

**Field rules:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `phone` | string | Yes | International format; 8–15 digits after the optional `+`; first digit must be 1–9; e.g. `+14155552671` |

**Success `200`:**

```json
{
  "data": {
    "expiresAt": "2025-01-01T12:05:00.000Z"
  }
}
```

The OTP is sent to the phone number out-of-band (SMS / WhatsApp — configured server-side). The OTP is valid for **5 minutes** and limited to **5 attempts**.

> Rate limit: 5 requests per 5-minute window per IP.

---

### Step 2 — Complete Registration

```
POST /api/auth/customer/register/complete
```

**Body:**

```json
{
  "phone": "+14155552671",
  "otp": "382910",
  "email": "user@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "locale": "en-US",
  "newsletterOptIn": false,
  "preferences": {},
  "avatarUrl": "https://cdn.example.com/avatars/jane.jpg"
}
```

**Field rules:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `phone` | string | Yes | Same as Step 1 |
| `otp` | string | Yes | Exactly 6 digits |
| `email` | string | Yes | Valid email address |
| `firstName` | string | No | 1–120 chars |
| `lastName` | string | No | 1–120 chars |
| `locale` | string | No | Max 16 chars, e.g. `"en-US"` |
| `newsletterOptIn` | boolean | No | Default `false`; accepts `"true"`/`"false"` strings too |
| `preferences` | object | No | Free-form JSON |
| `avatarUrl` | string | No | Valid URL |

**Success `200`:**

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5...",
    "tokenType": "Bearer",
    "expiresAt": "2025-01-01T12:15:00.000Z",
    "user": {
      "id": 42,
      "phone": "+14155552671",
      "email": "user@example.com",
      "role": "customer",
      "firstName": "Jane",
      "lastName": "Doe"
    }
  }
}
```

Store `accessToken` and `expiresAt` securely. Attach the token to all subsequent requests.

---

## 4. Login Flow

Returning users authenticate using the same OTP mechanism.

### Step 1 — Request OTP

```
POST /api/auth/customer/login/request-otp
```

**Body:**

```json
{
  "phone": "+14155552671"
}
```

**Success `200`:**

```json
{
  "data": {
    "expiresAt": "2025-01-01T12:05:00.000Z"
  }
}
```

> Rate limit: 5 requests per 5-minute window per IP.

---

### Step 2 — Verify OTP

```
POST /api/auth/customer/login/verify
```

**Body:**

```json
{
  "phone": "+14155552671",
  "otp": "382910"
}
```

**Success `200`:**

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5...",
    "tokenType": "Bearer",
    "expiresAt": "2025-01-01T12:15:00.000Z",
    "user": {
      "id": 42,
      "phone": "+14155552671",
      "email": "user@example.com",
      "role": "customer"
    }
  }
}
```

> Rate limit: 10 requests per hour per IP.

---

## 5. Token Management

### Token Lifetime

| Parameter | Default | Notes |
|-----------|---------|-------|
| Expiry | 15 minutes | Controlled by `JWT_ACCESS_TOKEN_TTL_SECONDS` on server |
| Algorithm | HS256 | — |
| Header | `Authorization: Bearer <token>` | Required on every protected request |

### Detecting Expiry

Watch for `401` responses. When received:
1. Clear the stored token.
2. Prompt the user to log in again (OTP flow).
3. Retry the original request with the new token.

### Token Payload (for reference only — do not rely on decoding client-side)

```json
{
  "sub": 42,
  "role": "customer",
  "iat": 1700000000,
  "exp": 1700000900
}
```

---

## 6. Request Format

All request bodies must be JSON:

```
Content-Type: application/json
Authorization: Bearer <accessToken>
```

Query parameters are plain URL-encoded strings.

---

## 7. Response Format

### Single Resource

```json
{
  "data": { ...resource }
}
```

### List / Collection

```json
{
  "data": [ ...resources ],
  "total": 143,
  "limit": 25,
  "offset": 0
}
```

### Dates

All timestamps are ISO 8601 strings in UTC, e.g. `"2025-01-01T12:00:00.000Z"`.

### Monetary Values

All monetary amounts are **integers in the smallest currency unit** (cents for USD). Never perform floating-point arithmetic on prices — always work in cents server-side and format for display client-side.

```
priceInCents: 4999  →  display as "$49.99"
```

---

## 8. Error Handling

### HTTP Status Codes

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `201` | Created |
| `204` | No Content (successful delete) |
| `400` | Bad request |
| `401` | Unauthenticated — token missing or invalid |
| `403` | Forbidden — insufficient role |
| `404` | Resource not found |
| `409` | Conflict (e.g. phone already registered) |
| `422` | Validation error — see body for details |
| `429` | Rate limit exceeded |
| `500` | Server error |

### Generic Error Body

```json
{
  "message": "Human-readable description"
}
```

### Validation Error Body (`422`)

```json
{
  "message": "Validation failed",
  "issues": {
    "fieldErrors": {
      "phone": ["Invalid phone format"]
    },
    "formErrors": []
  }
}
```

Always check `issues.fieldErrors` to surface per-field messages to the user.

---

## 9. Rate Limits

| Endpoint | Window | Max Requests |
|----------|--------|-------------|
| `POST /auth/*/request-otp` | 5 minutes | 5 |
| `POST /auth/customer/login/verify` | 1 hour | 10 |

Exceeded limits return `429 Too Many Requests`. The response includes standard rate-limit headers:

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1700001200
```

---

## 10. Browsing the Catalog

All catalog endpoints require authentication (`Authorization: Bearer <token>`).

### 10.1 Stores

#### List Stores

```
GET /api/stores?limit=25&offset=0&search=&status=
```

| Query Param | Type | Default | Description |
|-------------|------|---------|-------------|
| `search` | string | — | Full-text search on name |
| `status` | string | — | Filter by status (e.g. `active`) |
| `limit` | integer | 25 | Max 100 |
| `offset` | integer | 0 | — |

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Acme Store",
      "slug": "acme-store",
      "description": "...",
      "status": "active",
      "supportEmail": "help@acme.com",
      "supportPhone": "+14155550001",
      "defaultCurrency": "USD",
      "logoUrl": "https://cdn.example.com/logo.png",
      "bannerUrl": "https://cdn.example.com/banner.png",
      "latitude": 37.7749,
      "longitude": -122.4194,
      "timezone": "America/Los_Angeles",
      "settings": {},
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-06-01T00:00:00.000Z"
    }
  ],
  "total": 12,
  "limit": 25,
  "offset": 0
}
```

#### Find Nearby Stores

```
GET /api/stores/nearby?latitude=37.7749&longitude=-122.4194&radiusKm=5&limit=20
```

| Query Param | Type | Required | Description |
|-------------|------|----------|-------------|
| `latitude` | number | Yes | -90 to 90 |
| `longitude` | number | Yes | -180 to 180 |
| `radiusKm` | number | No (default 5) | Search radius in kilometers |
| `limit` | integer | No (default 20) | — |

#### Get Store by ID

```
GET /api/stores/:id
```

**Response:** Single store object wrapped in `{ "data": {...} }`.

---

### 10.2 Categories

#### List Categories

```
GET /api/categories?limit=50&offset=0&search=&isActive=true
```

| Query Param | Type | Default | Description |
|-------------|------|---------|-------------|
| `search` | string | — | Full-text search on name |
| `isActive` | boolean | — | Filter by active status |
| `limit` | integer | 50 | Max 200 |
| `offset` | integer | 0 | — |

**Response:**

```json
{
  "data": [
    {
      "id": 3,
      "name": "Running Shoes",
      "slug": "running-shoes",
      "description": "...",
      "parentCategoryId": 1,
      "iconUrl": "https://cdn.example.com/icons/running.svg",
      "path": "/footwear/running-shoes",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 8,
  "limit": 50,
  "offset": 0
}
```

Categories are **hierarchical** — use `parentCategoryId` to build a tree client-side.

#### Get Category by ID

```
GET /api/categories/:id
```

---

### 10.3 Brands

#### List Brands

```
GET /api/brands?limit=25&offset=0&search=
```

**Response:**

```json
{
  "data": [
    {
      "id": 5,
      "name": "NovaBrand",
      "description": "...",
      "websiteUrl": "https://novabrand.com",
      "logoUrl": "https://cdn.example.com/brands/nova.png",
      "countryOfOrigin": "US",
      "metadata": {},
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 3,
  "limit": 25,
  "offset": 0
}
```

#### Get Brand by ID

```
GET /api/brands/:id
```

---

### 10.4 Product Groups

Product groups are curated collections (bundles, featured sets).

#### List Product Groups

```
GET /api/product-groups?storeId=1&isActive=true&limit=25&offset=0&search=
```

| Query Param | Type | Default | Description |
|-------------|------|---------|-------------|
| `storeId` | integer | — | Filter by store |
| `isActive` | boolean | — | Filter by active status |
| `search` | string | — | Search on name |
| `limit` | integer | 25 | Max 100 |
| `offset` | integer | 0 | — |

#### Get Product Group by ID

```
GET /api/product-groups/:id
```

---

### 10.5 Products

#### List Products

```
GET /api/products?storeId=1&limit=25&offset=0&search=
```

| Query Param | Type | Default | Description |
|-------------|------|---------|-------------|
| `storeId` | integer | — | Filter by store |
| `search` | string | — | Full-text search on name/SKU |
| `limit` | integer | 25 | Max 100 |
| `offset` | integer | 0 | — |

**Response:**

```json
{
  "data": [
    {
      "id": 101,
      "storeId": 1,
      "brandId": 5,
      "categoryId": 3,
      "groupId": 7,
      "name": "Nova Runner Pro",
      "sku": "NVR-PRO-001",
      "description": "High-performance running shoe...",
      "shortDescription": "Lightweight, breathable.",
      "priceInCents": 14999,
      "currency": "USD",
      "isActive": true,
      "availableSizes": ["US7", "US8", "US9", "US10"],
      "availableColors": ["Midnight Black", "Arctic White"],
      "merchandisingTags": ["new-arrival", "bestseller"],
      "variantAttributes": {},
      "images": {
        "primary": "https://cdn.example.com/products/nvr-pro-001-primary.jpg",
        "thumbnail": "https://cdn.example.com/products/nvr-pro-001-thumb.jpg",
        "gallery": [
          "https://cdn.example.com/products/nvr-pro-001-2.jpg"
        ],
        "swatch": null,
        "lookbook": null
      },
      "metadata": {},
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-06-01T00:00:00.000Z"
    }
  ],
  "total": 48,
  "limit": 25,
  "offset": 0
}
```

#### Get Product by ID

```
GET /api/products/:id
```

---

## 11. Shopping Cart

### Create Cart

```
POST /api/carts
```

**Body:**

```json
{
  "userId": 42,
  "storeId": 1,
  "currency": "USD"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | integer | Yes | Authenticated user's ID |
| `storeId` | integer | Yes | Store the cart belongs to |
| `currency` | string | No (default `USD`) | ISO 4217 currency code |
| `status` | string | No | `active`, `merged`, `converted`, `expired` |
| `expiresAt` | string | No | ISO 8601 datetime |
| `subtotalInCents` | integer | No | Calculated subtotal |
| `discountTotalInCents` | integer | No | Total discounts applied |
| `taxTotalInCents` | integer | No | Taxes |
| `shippingTotalInCents` | integer | No | Shipping cost |
| `appliedPromotionIds` | integer[] | No | IDs of applied promotions |
| `promotionSnapshot` | object | No | Snapshot of promotion details at time of apply |
| `metadata` | object | No | Free-form JSON |

**Response `200`:**

```json
{
  "data": {
    "id": 201,
    "userId": 42,
    "storeId": 1,
    "status": "active",
    "currency": "USD",
    "subtotalInCents": 0,
    "discountTotalInCents": 0,
    "taxTotalInCents": 0,
    "shippingTotalInCents": 0,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

### Get Cart by ID

```
GET /api/carts/:id
```

### Update Cart

```
PUT /api/carts/:id
```

Send only the fields you want to change:

```json
{
  "subtotalInCents": 14999,
  "appliedPromotionIds": [3]
}
```

### List Carts

```
GET /api/carts?userId=42&storeId=1&status=active&limit=25&offset=0
```

| Query Param | Type | Description |
|-------------|------|-------------|
| `userId` | integer | Filter by user |
| `storeId` | integer | Filter by store |
| `status` | string | `active`, `merged`, `converted`, `expired` |

> **Note:** Cart item management (add/remove individual line items) is handled via cart updates with the full `cartItems` array — consult the store admin guide or backend team for line-item endpoints.

---

## 12. Orders

### List My Orders

```
GET /api/orders?userId=42&storeId=1&status=placed&limit=25&offset=0
```

| Query Param | Type | Description |
|-------------|------|-------------|
| `userId` | integer | Filter by user |
| `storeId` | integer | Filter by store |
| `status` | string | `pending`, `placed`, `processing`, `shipped`, `delivered`, `cancelled`, `refunded` |
| `paymentStatus` | string | `unpaid`, `paid`, `partial`, `refunded` |
| `fulfillmentStatus` | string | `unfulfilled`, `partial`, `fulfilled`, `returned` |
| `placedAfter` | string | ISO 8601 datetime lower bound |
| `placedBefore` | string | ISO 8601 datetime upper bound |
| `limit` | integer | Default 25 |
| `offset` | integer | Default 0 |

**Response:**

```json
{
  "data": [
    {
      "id": 500,
      "orderNumber": "ORD-20250101-0001",
      "userId": 42,
      "storeId": 1,
      "status": "placed",
      "paymentStatus": "paid",
      "fulfillmentStatus": "unfulfilled",
      "subtotalInCents": 14999,
      "discountTotalInCents": 0,
      "taxTotalInCents": 1200,
      "shippingTotalInCents": 599,
      "totalInCents": 16798,
      "currency": "USD",
      "shippingAddress": {
        "line1": "123 Main St",
        "city": "San Francisco",
        "state": "CA",
        "postalCode": "94102",
        "country": "US"
      },
      "notes": null,
      "placedAt": "2025-01-01T12:30:00.000Z",
      "createdAt": "2025-01-01T12:30:00.000Z"
    }
  ],
  "total": 7,
  "limit": 25,
  "offset": 0
}
```

### Get Order by ID

```
GET /api/orders/:id
```

---

## 13. Wishlists

### Create Wishlist

```
POST /api/wishlists
```

**Body:**

```json
{
  "userId": 42,
  "storeId": 1,
  "productIds": [101, 102],
  "label": "Gift Ideas",
  "isShared": false
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | integer | Yes | Owner user |
| `storeId` | integer | No | Scope to a specific store |
| `productIds` | integer[] | No | Initial product list |
| `label` | string | No | Display name for the list |
| `isShared` | boolean | No | Whether list is publicly shareable |

### Get Wishlist

```
GET /api/wishlists/:id
```

### Update Wishlist (add/remove products, rename, toggle sharing)

```
PUT /api/wishlists/:id
```

```json
{
  "productIds": [101, 102, 105],
  "label": "Updated List",
  "isShared": true,
  "lastSyncedAt": "2025-01-01T13:00:00.000Z"
}
```

### List Wishlists

```
GET /api/wishlists?userId=42&storeId=1&isShared=false&limit=25&offset=0
```

### Delete Wishlist

```
DELETE /api/wishlists/:id
```

Returns `204 No Content`.

---

## 14. Product Reviews

### Submit a Review

```
POST /api/product-reviews
```

**Body:**

```json
{
  "productId": 101,
  "userId": 42,
  "orderId": 500,
  "rating": 5,
  "title": "Excellent running shoe!",
  "body": "I've been using these for 3 months...",
  "imageUrls": [
    "https://cdn.example.com/reviews/img1.jpg"
  ],
  "videoUrl": null,
  "isVerifiedPurchase": true
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `productId` | integer | Yes | Must exist |
| `userId` | integer | Yes | Authenticated user |
| `orderId` | integer | No | Links to a purchase |
| `rating` | integer | Yes | 1–5 |
| `title` | string | No | 1–255 chars |
| `body` | string | No | Max 10,000 chars |
| `imageUrls` | string[] | No | Array of valid URLs |
| `videoUrl` | string | No | Valid URL |
| `isVerifiedPurchase` | boolean | No | — |

Reviews start with `moderationStatus: "pending"` and are published once approved by a store admin.

> **Note:** OTP delivery (SMS) is currently a stub at the application level — the actual SMS gateway integration must be wired into `src/app/services/notifications.ts` by your platform team before going live.

### List Reviews for a Product

```
GET /api/product-reviews?productId=101&moderationStatus=approved&rating=5&limit=25&offset=0
```

| Query Param | Type | Description |
|-------------|------|-------------|
| `productId` | integer | Filter by product |
| `userId` | integer | Filter by reviewer |
| `moderationStatus` | string | `pending`, `approved`, `rejected` |
| `isFeatured` | boolean | Show only featured reviews |
| `rating` | integer | Filter by exact star rating (1-5) |

### Get Review by ID

```
GET /api/product-reviews/:id
```

---

## 15. User Profile

### Get Profile Picture

```
GET /api/users/me/profile-picture
```

Returns the URL of the current profile picture or `404` if none is set.

**Response `200`:**

```json
{
  "data": {
    "imageUrl": "https://cdn.example.com/avatars/jane.jpg"
  }
}
```

### Update Profile Picture

```
PUT /api/users/me/profile-picture
```

**Body:**

```json
{
  "imageUrl": "https://cdn.example.com/avatars/jane-new.jpg"
}
```

### Remove Profile Picture

```
DELETE /api/users/me/profile-picture
```

Returns `204 No Content`.

---

## 16. Assets (Images)

The asset system manages image URLs for profiles, stores, and reviews. All asset operations use a **discriminated union** on the `category` field — there are exactly three valid category values.

### Asset Category Names

| Category Value | Scope | Required extras |
|----------------|-------|-----------------|
| `user_profile_picture` | Authenticated user's profile picture | — |
| `establishment_display_image` | Store logo or banner | `storeId`, `slot` (`"logo"` or `"banner"`) |
| `feedback_image` | Images attached to a product review | `reviewId` |

### Get Asset Categories

```
GET /api/assets/categories
```

Returns the canonical list of category keys above.

### Get Asset Assignment

```
GET /api/assets/assignments?category=user_profile_picture
```

| Query Param | Type | Required | Notes |
|-------------|------|----------|-------|
| `category` | string | Yes | One of the three values above |
| `storeId` | integer | Conditional | Required when `category = establishment_display_image` |
| `reviewId` | integer | Conditional | Required when `category = feedback_image` |

### Assign Asset

```
PUT /api/assets/assignments
```

The request body is a **discriminated union** — pick the variant matching your `category`:

**User profile picture:**

```json
{
  "category": "user_profile_picture",
  "imageUrl": "https://cdn.example.com/avatars/jane.jpg"
}
```

**Store logo or banner:**

```json
{
  "category": "establishment_display_image",
  "storeId": 1,
  "slot": "logo",
  "imageUrl": "https://cdn.example.com/stores/1/logo.png"
}
```

```json
{
  "category": "establishment_display_image",
  "storeId": 1,
  "slot": "banner",
  "imageUrl": "https://cdn.example.com/stores/1/banner.jpg"
}
```

**Review images (multiple URLs at once):**

```json
{
  "category": "feedback_image",
  "reviewId": 88,
  "imageUrls": [
    "https://cdn.example.com/reviews/img1.jpg",
    "https://cdn.example.com/reviews/img2.jpg"
  ]
}
```

> `imageUrls` is an array — max 5 URLs per request.

### Remove Asset

```
DELETE /api/assets/assignments
```

Body mirrors the PUT shape but without image URL fields. For `feedback_image`, include `imageUrl` (single URL) to remove one specific image, or omit to remove all:

```json
{ "category": "user_profile_picture" }
```

```json
{ "category": "establishment_display_image", "storeId": 1, "slot": "banner" }
```

```json
{ "category": "feedback_image", "reviewId": 88, "imageUrl": "https://cdn.example.com/reviews/img1.jpg" }
```

**Response `204`:** No Content.

---

## 17. Promotion Campaigns

Customers can view active promotions to discover discounts.

### List Active Promotions

```
GET /api/promotion-campaigns?storeId=1&isActive=true&limit=25&offset=0
```

| Query Param | Type | Description |
|-------------|------|-------------|
| `storeId` | integer | Filter by store |
| `isActive` | boolean | Filter active/inactive |
| `startsBefore` | string | ISO 8601 — promotions starting before this date |
| `endsAfter` | string | ISO 8601 — promotions ending after this date |
| `search` | string | Search on name |

**Response item:**

```json
{
  "id": 3,
  "name": "Spring Sale",
  "code": "SPRING20",
  "description": "20% off all running shoes",
  "discountType": "percentage",
  "discountValue": 20,
  "startsAt": "2025-03-01T00:00:00.000Z",
  "endsAt": "2025-03-31T23:59:59.000Z",
  "minOrderSubtotalInCents": 5000,
  "appliesAutomatically": false,
  "isStackable": false,
  "isActive": true
}
```

### Get Promotion by ID

```
GET /api/promotion-campaigns/:id
```

---

## 18. Pagination

All list endpoints support cursor-free offset pagination.

| Parameter | Default | Max |
|-----------|---------|-----|
| `limit` | 25 | 100 (500 for some admin endpoints) |
| `offset` | 0 | — |

**Example — page 3 of 25 items:**

```
GET /api/products?limit=25&offset=50
```

**Response always includes:**

```json
{
  "total": 143,
  "limit": 25,
  "offset": 50
}
```

Use `total`, `limit`, `offset` to compute page count and build UI controls:

```
totalPages = Math.ceil(total / limit)
currentPage = Math.floor(offset / limit) + 1
hasMore = offset + limit < total
```

---

## 19. TypeScript API Client

A pre-built TypeScript client is available at `api-client/` in the repository. It handles token management automatically.

### Installation

```bash
# Install from repo (npm workspace or local path)
npm install ./api-client
```

### Usage

```typescript
import { ApiClient } from 'tot-api-client';

const client = new ApiClient({
  baseUrl: 'https://your-api-host/api',
});

// Register
const { data } = await client.auth.register({
  phone: '+14155552671',
  otp: '382910',
  email: 'jane@example.com',
});
client.setToken(data.accessToken);

// Browse products
const { data: products } = await client.products.list({ storeId: 1 });
```

---

## 20. End-to-End Flows

### New User Purchase Flow

```
1. POST /api/auth/customer/register/request-otp   { phone }
2. (user receives OTP via SMS)
3. POST /api/auth/customer/register/complete       { phone, otp, email, firstName }
   → store accessToken
4. GET  /api/stores?status=active                  browse stores
5. GET  /api/products?storeId=1&limit=25           browse products
6. GET  /api/products/101                          view product detail
7. POST /api/carts                                 { userId, storeId }
8. PUT  /api/carts/201                             { subtotalInCents: 14999, ... }
9. POST /api/orders                                { userId, storeId, cartId, ... }
```

### Returning User Login + Wishlist Flow

```
1. POST /api/auth/customer/login/request-otp       { phone }
2. POST /api/auth/customer/login/verify            { phone, otp }
   → store accessToken
3. GET  /api/wishlists?userId=42                   view saved lists
4. GET  /api/products/:id                          browse a product
5. PUT  /api/wishlists/15                          { productIds: [..., 105] }  ← add item
```

### Review Submission Flow

```
1. (user is authenticated)
2. GET  /api/orders?userId=42&fulfillmentStatus=fulfilled   find eligible orders
3. POST /api/product-reviews                               { productId, orderId, rating, body }
4. (review enters moderation queue → published when approved)
```

---

## Appendix A — Common Error Scenarios

| Scenario | Status | Message |
|----------|--------|---------|
| Missing `Authorization` header | `401` | `Unauthorized` |
| Token expired | `401` | `Token expired` |
| Wrong role for endpoint | `403` | `Forbidden` |
| Invalid phone format | `422` | `phone must be in international format` |
| OTP expired or already used | `400` | `OTP expired` / `OTP already consumed` |
| OTP max attempts reached | `400` | `Max OTP attempts exceeded` |
| Resource not found | `404` | `Not found` |
| Duplicate phone on register | `409` | `Phone already registered` |
| Too many OTP requests | `429` | `Too many requests` |
| Wrong asset `category` value | `422` | `Invalid enum value` |
| `establishment_display_image` without `storeId` | `422` | `storeId is required for establishment_display_image` |
| `feedback_image` without `reviewId` | `422` | `reviewId is required for feedback_image` |

---

## Appendix B — Enum Values Reference

### Order Status
`pending` · `placed` · `processing` · `shipped` · `delivered` · `cancelled` · `refunded`

### Payment Status
`unpaid` · `paid` · `partial` · `refunded`

### Fulfillment Status
`unfulfilled` · `partial` · `fulfilled` · `returned`

### Cart Status
`active` · `merged` · `converted` · `expired`

### Review Moderation Status
`pending` · `approved` · `rejected`

### Discount Type
`percentage` · `fixed_amount`

### Store Status
`active` · `inactive` · `suspended`

### User Roles
`customer` · `store_admin` · `admin` · `master_admin`

