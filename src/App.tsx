import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProofBar } from './components/SocialProofBar';
import { AiWebsiteAuditor } from './components/AiWebsiteAuditor';
import { RoiCalculator } from './components/RoiCalculator';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { PillarsSection } from './components/PillarsSection';
import { CaseStudies } from './components/CaseStudies';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { StickyConversionBar } from './components/StickyConversionBar';
import { LiveActivityToasts } from './components/LiveActivityToasts';
import { BookingModal } from './components/BookingModal';
import { AuditQuizModal } from './components/AuditQuizModal';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { PricingTier, BookingSubmission } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isAuditOpen, setIsAuditOpen] = useState<boolean>(false);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>('privacy');
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [recentBookings, setRecentBookings] = useState<BookingSubmission[]>([]);

  const handleOpenBooking = (tier?: PricingTier) => {
    if (tier) setSelectedTier(tier);
    setIsBookingOpen(true);
  };

  const handleOpenAudit = () => {
    setIsAuditOpen(true);
  };

  const handleOpenLegal = (doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    setIsLegalOpen(true);
  };

  const handleScrollToRoi = () => {
    const el = document.getElementById('roi-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier);
    setIsBookingOpen(true);
  };

  const handleBookingComplete = (booking: BookingSubmission) => {
    setRecentBookings(prev => [booking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white relative overflow-x-hidden">
      
      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60 -z-20" />
      
      {/* Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAudit={handleOpenAudit} 
        onScrollToRoi={handleScrollToRoi} 
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenAudit={handleOpenAudit} 
          onScrollToRoi={handleScrollToRoi} 
        />

        {/* Social Proof & Metrics Strip */}
        <SocialProofBar />

        {/* Live AI Website Auditor (Deep CRO Engine) */}
        <AiWebsiteAuditor 
          onOpenBooking={() => handleOpenBooking()} 
        />

        {/* Interactive ROI Calculator */}
        <RoiCalculator 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenAudit={handleOpenAudit} 
        />

        {/* The Old Way vs The ConvertPulse Engine */}
        <ComparisonMatrix 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenAudit={handleOpenAudit} 
        />

        {/* 4 Scientific Conversion Pillars */}
        <PillarsSection 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenAudit={handleOpenAudit} 
        />

        {/* Quantified Case Studies */}
        <CaseStudies 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenAudit={handleOpenAudit} 
        />

        {/* Transparent Pricing & Guarantees */}
        <PricingSection 
          onSelectTier={handleSelectTier} 
          onOpenBooking={() => handleOpenBooking()} 
        />

        {/* Objection Crusher FAQs */}
        <FaqSection 
          onOpenBooking={() => handleOpenBooking()} 
        />

        {/* Final Conversion CTA Banner */}
        <FinalCta 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenAudit={handleOpenAudit} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAudit={handleOpenAudit} 
        onScrollToRoi={handleScrollToRoi} 
        onOpenLegal={handleOpenLegal}
      />

      {/* Sticky Bottom Conversion Bar */}
      <StickyConversionBar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAudit={handleOpenAudit} 
      />

      {/* Non-intrusive Social Proof Live Activity Toasts */}
      <LiveActivityToasts />

      {/* Strategy Call Scheduling Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedTier(null);
        }}
        selectedTier={selectedTier}
        onBookingComplete={handleBookingComplete}
      />

      {/* 60-Second Conversion Audit Quiz Modal */}
      <AuditQuizModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
        onBookCall={() => handleOpenBooking()} 
      />

      {/* Legal Documents Modal (Privacy, Terms, Cookies) */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialDoc={activeLegalDoc}
      />

    </div>
  );
}
