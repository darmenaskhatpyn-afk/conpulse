import React from 'react';
import { 
  Zap, 
  Target, 
  ShieldCheck, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedWords } from './MotionEffects';

interface PillarsSectionProps {
  onOpenBooking: () => void;
  onOpenAudit?: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ 
  onOpenBooking, 
}) => {
  const { t } = useLanguage();

  const icons = [Zap, Target, ShieldCheck, Workflow];

  return (
    <section className="py-20 md:py-28 relative bg-white border-b border-zinc-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <ScrollReveal direction="down" distance={12}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-tight shadow-xs">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.pillars.badge}</span>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            <AnimatedWords text={t.pillars.title} />
          </h2>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">
              {t.pillars.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Pillars Grid with Staggered Scroll Reveal */}
        <StaggerContainer 
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.pillars.items.map((pillar, idx) => {
            const Icon = icons[idx] || Zap;
            return (
              <StaggerItem key={idx} direction="scale">
                <motion.div 
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="p-6 bg-white border border-zinc-200/90 rounded-2xl shadow-xs hover:border-amber-400/50 hover:shadow-lg transition-all flex flex-col justify-between h-full group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                      <span className="text-xl font-extrabold text-amber-500 font-mono group-hover:scale-110 transition-transform origin-left">
                        {pillar.num}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center group-hover:bg-amber-400/10 group-hover:text-amber-600 transition-colors">
                        <Icon className="w-4 h-4 text-zinc-900 group-hover:text-amber-600 transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-zinc-950">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-zinc-100 flex items-center gap-2 text-xs font-medium text-zinc-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t.pillars.implementedBadge}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Action Button */}
        <ScrollReveal direction="up" delay={0.2} className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span>{t.nav.bookCall}</span>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
