(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/components/Breadcrumb/Breadcrumb.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "breadcrumb": "Breadcrumb-module-scss-module__M1wqYa__breadcrumb",
  "seperator": "Breadcrumb-module-scss-module__M1wqYa__seperator",
});
}),
"[project]/apps/web/src/components/Breadcrumb/BreadcrumbsNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/i18n/LocaleProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Breadcrumb$2f$Breadcrumb$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Breadcrumb/Breadcrumb.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const BreadcrumbsNav = (t0)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "d78d28a60a5d461e46a98ec9136fc6c1d76d22e93db39d0fa75999eb9e39a11d") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d78d28a60a5d461e46a98ec9136fc6c1d76d22e93db39d0fa75999eb9e39a11d";
    }
    const { items: t1, isProduct: t2 } = t0;
    const items = t1 === undefined ? [] : t1;
    const isProduct = t2 === undefined ? true : t2;
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])("nav");
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const navItems = [
        {
            label: t("home"),
            href: locale === "zh" ? "/zh" : "/en"
        }
    ];
    if (isProduct) {
        navItems.push({
            label: t("collection"),
            href: `/${locale}/products`
        });
    }
    navItems.push(...items);
    const T0 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"];
    const t3 = "nav";
    const t4 = "Breadcrumb";
    const t5 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Breadcrumb$2f$Breadcrumb$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"];
    const t6 = navItems.map((item, index)=>{
        const isLast = index === navItems.length - 1;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: [
                item.href && item.label && !isLast ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item.href,
                    children: item.label.replace("&amp;", "&")
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Breadcrumb/BreadcrumbsNav.tsx",
                    lineNumber: 45,
                    columnNumber: 85
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        " ",
                        item.label,
                        " "
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/Breadcrumb/BreadcrumbsNav.tsx",
                    lineNumber: 45,
                    columnNumber: 152
                }, ("TURBOPACK compile-time value", void 0)),
                !isLast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Breadcrumb$2f$Breadcrumb$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].seperator,
                    children: "/"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Breadcrumb/BreadcrumbsNav.tsx",
                    lineNumber: 45,
                    columnNumber: 192
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `${item.label}-${index}`, true, {
            fileName: "[project]/apps/web/src/components/Breadcrumb/BreadcrumbsNav.tsx",
            lineNumber: 45,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    });
    let t7;
    if ($[1] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            children: t6
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Breadcrumb/BreadcrumbsNav.tsx",
            lineNumber: 49,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = t6;
        $[2] = t7;
    } else {
        t7 = $[2];
    }
    let t8;
    if ($[3] !== T0 || $[4] !== t5.breadcrumb || $[5] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            component: t3,
            "aria-label": t4,
            className: t5.breadcrumb,
            children: t7
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Breadcrumb/BreadcrumbsNav.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = T0;
        $[4] = t5.breadcrumb;
        $[5] = t7;
        $[6] = t8;
    } else {
        t8 = $[6];
    }
    return t8;
};
_s(BreadcrumbsNav, "dHOsrDJ+AWHhhwrHQvZz1cetCA4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = BreadcrumbsNav;
const __TURBOPACK__default__export__ = BreadcrumbsNav;
var _c;
__turbopack_context__.k.register(_c, "BreadcrumbsNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ProductFilter/ProductFilter.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "productFilter": "ProductFilter-module-scss-module__HTlV7G__productFilter",
});
}),
"[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/Stack/Stack.js [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-client] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ProductFilter$2f$ProductFilter$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ProductFilter/ProductFilter.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ProductsFilterSidebarClient = (t0)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(146);
    if ($[0] !== "df6ee1603d71ffe781465bedb5c23fa21ab8b26e2ac09520add47dd535950d84") {
        for(let $i = 0; $i < 146; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "df6ee1603d71ffe781465bedb5c23fa21ab8b26e2ac09520add47dd535950d84";
    }
    const { categories, colors: t1, common } = t0;
    let t2;
    if ($[1] !== t1) {
        t2 = t1 === undefined ? [] : t1;
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const colors = t2;
    const [minPriceInput, setMinPriceInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [maxPriceInput, setMaxPriceInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    let t3;
    if ($[3] !== searchParams) {
        t3 = searchParams.get("category") ?? "";
        $[3] = searchParams;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const selectedCategorySlug = t3;
    let t4;
    if ($[5] !== searchParams) {
        t4 = searchParams.get("in_stock");
        $[5] = searchParams;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const inStock = t4 === "1";
    let t5;
    if ($[7] !== searchParams) {
        t5 = searchParams.get("on_sale");
        $[7] = searchParams;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    const onSale = t5 === "1";
    let t6;
    if ($[9] !== searchParams) {
        t6 = searchParams.get("min_price") ?? "";
        $[9] = searchParams;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const minPrice = t6;
    let t7;
    if ($[11] !== searchParams) {
        t7 = searchParams.get("max_price") ?? "";
        $[11] = searchParams;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    const maxPrice = t7;
    let t8;
    if ($[13] !== searchParams) {
        t8 = searchParams.get("sort") ?? "new";
        $[13] = searchParams;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    const sort = t8;
    let t9;
    if ($[15] !== searchParams) {
        t9 = searchParams.get("color") ?? "";
        $[15] = searchParams;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    const color = t9;
    let t10;
    if ($[17] !== colors) {
        t10 = colors || [];
        $[17] = colors;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    const hasColors = t10.length > 0;
    let t11;
    let t12;
    if ($[19] !== maxPrice || $[20] !== minPrice) {
        t11 = ()=>{
            setMinPriceInput(minPrice);
            setMaxPriceInput(maxPrice);
        };
        t12 = [
            minPrice,
            maxPrice
        ];
        $[19] = maxPrice;
        $[20] = minPrice;
        $[21] = t11;
        $[22] = t12;
    } else {
        t11 = $[21];
        t12 = $[22];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t11, t12);
    let t13;
    if ($[23] !== pathname || $[24] !== router || $[25] !== searchParams) {
        t13 = (updates)=>{
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach((t14)=>{
                const [key, value] = t14;
                if (!value) {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            });
            const qs = params.toString();
            const nextUrl = qs ? `${pathname}?${qs}` : pathname;
            router.push(nextUrl);
            router.refresh();
        };
        $[23] = pathname;
        $[24] = router;
        $[25] = searchParams;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    const updateParams = t13;
    let t14;
    if ($[27] !== updateParams) {
        t14 = (slug)=>{
            updateParams({
                category: slug || null
            });
        };
        $[27] = updateParams;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    const handleCategoryChange = t14;
    let t15;
    if ($[29] !== updateParams) {
        t15 = (checked)=>{
            updateParams({
                in_stock: checked ? "1" : null
            });
        };
        $[29] = updateParams;
        $[30] = t15;
    } else {
        t15 = $[30];
    }
    const handleInStockChange = t15;
    let t16;
    if ($[31] !== updateParams) {
        t16 = (checked_0)=>{
            updateParams({
                on_sale: checked_0 ? "1" : null
            });
        };
        $[31] = updateParams;
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    const handleOnSaleChange = t16;
    let t17;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = (value_0)=>setMinPriceInput(value_0.replace(/[^\d]/g, ""));
        $[33] = t17;
    } else {
        t17 = $[33];
    }
    const handleMinPriceChange = t17;
    let t18;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = (value_1)=>setMaxPriceInput(value_1.replace(/[^\d]/g, ""));
        $[34] = t18;
    } else {
        t18 = $[34];
    }
    const handleMaxPriceChange = t18;
    let t19;
    if ($[35] !== maxPriceInput || $[36] !== minPriceInput || $[37] !== updateParams) {
        t19 = ()=>{
            updateParams({
                min_price: minPriceInput || null,
                max_price: maxPriceInput || null
            });
        };
        $[35] = maxPriceInput;
        $[36] = minPriceInput;
        $[37] = updateParams;
        $[38] = t19;
    } else {
        t19 = $[38];
    }
    const applyPriceFilter = t19;
    let t20;
    if ($[39] !== updateParams) {
        t20 = (value_2)=>{
            updateParams({
                sort: value_2 || null
            });
        };
        $[39] = updateParams;
        $[40] = t20;
    } else {
        t20 = $[40];
    }
    const handleSortChange = t20;
    let t21;
    if ($[41] !== updateParams) {
        t21 = (value_3)=>{
            updateParams({
                color: value_3 || null
            });
        };
        $[41] = updateParams;
        $[42] = t21;
    } else {
        t21 = $[42];
    }
    const handleColorChange = t21;
    let t22;
    if ($[43] !== updateParams) {
        t22 = ()=>{
            updateParams({
                category: null,
                in_stock: null,
                on_sale: null,
                min_price: null,
                max_price: null,
                sort: null,
                color: null
            });
        };
        $[43] = updateParams;
        $[44] = t22;
    } else {
        t22 = $[44];
    }
    const handleClear = t22;
    let t23;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = {
            mb: 2,
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: 12
        };
        $[45] = t23;
    } else {
        t23 = $[45];
    }
    let t24;
    if ($[46] !== common.filters) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            variant: "subtitle2",
            sx: t23,
            children: common.filters
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 280,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[46] = common.filters;
        $[47] = t24;
    } else {
        t24 = $[47];
    }
    const t25 = common.category;
    let t26;
    if ($[48] !== handleCategoryChange) {
        t26 = (e)=>handleCategoryChange(e.target.value);
        $[48] = handleCategoryChange;
        $[49] = t26;
    } else {
        t26 = $[49];
    }
    let t27;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = {
            width: "100%"
        };
        $[50] = t27;
    } else {
        t27 = $[50];
    }
    let t28;
    if ($[51] !== common.all) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
            value: "",
            children: common.all
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 306,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[51] = common.all;
        $[52] = t28;
    } else {
        t28 = $[52];
    }
    let t29;
    if ($[53] !== categories) {
        t29 = categories.map(_temp);
        $[53] = categories;
        $[54] = t29;
    } else {
        t29 = $[54];
    }
    let t30;
    if ($[55] !== common.category || $[56] !== selectedCategorySlug || $[57] !== t26 || $[58] !== t28 || $[59] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
            select: true,
            size: "small",
            label: t25,
            value: selectedCategorySlug,
            onChange: t26,
            sx: t27,
            children: [
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 322,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[55] = common.category;
        $[56] = selectedCategorySlug;
        $[57] = t26;
        $[58] = t28;
        $[59] = t29;
        $[60] = t30;
    } else {
        t30 = $[60];
    }
    let t31;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = (e_0)=>handleMinPriceChange(e_0.target.value);
        $[61] = t31;
    } else {
        t31 = $[61];
    }
    let t32;
    if ($[62] !== applyPriceFilter) {
        t32 = (e_1)=>e_1.key === "Enter" && applyPriceFilter();
        $[62] = applyPriceFilter;
        $[63] = t32;
    } else {
        t32 = $[63];
    }
    let t33;
    if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = {
            flex: 1
        };
        $[64] = t33;
    } else {
        t33 = $[64];
    }
    let t34;
    if ($[65] !== applyPriceFilter || $[66] !== common.min || $[67] !== minPriceInput || $[68] !== t32) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
            size: "small",
            label: common.min,
            value: minPriceInput,
            onChange: t31,
            onBlur: applyPriceFilter,
            onKeyDown: t32,
            inputMode: "numeric",
            sx: t33
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[65] = applyPriceFilter;
        $[66] = common.min;
        $[67] = minPriceInput;
        $[68] = t32;
        $[69] = t34;
    } else {
        t34 = $[69];
    }
    let t35;
    if ($[70] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = (e_2)=>handleMaxPriceChange(e_2.target.value);
        $[70] = t35;
    } else {
        t35 = $[70];
    }
    let t36;
    if ($[71] !== applyPriceFilter) {
        t36 = (e_3)=>e_3.key === "Enter" && applyPriceFilter();
        $[71] = applyPriceFilter;
        $[72] = t36;
    } else {
        t36 = $[72];
    }
    let t37;
    if ($[73] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = {
            flex: 1
        };
        $[73] = t37;
    } else {
        t37 = $[73];
    }
    let t38;
    if ($[74] !== applyPriceFilter || $[75] !== common.max || $[76] !== maxPriceInput || $[77] !== t36) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
            size: "small",
            label: common.max,
            value: maxPriceInput,
            onChange: t35,
            onBlur: applyPriceFilter,
            onKeyDown: t36,
            inputMode: "numeric",
            sx: t37
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[74] = applyPriceFilter;
        $[75] = common.max;
        $[76] = maxPriceInput;
        $[77] = t36;
        $[78] = t38;
    } else {
        t38 = $[78];
    }
    let t39;
    if ($[79] !== t34 || $[80] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
            direction: "row",
            spacing: 1,
            children: [
                t34,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 404,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[79] = t34;
        $[80] = t38;
        $[81] = t39;
    } else {
        t39 = $[81];
    }
    let t40;
    if ($[82] !== handleSortChange) {
        t40 = (e_4)=>handleSortChange(e_4.target.value);
        $[82] = handleSortChange;
        $[83] = t40;
    } else {
        t40 = $[83];
    }
    let t41;
    if ($[84] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = {
            width: "100%"
        };
        $[84] = t41;
    } else {
        t41 = $[84];
    }
    let t42;
    if ($[85] !== common.newest) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
            value: "new",
            children: common.newest
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 430,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[85] = common.newest;
        $[86] = t42;
    } else {
        t42 = $[86];
    }
    let t43;
    if ($[87] !== common.popularity) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
            value: "popularity",
            children: common.popularity
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 438,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[87] = common.popularity;
        $[88] = t43;
    } else {
        t43 = $[88];
    }
    let t44;
    if ($[89] !== common.rating) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
            value: "rating",
            children: common.rating
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 446,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[89] = common.rating;
        $[90] = t44;
    } else {
        t44 = $[90];
    }
    let t45;
    if ($[91] !== common.priceLowHigh) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
            value: "price_asc",
            children: common.priceLowHigh
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 454,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[91] = common.priceLowHigh;
        $[92] = t45;
    } else {
        t45 = $[92];
    }
    let t46;
    if ($[93] !== common.priceHighLow) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
            value: "price_desc",
            children: common.priceHighLow
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 462,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[93] = common.priceHighLow;
        $[94] = t46;
    } else {
        t46 = $[94];
    }
    let t47;
    if ($[95] !== common.sort || $[96] !== sort || $[97] !== t40 || $[98] !== t42 || $[99] !== t43 || $[100] !== t44 || $[101] !== t45 || $[102] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
            select: true,
            size: "small",
            label: common.sort,
            value: sort,
            onChange: t40,
            sx: t41,
            children: [
                t42,
                t43,
                t44,
                t45,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 470,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[95] = common.sort;
        $[96] = sort;
        $[97] = t40;
        $[98] = t42;
        $[99] = t43;
        $[100] = t44;
        $[101] = t45;
        $[102] = t46;
        $[103] = t47;
    } else {
        t47 = $[103];
    }
    let t48;
    if ($[104] !== color || $[105] !== colors || $[106] !== common.all || $[107] !== common.color || $[108] !== handleColorChange || $[109] !== hasColors) {
        t48 = hasColors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
            select: true,
            size: "small",
            label: common.color,
            value: color,
            onChange: (e_5)=>handleColorChange(e_5.target.value),
            sx: {
                width: "100%"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                    value: "",
                    children: common.all
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
                    lineNumber: 487,
                    columnNumber: 8
                }, ("TURBOPACK compile-time value", void 0)),
                colors.map(_temp2)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 485,
            columnNumber: 24
        }, ("TURBOPACK compile-time value", void 0));
        $[104] = color;
        $[105] = colors;
        $[106] = common.all;
        $[107] = common.color;
        $[108] = handleColorChange;
        $[109] = hasColors;
        $[110] = t48;
    } else {
        t48 = $[110];
    }
    let t49;
    if ($[111] !== handleInStockChange) {
        t49 = (e_6)=>handleInStockChange(e_6.target.checked);
        $[111] = handleInStockChange;
        $[112] = t49;
    } else {
        t49 = $[112];
    }
    let t50;
    if ($[113] !== inStock || $[114] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
            size: "small",
            checked: inStock,
            onChange: t49
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 508,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[113] = inStock;
        $[114] = t49;
        $[115] = t50;
    } else {
        t50 = $[115];
    }
    let t51;
    if ($[116] !== common.inStockOnly) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            variant: "body2",
            children: common.inStockOnly
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 517,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[116] = common.inStockOnly;
        $[117] = t51;
    } else {
        t51 = $[117];
    }
    let t52;
    if ($[118] !== t50 || $[119] !== t51) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
            control: t50,
            label: t51
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 525,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[118] = t50;
        $[119] = t51;
        $[120] = t52;
    } else {
        t52 = $[120];
    }
    let t53;
    if ($[121] !== handleOnSaleChange) {
        t53 = (e_7)=>handleOnSaleChange(e_7.target.checked);
        $[121] = handleOnSaleChange;
        $[122] = t53;
    } else {
        t53 = $[122];
    }
    let t54;
    if ($[123] !== onSale || $[124] !== t53) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
            size: "small",
            checked: onSale,
            onChange: t53
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 542,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[123] = onSale;
        $[124] = t53;
        $[125] = t54;
    } else {
        t54 = $[125];
    }
    let t55;
    if ($[126] !== common.onSaleOnly) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            variant: "body2",
            children: common.onSaleOnly
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 551,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[126] = common.onSaleOnly;
        $[127] = t55;
    } else {
        t55 = $[127];
    }
    let t56;
    if ($[128] !== t54 || $[129] !== t55) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
            control: t54,
            label: t55
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 559,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[128] = t54;
        $[129] = t55;
        $[130] = t56;
    } else {
        t56 = $[130];
    }
    let t57;
    if ($[131] === Symbol.for("react.memo_cache_sentinel")) {
        t57 = {
            alignSelf: "flex-start"
        };
        $[131] = t57;
    } else {
        t57 = $[131];
    }
    let t58;
    if ($[132] !== common.clearFilter || $[133] !== handleClear) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
            size: "small",
            variant: "text",
            onClick: handleClear,
            sx: t57,
            children: common.clearFilter
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 577,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[132] = common.clearFilter;
        $[133] = handleClear;
        $[134] = t58;
    } else {
        t58 = $[134];
    }
    let t59;
    if ($[135] !== t30 || $[136] !== t39 || $[137] !== t47 || $[138] !== t48 || $[139] !== t52 || $[140] !== t56 || $[141] !== t58) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
            spacing: 2,
            children: [
                t30,
                t39,
                t47,
                t48,
                t52,
                t56,
                t58
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 586,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[135] = t30;
        $[136] = t39;
        $[137] = t47;
        $[138] = t48;
        $[139] = t52;
        $[140] = t56;
        $[141] = t58;
        $[142] = t59;
    } else {
        t59 = $[142];
    }
    let t60;
    if ($[143] !== t24 || $[144] !== t59) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ProductFilter$2f$ProductFilter$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productFilter,
            children: [
                t24,
                t59
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
            lineNumber: 600,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[143] = t24;
        $[144] = t59;
        $[145] = t60;
    } else {
        t60 = $[145];
    }
    return t60;
};
_s(ProductsFilterSidebarClient, "I7XqIUJBiUDyLp5+NrEmWj3RzVU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ProductsFilterSidebarClient;
const __TURBOPACK__default__export__ = ProductsFilterSidebarClient;
function _temp(cat) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
        value: cat.slug,
        children: cat.name.replace("&amp;", "&")
    }, cat.id, false, {
        fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
        lineNumber: 611,
        columnNumber: 10
    }, this);
}
function _temp2(t) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
        value: t.slug,
        children: t.name
    }, t.id, false, {
        fileName: "[project]/apps/web/src/components/ProductFilter/ProductsFilterSidebarClient.tsx",
        lineNumber: 614,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ProductsFilterSidebarClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/utils/helpers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/Product/Product.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "category": "Product-module-scss-module__P6VAlq__category",
  "img": "Product-module-scss-module__P6VAlq__img",
  "imgFallback": "Product-module-scss-module__P6VAlq__imgFallback",
  "media": "Product-module-scss-module__P6VAlq__media",
  "priceBlock": "Product-module-scss-module__P6VAlq__priceBlock",
  "productGrid": "Product-module-scss-module__P6VAlq__productGrid",
  "productInfo": "Product-module-scss-module__P6VAlq__productInfo",
  "regular": "Product-module-scss-module__P6VAlq__regular",
  "sale": "Product-module-scss-module__P6VAlq__sale",
  "saleOnRegular": "Product-module-scss-module__P6VAlq__saleOnRegular",
  "title": "Product-module-scss-module__P6VAlq__title",
});
}),
"[project]/apps/web/src/components/Product/ProductGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/i18n/LocaleProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Product/Product.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const ProductGrid = (t0)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(48);
    if ($[0] !== "264b76fae605f63689b055d3c0ce75f8c48cda80b5bdf478a86e397df8dd0eb8") {
        for(let $i = 0; $i < 48; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "264b76fae605f63689b055d3c0ce75f8c48cda80b5bdf478a86e397df8dd0eb8";
    }
    const { slug, image, name, categoryName, onSale, price, regularPrice, currency: t1 } = t0;
    const currency = t1 === undefined ? "CAD" : t1;
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    let T0;
    let T1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[1] !== categoryName || $[2] !== currency || $[3] !== image || $[4] !== locale || $[5] !== name || $[6] !== onSale || $[7] !== price || $[8] !== regularPrice || $[9] !== slug) {
        const sale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNum"])(price);
        const regular = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNum"])(regularPrice);
        const img = image;
        const imgSrc = img?.thumbnail ?? img?.src ?? img?.url ?? img?.imageSrc ?? "";
        const t10 = img?.alt ?? img?.name ?? name ?? "";
        let t11;
        if ($[20] !== t10) {
            t11 = t10.toString();
            $[20] = t10;
            $[21] = t11;
        } else {
            t11 = $[21];
        }
        const imgAlt = t11;
        const imgSizes = typeof img?.sizes === "string" ? img.sizes : undefined;
        T1 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
        t9 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productGrid;
        T0 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
        t7 = `/${locale}/products/${slug}`;
        if ($[22] !== image || $[23] !== imgAlt || $[24] !== imgSizes || $[25] !== imgSrc) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].media,
                children: image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: imgSrc,
                    alt: imgAlt,
                    sizes: imgSizes,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].img
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
                    lineNumber: 61,
                    columnNumber: 51
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imgFallback
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
                    lineNumber: 61,
                    columnNumber: 127
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
                lineNumber: 61,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0));
            $[22] = image;
            $[23] = imgAlt;
            $[24] = imgSizes;
            $[25] = imgSrc;
            $[26] = t8;
        } else {
            t8 = $[26];
        }
        t4 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productInfo;
        if ($[27] !== categoryName) {
            t5 = categoryName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].category,
                children: categoryName
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
                lineNumber: 72,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0)) : null;
            $[27] = categoryName;
            $[28] = t5;
        } else {
            t5 = $[28];
        }
        if ($[29] !== name) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: name
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
                lineNumber: 79,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0));
            $[29] = name;
            $[30] = t6;
        } else {
            t6 = $[30];
        }
        t2 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].priceBlock;
        t3 = onSale ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].saleOnRegular,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(regular, currency)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
                    lineNumber: 86,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sale,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(sale, currency)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
                    lineNumber: 86,
                    columnNumber: 99
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Product$2f$Product$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sale,
            children: sale !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(sale, currency) : ""
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
            lineNumber: 86,
            columnNumber: 171
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = categoryName;
        $[2] = currency;
        $[3] = image;
        $[4] = locale;
        $[5] = name;
        $[6] = onSale;
        $[7] = price;
        $[8] = regularPrice;
        $[9] = slug;
        $[10] = T0;
        $[11] = T1;
        $[12] = t2;
        $[13] = t3;
        $[14] = t4;
        $[15] = t5;
        $[16] = t6;
        $[17] = t7;
        $[18] = t8;
        $[19] = t9;
    } else {
        T0 = $[10];
        T1 = $[11];
        t2 = $[12];
        t3 = $[13];
        t4 = $[14];
        t5 = $[15];
        t6 = $[16];
        t7 = $[17];
        t8 = $[18];
        t9 = $[19];
    }
    let t10;
    if ($[31] !== t2 || $[32] !== t3) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
            lineNumber: 120,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[31] = t2;
        $[32] = t3;
        $[33] = t10;
    } else {
        t10 = $[33];
    }
    let t11;
    if ($[34] !== t10 || $[35] !== t4 || $[36] !== t5 || $[37] !== t6) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: [
                t5,
                t6,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
            lineNumber: 129,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[34] = t10;
        $[35] = t4;
        $[36] = t5;
        $[37] = t6;
        $[38] = t11;
    } else {
        t11 = $[38];
    }
    let t12;
    if ($[39] !== T0 || $[40] !== t11 || $[41] !== t7 || $[42] !== t8) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            href: t7,
            children: [
                t8,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
            lineNumber: 140,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[39] = T0;
        $[40] = t11;
        $[41] = t7;
        $[42] = t8;
        $[43] = t12;
    } else {
        t12 = $[43];
    }
    let t13;
    if ($[44] !== T1 || $[45] !== t12 || $[46] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T1, {
            className: t9,
            children: t12
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Product/ProductGrid.tsx",
            lineNumber: 151,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[44] = T1;
        $[45] = t12;
        $[46] = t9;
        $[47] = t13;
    } else {
        t13 = $[47];
    }
    return t13;
};
_s(ProductGrid, "ubkSS9Gz1bw7UV2c73rm/bCUdh8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = ProductGrid;
const __TURBOPACK__default__export__ = ProductGrid;
var _c;
__turbopack_context__.k.register(_c, "ProductGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/WaveDivider/WaveDivider.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bottom": "WaveDivider-module-scss-module__FKSHsW__bottom",
  "tone-cream": "WaveDivider-module-scss-module__FKSHsW__tone-cream",
  "tone-green": "WaveDivider-module-scss-module__FKSHsW__tone-green",
  "tone-orange": "WaveDivider-module-scss-module__FKSHsW__tone-orange",
  "tone-teal": "WaveDivider-module-scss-module__FKSHsW__tone-teal",
  "tone-white": "WaveDivider-module-scss-module__FKSHsW__tone-white",
  "tone-yellow": "WaveDivider-module-scss-module__FKSHsW__tone-yellow",
  "top": "WaveDivider-module-scss-module__FKSHsW__top",
  "wave": "WaveDivider-module-scss-module__FKSHsW__wave",
});
}),
"[project]/apps/web/src/components/WaveDivider/WaveDivider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WaveDivider$2f$WaveDivider$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/WaveDivider/WaveDivider.module.scss [app-client] (css module)");
;
;
;
;
const WaveDivider = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "6afe2ce716bb827db476520f68087239525963bc939833069848932dff83f58c") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6afe2ce716bb827db476520f68087239525963bc939833069848932dff83f58c";
    }
    const { tone: t1, position: t2, height: t3, className } = t0;
    const tone = t1 === undefined ? "teal" : t1;
    const position = t2 === undefined ? "top" : t2;
    const height = t3 === undefined ? 60 : t3;
    const t4 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WaveDivider$2f$WaveDivider$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][`tone-${tone}`];
    const t5 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WaveDivider$2f$WaveDivider$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][position];
    let t6;
    if ($[1] !== className || $[2] !== t4 || $[3] !== t5) {
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WaveDivider$2f$WaveDivider$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wave, t4, t5, className);
        $[1] = className;
        $[2] = t4;
        $[3] = t5;
        $[4] = t6;
    } else {
        t6 = $[4];
    }
    let t7;
    if ($[5] !== height) {
        t7 = {
            height
        };
        $[5] = height;
        $[6] = t7;
    } else {
        t7 = $[6];
    }
    let t8;
    if ($[7] !== t6 || $[8] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": true,
            className: t6,
            style: t7
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/WaveDivider/WaveDivider.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = t6;
        $[8] = t7;
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    return t8;
};
_c = WaveDivider;
const __TURBOPACK__default__export__ = WaveDivider;
var _c;
__turbopack_context__.k.register(_c, "WaveDivider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/Section/Section.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "cream": "Section-module-scss-module__d-mTCa__cream",
  "green": "Section-module-scss-module__d-mTCa__green",
  "inner": "Section-module-scss-module__d-mTCa__inner",
  "innerNoMarginTop": "Section-module-scss-module__d-mTCa__innerNoMarginTop",
  "orange": "Section-module-scss-module__d-mTCa__orange",
  "section": "Section-module-scss-module__d-mTCa__section",
  "teal": "Section-module-scss-module__d-mTCa__teal",
  "white": "Section-module-scss-module__d-mTCa__white",
  "yellow": "Section-module-scss-module__d-mTCa__yellow",
});
}),
"[project]/apps/web/src/components/Section/Section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WaveDivider$2f$WaveDivider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/WaveDivider/WaveDivider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Section$2f$Section$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Section/Section.module.scss [app-client] (css module)");
;
;
;
;
;
const Section = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "a1b662ad0e4e773edcc1761a159fed37d477d8c6618fbe41b64e4b6d18357d99") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a1b662ad0e4e773edcc1761a159fed37d477d8c6618fbe41b64e4b6d18357d99";
    }
    const { children, tone: t1, topWave, bottomWave, className } = t0;
    const tone = t1 === undefined ? "white" : t1;
    const t2 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Section$2f$Section$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][tone];
    let t3;
    if ($[1] !== className || $[2] !== t2) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Section$2f$Section$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section, t2, className);
        $[1] = className;
        $[2] = t2;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    let t4;
    if ($[4] !== topWave) {
        t4 = topWave && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WaveDivider$2f$WaveDivider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            tone: topWave,
            position: "top"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Section/Section.tsx",
            lineNumber: 34,
            columnNumber: 21
        }, ("TURBOPACK compile-time value", void 0));
        $[4] = topWave;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const t5 = !topWave ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Section$2f$Section$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].innerNoMarginTop : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Section$2f$Section$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inner;
    let t6;
    if ($[6] !== children || $[7] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Section/Section.tsx",
            lineNumber: 43,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[6] = children;
        $[7] = t5;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== bottomWave) {
        t7 = bottomWave && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$WaveDivider$2f$WaveDivider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            tone: bottomWave,
            position: "bottom"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Section/Section.tsx",
            lineNumber: 52,
            columnNumber: 24
        }, ("TURBOPACK compile-time value", void 0));
        $[9] = bottomWave;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== t3 || $[12] !== t4 || $[13] !== t6 || $[14] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: t3,
            children: [
                t4,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/Section/Section.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[11] = t3;
        $[12] = t4;
        $[13] = t6;
        $[14] = t7;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    return t8;
};
_c = Section;
const __TURBOPACK__default__export__ = Section;
var _c;
__turbopack_context__.k.register(_c, "Section");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/Category/Category.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "arrow": "Category-module-scss-module__C0EvMq__arrow",
  "arrowDisabled": "Category-module-scss-module__C0EvMq__arrowDisabled",
  "arrowLeft": "Category-module-scss-module__C0EvMq__arrowLeft",
  "arrowRight": "Category-module-scss-module__C0EvMq__arrowRight",
  "circle": "Category-module-scss-module__C0EvMq__circle",
  "fallback": "Category-module-scss-module__C0EvMq__fallback",
  "fallbackText": "Category-module-scss-module__C0EvMq__fallbackText",
  "link": "Category-module-scss-module__C0EvMq__link",
  "name": "Category-module-scss-module__C0EvMq__name",
  "section": "Category-module-scss-module__C0EvMq__section",
  "slide": "Category-module-scss-module__C0EvMq__slide",
  "title": "Category-module-scss-module__C0EvMq__title",
  "track": "Category-module-scss-module__C0EvMq__track",
  "viewport": "Category-module-scss-module__C0EvMq__viewport",
  "wrap": "Category-module-scss-module__C0EvMq__wrap",
});
}),
"[project]/apps/web/src/components/Category/CategorySlider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/embla-carousel-react/esm/embla-carousel-react.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ChevronLeftRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/icons-material/esm/ChevronLeftRounded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ChevronRightRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/icons-material/esm/ChevronRightRounded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/i18n/LocaleProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Category/Category.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const CategorySlider = (t0)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(28);
    if ($[0] !== "6ebe7b4e28a9183d418d24687fe59ca6c1cca12a4897ef836c95ac75aa970ed2") {
        for(let $i = 0; $i < 28; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6ebe7b4e28a9183d418d24687fe59ca6c1cca12a4897ef836c95ac75aa970ed2";
    }
    const { items } = t0;
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            align: "start",
            loop: true,
            skipSnaps: false
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [emblaRef, emblaApi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(t1);
    let t2;
    if ($[2] !== emblaApi) {
        t2 = (dir)=>{
            if (!emblaApi) {
                return;
            }
            const current = emblaApi.selectedScrollSnap();
            emblaApi.scrollTo(dir === "prev" ? current - 1 : current + 1);
        };
        $[2] = emblaApi;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const scrollByOne = t2;
    let t3;
    if ($[4] !== scrollByOne) {
        t3 = ()=>scrollByOne("prev");
        $[4] = scrollByOne;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ChevronLeftRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
            lineNumber: 61,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== t3) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrow} ${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowLeft}`,
            type: "button",
            onClick: t3,
            "aria-label": "Previous",
            children: t4
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = t3;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== scrollByOne) {
        t6 = ()=>scrollByOne("next");
        $[9] = scrollByOne;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ChevronRightRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== t6) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrow} ${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowRight}`,
            type: "button",
            onClick: t6,
            "aria-label": "Next",
            children: t7
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = t6;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== items || $[15] !== locale) {
        let t10;
        if ($[17] !== locale) {
            t10 = (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slide,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/${locale}/category/${item.slug}`,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].link,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].circle,
                                children: item.imageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    component: "img",
                                    src: item.imageSrc,
                                    alt: item.name,
                                    style: {
                                        maxWidth: "100%"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
                                    lineNumber: 101,
                                    columnNumber: 187
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fallback,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fallbackText,
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
                                        lineNumber: 103,
                                        columnNumber: 54
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
                                    lineNumber: 103,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
                                lineNumber: 101,
                                columnNumber: 139
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].name,
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
                                lineNumber: 103,
                                columnNumber: 121
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
                        lineNumber: 101,
                        columnNumber: 67
                    }, ("TURBOPACK compile-time value", void 0))
                }, item.slug, false, {
                    fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
                    lineNumber: 101,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0));
            $[17] = locale;
            $[18] = t10;
        } else {
            t10 = $[18];
        }
        t9 = items.map(t10);
        $[14] = items;
        $[15] = locale;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[19] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].track,
            children: t9
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
            lineNumber: 118,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[19] = t9;
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    let t11;
    if ($[21] !== emblaRef || $[22] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewport,
            ref: emblaRef,
            children: t10
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
            lineNumber: 126,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[21] = emblaRef;
        $[22] = t10;
        $[23] = t11;
    } else {
        t11 = $[23];
    }
    let t12;
    if ($[24] !== t11 || $[25] !== t5 || $[26] !== t8) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrap,
            children: [
                t5,
                t8,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/Category/CategorySlider.tsx",
            lineNumber: 135,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[24] = t11;
        $[25] = t5;
        $[26] = t8;
        $[27] = t12;
    } else {
        t12 = $[27];
    }
    return t12;
};
_s(CategorySlider, "deBTUFiig/Ept+wrpE+JDoed5yg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$LocaleProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = CategorySlider;
const __TURBOPACK__default__export__ = CategorySlider;
var _c;
__turbopack_context__.k.register(_c, "CategorySlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/Category/CategorySliderSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Section$2f$Section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Section/Section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$CategorySlider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Category/CategorySlider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Category/Category.module.scss [app-client] (css module)");
"use client";
;
;
;
;
;
const CategorySliderSection = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "95624a2e93f3ec06fdcae9ac7c045eabdba853399e380546f6129e6b970634c3") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "95624a2e93f3ec06fdcae9ac7c045eabdba853399e380546f6129e6b970634c3";
    }
    const { title: t1, items, tone, topWave, bottomWave } = t0;
    const title = t1 === undefined ? "All items" : t1;
    const t2 = tone || "green";
    let t3;
    if ($[1] !== title) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$Category$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
            children: title
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Category/CategorySliderSection.tsx",
            lineNumber: 27,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = title;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    let t4;
    if ($[3] !== items) {
        t4 = items && items.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Category$2f$CategorySlider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            items: items
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Category/CategorySliderSection.tsx",
            lineNumber: 35,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0)) : null;
        $[3] = items;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] !== bottomWave || $[6] !== t2 || $[7] !== t3 || $[8] !== t4 || $[9] !== topWave) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Section$2f$Section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            tone: t2,
            topWave: topWave,
            bottomWave: bottomWave,
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/Category/CategorySliderSection.tsx",
            lineNumber: 43,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[5] = bottomWave;
        $[6] = t2;
        $[7] = t3;
        $[8] = t4;
        $[9] = topWave;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    return t5;
};
_c = CategorySliderSection;
const __TURBOPACK__default__export__ = CategorySliderSection;
var _c;
__turbopack_context__.k.register(_c, "CategorySliderSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_1ef5af6a._.js.map