'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Image from 'next/image';

interface AboutUsSectionProps {
  onOpenEnquiry?: (details?: { name?: string }) => void;
}

// Organic torn paper top edge SVG component
function TornPaperTop({ bgColor = '#fbfaf7' }: { bgColor?: string }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        zIndex: 5,
        pointerEvents: 'none',
        transform: 'scaleY(-1) scaleX(-1)',
      }}
    >
      <svg
        viewBox="0 0 1440 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: '42px',
          filter: 'drop-shadow(0px -3px 4px rgba(0,0,0,0.35))',
        }}
      >
        <path
          d="M0 54H1440V35.8C1405.5 29.9 1380.2 39.2 1344.6 27.5C1315.8 18 1285.2 32.6 1253.4 22.2C1221.7 11.9 1195.1 26.8 1162.8 18.4C1128.4 9.5 1099.5 24.6 1064.2 14.9C1028.9 5.3 1002.3 21.9 966.7 13.5C932.1 5.4 903.6 20.8 869.4 11.6C835.8 2.5 808.2 17.2 773.8 8.8C738.5 0.2 710.4 14.6 675.2 7.2C639.1 -0.3 612.3 15.4 576.4 8.2C540.9 1.2 514.8 16.1 478.6 9.8C443.1 3.7 416.7 19.4 380.5 13.3C345.2 7.3 319.4 22.8 283.6 16.9C247.9 11.1 221.6 27.2 185.2 20.8C149.7 14.5 123.8 30.1 87.4 24.4C51.6 18.8 26.8 34.6 0 28.9V54Z"
          fill={bgColor}
        />
        {/* Subtle fibrous inner torn edge for realism */}
        <path
          d="M0 30C32 34 62 20 94 26C128 32 156 16 190 22C224 28 254 13 288 19C322 25 350 9 384 15C418 21 448 6 482 12C516 18 544 3 578 10C612 17 642 2 676 9C710 16 738 2 772 10C806 18 836 5 870 13C904 21 932 8 966 15C1000 22 1030 8 1064 16C1098 24 1126 11 1160 19C1194 27 1224 14 1258 23C1292 32 1320 20 1354 29C1388 38 1414 31 1440 37"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </Box>
  );
}

// Organic torn paper bottom edge SVG component
function TornPaperBottom({ bgColor = '#fbfaf7' }: { bgColor?: string }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1440 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: '42px',
          filter: 'drop-shadow(0px -3px 4px rgba(0,0,0,0.35))',
        }}
      >
        <path
          d="M0 54H1440V35.8C1405.5 29.9 1380.2 39.2 1344.6 27.5C1315.8 18 1285.2 32.6 1253.4 22.2C1221.7 11.9 1195.1 26.8 1162.8 18.4C1128.4 9.5 1099.5 24.6 1064.2 14.9C1028.9 5.3 1002.3 21.9 966.7 13.5C932.1 5.4 903.6 20.8 869.4 11.6C835.8 2.5 808.2 17.2 773.8 8.8C738.5 0.2 710.4 14.6 675.2 7.2C639.1 -0.3 612.3 15.4 576.4 8.2C540.9 1.2 514.8 16.1 478.6 9.8C443.1 3.7 416.7 19.4 380.5 13.3C345.2 7.3 319.4 22.8 283.6 16.9C247.9 11.1 221.6 27.2 185.2 20.8C149.7 14.5 123.8 30.1 87.4 24.4C51.6 18.8 26.8 34.6 0 28.9V54Z"
          fill={bgColor}
        />
        {/* Subtle fibrous inner torn edge for realism */}
        <path
          d="M0 30C32 34 62 20 94 26C128 32 156 16 190 22C224 28 254 13 288 19C322 25 350 9 384 15C418 21 448 6 482 12C516 18 544 3 578 10C612 17 642 2 676 9C710 16 738 2 772 10C806 18 836 5 870 13C904 21 932 8 966 15C1000 22 1030 8 1064 16C1098 24 1126 11 1160 19C1194 27 1224 14 1258 23C1292 32 1320 20 1354 29C1388 38 1414 31 1440 37"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </Box>
  );
}

export default function AboutUsSection({ onOpenEnquiry }: AboutUsSectionProps) {
  return (
    <Box
      id="about"
      sx={{
        width: '100%',
        position: 'relative',
        minHeight: { xs: '540px', sm: '580px', md: '640px', lg: '680px' },
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'url(/terasiri/images/about.png)',
        backgroundSize: 'cover',
        backgroundPosition: { xs: 'center center', md: 'center right' },
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0c1a11', // Deep Forest fallback
        py: { xs: '65px', sm: '72px', md: '80px' },
        overflow: 'hidden',
      }}
    >
      {/* Top Torn Paper Edge */}
      <TornPaperTop bgColor="#fbfaf7" />

      {/* Dark Forest Green Multi-stop Scrim Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: {
            xs: 'linear-gradient(180deg, rgba(10, 24, 15, 0.94) 0%, rgba(12, 28, 18, 0.88) 60%, rgba(14, 32, 21, 0.92) 100%)',
            md: 'linear-gradient(90deg, rgba(10, 24, 15, 0.96) 0%, rgba(10, 24, 15, 0.90) 48%, rgba(12, 28, 18, 0.50) 72%, rgba(14, 32, 21, 0.05) 100%)',
          },
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Container - Left Aligned */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: '60px' },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '640px', lg: '720px', xl: '760px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            gap: { xs: 1.6, md: 1.9 },
          }}
        >
          {/* Section Tag Badge */}
          <Box sx={{ alignSelf: 'flex-start' }}>
            <Chip
              icon={
                <AutoAwesomeIcon
                  sx={{
                    fontSize: '13px !important',
                    color: '#d6ee7e !important',
                  }}
                />
              }
              label="ABOUT US · OUR MISSION"
              sx={{
                backgroundColor: 'rgba(214, 238, 126, 0.14)',
                border: '1px solid rgba(214, 238, 126, 0.32)',
                backdropFilter: 'blur(8px)',
                color: '#d6ee7e',
                fontWeight: 700,
                fontSize: '10.5px',
                letterSpacing: '.18em',
                px: 1.2,
                py: 0.3,
                height: 28,
                borderRadius: '999px',
              }}
            />
          </Box>

          {/* Main Headline */}
          <Typography
            component="h2"
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: { xs: '23px', sm: '27px', md: '32px', lg: '36px' },
              lineHeight: 1.2,
              color: '#ffffff',
              fontWeight: 500,
              letterSpacing: '-0.015em',
              textShadow: '0 2px 18px rgba(0,0,0,0.4)',
            }}
          >
            Our mission is to make nourishing food a simple and meaningful part of{' '}
            <Box
              component="span"
              sx={{
                color: '#d6ee7e',
                fontStyle: 'italic',
                fontWeight: 600,
              }}
            >
              every woman&apos;s life.
            </Box>
          </Typography>

          {/* Body Paragraph 1 */}
          <Typography
            sx={{
              fontSize: { xs: '13.5px', sm: '14px', md: '14.8px' },
              fontWeight: 400,
              lineHeight: 1.62,
              color: '#e4ece0',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              textWrap: 'pretty',
            }}
          >
            We bring together the wisdom of traditional Indian foods with modern convenience, creating delicious, wholesome, and thoughtfully formulated nutrition that fits effortlessly into everyday life.
          </Typography>

          {/* Body Paragraph 2 */}
          <Typography
            sx={{
              fontSize: { xs: '13.5px', sm: '14px', md: '14.8px' },
              fontWeight: 400,
              lineHeight: 1.62,
              color: '#d5e2d0',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              textWrap: 'pretty',
            }}
          >
            From the nutritional needs of puberty and the journey of pregnancy and postpartum to menopause and healthy ageing, we&apos;re committed to supporting women through every stage of life. With natural ingredients, quality, freshness, and everyday nourishment at the heart of what we do, we believe every woman deserves to prioritise her own nourishment—because caring for women should begin early and continue throughout life.
          </Typography>

          {/* Signature & Founder Photo (Mobile) */}
          <Box
            sx={{
              pt: 0.8,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: { xs: 2, sm: 2.5 },
            }}
          >
            {/* Founder / About Mobile Photo - Left Side (Mobile Only) */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                position: 'relative',
                width: { xs: '84px', sm: '96px' },
                height: { xs: '84px', sm: '96px' },
                minWidth: { xs: '84px', sm: '96px' },
                borderRadius: '18px',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Image
                src="/terasiri/images/about_mobile.png"
                alt="Sowmya B O - Founder"
                fill
                sizes="96px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </Box>

            {/* Signature & Custodian Name */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.4,
              }}
            >
              {/* Signature Image */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '130px', sm: '145px' },
                  height: '46px',
                  filter: 'brightness(0) invert(1)',
                }}
              >
                <Image
                  src="/terasiri/images/signature.png"
                  alt="Signature of Sowmya B O"
                  fill
                  sizes="145px"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'left center',
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.03em',
                }}
              >
                Sowmya B O
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#b6c6b2',
                  letterSpacing: '0.02em',
                }}
              >
                Founder &amp; Recipe Custodian, Terasiri Delights
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bottom Torn Paper Edge */}
      <TornPaperBottom bgColor="#fbfaf7" />
    </Box>
  );
}
