'use client';

import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

interface TestimonialItem {
  id: string;
  videoSrc: string;
  cdnVideoSrc: string;
  thumbnail: string;
  name: string;
  role: string;
  stage: string;
  quote: string;
  rating: number;
}

const VIDEO_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    videoSrc: '/videos/testimonial1.mp4',
    cdnVideoSrc: 'https://web-assets.emovur.com/terasiri%20testimonial/testimonial1.mp4',
    thumbnail: '/images/testimonial_thumb_1.jpg',
    name: 'Ananya Rao',
    role: 'Postpartum Mother · Bengaluru',
    stage: 'Postpartum Care · Gond & Dry Fruit Laddus',
    quote: 'The Gond laddus gave me the warm, authentic strength I needed during my first forty days after delivery. Zero sugar, pure A2 ghee goodness.',
    rating: 5,
  },
  {
    id: 'test-2',
    videoSrc: '/videos/testimonial2.mp4',
    cdnVideoSrc: 'https://web-assets.emovur.com/terasiri%20testimonial/testimonial2.mp4',
    thumbnail: '/images/testimonial_thumb_2.jpg',
    name: 'Sneha & Vikram',
    role: 'Expecting Parents · Indiranagar',
    stage: 'Trimester 2 & 3 Nutrition',
    quote: 'Handcrafted just like my grandmother used to make. The dates and seed laddus kept my hemoglobin and daily energy levels rock solid.',
    rating: 5,
  },
  {
    id: 'test-3',
    videoSrc: '/videos/testimonial3.mp4',
    cdnVideoSrc: 'https://web-assets.emovur.com/terasiri%20testimonial/testimonial3.mp4',
    thumbnail: '/images/testimonial_thumb_3.jpg',
    name: 'Priya Sharma',
    role: 'Mother & Wellness Enthusiast · Bengaluru',
    stage: 'Sprouted Millets & Biotin Nutrition',
    quote: 'My whole family loves the sprouted ragi malt, and the Biotin seed laddus are our guilt-free 4 PM energy ritual every single day.',
    rating: 5,
  },
];

export default function VideoTestimonialsSection() {
  const [playingId, setPlayingId] = React.useState<string | null>(null);
  const [mutedStates, setMutedStates] = React.useState<Record<string, boolean>>({
    'test-1': false,
    'test-2': false,
    'test-3': false,
  });
  const [modalVideo, setModalVideo] = React.useState<TestimonialItem | null>(null);

  const videoRefs = React.useRef<Record<string, HTMLVideoElement | null>>({});

  const handleTogglePlay = (item: TestimonialItem) => {
    const video = videoRefs.current[item.id];
    if (!video) return;

    if (playingId === item.id) {
      video.pause();
      setPlayingId(null);
    } else {
      // Pause any previously playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      video.play().catch(() => {
        // Fallback: open modal if autoplay/inline was blocked
        setModalVideo(item);
      });
      setPlayingId(item.id);
    }
  };

  const handleToggleMute = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (video) {
      video.muted = !video.muted;
      setMutedStates((prev) => ({ ...prev, [id]: video.muted }));
    }
  };

  return (
    <Box
      component="section"
      id="video-testimonials"
      sx={{
        maxWidth: 1400,
        mx: 'auto',
        mt: { xs: '70px', md: '90px' },
        px: { xs: 3, sm: 4, md: '44px' },
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 4, md: 5.5 } }}>
        {/* Eyebrow Badge */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(20, 48, 31, 0.06)',
            border: '1px solid rgba(20, 48, 31, 0.12)',
            px: '14px',
            py: '5px',
            borderRadius: '999px',
            mb: 2,
          }}
        >
          <VideocamOutlinedIcon sx={{ fontSize: 16, color: '#14301f' }} />
          <Typography
            sx={{
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#14301f',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Video Testimonials
          </Typography>
        </Box>

        {/* Heading */}
        <Typography
          component="h2"
          sx={{
            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
            fontSize: { xs: '30px', sm: '38px', md: '46px' },
            fontWeight: 600,
            lineHeight: 1.15,
            color: '#14201a',
            mb: 1.5,
          }}
        >
          Heirloom Care, Told by Real Mothers
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: { xs: '14px', md: '15.5px' },
            fontWeight: 300,
            lineHeight: 1.65,
            color: '#606e5f',
            maxWidth: 640,
            mx: 'auto',
          }}
        >
          Watch mothers and families share their real journey with Terasiri stage-formulated, handcrafted heirloom nourishment.
        </Typography>
      </Box>

      {/* 3 Video Cards Grid */}
      <Grid container spacing={{ xs: 3, md: 3.5 }}>
        {VIDEO_TESTIMONIALS.map((item) => {
          const isPlaying = playingId === item.id;
          const isMuted = mutedStates[item.id] ?? false;

          return (
            <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ display: 'flex' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '26px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(20, 48, 31, 0.08)',
                  boxShadow: '0 8px 30px rgba(20, 48, 31, 0.05)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 40px rgba(20, 48, 31, 0.12)',
                  },
                }}
              >
                {/* Video / Thumbnail Container (16:9 / 4:5 Aspect Ratio) */}
                <Box
                  onClick={() => handleTogglePlay(item)}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: { xs: '125%', sm: '130%' }, // ~4:5 portrait format for reels/testimonials
                    backgroundColor: '#14201a',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  {/* HTML5 Video Element */}
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    playsInline
                    preload="metadata"
                    poster={item.thumbnail}
                    onEnded={() => setPlayingId(null)}
                    onPause={() => {
                      if (playingId === item.id) setPlayingId(null);
                    }}
                    onPlay={() => setPlayingId(item.id)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  >
                    <source src={item.videoSrc} type="video/mp4" />
                    <source src={item.cdnVideoSrc} type="video/mp4" />
                  </video>

                  {/* Top Category Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      zIndex: 3,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.6,
                      backgroundColor: 'rgba(20, 48, 31, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#d6ee7e',
                      px: 1.3,
                      py: 0.4,
                      borderRadius: '999px',
                      border: '1px solid rgba(214, 238, 126, 0.25)',
                    }}
                  >
                    <AutoAwesomeIcon sx={{ fontSize: 12, color: '#d6ee7e' }} />
                    <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.03em' }}>
                      {item.stage.split('·')[0].trim()}
                    </Typography>
                  </Box>

                  {/* Volume Control Button (when playing) */}
                  {isPlaying && (
                    <IconButton
                      onClick={(e) => handleToggleMute(e, item.id)}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        zIndex: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: '#ffffff',
                        backdropFilter: 'blur(6px)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        },
                      }}
                    >
                      {isMuted ? <VolumeOffRoundedIcon sx={{ fontSize: 18 }} /> : <VolumeUpRoundedIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                  )}

                  {/* Center Play/Pause Button Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: isPlaying ? 54 : 64,
                      height: isPlaying ? 54 : 64,
                      borderRadius: '50%',
                      backgroundColor: isPlaying ? 'rgba(20, 48, 31, 0.65)' : 'rgba(214, 238, 126, 0.92)',
                      color: isPlaying ? '#ffffff' : '#14301f',
                      boxShadow: isPlaying
                        ? '0 6px 20px rgba(0,0,0,0.3)'
                        : '0 8px 26px rgba(20,48,31,0.35), 0 0 0 6px rgba(214, 238, 126, 0.3)',
                      backdropFilter: 'blur(8px)',
                      opacity: isPlaying ? 0 : 1,
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1.08)',
                      },
                    }}
                  >
                    {isPlaying ? (
                      <PauseRoundedIcon sx={{ fontSize: 32 }} />
                    ) : (
                      <PlayArrowRoundedIcon sx={{ fontSize: 38, ml: '3px' }} />
                    )}
                  </Box>

                  {/* Gradient shadow at bottom of video preview */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '80px',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(15, 28, 20, 0.75) 100%)',
                      pointerEvents: 'none',
                      zIndex: 2,
                    }}
                  />
                </Box>

                {/* Card Content & Feedback info */}
                <Box
                  sx={{
                    p: { xs: '18px 18px', md: '20px 22px' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Box>
                    {/* Star Rating & Verified Badge */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
                      <Box sx={{ display: 'flex', gap: 0.3, color: '#f59e0b' }}>
                        {[...Array(item.rating)].map((_, i) => (
                          <StarIcon key={i} sx={{ fontSize: 16 }} />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <VerifiedIcon sx={{ fontSize: 14, color: '#16a34a' }} />
                        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#16a34a' }}>
                          Verified Purchase
                        </Typography>
                      </Box>
                    </Box>

                    {/* Customer Quote */}
                    <Typography
                      sx={{
                        fontSize: '13.5px',
                        lineHeight: 1.55,
                        color: '#263428',
                        fontStyle: 'italic',
                        mb: 1.8,
                      }}
                    >
                      “{item.quote}”
                    </Typography>
                  </Box>

                  {/* Customer Info Footer */}
                  <Box
                    sx={{
                      pt: 1.4,
                      borderTop: '1px solid #f1f5f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#14201a',
                          lineHeight: 1.2,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: '11.5px', color: '#728071', mt: 0.2 }}>
                        {item.role}
                      </Typography>
                    </Box>

                    {/* Watch Video Text Button */}
                    <Typography
                      onClick={() => handleTogglePlay(item)}
                      sx={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#14301f',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.4,
                        transition: 'color 0.2s',
                        '&:hover': {
                          color: '#2d6a45',
                        },
                      }}
                    >
                      {isPlaying ? 'Pause ⏸' : 'Watch ▶'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Lightbox Modal Dialog (for expanded playback) */}
      <Dialog
        open={Boolean(modalVideo)}
        onClose={() => setModalVideo(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: '#000000',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', backgroundColor: '#000000' }}>
          <IconButton
            onClick={() => setModalVideo(null)}
            aria-label="close"
            sx={{
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 10,
              color: '#ffffff',
              backgroundColor: 'rgba(0,0,0,0.6)',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {modalVideo && (
            <Box sx={{ width: '100%', maxHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video
                controls
                autoPlay
                playsInline
                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
              >
                <source src={modalVideo.videoSrc} type="video/mp4" />
                <source src={modalVideo.cdnVideoSrc} type="video/mp4" />
              </video>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
