import clsx from "clsx";
import styles from "./WaveDivider.module.scss";

export type WaveTone = "teal" | "white" | "yellow" | "orange";
export type WavePosition = "top" | "bottom";

type Props = {
  tone?: WaveTone;
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