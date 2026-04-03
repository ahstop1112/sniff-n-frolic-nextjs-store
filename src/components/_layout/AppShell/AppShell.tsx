import Header from "../Header";
import Footer from "../Footer";
import styles from "./AppShell.module.scss";
import CookieConsent from "@/components/CookieConsent";

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