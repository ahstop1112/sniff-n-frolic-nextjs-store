import clsx from "clsx";
import styles from "./Section.module.scss";
import WaveDivider, { WaveTone } from "../WaveDivider/WaveDivider";

type SectionTone = "teal" | "white" | "yellow" | "orange";

type Props = {
  children: React.ReactNode;
  tone?: SectionTone;

  topWave?: WaveTone;
  bottomWave?: WaveTone;

  className?: string;
};

const Section = ({
  children,
  tone = "white",
  topWave,
  bottomWave,
  className,
}: Props) => {
  return (
    <section className={clsx(styles.section, styles[tone], className)}>
      {topWave && <WaveDivider tone={topWave} position="top" />}
      <div className={!topWave ? styles.innerNoMarginTop : styles.inner}>{children}</div>
      {bottomWave && <WaveDivider tone={bottomWave} position="bottom" />}
    </section>
  );
};

export default Section;