import { notFound } from "next/navigation";
import { Box, Typography, List, ListItem } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Section from "@/components/Section";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import { PageProps, LangParamsObj } from "@/types/next";

type RefundReturnPageProps = PageProps<LangParamsObj>;

const RefundReturnPage = async ({ params }: RefundReturnPageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);
  const breadcrumbs: BreadcrumbItem[] = [{ label: dict.refundReturn.breadcrumb }];

  return (
    <>
    <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav isProduct={false} items={breadcrumbs} />
          <h1> {dict.refundReturn.title}</h1>
    </Section>
    <Section tone="white" topWave="teal" bottomWave="cream">
        <Typography variant="body1" sx={{ mb: 0.5 }}>{dict.refundReturn.intro}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {dict.refundReturn.lastUpdated}
        </Typography>

        {/* Returns */}
        <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.refundReturn.returnsTitle}</Typography>
        <Typography variant="body1" className="brown" sx={{ mb: 2 }}>{dict.refundReturn.returnsWindow}</Typography>
        <Typography variant="body1" className="brown" fontWeight={700} sx={{ mb: 1 }}>{dict.refundReturn.eligibilityTitle}</Typography>
        <List dense sx={{ listStyleType: "disc", pl: 3, mb: 2 }}>
            {dict.refundReturn.eligibilityItems.map((item: string) => (
                <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
                </ListItem>
            ))}
        </List>
        <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>{dict.refundReturn.startReturnTitle}</Typography>
        <List dense sx={{ listStyleType: "disc", pl: 3, mb: 4 }}>
            {dict.refundReturn.startReturnItems.map((item: string) => (
                <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
                </ListItem>
            ))}
        </List>

          {/* Refunds */}
          <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.refundReturn.refundsTitle}</Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>{dict.refundReturn.refundsDesc}</Typography>

          {/* Exchanges */}
          <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.refundReturn.exchangesTitle}</Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>{dict.refundReturn.exchangesDesc}</Typography>

          {/* Damaged / Incorrect */}
          <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.refundReturn.damagedTitle}</Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>{dict.refundReturn.damagedDesc}</Typography>

          {/* Contact */}
          <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.refundReturn.contactTitle}</Typography>
          <Typography variant="body1">
            📧{" "}
            <Box
              component="a"
              href="mailto:woof@sniffnfrolic.com"
              sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              woof@sniffnfrolic.com
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>📍 {dict.refundReturn.location}</Typography>
          <Typography variant="body1">{dict.refundReturn.thankYou}</Typography>
      </Section>
    </>
  );
};

export default RefundReturnPage;