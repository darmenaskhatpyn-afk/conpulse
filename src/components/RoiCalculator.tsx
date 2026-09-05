import React, { useState, useId } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Percent
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, AnimatedWords } from './MotionEffects';

interface RoiCalculatorProps {
  onOpenBooking: () => void;
  onOpenAudit?: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ 
  onOpenBooking, 
}) => {
  const { t } = useLanguage();
  const [traffic, setTraffic] = useState<number>(25000);
  const [currentCr, setCurrentCr] = useState<number>(1.5);
  const [acv, setAcv] = useState<number>(450);
  const [upliftMultiplier] = useState<number>(2.5); // 2.5x lift

  const trafficInputId = useId();
  const currentCrInputId = useId();
  const acvInputId = useId();

  // Calculations
  const currentMonthlyConversions = Math.round((traffic * (currentCr / 100)));
  const currentMonthlyRevenue = currentMonthlyConversions * acv;

  const targetCr = Number((currentCr * upliftMultiplier).toFixed(1));
  const optimizedMonthlyConversions = Math.round((traffic * (targetCr / 100)));
  const optimizedMonthlyRevenue = optimizedMonthlyConversions * acv;

  const additionalMonthlyRevenue = optimizedMonthlyRevenue - currentMonthlyRevenue;
  const additionalAnnualRevenue = additionalMonthlyRevenue * 12;

  return (
    <section id="roi-calculator" className="py-20 md:py-28 relative scroll-mt-20 border-b border-zinc-100 bg-zinc-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <ScrollReveal direction="down" distance={12}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-tight shadow-xs">
              <Calculator className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.roi.badge}</span>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            <AnimatedWords text={t.roi.title} />
          </h2>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-base text-zinc-600 font-normal leading-relaxed">
              {t.roi.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sliders & Controls */}
          <ScrollReveal direction="left" distance={30} className="lg:col-span-6 bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  {t.roi.siteParams}
                </span>
                <span className="text-xs font-medium text-zinc-400">Live Simulation</span>
              </div>

              {/* Slider 1: Monthly Traffic */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={trafficInputId} className="font-medium text-zinc-700 flex items-center gap-1.5 cursor-pointer">
                    <Users className="w-4 h-4 text-zinc-400" />
                    <span>{t.roi.sliderVisitors}</span>
                  </label>
                  <span className="font-bold text-zinc-950 text-sm font-mono bg-zinc-100 px-2.5 py-0.5 rounded-md">
                    {traffic.toLocaleString()}
                  </span>
                </div>
                <input
                  id={trafficInputId}
                  type="range"
                  min="2000"
                  max="200000"
                  step="1000"
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none accent-zinc-900 cursor-pointer"
                />
              </div>

              {/* Slider 2: Current CR */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={currentCrInputId} className="font-medium text-zinc-700 flex items-center gap-1.5 cursor-pointer">
                    <Percent className="w-4 h-4 text-zinc-400" />
                    <span>{t.roi.sliderCurrentCr}</span>
                  </label>
                  <span className="font-bold text-zinc-950 text-sm font-mono bg-zinc-100 px-2.5 py-0.5 rounded-md">
                    {currentCr}%
                  </span>
                </div>
                <input
                  id={currentCrInputId}
                  type="range"
                  min="0.3"
                  max="5.0"
                  step="0.1"
                  value={currentCr}
                  onChange={(e) => setCurrentCr(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none accent-zinc-900 cursor-pointer"
                />
              </div>

              {/* Slider 3: Average Customer Value (ACV) */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={acvInputId} className="font-medium text-zinc-700 flex items-center gap-1.5 cursor-pointer">
                    <DollarSign className="w-4 h-4 text-zinc-400" />
                    <span>{t.roi.sliderAov}</span>
                  </label>
                  <span className="font-bold text-zinc-950 text-sm font-mono bg-zinc-100 px-2.5 py-0.5 rounded-md">
                    ${acv}
                  </span>
                </div>
                <input
                  id={acvInputId}
                  type="range"
                  min="25"
                  max="5000"
                  step="25"
                  value={acv}
                  onChange={(e) => setAcv(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none accent-zinc-900 cursor-pointer"
                />
              </div>

            </div>

            {/* Quick summary line */}
            <div className="mt-8 pt-4 border-t border-zinc-100 text-xs font-normal text-zinc-400">
              {t.roi.disclaimer}
            </div>
          </ScrollReveal>

          {/* Right Column: High-Impact ROI Display */}
          <ScrollReveal direction="right" distance={30} className="lg:col-span-6 bg-zinc-950 text-white border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t.roi.lostRevenueBadge}</span>
                </div>
                <span className="text-zinc-400 text-xs font-mono">2.5x Target Lift</span>
              </div>

              {/* Big Loss / Gain Stat */}
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                  {t.roi.annualGainBadge}
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-400 font-mono">
                  +${additionalAnnualRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-zinc-400 mt-1 font-normal">
                  = +${additionalMonthlyRevenue.toLocaleString()} {t.roi.additionalMonthlyText}
                </p>
              </div>

              {/* Before / After Stats */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-800">
                <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
                    {t.roi.currentMonthlyRev}
                  </span>
                  <div className="text-xl font-bold text-zinc-200 font-mono">
                    ${currentMonthlyRevenue.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    ({currentMonthlyConversions} conversions)
                  </span>
                </div>

                <div className="p-3.5 bg-zinc-900/60 border border-emerald-800/40 rounded-xl">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 block mb-1">
                    {t.roi.potentialMonthlyRev}
                  </span>
                  <div className="text-xl font-bold text-emerald-400 font-mono">
                    ${optimizedMonthlyRevenue.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-400/80 block mt-0.5">
                    ({optimizedMonthlyConversions} conversions)
                  </span>
                </div>
              </div>

            </div>

            {/* Action Call to Action */}
            <div className="mt-8 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 text-sm font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <span>{t.roi.btnClaimRevenue}</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
