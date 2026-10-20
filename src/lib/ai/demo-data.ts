import { GeneratedPlan, WizardData } from '@/types/event';

export const DEMO_WEDDING_PLAN: GeneratedPlan = {
  summary: {
    title: "Arjun & Priya's Royal Palace Wedding",
    description: "A majestic 3-day royal Rajasthani wedding celebration balancing heritage traditions with modern luxury. Features Haldi, Mehendi, Sangeet, Vedic Vivah ceremony, and Grand Reception.",
    theme: "Royal Marigold & Rose Radiance",
    colorPalette: ["#2B1442", "#F4B33D", "#E85D8A", "#FF8A3D", "#FFF8EE"],
    contingencyPercent: 8,
    contingencyAmount: 200000,
  },
  budget: [
    {
      id: "b-1",
      name: "Venue & Heritage Accommodation",
      percentage: 32,
      plannedAmount: 800000,
      actualAmount: 780000,
      paidAmount: 400000,
      notes: "Heritage Haveli in Jaipur for 3 days, 25 guest rooms included.",
      subCategories: [
        { name: "Haveli Lawn & Courtyard Rental", amount: 450000 },
        { name: "Family & Guest Stay (2 Nights)", amount: 300000 },
        { name: "Electricity, Generator & Power Backup", amount: 50000 }
      ]
    },
    {
      id: "b-2",
      name: "Catering & Royal Banquet",
      percentage: 26,
      plannedAmount: 650000,
      actualAmount: 640000,
      paidAmount: 250000,
      notes: "5 meal sessions: Rajasthani, Mughlai, Chaat street food counters, Jain menu included.",
      subCategories: [
        { name: "Wedding Dinner (Vedic Vivah)", amount: 300000 },
        { name: "Sangeet Cocktail & Live Counters", amount: 180000 },
        { name: "Mehendi Brunch & High Tea", amount: 110000 },
        { name: "Haldi Breakfast & Refreshments", amount: 60000 }
      ]
    },
    {
      id: "b-3",
      name: "Floral & Royal Decor",
      percentage: 16,
      plannedAmount: 400000,
      actualAmount: 420000,
      paidAmount: 200000,
      notes: "Fresh marigold mandap, brass urlis, mirror-work photo booths, candlelit pathways.",
      subCategories: [
        { name: "Pheras Mandap & Floral Chhatri", amount: 160000 },
        { name: "Sangeet Stage & Intelligent Lighting", amount: 130000 },
        { name: "Entrance Floral Arch & Pathway", amount: 70000 },
        { name: "Seating Drapes & Dining Centerpieces", amount: 60000 }
      ]
    },
    {
      id: "b-4",
      name: "Photography & Cinematic Film",
      percentage: 10,
      plannedAmount: 250000,
      actualAmount: 250000,
      paidAmount: 100000,
      notes: "3-day coverage, drone shots, traditional + candid photographers, teaser video.",
      subCategories: [
        { name: "Cinematic Wedding Teaser & Film", amount: 130000 },
        { name: "Candid & Traditional Photography", amount: 90000 },
        { name: "Drone Aerial Coverage", amount: 30000 }
      ]
    },
    {
      id: "b-5",
      name: "Music, DJ & Folk Artists",
      percentage: 6,
      plannedAmount: 150000,
      actualAmount: 140000,
      paidAmount: 70000,
      notes: "Rajasthani folk dancers for Haldi, live Dhol troupe for Baraat, Bollywood DJ for Sangeet.",
      subCategories: [
        { name: "Sangeet Bollywood DJ & Sound Rig", amount: 80000 },
        { name: "Baraat Live Punjabi Dhol Troupe", amount: 40000 },
        { name: "Manganiyar Folk Singers & Dancers", amount: 30000 }
      ]
    },
    {
      id: "b-6",
      name: "Bridal & Groom Styling",
      percentage: 5,
      plannedAmount: 125000,
      actualAmount: 130000,
      paidAmount: 60000,
      notes: "Bridal mehendi artist, HD airbrush makeup for 3 functions, groom safa tying.",
      subCategories: [
        { name: "Bridal HD Makeup & Hair (3 Events)", amount: 75000 },
        { name: "Organic Rajasthani Bridal Mehendi", amount: 30000 },
        { name: "Family Turban / Safa Artist", amount: 25000 }
      ]
    },
    {
      id: "b-7",
      name: "Gifts, Favors & Stationery",
      percentage: 3,
      plannedAmount: 75000,
      actualAmount: 70000,
      paidAmount: 50000,
      notes: "Custom brass box dry fruit hampers, digital video invites, welcome baskets.",
      subCategories: [
        { name: "Return Gifts (Handcrafted Brass Jars)", amount: 50000 },
        { name: "Room Welcome Goodie Baskets", amount: 25000 }
      ]
    },
    {
      id: "b-8",
      name: "Emergency Contingency Reserve",
      percentage: 2,
      plannedAmount: 50000,
      actualAmount: 10000,
      paidAmount: 10000,
      notes: "Reserved for last minute guest transport, extra plates, tipping.",
      subCategories: []
    }
  ],
  timeline: [
    {
      id: "t-1",
      title: "Lock Jaipur Heritage Venue & Block Rooms",
      description: "Sign booking contract for Haveli and reserve 25 guest suites.",
      phase: "12m",
      dueDate: "2026-11-15",
      status: "done",
      priority: "critical",
      category: "Venue"
    },
    {
      id: "t-2",
      title: "Finalize Food Tasting & Menus",
      description: "Sample chaat counters, dal baati churma, and sangeet hors d'oeuvres.",
      phase: "6m",
      dueDate: "2027-01-20",
      status: "done",
      priority: "high",
      category: "Catering"
    },
    {
      id: "t-3",
      title: "Book Photography & Cinematography Crew",
      description: "Confirm drone permits and shot list for Jaipur location.",
      phase: "6m",
      dueDate: "2027-02-10",
      status: "done",
      priority: "high",
      category: "Media"
    },
    {
      id: "t-4",
      title: "Approve 3D Stage Design & Floral Layouts",
      description: "Mandap elevation render, mirror walkway, and entrance arches.",
      phase: "3m",
      dueDate: "2027-04-05",
      status: "in_progress",
      priority: "high",
      category: "Decor"
    },
    {
      id: "t-5",
      title: "Send Digital Save-The-Dates & RSVP Links",
      description: "Send WhatsApp & web RSVP invite with accommodation travel details.",
      phase: "3m",
      dueDate: "2027-04-15",
      status: "in_progress",
      priority: "critical",
      category: "Invites"
    },
    {
      id: "t-6",
      title: "Confirm Sangeet Choreographer & Song Rehearsals",
      description: "Prepare bride & groom medley and family group flashmob.",
      phase: "1m",
      dueDate: "2027-06-01",
      status: "pending",
      priority: "medium",
      category: "Entertainment"
    },
    {
      id: "t-7",
      title: "Order Custom Brass Dry-Fruit Hampers",
      description: "Personalized engraved return gift boxes for 120 families.",
      phase: "4w",
      dueDate: "2027-06-10",
      status: "pending",
      priority: "medium",
      category: "Favors"
    },
    {
      id: "t-8",
      title: "Finalize Seating Chart & Table Placecards",
      description: "Group VIP guests and ensure elder relatives have close mandap view.",
      phase: "2w",
      dueDate: "2027-06-20",
      status: "pending",
      priority: "high",
      category: "Guests"
    },
    {
      id: "t-9",
      title: "Day Before: Haldi Setup & Welcome Dinner",
      description: "Yellow floral setup, dhol entry, guest room welcome hampers distribution.",
      phase: "dayBefore",
      dueDate: "2027-07-02",
      status: "pending",
      priority: "critical",
      category: "Run-of-show",
      minuteSchedule: "04:00 PM"
    },
    {
      id: "t-10",
      title: "Wedding Day: Royal Baraat Procession",
      description: "Groom vintage car / horse entry with 4 live dhols and brass band.",
      phase: "dayOf",
      dueDate: "2027-07-03",
      status: "pending",
      priority: "critical",
      category: "Run-of-show",
      minuteSchedule: "05:30 PM"
    },
    {
      id: "t-11",
      title: "Wedding Day: Varmala on Rotating Stage",
      description: "Cold pyros, rose petal shower, auspicious shehnai music.",
      phase: "dayOf",
      dueDate: "2027-07-03",
      status: "pending",
      priority: "critical",
      category: "Run-of-show",
      minuteSchedule: "07:15 PM"
    },
    {
      id: "t-12",
      title: "Wedding Day: Vedic Pheras & Dinner",
      description: "Vedic chants, sacred fire ritual, grand royal dinner buffet opens.",
      phase: "dayOf",
      dueDate: "2027-07-03",
      status: "pending",
      priority: "critical",
      category: "Run-of-show",
      minuteSchedule: "08:30 PM"
    }
  ],
  vendors: [
    {
      id: "v-1",
      category: "Venue",
      name: "Heritage Haveli Palace Resort (Jaipur)",
      status: "booked",
      quoteAmount: 800000,
      contact: {
        person: "Vikram Rathore",
        phone: "+91 98290 12345",
        email: "events@heritagehavelijaipur.com"
      },
      notes: "Lawn capacity 400. Includes 25 air-conditioned rooms.",
      deadline: "2026-11-20",
      questionsToAsk: [
        "What is the curfew time for outdoor music/DJs?",
        "Are outside caterers or decorators allowed with corkage?",
        "Is there full generator power backup in case of monsoon power cut?"
      ],
      redFlags: [
        "Hidden power surcharge on live cooking equipment",
        "Strict DJ cutoff at 10:00 PM without indoor backup hall"
      ]
    },
    {
      id: "v-2",
      category: "Catering",
      name: "Shahi Rasoi Gourmet Caterers",
      status: "booked",
      quoteAmount: 650000,
      contact: {
        person: "Chef Manoj Joshi",
        phone: "+91 98292 67890",
        email: "contact@shahirasoi.in"
      },
      notes: "Pure vegetarian with separate Jain preparation station.",
      deadline: "2027-01-30",
      questionsToAsk: [
        "What is your server to guest ratio for live stations?",
        "Do you supply copper chafing dishes and brass water goblets?",
        "How is food waste handled and packed for charity?"
      ]
    },
    {
      id: "v-3",
      category: "Decor & Production",
      name: "Raga Festive Floral & Stage Designers",
      status: "quoted",
      quoteAmount: 420000,
      contact: {
        person: "Ananya Sen",
        phone: "+91 98110 54321",
        email: "ananya@ragadesign.com"
      },
      notes: "Proposal includes marigold canopy, brass lanterns, fairy lights.",
      deadline: "2027-04-15",
      questionsToAsk: [
        "Are flowers sourced fresh on morning of event?",
        "Who is responsible for fire-safety certification of lighting?"
      ]
    },
    {
      id: "v-4",
      category: "Photography",
      name: "Drishti Visuals & Wedding Cinema",
      status: "booked",
      quoteAmount: 250000,
      contact: {
        person: "Rohan Kapoor",
        phone: "+91 99201 98765",
        email: "rohan@drishtivisuals.com"
      },
      notes: "Includes 2 candid + 2 traditional photographers + drone pilot.",
      deadline: "2027-02-15"
    }
  ],
  ideas: [
    {
      id: "i-1",
      kind: "theme",
      title: "Royal Rajwada Sunset Mandap",
      description: "Open-air lakeside or courtyard mandap draped in saffron silk, marigold garlands, brass lamps, and flower-filled water urlis.",
      tags: ["Royal", "Traditional", "Grand", "Jaipur"],
      colorPalette: ["#F4B33D", "#E85D8A", "#2B1442"],
      saved: true
    },
    {
      id: "i-2",
      kind: "menu",
      title: "Interactive Rajasthani Chaat & Ghewar Bar",
      description: "Live mini raj-kachori shooters, smoked dahi vada spheres, and customizable malai ghewar bar with saffron rabdi topping.",
      tags: ["Catering", "Live Counters", "Vegetarian"],
      saved: true
    },
    {
      id: "i-3",
      kind: "entertainment",
      title: "Surprise Sangeet Dhol Mob & Cold Pyro Entry",
      description: "Surprise guest flashmob choreographed to trending retro Bollywood hits followed by a synchronized cold pyro display for the couple entry.",
      tags: ["Music", "Sangeet", "High Energy"],
      saved: true
    },
    {
      id: "i-4",
      kind: "hack",
      title: "Dual Purpose Floral Decor Savings",
      description: "Repurpose the Sangeet stage floral arrangements and brass lanterns into the next morning's wedding mandap entrance, saving up to ₹40,000.",
      tags: ["Budget Hack", "Eco-friendly", "Cost Saver"],
      saved: true
    }
  ],
  risks: [
    {
      id: "r-1",
      risk: "Sudden afternoon rainfall during outdoor courtyard pheras",
      impact: "high",
      likelihood: "medium",
      mitigation: "Keep the Haveli's covered glass banquet hall reserved as immediate 20-minute backup plan."
    },
    {
      id: "r-2",
      risk: "Rajasthan state 10:00 PM outdoor loudspeaker noise curfew",
      impact: "medium",
      likelihood: "high",
      mitigation: "Transition high-volume DJ music to indoor air-conditioned ballroom after 10:00 PM."
    },
    {
      id: "r-3",
      risk: "Out-of-town guests facing transport bottlenecks from airport",
      impact: "medium",
      likelihood: "medium",
      mitigation: "Pre-book 3 dedicated shuttles on fixed hourly intervals with live WhatsApp tracking."
    }
  ]
};

export const DEMO_BIRTHDAY_PLAN: GeneratedPlan = {
  summary: {
    title: "Aarav's 5th Superhero Jungle Adventure",
    description: "An action-packed 5th birthday celebration combining superhero themes with tropical jungle decor, interactive science quests, and custom treats.",
    theme: "Jungle Superhero Quest",
    colorPalette: ["#FF8A3D", "#1F9D7A", "#F4B33D", "#3B2A7A", "#FFF8EE"],
    contingencyPercent: 10,
    contingencyAmount: 5000,
  },
  budget: [
    {
      id: "bb-1",
      name: "Kids Play Zone & Venue",
      percentage: 35,
      plannedAmount: 17500,
      actualAmount: 16000,
      paidAmount: 8000,
      notes: "Indoor play arena in Bandra with trampoline and soft play section for 30 kids.",
    },
    {
      id: "bb-2",
      name: "Kids & Parents Gourmet Snack Bar",
      percentage: 30,
      plannedAmount: 15000,
      actualAmount: 14500,
      paidAmount: 5000,
      notes: "Mini burger sliders, pasta cups, fruit skewers, coffee bar for parents.",
    },
    {
      id: "bb-3",
      name: "Superhero Cake & Dessert Table",
      percentage: 14,
      plannedAmount: 7000,
      actualAmount: 7200,
      paidAmount: 7200,
      notes: "2-tier themed cake with sugar action figures, jungle cake pops.",
    },
    {
      id: "bb-4",
      name: "Entertainment & Games Host",
      percentage: 12,
      plannedAmount: 6000,
      actualAmount: 6000,
      paidAmount: 3000,
      notes: "Professional emcee, superhero mascot appearance, balloon sculpting artist.",
    },
    {
      id: "bb-5",
      name: "Return Favors & Activity Packs",
      percentage: 9,
      plannedAmount: 4500,
      actualAmount: 4500,
      paidAmount: 4500,
      notes: "Custom superhero capes, seed germination kits, activity coloring books.",
    }
  ],
  timeline: [
    {
      id: "bt-1",
      title: "Book Kids Indoor Play Venue",
      phase: "1m",
      dueDate: "2026-11-01",
      status: "done",
      priority: "critical",
      category: "Venue"
    },
    {
      id: "bt-2",
      title: "Order 2-Tier Jungle Superhero Cake",
      phase: "2w",
      dueDate: "2026-11-15",
      status: "done",
      priority: "high",
      category: "Cake"
    },
    {
      id: "bt-3",
      title: "Send Animated Video Invites via WhatsApp",
      phase: "2w",
      dueDate: "2026-11-18",
      status: "done",
      priority: "high",
      category: "Invites"
    },
    {
      id: "bt-4",
      title: "Pack Personalized Superhero Favor Bags",
      phase: "1w",
      dueDate: "2026-11-25",
      status: "pending",
      priority: "medium",
      category: "Favors"
    },
    {
      id: "bt-5",
      title: "Day of Event: Kids Welcome & Face Painting",
      phase: "dayOf",
      dueDate: "2026-11-30",
      status: "pending",
      priority: "critical",
      category: "Schedule",
      minuteSchedule: "04:30 PM"
    },
    {
      id: "bt-6",
      title: "Superhero Mascot Entry & Quest Games",
      phase: "dayOf",
      dueDate: "2026-11-30",
      status: "pending",
      priority: "critical",
      category: "Schedule",
      minuteSchedule: "05:15 PM"
    },
    {
      id: "bt-7",
      title: "Cake Cutting with Confetti Blast & Sparklers",
      phase: "dayOf",
      dueDate: "2026-11-30",
      status: "pending",
      priority: "critical",
      category: "Schedule",
      minuteSchedule: "06:15 PM"
    }
  ],
  vendors: [
    {
      id: "bv-1",
      category: "Venue",
      name: "Happy Tots Adventure Play Hub (Mumbai)",
      status: "booked",
      quoteAmount: 16000,
      notes: "Exclusive access 4 PM - 7:30 PM. Socks mandatory."
    },
    {
      id: "bv-2",
      category: "Bakery",
      name: "Whisk & Wonder Artisan Cakes",
      status: "booked",
      quoteAmount: 7200,
      notes: "Eggless Belgian chocolate with vanilla ganache."
    }
  ],
  ideas: [
    {
      id: "bi-1",
      kind: "theme",
      title: "Superhero Training Academy",
      description: "Each child receives a superhero badge and mask at entry, completing 4 mini 'power trials' (laser yarn maze, boulder push) to win a certificate.",
      tags: ["Kids Activity", "Interactive", "Fun"],
      saved: true
    },
    {
      id: "bi-2",
      kind: "gift",
      title: "Eco Superhero Plant-Your-Own-Tree Kit",
      description: "Instead of plastic toys, kids get a biodegradable pot, soil pellet, and fast-sprouting sunflower seeds with 'Superhero of the Earth' branding.",
      tags: ["Eco-friendly", "Educational", "Return Gift"],
      saved: true
    }
  ],
  risks: [
    {
      id: "br-1",
      risk: "Kids dietary allergies (peanuts, gluten, dairy)",
      impact: "high",
      likelihood: "medium",
      mitigation: "Include an allergy question on the RSVP page and clearly label gluten/nut-free options."
    }
  ]
};

export const DEMO_COMMUNITY_PLAN: GeneratedPlan = {
  summary: {
    title: "Green Valley Grand Diwali & Cultural Mela",
    description: "A community festival bringing together 500 society residents and local artisans with cultural stage shows, 30 craft & food stalls, diya lighting, and eco-friendly laser show.",
    theme: "Luminescent Community Harmony",
    colorPalette: ["#1F9D7A", "#F4B33D", "#FF8A3D", "#2B1442", "#FFF8EE"],
    contingencyPercent: 7,
    contingencyAmount: 21000,
  },
  budget: [
    {
      id: "cb-1",
      name: "Stage, Sound & Laser Lighting",
      percentage: 36,
      plannedAmount: 110000,
      actualAmount: 105000,
      paidAmount: 50000,
      notes: "40ft stage, LED wall backdrop, digital sound system, green laser light show.",
    },
    {
      id: "cb-2",
      name: "Stall Canopies & Public Infrastructure",
      percentage: 27,
      plannedAmount: 80000,
      actualAmount: 82000,
      paidAmount: 40000,
      notes: "30 waterproof canopies, 250 chairs, chemical mobile restrooms, trash stations.",
    },
    {
      id: "cb-3",
      name: "Public Permits, Security & First Aid",
      percentage: 15,
      plannedAmount: 45000,
      actualAmount: 40000,
      paidAmount: 40000,
      notes: "Police NOC, fire tender clearance, 6 private guards, on-duty paramedic stall.",
    },
    {
      id: "cb-4",
      name: "Decor, Diya Illumination & Rangoli",
      percentage: 14,
      plannedAmount: 42000,
      actualAmount: 42000,
      paidAmount: 20000,
      notes: "5,000 handmade terracotta diyas, fairy light arches along the main boulevard.",
    },
    {
      id: "cb-5",
      name: "Prizes, Mementos & Signage",
      percentage: 8,
      plannedAmount: 23000,
      actualAmount: 21000,
      paidAmount: 10000,
      notes: "Trophies for society talent contest, eco-banner directional signs.",
    }
  ],
  timeline: [
    {
      id: "ct-1",
      title: "File Municipal & Police Clearance Permits",
      phase: "3m",
      dueDate: "2026-09-01",
      status: "done",
      priority: "critical",
      category: "Permits"
    },
    {
      id: "ct-2",
      title: "Open Food & Artisan Stall Registrations",
      phase: "1m",
      dueDate: "2026-10-01",
      status: "done",
      priority: "high",
      category: "Stalls"
    },
    {
      id: "ct-3",
      title: "Audition Society Youth & Senior Performances",
      phase: "4w",
      dueDate: "2026-10-15",
      status: "in_progress",
      priority: "medium",
      category: "Program"
    },
    {
      id: "ct-4",
      title: "Distribute Volunteer Badges & Safety Briefing",
      phase: "1w",
      dueDate: "2026-10-28",
      status: "pending",
      priority: "high",
      category: "Safety"
    },
    {
      id: "ct-5",
      title: "Mela Day: Grand Inaugural Diya Lighting Ceremony",
      phase: "dayOf",
      dueDate: "2026-11-05",
      status: "pending",
      priority: "critical",
      category: "Schedule",
      minuteSchedule: "05:00 PM"
    },
    {
      id: "ct-6",
      title: "Resident Dance & Musical Performances",
      phase: "dayOf",
      dueDate: "2026-11-05",
      status: "pending",
      priority: "high",
      category: "Schedule",
      minuteSchedule: "06:30 PM"
    },
    {
      id: "ct-7",
      title: "Eco Laser & Music Spectacular Finale",
      phase: "dayOf",
      dueDate: "2026-11-05",
      status: "pending",
      priority: "critical",
      category: "Schedule",
      minuteSchedule: "09:00 PM"
    }
  ],
  vendors: [
    {
      id: "cv-1",
      category: "Audio & Stage",
      name: "Apex Sound & Stage Lights Delhi",
      status: "booked",
      quoteAmount: 105000,
      notes: "Includes sound technician on site all evening."
    },
    {
      id: "cv-2",
      category: "Tents & Tentsmiths",
      name: "Bharat Shamiana & Tent House",
      status: "booked",
      quoteAmount: 82000,
      notes: "30 stalls + 250 plastic banquet chairs."
    }
  ],
  ideas: [
    {
      id: "ci-1",
      kind: "decor",
      title: "Community Mega Rangoli Mandap",
      description: "A 25-foot circular central rangoli created collaboratively by resident families using organic flower petals and colored grains.",
      tags: ["Community", "Tradition", "Collaborative"],
      saved: true
    },
    {
      id: "ci-2",
      kind: "hack",
      title: "Zero Waste Green Protocol",
      description: "All food stall holders must use areca palm leaf plates and sugarcane cups. Set up 3 composting bins to process all organic festival waste locally.",
      tags: ["Eco-friendly", "Sustainability", "Community Pride"],
      saved: true
    }
  ],
  risks: [
    {
      id: "cr-1",
      risk: "Power grid overload from 30 food stalls and heavy sound rig",
      impact: "high",
      likelihood: "high",
      mitigation: "Hire two silent 62.5 kVA diesel generators to isolate stall cooking loads from the stage sound system."
    }
  ]
};

export function getDemoPlanForType(type: 'wedding' | 'birthday' | 'community'): GeneratedPlan {
  switch (type) {
    case 'birthday':
      return DEMO_BIRTHDAY_PLAN;
    case 'community':
      return DEMO_COMMUNITY_PLAN;
    case 'wedding':
    default:
      return DEMO_WEDDING_PLAN;
  }
}
