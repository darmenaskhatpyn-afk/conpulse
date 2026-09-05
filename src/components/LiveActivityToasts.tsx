import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, CheckCircle2, UserCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LIVE_ACTIVITY_EVENTS } from '../data/conversionData';
import { useLanguage } from '../context/LanguageContext';

export const LiveActivityToasts: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  const localizedEvents = language === 'ru' ? [
    { text: 'Дмитрий К. (Москва) запустил экспресс-аудит клиники', time: '2 минуты назад' },
    { text: 'Айдос С. (Алматы) забронировал стратегическую сессию', time: '5 минут назад' },
    { text: 'Elena M. (E-Commerce) внедрила sticky-чекаут (+64% конверсии)', time: '8 минут назад' },
    { text: 'Алексей В. (SaaS) закрыл сделку на $12,400 после аудита', time: '14 минут назад' },
  ] : language === 'kz' ? [
    { text: 'Нұрлан Т. (Астана) сайтқа экспресс-аудит жасады', time: '3 минут бұрын' },
    { text: 'Айдос С. (Алматы) стратегиялық сессияға жазылды', time: '6 минут бұрын' },
    { text: 'Әлия Қ. (E-Commerce) жаңа конверсия воронкасын қосты', time: '11 минут бұрын' },
  ] : language === 'es' ? [
    { text: 'Carlos R. (Madrid) reservó una sesión estratégica de CRO', time: 'hace 4 minutos' },
    { text: 'Sofía M. (B2B SaaS) completó la auditoría de conversión', time: 'hace 9 minutos' },
    { text: 'Mateo G. (E-Commerce) generó +58% en ventas tras rediseño', time: 'hace 15 minutos' },
  ] : LIVE_ACTIVITY_EVENTS;

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % localizedEvents.length);
        setVisible(true);
      }, 600);
    }, 8000);

    return () => clearInterval(timer);
  }, [localizedEvents.length]);

  const currentEvent = localizedEvents[currentIndex % localizedEvents.length] || localizedEvents[0];

  const badgeText = language === 'ru' ? 'Подтвержденное действие'
    : language === 'kz' ? 'Расталған әрекет'
    : language === 'es' ? 'Acción Verificada'
    : 'Verified Action';

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:block max-w-sm pointer-events-none">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-3 bg-white/95 backdrop-blur-sm border border-zinc-200/90 rounded-2xl shadow-lg flex items-center gap-3 pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-zinc-900 leading-snug">
                {currentEvent.text}
              </p>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-500 font-normal">
                <span className="text-emerald-600 font-medium">• {badgeText}</span>
                <span>{currentEvent.time}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


