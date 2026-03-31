/**
 * Cache configuration for API calls
 * Using Next.js fetch cache with revalidation times
 */

export const CACHE_CONFIG = {
  // Categories rarely change - cache for 1 hour (3600 seconds)
  CATEGORIES: 3600,

  // Products can change frequently (price, stock) - cache for 5 minutes (300 seconds)
  PRODUCTS: 300,

  // Product details - cache for 10 minutes
  PRODUCT_DETAIL: 600,

  // Search results - no cache (fresh every time)
  SEARCH: 0,
} as const;

export type CacheKey = keyof typeof CACHE_CONFIG;

/**
 * Get the appropriate fetch cache options for different API calls
 */
export const getCacheConfig = (cacheKey: CacheKey): RequestInit => {
  const revalidateTime = CACHE_CONFIG[cacheKey];

  if (revalidateTime === 0) {
    return {
      cache: "no-store",
    };
  }

  return {
    cache: "force-cache",
    next: { revalidate: revalidateTime },
  };
};
