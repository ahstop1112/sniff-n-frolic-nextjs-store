"use client";
import { useTranslation } from "react-i18next";
import { Box, Divider } from "@mui/material";
import styles from "./Cart.module.scss";

type curStepProps = "cart" | "checkout" | "orderStatus";

const StepIndicator = ({ curStep }: { curStep: curStepProps }) => {
    const { t } = useTranslation("nav");

    return (
        <Box mb={3} className={styles.stepIndicator}>
            <section>
                <span className={curStep === "cart" ? styles.active : ""}>{t(`shoppingCart`)}</span>
                <span className={curStep === "checkout" ? styles.active : ""}>{t(`checkout`)}</span>
                <span className={curStep === "orderStatus" ? styles.active : ""}>{t(`orderStatus`)}</span>
            </section>
            <Divider />
        </Box>
    );
};

export default StepIndicator;
