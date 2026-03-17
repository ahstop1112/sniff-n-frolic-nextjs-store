/**
 * Cache Strategy Guide
 * 
 * This document explains the caching strategy implemented in the WooCommerce client.
 */

## 🎯 Caching Strategy Overview

### Cache Timings:
- **Categories**: 1 hour (3600 seconds) - Rarely change
- **Products**: 5 minutes (300 seconds) - Prices/stock may change
- **Product Details**: 10 minutes (600 seconds) - Stable content
- **Search**: No cache (0 seconds) - Always fresh

### How It Works:

#### 1. **Next.js ISR (Incremental Static Regeneration)**
   - Pages are cached at build time
   - Revalidated at the interval specified in `next: { revalidate: X }`
   - Stale responses served while revalidation happens in background

#### 2. **Smart Cache Keys**
   - Each API endpoint with different parameters creates a new cache entry
   - Example: `/products?category=1` and `/products?category=2` are cached separately
   - Search results are never cached (always fresh)

### Performance Impact:

**Before Optimization:**
- Every page load fetches fresh data from WooCommerce API
- Potential 500ms+ load time per request
- High API rate limiting risk

**After Optimization:**
- Categories cached for 1 hour - ~99% cache hits for category sidebar
- Products cached for 5 minutes - minimal redundant API calls
- First request in interval loads from API, subsequent requests use cache
- Significantly reduced load times and API calls

### Adding New API Endpoints:

When adding new API calls to `wooClient.ts`:

```typescript
export const getMyData = async (options?: {
  // options here
}): Promise<MyDataType[]> => {
  return wooFetch<MyDataType[]>("/my-endpoint", {
    searchParams: {
      // params here
    },
    next: {
      revalidate: CACHE_CONFIG.YOUR_CACHE_TYPE, // Pick from CACHE_CONFIG
    },
  });
};
```

### Manual Cache Invalidation:

If you need to invalidate cache manually, you can use:
- Redeploy the application
- Use `revalidatePath()` in server actions (Next.js 13+)
- Adjust the `revalidate` time in `CACHE_CONFIG`

### Monitoring:

Look for these HTTP headers in production:
- `X-Middleware-Cache: HIT` - Cache hit
- `X-Middleware-Cache: MISS` - Cache miss/revalidation

---

✅ This strategy significantly improves performance while keeping data reasonably fresh.
