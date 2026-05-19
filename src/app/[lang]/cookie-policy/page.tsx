import { notFound } from "next/navigation";
import { Box, Container, Link, List, ListItem, Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import Section from "@/components/Section";
import { LangParamsObj, PageProps } from "@/types/next";
import { getDictionary } from "@/i18n/dictionaries";

type CookiePolicyPageProps = PageProps<LangParamsObj>;

const CookiePolicyPage = async ({ params }: CookiePolicyPageProps) => {
  const { lang } = await params;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  return (
    <Section tone="white" bottomWave="cream">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <Typography variant="h4" component="h4" gutterBottom>
            {dict.cookiePolicy.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {dict.cookiePolicy.updated}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" component="h5" gutterBottom>
            {dict.cookiePolicy.introTitle}
          </Typography>

          <Typography variant="body1" paragraph>
            {dict.cookiePolicy.intro1}{" "}
                <Link href="https://sniffnfrolic.com" target="_blank" rel="noopener noreferrer">
                  https://sniffnfrolic.com
                </Link>{". "}
            {dict.cookiePolicy.intro2}
          </Typography>

          <Typography variant="body1">
            {dict.cookiePolicy.intro3}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.cookieTitle}
          </Typography>

          <Typography variant="body1">
            {dict.cookiePolicy.cookieDesc}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.scriptsTitle}
          </Typography>

          <Typography variant="body1">
            {dict.cookiePolicy.scriptsDesc}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.beaconTitle}
          </Typography>
          <Typography variant="body1">
            {dict.cookiePolicy.beaconDesc}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.thirdPartyTitle}
          </Typography>
          <Typography variant="body1">
            {dict.cookiePolicy.thirdPartyDesc}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.typesTitle}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                {dict.cookiePolicy.functionalTitle}
              </Typography>
              <Typography variant="body1">
                {dict.cookiePolicy.functionalDes}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                {dict.cookiePolicy.statisticsTitle}
              </Typography>
              <Typography variant="body1">
                {dict.cookiePolicy.statisticsDesc}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                {dict.cookiePolicy.marketingTitle}
              </Typography>
              <Typography variant="body1">
                {dict.cookiePolicy.marketingDesc}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                {dict.cookiePolicy.socialTitle}
              </Typography>
              <Typography variant="body1">
                {dict.cookiePolicy.socialDesc}
              </Typography>
              <br/>
              <Typography variant="body1">
                {dict.cookiePolicy.socialDesc2}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.cookiesTitle}
          </Typography>

          <Typography variant="body1" paragraph>
            {}
          </Typography>

          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.cookiePolicy.tools.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {dict.cookiePolicy.usageTitle}
          </Typography>

          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.cookiePolicy.usages.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.consentTitle}
          </Typography>
          <Typography variant="body1" paragraph>
            {dict.cookiePolicy.consentDesc}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.manageTitle}
          </Typography>
          <Typography variant="body1" paragraph>{dict.cookiePolicy.manageDesc}</Typography>
          <Typography variant="body1" paragraph>{dict.cookiePolicy.manageDesc2}</Typography>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.rightsTitle}
          </Typography>

          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.cookiePolicy.rights.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {dict.cookiePolicy.contactTitle}
          </Typography>

          <Typography variant="body1" paragraph>
            {dict.cookiePolicy.contactTitle}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="body1">Sniff &amp; Frolic</Typography>
            <Typography variant="body1">Burnaby, BC, Canada</Typography>
            <Typography variant="body1">
              Website: <Link href="https://sniffnfrolic.com" target="_blank" rel="noopener noreferrer">
                https://sniffnfrolic.com
              </Link>
            </Typography>
            <Typography variant="body1">
              Email: <Link href="mailto:woof@sniffnfrolic.com">woof@sniffnfrolic.com</Link>
            </Typography>
            <Typography variant="body1">
              This Cookie Policy was synchronized with <a href="http://cookiedatabase.org" target="_blank">cookiedatabase.org</a> on September 12, 2025.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

export default CookiePolicyPage;
