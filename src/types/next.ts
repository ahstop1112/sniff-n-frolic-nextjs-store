import "server-only";

export type LangParamsObj = { lang: string };
export type LangSlugParamsObj = { lang: string; slug: string };

export type SearchParamsObj = Record<string, string | string[] | undefined>;
export type MaybePromise<T> = T | Promise<T>;

export type PageProps<P extends object> = {
  params: MaybePromise<P>;
  searchParams?: MaybePromise<SearchParamsObj>;
};

export type Term = { id: number; slug: string };

export const unwrap = async <T>(v: MaybePromise<T>) => Promise.resolve(v);

export const unwrapSearchParams = async (
  v?: MaybePromise<SearchParamsObj>,
): Promise<SearchParamsObj> => (v ? await unwrap(v) : {});
