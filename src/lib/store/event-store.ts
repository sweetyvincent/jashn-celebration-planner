import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  GeneratedPlan,
  BudgetCategoryItem,
  TimelineTaskItem,
  VendorItem,
  GuestItem,
  IdeaItem,
  ChatMessageItem,
  EventType,
  WizardData
} from '@/types/event';
import { getDemoPlanForType } from '@/lib/ai/demo-data';

interface UndoSnapshot {
  description: string;
  budget?: BudgetCategoryItem[];
  timeline?: TimelineTaskItem[];
  vendors?: VendorItem[];
  guests?: GuestItem[];
}

interface EventState {
  eventId: string;
  eventTitle: string;
  eventType: EventType;
  eventDate?: string;
  city: string;
  guestCount: number;
  totalBudget: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY';
  vibeTags: string[];
  plan: GeneratedPlan | null;
  guests: GuestItem[];
  chatMessages: ChatMessageItem[];
  undoStack: UndoSnapshot[];

  // Actions
  initializeEvent: (wizardData: WizardData, plan: GeneratedPlan) => void;
  loadDemoEvent: (type: EventType) => void;
  setPlan: (plan: GeneratedPlan) => void;

  // Budget
  updateBudgetCategory: (id: string, updates: Partial<BudgetCategoryItem>) => void;
  rebalanceBudget: (newTotal: number) => void;

  // Timeline
  addTask: (task: Omit<TimelineTaskItem, 'id'>) => void;
  updateTask: (id: string, updates: Partial<TimelineTaskItem>) => void;
  deleteTask: (id: string) => void;

  // Vendors
  addVendor: (vendor: Omit<VendorItem, 'id'>) => void;
  updateVendor: (id: string, updates: Partial<VendorItem>) => void;
  deleteVendor: (id: string) => void;

  // Guests
  addGuest: (guest: Omit<GuestItem, 'id'>) => void;
  updateGuest: (id: string, updates: Partial<GuestItem>) => void;
  deleteGuest: (id: string) => void;
  bulkAddGuests: (newGuests: Omit<GuestItem, 'id'>[]) => void;

  // Ideas
  toggleSaveIdea: (id: string) => void;

  // Chat & AI Tool Execution
  addChatMessage: (msg: Omit<ChatMessageItem, 'id' | 'timestamp'>) => void;
  executeToolCall: (toolName: string, params: any) => { success: boolean; message: string };
  undoLastChange: () => boolean;
}

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      eventId: 'demo-event-1',
      eventTitle: "Arjun & Priya's Royal Palace Wedding",
      eventType: 'wedding',
      eventDate: '2027-07-03',
      city: 'Jaipur',
      guestCount: 200,
      totalBudget: 2500000,
      currency: 'INR',
      vibeTags: ['Traditional', 'Royal', 'Grand'],
      plan: getDemoPlanForType('wedding'),
      guests: [
        {
          id: 'g-1',
          name: 'Rajesh Sharma',
          email: 'rajesh@example.com',
          phone: '+91 98765 43210',
          group: 'Family',
          dietary: ['Vegetarian', 'No Onion/Garlic'],
          plusOnes: 1,
          rsvpStatus: 'accepted',
          tableId: 'Table 1'
        },
        {
          id: 'g-2',
          name: 'Sunita Verma',
          email: 'sunita@example.com',
          phone: '+91 98111 22334',
          group: 'Family',
          dietary: ['Vegetarian'],
          plusOnes: 2,
          rsvpStatus: 'accepted',
          tableId: 'Table 1'
        },
        {
          id: 'g-3',
          name: 'Aditya Mehta',
          email: 'aditya.m@example.com',
          phone: '+91 99887 76655',
          group: 'Friends',
          dietary: ['Jain'],
          plusOnes: 0,
          rsvpStatus: 'pending'
        },
        {
          id: 'g-4',
          name: 'Vikram & Natasha Malhotra',
          email: 'malhotras@example.com',
          phone: '+91 97654 32109',
          group: 'VIP',
          dietary: ['Vegan'],
          plusOnes: 1,
          rsvpStatus: 'accepted',
          tableId: 'Table 2'
        }
      ],
      chatMessages: [
        {
          id: 'm-1',
          role: 'assistant',
          content: "Namaste! I'm your Jashn AI celebration copilot. I've prepared your complete wedding blueprint. You can ask me to adjust budgets, rebalance categories, generate personalized invitation wording, or add custom activities!",
          timestamp: new Date().toISOString()
        }
      ],
      undoStack: [],

      initializeEvent: (wizardData, plan) => {
        set({
          eventId: 'event-' + Date.now(),
          eventTitle: wizardData.title,
          eventType: wizardData.type,
          eventDate: wizardData.eventDate,
          city: wizardData.city,
          guestCount: wizardData.guestCount,
          totalBudget: wizardData.totalBudget,
          currency: wizardData.currency,
          vibeTags: wizardData.vibeTags,
          plan: plan,
          guests: [],
          undoStack: [],
          chatMessages: [
            {
              id: 'msg-' + Date.now(),
              role: 'assistant',
              content: `Mubarak! Your plan for **${wizardData.title}** has been generated. Total budget: ${wizardData.currency} ${wizardData.totalBudget.toLocaleString()} for ${wizardData.guestCount} guests in ${wizardData.city}. How would you like to refine it?`,
              timestamp: new Date().toISOString()
            }
          ]
        });
      },

      loadDemoEvent: (type) => {
        const demoPlan = getDemoPlanForType(type);
        let title = "Arjun & Priya's Royal Palace Wedding";
        let city = "Jaipur";
        let budget = 2500000;
        let count = 200;
        let vibes = ["Traditional", "Royal"];

        if (type === 'birthday') {
          title = "Aarav's 5th Superhero Jungle Adventure";
          city = "Mumbai";
          budget = 50000;
          count = 30;
          vibes = ["Fun", "Modern"];
        } else if (type === 'community') {
          title = "Green Valley Grand Diwali & Cultural Mela";
          city = "Delhi";
          budget = 300000;
          count = 500;
          vibes = ["Traditional", "Eco-friendly"];
        }

        set({
          eventId: `demo-${type}`,
          eventTitle: title,
          eventType: type,
          eventDate: '2027-01-15',
          city,
          guestCount: count,
          totalBudget: budget,
          currency: 'INR',
          vibeTags: vibes,
          plan: demoPlan,
          undoStack: [],
          chatMessages: [
            {
              id: 'demo-msg-' + Date.now(),
              role: 'assistant',
              content: `Loaded the **${title}** showcase! You can experiment with all features—try asking me to "Cut budget by 10%" or click any tab to manage expenses, vendors, and guests.`,
              timestamp: new Date().toISOString()
            }
          ]
        });
      },

      setPlan: (plan) => set({ plan }),

      updateBudgetCategory: (id, updates) => {
        const state = get();
        if (!state.plan) return;

        // Save undo snapshot
        const snapshot: UndoSnapshot = {
          description: `Updated budget category`,
          budget: JSON.parse(JSON.stringify(state.plan.budget))
        };

        const updatedBudget = state.plan.budget.map((cat) => {
          if (cat.id === id) {
            return { ...cat, ...updates };
          }
          return cat;
        });

        set({
          plan: { ...state.plan, budget: updatedBudget },
          undoStack: [snapshot, ...state.undoStack].slice(0, 10)
        });
      },

      rebalanceBudget: (newTotal) => {
        const state = get();
        if (!state.plan) return;

        const snapshot: UndoSnapshot = {
          description: `Rebalanced budget to ₹${newTotal.toLocaleString()}`,
          budget: JSON.parse(JSON.stringify(state.plan.budget))
        };

        const rebalanced = state.plan.budget.map((cat) => ({
          ...cat,
          plannedAmount: Math.round((cat.percentage / 100) * newTotal)
        }));

        set({
          totalBudget: newTotal,
          plan: { ...state.plan, budget: rebalanced },
          undoStack: [snapshot, ...state.undoStack].slice(0, 10)
        });
      },

      addTask: (taskData) => {
        const state = get();
        if (!state.plan) return;

        const newTask: TimelineTaskItem = {
          ...taskData,
          id: 't-' + Date.now()
        };

        const snapshot: UndoSnapshot = {
          description: `Added task "${newTask.title}"`,
          timeline: JSON.parse(JSON.stringify(state.plan.timeline))
        };

        set({
          plan: {
            ...state.plan,
            timeline: [newTask, ...state.plan.timeline]
          },
          undoStack: [snapshot, ...state.undoStack].slice(0, 10)
        });
      },

      updateTask: (id, updates) => {
        const state = get();
        if (!state.plan) return;

        const updatedTimeline = state.plan.timeline.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        );

        set({
          plan: { ...state.plan, timeline: updatedTimeline }
        });
      },

      deleteTask: (id) => {
        const state = get();
        if (!state.plan) return;

        const snapshot: UndoSnapshot = {
          description: `Deleted task`,
          timeline: JSON.parse(JSON.stringify(state.plan.timeline))
        };

        set({
          plan: {
            ...state.plan,
            timeline: state.plan.timeline.filter((t) => t.id !== id)
          },
          undoStack: [snapshot, ...state.undoStack].slice(0, 10)
        });
      },

      addVendor: (vendorData) => {
        const state = get();
        if (!state.plan) return;

        const newVendor: VendorItem = {
          ...vendorData,
          id: 'v-' + Date.now()
        };

        const snapshot: UndoSnapshot = {
          description: `Added vendor "${newVendor.name}"`,
          vendors: JSON.parse(JSON.stringify(state.plan.vendors))
        };

        set({
          plan: {
            ...state.plan,
            vendors: [newVendor, ...state.plan.vendors]
          },
          undoStack: [snapshot, ...state.undoStack].slice(0, 10)
        });
      },

      updateVendor: (id, updates) => {
        const state = get();
        if (!state.plan) return;

        const updatedVendors = state.plan.vendors.map((v) =>
          v.id === id ? { ...v, ...updates } : v
        );

        set({
          plan: { ...state.plan, vendors: updatedVendors }
        });
      },

      deleteVendor: (id) => {
        const state = get();
        if (!state.plan) return;

        set({
          plan: {
            ...state.plan,
            vendors: state.plan.vendors.filter((v) => v.id !== id)
          }
        });
      },

      addGuest: (guestData) => {
        const newGuest: GuestItem = {
          ...guestData,
          id: 'g-' + Date.now()
        };

        set((state) => ({
          guests: [newGuest, ...state.guests]
        }));
      },

      updateGuest: (id, updates) => {
        set((state) => ({
          guests: state.guests.map((g) => (g.id === id ? { ...g, ...updates } : g))
        }));
      },

      deleteGuest: (id) => {
        set((state) => ({
          guests: state.guests.filter((g) => g.id !== id)
        }));
      },

      bulkAddGuests: (newGuests) => {
        const items: GuestItem[] = newGuests.map((g, idx) => ({
          ...g,
          id: `g-import-${Date.now()}-${idx}`
        }));
        set((state) => ({
          guests: [...items, ...state.guests]
        }));
      },

      toggleSaveIdea: (id) => {
        const state = get();
        if (!state.plan) return;

        const updatedIdeas = state.plan.ideas.map((idea) =>
          idea.id === id ? { ...idea, saved: !idea.saved } : idea
        );

        set({
          plan: { ...state.plan, ideas: updatedIdeas }
        });
      },

      addChatMessage: (msg) => {
        const newMsg: ChatMessageItem = {
          ...msg,
          id: 'm-' + Date.now(),
          timestamp: new Date().toISOString()
        };
        set((state) => ({
          chatMessages: [...state.chatMessages, newMsg]
        }));
      },

      executeToolCall: (toolName, params) => {
        const state = get();
        if (!state.plan) return { success: false, message: 'No active plan' };

        if (toolName === 'updateBudget' || toolName === 'rebalanceBudget') {
          const cutPercent = params.cutPercent || (params.targetTotal ? 0 : 10);
          const newTotal = params.targetTotal || Math.round(state.totalBudget * (1 - cutPercent / 100));
          state.rebalanceBudget(newTotal);
          return {
            success: true,
            message: `Adjusted total budget to ${state.currency} ${newTotal.toLocaleString()} and proportionally rebalanced all categories.`
          };
        }

        if (toolName === 'addTimelineTask') {
          state.addTask({
            title: params.title || 'New Event Milestone',
            description: params.description || 'Added by AI Copilot',
            phase: params.phase || '1m',
            dueDate: params.dueDate,
            status: 'pending',
            priority: params.priority || 'medium',
            category: params.category || 'General'
          });
          return {
            success: true,
            message: `Added task "${params.title}" to timeline.`
          };
        }

        if (toolName === 'addVendor') {
          state.addVendor({
            category: params.category || 'General',
            name: params.name || 'Proposed Vendor',
            status: 'researching',
            quoteAmount: params.quoteAmount,
            notes: params.notes || 'Suggested by Jashn AI'
          });
          return {
            success: true,
            message: `Added vendor "${params.name}" in category ${params.category}.`
          };
        }

        if (toolName === 'addGuests') {
          const guestNames: string[] = params.names || ['Guest 1'];
          state.bulkAddGuests(
            guestNames.map((n) => ({
              name: n,
              plusOnes: 0,
              rsvpStatus: 'pending',
              group: params.group || 'Invited'
            }))
          );
          return {
            success: true,
            message: `Added ${guestNames.length} guests to guest list.`
          };
        }

        return {
          success: true,
          message: `Executed action ${toolName}.`
        };
      },

      undoLastChange: () => {
        const state = get();
        if (state.undoStack.length === 0 || !state.plan) return false;

        const [lastSnapshot, ...remainingStack] = state.undoStack;
        set({
          plan: {
            ...state.plan,
            budget: lastSnapshot.budget || state.plan.budget,
            timeline: lastSnapshot.timeline || state.plan.timeline,
            vendors: lastSnapshot.vendors || state.plan.vendors
          },
          guests: lastSnapshot.guests || state.guests,
          undoStack: remainingStack
        });
        return true;
      }
    }),
    {
      name: 'jashn-event-storage',
      partialize: (state) => ({
        eventId: state.eventId,
        eventTitle: state.eventTitle,
        eventType: state.eventType,
        eventDate: state.eventDate,
        city: state.city,
        guestCount: state.guestCount,
        totalBudget: state.totalBudget,
        currency: state.currency,
        vibeTags: state.vibeTags,
        plan: state.plan,
        guests: state.guests,
        chatMessages: state.chatMessages
      })
    }
  )
);
