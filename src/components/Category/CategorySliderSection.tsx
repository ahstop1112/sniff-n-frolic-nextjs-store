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
            <h2 className={styles.title}>{title}</h2>
            <CategorySlider items={items} lang={lang}/>
    </Box>
  );
};

export default CategorySliderSection;