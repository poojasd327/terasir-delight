'use client';

import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AboutUsSection from '@/components/AboutUsSection';
import VideoTestimonialsSection from '@/components/VideoTestimonialsSection';
import {
  COLLECTIONS,
  PRODUCTS,
  CollectionItem,
  ProductItem,
} from '@/data/taayiData';

interface HomeViewProps {
  onOpenCategory: (slug: string) => void;
  onOpenProduct: (product: ProductItem, collectionSlug: string) => void;
  onOpenEnquiry: (details?: { name?: string; pack?: string; price?: string; collection?: string }) => void;
}

export default function HomeView({
  onOpenCategory,
  onOpenProduct,
  onOpenEnquiry,
}: HomeViewProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const chipRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Drag-to-scroll handlers for chips
  const isDraggingChips = React.useRef(false);
  const chipStartX = React.useRef(0);
  const chipScrollLeft = React.useRef(0);
  const chipMoved = React.useRef(false);

  const handleChipMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chipRef.current) return;
    isDraggingChips.current = true;
    chipMoved.current = false;
    chipStartX.current = e.pageX - chipRef.current.offsetLeft;
    chipScrollLeft.current = chipRef.current.scrollLeft;
  };
  const handleChipMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingChips.current || !chipRef.current) return;
    const x = e.pageX - chipRef.current.offsetLeft;
    const walk = (x - chipStartX.current) * 1.5;
    if (Math.abs(walk) > 4) {
      chipMoved.current = true;
    }
    chipRef.current.scrollLeft = chipScrollLeft.current - walk;
  };
  const handleChipMouseUpOrLeave = () => {
    isDraggingChips.current = false;
  };

  // Drag-to-scroll handlers for product slider
  const isDraggingSlider = React.useRef(false);
  const sliderStartX = React.useRef(0);
  const sliderScrollLeft = React.useRef(0);
  const sliderMoved = React.useRef(false);

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    isDraggingSlider.current = true;
    sliderMoved.current = false;
    sliderStartX.current = e.pageX - sliderRef.current.offsetLeft;
    sliderScrollLeft.current = sliderRef.current.scrollLeft;
  };
  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingSlider.current || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - sliderStartX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      sliderMoved.current = true;
    }
    sliderRef.current.scrollLeft = sliderScrollLeft.current - walk;
  };
  const handleSliderMouseUpOrLeave = () => {
    isDraggingSlider.current = false;
  };

  const categoryConfigs: { slug: keyof typeof PRODUCTS; label: string }[] = React.useMemo(() => [
    { slug: 'pregnancy', label: 'Pregnancy' },
    { slug: 'puberty', label: 'Puberty' },
    { slug: 'postpartum', label: 'Postpartum' },
    { slug: 'menopause', label: 'Menopause' },
  ], []);

  // Compile unique products across collections (no duplicates under All Formulations)
  const allProducts = React.useMemo(() => {
    const list: { prod: ProductItem; slug: string; categoryName: string }[] = [];
    const seen = new Set<string>();

    categoryConfigs.forEach(({ slug, label }) => {
      (PRODUCTS[slug] || []).forEach((prod) => {
        const key = prod.name.trim().toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            prod,
            slug,
            categoryName: label,
          });
        }
      });
    });
    return list;
  }, [categoryConfigs]);

  // Filter products by selected category
  const filteredProducts = React.useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    const catLabel = categoryConfigs.find((c) => c.slug === selectedCategory)?.label || '';
    return (PRODUCTS[selectedCategory] || []).map((prod) => ({
      prod,
      slug: selectedCategory,
      categoryName: catLabel,
    }));
  }, [allProducts, selectedCategory, categoryConfigs]);

  // Smooth scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 900;
      const isTablet = typeof window !== 'undefined' && window.innerWidth >= 600;
      const visibleCards = isDesktop ? 3 : isTablet ? 2 : 1;
      const scrollAmount = sliderRef.current.clientWidth / visibleCards;
      sliderRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll loop (pauses on hover)
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 900;
        const isTablet = typeof window !== 'undefined' && window.innerWidth >= 600;
        const visibleCards = isDesktop ? 3 : isTablet ? 2 : 1;
        const scrollAmount = clientWidth / visibleCards;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered, filteredProducts]);

  const categories = [
    { slug: 'all', label: 'All Formulations', count: allProducts.length },
    { slug: 'pregnancy', label: 'Pregnancy', count: PRODUCTS.pregnancy?.length || 0 },
    { slug: 'puberty', label: 'Puberty', count: PRODUCTS.puberty?.length || 0 },
    { slug: 'postpartum', label: 'Postpartum', count: PRODUCTS.postpartum?.length || 0 },
    { slug: 'menopause', label: 'Menopause', count: PRODUCTS.menopause?.length || 0 },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* 1. HERO SECTION */}
      <Box
        id="hero"
        sx={{
          position: 'relative',
          width: '100%',
          mt: { xs: '-80px', md: '-80px' },
          height: '100dvh',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundImage: {
            xs: 'linear-gradient(180deg, rgba(14, 30, 20, 0.45) 0%, rgba(14, 30, 20, 0.25) 50%, rgba(14, 30, 20, 0.50) 100%), url(/terasiri/images/mobilehero.png)',
            md: 'linear-gradient(90deg, rgba(14, 30, 20, 0.88) 0%, rgba(14, 30, 20, 0.70) 36%, rgba(14, 30, 20, 0.25) 60%, rgba(14, 30, 20, 0.0) 100%), url(/terasiri/images/heroimage.png)',
          },
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Hero Content Container - Left Aligned */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 1400,
            mx: 'auto',
            px: { xs: 3, sm: 5, md: '48px' },
            pt: { xs: '80px', md: '80px' },
            pb: { xs: '20px', md: '20px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            textAlign: 'left',
            zIndex: 2,
            transform: { xs: 'translateY(-150px)', md: 'translateY(-100px)' },
          }}
        >
          {/* Eyebrow */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(214, 238, 126, 0.15)',
              border: '1px solid rgba(214, 238, 126, 0.35)',
              backdropFilter: 'blur(8px)',
              px: '14px',
              py: '6px',
              borderRadius: '999px',
              mb: { xs: 2.5, md: 3 },
            }}
          >
            <Box
              sx={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#d6ee7e',
                boxShadow: '0 0 8px #d6ee7e',
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: '11px', md: '12px' },
                fontWeight: 600,
                color: '#d6ee7e',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Stage-Formulated Kitchen
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            component="h1"
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: { xs: '38px', sm: '52px', md: '64px', lg: '74px' },
              fontWeight: 500,
              lineHeight: { xs: 1.1, md: 1.05 },
              color: '#fbfaf7',
              letterSpacing: '-0.02em',
              mb: { xs: 2, md: 2.5 },
              maxWidth: { xs: '100%', md: '780px' },
            }}
          >
            Every Stage Answered by Nature
          </Typography>

          {/* Subheading */}
          <Typography
            sx={{
              fontSize: { xs: '15px', sm: '17px', md: '19px' },
              lineHeight: 1.55,
              color: '#d8e2d6',
              maxWidth: { xs: '100%', sm: '540px', md: '580px' },
              mb: { xs: 3.5, md: 4.5 },
              fontWeight: 300,
            }}
          >
            Pregnancy, puberty, postpartum recovery, and menopause nourishment. Handcrafted in Bengaluru, made fresh to order.
          </Typography>

          {/* Hero CTA */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 'auto',
            }}
          >
            <Button
              onClick={() => onOpenEnquiry()}
              disableElevation
              sx={{
                background: '#d6ee7e',
                color: '#132a1e',
                fontSize: { xs: '13.5px', md: '14.5px' },
                fontWeight: 600,
                py: { xs: '8px', md: '10px' },
                pl: { xs: '20px', md: '24px' },
                pr: { xs: '8px', md: '10px' },
                borderRadius: '999px',
                minHeight: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                textTransform: 'none',
                width: 'auto',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
                '&:hover': {
                  background: '#e6f8a2',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Enquire
              <Box
                component="span"
                sx={{
                  width: { xs: 26, md: 28 },
                  height: { xs: 26, md: 28 },
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
          </Box>
        </Box>
      </Box>

      {/* 4. PRODUCT CAROUSEL SECTION */}
      <Box
        sx={{
          backgroundColor: '#fbfaf7',
          pt: { xs: '44px', md: '70px' },
          pb: { xs: '36px', md: '50px' },
        }}
      >
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
            px: { xs: 2.5, sm: 4, md: '44px' },
          }}
        >
          {/* Header Row: Title & Slider Controls */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
              gap: { xs: 2, md: 2.5 },
              mb: { xs: 2.5, md: 3.5 },
            }}
          >
            <Box sx={{ maxWidth: '720px' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.6,
                  py: 0.5,
                  borderRadius: '999px',
                  backgroundColor: '#edf2e7',
                  color: '#264830',
                  fontSize: { xs: '11px', md: '12px' },
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  mb: { xs: 1, md: 1.5 },
                }}
              >
                ✦ Stage-Specific Nutrition
              </Box>
              <Typography
                sx={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                  fontSize: { xs: '26px', sm: '36px', md: '46px' },
                  lineHeight: 1.15,
                  color: '#14201a',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Find what your body is asking for
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '13px', sm: '14.5px', md: '16px' },
                  color: '#5c6e58',
                  mt: 0.8,
                  lineHeight: 1.5,
                }}
              >
                Explore all handcrafted formulations made fresh to order with A2 cow ghee, sprouted millets, and whole dates.
              </Typography>
            </Box>

            {/* Carousel Navigation Arrows - Desktop Header */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1.2,
              }}
            >
              <IconButton
                onClick={() => handleScroll('left')}
                aria-label="Previous products"
                sx={{
                  width: 46,
                  height: 46,
                  backgroundColor: '#ffffff',
                  border: '1px solid #dbe2d6',
                  color: '#14301f',
                  boxShadow: '0 3px 10px rgba(20,48,31,0.06)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#14301f',
                    color: '#d6ee7e',
                    borderColor: '#14301f',
                    transform: 'scale(1.06)',
                  },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: '18px' }} />
              </IconButton>
              <IconButton
                onClick={() => handleScroll('right')}
                aria-label="Next products"
                sx={{
                  width: 46,
                  height: 46,
                  backgroundColor: '#ffffff',
                  border: '1px solid #dbe2d6',
                  color: '#14301f',
                  boxShadow: '0 3px 10px rgba(20,48,31,0.06)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#14301f',
                    color: '#d6ee7e',
                    borderColor: '#14301f',
                    transform: 'scale(1.06)',
                  },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: '18px' }} />
              </IconButton>
            </Box>
          </Box>

          {/* Category Filter Chips */}
          <Box
            ref={chipRef}
            onMouseDown={handleChipMouseDown}
            onMouseMove={handleChipMouseMove}
            onMouseUp={handleChipMouseUpOrLeave}
            onMouseLeave={handleChipMouseUpOrLeave}
            sx={{
              display: 'flex',
              gap: { xs: 0.9, sm: 1.2 },
              overflowX: 'auto',
              pb: 1.8,
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
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <Box
                  key={cat.slug}
                  onClick={() => {
                    if (!chipMoved.current) {
                      setSelectedCategory(cat.slug);
                    }
                  }}
                  sx={{
                    cursor: 'pointer',
                    px: { xs: 1.6, sm: 2.2 },
                    py: { xs: 0.8, sm: 1.1 },
                    borderRadius: '999px',
                    fontSize: { xs: '12px', md: '13px' },
                    fontWeight: isSelected ? 600 : 500,
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    transition: 'all 0.2s ease',
                    backgroundColor: isSelected ? '#14301f' : '#edf1eb',
                    color: isSelected ? '#d6ee7e' : '#495946',
                    border: `1px solid ${isSelected ? '#14301f' : '#dde5da'}`,
                    '&:hover': {
                      backgroundColor: isSelected ? '#14301f' : '#e2e9df',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <span>{cat.label}</span>
                  <Box
                    component="span"
                    sx={{
                      fontSize: '10.5px',
                      px: 0.8,
                      py: 0.2,
                      borderRadius: '999px',
                      backgroundColor: isSelected ? 'rgba(214,238,126,0.2)' : 'rgba(0,0,0,0.06)',
                      color: isSelected ? '#d6ee7e' : '#5f6f5c',
                    }}
                  >
                    {cat.count}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Sliding Carousel Track */}
        <Box
          ref={sliderRef}
          onMouseDown={handleSliderMouseDown}
          onMouseMove={handleSliderMouseMove}
          onMouseUp={handleSliderMouseUpOrLeave}
          onMouseLeave={handleSliderMouseUpOrLeave}
          sx={{
            display: 'flex',
            gap: { xs: 2, md: 3 },
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            px: { xs: 2.5, sm: 4, md: '44px' },
            py: 2,
            maxWidth: 1400,
            mx: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            touchAction: 'pan-x pan-y',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
            userSelect: 'none',
          }}
        >
          {filteredProducts.map(({ prod, slug, categoryName }, idx) => (
            <Box
              key={`${slug}-${prod.name}-${idx}`}
              onClick={() => {
                if (!sliderMoved.current) {
                  onOpenProduct(prod, slug);
                }
              }}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'calc((100% - 20px) / 2)',
                  md: 'calc((100% - 48px) / 3)',
                },
                minWidth: { xs: '100%', sm: 'unset' },
                maxWidth: { xs: '100%', sm: '420px', md: '440px' },
                boxSizing: 'border-box',
                flexShrink: 0,
                scrollSnapAlign: { xs: 'center', md: 'start' },
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                borderRadius: { xs: '20px', md: '24px' },
                border: '1px solid #e5ebe1',
                p: { xs: '14px', md: '18px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 6px 20px rgba(20,48,31,0.04)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 36px rgba(20,48,31,0.10)',
                  borderColor: '#c9d8c4',
                },
              }}
            >
              {/* Image Container */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '200px', sm: '230px', md: '260px' },
                  borderRadius: { xs: '15px', md: '18px' },
                  overflow: 'hidden',
                  backgroundColor: '#f4f6ec',
                  mb: 1.5,
                }}
              >
                {prod.image ? (
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: 'repeating-linear-gradient(45deg, #e6e7e2 0 10px, #dfe1da 10px 20px)',
                    }}
                  />
                )}

                {/* Stage Badge on Image */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(20, 48, 31, 0.88)',
                    backdropFilter: 'blur(6px)',
                    color: '#f4f6ec',
                    fontSize: { xs: '10.5px', md: '11px' },
                    fontWeight: 600,
                    px: '10px',
                    py: '4px',
                    borderRadius: '999px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {prod.tag}
                </Box>

                {/* Category Pill on Image Top Right */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(214, 238, 126, 0.92)',
                    backdropFilter: 'blur(6px)',
                    color: '#14301f',
                    fontSize: { xs: '9.5px', md: '10.5px' },
                    fontWeight: 700,
                    px: '9px',
                    py: '3.5px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {categoryName}
                </Box>
              </Box>

              {/* Product Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1, mb: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: { xs: '11.5px', md: '12px' },
                    fontWeight: 500,
                    color: '#657a62',
                    lineHeight: 1.3,
                  }}
                >
                  {prod.benefit}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                    fontSize: { xs: '18px', md: '20px' },
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: '#14201a',
                    minHeight: { xs: '42px', md: '48px' },
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  {prod.name}
                </Typography>

                {prod.description && (
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', md: '12.5px' },
                      color: '#6c7768',
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {prod.description}
                  </Typography>
                )}

                {/* Keys chips */}
                {prod.keys && prod.keys.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mt: 0.5 }}>
                    {prod.keys.slice(0, 3).map((key) => (
                      <Box
                        key={key}
                        component="span"
                        sx={{
                          fontSize: '9.5px',
                          fontWeight: 600,
                          backgroundColor: '#f2f6ee',
                          color: '#264830',
                          border: '1px solid #dce6d8',
                          px: '7px',
                          py: '2px',
                          borderRadius: '6px',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {key}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Bottom Row: Price & Details CTA */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pt: 1.2,
                  borderTop: '1px solid #eef2ec',
                  mt: 'auto',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '10.5px', color: '#828e7f', fontWeight: 500 }}>
                    Price {prod.quantity ? `(${prod.quantity})` : ''}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '15px', md: '17px' }, fontWeight: 700, color: '#14301f' }}>
                    {prod.price}
                  </Typography>
                </Box>

                <Button
                  size="small"
                  sx={{
                    backgroundColor: '#14301f',
                    color: '#d6ee7e',
                    fontSize: { xs: '11px', md: '12px' },
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '999px',
                    px: { xs: '12px', md: '14px' },
                    py: { xs: '5px', md: '6px' },
                    '&:hover': {
                      backgroundColor: '#20462f',
                    },
                  }}
                >
                  Details & Order →
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Mobile Carousel Navigation Arrows - Centered Below Track */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 2.5,
          }}
        >
          <IconButton
            onClick={() => handleScroll('left')}
            aria-label="Previous products"
            sx={{
              width: 42,
              height: 42,
              backgroundColor: '#ffffff',
              border: '1px solid #dbe2d6',
              color: '#14301f',
              boxShadow: '0 3px 10px rgba(20,48,31,0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#14301f',
                color: '#d6ee7e',
                borderColor: '#14301f',
              },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: '16px' }} />
          </IconButton>
          <IconButton
            onClick={() => handleScroll('right')}
            aria-label="Next products"
            sx={{
              width: 42,
              height: 42,
              backgroundColor: '#ffffff',
              border: '1px solid #dbe2d6',
              color: '#14301f',
              boxShadow: '0 3px 10px rgba(20,48,31,0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#14301f',
                color: '#d6ee7e',
                borderColor: '#14301f',
              },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </Box>
      </Box>

      {/* 3. UNIQUE ABOUT US SECTION (OUR HERITAGE & INSPIRATION STORY) */}
      <AboutUsSection onOpenEnquiry={() => onOpenEnquiry({ name: 'Curated Kitchen Advice' })} />

      {/* 4. FOUR LIFE STAGES SECTION */}
      <Box
        sx={{
          backgroundColor: '#fbfaf7',
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '44px' },
          pt: '70px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '.24em',
            color: '#6f7c6b',
          }}
        >
          FOUR LIFE STAGES
        </Typography>

        <Typography
          sx={{
            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
            fontSize: { xs: '26px', md: '52px' },
            lineHeight: 1.08,
            color: '#14201a',
            maxWidth: 720,
          }}
        >
          Grouped by the phase you are in, <span style={{ fontStyle: 'italic' }}>not the flavour.</span>
        </Typography>

        <Typography
          sx={{
            fontSize: '14.5px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: '#6b7568',
            maxWidth: 560,
          }}
        >
          Puberty, pregnancy, postpartum healing, and menopause — every recipe here was written for a specific season of life, and says so plainly.
        </Typography>
      </Box>

      {/* Collections Grid */}
      <Box
        sx={{
          backgroundColor: '#fbfaf7',
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '44px' },
          pt: '36px',
        }}
      >
        <Grid container spacing={3}>
          {COLLECTIONS.map((c: CollectionItem) => (
            <Grid item xs={12} sm={6} lg={3} key={c.slug} sx={{ display: 'flex' }}>
              <Box
                onClick={() => onOpenCategory(c.slug)}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  minHeight: { xs: '300px', sm: '320px', md: '335px' },
                  borderRadius: '24px',
                  background: 'repeating-linear-gradient(45deg, #dfe4d8 0 12px, #d7ddd0 12px 24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: { xs: '14px', md: '16px' },
                  boxShadow: '0 4px 18px rgba(20,48,31,0.03)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(20,48,31,0.10)',
                  },
                }}
              >
                {/* Top Badge Row */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1.2,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      background: 'rgba(251,250,247,0.92)',
                      color: '#14301f',
                      fontSize: '12px',
                      fontWeight: 600,
                      px: '14px',
                      py: '5px',
                      borderRadius: '999px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    }}
                  >
                    {c.count}
                  </Box>

                  <Box
                    component="span"
                    sx={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#264830',
                      letterSpacing: '0.08em',
                      backgroundColor: 'rgba(251,250,247,0.7)',
                      px: '10px',
                      py: '3px',
                      borderRadius: '999px',
                    }}
                  >
                    STAGE {c.num}
                  </Box>
                </Box>

                {/* Inner White Content Card */}
                <Box
                  sx={{
                    background: '#ffffff',
                    borderRadius: '18px',
                    p: { xs: '16px 16px', md: '18px 18px' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    boxShadow: '0 4px 14px rgba(20,48,31,0.04)',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Title with uniform minHeight */}
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                        fontSize: { xs: '20px', sm: '21px', md: '22px' },
                        fontWeight: 600,
                        lineHeight: 1.18,
                        color: '#14201a',
                        minHeight: { xs: '48px', sm: '50px', md: '52px' },
                        display: 'flex',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      {c.title}
                    </Typography>

                    {/* Clean blurb without dead space or truncation */}
                    <Typography
                      sx={{
                        fontSize: { xs: '12px', md: '12.5px' },
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: '#5e6c5d',
                      }}
                    >
                      {c.blurb}
                    </Typography>
                  </Box>

                  {/* Bottom Action Row directly underneath */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pt: 1.4,
                      mt: 1.6,
                      borderTop: '1px solid #eef2ec',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#14301f',
                        letterSpacing: '0.02em',
                      }}
                    >
                      Explore Stage →
                    </Typography>

                    <Box
                      component="span"
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '999px',
                        backgroundColor: '#14301f',
                        color: '#d6ee7e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.08)',
                        },
                      }}
                    >
                      →
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 5. THE HAND BEHIND IT (KITCHEN STORY BANNER) */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          mt: '80px',
          px: { xs: 3, sm: 4, md: '44px' },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#14301f',
            borderRadius: '34px',
            p: { xs: 4, sm: 5, md: '66px 60px' },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: '64px' },
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '.24em',
                color: '#d6ee7e',
              }}
            >
              THE HAND BEHIND IT
            </Typography>

            <Typography
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: { xs: '26px', sm: '44px', md: '48px' },
                lineHeight: 1.08,
                color: '#fbfaf7',
              }}
            >
              She measured in palms, <span style={{ fontStyle: 'italic' }}>not grams.</span>
            </Typography>

            <Typography
              sx={{
                fontSize: '14.5px',
                fontWeight: 300,
                lineHeight: 1.85,
                color: '#a9bbab',
                maxWidth: 460,
              }}
            >
              A notebook of family remedies became a kitchen serving a few hundred homes. Nothing was industrialised along the way — same iron kadai, same jaggery, same order of ingredients.
            </Typography>

            {/* 3 Stats */}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 1, flexWrap: 'wrap' }}>
              {[
                { val: '3', label: 'Generations' },
                { val: '0', label: 'Preservatives' },
                { val: '48h', label: 'Batch to box' },
              ].map((stat, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: '1 1 90px',
                    backgroundColor: '#1c3f28',
                    borderRadius: '18px',
                    p: '20px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                      fontSize: '34px',
                      color: '#d6ee7e',
                      lineHeight: 1,
                    }}
                  >
                    {stat.val}
                  </Typography>
                  <Typography sx={{ fontSize: '11.5px', color: '#95a793', mt: 1 }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              height: { xs: '260px', sm: '340px', md: '420px' },
              borderRadius: '26px',
              backgroundImage: 'url(/terasiri/images/about-hero-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(214, 238, 126, 0.2)',
            }}
          >
            {/* Subtle floating badge */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backgroundColor: 'rgba(19, 42, 30, 0.88)',
                backdropFilter: 'blur(8px)',
                px: '16px',
                py: '8px',
                borderRadius: '999px',
                border: '1px solid rgba(214, 238, 126, 0.3)',
              }}
            >
              <Typography sx={{ fontSize: '11.5px', fontWeight: 700, color: '#d6ee7e', letterSpacing: '.08em' }}>
                HEIRLOOM KITCHEN · BENGALURU
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 6. VIDEO TESTIMONIALS */}
      <VideoTestimonialsSection />

      {/* 7. BOTTOM BANNER (NOT SURE WHERE TO START?) */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          mt: '80px',
          px: { xs: 3, sm: 4, md: '44px' },
          pb: '90px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#a7b287',
            borderRadius: '34px',
            p: { xs: 4, sm: 6, md: '76px 60px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2.5,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '.24em',
              color: '#33452a',
            }}
          >
            NOT SURE WHERE TO START?
          </Typography>

          <Typography
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: { xs: '36px', sm: '48px', md: '56px' },
              lineHeight: 1.05,
              color: '#12200f',
              maxWidth: 760,
            }}
          >
            Tell us the month you are in.{' '}
            <span style={{ fontStyle: 'italic' }}>We will build the box.</span>
          </Typography>

          <Typography
            sx={{
              fontSize: '14.5px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#3a4a30',
              maxWidth: 480,
            }}
          >
            No cart, no checkout maze, no account. One message and we reply with a shortlist, prices and a dispatch date.
          </Typography>

          <Button
            onClick={() => onOpenEnquiry()}
            sx={{
              mt: '10px',
              background: '#14301f',
              color: '#d6ee7e',
              fontSize: '14px',
              fontWeight: 600,
              py: '13px',
              pl: '28px',
              pr: '12px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              '&:hover': {
                background: '#0e2416',
                color: '#d6ee7e',
              },
            }}
          >
            Enquire
            <Box
              component="span"
              sx={{
                width: 32,
                height: 32,
                borderRadius: '999px',
                background: '#d6ee7e',
                color: '#132a1e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              →
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
