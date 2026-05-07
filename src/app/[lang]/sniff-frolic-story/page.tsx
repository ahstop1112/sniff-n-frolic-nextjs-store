import { notFound } from "next/navigation";
import { Typography, Box, Divider } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Section from "@/components/Section";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import { PageProps, LangParamsObj } from "@/types/next";

type OurStoryPageProps = PageProps<LangParamsObj>;

const OurStoryPage = async ({ params }: OurStoryPageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [];
  breadcrumbs.push({
    label: dict.nav.ourStory,
  });

  return (
    <>
      {/* ── Hero ── */}
      <Section tone="cream"  bottomWave="teal" className="pageHeader story-bg">
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Typography className="tagline">
            {dict.story.heroTagline}
          </Typography>
          <h1 className="orange">
            {dict.story.heroTitle}
          </h1>
        </Box>
      </Section>
 
      {/* ── Fei Fei's Note ── */}
      <Section tone="teal" bottomWave="white">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            py: { xs: 4, md: 6 },
          }}
        >
          {/* Photo */}
          <Box
            component="img"
            src="/images/feifei.jpg"
            alt="Fei Fei the Corgi"
            sx={{
              width: { xs: "100%", md: 320 },
              maxWidth: 320,
              borderRadius: 4,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          {/* Text */}
          <Box>
            <h3 className="note-title">{dict.story.feifeiNoteTitle}</h3>
            {dict.story.feifeiNote.split("\n").map((line, i) => (
              <Typography key={i} variant="body1" sx={{ mb: 1 }}>
                {line}
              </Typography>
            ))}
            <p>
              With love,<br/>
              Fei Fei 🐾<br/>
              Chief Happiness Officer (CEO)
            </p>
          </Box>
        </Box>
      </Section>
 
      {/* ── Our Beginning ── */}
      <Section tone="white" bottomWave="cream">
        <Box sx={{  textAlign: "center" }}>
          <Typography className="orange" variant="h3" sx={{ mb: 2 }}>{dict.story.beginningTitle}</Typography>
          <Typography className="brown" variant="body1" sx={{ mb: 2, fontSize: `1.15rem` }}>
            {dict.story.beginningBody}
          </Typography>
          <Typography className="orange" variant="h4" sx={{ mb: 2 }}>{dict.story.beginningBody2}</Typography>
          <Typography className="brown" variant="body1" sx={{ mb: 2, fontSize: `1.15rem` }}>
            {dict.story.beginningBody3}
          </Typography>
          <Typography className="brown" variant="body1" sx={{ mb: 2, fontSize: `1.15rem` }}>{dict.story.nameOriginBody}</Typography>
        </Box>
      </Section>
    </>
  );
};

export default OurStoryPage;
