import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  Lock, 
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, StaggerContainer, StaggerItem } from './MotionEffects';

export const SocialProofBar: React.FC = () => {
  const { t } = useLanguage();

  const publicationLogos = [
    'FORBES',
    'TECHCRUNCH',
    'WIRED',
    'FAST COMPANY',
    'BLOOMBERG',
    'WALL STREET JOURNAL'
  ];

  const metrics = [
    {
      value: '$48.6M',
      label: t.socialProof.metricRevenue,
      subtext: t.socialProof.metric1Subtext,
      category: t.socialProof.metric1Cat
    },
    {
      value: '2.8X',
      label: t.socialProof.metricLift,
      subtext: t.socialProof.metric2Subtext,
      category: t.socialProof.metric2Cat
    },
    {
      value: '99.4%',
      label: t.socialProof.metricSatisfaction,
      subtext: t.socialProof.metric3Subtext,
      category: t.socialProof.metric3Cat
    },
    {
      value: t.socialProof.metric4Val,
      label: t.socialProof.metricSpeed,
      subtext: t.socialProof.metric4Subtext,
      category: t.socialProof.metric4Cat
    }
  ];

  return (
    <section className="relative py-16 bg-zinc-50/50 border-b border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trusted By Publication Bar */}
        <ScrollReveal direction="fade" className="text-center mb-6">
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
            {t.socialProof.title}
          </p>
        </ScrollReveal>

        {/* Brand Logos Bar */}
        <ScrollReveal direction="up" distance={20} delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pb-12 border-b border-zinc-200/60 text-zinc-400">
            {publicationLogos.map((brand, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.08, color: '#18181b' }}
                className="font-bold text-sm sm:text-base tracking-widest text-zinc-400 hover:text-zinc-700 transition-colors select-none cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Core Conversion Metrics Grid */}
        <StaggerContainer 
          staggerDelay={0.1}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {metrics.map((item, idx) => (
            <StaggerItem key={idx} direction="scale">
              <div 
                className="p-6 bg-white border border-zinc-200/80 rounded-2xl shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all group"
              >
                <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2 group-hover:text-amber-600 transition-colors">
                  {item.category}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 mb-1">
                  {item.value}
                </div>
                <h3 className="text-sm font-semibold text-zinc-800 mb-1">
                  {item.label}
                </h3>
                <p className="text-xs text-zinc-500 font-normal leading-relaxed">{item.subtext}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust Badges Strip */}
        <ScrollReveal direction="up" distance={20} delay={0.2} className="mt-10 pt-6 border-t border-zinc-200/60 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-600">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-full shadow-xs hover:border-zinc-300 transition-colors">
            <ShieldCheck className="w-4 h-4 text-zinc-800" />
            <span>SOC-2 Certified</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-full shadow-xs hover:border-zinc-300 transition-colors">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-full shadow-xs hover:border-zinc-300 transition-colors">
            <Award className="w-4 h-4 text-zinc-800" />
            <span>60-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-full shadow-xs hover:border-zinc-300 transition-colors">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>$48M+ Client Revenue</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
