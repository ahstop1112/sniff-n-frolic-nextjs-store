type WooHttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type WooFetchOptions = {
  searchParams?: Record<string, any>;
  method?: WooHttpMethod;
  bodyJson?: any;
  cache?: RequestCache;
};

const getWooEnv = () => {
  const baseUrlEnv = process.env.WOO_API_BASE_URL;
  const consumerKey = process.env.WOO_CONSUMER_KEY;
  const consumerSecret = process.env.WOO_CONSUMER_SECRET;

  if (!baseUrlEnv || !consumerKey || !consumerSecret) {
    throw new Error("WooCommerce API env vars are missing");
  }

  const baseUrl = baseUrlEnv.replace(/\/$/, "");
  if (!baseUrl.startsWith("http")) {
    throw new Error(
      `WOO_API_BASE_URL is invalid. Current value: "${baseUrl}". It must start with http(s)://`
    );
  }

  return { baseUrl, consumerKey, consumerSecret };
};

const buildAuthHeader = () => {
  const { consumerKey, consumerSecret } = getWooEnv();
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  return `Basic ${auth}`;
};

export const wooFetchServer = async <T>(
  path: string,
  paramsOrOptions?:
    | Record<string, string | number | boolean | undefined>
    | WooFetchOptions
): Promise<T> => {
  const { baseUrl } = getWooEnv();

  let params: Record<string, any> | undefined;
  let method: WooHttpMethod = "GET";
  let bodyJson: any | undefined;
  let cache: RequestCache = "no-store";

  if (
    paramsOrOptions &&
    typeof paramsOrOptions === "object" &&
    ("method" in paramsOrOptions ||
      "bodyJson" in paramsOrOptions ||
      "searchParams" in paramsOrOptions)
  ) {
    const opts = paramsOrOptions as WooFetchOptions;
    params = opts.searchParams;
    method = opts.method ?? "GET";
    bodyJson = opts.bodyJson;
    cache = opts.cache ?? "no-store";
  } else {
    params = paramsOrOptions as Record<string, any> | undefined;
  }

  const cleanPath = path.replace(/^\/+/, "");
  const trimmedBase = baseUrl.replace(/\/+$/, "");
  const url = new URL(`${trimmedBase}/${cleanPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      Authorization: buildAuthHeader(),
      ...(bodyJson ? { "Content-Type": "application/json" } : {}),
    },
    body: bodyJson ? JSON.stringify(bodyJson) : undefined,
    cache,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(
      "Woo API error:",
      res.status,
      res.statusText,
      url.toString(),
      text
    );
    throw new Error(`Woo API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
};

const getWooAuthHeader = () => {
  const ck = process.env.WOO_CONSUMER_KEY;
  const cs = process.env.WOO_CONSUMER_SECRET;
  if (!ck || !cs)
    throw new Error("Missing WOO_CONSUMER_KEY/WOO_CONSUMER_SECRET");
  const auth = Buffer.from(`${ck}:${cs}`).toString("base64");
  return `Basic ${auth}`;
};

const getWooBase = () => {
  const base = process.env.WOO_API_BASE_URL;
  if (!base) throw new Error("Missing WOO_API_BASE_URL");
  return base;
};

export const wooPost = async <T>(path: string, body: any): Promise<T> => {
  const base = getWooBase();
  const url = new URL(`${base}/wp-json/wc/v3/${path}`);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: getWooAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Woo POST failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
};
