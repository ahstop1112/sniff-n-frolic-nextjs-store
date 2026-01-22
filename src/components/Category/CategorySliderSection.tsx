"use client";

import { Box } from "@mui/material";
import { CategorySliderProps } from "./types";
import Section from "@/components/Section/Section";
import CategorySlider from "./CategorySlider";
import styles from './Category.module.scss'

const CategorySliderSection = ({
    title = "All items",
    items,
    lang,
    tone,
    topWave,
    bottomWave
}: CategorySliderProps) => {
    return (
        <Section
            tone={tone || "green"}
            topWave={topWave}
            bottomWave={bottomWave}
        >
            <h1 className={styles.title}>{title}</h1>
            {items && items.length > 0 ? <CategorySlider items={items} lang={lang} /> : null}
        </Section>
  );
};

export default CategorySliderSection;