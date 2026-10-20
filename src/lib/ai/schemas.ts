import { z } from 'zod';

export const BudgetSubCategorySchema = z.object({
  name: z.string(),
  amount: z.number(),
  notes: z.string().optional()
});

export const BudgetCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  percentage: z.number(),
  plannedAmount: z.number(),
  actualAmount: z.number(),
  paidAmount: z.number(),
  notes: z.string().optional(),
  subCategories: z.array(BudgetSubCategorySchema).optional()
});

export const TimelineTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  phase: z.enum(['12m', '6m', '3m', '1m', '4w', '2w', '1w', 'dayBefore', 'dayOf']),
  dueDate: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'done', 'skipped']),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  category: z.string().optional(),
  assignee: z.string().optional(),
  minuteSchedule: z.string().optional()
});

export const VendorItemSchema = z.object({
  id: z.string(),
  category: z.string(),
  name: z.string(),
  status: z.enum(['researching', 'contacted', 'quoted', 'booked', 'paid']),
  quoteAmount: z.number().optional(),
  contact: z
    .object({
      person: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      website: z.string().optional()
    })
    .optional(),
  notes: z.string().optional(),
  deadline: z.string().optional(),
  questionsToAsk: z.array(z.string()).optional(),
  redFlags: z.array(z.string()).optional()
});

export const IdeaItemSchema = z.object({
  id: z.string(),
  kind: z.enum(['theme', 'decor', 'menu', 'entertainment', 'gift', 'hack']),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  colorPalette: z.array(z.string()).optional(),
  saved: z.boolean().optional()
});

export const RiskItemSchema = z.object({
  id: z.string(),
  risk: z.string(),
  impact: z.enum(['low', 'medium', 'high']),
  likelihood: z.enum(['low', 'medium', 'high']),
  mitigation: z.string()
});

export const GeneratedPlanSchema = z.object({
  summary: z.object({
    title: z.string(),
    description: z.string(),
    theme: z.string(),
    colorPalette: z.array(z.string()),
    contingencyPercent: z.number(),
    contingencyAmount: z.number()
  }),
  budget: z.array(BudgetCategorySchema),
  timeline: z.array(TimelineTaskSchema),
  vendors: z.array(VendorItemSchema),
  ideas: z.array(IdeaItemSchema),
  risks: z.array(RiskItemSchema)
});
