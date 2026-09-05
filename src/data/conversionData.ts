import { CaseStudy, PricingTier, FaqItem } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'hyperion-saas',
    client: 'Hyperion Analytics',
    category: 'saas',
    industry: 'Enterprise B2B AI Platform',
    logo: '⚡ Hyperion',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorName: 'Elena Rostova',
    authorRole: 'VP of Growth & Revenue',
    headline: 'From 1.8% to 5.4% Demo Conversion Rate in 45 Days',
    summary: 'Redesigned the entire landing page hierarchy, replaced generic copy with proof-first micro-copy, and implemented an interactive live ROI estimator.',
    keyMetric: '+214%',
    metricLabel: 'Increase in Qualified Demo Calls',
    secondaryMetric: '-41%',
    secondaryLabel: 'Reduction in Cost Per Acquisition (CAC)',
    timeline: '45 Days',
    beforeStats: {
      conversionRate: '1.8%',
      cac: '$340',
      monthlyLeads: '82 demos',
    },
    afterStats: {
      conversionRate: '5.4%',
      cac: '$201',
      monthlyLeads: '258 demos',
    },
    tags: ['Interactive ROI Tool', 'Frictionless Booking', 'Copywriting Revamp'],
    quote: 'ConvertPulse didn’t just make our page pretty—they engineered a customer conversion machine. Our sales reps are now booked 3 weeks in advance with highly qualified prospects.'
  },
  {
    id: 'lumina-health',
    client: 'Lumina Care',
    category: 'services',
    industry: 'Telehealth & Digital Wellness',
    logo: '🩺 Lumina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorName: 'Marcus Vance',
    authorRole: 'Co-Founder & CMO',
    headline: 'Added $1.42M in Annualized Patient Bookings in 60 Days',
    summary: 'Implemented a 3-step dynamic intake diagnostic quiz that matches patients instantly to licensed specialists and eliminates checkout hesitation.',
    keyMetric: '+328%',
    metricLabel: 'Patient Intake Completions',
    secondaryMetric: '88.5%',
    secondaryLabel: 'Quiz-to-Payment Conversion',
    timeline: '60 Days',
    beforeStats: {
      conversionRate: '2.1%',
      cac: '$94',
      monthlyLeads: '310 patients',
    },
    afterStats: {
      conversionRate: '6.9%',
      cac: '$38',
      monthlyLeads: '1,326 patients',
    },
    tags: ['Intake Diagnostic Quiz', 'Social Proof Ticker', 'Mobile Optimization'],
    quote: 'The diagnostic quiz alone revolutionized our customer onboarding. Patients feel understood before they even speak with a doctor, which skyrocketed our conversion.'
  },
  {
    id: 'veloce-d2c',
    client: 'Veloce Gear',
    category: 'd2c',
    industry: 'Premium Performance Wear',
    logo: '⚡ Veloce',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    authorName: 'Sarah Lin',
    authorRole: 'Head of E-Commerce',
    headline: 'Overcame Cart Abandonment: Boosted Store AOV by +44%',
    summary: 'Streamlined mobile product detail pages, integrated 1-click bundle upsells, and deployed strategic micro-guarantees at payment friction points.',
    keyMetric: '+$890k',
    metricLabel: 'Net New Monthly Revenue',
    secondaryMetric: '+44%',
    secondaryLabel: 'Average Order Value (AOV)',
    timeline: '30 Days',
    beforeStats: {
      conversionRate: '1.4%',
      cac: '$48',
      monthlyLeads: '$410k Gross',
    },
    afterStats: {
      conversionRate: '3.6%',
      cac: '$29',
      monthlyLeads: '$1.30M Gross',
    },
    tags: ['1-Click Upsells', 'Checkout Streamlining', 'Mobile First'],
    quote: 'Our bounce rates plummeted by 50% on mobile. The return on investment paid for itself within the first 11 days of deployment.'
  },
  {
    id: 'cloudscale-b2b',
    client: 'CloudScale DevOps',
    category: 'b2b',
    industry: 'Cloud Infrastructure & Security',
    logo: '☁️ CloudScale',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorName: 'David K.',
    authorRole: 'Founder & CEO',
    headline: 'Tripled Free-Trial-to-Paid Upgrade Rate from 9% to 27%',
    summary: 'Built automated in-app value triggers, dynamic onboarding checklists, and enterprise security comparison tables.',
    keyMetric: '3.0x',
    metricLabel: 'Trial to Paid Conversion Multiple',
    secondaryMetric: '-58%',
    secondaryLabel: 'Sales Cycle Velocity (Days to Close)',
    timeline: '90 Days',
    beforeStats: {
      conversionRate: '9.2%',
      cac: '$1,200',
      monthlyLeads: '24 Deals',
    },
    afterStats: {
      conversionRate: '27.4%',
      cac: '$510',
      monthlyLeads: '71 Deals',
    },
    tags: ['Onboarding Funnel', 'Enterprise Comparison', 'Trial Optimization'],
    quote: 'If you want serious buyer intent instead of tire-kickers, this framework is the ultimate growth lever. We closed our largest enterprise contract 2 weeks post-launch.'
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Conversion Launchpad',
    description: 'Perfect for established businesses looking to fix their primary conversion leaks and double lead flow quickly.',
    monthlyPrice: 2490,
    annualPrice: 1990,
    features: [
      'Full End-to-End Funnel & Friction Audit',
      'High-Converting Landing Page Architecture',
      'Persuasive Copywriting & Value Prop Rewrite',
      'Interactive Lead Diagnostic or Calculator',
      'Frictionless Calendar & Lead Capture Setup',
      'Mobile Performance & Speed Optimization (95+ Score)',
      '14-Day Post-Launch A/B Split Testing'
    ],
    notIncluded: [
      'Full Multi-Page Funnel Suite',
      'CRM & Multi-Step Email Nurture Sequence',
      'Dedicated 24/7 Conversion Slack Channel'
    ],
    ctaText: 'Start with Launchpad',
    guarantee: 'Guaranteed +30% conversion uplift or 100% refund'
  },
  {
    id: 'growth',
    name: 'Growth Conversion Engine',
    description: 'Our flagship turnkey solution. We overhaul your entire customer acquisition funnel and guarantee a minimum 2.5x conversion lift.',
    monthlyPrice: 4990,
    annualPrice: 3990,
    popular: true,
    features: [
      'Everything in Launchpad, plus:',
      'Complete Multi-Step Conversion Architecture',
      'Interactive Custom ROI / Pricing Configurator',
      'Live Proof Ticker & Dynamic Behavioral Badges',
      'Automated Multi-Channel Lead Nurturing (Email/SMS)',
      'Direct HubSpot / Salesforce / Zapier Pipeline Sync',
      'Weekly Multi-Variant A/B Testing & Heatmaps',
      'Dedicated Lead Conversion Strategist & CRO Dev',
      'Bi-Weekly Revenue & Funnel Strategy Reviews'
    ],
    ctaText: 'Deploy Growth Engine',
    guarantee: 'Guaranteed 2.5x Conversion Uplift in 60 Days'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Scale',
    description: 'Custom bespoke conversion infrastructure and dedicated CRO pod for high-volume enterprise brands & platforms.',
    monthlyPrice: 8990,
    annualPrice: 7190,
    features: [
      'Everything in Growth Engine, plus:',
      'Unlimited Funnel Re-architectures & Landing Pages',
      'Custom Machine-Learning Lead Scoring Logic',
      'Full Localization & Multi-Currency Dynamic Funnels',
      'Dedicated Full-Time Senior CRO Engineer & Designer',
      'Custom Analytics Data Warehouse & BI Dashboard',
      'Instant 15-Minute Response SLA via Private Slack',
      'Executive Monthly Board-Ready Growth Reports'
    ],
    ctaText: 'Book Enterprise Consultation',
    guarantee: 'Bespoke Performance-Linked Revenue SLA'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'guarantee',
    question: 'How does your 60-Day Conversion Guarantee work?',
    answer: 'We tie our results directly to your metrics. If your core conversion rate (leads, booked meetings, or sales checkout completions) does not increase by at least 2.5x within 60 days of deploying our conversion architecture, we work for free until it does, or issue a 100% unconditional refund. No fine print.'
  },
  {
    id: 'faq-2',
    category: 'process',
    question: 'How fast can we launch the new conversion website?',
    answer: 'Our standard deployment takes between 14 to 21 business days from kickoff to live production. We handle all design, psychology-backed copywriting, interactive widgets, integrations, and performance testing so your team can focus on closing deals.'
  },
  {
    id: 'faq-3',
    category: 'tech',
    question: 'Will this work with our existing CRM and marketing tech stack?',
    answer: 'Yes! We seamlessly integrate with all major platforms including HubSpot, Salesforce, ActiveCampaign, Klaviyo, Zapier, Webflow, WordPress, Shopify, Next.js, and custom APIs. Leads and customer data will flow smoothly into your existing pipelines with zero disruption.'
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'What makes this convert better than a traditional design agency?',
    answer: 'Traditional design agencies focus on aesthetics that "look pretty" but fail to address buyer psychology, cognitive load, objection handling, and micro-conversion friction. We design mathematically engineered conversion funnels with interactive diagnostics, quantifiable social proof, and high-velocity booking triggers proven across $48M+ in client transactions.'
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'Are there any hidden fees or long-term contracts?',
    answer: 'None whatsoever. All pricing is 100% transparent with no setup fees or hidden retainers. You can choose month-to-month flexibility or save 20% on annual growth partnerships.'
  },
  {
    id: 'faq-6',
    category: 'tech',
    question: 'How do you optimize mobile conversion rates?',
    answer: 'Over 68% of buyer journeys start on mobile. We build with a mobile-first philosophy: tap-friendly inputs, 44px+ hit targets, lightning-fast 0.8s load times, sticky action bars, and thumb-friendly checkout/booking flows that prevent bounce-offs.'
  }
];

export const TRUST_BADGES = [
  { name: 'SOC-2 Type II Certified', icon: 'ShieldCheck' },
  { name: '99.8% CSAT Rating', icon: 'Star' },
  { name: '4.9/5 on G2 & Trustpilot', icon: 'Award' },
  { name: 'GDPR & CCPA Compliant', icon: 'Lock' },
  { name: '$48M+ Tracked Revenue', icon: 'TrendingUp' }
];

export const LIVE_ACTIVITY_EVENTS = [
  { text: 'James D. from Austin just booked a 15-min CRO Consultation', time: '1 min ago', type: 'booking' },
  { text: 'ApexPay increased trial-to-paid conversions by +34%', time: '4 mins ago', type: 'result' },
  { text: 'Sarah T. generated a free Growth Audit for B2B SaaS', time: '6 mins ago', type: 'audit' },
  { text: 'Elena from Berlin unlocked +$120k projected monthly pipeline', time: '9 mins ago', type: 'calculator' },
  { text: 'HealthFlow closed 18 new enterprise clients this week', time: '12 mins ago', type: 'result' }
];
