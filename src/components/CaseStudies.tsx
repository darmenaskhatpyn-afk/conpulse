import React, { useState } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Quote, 
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CASE_STUDIES } from '../data/conversionData';
import { CaseStudy } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedWords } from './MotionEffects';

interface CaseStudiesProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ 
  onOpenBooking, 
  onOpenAudit 
}) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeStudy, setActiveStudy] = useState<CaseStudy>(CASE_STUDIES[0]);

  const categories = [
    { id: 'all', label: t.caseStudies.tabAll },
    { id: 'saas', label: t.caseStudies.tabSaas },
    { id: 'services', label: t.caseStudies.tabServices },
    { id: 'd2c', label: t.caseStudies.tabD2c },
    { id: 'b2b', label: t.caseStudies.tabB2b },
  ];

  const filteredStudies = selectedCategory === 'all' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.category === selectedCategory);

  return (
    <section id="case-studies" className="py-20 md:py-28 relative scroll-mt-20 border-b border-zinc-100 bg-zinc-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <ScrollReveal direction="down" distance={12}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-tight shadow-xs">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.caseStudies.badge}</span>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            <AnimatedWords text={t.caseStudies.title} />
          </h2>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">
              {t.caseStudies.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Category Filters */}
        <ScrollReveal direction="up" distance={16} delay={0.15} className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                const first = cat.id === 'all' ? CASE_STUDIES[0] : CASE_STUDIES.find(s => s.category === cat.id);
                if (first) setActiveStudy(first);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Featured Case Study In-Depth Card */}
        <ScrollReveal direction="scale" distance={24} className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-10 shadow-xs mb-10 overflow-hidden hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Summary & Metrics */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800">
                    {activeStudy.industry}
                  </span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    {t.caseStudies.turnaround} {activeStudy.timeline}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 leading-snug">
                    {activeStudy.headline}
                  </h3>
                  <p className="text-zinc-600 text-sm sm:text-base mt-2 leading-relaxed font-normal">
                    {activeStudy.summary}
                  </p>
                </div>
              </div>

              {/* Hard Metrics Showcase */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50/70 border border-zinc-100 rounded-xl">
                  <span className="text-xs font-medium text-zinc-500 block mb-1">
                    {activeStudy.metricLabel}
                  </span>
                  <div className="text-3xl font-extrabold tracking-tight text-zinc-950">
                    {activeStudy.keyMetric}
                  </div>
                </div>

                <div className="p-4 bg-zinc-50/70 border border-zinc-100 rounded-xl">
                  <span className="text-xs font-medium text-zinc-500 block mb-1">
                    {activeStudy.secondaryLabel}
                  </span>
                  <div className="text-3xl font-extrabold tracking-tight text-zinc-950">
                    {activeStudy.secondaryMetric}
                  </div>
                </div>
              </div>

              {/* Before vs After Table */}
              <div className="p-4 bg-zinc-50/50 border border-zinc-100 rounded-xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-3">
                  {t.caseStudies.beforeAfterHeading}
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white border border-zinc-200/80 rounded-lg">
                    <span className="text-zinc-400 block text-[10px] uppercase font-semibold">{t.caseStudies.crLabel}</span>
                    <span className="text-rose-500 line-through text-xs font-medium block">{activeStudy.beforeStats.conversionRate}</span>
                    <span className="text-zinc-950 font-bold text-sm block mt-0.5">{activeStudy.afterStats.conversionRate}</span>
                  </div>
                  <div className="p-2.5 bg-white border border-zinc-200/80 rounded-lg">
                    <span className="text-zinc-400 block text-[10px] uppercase font-semibold">{t.caseStudies.cacLabel}</span>
                    <span className="text-rose-500 line-through text-xs font-medium block">{activeStudy.beforeStats.cac}</span>
                    <span className="text-zinc-950 font-bold text-sm block mt-0.5">{activeStudy.afterStats.cac}</span>
                  </div>
                  <div className="p-2.5 bg-white border border-zinc-200/80 rounded-lg">
                    <span className="text-zinc-400 block text-[10px] uppercase font-semibold">{t.caseStudies.leadsLabel}</span>
                    <span className="text-rose-500 line-through text-xs font-medium block">{activeStudy.beforeStats.monthlyLeads}</span>
                    <span className="text-zinc-950 font-bold text-sm block mt-0.5">{activeStudy.afterStats.monthlyLeads}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeStudy.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-2.5 py-1 bg-zinc-100 rounded-md text-zinc-700">
                    ✓ {tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Right: Executive Testimonial Quote & Action */}
            <div className="lg:col-span-5 bg-zinc-950 text-white border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-zinc-500" />
                <p className="text-sm sm:text-base text-zinc-200 italic leading-relaxed font-normal">
                  "{activeStudy.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeStudy.avatar} 
                    alt={activeStudy.authorName} 
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{activeStudy.authorName}</h4>
                    <p className="text-xs text-zinc-400">{activeStudy.authorRole}</p>
                    <span className="text-xs text-emerald-400 font-semibold">{activeStudy.client}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center text-amber-400 text-xs">
                    {'★★★★★'.split('').map((s, i) => <span key={i}>★</span>)}
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">Verified Client</span>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3 text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-100 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <span>{t.nav.bookCall}</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

            </div>

          </div>
        </ScrollReveal>

        {/* Study Cards Selector Grid */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStudies.map((study) => {
            const isSelected = activeStudy.id === study.id;
            return (
              <StaggerItem key={study.id} direction="scale">
                <motion.button
                  whileHover={{ y: -4, transition: { duration: 0.15 } }}
                  onClick={() => setActiveStudy(study)}
                  className={`w-full h-full p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-950 border-zinc-950 text-white shadow-md'
                      : 'bg-white border-zinc-200/90 hover:border-amber-400/50 text-zinc-800 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-950'}`}>{study.client}</span>
                      <span className={`text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-zinc-950'}`}>{study.keyMetric}</span>
                    </div>
                    <p className={`text-xs line-clamp-2 leading-relaxed mb-3 font-normal ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {study.headline}
                    </p>
                  </div>
                  <div className={`flex items-center justify-between text-xs font-medium pt-3 border-t w-full ${
                    isSelected ? 'border-zinc-800 text-zinc-400' : 'border-zinc-100 text-zinc-400'
                  }`}>
                    <span>{study.timeline} sprint</span>
                    <span className={`flex items-center gap-1 ${isSelected ? 'text-emerald-400 font-semibold' : 'text-zinc-900 font-semibold'}`}>
                      Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
