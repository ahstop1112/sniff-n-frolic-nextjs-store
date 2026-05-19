// src/components/Product/ProductsGridClient.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Grid } from "@mui/material";
import ProductGrid from "./ProductGrid";
import type { WooProduct } from "@/lib/storeApi/types";

interface ProductsGridClientProps {
  initialProducts: WooProduct[];
  categorySlug?: string;
  search?: string;
  pageSize?: number;
}

const ProductsGridClient = ({
  initialProducts,
  categorySlug,
  search,
  pageSize = 20,
}: ProductsGridClientProps) => {
  const [products, setProducts] = useState<WooProduct[]>(initialProducts);
  const [page, setPage] = useState(2); // page 1 already loaded server-side
  const [hasMore, setHasMore] = useState(initialProducts.length >= pageSize);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pageSize),
      });
      if (categorySlug) params.set("category", categorySlug);
      if (search) params.set("search", search);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data: WooProduct[] = await res.json();

      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
        setPage((p) => p + 1);
        if (data.length < pageSize) setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, pageSize, categorySlug, search]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Reset when filters change
  useEffect(() => {
    setProducts(initialProducts);
    setPage(2);
    setHasMore(initialProducts.length >= pageSize);
  }, [initialProducts, categorySlug, search, pageSize]);

  return (
    <>
      <Grid container size={{ lg: 9, xl: 9, md: 9, sm: 12, xs: 12 }}>
        {products.map((p) => (
          <Grid
            container
            size={{ lg: 3, xl: 2, md: 4, sm: 6, xs: 6 }}
            sx={{ p: 1 }} 
            key={p.slug}
          >
            <ProductGrid
              slug={p.slug}
              image={p?.images[0]}
              name={p.name}
              onSale={p?.on_sale}
              price={p.price}
              regularPrice={p?.regular_price}
            />
          </Grid>
        ))}
      </Grid>

      {/* Sentinel for IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />

      {loading && (
        <Grid size={{ xs: 12 }} sx={{ textAlign: "center", py: 3 }}>
          <span style={{ opacity: 0.5, fontSize: 14 }}>Loading...</span>
        </Grid>
      )}
    </>
  );
};

export default ProductsGridClient;