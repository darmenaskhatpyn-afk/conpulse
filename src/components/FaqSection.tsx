import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/conversionData';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedWords } from './MotionEffects';

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const { t, language } = useLanguage();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Localized FAQ questions & answers for seamless experience
  const localizedFaqs = language === 'ru' ? [
    {
      q: 'Как работает гарантия роста конверсии в 2.5 раза?',
      a: 'Мы привязываем свои финансовые обязательства к вашим реальным заявкам. Если в течение 60 дней после запуска конверсия вашего сайта не вырастет минимум в 2.5 раза — мы работаем бесплатно до достижения цели или возвращаем 100% средств.'
    },
    {
      q: 'Сколько времени занимает создание и запуск нового сайта?',
      a: 'От 14 до 21 рабочего дня. Мы полностью берем на себя аудит, проектирование UX, психологический копирайтинг, интеграции с CRM и тестирование.'
    },
    {
      q: 'Интегрируется ли система с нашей CRM и аналитикой?',
      a: 'Да! Мы настраиваем мгновенную передачу заявок в Telegram, WhatsApp, amoCRM, Bitrix24, HubSpot, Google Таблицы и Яндекс Метрику / GA4.'
    },
    {
      q: 'Подходит ли это для новичка или небольшого бизнеса?',
      a: 'Идеально! Если вы новичок, вы можете использовать наш бесплатный AI-Аудитор для анализа любого сайта в вашем городе, отправлять готовый скрипт владельцу и продавать исправления за $150–$500.'
    },
    {
      q: 'Как вы оптимизируете мобильную версию сайта?',
      a: 'Более 70% клиентов заходят со смартфонов. Мы создаем удобные кнопки быстрой связи (WhatsApp/звонок в 1 клик), крупные поля ввода и гарантируем скорость загрузки до 0.8 секунд.'
    }
  ] : language === 'kz' ? [
    {
      q: 'Конверсияны 2.5 есе өсіру кепілдігі қалай жұмыс істейді?',
      a: 'Біз нәтижені нақты өтінімдер санымен байланыстырамыз. Егер 60 күн ішінде сайттың конверсиясы кемінде 2.5 есе өспесе, біз нәтижеге дейін тегін жұмыс істейміз немесе қаражатты 100% қайтарамыз.'
    },
    {
      q: 'Жаңа сайтты жасау және іске қосу қанша уақыт алады?',
      a: '14-тен 21 жұмыс күніне дейін. Біз барлық UX жобалауды, психологиялық мәтіндерді және CRM интеграциясын өз мойнымызға аламыз.'
    },
    {
      q: 'Бұл жүйе біздің CRM-мен байланыса ма?',
      a: 'Иә! Барлық өтінімдер WhatsApp, Telegram, Bitrix24, amoCRM және Google Sheets кестелеріне лезде түседі.'
    },
    {
      q: 'Жаңадан бастаушыға осыны қолдануға бола ма?',
      a: 'Әрине! Сіз біздің AI-Аудитор арқылы кез келген сайтты талдап, қателер мен дайын скриптті иесіне жіберіп, қызмет ұсына аласыз.'
    }
  ] : language === 'es' ? [
    {
      q: '¿Cómo funciona la garantía de aumento de conversión 2.5x?',
      a: 'Vinculamos nuestros resultados directamente a sus clientes potenciales. Si en 60 días su conversión no sube al menos 2.5x, trabajamos gratis o reembolsamos el 100%.'
    },
    {
      q: '¿Cuánto tiempo tarda el lanzamiento del nuevo sitio web?',
      a: 'Entre 14 y 21 días hábiles. Nos encargamos de la arquitectura UX, redacción persuasiva, widgets interactivos e integraciones CRM.'
    },
    {
      q: '¿Se integra con mi CRM y WhatsApp?',
      a: '¡Sí! Integramos con WhatsApp, Telegram, HubSpot, Salesforce, Google Sheets y Meta Pixel sin fricción.'
    }
  ] : FAQS.map(f => ({ q: f.question, a: f.answer }));

  return (
    <section id="faqs" className="py-20 md:py-28 relative scroll-mt-20 border-b border-zinc-100 bg-zinc-50/50 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <ScrollReveal direction="down" distance={12}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-tight shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.faq.badge}</span>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            <AnimatedWords text={t.faq.title} />
          </h2>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">
              {t.faq.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* FAQs Accordion */}
        <StaggerContainer staggerDelay={0.07} className="space-y-3">
          {localizedFaqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <StaggerItem key={idx} direction="up" distance={16}>
                <div
                  className="rounded-2xl border border-zinc-200/90 bg-white transition-all shadow-xs overflow-hidden hover:border-zinc-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-zinc-900">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-zinc-900 text-white rotate-180' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 text-zinc-600 text-sm font-normal leading-relaxed border-t border-zinc-100 pt-4 bg-zinc-50/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Still Have Questions Box */}
        <ScrollReveal direction="up" delay={0.15} className="mt-12 p-6 sm:p-8 bg-zinc-950 text-white rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all">
          <div>
            <h4 className="text-base font-bold text-white">
              {t.faq.title}
            </h4>
            <p className="text-xs text-zinc-400 mt-1 font-normal">
              {t.faq.subtitle}
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl shrink-0 cursor-pointer shadow-xs flex items-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <span>{t.nav.bookCall}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
