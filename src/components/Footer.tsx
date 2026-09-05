'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

interface FooterProps {
  onGoHome?: () => void;
  onGoAbout?: () => void;
  onOpenCategory?: (slug: string) => void;
  onOpenEnquiry?: () => void;
}

export default function Footer({
  onGoHome,
  onGoAbout,
  onOpenCategory,
  onOpenEnquiry,
}: FooterProps) {
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon sx={{ fontSize: 20 }} />,
      href: 'https://wa.me/919945216950?text=Hi',
      ariaLabel: 'Chat with us on WhatsApp',
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon sx={{ fontSize: 20 }} />,
      href: 'https://www.instagram.com/terasiri_laddoos/?hl=en',
      ariaLabel: 'Follow @terasiri_laddoos on Instagram',
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon sx={{ fontSize: 20 }} />,
      href: 'https://facebook.com/profile.php?id=61577697009951&rdid=ka3grheM6j2ULsfi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19P39bbGFJ%2F#',
      ariaLabel: 'Connect with us on Facebook',
    },
    {
      name: 'Email',
      icon: <EmailIcon sx={{ fontSize: 20 }} />,
      href: 'mailto:terasiri44@gmail.com',
      ariaLabel: 'Send us an Email',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#14301f',
        borderRadius: { xs: '24px 24px 0 0', md: '34px 34px 0 0' },
        mt: 0,
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: '60px' },
          pt: { xs: 6, md: '64px' },
          pb: '30px',
        }}
      >
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={5}>
            <Typography
              onClick={onGoHome}
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: '26px',
                fontWeight: 600,
                color: '#fbfaf7',
                cursor: 'pointer',
                mb: 1.8,
              }}
            >
              Terasiri Delights
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#95a793',
                maxWidth: 340,
                mb: 2.5,
              }}
            >
              Heirloom nutrition for pregnancy, postpartum and the first years. Hand-rolled in Bengaluru.
            </Typography>

            {/* Social Icons Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              {socialLinks.map((s) => (
                <IconButton
                  key={s.name}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(214, 238, 126, 0.10)',
                    border: '1px solid rgba(214, 238, 126, 0.22)',
                    color: '#d6ee7e',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      backgroundColor: '#d6ee7e',
                      color: '#14301f',
                      borderColor: '#d6ee7e',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 14px rgba(214, 238, 126, 0.3)',
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Collections */}
          <Grid item xs={6} sm={6} md={3.5}>
            <Typography
              sx={{
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '.16em',
                color: '#d6ee7e',
                mb: 1.5,
              }}
            >
              COLLECTIONS
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.4,
                fontSize: '13px',
                fontWeight: 300,
                color: '#95a793',
              }}
            >
              {[
                { label: 'Pregnancy', slug: 'pregnancy' },
                { label: 'Puberty', slug: 'puberty' },
                { label: 'Postpartum', slug: 'postpartum' },
                { label: 'Menopause', slug: 'menopause' },
              ].map((c) => (
                <Box
                  key={c.slug}
                  component="span"
                  onClick={() => onOpenCategory && onOpenCategory(c.slug)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#d6ee7e' },
                  }}
                >
                  {c.label}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Reach Us */}
          <Grid item xs={6} sm={6} md={3.5}>
            <Typography
              sx={{
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '.16em',
                color: '#d6ee7e',
                mb: 1.5,
              }}
            >
              REACH US
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.4,
                fontSize: '13px',
                fontWeight: 300,
                color: '#95a793',
              }}
            >
              <Box
                component="a"
                href="https://wa.me/919945216950?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#95a793',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#d6ee7e' },
                }}
              >
                <WhatsAppIcon sx={{ fontSize: 16, color: '#d6ee7e' }} />
                <span>WhatsApp · +91 99452 16950</span>
              </Box>
              <Box
                component="a"
                href="mailto:terasiri44@gmail.com"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#95a793',
                  textDecoration: 'none',
                  '&:hover': { color: '#d6ee7e' },
                }}
              >
                <EmailIcon sx={{ fontSize: 16, color: '#d6ee7e' }} />
                <span>terasiri44@gmail.com</span>
              </Box>
              <Box
                component="a"
                href="https://www.instagram.com/terasiri_laddoos/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#95a793',
                  textDecoration: 'none',
                  '&:hover': { color: '#d6ee7e' },
                }}
              >
                <InstagramIcon sx={{ fontSize: 16, color: '#d6ee7e' }} />
                <span>@terasiri_laddoos</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Copyright Bar */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: '60px' },
          py: '22px',
          pb: '40px',
          borderTop: '1px solid #1e4029',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 1,
          fontSize: '11.5px',
          color: '#6a7d6c',
        }}
      >
        <span>© {new Date().getFullYear()} Terasiri Delights · FSSAI Reg: 21225191000785</span>
        <span>Rooted in tradition, made with love · Bangalore</span>
      </Box>
    </Box>
  );
}
