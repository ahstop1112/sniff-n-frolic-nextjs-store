import { notFound } from "next/navigation";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Section from "@/components/Section";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import { PageProps, LangParamsObj } from "@/types/next";

type FaqPageProps = PageProps<LangParamsObj>;

const accordionSx = {
  backgroundColor: "transparent",
  boxShadow: "none",
  "&:before": { display: "none" },
} as const;

const FaqPage = async ({ params }: FaqPageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const breadcrumbs: BreadcrumbItem[] = [{ label: dict.faq.breadcrumb }];

  return (
    <>
      <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav isProduct={false} items={breadcrumbs} />
        <h1> {dict.faq.title}</h1>
      </Section>
      <Section tone="white" topWave="teal" bottomWave="cream">
        <Typography variant="h4" className="orange" sx={{ mb: 3 }}>
          {dict.faq.subtitle}
        </Typography>

        {/* Returns & Cancellations */}
        <Typography variant="h5" component="h5" sx={{ mt: 3, mb: 1 }}>
          {dict.faq.returnsTitle}
        </Typography>

        <Accordion defaultExpanded disableGutters elevation={0} square sx={accordionSx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h5" className="orange">{dict.faq.q1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{dict.faq.a1}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded disableGutters elevation={0} square sx={accordionSx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h5" className="orange">{dict.faq.q2}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{dict.faq.a2}</Typography>
          </AccordionDetails>
        </Accordion>

        {/* Payments */}
        <Typography variant="h5" component="h5" sx={{ mt: 4, mb: 1 }}>
          {dict.faq.paymentsTitle}
        </Typography>

        <Accordion defaultExpanded disableGutters elevation={0} square sx={accordionSx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h5" className="orange">{dict.faq.q3}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{dict.faq.a3}</Typography>
          </AccordionDetails>
        </Accordion>

        {/* Fun Stuff */}
        <Typography variant="h5" component="h5" sx={{ mt: 4, mb: 1 }}>
          {dict.faq.funTitle}
        </Typography>

        <Accordion defaultExpanded disableGutters elevation={0} square sx={accordionSx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h5" className="orange">{dict.faq.q4}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{dict.faq.a4}</Typography>
          </AccordionDetails>
        </Accordion>

        {/* Contact CTA */}
        <Box sx={{ mt: 5, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography variant="body1">
            {dict.faq.contactLabel}{" "}
            <Box
              component="a"
              href="mailto:woof@sniffnfrolic.com"
              sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              woof@sniffnfrolic.com
            </Box>
          </Typography>
        </Box>
      </Section>
    </>
  );
};

export default FaqPage;