"use client";

import { Box } from "@mui/material";
import { CategorySliderProps } from "./types";
import CategorySlider from "./CategorySlider";
import styles from './Category.module.scss'

const CategorySliderSection = ({
    title = "All items",
    items,
    bgColor = "#063F53",
    lang
}: CategorySliderProps) => {
    return (
        <Box
            component="section"
            className={styles.section}
            sx={{  backgroundColor: bgColor }}
        >
            <h3 className={styles.title}>{title}</h3>
            <CategorySlider items={items} lang={lang}/>
    </Box>
  );
};

export default CategorySliderSection;