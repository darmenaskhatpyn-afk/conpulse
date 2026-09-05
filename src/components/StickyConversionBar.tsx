import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface StickyConversionBarProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const StickyConversionBar: React.FC<StickyConversionBarProps> = ({
  onOpenBooking,
  onOpenAudit
}) => {
  const { t, language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const getTitle = () => {
    if (language === 'ru') return 'Бесплатный разбор конверсии';
    if (language === 'kz') return 'Тегін конверсия талдауы';
    if (language === 'es') return 'Auditoría CRO Gratuita';
    return 'Free $1,500 CRO Teardown';
  };

  const getDesc = () => {
    if (language === 'ru') return 'Найдите утечки клиентов вместе с ведущим архитектором конверсий.';
    if (language === 'kz') return 'Сайттағы барлық қателерді анықтаңыз.';
    if (language === 'es') return 'Detecte fugas de clientes con un arquitecto senior.';
    return 'Pinpoint your friction leaks with a senior conversion architect.';
  };

  const getBadge = () => {
    if (language === 'ru') return 'ГАРАНТИЯ +2.5X';
    if (language === 'kz') return '+2.5X КЕПІЛДІК';
    if (language === 'es') return 'GARANTÍA 2.5X';
    return 'GUARANTEED 2.5X';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xl z-40"
      >
        <div className="bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 sm:p-4 shadow-xl flex items-center justify-between gap-2.5 sm:gap-4">
          
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500/20 text-amber-500" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-bold text-zinc-950 flex items-center gap-1.5 flex-wrap">
                <span className="truncate">{getTitle()}</span>
                <span className="hidden xs:inline text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-zinc-900 border border-amber-400/30">
                  {getBadge()}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 font-normal truncate">
                {getDesc()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl shadow-xs flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
            >
              <span>{t.nav.bookCall}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer rounded-lg hover:bg-zinc-100 shrink-0"
              aria-label="Dismiss sticky notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};


