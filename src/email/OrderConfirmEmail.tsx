// emails/OrderConfirmEmail.tsx
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface LineItem {
  product_name: string;
  quantity: number;
  unit_price: number;   // cents
  subtotal: number;     // cents
}

interface OrderConfirmEmailProps {
  orderId: string;
  customerName?: string;
  items: LineItem[];
  total: string;        // dollars string e.g. "68.42"
  currency?: string;
}

export const OrderConfirmEmail = ({
  orderId,
  customerName = "Friend",
  items = [],
  total,
  currency = "CAD",
}: OrderConfirmEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Order Confirmed! 🐾 Thanks for shopping with Sniff & Frolic</Preview>
      <Body style={main}>
        <Container style={outerContainer}>

          {/* ── Logo Header ── */}
          <Section style={header}>
            <Img
              src="https://mcusercontent.com/67dba9dd632f3b80ecabcf3c1/images/c0deab70-80ec-f48a-4cb7-adeafdf32d03.png"
              width="160"
              alt="Sniff & Frolic"
              style={logo}
            />
          </Section>

          {/* ── Hero ── */}
          <Section style={heroSection}>
            <Text style={heroGreeting}>Hey {customerName}! 🐾</Text>
            <Text style={heroTitle}>Your order is confirmed!</Text>
            <Text style={heroSub}>
              Your order is in — we'll get it ready for you right away! 🎉
            </Text>
            <Text style={orderBadge}>Order #{orderId.slice(0, 8).toUpperCase()}</Text>
          </Section>

          <Hr style={divider} />

          {/* ── Order Items ── */}
          <Section style={section}>
            <Text style={sectionLabel}>WHAT YOU ORDERED</Text>
            {items.map((item, i) => (
              <Row key={i} style={itemRow}>
                <Column style={itemNameCol}>
                  <Text style={itemName}>
                    {item.product_name} × {item.quantity}
                  </Text>
                </Column>
                <Column style={itemPriceCol}>
                  <Text style={itemPrice}>
                    ${(item.subtotal / 100).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* ── Total ── */}
          <Section style={section}>
            <Row>
              <Column>
                <Text style={totalLabel}>Total</Text>
              </Column>
              <Column style={itemPriceCol}>
                <Text style={totalAmount}>
                  ${total} {currency}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* ── Message ── */}
          <Section style={section}>
            <Text style={bodyText}>
              We'll send you another update once your order is on its way. 
              Got questions? Just reply to this email — we're always happy to help!
            </Text>
          </Section>

          {/* ── CTA Button ── */}
          <Section style={buttonSection}>
            <Button href="https://sniffnfrolic.com" style={ctaButton}>
              Sniff More 🐾
            </Button>
          </Section>

          {/* ── Social Icons ── */}
          <Section style={socialSection}>
            <Row>
              <Column align="center">
                <a href="https://www.facebook.com/sniffnfrolic" target="_blank" rel="noreferrer" style={socialLink}>
                  <Img
                    src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/facebook-filled-color-40.png"
                    width="32" height="32" alt="Facebook"
                  />
                </a>
              </Column>
              <Column align="center">
                <a href="https://www.instagram.com/sniffnfrolic" target="_blank" rel="noreferrer" style={socialLink}>
                  <Img
                    src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/instagram-filled-color-40.png"
                    width="32" height="32" alt="Instagram"
                  />
                </a>
              </Column>
              <Column align="center">
                <a href="https://www.tiktok.com/@sniffnfrolic" target="_blank" rel="noreferrer" style={socialLink}>
                  <Img
                    src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/tiktok-filled-color-40.png"
                    width="32" height="32" alt="TikTok"
                  />
                </a>
              </Column>
            </Row>
          </Section>

          {/* ── Footer ── */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 Sniff &amp; Frolic. All rights reserved.
            </Text>
            <Text style={footerText}>
              Vancouver, BC · sniffnfrolic.com
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmEmail;

// ─── Styles ───────────────────────────────────────────────────────────────────

const main: React.CSSProperties = {
  backgroundColor: "#e26847",
  fontFamily: "'Noto Sans', Helvetica, sans-serif",
};

const outerContainer: React.CSSProperties = {
  maxWidth: "660px",
  margin: "0 auto",
};

const header: React.CSSProperties = {
  backgroundColor: "#fef5ec",
  textAlign: "center",
  padding: "24px 48px 12px",
};

const logo: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const heroSection: React.CSSProperties = {
  backgroundColor: "#fef5ec",
  padding: "16px 32px 24px",
  textAlign: "center",
};

const heroGreeting: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#053f53",
  margin: "0 0 4px",
};

const heroTitle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#053f53",
  margin: "0 0 12px",
};

const heroSub: React.CSSProperties = {
  fontSize: "15px",
  color: "#583300",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const orderBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#e26847",
  color: "#feeed9",
  padding: "6px 18px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const divider: React.CSSProperties = {
  borderColor: "#f0dcc8",
  margin: "0",
};

const section: React.CSSProperties = {
  backgroundColor: "#fef5ec",
  padding: "16px 32px",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "bold",
  color: "#e26847",
  letterSpacing: "1.5px",
  margin: "0 0 12px",
};

const itemRow: React.CSSProperties = {
  marginBottom: "8px",
};

const itemNameCol: React.CSSProperties = {
  width: "70%",
};

const itemPriceCol: React.CSSProperties = {
  width: "30%",
  textAlign: "right",
};

const itemName: React.CSSProperties = {
  fontSize: "14px",
  color: "#053f53",
  margin: "0",
};

const itemPrice: React.CSSProperties = {
  fontSize: "14px",
  color: "#053f53",
  margin: "0",
  textAlign: "right",
};

const totalLabel: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#053f53",
  margin: "0",
};

const totalAmount: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#e26847",
  margin: "0",
  textAlign: "right",
};

const bodyText: React.CSSProperties = {
  fontSize: "14px",
  color: "#583300",
  lineHeight: "1.6",
  margin: "0 0 10px",
};

const buttonSection: React.CSSProperties = {
  backgroundColor: "#fef5ec",
  textAlign: "center",
  padding: "8px 32px 24px",
};

const ctaButton: React.CSSProperties = {
  backgroundColor: "#e26847",
  borderRadius: "8px",
  border: "2px solid #e26847",
  color: "#feeed9",
  fontSize: "16px",
  fontWeight: "normal",
  padding: "14px 28px",
  textDecoration: "none",
  display: "inline-block",
};

const socialSection: React.CSSProperties = {
  backgroundColor: "#fef5ec",
  padding: "8px 32px 24px",
  textAlign: "center",
};

const socialLink: React.CSSProperties = {
  display: "inline-block",
  padding: "0 12px",
};

const footer: React.CSSProperties = {
  backgroundColor: "#fef5ec",
  textAlign: "center",
  padding: "16px 32px 24px",
  borderTop: "1px solid #f0dcc8",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#e26847",
  margin: "0 0 4px",
  fontStyle: "italic",
};