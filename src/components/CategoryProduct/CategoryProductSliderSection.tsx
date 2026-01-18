"use client";

import { Box } from "@mui/material";
import { CateogryProductSliderProps } from "./types";
import Section from '@/components/Section/Section';
import CategoryProductSlider from "./CategoryProductSlider";
import styles from './CategoryProduct.module.scss'

const CategoryProductSliderSection = ({
    title,
    desc,
    items,
    tone,
    locale,
    topWave,
    bottomWave
}: CateogryProductSliderProps) => {
    const className = tone === "white" ? styles.bgWhite : tone === "orange" ? styles.bgOrange : ``;
    return (
        <Section tone={tone} topWave={topWave} bottomWave={bottomWave} className={`${styles.categoryProductSection} ${className}`}>
            <h2 className={styles.title}>{title}</h2>
            <h4 className={styles.desc}>{desc}</h4>
            <CategoryProductSlider items={items} title={title} desc={desc} locale={locale} />
        </Section>
  );
};

export default CategoryProductSliderSection;