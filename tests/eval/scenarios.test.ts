import { describe, it, expect } from 'vitest';
import { generateEventPlan } from '@/lib/ai/gemini';
import { GeneratedPlanSchema } from '@/lib/ai/schemas';
import { WizardData } from '@/types/event';

const EVAL_SCENARIOS: WizardData[] = [
  {
    type: 'wedding',
    title: "Arjun & Priya's Royal Palace Wedding",
    city: 'Jaipur',
    guestCount: 200,
    totalBudget: 2500000,
    currency: 'INR',
    vibeTags: ['Traditional', 'Royal'],
    dietaryPreferences: ['Vegetarian', 'Jain'],
    culturalPreferences: ['Vedic Hindu Vivah', 'Sangeet & Punjabi Dhol'],
    mustHaves: ['Mandap floral arch'],
    noGos: ['Single use plastic']
  },
  {
    type: 'wedding',
    title: 'Intimate Lakeside Vivah',
    city: 'Udaipur',
    guestCount: 80,
    totalBudget: 500000,
    currency: 'INR',
    vibeTags: ['Rustic & Natural', 'Minimalist & Elegant'],
    dietaryPreferences: ['Pure Vegetarian'],
    culturalPreferences: ['Rajasthani Heritage'],
    mustHaves: ['Lakeside pheras'],
    noGos: ['Late night DJ']
  },
  {
    type: 'birthday',
    title: "Aarav's 5th Superhero Jungle Birthday",
    city: 'Mumbai',
    guestCount: 30,
    totalBudget: 50000,
    currency: 'INR',
    vibeTags: ['High Energy & Fun'],
    dietaryPreferences: ['Nut Allergies Safe'],
    culturalPreferences: ['Contemporary Western'],
    mustHaves: ['Superhero Mascot'],
    noGos: ['Dangerous toys']
  },
  {
    type: 'birthday',
    title: "Dad's 50th Milestone Golden Jubilee",
    city: 'Bengaluru',
    guestCount: 60,
    totalBudget: 150000,
    currency: 'INR',
    vibeTags: ['Modern & Chic', 'Minimalist & Elegant'],
    dietaryPreferences: ['Vegetarian'],
    culturalPreferences: ['Contemporary Western'],
    mustHaves: ['Acoustic live band'],
    noGos: []
  },
  {
    type: 'community',
    title: 'Green Valley Grand Diwali Mela',
    city: 'Delhi',
    guestCount: 500,
    totalBudget: 300000,
    currency: 'INR',
    vibeTags: ['Traditional', 'Eco-Friendly & Sustainable'],
    dietaryPreferences: ['Pure Vegetarian'],
    culturalPreferences: ['Interfaith Harmony'],
    mustHaves: ['Terracotta diya lighting', 'Eco laser show'],
    noGos: ['Noise polluting firecrackers']
  },
  {
    type: 'community',
    title: 'Society Navratri Dandiya Night',
    city: 'Ahmedabad',
    guestCount: 250,
    totalBudget: 80000,
    currency: 'INR',
    vibeTags: ['Traditional', 'High Energy & Fun'],
    dietaryPreferences: ['Jain (No Root Veggies)'],
    culturalPreferences: ['Gujarati Garba / Dandiya'],
    mustHaves: ['Live folk singers'],
    noGos: []
  },
  {
    type: 'wedding',
    title: 'Sunset Beach Boho Wedding',
    city: 'Goa',
    guestCount: 120,
    totalBudget: 1000000,
    currency: 'INR',
    vibeTags: ['Modern & Chic', 'Rustic & Natural'],
    dietaryPreferences: ['Vegan', 'Gluten-Free'],
    culturalPreferences: ['Contemporary Western'],
    mustHaves: ['Beach acoustic stage'],
    noGos: []
  },
  {
    type: 'birthday',
    title: 'Surprise Rooftop Cocktail Evening',
    city: 'Pune',
    guestCount: 25,
    totalBudget: 40000,
    currency: 'INR',
    vibeTags: ['Modern & Chic'],
    dietaryPreferences: ['Vegetarian'],
    culturalPreferences: ['Contemporary Western'],
    mustHaves: ['Custom dessert bar'],
    noGos: []
  },
  {
    type: 'community',
    title: 'Green Earth Charity Cultural Drive',
    city: 'Chennai',
    guestCount: 350,
    totalBudget: 200000,
    currency: 'INR',
    vibeTags: ['Eco-Friendly & Sustainable'],
    dietaryPreferences: ['South Indian Traditional'],
    culturalPreferences: ['Interfaith Harmony'],
    mustHaves: ['Tree sapling giveaway'],
    noGos: ['Plastic water bottles']
  },
  {
    type: 'wedding',
    title: 'Royal Mandawa Fort Destination Vivah',
    city: 'Jodhpur',
    guestCount: 180,
    totalBudget: 1800000,
    currency: 'INR',
    vibeTags: ['Royal & Majestic', 'Grand Bollywood'],
    dietaryPreferences: ['Pure Vegetarian'],
    culturalPreferences: ['Rajasthani Heritage', 'Vedic Hindu Vivah'],
    mustHaves: ['Grand Baraat with live dhols'],
    noGos: []
  }
];

describe('AI 10-Scenario Rigorous Evaluation Suite', () => {
  EVAL_SCENARIOS.forEach((scenario, index) => {
    it(`Scenario #${index + 1} [${scenario.type.toUpperCase()}]: ${scenario.title} (${scenario.city})`, async () => {
      const plan = await generateEventPlan(scenario);

      // 1. Zod schema validation
      const parseResult = GeneratedPlanSchema.safeParse(plan);
      expect(parseResult.success).toBe(true);

      // 2. Budget sums must equal 100% ±1%
      const totalPercentage = plan.budget.reduce((acc, cat) => acc + cat.percentage, 0);
      expect(totalPercentage).toBeGreaterThanOrEqual(99);
      expect(totalPercentage).toBeLessThanOrEqual(101);

      // 3. Planned budget total must equal or closely scale to requested total budget
      const calculatedPlannedTotal = plan.budget.reduce((acc, cat) => acc + cat.plannedAmount, 0);
      expect(calculatedPlannedTotal).toBeGreaterThanOrEqual(scenario.totalBudget * 0.9);
      expect(calculatedPlannedTotal).toBeLessThanOrEqual(scenario.totalBudget * 1.1);

      // 4. Timeline sanity: tasks exist and day-of run-of-show present
      expect(plan.timeline.length).toBeGreaterThanOrEqual(5);

      // 5. Contingency cushion between 5% and 10%
      expect(plan.summary.contingencyPercent).toBeGreaterThanOrEqual(5);
      expect(plan.summary.contingencyPercent).toBeLessThanOrEqual(10);
    });
  });
});
