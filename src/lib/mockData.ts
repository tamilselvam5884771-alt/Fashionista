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
  matchScore: number;
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
  distance: string;
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

export interface ExploreOutfit {
  id: string;
  title: string;
  designer: string;
  boutique: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  occasion: 'Evening' | 'Wedding' | 'Cocktail' | 'Runway' | 'Casual Luxe';
  fabric: 'Velvet' | 'Silk' | 'Lace' | 'Organza' | 'Satin';
  location: 'Paris' | 'Milan' | 'Rome' | 'London';
  image: string;
  isWishlisted?: boolean;
}

export interface WeddingPackageItem {
  id: string;
  title: string;
  packageType: 'Bride' | 'Groom' | 'Bridesmaid' | 'Family';
  designer: string;
  price: number;
  fabric: string;
  image: string;
  tag: string;
  description: string;
}

export interface MoodboardPin {
  id: string;
  title: string;
  category: string;
  image: string;
  heightClass: string;
  likes: number;
  isSaved?: boolean;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  consultations: number;
}

export interface DashboardOrder {
  id: string;
  customerName: string;
  customerAvatar?: string;
  garmentTitle: string;
  amount: number;
  date: string;
  status: 'Completed' | 'In Fitting' | 'Pending' | 'Shipped';
}

export interface DashboardInventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
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

export const exploreOutfits: ExploreOutfit[] = [
  {
    id: 'exp-1',
    title: 'Royal Velvet Evening Gown',
    designer: 'Saint-Germain',
    boutique: 'Atelier Le Paris',
    price: 2450,
    originalPrice: 2890,
    rating: 4.9,
    reviewCount: 42,
    occasion: 'Evening',
    fabric: 'Velvet',
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    isWishlisted: true,
  },
  {
    id: 'exp-2',
    title: 'Princess Cut Silk Bridal Train',
    designer: 'Maison de L’Amour',
    boutique: 'Maison de Couture',
    price: 4200,
    originalPrice: 4800,
    rating: 5.0,
    reviewCount: 68,
    occasion: 'Wedding',
    fabric: 'Silk',
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-3',
    title: 'Champagne Silk Slip Dress',
    designer: 'Valenti Milan',
    boutique: 'Valenti Luxury Salon',
    price: 1350,
    rating: 4.8,
    reviewCount: 29,
    occasion: 'Cocktail',
    fabric: 'Silk',
    location: 'Milan',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-4',
    title: 'French Lace Corset & Skirt',
    designer: 'Saint-Germain',
    boutique: 'Atelier Le Paris',
    price: 1890,
    originalPrice: 2150,
    rating: 4.7,
    reviewCount: 35,
    occasion: 'Runway',
    fabric: 'Lace',
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-5',
    title: 'Silk Organza Layered Cape',
    designer: 'Haute London',
    boutique: 'Haute Flagship',
    price: 1620,
    rating: 4.9,
    reviewCount: 19,
    occasion: 'Runway',
    fabric: 'Organza',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-6',
    title: 'Satin Pleated Cocktail Dress',
    designer: 'Valenti Milan',
    boutique: 'Valenti Luxury Salon',
    price: 980,
    originalPrice: 1200,
    rating: 4.6,
    reviewCount: 51,
    occasion: 'Cocktail',
    fabric: 'Satin',
    location: 'Rome',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-7',
    title: 'Bespoke Double-Breasted Velvet Suit',
    designer: 'Saint-Germain',
    boutique: 'Atelier Le Paris',
    price: 2780,
    rating: 4.9,
    reviewCount: 31,
    occasion: 'Evening',
    fabric: 'Velvet',
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-8',
    title: 'Rose Gold Satin Evening Wrap',
    designer: 'Maison de L’Amour',
    boutique: 'Maison de Couture',
    price: 1490,
    rating: 4.8,
    reviewCount: 22,
    occasion: 'Casual Luxe',
    fabric: 'Satin',
    location: 'Milan',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-9',
    title: 'Embroidered Organza Wedding Dress',
    designer: 'Maison de L’Amour',
    boutique: 'Maison de Couture',
    price: 3850,
    originalPrice: 4200,
    rating: 5.0,
    reviewCount: 77,
    occasion: 'Wedding',
    fabric: 'Organza',
    location: 'Rome',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  },
];

export const weddingPackages: WeddingPackageItem[] = [
  {
    id: 'wp-1',
    title: 'Princess Cut Silk Gown & Cathedral Veil',
    packageType: 'Bride',
    designer: 'Maison de L’Amour',
    price: 4200,
    fabric: 'Mulberry Silk & Lace',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
    tag: 'Bridal Highlight',
    description: 'Includes hand-stitched cathedral veil, pearl embroidery, and 3D fitting session.',
  },
  {
    id: 'wp-2',
    title: 'Rose Gold Floral Lehenga Set',
    packageType: 'Bride',
    designer: 'Saint-Germain Atelier',
    price: 3850,
    fabric: 'Organza & Crystal Thread',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    tag: 'Popular',
    description: 'Embellished dupatta with rose gold sequins and custom waist fitting.',
  },
  {
    id: 'wp-3',
    title: 'Royal Midnight Velvet Sherwani & Tux',
    packageType: 'Groom',
    designer: 'Saint-Germain',
    price: 2850,
    fabric: 'Royal Velvet & Silk',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    tag: 'Groom Luxury',
    description: 'Tailored velvet bandhgala jacket with silk trousers and champagne pocket square.',
  },
  {
    id: 'wp-4',
    title: 'Champagne Gold Satin Suit',
    packageType: 'Groom',
    designer: 'Valenti Milan',
    price: 2100,
    fabric: 'Italian Satin Silk',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    tag: 'Classic',
    description: 'Peak lapel double-breasted suit crafted for wedding reception elegance.',
  },
  {
    id: 'wp-5',
    title: 'Lavender Tulle Bridesmaid Set',
    packageType: 'Bridesmaid',
    designer: 'Haute London',
    price: 980,
    fabric: 'French Tulle & Satin',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    tag: 'Matching Group',
    description: 'Coordinated pastel lavender dresses with adjustable waist ribbons.',
  },
  {
    id: 'wp-6',
    title: 'Family Heirloom Silk Anarkali & Suit',
    packageType: 'Family',
    designer: 'Maison de L’Amour',
    price: 1650,
    fabric: 'Pure Brocade Silk',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    tag: 'Family Package',
    description: 'Bespoke traditional attire set for parents and close family members.',
  },
];

export const moodboardPins: MoodboardPin[] = [
  {
    id: 'pin-1',
    title: 'Cathedral Silk Veil & Pearl Tiara',
    category: 'Bridal Accessories',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-80',
    likes: 342,
    isSaved: true,
  },
  {
    id: 'pin-2',
    title: 'Rose Gold Floral Reception Entrance',
    category: 'Venue Decor',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-64',
    likes: 512,
  },
  {
    id: 'pin-3',
    title: 'Champagne Silk Pleated Gown',
    category: 'Gowns',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-96',
    likes: 428,
  },
  {
    id: 'pin-4',
    title: 'Royal Velvet Groom Lapel Detail',
    category: 'Groom Style',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-72',
    likes: 219,
  },
  {
    id: 'pin-5',
    title: 'French Lace Bridal Bouquet & Ring',
    category: 'Details',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-64',
    likes: 630,
  },
  {
    id: 'pin-6',
    title: 'Pastel Lavender Bridesmaid Palette',
    category: 'Color Scheme',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    heightClass: 'h-80',
    likes: 189,
  },
];

export const revenueChartData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 14200, consultations: 12 },
  { month: 'Feb', revenue: 18500, consultations: 14 },
  { month: 'Mar', revenue: 24100, consultations: 18 },
  { month: 'Apr', revenue: 21800, consultations: 16 },
  { month: 'May', revenue: 32400, consultations: 22 },
  { month: 'Jun', revenue: 38900, consultations: 25 },
  { month: 'Jul', revenue: 48250, consultations: 31 },
];

export const dashboardOrders: DashboardOrder[] = [
  {
    id: 'ORD-9421',
    customerName: 'Victoria Sterling',
    garmentTitle: 'Princess Cut Silk Bridal Train',
    amount: 4200,
    date: 'Aug 02, 2026',
    status: 'In Fitting',
  },
  {
    id: 'ORD-9420',
    customerName: 'Sophia Laurent',
    garmentTitle: 'Royal Midnight Velvet Blazer',
    amount: 1420,
    date: 'Aug 01, 2026',
    status: 'Completed',
  },
  {
    id: 'ORD-9419',
    customerName: 'Elena Rostova',
    garmentTitle: 'Champagne Pleated Silk Gown',
    amount: 2100,
    date: 'Jul 30, 2026',
    status: 'Shipped',
  },
  {
    id: 'ORD-9418',
    customerName: 'Marcus Vance',
    garmentTitle: 'Royal Midnight Velvet Tuxedo',
    amount: 2850,
    date: 'Jul 28, 2026',
    status: 'Pending',
  },
  {
    id: 'ORD-9417',
    customerName: 'Isabella Rossi',
    garmentTitle: 'Rose Gold Crystal Mesh Clutch',
    amount: 680,
    date: 'Jul 27, 2026',
    status: 'Completed',
  },
];

export const dashboardInventory: DashboardInventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'FASH-VLV-01',
    name: 'Royal Midnight Velvet Blazer',
    category: 'Outerwear',
    price: 1420,
    stock: 14,
    status: 'In Stock',
  },
  {
    id: 'inv-2',
    sku: 'FASH-SLK-02',
    name: 'Champagne Pleated Silk Gown',
    category: 'Gowns',
    price: 2100,
    stock: 3,
    status: 'Low Stock',
  },
  {
    id: 'inv-3',
    sku: 'FASH-ACC-03',
    name: 'Rose Gold Crystal Mesh Clutch',
    category: 'Accessories',
    price: 680,
    stock: 28,
    status: 'In Stock',
  },
  {
    id: 'inv-4',
    sku: 'FASH-BRD-04',
    name: 'Princess Cut Silk Bridal Train',
    category: 'Bridal Suite',
    price: 4200,
    stock: 2,
    status: 'Low Stock',
  },
  {
    id: 'inv-5',
    sku: 'FASH-TUX-05',
    name: 'Bespoke Double-Breasted Velvet Suit',
    category: 'Menswear',
    price: 2780,
    stock: 9,
    status: 'In Stock',
  },
];
