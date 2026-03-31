module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/icon.png.mjs { IMAGE => \"[project]/src/app/icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/icon.png.mjs { IMAGE => \"[project]/src/app/icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/[lang]/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[lang]/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/utils/helpers.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "collectDescendantIds",
    ()=>collectDescendantIds,
    "formatMoney",
    ()=>formatMoney,
    "getStr",
    ()=>getStr,
    "shuffleArray",
    ()=>shuffleArray,
    "toNum",
    ()=>toNum
]);
const shuffleArray = (arr)=>{
    const a = [
        ...arr
    ];
    for(let i = a.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [
            a[j],
            a[i]
        ];
    }
    return a;
};
const getStr = (v)=>typeof v === "string" ? v : undefined;
const collectDescendantIds = (all, rootId)=>{
    const ids = [];
    const walk = (id)=>{
        ids.push(id);
        all.filter((c)=>c.parent === id).forEach((child)=>walk(child.id));
    };
    walk(rootId);
    return ids;
};
const formatMoney = (n, currency = "CAD")=>new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency
    }).format(n);
const toNum = (v)=>{
    const x = Number(v);
    return Number.isFinite(x) ? x : null;
};
}),
"[project]/src/lib/categories/getCategoryIdBySlug.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategoryIdBySlug",
    ()=>getCategoryIdBySlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wooClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wooClient.ts [app-rsc] (ecmascript)");
;
const getCategoryIdBySlug = async (slug)=>{
    const s = slug.trim();
    if (!s) return undefined;
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wooClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wooFetch"])("products/categories", {
        slug: s,
        per_page: 1
    });
    if (!Array.isArray(res)) return undefined;
    const first = res[0];
    const id = first?.id;
    return typeof id === "number" ? id : undefined;
};
}),
"[project]/src/lib/filters/buildWooParams.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildWooParamsFromSearchParams",
    ()=>buildWooParamsFromSearchParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2f$getCategoryIdBySlug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/categories/getCategoryIdBySlug.ts [app-rsc] (ecmascript)");
;
const getParamString = (sp, key)=>{
    const v = sp[key];
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v[0] ?? "";
    return "";
};
const getParamNumber = (sp, key)=>{
    const raw = getParamString(sp, key).trim();
    if (!raw) return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
};
const clampMinMax = (min, max)=>{
    if (min === undefined && max === undefined) return {
        min: undefined,
        max: undefined
    };
    if (min !== undefined && max !== undefined && min > max) {
        return {
            min: max,
            max: min
        }; // swap
    }
    return {
        min,
        max
    };
};
const mapSortToWoo = (sort)=>{
    // Woo orderby: date | title | price | popularity | rating
    // order: asc | desc
    switch(sort){
        case "new":
            return {
                orderby: "date",
                order: "desc"
            };
        case "popularity":
            return {
                orderby: "popularity",
                order: "desc"
            };
        case "rating":
            return {
                orderby: "rating",
                order: "desc"
            };
        case "price_asc":
            return {
                orderby: "price",
                order: "asc"
            };
        case "price_desc":
            return {
                orderby: "price",
                order: "desc"
            };
        default:
            return {
                orderby: "date",
                order: "desc"
            };
    }
};
const buildWooParamsFromSearchParams = async (args)=>{
    const sp = await args.searchParams;
    const { baseCategoryId, categories = [], perPage = 50, color } = args;
    const categorySlug = getParamString(sp, "category");
    const inStockFlag = getParamString(sp, "in_stock");
    const onSaleFlag = getParamString(sp, "on_sale");
    const sort = getParamString(sp, "sort") || "new";
    const minRaw = getParamNumber(sp, "min_price");
    const maxRaw = getParamNumber(sp, "max_price");
    const { min, max } = clampMinMax(minRaw, maxRaw);
    const params = {
        per_page: perPage,
        status: "publish"
    };
    // category: slug → id
    let resolvedCategoryId;
    if (categorySlug) {
        // 1) local lookup (fast)
        const local = categories.find((c)=>c.slug === categorySlug);
        if (local?.id) {
            resolvedCategoryId = local.id;
        } else {
            // 2) remote lookup fallback (guaranteed)
            resolvedCategoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2f$getCategoryIdBySlug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryIdBySlug"])(categorySlug);
        }
    }
    // Prefer query category, fallback to baseCategoryId
    const categoryId = resolvedCategoryId ?? baseCategoryId;
    if (typeof categoryId === "number") {
        params.category = categoryId;
    }
    const toBool = (v)=>v === "1" || v === "true";
    if (toBool(inStockFlag)) params.stock_status = "instock";
    if (toBool(onSaleFlag)) params.on_sale = true;
    if (min !== undefined) params.min_price = min;
    if (max !== undefined) params.max_price = max;
    const { orderby, order } = mapSortToWoo(sort);
    params.orderby = orderby;
    params.order = order;
    // color filter：attribute + term id
    const colorSlug = getParamString(sp, "color");
    if (color && colorSlug) {
        const term = color.terms.find((t)=>t.slug === colorSlug);
        if (term) {
            params.attribute = color.attribute; // e.g. "pa_color"
            params.attribute_term = term.id;
        }
    }
    return params;
};
}),
"[project]/src/lib/filters/buildWooParamsForListPage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildWooParamsForListPage",
    ()=>buildWooParamsForListPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$filters$2f$buildWooParams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/filters/buildWooParams.ts [app-rsc] (ecmascript)");
;
const getParamString = (sp, key)=>{
    const v = sp[key];
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v[0] ?? "";
    return "";
};
const toBoolFlag = (v)=>v === "1" || v === "true";
const isTruthyParam = (sp, key)=>{
    const v = getParamString(sp, key).trim();
    return Boolean(v);
};
const buildWooParamsForListPage = async (args)=>{
    const sp = await args.searchParams;
    const perPage = args.perPage ?? 50;
    const wooParams = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$filters$2f$buildWooParams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildWooParamsFromSearchParams"])({
        searchParams: sp,
        baseCategoryId: args.baseCategoryId,
        categories: args.categories ?? [],
        perPage,
        color: args.color
    });
    // Search alias: /search?q=xxx  -> wooParams.search
    const key = args.searchKey ?? "q";
    const rawSearch = getParamString(sp, key).trim();
    if (rawSearch) {
        wooParams.search = rawSearch;
    }
    const sort = getParamString(sp, "sort").trim();
    const hasSort = sort !== "" && sort !== "new";
    const hasAnyFilter = isTruthyParam(sp, "category") || toBoolFlag(getParamString(sp, "in_stock")) || toBoolFlag(getParamString(sp, "on_sale")) || isTruthyParam(sp, "min_price") || isTruthyParam(sp, "max_price") || isTruthyParam(sp, "color") || hasSort || rawSearch !== "";
    const hasQuery = rawSearch !== "";
    return {
        sp,
        wooParams,
        hasAnyFilter,
        hasQuery
    };
};
}),
"[project]/src/seo/seoConfig.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "seoConfig",
    ()=>seoConfig
]);
const seoConfig = {
    siteName: "Sniff & Frolic",
    siteUrl: "https://sniffnfrolic.com",
    defaultOgImage: "https://sniffnfrolic.com/wp-content/uploads/2025/08/logo_snf_light2.png"
};
}),
"[project]/src/seo/buildCategoryMetaTag.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildCategoryMetadata",
    ()=>buildCategoryMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wooClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wooClient.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/dictionaries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$seo$2f$seoConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/seo/seoConfig.ts [app-rsc] (ecmascript)");
;
;
;
;
const buildCategoryMetadata = async (args)=>{
    const { lang, slug } = args;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLocale"])(lang)) {
        return {
            title: `Category not found - ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$seo$2f$seoConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].siteName}`,
            description: "The requested category could not be found."
        };
    }
    const locale = lang;
    const dict = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDictionary"])(locale);
    const allCats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wooClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"])();
    const category = allCats.find((c)=>c.slug === slug);
    if (!category) {
        return {
            title: `Category not found - ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$seo$2f$seoConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].siteName}`,
            description: "The requested category could not be found."
        };
    }
    const baseTitle = `${category.name} – ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$seo$2f$seoConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].siteName}`;
    const baseDescription = dict.common.metaDescription.replace("{{category}}", category.name).replace("{{siteName}}", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$seo$2f$seoConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].siteName);
    // 假設 Woo 用預設 product category URL 結構：
    const canonical = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$seo$2f$seoConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].siteUrl}/${lang}/category/${category.slug}`;
    const metadata = {
        title: baseTitle,
        description: baseDescription,
        alternates: {
            canonical
        },
        openGraph: {
            title: baseTitle,
            description: baseDescription,
            url: canonical,
            siteName: "${seoConfig.siteName}",
            type: "website",
            images: category.image?.src ? [
                {
                    url: category.image.src
                }
            ] : []
        }
    };
    return metadata;
};
}),
"[project]/src/components/Category/CategoryPageClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/Category/CategoryPageClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/Category/CategoryPageClient.tsx <module evaluation>", "default");
}),
"[project]/src/components/Category/CategoryPageClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/Category/CategoryPageClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/Category/CategoryPageClient.tsx", "default");
}),
"[project]/src/components/Category/CategoryPageClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Category$2f$CategoryPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/Category/CategoryPageClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Category$2f$CategoryPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/Category/CategoryPageClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Category$2f$CategoryPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/types/next.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unwrap",
    ()=>unwrap,
    "unwrapSearchParams",
    ()=>unwrapSearchParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
;
const unwrap = async (v)=>Promise.resolve(v);
const unwrapSearchParams = async (v)=>v ? await unwrap(v) : {};
}),
"[project]/src/app/[lang]/category/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/dictionaries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wooClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wooClient.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/helpers.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$filters$2f$buildWooParamsForListPage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/filters/buildWooParamsForListPage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$seo$2f$buildCategoryMetaTag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/seo/buildCategoryMetaTag.ts [app-rsc] (ecmascript)");
// components
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Category$2f$CategoryPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Category/CategoryPageClient.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2f$getCategoryIdBySlug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/categories/getCategoryIdBySlug.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$next$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/next.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const generateMetadata = async ({ params })=>{
    const { lang, slug } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$next$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unwrap"])(params);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLocale"])(lang)) return {};
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$seo$2f$buildCategoryMetaTag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildCategoryMetadata"])({
        lang,
        slug
    });
};
const CategoryPage = async ({ params, searchParams })=>{
    const { lang, slug } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$next$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unwrap"])(params);
    const sp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$next$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unwrapSearchParams"])(searchParams);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLocale"])(lang)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const locale = lang;
    const dict = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDictionary"])(locale);
    const baseCategoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2f$getCategoryIdBySlug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryIdBySlug"])(slug);
    const { wooParams, hasAnyFilter } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$filters$2f$buildWooParamsForListPage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildWooParamsForListPage"])({
        searchParams: sp,
        perPage: 50,
        baseCategoryId
    });
    const products = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wooClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProducts"])(wooParams);
    const finalProducts = hasAnyFilter ? products : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shuffleArray"])(products);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Category$2f$CategoryPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        slug: slug,
        dict: dict,
        finalProducts: finalProducts
    }, void 0, false, {
        fileName: "[project]/src/app/[lang]/category/[slug]/page.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CategoryPage;
}),
"[project]/src/app/[lang]/category/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[lang]/category/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b33acb48._.js.map