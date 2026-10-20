import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WizardData, EventType } from '@/types/event';

interface WizardState {
  step: number;
  data: WizardData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (updates: Partial<WizardData>) => void;
  resetWizard: (type?: EventType) => void;
}

const defaultWizardData: WizardData = {
  type: 'wedding',
  subType: 'Multi-Day Palace Wedding',
  title: 'My Dream Wedding',
  eventDate: '2027-02-14',
  dateRangeFlex: false,
  city: 'Udaipur',
  guestCount: 150,
  totalBudget: 1500000,
  currency: 'INR',
  vibeTags: ['Traditional', 'Royal'],
  dietaryPreferences: ['Vegetarian'],
  culturalPreferences: ['Indian / Vedic Rituals', 'Sangeet Party'],
  mustHaves: ['Mandap with fresh marigold floral arches', 'Live Punjabi Dhol troupe'],
  noGos: ['No single-use plastics', 'Strict DJ cutoff adhered to']
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      step: 1,
      data: defaultWizardData,
      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 7) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
      updateData: (updates) =>
        set((state) => ({
          data: { ...state.data, ...updates }
        })),
      resetWizard: (type = 'wedding') =>
        set({
          step: 1,
          data: {
            ...defaultWizardData,
            type,
            title:
              type === 'wedding'
                ? 'My Dream Wedding'
                : type === 'birthday'
                ? "Celebration Birthday Bash"
                : 'Grand Community Festival',
            totalBudget: type === 'wedding' ? 1500000 : type === 'birthday' ? 50000 : 300000,
            guestCount: type === 'wedding' ? 150 : type === 'birthday' ? 35 : 400
          }
        })
    }),
    {
      name: 'jashn-wizard-draft'
    }
  )
);
