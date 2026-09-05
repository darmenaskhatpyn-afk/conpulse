import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Globe,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LegalDocType } from './LegalModal';
import { ScrollReveal } from './MotionEffects';
import { FlagIcon } from './FlagIcon';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
  onScrollToRoi: () => void;
  onOpenLegal: (doc: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenBooking, 
  onOpenAudit, 
  onScrollToRoi,
  onOpenLegal
}) => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: newsletterEmail,
          type: 'newsletter_subscription',
          data: {
            source: 'footer_newsletter'
          }
        })
      });
    } catch (err) {
      console.error('Newsletter error:', err);
    } finally {
      setSubmitting(false);
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-12 text-zinc-400 text-xs overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal direction="up" distance={20} className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900/80">
          
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-bold shadow-xs">
                <TrendingUp className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Convert<span className="text-amber-400">Pulse</span>
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm font-normal">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">{t.footer.navTitle}</h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-400">
              <li><button onClick={onScrollToRoi} className="hover:text-white transition-colors cursor-pointer">{t.nav.roiCalc}</button></li>
              <li><a href="#ai-auditor" className="hover:text-white transition-colors">{t.nav.aiAuditor}</a></li>
              <li><a href="#framework" className="hover:text-white transition-colors">{t.nav.framework}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a></li>
              <li><a href="#faqs" className="hover:text-white transition-colors">{t.nav.faqs}</a></li>
            </ul>
          </div>

          {/* Conversion Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">{t.footer.legalTitle}</h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-400">
              <li><a href="#ai-auditor" className="hover:text-white transition-colors">{t.hero.btnAiAudit}</a></li>
              <li><button onClick={onOpenBooking} className="hover:text-white transition-colors cursor-pointer text-left">{t.hero.btnBookCall}</button></li>
              <li><button onClick={onOpenAudit} className="hover:text-white transition-colors cursor-pointer text-left">{t.nav.freeAudit}</button></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              {t.footer.newsletterTitle}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              {t.footer.newsletterDesc}
            </p>

            {subscribed ? (
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-emerald-400 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t.footer.subscribedText}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </ScrollReveal>

        {/* Global Language Selector Row (Easy access on Mobile and Desktop) */}
        <div className="pt-8 pb-6 border-b border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Globe className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.footer.langTitle || 'Язык / Language'}:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {availableLanguages.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-white border-amber-400/50 shadow-xs'
                      : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                  }`}
                  aria-label={`Switch to ${lang.label}`}
                >
                  <FlagIcon code={lang.code} size="sm" />
                  <span>{lang.label}</span>
                  {isActive && <Check className="w-3 h-3 text-amber-400 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-normal">
          <div>
            © {new Date().getFullYear()} ConvertPulse. {t.footer.rights}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onOpenLegal('privacy')} 
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {t.footer.privacy}
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenLegal('terms')} 
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {t.footer.terms}
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenLegal('cookies')} 
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {t.footer.cookies}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
