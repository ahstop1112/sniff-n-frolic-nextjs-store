export const getCategoryIdBySlug = async (slug: string) => {
  const s = slug.trim();
  return s || undefined;
};
