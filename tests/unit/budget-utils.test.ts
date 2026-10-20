import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, slugify, truncate, getEventColor } from '@/lib/utils';
import { GeneratedPlanSchema } from '@/lib/ai/schemas';
import { DEMO_WEDDING_PLAN, DEMO_BIRTHDAY_PLAN, DEMO_COMMUNITY_PLAN } from '@/lib/ai/demo-data';

describe('Jashn Utility Functions', () => {
  it('formats Indian Rupee currency correctly', () => {
    const formatted = formatCurrency(2500000, 'INR');
    expect(formatted).toContain('25,00,000');
  });

  it('slugifies titles into clean URL-friendly strings', () => {
    expect(slugify("Arjun & Priya's Grand Wedding!")).toBe('arjun-priyas-grand-wedding');
  });

  it('truncates long strings gracefully with ellipsis', () => {
    expect(truncate('A majestic royal palace wedding in Jaipur Rajasthan', 20)).toBe('A majestic royal ...');
  });

  it('returns corresponding event theme accent colors', () => {
    expect(getEventColor('wedding')).toBe('rose');
    expect(getEventColor('birthday')).toBe('marigold');
    expect(getEventColor('community')).toBe('emerald');
  });
});

describe('Jashn AI Plan Schema & Validation', () => {
  it('validates Wedding demo plan against strict Zod schema', () => {
    const parseResult = GeneratedPlanSchema.safeParse(DEMO_WEDDING_PLAN);
    expect(parseResult.success).toBe(true);
  });

  it('validates Birthday demo plan against strict Zod schema', () => {
    const parseResult = GeneratedPlanSchema.safeParse(DEMO_BIRTHDAY_PLAN);
    expect(parseResult.success).toBe(true);
  });

  it('validates Community festival demo plan against strict Zod schema', () => {
    const parseResult = GeneratedPlanSchema.safeParse(DEMO_COMMUNITY_PLAN);
    expect(parseResult.success).toBe(true);
  });

  it('asserts budget category percentages sum to 100% (±1%) for all demo plans', () => {
    [DEMO_WEDDING_PLAN, DEMO_BIRTHDAY_PLAN, DEMO_COMMUNITY_PLAN].forEach((plan) => {
      const sum = plan.budget.reduce((acc, cat) => acc + cat.percentage, 0);
      expect(sum).toBeGreaterThanOrEqual(99);
      expect(sum).toBeLessThanOrEqual(101);
    });
  });
});
