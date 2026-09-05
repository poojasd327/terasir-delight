'use client';

import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  COLLECTIONS,
  PRODUCTS,
  packsFor,
  ProductItem,
} from '@/data/taayiData';

interface ProductViewProps {
  product: ProductItem;
  collectionSlug: string;
  onGoHome: () => void;
  onBackToCategory: (slug: string) => void;
  onOpenProduct: (product: ProductItem, collectionSlug: string) => void;
  onOpenEnquiry: (details: { name: string; pack: string; price: string; collection: string }) => void;
}

export default function ProductView({
  product,
  collectionSlug,
  onGoHome,
  onBackToCategory,
  onOpenProduct,
  onOpenEnquiry,
}: ProductViewProps) {
  const collection =
    COLLECTIONS.find((c) => c.slug === collectionSlug) || COLLECTIONS[1];
  const packList = React.useMemo(() => {
    if (product.packOptions && product.packOptions.length > 0) {
      return product.packOptions.map((o) => o.size);
    }
    return packsFor(product);
  }, [product]);

  const [selectedPack, setSelectedPack] = React.useState(packList[0] || '250g');

  React.useEffect(() => {
    if (packList.length > 0) {
      setSelectedPack(packList[0]);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product.name, packList]);

  const currentPrice = React.useMemo(() => {
    if (product.packOptions && product.packOptions.length > 0) {
      const match = product.packOptions.find((o) => o.size === selectedPack);
      if (match) return match.price;
    }
    return product.price;
  }, [product, selectedPack]);

  const relatedProducts = React.useMemo(() => {
    const sameCollection = (PRODUCTS[collection.slug] || []).filter(
      (p) => p.name !== product.name
    );
    if (sameCollection.length >= 3) {
      return sameCollection.slice(0, 3).map((p) => ({ prod: p, slug: collection.slug }));
    }
    const otherSlugs = Object.keys(PRODUCTS).filter((s) => s !== collection.slug);
    const combined = [...sameCollection.map((p) => ({ prod: p, slug: collection.slug }))];
    for (const s of otherSlugs) {
      for (const p of PRODUCTS[s] || []) {
        if (!combined.some((item) => item.prod.name === p.name) && p.name !== product.name) {
          combined.push({ prod: p, slug: s });
          if (combined.length === 3) break;
        }
      }
      if (combined.length === 3) break;
    }
    return combined.slice(0, 3);
  }, [collection.slug, product.name]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Breadcrumbs */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '44px' },
          pt: '40px',
          display: 'flex',
          gap: '9px',
          fontSize: '12px',
          color: '#8b948a',
          flexWrap: 'wrap',
        }}
      >
        <Box
          component="span"
          onClick={onGoHome}
          sx={{ cursor: 'pointer', color: '#14301f', fontWeight: 600 }}
        >
          Home
        </Box>
        <span>/</span>
        <Box
          component="span"
          onClick={() => onBackToCategory(collection.slug)}
          sx={{ cursor: 'pointer', color: '#14301f', fontWeight: 600 }}
        >
          {collection.title}
        </Box>
        <span>/</span>
        <span style={{ color: '#14201a' }}>{product.name}</span>
      </Box>

      {/* Main Product Hero Grid */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 3, sm: 4, md: '44px' },
          pt: '24px',
        }}
      >
        <Grid container spacing={{ xs: 4, md: 5.5 }} alignItems="stretch">
          {/* Gallery Col */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  minHeight: { xs: '360px', sm: '480px', md: '100%' },
                  borderRadius: '28px',
                  overflow: 'hidden',
                  backgroundColor: '#f3f4ee',
                }}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: 'repeating-linear-gradient(45deg, #e6e7e2 0 10px, #dfe1da 10px 20px)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '12px',
                        color: '#7b8479',
                      }}
                    >
                      {product.shot}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Details Col */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5, justifyContent: 'space-between' }}>
              <Box
                component="span"
                sx={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#eef0ea',
                  color: '#2c4a33',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  px: '16px',
                  py: '8px',
                  borderRadius: '999px',
                }}
              >
                {product.tag}
              </Box>

              <Typography
                sx={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                  fontSize: { xs: '38px', sm: '56px' },
                  lineHeight: 1.02,
                  color: '#14201a',
                }}
              >
                {product.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: '15.5px',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: '#5c6659',
                  maxWidth: 480,
                }}
              >
                {product.benefit} — made in the week you order it, with no preservatives and nothing added for shelf life.
              </Typography>

              {/* Made With Badge */}
              {product.madeWith && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 1.2,
                    backgroundColor: '#f1f4ed',
                    border: '1px solid #dfe5d8',
                    borderRadius: '14px',
                    px: '16px',
                    py: '10px',
                    width: 'fit-content',
                    maxWidth: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#264830',
                      textTransform: 'uppercase',
                      letterSpacing: '.1em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Made With:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '13.5px',
                      fontWeight: 500,
                      color: '#344e39',
                    }}
                  >
                    {product.madeWith}
                  </Typography>
                </Box>
              )}

              {/* Pack Size */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    letterSpacing: '.16em',
                    color: '#8b948a',
                  }}
                >
                  PACK SIZE
                </Typography>

                <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
                  {packList.map((pack) => {
                    const isSelected = pack === selectedPack;
                    const tier = product.packOptions?.find((o) => o.size === pack);
                    return (
                      <Box
                        key={pack}
                        component="span"
                        onClick={() => setSelectedPack(pack)}
                        sx={{
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: 600,
                          px: '20px',
                          py: '10px',
                          borderRadius: '999px',
                          border: isSelected ? '1.5px solid #14301f' : '1px solid #dcddd6',
                          backgroundColor: isSelected ? '#14301f' : 'transparent',
                          color: isSelected ? '#fbfaf7' : '#5c6659',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          transition: 'all 0.2s',
                        }}
                      >
                        <span>{pack}</span>
                        {tier && (
                          <Box
                            component="span"
                            sx={{
                              fontSize: '12px',
                              opacity: isSelected ? 0.9 : 0.7,
                              fontWeight: 500,
                            }}
                          >
                            · {tier.price}
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                    fontSize: '40px',
                    color: '#14301f',
                    lineHeight: 1,
                  }}
                >
                  {currentPrice}
                </Typography>
                {selectedPack && (
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#6f7e6d',
                      letterSpacing: '0.02em',
                    }}
                  >
                    / {selectedPack}
                  </Typography>
                )}
              </Box>

              {/* Enquire Button */}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Button
                  onClick={() =>
                    onOpenEnquiry({
                      name: product.name,
                      pack: selectedPack,
                      price: currentPrice,
                      collection: collectionSlug,
                    })
                  }
                  sx={{
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

              <Box sx={{ height: '1px', backgroundColor: '#e4e5df', my: 0.5 }} />

              {/* Key Uses Checklist */}
              {product.uses && product.uses.length > 0 && (
                <Box
                  sx={{
                    backgroundColor: '#fafbf9',
                    border: '1px solid #e7ece2',
                    borderRadius: '16px',
                    p: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '.14em',
                      color: '#5b6b58',
                      textTransform: 'uppercase',
                    }}
                  >
                    Key Uses & Benefits:
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.9,
                    }}
                  >
                    {product.uses.map((useText, uIdx) => (
                      <Box
                        key={uIdx}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.2,
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{ color: '#2d603a', fontSize: 17, mt: '2px', flexShrink: 0 }}
                        />
                        <Typography
                          sx={{
                            fontSize: '13.5px',
                            color: '#2c382b',
                            lineHeight: 1.5,
                            fontWeight: 400,
                          }}
                        >
                          {useText}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Often taken alongside */}
      {relatedProducts.length > 0 && (
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
            px: { xs: 3, sm: 4, md: '44px' },
            pt: '70px',
            pb: '90px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mb: '26px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: { xs: '32px', md: '44px' },
                color: '#14201a',
              }}
            >
              Often taken alongside
            </Typography>

            <Box
              component="span"
              onClick={() => onBackToCategory(collection.slug)}
              sx={{
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                color: '#14301f',
                borderBottom: '1px solid #dcddd6',
                pb: '5px',
              }}
            >
              Back to {collection.title} →
            </Box>
          </Box>

          <Grid container spacing={3}>
            {relatedProducts.map(({ prod: p, slug: s }, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: 'flex' }}>
                <Box
                  onClick={() => onOpenProduct(p, s)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: '1px solid #e7ece3',
                    p: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    boxShadow: '0 4px 16px rgba(20,48,31,0.04)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      backgroundColor: '#fbfcf9',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 14px 32px rgba(20,48,31,0.10)',
                      borderColor: '#c6d6c2',
                    },
                  }}
                >
                  {/* Product Image Container */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '240px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      backgroundColor: '#f4f6ec',
                      mb: 2,
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
                          background: 'repeating-linear-gradient(45deg, #e6e7e2 0 10px, #dfe1da 10px 20px)',
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(20, 48, 31, 0.88)',
                        backdropFilter: 'blur(6px)',
                        color: '#f4f6ec',
                        fontSize: '11px',
                        fontWeight: 600,
                        px: '12px',
                        py: '5px',
                        borderRadius: '999px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}
                    >
                      {p.tag}
                    </Box>
                  </Box>

                  {/* Info Section */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1, mb: 2 }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#657a62' }}>
                      {p.benefit}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                        fontSize: '21px',
                        fontWeight: 600,
                        lineHeight: 1.2,
                        color: '#14201a',
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'flex-start',
                      }}
                    >
                      {p.name}
                    </Typography>
                    {p.description && (
                      <Typography
                        sx={{
                          fontSize: '12.5px',
                          color: '#6c7768',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {p.description}
                      </Typography>
                    )}
                  </Box>

                  {/* Bottom Price & Button */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pt: 1.5,
                      borderTop: '1px solid #eef2ec',
                      mt: 'auto',
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: '11px', color: '#828e7f', fontWeight: 500 }}>
                        Price {p.quantity ? `(${p.quantity})` : ''}
                      </Typography>
                      <Typography sx={{ fontSize: '17px', fontWeight: 700, color: '#14301f' }}>
                        {p.price}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProduct(p, s);
                      }}
                      sx={{
                        backgroundColor: '#14301f',
                        color: '#d6ee7e',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '999px',
                        px: '14px',
                        py: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        '&:hover': {
                          backgroundColor: '#20462f',
                        },
                      }}
                    >
                      View Product →
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
