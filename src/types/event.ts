export type EventType = 'wedding' | 'birthday' | 'community';

export type EventStatus = 'draft' | 'planning' | 'ready' | 'completed';

export interface WizardData {
  type: EventType;
  subType?: string;
  title: string;
  eventDate?: string;
  dateRangeFlex?: boolean;
  city: string;
  guestCount: number;
  totalBudget: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY';
  vibeTags: string[];
  dietaryPreferences: string[];
  culturalPreferences: string[];
  mustHaves: string[];
  noGos: string[];
  notes?: string;
}

export interface BudgetCategoryItem {
  id: string;
  name: string;
  percentage: number;
  plannedAmount: number;
  actualAmount: number;
  paidAmount: number;
  notes?: string;
  subCategories?: {
    name: string;
    amount: number;
    notes?: string;
  }[];
}

export interface TimelineTaskItem {
  id: string;
  title: string;
  description?: string;
  phase: '12m' | '6m' | '3m' | '1m' | '4w' | '2w' | '1w' | 'dayBefore' | 'dayOf';
  dueDate?: string;
  status: 'pending' | 'in_progress' | 'done' | 'skipped';
  priority: 'critical' | 'high' | 'medium' | 'low';
  category?: string;
  assignee?: string;
  dependsOn?: string[];
  minuteSchedule?: string; // For day-of run-of-show (e.g., "09:00 AM")
}

export interface VendorItem {
  id: string;
  category: string;
  name: string;
  status: 'researching' | 'contacted' | 'quoted' | 'booked' | 'paid';
  quoteAmount?: number;
  contact?: {
    person?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  notes?: string;
  deadline?: string;
  questionsToAsk?: string[];
  redFlags?: string[];
}

export interface GuestItem {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  group?: string; // "Family", "Friends", "Colleagues", "VIP"
  dietary?: string[];
  plusOnes: number;
  rsvpStatus: 'pending' | 'accepted' | 'declined' | 'maybe';
  tableId?: string;
  notes?: string;
}

export interface IdeaItem {
  id: string;
  kind: 'theme' | 'decor' | 'menu' | 'entertainment' | 'gift' | 'hack';
  title: string;
  description: string;
  tags?: string[];
  colorPalette?: string[];
  saved?: boolean;
}

export interface RiskItem {
  id: string;
  risk: string;
  impact: 'low' | 'medium' | 'high';
  likelihood: 'low' | 'medium' | 'high';
  mitigation: string;
}

export interface GeneratedPlan {
  summary: {
    title: string;
    description: string;
    theme: string;
    colorPalette: string[];
    contingencyPercent: number;
    contingencyAmount: number;
  };
  budget: BudgetCategoryItem[];
  timeline: TimelineTaskItem[];
  vendors: VendorItem[];
  ideas: IdeaItem[];
  risks: RiskItem[];
}

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  toolCall?: {
    name: string;
    summary: string;
    appliedChanges?: {
      target: string;
      before?: any;
      after: any;
    };
    undone?: boolean;
  };
}
