import clsx from "clsx";
import { SectionTone } from "../Section/types";
export type WavePosition = "top" | "bottom";

import styles from "./WaveDivider.module.scss";

type Props = {
  tone?: SectionTone;
  position?: WavePosition;
  height?: number; // px
  className?: string;
};

const WaveDivider = ({
  tone = "teal",
  position = "top",
  height = 60,
  className,
}: Props) => {
  return (
    <div
      aria-hidden
      className={clsx(
        styles.wave,
        styles[`tone-${tone}`],
        styles[position],
        className
      )}
      style={{ height }}
    />
  );
};

export default WaveDivider;