import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Cookie, Lock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type LegalDocType = 'privacy' | 'terms' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'privacy'
}) => {
  const { language: lang } = useLanguage();
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);

  useEffect(() => {
    if (initialDoc) {
      setActiveDoc(initialDoc);
    }
  }, [initialDoc, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-zinc-900 border border-zinc-800 w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              {activeDoc === 'privacy' && <Lock className="w-4 h-4" />}
              {activeDoc === 'terms' && <FileText className="w-4 h-4" />}
              {activeDoc === 'cookies' && <Cookie className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {activeDoc === 'privacy' && (lang === 'ru' ? 'Политика конфиденциальности' : lang === 'kz' ? 'Құпиялылық саясаты' : lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy')}
                {activeDoc === 'terms' && (lang === 'ru' ? 'Условия использования сервиса' : lang === 'kz' ? 'Қызметті пайдалану шарттары' : lang === 'es' ? 'Términos de Servicio' : 'Terms of Service')}
                {activeDoc === 'cookies' && (lang === 'ru' ? 'Политика файлов Cookie' : lang === 'kz' ? 'Cookie саясаты' : lang === 'es' ? 'Política de Cookies' : 'Cookie Policy')}
              </h3>
              <p className="text-xs text-zinc-400">
                ConvertPulse CRO Platform • {lang === 'ru' ? 'Обновлено' : 'Updated'}: 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-zinc-800 bg-zinc-950 px-6 py-2 gap-2 text-xs">
          <button
            onClick={() => setActiveDoc('privacy')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeDoc === 'privacy' 
                ? 'bg-zinc-800 text-amber-400 border border-zinc-700' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            {lang === 'ru' ? 'Конфиденциальность' : lang === 'kz' ? 'Құпиялылық' : lang === 'es' ? 'Privacidad' : 'Privacy Policy'}
          </button>
          <button
            onClick={() => setActiveDoc('terms')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeDoc === 'terms' 
                ? 'bg-zinc-800 text-amber-400 border border-zinc-700' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {lang === 'ru' ? 'Условия сервиса' : lang === 'kz' ? 'Шарттар' : lang === 'es' ? 'Términos' : 'Terms of Service'}
          </button>
          <button
            onClick={() => setActiveDoc('cookies')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeDoc === 'cookies' 
                ? 'bg-zinc-800 text-amber-400 border border-zinc-700' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            {lang === 'ru' ? 'Cookie' : lang === 'kz' ? 'Cookie' : lang === 'es' ? 'Cookies' : 'Cookie Policy'}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-zinc-300 leading-relaxed font-normal">
          {activeDoc === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/40 rounded-xl flex items-start gap-3 text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>
                  {lang === 'ru'
                    ? 'ConvertPulse обязуется защищать ваши персональные данные и коммерческую информацию о конверсиях сайта в соответствии с мировыми стандартами GDPR и CCPA.'
                    : 'ConvertPulse is committed to protecting your personal information and website performance data in full compliance with GDPR & CCPA privacy standards.'}
                </span>
              </div>

              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">1. {lang === 'ru' ? 'Какую информацию мы собираем' : '1. Information We Collect'}</h4>
                <p>
                  {lang === 'ru'
                    ? 'Мы собираем информацию, которую вы предоставляете напрямую: имя, корпоративный email, URL веб-сайта, телефон/мессенджер, а также аналитические параметры воронок для расчета ROI и аудита интерфейсов.'
                    : 'We collect information you directly provide: your name, business email address, website URL, phone/messenger handle, and marketing funnel metrics submitted for ROI estimation and UX audits.'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">2. {lang === 'ru' ? 'Как используются данные' : '2. How We Use Your Data'}</h4>
                <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                  <li>{lang === 'ru' ? 'Проведение комплексного CRO-аудита и генерация гипотез роста.' : 'Conducting CRO heuristic audits and formulating high-impact conversion hypotheses.'}</li>
                  <li>{lang === 'ru' ? 'Связь с вами для проведения запланированной стратегической сессии.' : 'Contacting you regarding your scheduled strategy session and audit deliverables.'}</li>
                  <li>{lang === 'ru' ? 'Отправка регулярных аналитических отчетов и рекомендаций по оптимизации.' : 'Sending periodic optimization benchmarks and industry CRO research.'}</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">3. {lang === 'ru' ? 'Безопасность и неразглашение' : '3. Data Protection & NDA'}</h4>
                <p>
                  {lang === 'ru'
                    ? 'Мы никогда не продаем и не передаем ваши данные сторонним рекламным сетям. Все данные сессий аудита защищены 256-битным шифрованием TLS/SSL и могут быть защищены двусторонним NDA перед началом работы.'
                    : 'We never sell or distribute your data to third-party ad brokers. All audit sessions and metrics are secured with 256-bit TLS/SSL encryption and can be bound under mutual NDA prior to engagement.'}
                </p>
              </section>
            </div>
          )}

          {activeDoc === 'terms' && (
            <div className="space-y-4">
              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">1. {lang === 'ru' ? 'Предмет соглашения' : '1. Scope of Services'}</h4>
                <p>
                  {lang === 'ru'
                    ? 'ConvertPulse предоставляет услуги по аудиту конверсии, A/B тестированию, UI/UX редизайну и оптимизации воронки продаж для цифровых продуктов, SaaS, E-Commerce и B2B платформ.'
                    : 'ConvertPulse provides Conversion Rate Optimization (CRO) audits, A/B testing strategy, UX architecture, and checkout funnel optimization for digital products, SaaS, and eCommerce businesses.'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">2. {lang === 'ru' ? 'Гарантия окупаемости' : '2. Performance & ROI Guarantee'}</h4>
                <p>
                  {lang === 'ru'
                    ? 'В тарифах с гарантией результата условия фиксации прироста метрик (CR, AOV, LTV) утверждаются в индивидуальном ТЗ после базового замера контрольной выборки трафика.'
                    : 'For tiers including performance guarantees, specific baseline thresholds and metric targets (Conversion Rate, Average Order Value, LTV) are documented in the master service agreement post initial tracking audit.'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">3. {lang === 'ru' ? 'Интеллектуальная собственность' : '3. Intellectual Property'}</h4>
                <p>
                  {lang === 'ru'
                    ? 'Все разработанные UX-макеты, копирайтинг, гипотезы и программные скрипты A/B тестов переходят в 100% собственность заказчика после финальной приемки работ.'
                    : 'All custom UX wireframes, persuasive copy, design artifacts, and test code created during the engagement become 100% client property upon final deliverable signoff.'}
                </p>
              </section>
            </div>
          )}

          {activeDoc === 'cookies' && (
            <div className="space-y-4">
              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">1. {lang === 'ru' ? 'Использование Cookie файлов' : '1. Cookie Usage'}</h4>
                <p>
                  {lang === 'ru'
                    ? 'Наш сайт использует файлы cookie исключительно для сохранения ваших языковых предпочтений, параметров калькулятора ROI и аналитики взаимодействия с интерфейсом.'
                    : 'Our platform utilizes strictly necessary and analytical cookies to remember your language selection, maintain ROI calculator inputs, and measure user interaction telemetry.'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">2. {lang === 'ru' ? 'Типы используемых файлов' : '2. Categories of Cookies'}</h4>
                <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                  <li><strong>{lang === 'ru' ? 'Функциональные:' : 'Functional:'}</strong> {lang === 'ru' ? 'Запоминание выбранного языка интерфейса (RU, EN, KZ, ES).' : 'Preserving selected language (RU, EN, KZ, ES).'}</li>
                  <li><strong>{lang === 'ru' ? 'Аналитические:' : 'Analytics:'}</strong> {lang === 'ru' ? 'Анонимная статистика посещаемости и времени взаимодействия.' : 'Aggregated, privacy-safe analytics measuring engagement depth.'}</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-white text-sm">3. {lang === 'ru' ? 'Управление файлами Cookie' : '3. Managing Cookie Preferences'}</h4>
                <p>
                  {lang === 'ru'
                    ? 'Вы можете в любой момент заблокировать или очистить файлы cookie в настройках вашего браузера без ущерба для основного функционала сайта.'
                    : 'You can modify or disable cookie storage at any time directly through your web browser settings without losing access to primary site features.'}
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">
            ConvertPulse Inc. • All rights reserved.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {lang === 'ru' ? 'Понятно, закрыть' : lang === 'kz' ? 'Түсінікті, жабу' : lang === 'es' ? 'Entendido, cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
