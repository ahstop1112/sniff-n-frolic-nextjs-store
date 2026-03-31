/**
 * Normalize a URL pathname for comparison
 *
 * Rules:
 * - always starts with "/"
 * - remove query string & hash
 * - remove trailing slash (except "/")
 * - collapse empty to "/"
 *
 * Examples:
 *  "/en/products/"      -> "/en/products"
 *  "/products?x=1"      -> "/products"
 *  "products/"          -> "/products"
 *  "/"                  -> "/"
 */
export const normalizePath = (input: string): string => {
  if (!input) return "/";

  // remove query & hash
  const noQuery = input.split("?")[0].split("#")[0];

  // ensure leading slash
  let path = noQuery.startsWith("/") ? noQuery : `/${noQuery}`;

  // remove trailing slash (except root)
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path || "/";
};
