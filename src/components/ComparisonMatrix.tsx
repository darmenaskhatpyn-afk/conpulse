import React from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  TrendingDown,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, AnimatedWords } from './MotionEffects';

interface ComparisonMatrixProps {
  onOpenBooking: () => void;
  onOpenAudit?: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ 
  onOpenBooking, 
}) => {
  const { t } = useLanguage();

  return (
    <section id="framework" className="py-20 md:py-28 relative bg-white border-b border-zinc-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <ScrollReveal direction="down" distance={12}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-tight shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.comparison.badge}</span>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            <AnimatedWords text={t.comparison.title} />
          </h2>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">
              {t.comparison.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Comparison Table */}
        <ScrollReveal direction="scale" distance={20} className="border border-zinc-200/90 rounded-2xl bg-white shadow-xs overflow-hidden hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-200/80 bg-zinc-50/80 text-xs font-semibold">
            <div className="md:col-span-4 p-4 sm:p-5 text-zinc-500">
              {t.comparison.colFeature}
            </div>
            <div className="md:col-span-4 p-4 sm:p-5 text-zinc-600 flex items-center gap-2 border-t md:border-t-0 md:border-l border-zinc-200/80">
              <TrendingDown className="w-4 h-4 text-zinc-400" />
              <span>{t.comparison.colTraditional}</span>
            </div>
            <div className="md:col-span-4 p-4 sm:p-5 text-zinc-950 flex items-center gap-2 border-t md:border-t-0 md:border-l border-zinc-200/80 bg-amber-50/30">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="font-bold">{t.comparison.colConvertPulse}</span>
            </div>
          </div>

          <div className="divide-y divide-zinc-100">
            {t.comparison.items.map((row, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ backgroundColor: 'rgba(251, 191, 36, 0.04)' }}
                className="grid grid-cols-1 md:grid-cols-12 text-xs sm:text-sm transition-colors"
              >
                {/* Feature Name */}
                <div className="md:col-span-4 p-4 sm:p-5 font-semibold text-zinc-900 flex items-center bg-zinc-50/40">
                  {row.feature}
                </div>

                {/* Traditional Agency */}
                <div className="md:col-span-4 p-4 sm:p-5 border-t md:border-t-0 md:border-l border-zinc-100 text-zinc-500 flex items-start gap-2.5 font-normal">
                  <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-zinc-400">
                    <X className="w-3.5 h-3.5" />
                  </span>
                  <span>{row.traditional}</span>
                </div>

                {/* ConvertPulse Protocol */}
                <div className="md:col-span-4 p-4 sm:p-5 border-t md:border-t-0 md:border-l border-zinc-100 bg-amber-50/15 text-zinc-950 flex items-start gap-2.5 font-medium">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>{row.convertPulse}</span>
                </div>

              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom Callout */}
        <ScrollReveal direction="up" delay={0.15} className="mt-8 p-6 sm:p-8 bg-zinc-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-zinc-800 shadow-sm hover:shadow-md transition-all">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
              {t.comparison.riskFreeGuarantee}
            </span>
            <p className="text-sm font-normal text-zinc-300 leading-relaxed">
              {t.comparison.riskFreeDesc}
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm rounded-xl shrink-0 cursor-pointer transition-all shadow-xs flex items-center gap-2 hover:shadow-md hover:-translate-y-0.5"
          >
            <span>{t.nav.bookCall}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
