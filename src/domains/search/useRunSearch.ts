"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";
import { buildSearchHref } from "./buildSearchHref";

export type UseRunSearchArgs = {
  searchPath?: string;
  onClose?: () => void; // optional (mobile menu / overlay)
  onAfterRun?: () => void; // optional (clear input etc.)
};

export const useRunSearch = ({
  searchPath,
  onClose,
  onAfterRun,
}: UseRunSearchArgs) => {
  const locale = useLocale();
  const router = useRouter();

  const runSearch = useCallback(
    (q: string, cat?: string) => {
      const href = buildSearchHref({ locale, q, cat, searchPath });

      // ✅ close first to avoid flash
      onClose?.();
      router.push(href);

      onAfterRun?.();
    },
    [locale, searchPath, onClose, onAfterRun, router],
  );

  return { runSearch };
};
