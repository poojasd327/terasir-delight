'use client';

import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  COLLECTIONS,
  SOLVES,
  PRODUCTS,
  CollectionItem,
  ProductItem,
} from '@/data/taayiData';

interface CategoryViewProps {
  currentSlug: string;
  onSelectCategory: (slug: string) => void;
  onGoHome: () => void;
  onOpenProduct: (product: ProductItem, collectionSlug: string) => void;
  onOpenEnquiry?: () => void;
}

export default function CategoryView({
  currentSlug,
  onSelectCategory,
  onGoHome,
  onOpenProduct,
  onOpenEnquiry,
}: CategoryViewProps) {
  const currentCollection =
    COLLECTIONS.find((c) => c.slug === currentSlug) || COLLECTIONS[0];
  const solves = SOLVES[currentCollection.slug] || [];
  const products = PRODUCTS[currentCollection.slug] || [];

  const tabContainerRef = React.useRef<HTMLDivElement>(null);
  const isDraggingTab = React.useRef(false);
  const tabStartX = React.useRef(0);
  const tabScrollLeft = React.useRef(0);
  const tabMoved = React.useRef(false);

  const handleTabMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tabContainerRef.current) return;
    isDraggingTab.current = true;
    tabMoved.current = false;
    tabStartX.current = e.pageX - tabContainerRef.current.offsetLeft;
    tabScrollLeft.current = tabContainerRef.current.scrollLeft;
  };

  const handleTabMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingTab.current || !tabContainerRef.current) return;
    const x = e.pageX - tabContainerRef.current.offsetLeft;
    const walk = (x - tabStartX.current) * 1.5;
    if (Math.abs(walk) > 4) {
      tabMoved.current = true;
    }
    tabContainerRef.current.scrollLeft = tabScrollLeft.current - walk;
  };

  const handleTabMouseUpOrLeave = () => {
    isDraggingTab.current = false;
  };

  return (
    <Box sx={{ width: '100%', pb: '100px', backgroundColor: '#fbfaf7' }}>
      {/* Top Breadcrumbs & Back Bar */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '50px' },
          pt: { xs: '24px', md: '36px' },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: '#7b8678',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="span"
            onClick={onGoHome}
            sx={{
              cursor: 'pointer',
              color: '#14301f',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Home
          </Box>
          <span>/</span>
          <span style={{ color: '#14201a', fontWeight: 600 }}>
            {currentCollection.title}
          </span>
        </Box>

        <Typography
          sx={{
            fontSize: '12px',
            color: '#8a9687',
            letterSpacing: '0.05em',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {products.length} formulated items
        </Typography>
      </Box>

      {/* Category Tabs Switcher Bar */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '50px' },
          pt: '16px',
        }}
      >
        <Box
          ref={tabContainerRef}
          onMouseDown={handleTabMouseDown}
          onMouseMove={handleTabMouseMove}
          onMouseUp={handleTabMouseUpOrLeave}
          onMouseLeave={handleTabMouseUpOrLeave}
          sx={{
            display: 'flex',
            gap: { xs: 1, sm: 1.5 },
            overflowX: 'auto',
            pb: 1,
            pt: 0.5,
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            touchAction: 'pan-x pan-y',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
            userSelect: 'none',
          }}
        >
          {COLLECTIONS.map((col) => {
            const isSelected = col.slug === currentCollection.slug;
            return (
              <Box
                key={col.slug}
                onClick={() => {
                  if (!tabMoved.current && onSelectCategory) {
                    onSelectCategory(col.slug);
                  }
                }}
                sx={{
                  cursor: 'pointer',
                  px: { xs: 2, sm: 2.6 },
                  py: { xs: 1, sm: 1.2 },
                  borderRadius: '999px',
                  fontSize: { xs: '13px', md: '14px' },
                  fontWeight: isSelected ? 700 : 500,
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'all 0.22s ease',
                  backgroundColor: isSelected ? '#14301f' : '#ffffff',
                  color: isSelected ? '#d6ee7e' : '#2d3b2b',
                  border: `1.5px solid ${isSelected ? '#14301f' : '#e2e9df'}`,
                  boxShadow: isSelected ? '0 4px 14px rgba(20,48,31,0.18)' : '0 2px 6px rgba(0,0,0,0.03)',
                  '&:hover': {
                    backgroundColor: isSelected ? '#14301f' : '#f4f7f2',
                    borderColor: '#14301f',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <span>Stage {col.num}: {col.slug.charAt(0).toUpperCase() + col.slug.slice(1)}</span>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Main Dedicated Hero Banner */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '50px' },
          pt: '16px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#112b1c',
            backgroundImage:
              'radial-gradient(circle at 90% 10%, rgba(214, 238, 126, 0.12) 0%, rgba(17, 43, 28, 0) 60%), linear-gradient(135deg, #112b1c 0%, #173824 100%)',
            borderRadius: '28px',
            p: { xs: 3.5, sm: 5, md: '44px 48px' },
            color: '#ffffff',
            boxShadow: '0 12px 36px rgba(17,43,28,0.18)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Eyebrow Badge */}
          <Chip
            icon={
              <AutoAwesomeIcon
                sx={{
                  fontSize: '13px !important',
                  color: '#d6ee7e !important',
                }}
              />
            }
            label={`TERASIRI NOURISHMENT · STAGE ${currentCollection.num}`}
            sx={{
              backgroundColor: 'rgba(214, 238, 126, 0.15)',
              border: '1px solid rgba(214, 238, 126, 0.35)',
              color: '#d6ee7e',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '.16em',
              px: 1,
              py: 0.3,
              height: 28,
              borderRadius: '999px',
              mb: 2,
            }}
          />

          {/* Heading */}
          <Typography
            component="h1"
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: { xs: '30px', sm: '38px', md: '48px' },
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#fbfaf7',
              mb: 1.2,
            }}
          >
            {currentCollection.title}
          </Typography>

          {/* Tagline */}
          <Typography
            sx={{
              fontSize: { xs: '15px', md: '17px' },
              fontWeight: 500,
              color: '#d6ee7e',
              mb: 1.5,
            }}
          >
            {currentCollection.tagline}
          </Typography>

          {/* Blurb */}
          <Typography
            sx={{
              fontSize: { xs: '14px', md: '15.5px' },
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#dce5da',
              maxWidth: 820,
            }}
          >
            {currentCollection.blurb}
          </Typography>
        </Box>
      </Box>

      {/* 1. PRODUCTS SECTION (COMES FIRST) */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '50px' },
          pt: '40px',
          pb: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '.18em',
              color: '#768573',
              mb: 0.5,
            }}
          >
            HANDCRAFTED NUTRITION
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: { xs: '26px', md: '34px' },
              color: '#14201a',
              fontWeight: 500,
            }}
          >
            Formulated Products for {currentCollection.title}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '13px', color: '#7b8778', display: { xs: 'none', sm: 'block' } }}>
          Made fresh to order in Bengaluru
        </Typography>
      </Box>

      {/* Products Grid */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '50px' },
        }}
      >
        <Grid container spacing={3}>
          {products.map((p: ProductItem, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box
                onClick={() => onOpenProduct(p, currentCollection.slug)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e9eee6',
                  borderRadius: '24px',
                  p: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  height: '100%',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(17,43,28,0.1)',
                  },
                }}
              >
                {/* Product Image / Visual Showcase */}
                <Box
                  sx={{
                    position: 'relative',
                    height: '280px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    backgroundColor: '#f3f4ee',
                  }}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at 50% 50%, #e2e6dc 0%, #d8ded1 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                          fontSize: '20px',
                          color: '#556552',
                          fontWeight: 500,
                        }}
                      >
                        {p.name}
                      </Typography>
                    </Box>
                  )}

                  {/* Top Tag Badge */}
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: '#14301f',
                      color: '#f4f6ec',
                      fontSize: '11px',
                      fontWeight: 600,
                      px: '12px',
                      py: '6px',
                      borderRadius: '999px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    {p.tag}
                  </Box>
                </Box>

                {/* Product Details */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                  <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#4e7b55' }}>
                    {p.benefit}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                      fontSize: '23px',
                      lineHeight: 1.2,
                      color: '#14201a',
                      fontWeight: 600,
                    }}
                  >
                    {p.name}
                  </Typography>

                  {p.description && (
                    <Typography
                      sx={{
                        fontSize: '13px',
                        color: '#5e6b5a',
                        lineHeight: 1.55,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {p.description}
                    </Typography>
                  )}

                  {/* Keys Pills */}
                  <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mt: 0.5 }}>
                    {p.keys.map((k, i) => (
                      <Typography
                        key={i}
                        component="span"
                        sx={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#657361',
                          backgroundColor: '#f1f4ed',
                          px: '8px',
                          py: '3px',
                          borderRadius: '6px',
                        }}
                      >
                        {k}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Price & Action Bottom Row */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 1.5,
                    borderTop: '1px solid #f1f4ed',
                    mt: 'auto',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.6 }}>
                    <Typography sx={{ fontSize: '17px', fontWeight: 700, color: '#14301f' }}>
                      {p.price}
                    </Typography>
                    {p.quantity && (
                      <Typography sx={{ fontSize: '11.5px', fontWeight: 500, color: '#7a8777' }}>
                        / {p.quantity}
                      </Typography>
                    )}
                  </Box>

                  <Box
                    component="span"
                    sx={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#14301f',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    Details &amp; Order →
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 2. STAGE NUTRITION INFORMATION & HIGHLIGHTS (AFTER PRODUCTS) */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '50px' },
          pt: '54px',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '.18em',
              color: '#768573',
              mb: 0.5,
            }}
          >
            STAGE SCIENCE &amp; GUIDANCE
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: { xs: '24px', md: '30px' },
              color: '#14201a',
              fontWeight: 500,
            }}
          >
            Nutritional Principles for {currentCollection.title}
          </Typography>
        </Box>

        {/* 3 Core Highlights / Pillars Grid */}
        <Grid container spacing={2.5}>
          {currentCollection.heroHighlights.map((h, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e7ebe4',
                  borderRadius: '20px',
                  p: '22px 24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#14301f',
                  }}
                >
                  {h.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '13.5px',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: '#5a6757',
                  }}
                >
                  {h.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Two-Column Stage Advisory & Solves Section */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '50px' },
          pt: '28px',
        }}
      >
        <Grid container spacing={3}>
          {/* Custodian Advisory Note */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                backgroundColor: '#ffffff',
                border: '1px solid #e7ebe4',
                borderRadius: '24px',
                p: { xs: 3, md: '30px 34px' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '.18em',
                  color: '#14301f',
                }}
              >
                CUSTODIAN ADVISORY &amp; USAGE
              </Typography>
              <Typography
                sx={{
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: '#2d3b2f',
                  fontWeight: 400,
                }}
              >
                {currentCollection.advisory}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#768573',
                  mt: 'auto',
                  pt: 1,
                }}
              >
                — Sowmya B O, Founder &amp; Recipe Custodian
              </Typography>
            </Box>
          </Grid>

          {/* What This Stage Solves */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                backgroundColor: '#f3f5ee',
                borderRadius: '24px',
                p: { xs: 3, md: '28px 30px' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '.18em',
                  color: '#5b6b58',
                }}
              >
                PRIMARY BODY NEEDS ADDRESSED
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {solves.map((s, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.2,
                      fontSize: '13.5px',
                      color: '#1e2b20',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: 17, color: '#44784a', flexShrink: 0, mt: '2px' }}
                    />
                    <span>{s}</span>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Stage FAQs Section */}
      {currentCollection.faqs && currentCollection.faqs.length > 0 && (
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
            px: { xs: 3, sm: 4, md: '50px' },
            pt: '60px',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#f6f7f2',
              borderRadius: '26px',
              p: { xs: 3.5, sm: 5, md: '44px 48px' },
              border: '1px solid #e7ece4',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
              <HelpOutlineIcon sx={{ color: '#4e7b55', fontSize: 22 }} />
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '.18em',
                  color: '#556552',
                }}
              >
                FREQUENTLY ASKED QUESTIONS
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: { xs: '24px', md: '30px' },
                color: '#14201a',
                fontWeight: 500,
                mb: 3.5,
              }}
            >
              Common Questions About {currentCollection.title}
            </Typography>

            <Grid container spacing={3}>
              {currentCollection.faqs.map((faq, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box
                    sx={{
                      backgroundColor: '#ffffff',
                      p: '22px 24px',
                      borderRadius: '18px',
                      height: '100%',
                      border: '1px solid #e9ede6',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#14301f' }}>
                      {faq.q}
                    </Typography>
                    <Typography sx={{ fontSize: '13.5px', color: '#576353', lineHeight: 1.65 }}>
                      {faq.a}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      {/* Kitchen Customization Consultation Banner */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '50px' },
          pt: '40px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#14301f',
            borderRadius: '24px',
            p: { xs: 3.5, md: '36px 44px' },
            color: '#fbfaf7',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 3,
          }}
        >
          <Box sx={{ maxWidth: 680 }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: { xs: '22px', md: '26px' },
                fontWeight: 500,
                mb: 0.8,
              }}
            >
              Need a personalized diet plan or custom batch?
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#c7d6c5', lineHeight: 1.6 }}>
              Every mother and family has unique dietary requirements. Talk directly with our recipe custodian to customize ingredients, sweetness levels, or portion packs.
            </Typography>
          </Box>

          <Button
            onClick={() => onOpenEnquiry && onOpenEnquiry()}
            startIcon={<WhatsAppIcon />}
            sx={{
              background: '#d6ee7e',
              color: '#132a1e',
              fontSize: '13.5px',
              fontWeight: 700,
              py: '12px',
              px: '24px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
              textTransform: 'none',
              cursor: 'pointer',
              '&:hover': {
                background: '#e4fa9b',
                color: '#132a1e',
              },
            }}
          >
            Enquire
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

