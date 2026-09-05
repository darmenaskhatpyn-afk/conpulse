import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedWords, ScrollReveal } from './MotionEffects';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
  onScrollToRoi: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenBooking, 
}) => {
  const [funnelMode, setFunnelMode] = useState<'optimized' | 'standard'>('optimized');
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Clean, high-contrast Value Proposition */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Minimal Eyebrow Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-tight shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Main Headline with word-by-word reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.08]">
              <AnimatedWords 
                text={`${t.hero.title1} ${t.hero.titleHighlight} ${t.hero.title2}`}
                highlightWords={[t.hero.titleHighlight]}
                highlightClassName="text-zinc-950 underline decoration-amber-400 decoration-4 underline-offset-8"
              />
            </h1>

            {/* Sub-headline */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-zinc-600 font-normal leading-relaxed max-w-xl"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Clean Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <a
                href="#ai-auditor"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.hero.btnAiAudit}</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </a>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>{t.hero.btnBookCall}</span>
              </button>
            </motion.div>

            {/* Metric Micro Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-6 border-t border-zinc-100 grid grid-cols-3 gap-6"
            >
              <div className="hover:translate-y-[-2px] transition-transform">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">{t.hero.metric1Value}</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">{t.hero.metric1Label}</div>
              </div>
              <div className="hover:translate-y-[-2px] transition-transform">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">{t.hero.metric2Value}</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">{t.hero.metric2Label}</div>
              </div>
              <div className="hover:translate-y-[-2px] transition-transform">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">{t.hero.metric3Value}</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">{t.hero.metric3Label}</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Clean, Elegant Conversion Comparison Card */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-zinc-50/70 border border-zinc-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header with Segmented Control */}
              <div className="flex items-center justify-between pb-5 border-b border-zinc-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-zinc-900">
                    {t.hero.liveCardTitle}
                  </span>
                </div>
                
                {/* Clean Toggle */}
                <div className="bg-zinc-200/70 p-1 rounded-lg flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setFunnelMode('standard')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      funnelMode === 'standard' 
                        ? 'bg-white text-zinc-900 shadow-xs' 
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.hero.simulatorStandard}
                  </button>
                  <button
                    onClick={() => setFunnelMode('optimized')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      funnelMode === 'optimized' 
                        ? 'bg-zinc-900 text-white shadow-xs' 
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.hero.simulatorOptimized}
                  </button>
                </div>
              </div>

              {/* Dynamic Comparison Dashboard */}
              <div className="mt-5 space-y-4">
                
                {/* Conversion Rate Highlight */}
                <div className="p-4 bg-white border border-zinc-200/80 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-medium text-zinc-500 mb-1.5">
                    <span>{t.hero.liveCardVisitors}</span>
                    <span className="font-semibold text-zinc-800">10,000 / mo</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold tracking-tight text-zinc-950">
                      {funnelMode === 'optimized' ? '5.4%' : '1.6%'}
                    </div>
                    <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      funnelMode === 'optimized' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {funnelMode === 'optimized' ? '+237% Lift' : '97% Bounce'}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-zinc-100 h-2 mt-3.5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${
                        funnelMode === 'optimized' 
                          ? 'bg-zinc-900' 
                          : 'bg-zinc-400'
                      }`}
                      animate={{ width: funnelMode === 'optimized' ? '78%' : '24%' }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>
                </div>

                {/* Metrics 2-column Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white border border-zinc-200/80 rounded-xl">
                    <span className="text-xs text-zinc-500 font-medium block mb-1">
                      {t.hero.metricCustomersMonth}
                    </span>
                    <div className="text-2xl font-bold tracking-tight text-zinc-950">
                      {funnelMode === 'optimized' ? '540' : '160'}
                    </div>
                    <span className={`text-xs font-semibold mt-0.5 block ${
                      funnelMode === 'optimized' ? 'text-emerald-600' : 'text-zinc-500'
                    }`}>
                      {funnelMode === 'optimized' ? t.hero.metricLeadsGain : t.hero.metricLeadsLoss}
                    </span>
                  </div>

                  <div className="p-4 bg-white border border-zinc-200/80 rounded-xl">
                    <span className="text-xs text-zinc-500 font-medium block mb-1">
                      {t.hero.metricRevenueTitle}
                    </span>
                    <div className="text-2xl font-bold tracking-tight text-zinc-950">
                      {funnelMode === 'optimized' ? '$108,000' : '$32,000'}
                    </div>
                    <span className={`text-xs font-semibold mt-0.5 block ${
                      funnelMode === 'optimized' ? 'text-emerald-600' : 'text-zinc-500'
                    }`}>
                      {funnelMode === 'optimized' ? t.hero.metricRevenueGain : t.hero.metricRevenueLoss}
                    </span>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{t.hero.btnBookCall}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
