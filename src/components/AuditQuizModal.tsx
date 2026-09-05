import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

interface AuditQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCall: () => void;
}

export const AuditQuizModal: React.FC<AuditQuizModalProps> = ({ 
  isOpen, 
  onClose, 
  onBookCall 
}) => {
  const [step, setStep] = useState<number>(1);
  const [businessType, setBusinessType] = useState<string>('B2B SaaS');
  const [bottleneck, setBottleneck] = useState<string>('Landing Page Bounce Rate');
  const [trafficVolume, setTrafficVolume] = useState<string>('10k - 50k visitors / mo');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  if (!isOpen) return null;

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      if (!formData.name || !formData.email || !formData.website) {
        return;
      }
      setIsGenerating(true);
      
      // Send lead to server reliably
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            website: formData.website,
            type: 'audit_quiz',
            data: { businessType, bottleneck, trafficVolume }
          })
        });
      } catch (err) {
        console.warn('Lead capture background notice:', err);
      }

      setIsGenerating(false);
      setReportReady(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const getHealthScore = () => {
    if (bottleneck.includes('Bounce')) return 48;
    if (bottleneck.includes('Checkout')) return 54;
    if (bottleneck.includes('CAC')) return 42;
    return 58;
  };

  const getActionPlan = () => {
    switch (businessType) {
      case 'B2B SaaS':
        return [
          { title: 'Interactive ROI Estimator', impact: '+35% Demo Bookings', desc: 'Replace static feature lists with a dynamic financial value calculator.' },
          { title: 'Micro-Copy Reassurance at Sign-Up', impact: '-40% Friction', desc: 'Add "No credit card required • Instant access" micro-guarantees.' },
          { title: 'Frictionless 1-Click Calendar Sync', impact: '92% Show-Up Rate', desc: 'Direct browser calendar integration with automated briefing.' }
        ];
      case 'E-Commerce / D2C':
        return [
          { title: '1-Click Sticky Mobile Checkout', impact: '+48% Mobile AOV', desc: 'Deploy 44px+ thumb-friendly payment triggers with ApplePay/GooglePay.' },
          { title: 'Dynamic Bundle Upsells', impact: '+$24 AOV Lift', desc: 'Deploy intelligent post-add cart recommendation sliders.' },
          { title: 'Risk-Reversal Guarantee Seals', impact: '-32% Cart Abandonment', desc: 'Place clear 30-day money-back seals right above checkout buttons.' }
        ];
      default:
        return [
          { title: 'Self-Qualifying Diagnostic Intake', impact: '3.2x Lead Velocity', desc: 'Route high-budget accounts directly to calendar while educating smaller leads.' },
          { title: 'Verified Social Proof Ticker', impact: '+60% Trust Index', desc: 'Display quantitative before/after results with executive logos.' },
          { title: 'Proactive Objection-Crushing FAQ', impact: '-50% Sales Hesitation', desc: 'Tackle timeline, pricing, and onboarding queries upfront.' }
        ];
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white border border-zinc-200/90 rounded-2xl text-zinc-900 p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!reportReady ? (
          <div>
            {/* Top Step Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 mb-2">
                <span className="flex items-center gap-1.5 text-zinc-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Step {step} of 3
                </span>
                <span>60-Second Conversion Audit</span>
              </div>
              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-zinc-900 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Business Model & Traffic */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
                    Business Model & Traffic
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-normal">
                    This benchmarks your conversion metrics against 180+ analyzed funnels.
                  </p>
                </div>

                {/* Business Model Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-900">Business Type</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['B2B SaaS', 'E-Commerce / D2C', 'Agency / High-Ticket', 'Telehealth & Services'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBusinessType(type)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                          businessType === type
                            ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                            : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Traffic */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-900">Monthly Traffic Volume</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['< 5k visitors / mo', '5k - 25k visitors / mo', '25k - 100k visitors / mo', '100k+ visitors / mo'].map((vol) => (
                      <button
                        key={vol}
                        type="button"
                        onClick={() => setTrafficVolume(vol)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          trafficVolume === vol
                            ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                            : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3.5 text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Primary Bottleneck */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
                    Primary Conversion Bottleneck
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-normal">
                    Select the largest friction point in your current customer acquisition flow.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { title: 'High Bounce Rate on Landing Page', desc: 'Visitors leave within 5-10 seconds without engaging with our offer.' },
                    { title: 'Leads Drop Off at Forms / Checkout', desc: 'Prospects start the signup or booking process but abandon before finishing.' },
                    { title: 'Paid Ad CAC is Too High to Scale', desc: 'Cost-per-acquisition is eroding margins due to poor on-page conversion.' },
                    { title: 'Low Consultation Show-Up Rate', desc: 'Leads book meetings but 35-50% fail to attend the scheduled call.' }
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setBottleneck(item.title)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        bottleneck === item.title
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                          : 'bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300'
                      }`}
                    >
                      <div className="text-xs font-bold mb-0.5">{item.title}</div>
                      <div className={`text-xs ${bottleneck === item.title ? 'text-zinc-300' : 'text-zinc-500'}`}>{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 text-xs font-semibold text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-2/3 py-3.5 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Analyze Friction Leaks</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact & Report Dispatch */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
                    Dispatch Your Diagnostic Audit
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-normal">
                    Enter your details to generate your tailored 5-point conversion blueprint.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="text-xs font-medium text-zinc-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-700 block mb-1">Work Email (For Audit Report)</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-700 block mb-1">Company Website URL</label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourcompany.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-600 flex items-center gap-2 font-normal">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your information is strictly confidential. Zero spam guarantee.</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3 text-xs font-semibold text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isGenerating || !formData.name || !formData.email || !formData.website}
                    className="w-2/3 py-3.5 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating Audit...
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Instant Blueprint</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          /* Report Ready View */
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            
            {/* Header Badge */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Conversion Audit Generated for {formData.name || 'Your Brand'}</span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-zinc-950">
                Diagnostic Assessment & Plan
              </h3>
            </div>

            {/* Score Box */}
            <div className="p-5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-xs text-zinc-400 font-medium block mb-0.5">Current Conversion Score</span>
                <div className="text-3xl font-extrabold text-amber-400 tracking-tight">
                  {getHealthScore()} / 100
                </div>
                <span className="text-xs font-medium text-rose-400">
                  Friction: {bottleneck}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400 font-medium block mb-0.5">Projected Post-Optimization</span>
                <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                  94 / 100
                </div>
                <span className="text-xs font-medium text-emerald-300">
                  +2.5x Estimated Uplift
                </span>
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-900 block">
                Top 3 Fixes For {businessType}:
              </span>
              {getActionPlan().map((action, i) => (
                <div key={i} className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-100 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span>{action.title}</span>
                    </div>
                    <p className="text-xs text-zinc-600 pl-6 font-normal">{action.desc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-900 px-2 py-0.5 bg-white rounded-md border border-zinc-200 whitespace-nowrap shadow-2xs">
                    {action.impact}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onBookCall();
                }}
                className="w-full py-3.5 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Book 15-Min Strategy Session to Deploy</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => {
                  alert(`Audit Blueprint emailed to ${formData.email}. Our team will prepare the in-depth teardown.`);
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Summary & Email to My Inbox</span>
              </button>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
};
