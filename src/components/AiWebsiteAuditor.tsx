import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  Globe, 
  Zap, 
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  Bot,
  Send,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';
import { ScrollReveal, AnimatedWords } from './MotionEffects';
import { 
  AuditReport, 
  CriticalLeak, 
  QuickWin, 
  ScrapedInfo, 
  generateLocalFallbackAudit 
} from '../utils/fallbackAudit';

interface AiWebsiteAuditorProps {
  onOpenBooking?: () => void;
}

export const AiWebsiteAuditor: React.FC<AiWebsiteAuditorProps> = ({ onOpenBooking }) => {
  const { language: currentAppLang, t } = useLanguage();
  const [url, setUrl] = useState('');
  const [businessType, setBusinessType] = useState('Local Services & Clinics');
  const [auditLang, setAuditLang] = useState<Language>(currentAppLang);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [scrapedInfo, setScrapedInfo] = useState<ScrapedInfo | null>(null);
  const [reportSource, setReportSource] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'leaks' | 'quickwins' | 'pitch' | 'chat'>('leaks');

  // Interactive Live Chat with AI Agent
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'agent'; text: string; time: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    setAuditLang(currentAppLang);
  }, [currentAppLang]);

  const loadingMessages = t.aiAuditor.loadingSteps || [
    'Connecting and parsing website HTML & metadata...',
    'Analyzing value proposition and offer clarity...',
    'Checking mobile UX, WhatsApp triggers and conversion flow...',
    'Generating diagnostic report and client outreach pitch...'
  ];

  const handleSendChatMessage = async (presetPrompt?: string) => {
    const textToSend = presetPrompt || chatInput.trim();
    if (!textToSend || !report || isChatLoading) return;

    const userMsg = {
      role: 'user' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!presetPrompt) setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai-audit-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          auditContext: report,
          conversationHistory: chatMessages,
          language: auditLang
        })
      });
      const data = await res.json();
      const defaultReply = auditLang === 'ru' 
        ? `По сайту ${report.websiteName}: рекомендую в первую очередь внедрить плавающую кнопку WhatsApp и усилить главный заголовок конкретной выгодой.`
        : auditLang === 'kz'
        ? `${report.websiteName} сайты бойынша: алдымен WhatsApp батырмасын қосып, басты тақырыпшаны нақты пайдамен күшейтуді ұсынамын.`
        : auditLang === 'es'
        ? `Para ${report.websiteName}: recomiendo implementar un botón flotante de WhatsApp y reforzar el título principal con un beneficio claro.`
        : `For ${report.websiteName}: I recommend first adding a sticky WhatsApp trigger and sharpening the H1 headline with a concrete value proposition.`;

      const agentReply = data.reply || defaultReply;
      setChatMessages(prev => [
        ...prev,
        { role: 'agent', text: agentReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (err) {
      const errorMsg = auditLang === 'ru'
        ? 'Ошибка ответа ИИ-агента. Попробуйте отправить запрос еще раз.'
        : auditLang === 'kz'
        ? 'ИИ-агент жауап бермеді. Қайталап көріңіз.'
        : auditLang === 'es'
        ? 'Error al conectar con el agente. Por favor intente de nuevo.'
        : 'Error connecting to AI agent. Please try again.';
      setChatMessages(prev => [
        ...prev,
        { role: 'agent', text: errorMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const isValidUrl = (input: string) => {
    const clean = input.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
    return /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/i.test(clean);
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    // Strict URL / Domain validation check
    if (!isValidUrl(url)) {
      setReport(null);
      setScrapedInfo(null);
      const invalidMessages: Record<Language, string> = {
        ru: '⚠️ Пожалуйста, укажите корректный адрес сайта (например: mysite.kz, company.com или https://example.ru). Обычные слова или текст без домена (.ru, .com, .kz) не могут быть просканированы.',
        kz: '⚠️ Сайттың дұрыс домендік мекенжайын енгізіңіз (мысалы: mysite.kz, company.com немесе https://...). Жай сөздер сайт мекенжайы болып саналмайды.',
        en: '⚠️ Please enter a valid website address (e.g., mysite.com, agency.io, or https://example.com). Words without a top-level domain (.com, .io, etc.) cannot be scanned.',
        es: '⚠️ Por favor, introduzca una dirección web válida (ej: misitio.com o https://ejemplo.com). Las palabras sueltas sin dominio no son válidas.'
      };
      setErrorMessage(invalidMessages[auditLang] || invalidMessages.ru);
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);
    setReport(null);
    setScrapedInfo(null);
    setErrorMessage(null);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          businessType,
          language: auditLang
        })
      });

      let data: any = null;
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        try {
          data = JSON.parse(textResponse);
        } catch {
          // If response was not valid JSON but URL is valid, fallback to client-side audit generator
          console.warn('API returned non-JSON response, generating local audit');
          const fallback = generateLocalFallbackAudit(url, businessType, auditLang);
          data = {
            success: true,
            data: fallback.data,
            scrapedInfo: fallback.scrapedInfo,
            source: 'smart-engine'
          };
        }
      }

      clearInterval(stepInterval);

      if (data && data.success && data.data) {
        setReport(data.data);
        if (data.scrapedInfo) {
          setScrapedInfo(data.scrapedInfo);
        }
        if (data.source) {
          setReportSource(data.source);
        }
      } else if (data && data.error) {
        // Show actual backend error instead of faking a template report
        setErrorMessage(data.error);
      } else {
        // Fallback gracefully only for valid domains
        const fallback = generateLocalFallbackAudit(url, businessType, auditLang);
        setReport(fallback.data);
        setScrapedInfo(fallback.scrapedInfo);
        setReportSource('smart-engine');
      }
    } catch (err: any) {
      console.warn('Audit fetch encountered network issue:', err);
      setErrorMessage(err.message || 'Ошибка подключения к сервису аудита. Пожалуйста, попробуйте еще раз.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  const handleCopyScript = () => {
    if (!report?.clientPitchScript) return;
    navigator.clipboard.writeText(report.clientPitchScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopyFullReport = () => {
    if (!report) return;
    const text = `
🎯 CRO AUDIT REPORT: ${report.websiteName}
Score: ${report.currentHealthScore}/100 (Potential: ${report.projectedHealthScore}/100)
Projected Lift: ${report.estimatedConversionLift}

📌 Executive Summary:
${report.executiveSummary}

🚨 CRITICAL CONVERSION LEAKS:
${report.criticalLeaks.map((l, i) => `${i + 1}. [${l.severity}] ${l.title} (${l.category})\n- Issue: ${l.issueDescription}\n- Why it hurts revenue: ${l.whyItKillsSales}\n- How to fix: ${l.howToFix}\n`).join('\n')}

⚡️ QUICK WINS (BEFORE / AFTER):
${report.quickWins.map((q) => `• Zone: ${q.area}\n  Before: ${q.beforeExample}\n  After: ${q.afterExample}\n  Impact: ${q.expectedImpact}\n`).join('\n')}

💬 CLIENT OUTREACH PITCH SCRIPT:
${report.clientPitchScript}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <section id="ai-auditor" className="py-20 bg-white border-b border-zinc-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <ScrollReveal direction="down" distance={12}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-tight shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.aiAuditor.badge}</span>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            <AnimatedWords text={t.aiAuditor.title} />
          </h2>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">
              {t.aiAuditor.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Audit Search & Control Bar */}
        <ScrollReveal direction="scale" distance={20} className="bg-zinc-50/70 border border-zinc-200/80 rounded-2xl p-6 sm:p-8 mb-10 shadow-xs hover:shadow-md transition-shadow">
          <form onSubmit={handleRunAudit} className="space-y-4">
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* URL Input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Globe className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t.aiAuditor.inputPlaceholder}
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all shadow-xs"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="py-3.5 px-7 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>{t.aiAuditor.btnRunning}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{t.aiAuditor.btnRun}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </>
                )}
              </button>
            </div>

            {/* Config row: Category + Language + Quick Suggestions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-zinc-500">{t.aiAuditor.nicheLabel}</span>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="bg-white border border-zinc-200 rounded-lg px-3 py-1.5 font-medium text-zinc-800 text-xs focus:outline-none focus:border-zinc-900 cursor-pointer shadow-xs"
                >
                  <option value="Local Services & Clinics">{t.aiAuditor.niches.services}</option>
                  <option value="E-Commerce & Online Store">{t.aiAuditor.niches.ecommerce}</option>
                  <option value="B2B & IT Services">{t.aiAuditor.niches.b2b}</option>
                  <option value="Online Education & Info-Business">{t.aiAuditor.niches.education}</option>
                  <option value="SaaS & Mobile App">{t.aiAuditor.niches.saas || 'SaaS & Apps'}</option>
                </select>
              </div>

              {/* Language toggle for report */}
              <div className="flex items-center gap-1.5 font-medium">
                <span className="text-zinc-500">{t.aiAuditor.langLabel}</span>
                {(['ru', 'en', 'kz', 'es'] as Language[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setAuditLang(l)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-colors cursor-pointer ${
                      auditLang === l ? 'bg-zinc-900 text-white shadow-xs' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Example Quick Links */}
            <div className="pt-3 border-t border-zinc-200/60 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-zinc-400 font-medium">{t.aiAuditor.examplesLabel}</span>
              {[
                { label: 'Dental Clinic', domain: 'superdent-clinic.ru' },
                { label: 'Fashion Store', domain: 'trendy-apparel-shop.com' },
                { label: 'Home Remodeling', domain: 'expert-remont-pro.ru' },
                { label: 'B2B Analytics', domain: 'growthflow-analytics.io' }
              ].map((sample) => (
                <button
                  key={sample.domain}
                  type="button"
                  onClick={() => {
                    setUrl(sample.domain);
                  }}
                  className="px-2.5 py-1 bg-white border border-zinc-200 hover:border-zinc-400 rounded-md text-zinc-600 hover:text-zinc-900 font-medium cursor-pointer transition-colors shadow-xs"
                >
                  {sample.label}
                </button>
              ))}
            </div>

          </form>
        </ScrollReveal>

        {/* Error Alert */}
        {errorMessage && !isLoading && (
          <div className="p-4 bg-rose-50 border-2 border-rose-900 text-rose-900 text-xs font-bold flex items-center justify-between gap-3 shadow-[4px_4px_0px_0px_rgba(225,29,72,1)] my-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="px-3 py-1 bg-rose-900 text-white font-black uppercase text-[10px] cursor-pointer"
            >
              {auditLang === 'ru' ? 'Закрыть' : auditLang === 'kz' ? 'Жабу' : auditLang === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        )}

        {/* Loading Animation Box */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-zinc-900 text-white border-2 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] text-center space-y-4 my-6"
          >
            <div className="w-12 h-12 bg-white text-zinc-900 mx-auto flex items-center justify-center font-black">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-black uppercase tracking-widest text-amber-400">
                {t.aiAuditor.scanningTitle}
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                {loadingMessages[loadingStep]}
              </h3>
            </div>
            {/* Progress line */}
            <div className="w-full max-w-md mx-auto bg-zinc-800 h-2 border border-zinc-700 overflow-hidden">
              <div 
                className="bg-amber-400 h-full transition-all duration-500" 
                style={{ width: `${((loadingStep + 1) / 4) * 100}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* Generated Report View */}
        <AnimatePresence>
          {report && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Live Scrape Telemetry Proof Card */}
              {scrapedInfo && (
                <div className="bg-amber-50 border-2 border-zinc-900 p-4 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] text-xs text-zinc-900">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200">
                    <div className="flex items-center gap-2 font-black uppercase tracking-wider">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{t.aiAuditor.telemetryTitle || 'Live Crawl Telemetry Proof'}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-900 text-white uppercase">
                      {reportSource.replace('gemini:', 'AI: ')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
                    <div>
                      <span className="text-zinc-500 font-bold block">Title:</span>
                      <span className="font-bold text-zinc-900 line-clamp-1">{scrapedInfo.title || report.websiteName}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold block">H1:</span>
                      <span className="font-bold text-zinc-900 line-clamp-1">
                        {scrapedInfo.headings && scrapedInfo.headings.length > 0 ? scrapedInfo.headings[0] : (auditLang === 'ru' ? 'Не задан / скрыт' : auditLang === 'kz' ? 'Көрсетілмеген' : 'Missing / not set')}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold block">{t.aiAuditor.telemetryWhatsApp || 'WhatsApp:'}</span>
                      <span className={`font-bold ${scrapedInfo.hasWhatsApp ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {scrapedInfo.hasWhatsApp 
                          ? `✅ ${t.aiAuditor.telemetryDetected || 'Detected'}` 
                          : `❌ ${t.aiAuditor.telemetryMissing || 'Missing'}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold block">{t.aiAuditor.telemetryForms || 'Lead Forms:'}</span>
                      <span className="font-bold text-zinc-900">
                        {scrapedInfo.inputsCount && scrapedInfo.inputsCount > 0 
                          ? `${scrapedInfo.inputsCount} inputs` 
                          : (auditLang === 'ru' ? 'Прямая форма не найдена' : auditLang === 'kz' ? 'Форма табылмады' : 'No direct forms found')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Report Header Card */}
              <div className="bg-zinc-950 text-white rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.aiAuditor.reportTitle}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {report.websiteName}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleCopyFullReport}
                      className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                    >
                      {copiedAll ? <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedAll ? t.aiAuditor.btnCopied : t.aiAuditor.btnCopyAll}</span>
                    </button>
                    
                    {onOpenBooking && (
                      <button
                        onClick={onOpenBooking}
                        className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Zap className="w-4 h-4 fill-zinc-950" />
                        <span>{t.aiAuditor.btnHelpDeploy}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Score Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-zinc-800">
                  <div className="p-4 bg-zinc-900/70 border border-zinc-800/80 rounded-xl">
                    <span className="text-xs font-medium text-zinc-400 block mb-1">
                      {t.aiAuditor.currentScore}
                    </span>
                    <div className="text-3xl font-extrabold text-amber-400 tracking-tight">
                      {report.currentHealthScore} / 100
                    </div>
                    <span className="text-xs font-medium text-rose-400 block mt-1">
                      {t.aiAuditor.highLosses}
                    </span>
                  </div>

                  <div className="p-4 bg-zinc-900/70 border border-zinc-800/80 rounded-xl">
                    <span className="text-xs font-medium text-zinc-400 block mb-1">
                      {t.aiAuditor.projectedScore}
                    </span>
                    <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                      {report.projectedHealthScore} / 100
                    </div>
                    <span className="text-xs font-medium text-emerald-300 block mt-1">
                      {t.aiAuditor.marketLeader}
                    </span>
                  </div>

                  <div className="p-4 bg-zinc-900/70 border border-zinc-800/80 rounded-xl">
                    <span className="text-xs font-medium text-zinc-400 block mb-1">
                      {t.aiAuditor.expectedLift}
                    </span>
                    <div className="text-3xl font-extrabold text-white tracking-tight">
                      {report.estimatedConversionLift}
                    </div>
                    <span className="text-xs font-medium text-zinc-400 block mt-1">
                      {t.aiAuditor.noExtraAd}
                    </span>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="pt-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                    {t.aiAuditor.summaryTitle}
                  </span>
                  <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                    {report.executiveSummary}
                  </p>
                </div>

              </div>

              {/* Diagnostic Tabs Navigation */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-100/80 rounded-xl border border-zinc-200">
                <button
                  onClick={() => setActiveTab('leaks')}
                  className={`px-5 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'leaks'
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {t.aiAuditor.tabLeaks} ({report.criticalLeaks.length})
                </button>
                <button
                  onClick={() => setActiveTab('quickwins')}
                  className={`px-5 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'quickwins'
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {t.aiAuditor.tabWins} ({report.quickWins.length})
                </button>
                <button
                  onClick={() => setActiveTab('pitch')}
                  className={`px-5 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'pitch'
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.aiAuditor.tabPitch}</span>
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-5 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'chat'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  <Bot className="w-4 h-4 text-emerald-500" />
                  <span>{t.aiAuditor.tabChat || 'Live AI Agent Chat'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </button>
              </div>

              {/* Tab 1: Critical Leaks */}
              {activeTab === 'leaks' && (
                <div className="space-y-4">
                  {report.criticalLeaks.map((leak, idx) => (
                    <div 
                      key={idx}
                      className="p-5 sm:p-6 bg-white border border-zinc-200/90 rounded-2xl shadow-xs space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center border border-rose-200">
                            {idx + 1}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-zinc-950">
                            {leak.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">
                            {leak.category}
                          </span>
                          <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-semibold rounded-full border border-rose-100">
                            {leak.severity}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="p-3.5 bg-zinc-50/70 border border-zinc-200/70 rounded-xl">
                          <span className="font-semibold text-zinc-500 block mb-1">
                            {t.aiAuditor.issueLabel}
                          </span>
                          <p className="text-zinc-800 font-normal leading-relaxed">{leak.issueDescription}</p>
                        </div>
                        <div className="p-3.5 bg-rose-50/40 border border-rose-100 rounded-xl">
                          <span className="font-semibold text-rose-800 block mb-1">
                            {t.aiAuditor.whyKillsSales}
                          </span>
                          <p className="text-zinc-900 font-medium leading-relaxed">{leak.whyItKillsSales}</p>
                        </div>
                        <div className="p-3.5 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                          <span className="font-semibold text-emerald-800 block mb-1">
                            {t.aiAuditor.howToFix}
                          </span>
                          <p className="text-zinc-900 font-medium leading-relaxed">{leak.howToFix}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Quick Wins */}
              {activeTab === 'quickwins' && (
                <div className="space-y-4">
                  {report.quickWins.map((win, idx) => (
                    <div 
                      key={idx}
                      className="p-5 sm:p-6 bg-white border border-zinc-200/90 rounded-2xl shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-400">{t.aiAuditor.zoneLabel}</span>
                          <span className="text-sm font-bold text-zinc-950">{win.area}</span>
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/70">
                          {win.expectedImpact}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-4 bg-rose-50/40 border border-rose-100 rounded-xl">
                          <span className="font-semibold text-rose-700 block mb-1.5">
                            {t.aiAuditor.wasLabel}
                          </span>
                          <p className="text-zinc-700 font-mono text-xs leading-relaxed">{win.beforeExample}</p>
                        </div>

                        <div className="p-4 bg-emerald-50/40 border border-emerald-200/70 rounded-xl">
                          <span className="font-semibold text-emerald-800 block mb-1.5">
                            {t.aiAuditor.nowLabel}
                          </span>
                          <p className="text-zinc-950 font-semibold font-mono text-xs leading-relaxed">{win.afterExample}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Ready Client Outreach Pitch */}
              {activeTab === 'pitch' && (
                <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                    <div>
                      <h4 className="text-xl font-bold text-zinc-950">
                        {t.aiAuditor.scriptTitle}
                      </h4>
                      <p className="text-xs text-zinc-500 font-normal mt-0.5">
                        {t.aiAuditor.scriptSubtitle}
                      </p>
                    </div>

                    <button
                      onClick={handleCopyScript}
                      className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
                    >
                      {copiedScript ? <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedScript ? t.aiAuditor.btnCopied : t.aiAuditor.btnCopyScript}</span>
                    </button>
                  </div>

                  {/* Pitch Script Preview Card */}
                  <div className="p-5 bg-zinc-50/70 border border-zinc-200/70 rounded-xl font-sans text-sm font-medium text-zinc-900 leading-relaxed">
                    <p className="whitespace-pre-wrap">{report.clientPitchScript}</p>
                  </div>

                  {/* Closing Steps Checklist */}
                  <div className="p-4 bg-amber-50/40 border border-amber-200/70 rounded-xl text-xs text-zinc-900 space-y-2">
                    <span className="font-semibold text-amber-900 block">
                      {t.aiAuditor.stepsTitle}
                    </span>
                    <ul className="space-y-1.5 font-normal">
                      {report.recommendedNextSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-zinc-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

              {/* Tab 4: Live Interactive AI Conversion Strategist Chat */}
              {activeTab === 'chat' && (
                <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 text-white shadow-xs">
                  
                  {/* Chat Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center font-bold">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">
                            {t.aiAuditor.chatTitle || 'Live AI Conversion Strategist'}
                          </h4>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            {t.aiAuditor.chatOnline || 'Online'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-normal mt-0.5">
                          {t.aiAuditor.chatSubtitle || 'Target:'} <span className="text-amber-400 font-semibold">{report.websiteName}</span> ({t.aiAuditor.currentScore}: {report.currentHealthScore}/100)
                        </p>
                      </div>
                    </div>

                    <div className="text-xs bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 font-mono">
                      {report.websiteName}
                    </div>
                  </div>

                  {/* 1-Click Quick Prompts */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {t.aiAuditor.quickQuestionsLabel || '1-Click Prompt Shortcuts:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(t.aiAuditor.quickPrompts || [
                        'Write 3 high-converting headlines for this website',
                        'How to handle objection: "We already have enough clients"?',
                        'Draft a $1,200 commercial offer for fixing these 3 leaks',
                        'What hook to use for Google Ads campaign?'
                      ]).map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendChatMessage(prompt)}
                          disabled={isChatLoading}
                          className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 min-h-[160px]">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-8 text-zinc-500 text-xs">
                        <Bot className="w-7 h-7 text-zinc-600 mx-auto mb-2" />
                        {t.aiAuditor.chatEmptyState || 'Ask any question to optimize'} <span className="text-zinc-300 font-medium">{report.websiteName}</span>.
                      </div>
                    ) : (
                      chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {msg.role === 'agent' && (
                            <div className="w-7 h-7 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center shrink-0 text-xs font-bold">
                              <Bot className="w-4 h-4" />
                            </div>
                          )}
                          <div
                            className={`max-w-[85%] p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-amber-400 text-zinc-950 font-medium'
                                : 'bg-zinc-900 text-zinc-200 border border-zinc-800 whitespace-pre-line font-normal'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-zinc-800' : 'text-zinc-500'}`}>
                              {msg.time}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isChatLoading && (
                      <div className="flex gap-2 items-center text-amber-400 text-xs py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="font-mono">{t.aiAuditor.agentThinking || 'AI agent is analyzing...'}</span>
                      </div>
                    )}
                  </div>

                  {/* Chat Input Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChatMessage();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={t.aiAuditor.chatPlaceholder || `Ask anything about ${report.websiteName}...`}
                      disabled={isChatLoading}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || !chatInput.trim()}
                      className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 shrink-0"
                    >
                      {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span>{t.aiAuditor.btnSend || 'Ask'}</span>
                    </button>
                  </form>

                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
