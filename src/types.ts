export interface CaseStudy {
  id: string;
  client: string;
  category: 'saas' | 'd2c' | 'b2b' | 'services';
  industry: string;
  logo: string;
  avatar: string;
  authorName: string;
  authorRole: string;
  headline: string;
  summary: string;
  keyMetric: string;
  metricLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  timeline: string;
  beforeStats: {
    conversionRate: string;
    cac: string;
    monthlyLeads: string;
  };
  afterStats: {
    conversionRate: string;
    cac: string;
    monthlyLeads: string;
  };
  tags: string[];
  quote: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  guarantee: string;
}

export interface FaqItem {
  id: string;
  category: 'guarantee' | 'process' | 'tech' | 'pricing';
  question: string;
  answer: string;
}

export interface AuditQuizState {
  businessType: string;
  bottleneck: string;
  monthlyTraffic: string;
  monthlyRevenue: string;
  name: string;
  email: string;
  website: string;
}

export interface BookingSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  website: string;
  date: string;
  timeSlot: string;
  attendeesCount: string;
  primaryGoal: string;
  createdAt: string;
}
