import { notFound } from "next/navigation";
import { Box, Container, Link, List, ListItem, Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import Section from "@/components/Section";
import { LangParamsObj, PageProps } from "@/types/next";
import { getDictionary } from "@/i18n/dictionaries";

type PrivacyPolicyPageProps = PageProps<LangParamsObj>;

const PrivacyPolicyPage = async ({ params }: PrivacyPolicyPageProps) => {
  const { lang } = await params;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  return (
    <Section tone="white" bottomWave="cream">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <Typography variant="h4" component="h4" gutterBottom>
            {dict.privacyPolicy.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {dict.privacyPolicy.desc}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" component="h5" gutterBottom>
            {dict.privacyPolicy.disclosureTitle}
          </Typography>

          <Typography variant="body1" paragraph>
            {dict.privacyPolicy.disclosureDesc}
          </Typography>

          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.privacyPolicy.disclosure.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>

        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.privacyPolicy.cookiesTitle}
          </Typography>

          <Typography variant="body1">
            {dict.privacyPolicy.cookiesDesc}
          </Typography>
        </Box>

         <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.privacyPolicy.rightsTitle}
          </Typography>

          <Typography variant="body1">
            {dict.privacyPolicy.rightsDesc}
          </Typography>

          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.privacyPolicy.rights.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Section>
  );
};

export default PrivacyPolicyPage;
