"use client";

import { Box } from "@mui/material";
import { CategorySliderProps } from "./types";
import CategorySlider from "./CategorySlider";
import styles from './Category.module.scss'

const CategorySliderSection = ({
    title = "All items",
    items,
    lang
}: CategorySliderProps) => {
    return (
        <Box
            component="section"
            className={styles.section}
        >
            <h1 className={styles.title}>{title}</h1>
            {items && items.length > 0 ? <CategorySlider items={items} lang={lang} /> : null}
    </Box>
  );
};

export default CategorySliderSection;