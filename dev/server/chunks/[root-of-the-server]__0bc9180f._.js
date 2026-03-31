module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/apps/web/src/lib/woo/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wooFetchServer",
    ()=>wooFetchServer,
    "wooPost",
    ()=>wooPost
]);
const getWooEnv = ()=>{
    const baseUrlEnv = process.env.WOO_API_BASE_URL;
    const consumerKey = process.env.WOO_CONSUMER_KEY;
    const consumerSecret = process.env.WOO_CONSUMER_SECRET;
    if (!baseUrlEnv || !consumerKey || !consumerSecret) {
        throw new Error("WooCommerce API env vars are missing");
    }
    const baseUrl = baseUrlEnv.replace(/\/$/, "");
    if (!baseUrl.startsWith("http")) {
        throw new Error(`WOO_API_BASE_URL is invalid. Current value: "${baseUrl}". It must start with http(s)://`);
    }
    return {
        baseUrl,
        consumerKey,
        consumerSecret
    };
};
const buildAuthHeader = ()=>{
    const { consumerKey, consumerSecret } = getWooEnv();
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    return `Basic ${auth}`;
};
const wooFetchServer = async (path, paramsOrOptions)=>{
    const { baseUrl } = getWooEnv();
    let params;
    let method = "GET";
    let bodyJson;
    let cache = "no-store";
    let nextOptions;
    if (paramsOrOptions && typeof paramsOrOptions === "object" && ("method" in paramsOrOptions || "bodyJson" in paramsOrOptions || "searchParams" in paramsOrOptions || "cache" in paramsOrOptions || "next" in paramsOrOptions)) {
        const opts = paramsOrOptions;
        params = opts.searchParams;
        method = opts.method ?? "GET";
        bodyJson = opts.bodyJson;
        cache = opts.cache ?? "no-store";
        nextOptions = opts.next;
    } else {
        params = paramsOrOptions;
    }
    const cleanPath = path.replace(/^\/+/, "");
    const trimmedBase = baseUrl.replace(/\/+$/, "");
    const url = new URL(`${trimmedBase}/${cleanPath}`);
    if (params) {
        Object.entries(params).forEach(([key, value])=>{
            if (value === undefined || value === null) return;
            url.searchParams.set(key, String(value));
        });
    }
    const res = await fetch(url.toString(), {
        method,
        headers: {
            Authorization: buildAuthHeader(),
            ...bodyJson ? {
                "Content-Type": "application/json"
            } : {}
        },
        body: bodyJson ? JSON.stringify(bodyJson) : undefined,
        cache,
        next: nextOptions
    });
    if (!res.ok) {
        const text = await res.text().catch(()=>"");
        console.error("Woo API error:", res.status, res.statusText, url.toString(), text);
        throw new Error(`Woo API error: ${res.status}`);
    }
    return res.json();
};
const getWooAuthHeader = ()=>{
    const ck = process.env.WOO_CONSUMER_KEY;
    const cs = process.env.WOO_CONSUMER_SECRET;
    if (!ck || !cs) throw new Error("Missing WOO_CONSUMER_KEY/WOO_CONSUMER_SECRET");
    const auth = Buffer.from(`${ck}:${cs}`).toString("base64");
    return `Basic ${auth}`;
};
const getWooBase = ()=>{
    const base = process.env.WOO_API_BASE_URL;
    if (!base) throw new Error("Missing WOO_API_BASE_URL");
    return base;
};
const wooPost = async (path, body)=>{
    const base = getWooBase();
    const url = new URL(`${base}/wp-json/wc/v3/${path}`);
    const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
            Authorization: getWooAuthHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        cache: "no-store"
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Woo POST failed: ${res.status} ${text}`);
    }
    return res.json();
};
}),
"[project]/apps/web/src/lib/cache.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Cache configuration for API calls
 * Using Next.js fetch cache with revalidation times
 */ __turbopack_context__.s([
    "CACHE_CONFIG",
    ()=>CACHE_CONFIG,
    "getCacheConfig",
    ()=>getCacheConfig
]);
const CACHE_CONFIG = {
    // Categories rarely change - cache for 1 hour (3600 seconds)
    CATEGORIES: 3600,
    // Products can change frequently (price, stock) - cache for 5 minutes (300 seconds)
    PRODUCTS: 300,
    // Product details - cache for 10 minutes
    PRODUCT_DETAIL: 600,
    // Search results - no cache (fresh every time)
    SEARCH: 0
};
const getCacheConfig = (cacheKey)=>{
    const revalidateTime = CACHE_CONFIG[cacheKey];
    if (revalidateTime === 0) {
        return {
            cache: "no-store"
        };
    }
    return {
        cache: "force-cache",
        next: {
            revalidate: revalidateTime
        }
    };
};
}),
"[project]/apps/web/src/lib/wooClient.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategories",
    ()=>getCategories,
    "getCategoryById",
    ()=>getCategoryById,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductVariations",
    ()=>getProductVariations,
    "getProducts",
    ()=>getProducts,
    "wooFetch",
    ()=>wooFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$woo$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/woo/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/cache.ts [app-route] (ecmascript)");
;
;
;
const baseUrl = process.env.WOO_API_BASE_URL.replace(/\/$/, "");
const wooFetch = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$woo$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wooFetchServer"];
const getProducts = async (options)=>{
    // Don't cache search results (search=true means it's a search query)
    const isSearch = !!options?.search;
    return wooFetch("/products", {
        searchParams: {
            per_page: options?.per_page ?? 20,
            page: options?.page ?? 1,
            category: options?.category,
            search: options?.search,
            orderby: options?.orderby,
            order: options?.order,
            min_price: options?.min_price,
            max_price: options?.max_price,
            on_sale: options?.on_sale,
            status: options?.status ?? "publish",
            stock_status: options?.stock_status,
            attribute: options?.attribute,
            attribute_term: options?.attribute_term
        },
        next: {
            revalidate: isSearch ? 0 : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CACHE_CONFIG"].PRODUCTS
        }
    });
};
const getProductBySlug = async (slug)=>{
    const products = await wooFetch("/products", {
        searchParams: {
            slug,
            per_page: 1,
            status: "publish"
        },
        next: {
            revalidate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CACHE_CONFIG"].PRODUCT_DETAIL
        }
    });
    if (!Array.isArray(products) || products.length === 0) return null;
    return products[0] ?? null;
};
const getProductVariations = async (productId)=>wooFetch(`products/${productId}/variations`, {
        searchParams: {
            per_page: 100
        },
        next: {
            revalidate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CACHE_CONFIG"].PRODUCT_DETAIL
        }
    });
const getCategories = async (options)=>{
    return wooFetch("/products/categories", {
        searchParams: {
            per_page: 100,
            parent: options?.parent,
            hide_empty: options?.hide_empty ?? true
        },
        next: {
            revalidate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CACHE_CONFIG"].CATEGORIES
        }
    });
};
const getCategoryById = async (id)=>{
    const category = await wooFetch(`products/categories/${id}`, {
        next: {
            revalidate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CACHE_CONFIG"].CATEGORIES
        }
    });
    return Array.isArray(category) ? category : null;
};
}),
"[project]/apps/web/src/app/api/categories/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$wooClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/wooClient.ts [app-route] (ecmascript)");
;
;
const GET = async ()=>{
    try {
        const categories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$wooClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCategories"])({
            hide_empty: true
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(categories);
    } catch (error) {
        console.error("Error fetching WooCommerce categories:", error?.response?.data || error?.message || error);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Failed to fetch categories", {
            status: 500
        });
    }
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0bc9180f._.js.map