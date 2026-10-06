'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import HeaderNavbar from '@/components/HeaderNavbar';
import Footer from '@/components/Footer';
import HomeView from '@/components/HomeView';
import CategoryView from '@/components/CategoryView';
import ProductView from '@/components/ProductView';
import EnquiryDrawer, { EnquiryData } from '@/components/EnquiryDrawer';
import LeadPopupModal from '@/components/LeadPopupModal';
import { COLLECTIONS, PRODUCTS, ProductItem } from '@/data/taayiData';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function findProductByParam(catSlug: string, param: string): ProductItem | null {
  const items = PRODUCTS[catSlug] || [];
  const cleanParam = param.toLowerCase().replace(/[^a-z0-9]/g, '');
  const lowerParam = param.toLowerCase();

  // 1. Try exact slug match
  const exact = items.find((p) => slugify(p.name) === lowerParam);
  if (exact) return exact;

  // 2. Try normalized clean comparison
  const normalized = items.find((p) => p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanParam);
  if (normalized) return normalized;

  // 3. Try partial substring matching (e.g., 'almond-laddu' matching 'Healthy Almond Laddu')
  const partial = items.find((p) => {
    const pClean = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return pClean.includes(cleanParam) || cleanParam.includes(pClean) ||
      p.name.toLowerCase().includes(lowerParam.replace(/-/g, ' '));
  });
  if (partial) return partial;

  // 4. Try matching shot or manthe/menthya alias
  const alias = items.find((p) => {
    if (p.shot && (slugify(p.shot) === lowerParam || p.shot.replace(/[^a-z0-9]/g, '').includes(cleanParam))) return true;
    if (lowerParam.includes('manthe') && p.name.toLowerCase().includes('menthya')) return true;
    if (lowerParam.includes('menthya') && p.name.toLowerCase().includes('manthe')) return true;
    return false;
  });
  if (alias) return alias;

  // 5. Try matching by core keywords
  const words = lowerParam.split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !['laddu', 'laddoo', 'powder', 'mix'].includes(w));
  if (words.length > 0) {
    const wordMatch = items.find((p) => {
      const pLower = p.name.toLowerCase();
      return words.some((w) => pLower.includes(w));
    });
    if (wordMatch) return wordMatch;
  }

  return items[0] || null;
}

export default function TaayiApp() {
  const [page, setPage] = React.useState<'home' | 'category' | 'product'>('home');
  const [currentCollection, setCurrentCollection] = React.useState<string>('postpartum');
  const [selectedProduct, setSelectedProduct] = React.useState<ProductItem | null>(null);
  const [enquiry, setEnquiry] = React.useState<EnquiryData | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = React.useState<boolean>(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = React.useState<boolean>(false);
  const [leadModalProduct, setLeadModalProduct] = React.useState<string | undefined>(undefined);
  const [leadModalQuantity, setLeadModalQuantity] = React.useState<string | undefined>(undefined);

  // Parse URL on mount and popstate (browser back/forward)
  const syncFromUrl = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const productParam = params.get('product');

    if (categoryParam && COLLECTIONS.some((c) => c.slug === categoryParam)) {
      if (productParam) {
        const found = findProductByParam(categoryParam, productParam);
        if (found) {
          setSelectedProduct(found);
          setCurrentCollection(categoryParam);
          setPage('product');
          return;
        }
      }
      setCurrentCollection(categoryParam);
      setPage('category');
      return;
    }

    if (window.location.hash === '#about') {
      setPage('home');
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    setPage('home');
  }, []);

  React.useEffect(() => {
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [syncFromUrl]);

  // Listen for open modal events (e.g. from 10s timer or floating buttons)
  React.useEffect(() => {
    const handleOpenModal = (e: any) => {
      if (e?.detail?.product) setLeadModalProduct(e.detail.product);
      if (e?.detail?.quantity) setLeadModalQuantity(e.detail.quantity);
      setIsLeadModalOpen(true);
    };
    window.addEventListener('open_terasiri_lead_modal', handleOpenModal);
    return () => window.removeEventListener('open_terasiri_lead_modal', handleOpenModal);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoHome = (pushState: boolean = true) => {
    setPage('home');
    setSelectedProduct(null);
    if (pushState && typeof window !== 'undefined') {
      const url = window.location.pathname;
      window.history.pushState({}, '', url);
    }
    scrollToTop();
  };

  const handleGoCatalogue = (slug: string = 'postpartum', pushState: boolean = true) => {
    setCurrentCollection(slug);
    setSelectedProduct(null);
    setPage('category');
    if (pushState && typeof window !== 'undefined') {
      const url = `${window.location.pathname}?category=${encodeURIComponent(slug)}`;
      window.history.pushState({}, '', url);
    }
    scrollToTop();
  };

  const handleOpenProduct = (product: ProductItem, collectionSlug: string, pushState: boolean = true) => {
    setSelectedProduct(product);
    setCurrentCollection(collectionSlug);
    setPage('product');
    if (pushState && typeof window !== 'undefined') {
      const prodSlug = slugify(product.name);
      const url = `${window.location.pathname}?category=${encodeURIComponent(collectionSlug)}&product=${encodeURIComponent(prodSlug)}`;
      window.history.pushState({}, '', url);
    }
    scrollToTop();
  };

  const handleOpenEnquiry = (details?: { name?: string; pack?: string; price?: string; collection?: string }) => {
    if (details?.name) {
      setLeadModalProduct(details.name);
    }
    if (details?.pack) {
      setLeadModalQuantity(details.pack);
    }
    setIsLeadModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const handleCloseLeadModal = React.useCallback(() => {
    setIsLeadModalOpen(false);
  }, []);

  const handleGoAbout = () => {
    if (page !== 'home') {
      setPage('home');
      setSelectedProduct(null);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `${window.location.pathname}#about`);
      }
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `${window.location.pathname}#about`);
      }
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fbfaf7',
        color: '#14201a',
        fontFamily: 'var(--font-manrope), "Manrope", sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      {/* Sticky Header Navbar */}
      <HeaderNavbar
        onGoHome={() => handleGoHome(true)}
        onGoAbout={handleGoAbout}
        onGoCatalogue={(slug) => handleGoCatalogue(slug, true)}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Main Dynamic View */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {page === 'home' && (
          <HomeView
            onOpenCategory={(slug) => handleGoCatalogue(slug, true)}
            onOpenProduct={(prod, slug) => handleOpenProduct(prod, slug, true)}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {page === 'category' && (
          <CategoryView
            currentSlug={currentCollection}
            onSelectCategory={(slug) => {
              handleGoCatalogue(slug, true);
            }}
            onGoHome={() => handleGoHome(true)}
            onOpenProduct={(prod, slug) => handleOpenProduct(prod, slug, true)}
            onOpenEnquiry={() => handleOpenEnquiry()}
          />
        )}

        {page === 'product' && selectedProduct && (
          <ProductView
            product={selectedProduct}
            collectionSlug={currentCollection}
            onGoHome={() => handleGoHome(true)}
            onBackToCategory={(slug) => handleGoCatalogue(slug, true)}
            onOpenProduct={(prod, slug) => handleOpenProduct(prod, slug, true)}
            onOpenEnquiry={(details) => handleOpenEnquiry(details)}
          />
        )}
      </Box>

      {/* Footer */}
      <Footer
        onGoHome={() => handleGoHome(true)}
        onGoAbout={handleGoAbout}
        onOpenCategory={(slug) => handleGoCatalogue(slug, true)}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Slide-out Enquiry Drawer (WhatsApp & Email) */}
      <EnquiryDrawer
        open={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        enquiry={enquiry}
      />

      {/* Lead Capture Popup Modal */}
      <LeadPopupModal
        open={isLeadModalOpen}
        onClose={handleCloseLeadModal}
        initialProduct={leadModalProduct}
        initialQuantity={leadModalQuantity}
      />
    </Box>
  );
}
