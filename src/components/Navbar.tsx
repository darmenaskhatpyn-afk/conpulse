import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  PhoneCall, 
  Sparkles, 
  Menu, 
  X, 
  Globe,
  Check,
  ChevronDown,
  Calculator,
  BarChart3,
  Layers,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FlagIcon } from './FlagIcon';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
  onScrollToRoi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onOpenAudit, 
  onScrollToRoi 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t, availableLanguages } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t.nav.aiAuditor, href: '#ai-auditor', icon: Sparkles },
    { name: t.nav.roiCalc, href: '#roi-calculator', action: onScrollToRoi, icon: Calculator },
    { name: t.nav.caseStudies, href: '#case-studies', icon: BarChart3 },
    { name: t.nav.framework, href: '#framework', icon: Layers },
    { name: t.nav.pricing, href: '#pricing', icon: CreditCard },
    { name: t.nav.faqs, href: '#faqs', icon: HelpCircle },
  ];

  const currentLangObj = availableLanguages.find(l => l.code === language) || availableLanguages[0];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-xs py-2.5 sm:py-3' 
          : 'bg-white/85 backdrop-blur-xs border-b border-zinc-100 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-black text-sm tracking-tight shadow-2xs group-hover:bg-zinc-800 transition-colors">
              CP
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 leading-none">
                Convert<span className="text-amber-500">Pulse</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium tracking-wide mt-0.5">
                CRO & Growth Engine
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.action) {
                    e.preventDefault();
                    link.action();
                  }
                }}
                className="hover:text-zinc-950 transition-colors py-1 flex items-center gap-1.5"
              >
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Bar (Responsive: visible on both Desktop and Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Language Selector Dropdown (ALWAYS visible on all screens, mobile & desktop) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="px-2 sm:px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-200 border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-800 flex items-center gap-1.5 cursor-pointer transition-colors"
                aria-label="Сменить язык / Switch language"
                title="Сменить язык / Switch language"
              >
                <FlagIcon code={language} size="sm" />
                <span className="text-xs font-bold uppercase tracking-wider">{currentLangObj.code}</span>
                <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangMenuOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200/90 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 flex items-center justify-between mb-1">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>{t.footer.langTitle || 'Язык'}</span>
                      </span>
                      <span className="text-zinc-300">4 варианта</span>
                    </div>
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          language === lang.code ? 'bg-zinc-950 text-white font-semibold' : 'text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <FlagIcon code={lang.code} size="md" />
                          <span>{lang.label}</span>
                        </span>
                        {language === lang.code && <Check className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Quick Call Action (compact on mobile, full text on desktop) */}
            <button
              onClick={onOpenBooking}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs font-bold"
              aria-label={t.nav.bookCall}
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline sm:inline">{t.nav.bookCall}</span>
              <span className="xs:hidden sm:hidden">Разбор</span>
              <ArrowRight className="hidden sm:inline w-3 h-3 text-zinc-800" />
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 active:bg-zinc-200 border border-zinc-200 rounded-lg bg-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-zinc-950" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Full Experience on Phone) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[52px] sm:top-[57px] bottom-0 bg-white/98 backdrop-blur-md border-b-2 border-zinc-950 px-4 pt-3 pb-8 overflow-y-auto z-40 animate-in slide-in-from-top-2 duration-200 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Dedicated Mobile Language Switcher Section */}
            <div className="p-3 bg-zinc-50 border border-zinc-200/90 rounded-xl shadow-2xs">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-zinc-700" />
                  <span>{t.footer.langTitle || 'Язык / Language'}</span>
                </span>
                <span className="text-[10px] text-zinc-400 font-normal">Выберите язык</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {availableLanguages.map((lang) => {
                  const isActive = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FlagIcon code={lang.code} size="md" />
                        <span>{lang.label}</span>
                      </span>
                      {isActive && <Check className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 pt-1 text-sm font-semibold text-zinc-800">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.action) {
                        e.preventDefault();
                        link.action();
                      }
                    }}
                    className="px-3.5 py-2.5 rounded-lg hover:bg-zinc-100 flex items-center justify-between transition-colors border border-transparent hover:border-zinc-200 text-zinc-900"
                  >
                    <span className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 text-zinc-500" />
                      <span>{link.name}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer Buttons */}
          <div className="pt-4 border-t border-zinc-200 flex flex-col gap-2.5 mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-zinc-900 bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-200 border border-zinc-300 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.nav.freeAudit}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-zinc-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-zinc-950" />
              <span>{t.nav.bookCall}</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
