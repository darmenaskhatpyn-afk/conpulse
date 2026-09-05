import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  ArrowRight, 
} from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_TIERS } from '../data/conversionData';
import { PricingTier } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedWords } from './MotionEffects';

interface PricingSectionProps {
  onSelectTier: (tier: PricingTier) => void;
  onOpenBooking: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ 
  onSelectTier, 
}) => {
  const { t } = useLanguage();
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  return (
    <section id="pricing" className="py-20 md:py-28 relative scroll-mt-20 bg-white border-b border-zinc-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <ScrollReveal direction="down" distance={12}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-tight shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.pricing.badge}</span>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            <AnimatedWords text={t.pricing.title} />
          </h2>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </ScrollReveal>

          {/* Billing Switch */}
          <ScrollReveal direction="up" delay={0.15} className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${!isAnnual ? 'text-zinc-900' : 'text-zinc-400'}`}>
              {t.pricing.monthly}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 bg-zinc-200 rounded-full p-0.5 transition-colors relative cursor-pointer"
              aria-label="Toggle Annual Billing"
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full transition-transform shadow-xs ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`} 
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-zinc-900' : 'text-zinc-400'}`}>
              <span>{t.pricing.annually}</span>
            </span>
          </ScrollReveal>
        </div>

        {/* Pricing Cards Grid */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const isPopular = tier.popular;
            const localizedTier = t.pricing.tiers?.find((tTier) => tTier.id === tier.id);
            const name = localizedTier?.name || tier.name;
            const description = localizedTier?.description || tier.description;
            const guarantee = localizedTier?.guarantee || tier.guarantee;
            const features = localizedTier?.features || tier.features;
            const ctaText = localizedTier?.ctaText || tier.ctaText;

            return (
              <StaggerItem key={tier.id} direction="scale">
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all h-full ${
                    isPopular
                      ? 'bg-zinc-950 text-white border-zinc-800 shadow-md hover:shadow-xl lg:-translate-y-2'
                      : 'bg-white text-zinc-900 border-zinc-200/90 shadow-xs hover:border-amber-400/40 hover:shadow-md'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-zinc-950 rounded-full text-xs font-bold shadow-xs">
                      ★ {t.pricing.popularBadge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold tracking-tight">
                        {name}
                      </h3>
                    </div>

                    <p className={`text-xs font-normal leading-relaxed mb-6 ${isPopular ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {description}
                    </p>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-zinc-100/20">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold tracking-tight font-mono">
                          ${price.toLocaleString()}
                        </span>
                        <span className={`text-xs font-medium ${isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {t.pricing.perMonth}
                        </span>
                      </div>
                      {isAnnual && (
                        <span className={`text-xs font-medium block mt-1 ${isPopular ? 'text-amber-400' : 'text-zinc-400'}`}>
                          {t.pricing.billedAnnually}
                        </span>
                      )}
                    </div>

                    {/* Guarantee Strip */}
                    <div className={`p-3 rounded-xl border text-xs font-medium mb-6 flex items-start gap-2 ${
                      isPopular 
                        ? 'bg-zinc-900 border-zinc-800 text-amber-300' 
                        : 'bg-zinc-50 border-zinc-100 text-zinc-800'
                    }`}>
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{guarantee}</span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <div className={`text-xs font-semibold uppercase tracking-wider ${isPopular ? 'text-zinc-400' : 'text-zinc-400'}`}>
                        {t.pricing.featuresIncluded}
                      </div>
                      {features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs font-normal">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onSelectTier({ ...tier, name, description, guarantee, features, ctaText })}
                    className={`w-full py-3.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-xs hover:shadow-md'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs hover:shadow-md'
                    }`}
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Big Guarantee Banner */}
        <ScrollReveal direction="up" delay={0.2} className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xs hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-zinc-950">
              {t.pricing.guaranteeTitle}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
              {t.pricing.guaranteeText}
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
