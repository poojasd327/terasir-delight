'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

export interface EnquiryData {
  name?: string;
  pack?: string;
  price?: string;
  collection?: string;
}

interface EnquiryDrawerProps {
  open: boolean;
  onClose: () => void;
  enquiry: EnquiryData | null;
}

export default function EnquiryDrawer({
  open,
  onClose,
  enquiry,
}: EnquiryDrawerProps) {
  const [sent, setSent] = React.useState(false);
  const [qty, setQty] = React.useState(1);
  const [fName, setFName] = React.useState('');
  const [fPhone, setFPhone] = React.useState('');
  const [fPin, setFPin] = React.useState('');
  const [fNote, setFNote] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setSent(false);
      setQty(1);
    }
  }, [open]);

  const handleSendWhatsApp = () => {
    const lines = [
      'Hello Terasiri Delights — I would like to enquire.',
      '',
      'Product: ' + (enquiry?.name || 'General Enquiry'),
      'Pack: ' + (enquiry?.pack || 'Standard'),
      'Quantity: ' + qty,
      enquiry?.collection ? 'Collection: ' + enquiry.collection : null,
      enquiry?.price ? 'Listed price: ' + enquiry.price : null,
      '',
      'Name: ' + (fName.trim() || '—'),
      'WhatsApp: ' + (fPhone.trim() || '—'),
      'Pincode: ' + (fPin.trim() || '—'),
      fNote.trim() ? 'Note: ' + fNote.trim() : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open('https://wa.me/919945216950?text=' + encodeURIComponent(lines), '_blank');
    setSent(true);
  };

  const handleSendEmail = () => {
    const body =
      'Product: ' +
      (enquiry?.name || 'General Enquiry') +
      '\nPack: ' +
      (enquiry?.pack || 'Standard') +
      '\nQuantity: ' +
      qty +
      (enquiry?.collection ? '\nCollection: ' + enquiry.collection : '') +
      '\n\nName: ' +
      (fName || '') +
      '\nWhatsApp: ' +
      (fPhone || '') +
      '\nPincode: ' +
      (fPin || '') +
      (fNote ? '\nNote: ' + fNote : '');

    window.location.href =
      'mailto:terasiri44@gmail.com?subject=' +
      encodeURIComponent('Enquiry — ' + (enquiry?.name || 'General')) +
      '&body=' +
      encodeURIComponent(body);
    setSent(true);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 480, md: 520 },
          maxWidth: '100vw',
          height: '100dvh',
          maxHeight: '100dvh',
          backgroundColor: '#fbfaf7',
          borderRadius: { xs: 0, sm: '32px 0 0 32px' },
          p: 0,
          boxShadow: '-20px 0 60px rgba(20,32,26,.18)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100dvh',
          overflow: 'hidden',
        }}
      >
        {/* Header - Fixed Top */}
        <Box
          sx={{
            flexShrink: 0,
            px: { xs: 2.5, sm: 4 },
            pt: { xs: 'max(16px, env(safe-area-inset-top, 16px))', sm: 3.5, md: 4 },
            pb: { xs: 1.5, sm: 2 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
            borderBottom: '1px solid rgba(228, 229, 223, 0.5)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: '10.5px', sm: '11.5px' },
                fontWeight: 600,
                letterSpacing: '.2em',
                color: '#6f7c6b',
              }}
            >
              SEND AN ENQUIRY
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: { xs: '24px', sm: '30px', md: '34px' },
                lineHeight: 1.08,
                color: '#14201a',
              }}
            >
              We reply <span style={{ fontStyle: 'italic' }}>the same day.</span>
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            aria-label="Close enquiry drawer"
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              borderRadius: '999px',
              border: '1px solid #dcddd6',
              color: '#5c6659',
              flexShrink: 0,
              '&:hover': {
                borderColor: '#14301f',
                color: '#14301f',
                backgroundColor: 'rgba(20, 48, 31, 0.05)',
              },
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: 17, sm: 19 } }} />
          </IconButton>
        </Box>

        {!sent ? (
          <>
            {/* Scrollable Form Body */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                px: { xs: 2.5, sm: 4 },
                py: { xs: 2, sm: 2.5 },
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 2.25 },
                WebkitOverflowScrolling: 'touch',
                '&::-webkit-scrollbar': { width: '5px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { background: '#d6ddd1', borderRadius: '10px' },
                '&::-webkit-scrollbar-thumb:hover': { background: '#b2beaa' },
              }}
            >
              {/* Attached item card */}
              <Box
                sx={{
                  background: '#eef0ea',
                  borderRadius: { xs: '16px', sm: '20px' },
                  p: { xs: '14px 16px', sm: '18px 20px' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '10.5px', sm: '11px' },
                    fontWeight: 600,
                    letterSpacing: '.14em',
                    color: '#6f7c6b',
                  }}
                >
                  ATTACHED TO THIS MESSAGE
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                      fontSize: { xs: '19px', sm: '22px', md: '24px' },
                      lineHeight: 1.15,
                      color: '#14201a',
                    }}
                  >
                    {enquiry?.name || 'General Product Enquiry'}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '13.5px', sm: '14.5px' },
                      fontWeight: 600,
                      color: '#14301f',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {enquiry?.price || '—'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                  <Box
                    component="span"
                    sx={{
                      fontSize: { xs: '11px', sm: '11.5px' },
                      fontWeight: 600,
                      background: '#fbfaf7',
                      color: '#3c4a3e',
                      px: { xs: '10px', sm: '12px' },
                      py: { xs: '5px', sm: '6px' },
                      borderRadius: '999px',
                    }}
                  >
                    {enquiry?.pack || 'Standard pack'}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      fontSize: { xs: '11px', sm: '11.5px' },
                      fontWeight: 600,
                      background: '#fbfaf7',
                      color: '#3c4a3e',
                      px: { xs: '10px', sm: '12px' },
                      py: { xs: '5px', sm: '6px' },
                      borderRadius: '999px',
                    }}
                  >
                    Qty {qty}
                  </Box>
                  {enquiry?.collection && (
                    <Box
                      component="span"
                      sx={{
                        fontSize: { xs: '11px', sm: '11.5px' },
                        fontWeight: 600,
                        background: '#fbfaf7',
                        color: '#3c4a3e',
                        px: { xs: '10px', sm: '12px' },
                        py: { xs: '5px', sm: '6px' },
                        borderRadius: '999px',
                      }}
                    >
                      {enquiry.collection}
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Quantity */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                <Typography sx={{ fontSize: { xs: '10.5px', sm: '11px' }, fontWeight: 600, letterSpacing: '.14em', color: '#6f7c6b' }}>
                  QUANTITY
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[1, 2, 3, 5].map((num) => (
                    <Box
                      key={num}
                      component="span"
                      onClick={() => setQty(num)}
                      sx={{
                        cursor: 'pointer',
                        fontSize: { xs: '12.5px', sm: '13px' },
                        fontWeight: 600,
                        px: { xs: '16px', sm: '19px' },
                        py: { xs: '7px', sm: '9px' },
                        borderRadius: '999px',
                        border: qty === num ? '1px solid #14301f' : '1px solid #dcddd6',
                        backgroundColor: qty === num ? '#14301f' : '#ffffff',
                        color: qty === num ? '#fbfaf7' : '#5c6659',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: '#14301f',
                        },
                      }}
                    >
                      {num}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Form Inputs Grid */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 1.75 } }}>
                {/* Your Name */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                  <Typography sx={{ fontSize: { xs: '10.5px', sm: '11px' }, fontWeight: 600, letterSpacing: '.14em', color: '#6f7c6b' }}>
                    YOUR NAME
                  </Typography>
                  <TextField
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    placeholder="Type your name"
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        fontSize: { xs: '13.5px', sm: '14px' },
                        '& fieldset': { borderColor: '#e2e3dd' },
                        '&:hover fieldset': { borderColor: '#14301f' },
                        '&.Mui-focused fieldset': { borderColor: '#14301f' },
                      },
                    }}
                  />
                </Box>

                {/* WhatsApp Number */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                  <Typography sx={{ fontSize: { xs: '10.5px', sm: '11px' }, fontWeight: 600, letterSpacing: '.14em', color: '#6f7c6b' }}>
                    WHATSAPP NUMBER
                  </Typography>
                  <TextField
                    value={fPhone}
                    onChange={(e) => setFPhone(e.target.value)}
                    placeholder="+91 00000 00000"
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        fontSize: { xs: '13.5px', sm: '14px' },
                        '& fieldset': { borderColor: '#e2e3dd' },
                        '&:hover fieldset': { borderColor: '#14301f' },
                        '&.Mui-focused fieldset': { borderColor: '#14301f' },
                      },
                    }}
                  />
                </Box>

                {/* Delivery Pincode */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                  <Typography sx={{ fontSize: { xs: '10.5px', sm: '11px' }, fontWeight: 600, letterSpacing: '.14em', color: '#6f7c6b' }}>
                    DELIVERY PINCODE
                  </Typography>
                  <TextField
                    value={fPin}
                    onChange={(e) => setFPin(e.target.value)}
                    placeholder="560001"
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        fontSize: { xs: '13.5px', sm: '14px' },
                        '& fieldset': { borderColor: '#e2e3dd' },
                        '&:hover fieldset': { borderColor: '#14301f' },
                        '&.Mui-focused fieldset': { borderColor: '#14301f' },
                      },
                    }}
                  />
                </Box>

                {/* Anything We Should Know */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                  <Typography sx={{ fontSize: { xs: '10.5px', sm: '11px' }, fontWeight: 600, letterSpacing: '.14em', color: '#6f7c6b' }}>
                    ANYTHING WE SHOULD KNOW
                  </Typography>
                  <TextField
                    value={fNote}
                    onChange={(e) => setFNote(e.target.value)}
                    placeholder="Due date, allergies, or which month you are in — it helps us advise."
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={4}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        fontSize: { xs: '13.5px', sm: '14px' },
                        '& fieldset': { borderColor: '#e2e3dd' },
                        '&:hover fieldset': { borderColor: '#14301f' },
                        '&.Mui-focused fieldset': { borderColor: '#14301f' },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Actions - Sticky Bottom Safe-Area Footer */}
            <Box
              sx={{
                flexShrink: 0,
                px: { xs: 2.5, sm: 4 },
                pt: { xs: 1.5, sm: 2 },
                pb: { xs: 'calc(16px + env(safe-area-inset-bottom, 12px))', sm: 3 },
                backgroundColor: '#fbfaf7',
                borderTop: '1px solid rgba(228, 229, 223, 0.7)',
                boxShadow: '0 -6px 20px rgba(20, 32, 26, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Button
                fullWidth
                onClick={handleSendWhatsApp}
                sx={{
                  backgroundColor: '#14301f',
                  color: '#d6ee7e',
                  fontSize: { xs: '13.5px', sm: '14px' },
                  fontWeight: 600,
                  py: { xs: '12px', sm: '13.5px' },
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  '&:hover': {
                    backgroundColor: '#0e2416',
                  },
                }}
              >
                <span>Send on WhatsApp</span>
                <span style={{ fontSize: '15px' }}>→</span>
              </Button>
              <Button
                fullWidth
                onClick={handleSendEmail}
                sx={{
                  border: '1px solid #dcddd6',
                  backgroundColor: '#ffffff',
                  color: '#14201a',
                  fontSize: { xs: '13.5px', sm: '14px' },
                  fontWeight: 600,
                  py: { xs: '10.5px', sm: '12px' },
                  borderRadius: '999px',
                  '&:hover': {
                    borderColor: '#14301f',
                    backgroundColor: '#f8f9f6',
                  },
                }}
              >
                Email instead
              </Button>
              <Typography
                sx={{
                  fontSize: { xs: '10.5px', sm: '11px' },
                  color: '#8b948a',
                  textAlign: 'center',
                  mt: 0.25,
                }}
              >
                No account, no payment online
              </Typography>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: { xs: 2.5, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                background: '#eef0ea',
                borderRadius: { xs: '20px', sm: '24px' },
                p: { xs: '24px 20px', sm: '32px 28px' },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'flex-start',
              }}
            >
              <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.18em', color: '#2c4a33' }}>
                MESSAGE OPENED
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                  fontSize: { xs: '26px', sm: '32px' },
                  lineHeight: 1.1,
                  color: '#14201a',
                }}
              >
                Your enquiry is <span style={{ fontStyle: 'italic' }}>on its way.</span>
              </Typography>
              <Typography sx={{ fontSize: { xs: '13.5px', sm: '14px' }, fontWeight: 300, lineHeight: 1.75, color: '#5c6659' }}>
                Product, pack and quantity are already written into the message. Send it and we reply with availability, the total including shipping, and a dispatch date — usually within a few hours.
              </Typography>
              <Button
                onClick={onClose}
                sx={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  py: '11px',
                  px: '24px',
                  borderRadius: '999px',
                  border: '1px solid #dcddd6',
                  backgroundColor: '#ffffff',
                  color: '#14201a',
                  mt: 1,
                  '&:hover': {
                    borderColor: '#14301f',
                  },
                }}
              >
                Keep browsing
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
