// src/app/[lang]/about/page.tsx
import { notFound } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageParams } from "@/types/next";

interface AboutPageProps {
  params: PageParams;
}

const AboutPage = async ({ params }: AboutPageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {dict.nav.ourStory}
      </Typography>
      <Typography variant="body1" mt={2}>
        This is a headless demo storefront built with Next.js and WooCommerce
        for portfolio and job applications.
      </Typography>
    </Box>
  );
};

export default AboutPage;
