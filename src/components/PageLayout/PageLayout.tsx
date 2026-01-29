import clsx from "clsx";
import WaveDivider from "../WaveDivider/WaveDivider";
import { PageLayoutProps } from "./types";
import styles from "./PageLayout.module.scss";

const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <section className={clsx(styles.pageLayout, className)}>
      <div className={styles.pageLayoutContent}>{children}</div>
      <WaveDivider tone="cream" position="bottom" />
    </section>
  );
};

export default PageLayout;
