"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Divider,
    Typography,
    Stack
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { MobileMenuProps, NavItem } from "./types";

const MobileMenu = ({ open, onClose, locale }: MobileMenuProps) => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
        <Box sx={{ width: 320, p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: `"Lilita One", system-ui` }}>
              Sniff &amp; Frolic
            </Typography>
            <IconButton onClick={onClose} aria-label="Close menu">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Explore
          </Typography>

          {/* <List dense>
            {finalLinks.map((x) => (
              <ListItemButton
                key={x.href}
                component={Link}
                href={x.href}
                onClick={() => setOpen(false)}
                selected={!!isActive(x.href)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText primary={x.label} />
              </ListItemButton>
            ))}
          </List> */}

          {/* {categories.length ? (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Categories
              </Typography>

              <List dense>
                {categories.map((g) => {
                  const expanded = openGroup === g.label;
                  const hasChildren = !!g.items?.length;

                  return (
                    <Box key={g.label}>
                      <ListItemButton
                        onClick={() => setOpenGroup(expanded ? null : g.label)}
                        component={g.href && !hasChildren ? Link : "button"}
                        href={g.href && !hasChildren ? g.href : undefined}
                        sx={{ borderRadius: 2 }}
                      >
                        <ListItemText primary={g.label} />
                        {hasChildren ? (expanded ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />) : null}
                      </ListItemButton>

                      {hasChildren ? (
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <List dense sx={{ pl: 2 }}>
                            {g.items!.map((c) => (
                              <ListItemButton
                                key={c.href}
                                component={Link}
                                href={c.href}
                                onClick={() => setOpen(false)}
                                sx={{ borderRadius: 2 }}
                              >
                                <ListItemText primary={c.label} />
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      ) : null}
                    </Box>
                  );
                })}
              </List>
            </>
          ) : null} */}
        </Box>
    </Drawer>
  );
};

export default MobileMenu;