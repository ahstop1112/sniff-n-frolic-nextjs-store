import { notFound } from "next/navigation";
import { Box, Typography, List, ListItem } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Section from "@/components/Section";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import { PageProps, LangParamsObj } from "@/types/next";

type ShippingPolicyPageProps = PageProps<LangParamsObj>;

const ShippingPolicyPage = async ({ params }: ShippingPolicyPageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);
  const breadcrumbs: BreadcrumbItem[] = [{ label: dict.shippingPolicy.breadcrumb }];

  return (
    <>
      <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav isProduct={false} items={breadcrumbs} />
        <h1> {dict.shippingPolicy.title}</h1>
      </Section>
      <Section tone="white" topWave="teal" bottomWave="cream">
        <Typography variant="body1" sx={{ mb: 0.5 }}>{dict.shippingPolicy.intro}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {dict.shippingPolicy.lastUpdated}
        </Typography>
  
        {/* Processing Time */}
        <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.shippingPolicy.processingTitle}</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>{dict.shippingPolicy.processingDesc}</Typography>

        {/* Shipping Methods */}
        <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.shippingPolicy.methodsTitle}</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>{dict.shippingPolicy.methodsDesc}</Typography>

        {/* Estimated Delivery */}
        <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.shippingPolicy.deliveryTitle}</Typography>
        <List dense sx={{ listStyleType: "disc", pl: 3, mb: 1 }}>
          {dict.shippingPolicy.deliveryItems.map((item: string) => (
            <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
              <Typography variant="body1">{item}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {dict.shippingPolicy.deliveryNote}
        </Typography>

        {/* Shipping Fees */}
        <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.shippingPolicy.feesTitle}</Typography>
        <List dense sx={{ listStyleType: "disc", pl: 3, mb: 4 }}>
          {dict.shippingPolicy.feesItems.map((item: string) => (
            <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
              <Typography variant="body1">{item}</Typography>
            </ListItem>
          ))}
        </List>

        {/* Lost or Stolen */}
        <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.shippingPolicy.lostTitle}</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>{dict.shippingPolicy.lostDesc}</Typography>

        {/* Local Pickup */}
        <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.shippingPolicy.pickupTitle}</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>{dict.shippingPolicy.pickupDesc}</Typography>

        {/* Contact */}
        <Typography variant="h5" component="h5" className="orange" gutterBottom>{dict.shippingPolicy.contactTitle}</Typography>
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
        <Typography variant="body1" sx={{ mb: 3 }}>📍 {dict.shippingPolicy.location}</Typography>
        <Typography variant="body1">{dict.shippingPolicy.thankYou}</Typography>
      </Section>
    </>
  );
};

export default ShippingPolicyPage;