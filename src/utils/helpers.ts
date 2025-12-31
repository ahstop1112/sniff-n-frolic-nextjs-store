export const shuffleArray = (arr: any[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getStr = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export const collectDescendantIds = (all: any[], rootId: number) => {
  const ids: number[] = [];
  const walk = (id: number) => {
    ids.push(id);
    all.filter((c) => c.parent === id).forEach((child) => walk(child.id));
  };
  walk(rootId);
  return ids;
};
