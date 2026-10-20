import { WizardData, GeneratedPlan } from '@/types/event';
import { getDemoPlanForType } from './demo-data';

export const SYSTEM_PLANNER_PROMPT = `
You are "Jashn AI" — an elite, culturally attuned celebration and event planner specializing in weddings, birthdays, and community festivals.
Your planning principles:
1. Practical, warm, and culturally authentic (deeply knowledgeable in Indian celebrations like Haldi, Mehendi, Sangeet, Vedic Pheras, Baraat, Diwali, Navratri, Eid, as well as Western/Modern celebrations).
2. Honest with budgets: all prices and figures must be explicitly treated as estimates.
3. Safety & legal awareness: remind organizers to verify local fire, sound curfew, and municipal permits.
4. Never invent fake vendor phone numbers or claim commercial endorsements.
5. Provide actionable, structured plans with realistic category percentage allocations.
`;

export async function generateEventPlan(wizardData: WizardData): Promise<GeneratedPlan> {
  const apiKey = process.env.GEMINI_API_KEY;
  const isDemo = process.env.DEMO_MODE === 'true' || !apiKey;

  if (isDemo) {
    // Generate an intelligent plan by scaling the demo template to the user's specific inputs
    const basePlan = JSON.parse(JSON.stringify(getDemoPlanForType(wizardData.type))) as GeneratedPlan;

    // Adjust title and summary
    basePlan.summary.title = wizardData.title;
    basePlan.summary.contingencyAmount = Math.round(wizardData.totalBudget * 0.08);

    // Scale budget categories proportionally to the user's requested totalBudget
    basePlan.budget = basePlan.budget.map((cat) => {
      const planned = Math.round((cat.percentage / 100) * wizardData.totalBudget);
      return {
        ...cat,
        plannedAmount: planned,
        actualAmount: Math.round(planned * 0.95),
        paidAmount: Math.round(planned * 0.4),
        subCategories: cat.subCategories?.map((sub) => ({
          ...sub,
          amount: Math.round((sub.amount / 2500000) * wizardData.totalBudget)
        }))
      };
    });

    return basePlan;
  }

  try {
    const prompt = `
Generate a complete, structured celebration plan for the following event:
Event Type: ${wizardData.type} (${wizardData.subType || ''})
Event Title: ${wizardData.title}
Target Date: ${wizardData.eventDate || 'Flexible'}
City: ${wizardData.city}
Guest Count: ${wizardData.guestCount}
Total Budget: ${wizardData.currency} ${wizardData.totalBudget}
Vibe Tags: ${wizardData.vibeTags.join(', ')}
Dietary Preferences: ${wizardData.dietaryPreferences.join(', ')}
Cultural Preferences: ${wizardData.culturalPreferences.join(', ')}
Must Haves: ${wizardData.mustHaves.join(', ')}
No-Gos: ${wizardData.noGos.join(', ')}

Return a strict JSON object matching this schema:
{
  "summary": {
    "title": string,
    "description": string,
    "theme": string,
    "colorPalette": string[],
    "contingencyPercent": number,
    "contingencyAmount": number
  },
  "budget": [
    {
      "id": string,
      "name": string,
      "percentage": number,
      "plannedAmount": number,
      "actualAmount": number,
      "paidAmount": number,
      "notes": string,
      "subCategories": [{ "name": string, "amount": number }]
    }
  ],
  "timeline": [
    {
      "id": string,
      "title": string,
      "description": string,
      "phase": "12m" | "6m" | "3m" | "1m" | "4w" | "2w" | "1w" | "dayBefore" | "dayOf",
      "dueDate": string,
      "status": "pending" | "in_progress" | "done" | "skipped",
      "priority": "critical" | "high" | "medium" | "low",
      "category": string,
      "minuteSchedule": string
    }
  ],
  "vendors": [
    {
      "id": string,
      "category": string,
      "name": string,
      "status": "researching" | "contacted" | "quoted" | "booked" | "paid",
      "quoteAmount": number,
      "notes": string,
      "questionsToAsk": string[],
      "redFlags": string[]
    }
  ],
  "ideas": [
    {
      "id": string,
      "kind": "theme" | "decor" | "menu" | "entertainment" | "gift" | "hack",
      "title": string,
      "description": string,
      "tags": string[],
      "saved": boolean
    }
  ],
  "risks": [
    {
      "id": string,
      "risk": string,
      "impact": "low" | "medium" | "high",
      "likelihood": "low" | "medium" | "high",
      "mitigation": string
    }
  ]
}
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PLANNER_PROMPT }] },
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.3
          }
        })
      }
    );

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) {
      throw new Error('Empty response from AI model');
    }

    const parsedPlan = JSON.parse(rawJson) as GeneratedPlan;
    return parsedPlan;
  } catch (error) {
    console.warn('Falling back to structured demo plan due to API error:', error);
    return getDemoPlanForType(wizardData.type);
  }
}
