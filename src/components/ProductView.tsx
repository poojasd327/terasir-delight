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

      {/* Product Deep Dive Details: Ingredients, How to Use, Benefits & Highlights */}
      {(product.ingredients || product.howToUse || product.benefits || product.highlights || product.description || product.note) && (
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
            px: { xs: 3, sm: 4, md: '44px' },
            pt: { xs: '44px', md: '56px' },
          }}
        >
          <Grid container spacing={{ xs: 3, md: 3.5 }} alignItems="stretch">
            {/* Ingredients Card */}
            {(product.ingredients || product.madeWith) && (
              <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: '1px solid #e5ebe1',
                    p: { xs: '24px', sm: '32px' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(20,48,31,0.03)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        backgroundColor: '#eef5ea',
                        color: '#264830',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}
                    >
                      🌿
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                          fontSize: '22px',
                          fontWeight: 600,
                          color: '#14201a',
                          lineHeight: 1.2,
                        }}
                      >
                        Ingredients & Composition
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#687765', fontWeight: 500 }}>
                        Pure, natural & whole-food ingredients
                      </Typography>
                    </Box>
                  </Box>

                  {product.ingredients && product.ingredients.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, mb: 2.5 }}>
                      {product.ingredients.map((ing, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            backgroundColor: '#f6f8f4',
                            border: '1px solid #dde5d7',
                            color: '#243e2b',
                            fontSize: '13px',
                            fontWeight: 500,
                            px: '13px',
                            py: '7px',
                            borderRadius: '999px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.8,
                          }}
                        >
                          <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#387346' }} />
                          {ing}
                        </Box>
                      ))}
                    </Box>
                  ) : product.madeWith ? (
                    <Typography sx={{ fontSize: '14.5px', color: '#384d3b', lineHeight: 1.7, mb: 2 }}>
                      {product.madeWith}
                    </Typography>
                  ) : null}

                  {product.highlights && product.highlights.length > 0 && (
                    <Box
                      sx={{
                        mt: 'auto',
                        pt: 2,
                        borderTop: '1px dashed #e2e8dc',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      {product.highlights.map((h, i) => (
                        <Box
                          key={i}
                          sx={{
                            fontSize: '11.5px',
                            fontWeight: 600,
                            color: '#245230',
                            backgroundColor: '#edf6e8',
                            border: '1px solid #d4e7cb',
                            px: '11px',
                            py: '5px',
                            borderRadius: '8px',
                          }}
                        >
                          ✓ {h}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>
            )}

            {/* How to Use Card */}
            {product.howToUse && product.howToUse.length > 0 && (
              <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: '1px solid #e5ebe1',
                    p: { xs: '24px', sm: '32px' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(20,48,31,0.03)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        backgroundColor: '#fbf3ea',
                        color: '#9c5317',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}
                    >
                      🥣
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                          fontSize: '22px',
                          fontWeight: 600,
                          color: '#14201a',
                          lineHeight: 1.2,
                        }}
                      >
                        How to Use
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#687765', fontWeight: 500 }}>
                        Simple daily rituals for best nourishment
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4, mt: 1 }}>
                    {product.howToUse.map((step, sIdx) => (
                      <Box
                        key={sIdx}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.4,
                        }}
                      >
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            backgroundColor: '#14301f',
                            color: '#d6ee7e',
                            fontSize: '11px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            mt: '2px',
                          }}
                        >
                          {sIdx + 1}
                        </Box>
                        <Typography sx={{ fontSize: '13.5px', color: '#2c3a2a', lineHeight: 1.55 }}>
                          {step}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            )}

            {/* Health & Wellness Benefits Card */}
            {((product.benefits && product.benefits.length > 0) || product.benefitsSummary) && (
              <Grid item xs={12} md={product.note ? 7 : 12} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    backgroundColor: '#fafbf8',
                    borderRadius: '24px',
                    border: '1px solid #e3eae0',
                    p: { xs: '24px', sm: '32px' },
                    width: '100%',
                    boxShadow: '0 4px 20px rgba(20,48,31,0.03)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        backgroundColor: '#e7f3ec',
                        color: '#1a5933',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}
                    >
                      ✨
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                          fontSize: '22px',
                          fontWeight: 600,
                          color: '#14201a',
                          lineHeight: 1.2,
                        }}
                      >
                        Benefits
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#687765', fontWeight: 500 }}>
                        Designed for daily vitality & wellness
                      </Typography>
                    </Box>
                  </Box>

                  {product.benefitsSummary && (
                    <Typography
                      sx={{
                        fontSize: '14.5px',
                        color: '#384838',
                        lineHeight: 1.7,
                        mb: 2.2,
                        fontWeight: 400,
                      }}
                    >
                      {product.benefitsSummary}
                    </Typography>
                  )}

                  {product.benefits && product.benefits.length > 0 && (
                    <Grid container spacing={1.5}>
                      {product.benefits.map((bText, bIdx) => {
                        const emojiMatch = bText.match(/^([\p{Extended_Pictographic}\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]+)\s*(.*)$/u);
                        const leadingEmoji = emojiMatch ? emojiMatch[1] : null;
                        const displayText = emojiMatch ? emojiMatch[2] : bText;

                        return (
                          <Grid item xs={12} sm={6} key={bIdx}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.2,
                                backgroundColor: '#ffffff',
                                border: '1px solid #e7eee4',
                                borderRadius: '12px',
                                p: '12px 14px',
                                height: '100%',
                              }}
                            >
                              {leadingEmoji ? (
                                <Box component="span" sx={{ fontSize: 17, lineHeight: 1.2, flexShrink: 0, mt: '1px' }}>
                                  {leadingEmoji}
                                </Box>
                              ) : (
                                <CheckCircleOutlineIcon sx={{ color: '#276839', fontSize: 18, mt: '2px', flexShrink: 0 }} />
                              )}
                              <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#1e2b1f', lineHeight: 1.5 }}>
                                {displayText}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Box>
              </Grid>
            )}

            {/* Note / Advisory Card */}
            {product.note && (
              <Grid item xs={12} md={product.benefits ? 5 : 12} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    backgroundColor: '#fbf9f4',
                    borderRadius: '24px',
                    border: '1px solid #eee5d3',
                    p: { xs: '24px', sm: '32px' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(20,48,31,0.03)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
                    <Box sx={{ fontSize: '20px' }}>💡</Box>
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#5c4524',
                      }}
                    >
                      Artisanal Nutrition Note
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '13.5px',
                      color: '#6e5634',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                    }}
                  >
                    &ldquo;{product.note}&rdquo;
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

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
