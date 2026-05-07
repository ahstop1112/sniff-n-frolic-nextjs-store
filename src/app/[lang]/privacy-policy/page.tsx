import { notFound } from "next/navigation";
import { Box, List, ListItem, Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import Section from "@/components/Section";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import { LangParamsObj, PageProps } from "@/types/next";
import { getDictionary } from "@/i18n/dictionaries";

type PrivacyPolicyPageProps = PageProps<LangParamsObj>;

const PrivacyPolicyPage = async ({ params }: PrivacyPolicyPageProps) => {
  const { lang } = await params;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);
  const breadcrumbs: BreadcrumbItem[] = [{ label: dict.howToBuy.breadcrumb }];

  return (
    <>
      <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav isProduct={false} items={breadcrumbs} />
        <h1> {dict.privacyPolicy.title}</h1>
      </Section>
      <Section tone="white" topWave="teal" bottomWave="cream">
          <Typography variant="body1" className="brown" sx={{ mb: 2 }}>
            {dict.privacyPolicy.desc}
          </Typography>
          <Typography variant="h5" component="h5" className="orange" gutterBottom  sx={{ mb: 2 }}>
            {dict.privacyPolicy.infoTitle}
          </Typography>

          <Typography variant="body1" paragraph  sx={{ mb: 2 }}>
            {dict.privacyPolicy.infoDesc}
          </Typography>

          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.privacyPolicy.info.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>
          <Typography variant="h5" component="h5" className="orange" gutterBottom  sx={{ mb: 2 }}>
              {dict.privacyPolicy.personalInfoTitle}
            </Typography>

            <Typography variant="body1" paragraph  sx={{ mb: 2 }}>
              {dict.privacyPolicy.personalInfoDesc}
            </Typography>

            <List dense sx={{ listStyleType: "disc", pl: 3 }}>
              {dict.privacyPolicy.personalInfo.map((item) => (
                <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                  <Typography variant="body1">{item}</Typography>
                </ListItem>
              ))}
            </List>
          <Typography variant="h5" component="h5" className="orange" gutterBottom  sx={{ mb: 2 }}>
            {dict.privacyPolicy.disclosureTitle}
          </Typography>

          <Typography variant="body1" paragraph  sx={{ mb: 2 }}>
            {dict.privacyPolicy.disclosureDesc}
          </Typography>

          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.privacyPolicy.disclosure.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" component="h5" className="orange" gutterBottom  sx={{ mb: 2 }}>
            {dict.privacyPolicy.cookiesTitle}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {dict.privacyPolicy.cookiesDesc}
          </Typography>

          <Typography variant="h5" component="h2" className="orange" gutterBottom  sx={{ mb: 2 }}>
            {dict.privacyPolicy.rightsTitle}
          </Typography>

          <Typography variant="body1"  sx={{ mb: 2 }}>
            {dict.privacyPolicy.rightsDesc}
          </Typography>

          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.privacyPolicy.rights.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>
      </Section>
    </>
  );
};

export default PrivacyPolicyPage;