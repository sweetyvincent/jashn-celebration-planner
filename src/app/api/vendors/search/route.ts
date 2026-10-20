import { NextResponse } from 'next/server';

export interface MarketplaceVendor {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  priceLevel: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  estimatedRange: string;
  address: string;
  phone: string;
  whatsapp: string;
  image: string;
  badges: string[];
  description: string;
  amenities: string[];
}

const CURATED_MARKETPLACE_VENDORS: MarketplaceVendor[] = [
  {
    id: 'mv-1',
    name: 'Chandra Vilas Heritage Haveli',
    category: 'Venue',
    city: 'Jaipur',
    rating: 4.9,
    reviewCount: 342,
    priceLevel: '₹₹₹₹',
    estimatedRange: '₹6,00,000 - ₹12,00,000',
    address: 'Amer Road, Heritage Corridor, Jaipur, Rajasthan 302002',
    phone: '+91 98290 11223',
    whatsapp: '919829011223',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    badges: ['Heritage Certified', 'Google 4.9★', 'Top Rated 2026'],
    description: '18th-century restored palace haveli with royal courtyards, fountain lawns, and 30 boutique luxury suites for royal weddings.',
    amenities: ['Capacity 500+', 'Valet Parking', 'Bridal Suite', 'Generator Backup', 'Outside Decorators Allowed']
  },
  {
    id: 'mv-2',
    name: 'Udaivilas Lakeview Courtyards',
    category: 'Venue',
    city: 'Udaipur',
    rating: 4.9,
    reviewCount: 489,
    priceLevel: '₹₹₹₹',
    estimatedRange: '₹8,50,000 - ₹16,00,000',
    address: 'Haridas Ji Ki Magri, Lake Pichola, Udaipur, Rajasthan 313001',
    phone: '+91 98291 99887',
    whatsapp: '919829199887',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    badges: ['Lakeside Palace', 'Google 4.9★', 'Celebrity Venue'],
    description: 'Iconic waterfront venue overlooking Lake Pichola. Breathtaking sunset mandap views with royal boat arrival for couples.',
    amenities: ['Lakeside Mandap Pier', 'Helipad', '5-Star Hospitality', 'In-House Sound']
  },
  {
    id: 'mv-3',
    name: 'Shahi Dawat Royal Gourmet Catering',
    category: 'Catering',
    city: 'Jaipur',
    rating: 4.8,
    reviewCount: 278,
    priceLevel: '₹₹₹',
    estimatedRange: '₹1,400 - ₹2,500 / plate',
    address: 'Tonk Road, Bapu Nagar, Jaipur, Rajasthan 302015',
    phone: '+91 98292 33445',
    whatsapp: '919829233445',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80',
    badges: ['FSSAI Gold Certified', 'Dedicated Jain Kitchen', 'Live Counters'],
    description: 'Master chefs specializing in royal Rajasthani, Awadhi, Mughlai, and modern fusion chaat shooters with copper tableware.',
    amenities: ['Separate Pure Veg Kitchen', 'Liquid Nitrogen Desserts', 'Bio-degradable Cutlery', 'Tasting Sessions']
  },
  {
    id: 'mv-4',
    name: 'Marigold & Mirrors Floral Atelier',
    category: 'Decor',
    city: 'Jaipur',
    rating: 4.85,
    reviewCount: 195,
    priceLevel: '₹₹₹',
    estimatedRange: '₹2,50,000 - ₹6,00,000',
    address: 'MI Road, C-Scheme, Jaipur, Rajasthan 302001',
    phone: '+91 98112 55667',
    whatsapp: '919811255667',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80',
    badges: ['Floral Specialists', 'Eco-Decor certified', '3D Stage Preview'],
    description: 'Artisan stage designers creating suspended floral mandaps, mirror-mosaic walkways, brass diya chandeliers, and sustainable fairy canopies.',
    amenities: ['Custom 3D Renders', 'Fresh Morning Flowers', 'Cold Pyro Integration', 'Fabric Drapes']
  },
  {
    id: 'mv-5',
    name: 'Aura Cinematics & Drone Films',
    category: 'Photography',
    city: 'Mumbai',
    rating: 4.9,
    reviewCount: 310,
    priceLevel: '₹₹₹',
    estimatedRange: '₹1,80,000 - ₹4,50,000',
    address: 'Bandra West, Linking Road, Mumbai, Maharashtra 400050',
    phone: '+91 99201 44332',
    whatsapp: '919920144332',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format&fit=crop&q=80',
    badges: ['DGCA Drone Certified', 'Same-Day Teaser', 'Award Winning'],
    description: 'Editorial wedding photographers and documentary filmmakers specializing in candid moments, 4K cinema trailers, and drone aerial perspectives.',
    amenities: ['2 Candid + 2 Traditional', '4K Teaser in 48 hrs', 'Full Raw Footage Delivery', 'Custom Photobook']
  },
  {
    id: 'mv-6',
    name: 'Beats of Punjab Dhol & DJ Syndicate',
    category: 'Music / DJ',
    city: 'Delhi',
    rating: 4.75,
    reviewCount: 220,
    priceLevel: '₹₹',
    estimatedRange: '₹60,000 - ₹1,80,000',
    address: 'Rajouri Garden, Ring Road, New Delhi 110027',
    phone: '+91 98101 88776',
    whatsapp: '919810188776',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    badges: ['Verified Sound Engineers', 'Bollywood Chart-toppers', 'Live Percussion'],
    description: 'High-octane Baraat dhol players, Bollywood club DJs, dynamic sound rigs, and visual LED walls tailored to Indian celebrations.',
    amenities: ['6 Live Punjabi Dhols', 'JBL Line Array Sound', 'Intelligent Moving Heads', 'Smoke & CO2 Cannons']
  },
  {
    id: 'mv-7',
    name: 'Glamour by Shweta (Bridal & HD Airbrush)',
    category: 'Styling / Makeup',
    city: 'Jaipur',
    rating: 4.95,
    reviewCount: 165,
    priceLevel: '₹₹₹',
    estimatedRange: '₹25,000 - ₹75,000 / event',
    address: 'Malviya Nagar, Jaipur, Rajasthan 302017',
    phone: '+91 98295 77889',
    whatsapp: '919829577889',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
    badges: ['International Certified', 'HD Temptu Airbrush', 'Bridal Specialist'],
    description: 'Celebrity bridal artist providing HD airbrush makeup, traditional Rajputi safa styling, hair extensions, and on-location touchup assistance.',
    amenities: ['Pre-Bridal Skin Consultation', 'Mother & Sitter Packages', 'Draping Artist Included']
  },
  {
    id: 'mv-8',
    name: 'WonderKids Theme Arena & Entertainment',
    category: 'Entertainment',
    city: 'Mumbai',
    rating: 4.8,
    reviewCount: 140,
    priceLevel: '₹₹',
    estimatedRange: '₹15,000 - ₹45,000',
    address: 'Juhu Tara Road, Juhu, Mumbai, Maharashtra 400049',
    phone: '+91 98205 11990',
    whatsapp: '919820511990',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
    badges: ['Child Safety Certified', 'Superhero Mascots', 'Magic Show'],
    description: 'Premier kids birthday entertainment offering interactive mascot quests, balloon sculpting, science experiment stations, and inflatable obstacle courses.',
    amenities: ['Trained Supervisors', 'Sanitized Soft Play', 'Custom Giveaways']
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'All';
  const city = searchParams.get('city') || '';
  const query = searchParams.get('query') || '';
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  // If user provided a real Google Places API key, query Google Places TextSearch API
  if (apiKey && apiKey.trim().length > 0) {
    try {
      const placesQuery = `${category !== 'All' ? category : 'event wedding vendors'} in ${city || 'India'} ${query}`;
      const googleUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placesQuery)}&key=${apiKey}`;
      const res = await fetch(googleUrl);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const mappedVendors: MarketplaceVendor[] = data.results.slice(0, 10).map((p: any, idx: number) => ({
          id: `gplace-${p.place_id || idx}`,
          name: p.name,
          category: category !== 'All' ? category : 'Venue',
          city: city || 'Local Area',
          rating: p.rating || 4.7,
          reviewCount: p.user_ratings_total || 85,
          priceLevel: p.price_level === 3 ? '₹₹₹' : p.price_level === 4 ? '₹₹₹₹' : '₹₹',
          estimatedRange: 'Verified on Inquiry',
          address: p.formatted_address || p.vicinity || 'Address on Google Maps',
          phone: '+91 98000 00000',
          whatsapp: '919800000000',
          image: p.photos?.[0]
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${p.photos[0].photo_reference}&key=${apiKey}`
            : 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80',
          badges: ['Google Verified', `${p.rating || 4.7}★ Rating`],
          description: `Google Places verified ${category} listing with ${p.user_ratings_total || 0} customer reviews.`,
          amenities: ['Verified Location', 'Direct Contact']
        }));

        return NextResponse.json({
          source: 'google_places_api',
          vendors: mappedVendors
        });
      }
    } catch (err) {
      console.warn('Google Places API request failed, falling back to curated marketplace:', err);
    }
  }

  // Curated Marketplace with filter matching
  let results = [...CURATED_MARKETPLACE_VENDORS];

  if (category && category !== 'All') {
    results = results.filter((v) => v.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (city && city.trim().length > 0) {
    const cityLower = city.toLowerCase();
    const cityFiltered = results.filter((v) => v.city.toLowerCase().includes(cityLower));
    if (cityFiltered.length > 0) {
      results = cityFiltered;
    }
  }

  if (query && query.trim().length > 0) {
    const qLower = query.toLowerCase();
    results = results.filter(
      (v) =>
        v.name.toLowerCase().includes(qLower) ||
        v.description.toLowerCase().includes(qLower) ||
        v.badges.some((b) => b.toLowerCase().includes(qLower))
    );
  }

  return NextResponse.json({
    source: 'curated_marketplace',
    vendors: results
  });
}
