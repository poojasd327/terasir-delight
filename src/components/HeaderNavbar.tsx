'use client';

import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

const HEADER_CATEGORIES = [
  { label: 'Pregnancy', slug: 'pregnancy' },
  { label: 'Puberty', slug: 'puberty' },
  { label: 'Postpartum', slug: 'postpartum' },
  { label: 'Menopause', slug: 'menopause' },
];

interface HeaderNavbarProps {
  onGoHome: () => void;
  onGoCatalogue: (slug?: string) => void;
  onGoAbout?: () => void;
  onOpenEnquiry: () => void;
}

export default function HeaderNavbar({
  onGoHome,
  onGoCatalogue,
  onGoAbout,
  onOpenEnquiry,
}: HeaderNavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        px: { xs: 2, sm: 3 },
        pt: 2,
        pb: 0,
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          backgroundColor: '#14301f',
          borderRadius: '999px',
          px: { xs: 2, md: '20px', lg: '24px' },
          pr: { xs: 1.5, md: '10px' },
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 10px 34px rgba(15,38,25,0.16)',
        }}
      >
        {/* Left: Logo & Brand Name */}
        <Box
          onClick={onGoHome}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: 40, md: 44 },
              height: { xs: 40, md: 44 },
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              backgroundColor: '#fff7ee',
              flexShrink: 0,
            }}
          >
            <Image
              src="/terasiri/images/terasiri_logo.png"
              alt="Terasiri Delights Logo"
              fill
              sizes="44px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
          <Typography
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: { xs: '18px', sm: '19px', md: '21px' },
              fontWeight: 600,
              color: '#fbfaf7',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Terasiri Delights
          </Typography>
        </Box>

        {/* Right: Menus & Enquire Button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, md: 2, lg: 2.8 },
          }}
        >
          {/* Desktop Nav Links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: { md: 1.6, lg: 2.4, xl: 3 },
              fontSize: { md: '12.5px', lg: '13px' },
              fontWeight: 500,
              color: '#d8e2d6',
            }}
          >
            {HEADER_CATEGORIES.map((cat) => (
              <Box
                key={cat.slug}
                component="span"
                onClick={() => onGoCatalogue(cat.slug)}
                sx={{
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#d6ee7e' },
                }}
              >
                {cat.label}
              </Box>
            ))}
          </Box>

          {/* Enquire Button */}
          <Button
            onClick={onOpenEnquiry}
            disableElevation
            sx={{
              display: { xs: 'none', md: 'flex' },
              background: '#d6ee7e',
              color: '#132a1e',
              fontSize: '12.5px',
              fontWeight: 600,
              py: '7px',
              pl: '18px',
              pr: '7px',
              borderRadius: '999px',
              minHeight: 'auto',
              alignItems: 'center',
              gap: 1.2,
              cursor: 'pointer',
              '&:hover': {
                background: '#e6f8a2',
                color: '#132a1e',
              },
            }}
          >
            Enquire
            <Box
              component="span"
              sx={{
                width: 26,
                height: 26,
                borderRadius: '999px',
                background: '#132a1e',
                color: '#d6ee7e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              →
            </Box>
          </Button>

          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ color: '#d8e2d6', p: 0.5 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Mobile Drawer Navigation */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: '#14301f',
            color: '#fbfaf7',
            width: { xs: '82vw', sm: 300 },
            maxWidth: 320,
            height: '100dvh',
            maxHeight: '100dvh',
            p: { xs: 2.5, sm: 3 },
            pt: { xs: 'max(20px, env(safe-area-inset-top, 20px))', sm: 3 },
            pb: { xs: 'max(20px, env(safe-area-inset-bottom, 20px))', sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box
            onClick={() => { onGoHome(); handleDrawerToggle(); }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 38,
                height: 38,
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#fff7ee',
              }}
            >
              <Image
                src="/terasiri/images/terasiri_logo.png"
                alt="Terasiri Delights Logo"
                fill
                sizes="38px"
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#fbfaf7',
              }}
            >
              Terasiri Delights
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#d8e2d6' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ flexGrow: 1, py: 0 }}>
          {HEADER_CATEGORIES.map((cat) => (
            <ListItem key={cat.slug} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  onGoCatalogue(cat.slug);
                  handleDrawerToggle();
                }}
                sx={{
                  borderRadius: 2,
                  color: '#d8e2d6',
                  py: 1.1,
                  '&:hover': {
                    backgroundColor: 'rgba(214, 238, 126, 0.1)',
                    color: '#d6ee7e',
                  },
                }}
              >
                <ListItemText
                  primary={cat.label}
                  primaryTypographyProps={{ fontSize: '15px', fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mb: 1, mt: 1, borderTop: '1px solid rgba(255,255,255,0.08)', pt: 1 }}>
            <ListItemButton
              onClick={() => {
                onGoAbout && onGoAbout();
                handleDrawerToggle();
              }}
              sx={{
                borderRadius: 2,
                color: '#b6c6b2',
                py: 1,
                '&:hover': {
                  color: '#d6ee7e',
                },
              }}
            >
              <ListItemText
                primary="Our Story (About Us)"
                primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ mt: 'auto', pt: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2 }}>
            <IconButton
              component="a"
              href="https://wa.me/919945216950?text=Hi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'rgba(214, 238, 126, 0.10)',
                border: '1px solid rgba(214, 238, 126, 0.22)',
                color: '#d6ee7e',
                '&:hover': {
                  backgroundColor: '#d6ee7e',
                  color: '#132a1e',
                },
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/terasiri_laddoos/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'rgba(214, 238, 126, 0.10)',
                border: '1px solid rgba(214, 238, 126, 0.22)',
                color: '#d6ee7e',
                '&:hover': {
                  backgroundColor: '#d6ee7e',
                  color: '#132a1e',
                },
              }}
            >
              <InstagramIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              component="a"
              href="https://facebook.com/profile.php?id=61577697009951&rdid=ka3grheM6j2ULsfi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19P39bbGFJ%2F#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'rgba(214, 238, 126, 0.10)',
                border: '1px solid rgba(214, 238, 126, 0.22)',
                color: '#d6ee7e',
                '&:hover': {
                  backgroundColor: '#d6ee7e',
                  color: '#132a1e',
                },
              }}
            >
              <FacebookIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              component="a"
              href="mailto:terasiri44@gmail.com"
              aria-label="Email"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'rgba(214, 238, 126, 0.10)',
                border: '1px solid rgba(214, 238, 126, 0.22)',
                color: '#d6ee7e',
                '&:hover': {
                  backgroundColor: '#d6ee7e',
                  color: '#132a1e',
                },
              }}
            >
              <EmailIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          <Button
            fullWidth
            onClick={() => {
              handleDrawerToggle();
              onOpenEnquiry();
            }}
            sx={{
              background: '#d6ee7e',
              color: '#132a1e',
              fontWeight: 600,
              py: '12px',
              borderRadius: '999px',
              cursor: 'pointer',
              '&:hover': { background: '#e6f8a2', color: '#132a1e' },
            }}
          >
            Enquire Now →
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
