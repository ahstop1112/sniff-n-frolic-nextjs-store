"use client";
import { CategorySliderSectionProps } from "./types";
import Section from "@/components/Section/Section";
import CategorySlider from "./CategorySlider";
import styles from "./Category.module.scss";

const CategorySliderSection = ({
  title = "All items",
  items,
  tone,
  topWave,
  bottomWave,
}: CategorySliderSectionProps) => {
  return (
    <Section tone={tone || "green"} topWave={topWave} bottomWave={bottomWave}>
      <h1 className={styles.title}>{title}</h1>
      {items && items.length > 0 ? (
        <CategorySlider items={items} />
      ) : null}
    </Section>
  );
};

export default CategorySliderSection;
