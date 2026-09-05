'use client';

import * as React from 'react';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';

export const PRODUCTS_LIST = [
  'Biotin Laddu (Nuts & Seeds) - ₹375 (250g)',
  'Moringa Magic Laddu - ₹350 (250g)',
  'Cashew Coconut Laddu - ₹325 (250g)',
  'Healthy Almond Laddu - ₹350 (250g)',
  'Black Sesame Laddu - ₹250 (250g)',
  'Panjiri - ₹400 (250g)',
  'Postpartum Laddu - ₹400 (250g)',
  'Gond Laddu - ₹375 (250g)',
  'Seed Cycle Laddu - ₹300 (250g)',
  'Thyroid Reversible Laddu - ₹350 (250g)',
  'Multigrain Malt Powder - ₹200 (250gm)',
  'Sprouted Ragi Malt Powder - ₹250 (500g)',
  'Sprouted Ragi Almond Mix - ₹150 (250gm)',
  'Lactation Drink Mix - ₹200 (200gm)',
  'Herbal Bath Powder - ₹200 (200gm)',
  'Traditional Massage Oil - ₹200 (100ml)',
  'Manthe Hittu - ₹200 (250gm)',
  'Personalized Nutrition Box (Custom Formulation)',
];

interface LeadPopupModalProps {
  open?: boolean;
  onClose?: () => void;
  initialProduct?: string;
  initialQuantity?: string;
}

export default function LeadPopupModal({
  open: controlledOpen,
  onClose: controlledOnClose,
  initialProduct,
  initialQuantity,
}: LeadPopupModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [productName, setProductName] = React.useState(PRODUCTS_LIST[0]);
  const [quantity, setQuantity] = React.useState('250g');
  const [location, setLocation] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const isControlled = typeof controlledOpen === 'boolean';
  const isOpen = isControlled ? controlledOpen : internalOpen;

  // Sync initialProduct if passed
  React.useEffect(() => {
    if (initialProduct) {
      const match = PRODUCTS_LIST.find((p) => p.toLowerCase().includes(initialProduct.toLowerCase()));
      if (match) {
        setProductName(match);
      } else {
        setProductName(initialProduct);
      }
    }
  }, [initialProduct]);

  // Sync initialQuantity if passed
  React.useEffect(() => {
    if (initialQuantity) {
      setQuantity(initialQuantity);
    }
  }, [initialQuantity]);

  // Automatically open modal 10 seconds after each page load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isControlled && controlledOnClose) {
        // If controlled by parent, we can dispatch window event or trigger parent
        window.dispatchEvent(new CustomEvent('open_terasiri_lead_modal'));
      } else {
        setInternalOpen(true);
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [isControlled, controlledOnClose]);

  // Listen for open events
  React.useEffect(() => {
    const handleOpenEvent = (e: any) => {
      setSubmitted(false);
      if (e?.detail?.product) {
        const match = PRODUCTS_LIST.find((p) => p.toLowerCase().includes(e.detail.product.toLowerCase()));
        if (match) setProductName(match);
      }
      if (e?.detail?.quantity) {
        setQuantity(e.detail.quantity);
      }
      if (!isControlled) {
        setInternalOpen(true);
      }
    };

    window.addEventListener('open_terasiri_lead_modal', handleOpenEvent);
    return () => window.removeEventListener('open_terasiri_lead_modal', handleOpenEvent);
  }, [isControlled]);

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalOpen(false);
    }
  };

  const handleOpenTrigger = () => {
    setSubmitted(false);
    if (isControlled) {
      window.dispatchEvent(new CustomEvent('open_terasiri_lead_modal'));
    } else {
      setInternalOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);

    const leadPayload = {
      name: name.trim() || 'Website Visitor',
      phone: cleanPhone.length === 10 ? `+91${cleanPhone}` : cleanPhone,
      phoneNumber: cleanPhone.length === 10 ? `+91${cleanPhone}` : cleanPhone,
      quantity: quantity.trim() || '250g',
      location: location.trim() || 'Not Specified',
      productName,
      product: productName,
      source: 'Website Lead Popup',
      notes: `Product: ${productName} | Quantity: ${quantity} | Location: ${location.trim() || 'Not Specified'}`,
      fields: {
        product: productName,
        quantity: quantity.trim() || '250g',
        location: location.trim() || 'Not Specified',
        lead_source: 'Website Lead Popup',
      },
    };

    try {
      // 1. Direct fetch to CRM webhook endpoint
      const webhookPromise = fetch('/gw/api/leads/webapi/39c86884-2812-8378-dcf2-adf3-1c906cf41c58', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
        mode: 'no-cors',
      }).catch(() => null);

      // 2. Next.js route proxy backup
      const apiPromise = fetch('/terasiri/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Visitor',
          phone: cleanPhone,
          productName,
          quantity: quantity.trim() || '250g',
          location: location.trim() || 'Not Specified',
        }),
      }).catch(() => null);

      await Promise.allSettled([webhookPromise, apiPromise]);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = `https://wa.me/919945216950?text=${encodeURIComponent(
    `Hi Terasiri Team! I just submitted an enquiry for ${productName} (${quantity}) to ${location || 'Bengaluru'}.`
  )}`;

  return (
    <>
      {/* =========================================================================
          FLOATING WHATSAPP WIDGET (Fixed at Bottom-Right of All Pages)
         ========================================================================= */}
      <Box
        component="a"
        href="https://wa.me/919945216950?text=Hi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        sx={{
          position: 'fixed',
          bottom: { xs: 20, sm: 26 },
          right: { xs: 18, sm: 26 },
          zIndex: 1100,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.3 },
          backgroundColor: '#25D366',
          color: '#ffffff',
          py: { xs: '10px', sm: '11px' },
          pl: { xs: '12px', sm: '14px' },
          pr: { xs: '16px', sm: '20px' },
          borderRadius: '999px',
          textDecoration: 'none',
          boxShadow: 'none',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: 'floatingPulse 3s infinite ease-in-out',
          '@keyframes floatingPulse': {
            '0%, 100%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-4px)',
            },
          },
          '&:hover': {
            backgroundColor: '#1ebc59',
            color: '#ffffff',
            transform: 'translateY(-4px)',
            boxShadow: 'none',
          },
        }}
      >
        {/* WhatsApp Icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
        </Box>

        {/* Text for Desktop */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', textAlign: 'left' }}>
          <Typography
            sx={{
              fontSize: '12.5px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '.02em',
              color: '#ffffff',
            }}
          >
            Chat with us
          </Typography>
          <Typography sx={{ fontSize: '10.5px', color: '#e8fdec', fontWeight: 600 }}>
            WhatsApp Concierge
          </Typography>
        </Box>

        {/* Text for Mobile */}
        <Typography
          sx={{
            display: { xs: 'block', sm: 'none' },
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '.02em',
          }}
        >
          WhatsApp
        </Typography>
      </Box>

      {/* =========================================================================
          POPUP MODAL DIALOG
         ========================================================================= */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(15, 23, 18, 0.68)',
              backdropFilter: 'blur(6px)',
            },
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: { xs: '20px', sm: '28px' },
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 25px 65px -10px rgba(10, 30, 18, 0.35)',
            m: { xs: '12px', sm: 3 },
            width: { xs: 'calc(100% - 24px) !important', sm: 'auto' },
            maxWidth: { xs: '420px', md: '780px' },
            maxHeight: { xs: 'calc(100dvh - 24px)', sm: 'calc(100dvh - 64px)' },
            border: '1px solid rgba(20, 48, 31, 0.08)',
            boxSizing: 'border-box',
          },
        }}
      >
        <DialogContent sx={{ p: 0, overflowX: 'hidden', overflowY: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' },
              minHeight: { md: '520px' },
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* =========================================================================
                LEFT PANEL: Green Background with Brand Info (Desktop Only)
               ========================================================================= */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#14301f',
                color: '#fbfaf7',
                p: '38px 32px',
                position: 'relative',
                backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(214, 238, 126, 0.12) 0%, transparent 60%)',
              }}
            >
              {/* Top Brand & Story */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: '#fff7ee',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src="/terasiri/images/terasiri_logo.png"
                      alt="Terasiri Logo"
                      fill
                      sizes="44px"
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                        fontSize: '19px',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.15,
                      }}
                    >
                      Terasiri Delights
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '11px',
                        color: '#d6ee7e',
                        letterSpacing: '.06em',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      Heirloom Kitchen · Bengaluru
                    </Typography>
                  </Box>
                </Box>

                {/* Eyebrow Badge */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.8,
                    backgroundColor: 'rgba(214, 238, 126, 0.14)',
                    border: '1px solid rgba(214, 238, 126, 0.35)',
                    px: 1.4,
                    py: 0.4,
                    borderRadius: '999px',
                    mb: 2,
                  }}
                >
                  <SparklesIcon sx={{ fontSize: 13, color: '#d6ee7e' }} />
                  <Typography
                    sx={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#d6ee7e',
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Fresh Batch Enquiry
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                    fontSize: '26px',
                    lineHeight: 1.2,
                    fontWeight: 600,
                    color: '#ffffff',
                    mb: 1.5,
                  }}
                >
                  Hand-rolled with love,{' '}
                  <span style={{ color: '#d6ee7e', fontStyle: 'italic', fontWeight: 500 }}>
                    made fresh to order.
                  </span>
                </Typography>

                <Typography
                  sx={{
                    fontSize: '13px',
                    color: '#b9cbb6',
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                >
                  Zero refined sugar, zero preservatives, and no artificial additives. Prepared strictly with A2 cow ghee, sprouted millets, and organic ingredients.
                </Typography>
              </Box>

              {/* Quality Checklist */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.2,
                  pt: 2.5,
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {[
                  '100% Pure A2 Gir Cow Ghee',
                  'No Refined Sugar & No Preservatives',
                  'Customized for Trimesters & Postpartum',
                  'FSSAI Certified: 21225191000785',
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                    <VerifiedIcon sx={{ fontSize: 15, color: '#d6ee7e', flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '12px', color: '#e2ece0', fontWeight: 500 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* =========================================================================
                RIGHT PANEL: Form Content (Shown on Both Desktop and Mobile)
               ========================================================================= */}
            <Box
              sx={{
                p: { xs: '20px 18px', sm: '32px 32px' },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={handleClose}
                aria-label="close"
                sx={{
                  position: 'absolute',
                  top: { xs: 12, sm: 14 },
                  right: { xs: 12, sm: 14 },
                  zIndex: 20,
                  color: '#64748b',
                  backgroundColor: '#f1f5f9',
                  width: { xs: 30, sm: 34 },
                  height: { xs: 30, sm: 34 },
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: '#14301f',
                    color: '#ffffff',
                    transform: 'rotate(90deg)',
                  },
                }}
                size="small"
              >
                <CloseIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
              </IconButton>

              {submitted ? (
                /* Success Screen */
                <Box
                  sx={{
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: '#ecfdf5',
                      border: '2px solid #a7f3d0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#059669',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 40 }} />
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                      fontSize: '23px',
                      fontWeight: 700,
                      color: '#14301f',
                    }}
                  >
                    Enquiry Submitted!
                  </Typography>

                  <Typography sx={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, maxWidth: 320 }}>
                    Thank you, <strong>{name || 'valued customer'}</strong>! We will confirm batch availability and dispatch details with you on WhatsApp at <strong>+91 {phone}</strong>.
                  </Typography>

                  <Button
                    component="a"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      mt: 1.5,
                      background: '#25D366',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 700,
                      py: '11px',
                      px: '24px',
                      borderRadius: '999px',
                      textTransform: 'none',
                      width: '100%',
                      boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                      '&:hover': {
                        background: '#1ebc59',
                      },
                    }}
                  >
                    Chat on WhatsApp Directly →
                  </Button>
                </Box>
              ) : (
                /* Clean Form with Labels Above Fields */
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Header with Logo */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, pr: { xs: 4, sm: 4.5 }, pb: 0.5 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: { xs: 40, sm: 44 },
                        height: { xs: 40, sm: 44 },
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: '#fff7ee',
                        flexShrink: 0,
                        border: '1.5px solid #dce5da',
                        p: 0.3,
                      }}
                    >
                      <Image
                        src="/terasiri/images/terasiri_logo.png"
                        alt="Terasiri Logo"
                        fill
                        sizes="44px"
                        style={{ objectFit: 'contain' }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                          fontSize: { xs: '18px', sm: '19px' },
                          fontWeight: 700,
                          color: '#14301f',
                          lineHeight: 1.15,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        Terasiri Delights
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '11.5px' },
                          color: '#64748b',
                          fontWeight: 500,
                          mt: 0.2,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        Fresh Batch Enquiry &amp; Availability
                      </Typography>
                    </Box>
                  </Box>

                  {errorMsg && (
                    <Box
                      sx={{
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#991b1b',
                        py: 0.8,
                        px: 1.2,
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {errorMsg}
                    </Box>
                  )}

                  {/* 1. Name */}
                  <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', mb: 0.4 }}>
                      Your Name <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="e.g. Pooja Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: '#f8fafc',
                          fontSize: '13.5px',
                          '& fieldset': { borderColor: '#e2e8f0' },
                          '&:hover fieldset': { borderColor: '#14301f' },
                          '&.Mui-focused fieldset': { borderColor: '#14301f', borderWidth: '1.5px' },
                          '&.Mui-focused': { backgroundColor: '#ffffff' },
                        },
                      }}
                    />
                  </Box>

                  {/* 2. Phone Number */}
                  <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', mb: 0.4 }}>
                      Phone / WhatsApp Number <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      variant="outlined"
                      size="small"
                      type="tel"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneOutlinedIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                            <Typography sx={{ fontSize: '12.5px', color: '#14301f', fontWeight: 700, ml: 0.4 }}>
                              +91
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: '#f8fafc',
                          fontSize: '13.5px',
                          '& fieldset': { borderColor: '#e2e8f0' },
                          '&:hover fieldset': { borderColor: '#14301f' },
                          '&.Mui-focused fieldset': { borderColor: '#14301f', borderWidth: '1.5px' },
                          '&.Mui-focused': { backgroundColor: '#ffffff' },
                        },
                      }}
                    />
                  </Box>

                  {/* 3. Product Name Dropdown */}
                  <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', mb: 0.4 }}>
                      Product Formulation <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ShoppingBagOutlinedIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: '#f8fafc',
                          fontSize: '13px',
                          '& fieldset': { borderColor: '#e2e8f0' },
                          '&:hover fieldset': { borderColor: '#14301f' },
                          '&.Mui-focused fieldset': { borderColor: '#14301f', borderWidth: '1.5px' },
                          '&.Mui-focused': { backgroundColor: '#ffffff' },
                        },
                      }}
                    >
                      {PRODUCTS_LIST.map((prod) => (
                        <MenuItem key={prod} value={prod} sx={{ fontSize: '13px', py: 0.9 }}>
                          {prod}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  {/* 4. Quantity & Location Grid */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1.2fr' },
                      gap: { xs: 1.4, sm: 1.4 },
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Quantity */}
                    <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
                      <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', mb: 0.4 }}>
                        Quantity <span style={{ color: '#ef4444' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="250g / 500g / 1kg"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        variant="outlined"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ScaleOutlinedIcon sx={{ color: '#94a3b8', fontSize: 17 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#f8fafc',
                            fontSize: '13.5px',
                            '& fieldset': { borderColor: '#e2e8f0' },
                            '&:hover fieldset': { borderColor: '#14301f' },
                            '&.Mui-focused fieldset': { borderColor: '#14301f', borderWidth: '1.5px' },
                            '&.Mui-focused': { backgroundColor: '#ffffff' },
                          },
                        }}
                      />
                    </Box>

                    {/* Location */}
                    <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
                      <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', mb: 0.4 }}>
                        City / Location <span style={{ color: '#ef4444' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="e.g. Bengaluru"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        variant="outlined"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnOutlinedIcon sx={{ color: '#94a3b8', fontSize: 17 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#f8fafc',
                            fontSize: '13.5px',
                            '& fieldset': { borderColor: '#e2e8f0' },
                            '&:hover fieldset': { borderColor: '#14301f' },
                            '&.Mui-focused fieldset': { borderColor: '#14301f', borderWidth: '1.5px' },
                            '&.Mui-focused': { backgroundColor: '#ffffff' },
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{
                      mt: 0.6,
                      background: 'linear-gradient(135deg, #14301f 0%, #0d2215 100%)',
                      color: '#d6ee7e',
                      fontSize: '14.5px',
                      fontWeight: 700,
                      py: '12px',
                      borderRadius: '999px',
                      textTransform: 'none',
                      boxShadow: '0 6px 18px rgba(20,48,31,0.25)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #091a10 0%, #173824 100%)',
                        color: '#e4fca3',
                        transform: 'translateY(-1.5px)',
                        boxShadow: '0 8px 24px rgba(20,48,31,0.35)',
                      },
                      '&:disabled': {
                        background: '#94a3b8',
                        color: '#ffffff',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={22} sx={{ color: '#d6ee7e' }} /> : 'Submit Enquiry →'}
                  </Button>

                  {/* Trust Subtext */}
                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: 'center',
                      color: '#64748b',
                      fontSize: '11px',
                      mt: -0.2,
                    }}
                  >
                    🔒 100% Confidential · Pan-India Doorstep Delivery
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
