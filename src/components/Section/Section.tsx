import clsx from "clsx";
import WaveDivider from "../WaveDivider/WaveDivider";
import { SectionProps } from "./types";
import styles from "./Section.module.scss";

const Section = ({
  children,
  tone = "white",
  topWave,
  bottomWave,
  className,
}: SectionProps) => {
  return (
    <section className={clsx(styles.section, styles[tone], className)}>
      {topWave && <WaveDivider tone={topWave} position="top" />}
      <div className={!topWave ? styles.innerNoMarginTop : styles.inner}>{children}</div>
      {bottomWave && <WaveDivider tone={bottomWave} position="bottom" />}
    </section>
  );
};

export default Section;