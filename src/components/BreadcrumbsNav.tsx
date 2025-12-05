// src/components/BreadcrumbsNav.tsx
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsNavProps {
  items: BreadcrumbItem[];
}

const BreadcrumbsNav = ({ items }: BreadcrumbsNavProps) => {
  if (!items || items.length === 0) return null;

  return (
    <Box component="nav" aria-label="Breadcrumb" sx={{ mb: 2, fontSize: 13 }}>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 13,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ) : (
                <Typography
                  component="span"
                  sx={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "text.primary",
                  }}
                >
                  {item.label}
                </Typography>
              )}

              {/* separator */}
              {!isLast && (
                <Typography
                  component="span"
                  sx={{ mx: 0.75, fontSize: 13, color: "text.secondary" }}
                >
                  /
                </Typography>
              )}
            </li>
          );
        })}
      </ol>
    </Box>
  );
};

export default BreadcrumbsNav;
