
import { notFound } from "next/navigation";
import { Box, List, ListItem, Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import Section from "@/components/Section";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import { LangParamsObj, PageProps } from "@/types/next";
import { getDictionary } from "@/i18n/dictionaries";

type TermsConditionsPageProps = PageProps<LangParamsObj>;

const TermsConditionsPage = async ({ params }: TermsConditionsPageProps) => {
  const { lang } = await params;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);
  const breadcrumbs: BreadcrumbItem[] = [{ label: dict.terms.breadcrumb }];

  const sections = [
    { title: dict.terms.generalTitle, items: dict.terms.general },
    { title: dict.terms.productTitle, items: dict.terms.product },
    { title: dict.terms.ordersTitle, items: dict.terms.orders },
    { title: dict.terms.shippingTitle, items: dict.terms.shipping },
    { title: dict.terms.returnsTitle, items: dict.terms.returns },
    { title: dict.terms.ipTitle, items: dict.terms.ip },
    { title: dict.terms.privacyTitle, items: dict.terms.privacy },
    { title: dict.terms.liabilityTitle, items: dict.terms.liability },
    { title: dict.terms.changesTitle, items: dict.terms.changes },
    { title: dict.terms.lawTitle, items: dict.terms.law },
  ];

  return (
    <>
      <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav isProduct={false} items={breadcrumbs} />
        <h1> {dict.terms.title}</h1>
      </Section>
      <Section tone="white" topWave="teal" bottomWave="cream">
        <Typography variant="body1" sx={{ mb: 4 }}>{dict.terms.intro}</Typography>

        {sections.map((section) => (
          <Box key={section.title} sx={{ mb: 3 }}>
            <Typography variant="h5" component="h5" className="orange" gutterBottom>
              {section.title}
            </Typography>
            <List dense sx={{ listStyleType: "disc", pl: 3 }}>
              {section.items.map((item: string) => (
                <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                  <Typography variant="body1">{item}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          {dict.terms.lastUpdated}
        </Typography>
      </Section>
    </>
  );
};

export default TermsConditionsPage;

