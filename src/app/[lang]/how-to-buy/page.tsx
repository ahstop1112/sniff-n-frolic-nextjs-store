import { notFound } from "next/navigation";
import {
  Box, Container, Link, List, ListItem, Typography,
  Accordion, AccordionSummary, AccordionDetails,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isValidLocale, type Locale } from "@/i18n/config";
import Section from "@/components/Section";
import { LangParamsObj, PageProps } from "@/types/next";
import { getDictionary } from "@/i18n/dictionaries";

type HowToBuyPageProps = PageProps<LangParamsObj>;

const HowToBuyPage = async ({ params }: HowToBuyPageProps) => {
  const { lang } = await params;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  return (
    <Section tone="white" bottomWave="cream">
      <Box>
        <Typography variant="h4" component="h4" gutterBottom>
          {dict.howToBuy.title}
        </Typography>
      </Box>
      <Accordion defaultExpanded disableGutters
        elevation={0}
        square
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h5" component="h5">{dict.howToBuy.step1Title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {dict.howToBuy.step1Desc}<br />
          {dict.howToBuy.step1Desc2}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded disableGutters
        elevation={0}
        square
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h5" component="h5">{dict.howToBuy.step2Title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {dict.howToBuy.step2Desc}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded disableGutters
        elevation={0}
        square
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography variant="h5" component="h5">{dict.howToBuy.step3Title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {dict.howToBuy.step3Desc}
          <List dense sx={{ listStyleType: "disc", pl: 3 }}>
            {dict.howToBuy.payments.map((item) => (
              <ListItem key={item} sx={{ display: "list-item", py: 0.25 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>
           {dict.howToBuy.step3Desc2}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded disableGutters
        elevation={0}
        square
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography variant="h5" component="h5">{dict.howToBuy.step4Title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{dict.howToBuy.shippingOption}</TableCell>
                <TableCell>{dict.howToBuy.details}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell scope="row">
                  {dict.howToBuy.standard}
                </TableCell>
                <TableCell>{dict.howToBuy.standardDesc}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                  {dict.howToBuy.international}
                </TableCell>
                <TableCell>{dict.howToBuy.internationalDesc}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded disableGutters
        elevation={0}
        square
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          <Typography variant="h5" component="h5">{dict.howToBuy.step5Title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {dict.howToBuy.step5Desc}<br/>
          {dict.howToBuy.step5Desc2}<br/>
        </AccordionDetails>
      </Accordion>
    </Section>
  );
};

export default HowToBuyPage;
