import "server-only";

const getApiBase = () => {
  const base = process.env.API_BASE_URL;
  if (!base) throw new Error("Missing API_BASE_URL");
  return base.replace(/\/$/, "");
};

export type ApiFetchOptions = {
  searchParams?: Record<string, any>;
  next?: {
    revalidate?: number | false;
  };
  cache?: RequestCache;
};

export const apiFetch = async <T>(
  path: string,
  options?: ApiFetchOptions,
): Promise<T> => {
  const base = getApiBase();
  const cleanPath = path.replace(/^\/+/, "");
  const url = new URL(`${base}/${cleanPath}`);

  if (options?.searchParams) {
    Object.entries(options.searchParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    ...(options?.cache ? { cache: options.cache } : {}),
    next: options?.next,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("API error:", res.status, res.statusText, url.toString(), text);
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
};