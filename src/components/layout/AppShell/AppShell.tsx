import { type Locale } from "@/i18n/config";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./AppShell.module.scss";

const AppShell = ({ locale, children }: { locale: Locale, children: React.ReactNode }) => {
  return (
    <div className={styles.shell}>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
};

export default AppShell;