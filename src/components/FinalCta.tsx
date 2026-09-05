import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, AnimatedWords } from './MotionEffects';

interface FinalCtaProps {
  onOpenBooking: () => void;
  onOpenAudit?: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ 
  onOpenBooking, 
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-zinc-950 text-white border-t border-zinc-800">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Cohort Scarcity Pill */}
        <ScrollReveal direction="down" distance={12}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold mb-6 border border-amber-400/20 shadow-xs">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20 animate-pulse" />
            <span>{t.finalCta.badge}</span>
          </div>
        </ScrollReveal>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white leading-tight">
          <AnimatedWords text={t.finalCta.title} />
        </h2>

        <ScrollReveal direction="up" delay={0.1}>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            {t.finalCta.subtitle}
          </p>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>{t.finalCta.btnBook}</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </button>
            <a
              href="#ai-auditor"
              className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-xl border border-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:border-zinc-700 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.finalCta.btnAudit}</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Trust Points */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="pt-8 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t.finalCta.guaranteeNote}</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
