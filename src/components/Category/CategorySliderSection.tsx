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
}: CategorySliderProps) => {
    return (
        <Section
            tone="green"
            topWave="white"
            bottomWave="cream"
        >
            <h1 className={styles.title}>{title}</h1>
            {items && items.length > 0 ? <CategorySlider items={items} lang={lang} /> : null}
        </Section>
  );
};

export default CategorySliderSection;