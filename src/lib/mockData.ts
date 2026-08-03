export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  colorScheme: 'purple' | 'gold' | 'rose';
}

export interface AIPickItem {
  id: string;
  title: string;
  designer: string;
  price: number;
  originalPrice?: number;
  matchScore: number; // e.g. 98 -> 98%
  reason: string;
  image: string;
  category: string;
  isWishlisted?: boolean;
}

export interface TrendingCollection {
  id: string;
  title: string;
  itemCount: number;
  tag: string;
  image: string;
  description: string;
}

export interface NearbyBoutique {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string; // e.g. "1.2 km"
  address: string;
  image: string;
  isOpen: boolean;
  specialty: string;
}

export interface ProductItem {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  category: string;
}

export const heroBanners: HeroBanner[] = [
  {
    id: 'b1',
    badge: 'Paris Fashion Week 2026',
    title: 'Haute Couture Redefined',
    subtitle: 'Discover hand-stitched velvet gowns and bespoke atelier tailoring crafted for the modern icon.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Explore Runway',
    ctaLink: '/explore',
    colorScheme: 'purple',
  },
  {
    id: 'b2',
    badge: 'Royal Bridal Salon',
    title: 'Unforgettable Elegance',
    subtitle: 'Princess cut trains, silk veils, and tailored groom tuxedos for your royal wedding day.',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Discover Bridal',
    ctaLink: '/wedding',
    colorScheme: 'gold',
  },
  {
    id: 'b3',
    badge: 'Custom Studio Fitting',
    title: 'Designed Around You',
    subtitle: 'Input 3D measurements and collaborate with master tailors to create one-of-a-kind couture.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Book Fitting',
    ctaLink: '/design',
    colorScheme: 'rose',
  },
];

export const aiPicks: AIPickItem[] = [
  {
    id: 'ai-1',
    title: 'Royal Midnight Velvet Blazer',
    designer: 'Atelier Saint-Germain',
    price: 1420,
    originalPrice: 1750,
    matchScore: 98,
    reason: 'Matches your preference for dark velvet & tailored lapels',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    category: 'Outerwear',
    isWishlisted: true,
  },
  {
    id: 'ai-2',
    title: 'Champagne Pleated Silk Gown',
    designer: 'Maison de L’Amour',
    price: 2100,
    matchScore: 96,
    reason: 'Frequently paired with champagne gold accessories',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    category: 'Gowns',
  },
  {
    id: 'ai-3',
    title: 'Rose Gold Crystal Mesh Clutch',
    designer: 'Valenti Milan',
    price: 680,
    originalPrice: 850,
    matchScore: 94,
    reason: 'Complements your saved wishlist items',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
  },
  {
    id: 'ai-4',
    title: 'Silk Organza Trench Coat',
    designer: 'Haute London',
    price: 1890,
    matchScore: 92,
    reason: 'Trending in Paris lookbook recommendations',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    category: 'Coats',
  },
];

export const trendingCollections: TrendingCollection[] = [
  {
    id: 'col-1',
    title: 'Autumn Velvet & Silk',
    itemCount: 24,
    tag: 'Haute Couture',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    description: 'Deep royal purple and lavender tones with handcrafted gold embroidery.',
  },
  {
    id: 'col-2',
    title: 'The Gold Accent Line',
    itemCount: 18,
    tag: 'Limited Release',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80',
    description: 'Champagne gold silk gowns, accessories, and metallic clutches.',
  },
  {
    id: 'col-3',
    title: 'Minimalist Luxe Tailoring',
    itemCount: 32,
    tag: 'Runway Essential',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    description: 'Clean architectural silhouettes with soft grey and rose gold accents.',
  },
];

export const nearbyBoutiques: NearbyBoutique[] = [
  {
    id: 'bt-1',
    name: 'Atelier Le Paris Atelier',
    rating: 4.9,
    reviewCount: 128,
    distance: '0.8 km',
    address: '42 Avenue Montaigne, Paris',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    specialty: 'Bespoke Fitting & Silk Tailoring',
  },
  {
    id: 'bt-2',
    name: 'Maison de Haute Couture',
    rating: 4.8,
    reviewCount: 94,
    distance: '1.5 km',
    address: '18 Rue du Faubourg Saint-Honoré',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    specialty: 'Bridal Gowns & Evening Wear',
  },
  {
    id: 'bt-3',
    name: 'Valenti Luxury Salon',
    rating: 4.9,
    reviewCount: 210,
    distance: '2.3 km',
    address: '75 Via Condotti, Rome Collection',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
    isOpen: false,
    specialty: 'Fine Jewelry & Leather Accessories',
  },
];

export const recentlyViewed: ProductItem[] = [
  {
    id: 'rv-1',
    title: 'Mulberry Silk Scarf',
    brand: 'Fashionista Atelier',
    price: 340,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80',
    category: 'Accessories',
  },
  {
    id: 'rv-2',
    title: 'Champagne Leather Pump',
    brand: 'Valenti Milan',
    price: 780,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
    category: 'Footwear',
  },
  {
    id: 'rv-3',
    title: 'Rose Gold Aviator Frame',
    brand: 'Haute Eye',
    price: 420,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80',
    category: 'Eyewear',
  },
  {
    id: 'rv-4',
    title: 'Velvet Lapel Waistcoat',
    brand: 'Saint-Germain',
    price: 890,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    category: 'Suits',
  },
];
