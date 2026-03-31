import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./AppShell.module.scss";
import CookieConsent from "@/components/CookieConsent/CookieConsent";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.shell}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AppShell;