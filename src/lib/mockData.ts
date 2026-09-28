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

export interface GarmentCategoryItem {
  id: string;
  name: string;
  count: number;
  image: string;
  tag?: string;
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
  originalPrice?: number;
  image: string;
  category: string;
  discountPercentage?: number;
  rating?: number;
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
    badge: 'Atelier Collection 2026',
    title: 'Authentic South Indian & Luxury Apparel',
    subtitle: 'Handwoven Kanjivaram pure silks, zari embroidered lehengas, and tailored coat suits.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Explore Collection',
    ctaLink: '/explore',
    colorScheme: 'purple',
  },
  {
    id: 'b2',
    badge: 'Custom Atelier',
    title: 'Bespoke Fittings & Tailoring',
    subtitle: '3D Mannequin Fit Customizer with live pattern drafting and boutique consultations.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Launch 3D Studio',
    ctaLink: '/studio',
    colorScheme: 'gold',
  },
];

// Garment Categories
export const garmentCategoryItems: GarmentCategoryItem[] = [
  {
    id: 'all',
    name: 'All Garments',
    count: 148,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'kurtis',
    name: 'Kurtis & Suits',
    count: 42,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    tag: 'Popular',
  },
  {
    id: 'sarees',
    name: 'Kanjivaram Sarees',
    count: 58,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    tag: 'Bestseller',
  },
  {
    id: 'lehengas',
    name: 'Lehenga Choli',
    count: 36,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    tag: 'Trending',
  },
  {
    id: 'skirts',
    name: 'Long Skirts & Pavadai',
    count: 28,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'coatsuits',
    name: 'Coat Suits & Blazers',
    count: 24,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'anarkalis',
    name: 'Anarkali Sets',
    count: 31,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gowns',
    name: 'Bespoke Evening Gowns',
    count: 19,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
  },
];

// Rich Product Catalog by Garment Type
export const categoryProducts: ProductItem[] = [
  // Kurtis & Suits
  {
    id: 'p-1',
    title: 'Floral Printed Cotton Anarkali Kurta Set',
    brand: 'Ethnic Elegance',
    price: 1499,
    originalPrice: 2999,
    discountPercentage: 50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    category: 'kurtis',
  },
  {
    id: 'p-2',
    title: 'Straight Cut Silk Chanderi Kurti Set',
    brand: 'South Vogue',
    price: 1899,
    originalPrice: 3499,
    discountPercentage: 45,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    category: 'kurtis',
  },

  // Sarees
  {
    id: 'p-3',
    title: 'Kanjivaram Pure Silk Zari Saree - Royal Blue',
    brand: 'Kanchi Weaves',
    price: 4999,
    originalPrice: 8999,
    discountPercentage: 44,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    category: 'sarees',
  },
  {
    id: 'p-4',
    title: 'Kasavu Golden Border Kerala Tissue Saree',
    brand: 'Kerala Weaves',
    price: 3299,
    originalPrice: 5499,
    discountPercentage: 40,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610030469668-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    category: 'sarees',
  },

  // Lehengas
  {
    id: 'p-5',
    title: 'Embroidered Georgette Lehenga Choli',
    brand: 'Madurai Trends',
    price: 3799,
    originalPrice: 6999,
    discountPercentage: 45,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    category: 'lehengas',
  },
  {
    id: 'p-6',
    title: 'Banarasi Silk Zari Bridal Lehenga',
    brand: 'Tanjore Heritage',
    price: 6999,
    originalPrice: 12999,
    discountPercentage: 46,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    category: 'lehengas',
  },

  // Long Skirts & Pavadai
  {
    id: 'p-7',
    title: 'Temple Border Silk Pattu Pavadai Set',
    brand: 'Tanjore Heritage',
    price: 2899,
    originalPrice: 4999,
    discountPercentage: 42,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    category: 'skirts',
  },

  // Coat Suits & Blazers
  {
    id: 'p-8',
    title: 'Formal Velvet Tailored Coat Suit',
    brand: 'Atelier Saint-Germain',
    price: 4499,
    originalPrice: 7999,
    discountPercentage: 43,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    category: 'coatsuits',
  },

  // Anarkali Sets
  {
    id: 'p-9',
    title: 'Traditional Soft Silk Chanderi Dupatta Suit',
    brand: 'South Vogue',
    price: 2299,
    originalPrice: 4199,
    discountPercentage: 45,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    category: 'anarkalis',
  },

  // Bespoke Gowns
  {
    id: 'p-10',
    title: 'Champagne Silk Evening Gown',
    brand: 'Valenti Luxury',
    price: 5499,
    originalPrice: 9999,
    discountPercentage: 45,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    category: 'gowns',
  },
];

export const aiPicks: AIPickItem[] = [
  {
    id: 'ai-1',
    title: 'Kanjivaram Pure Silk Zari Saree - Royal Blue',
    designer: 'Kanchi Weaves',
    price: 4999,
    originalPrice: 8999,
    matchScore: 98,
    reason: 'Handwoven pure silk with authentic gold zari border',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    category: 'Saree',
    isWishlisted: true,
  },
  {
    id: 'ai-2',
    title: 'Floral Printed Cotton Anarkali Kurta Set',
    designer: 'Ethnic Elegance',
    price: 1499,
    originalPrice: 2999,
    matchScore: 95,
    reason: 'Lightweight breathable cotton with Gota Patti trim',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    category: 'Kurti / Suit',
  },
];

export const trendingCollections: TrendingCollection[] = [
  {
    id: 'col-1',
    title: 'Kanjivaram Handloom Classics',
    itemCount: 28,
    tag: 'Authentic Weaves',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Pure Mulberry silk sarees crafted in Kanchipuram with 24k gold threadwork.',
  },
  {
    id: 'col-2',
    title: 'South Indian Festive Anarkalis',
    itemCount: 20,
    tag: 'Trending Festive',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant flared Anarkali sets with embroidered dupattas for Puja & celebrations.',
  },
  {
    id: 'col-3',
    title: 'Temple Border Pattu Pavadai',
    itemCount: 16,
    tag: 'Heritage South',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional silk skirts and blouses with temple motif borders.',
  },
];

export const nearbyBoutiques: NearbyBoutique[] = [
  {
    id: 'bt-1',
    name: 'Kanchi Weaves Atelier',
    rating: 4.9,
    reviewCount: 184,
    distance: '0.8 km',
    address: '42 MG Road, Bengaluru',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    specialty: 'Pure Kanjivaram Silk & Zari Weaves',
  },
  {
    id: 'bt-2',
    name: 'Madurai Trends Couture',
    rating: 4.8,
    reviewCount: 124,
    distance: '1.5 km',
    address: '18 Anna Salai, Chennai',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    specialty: 'Bridal Lehengas & Gota Patti Anarkalis',
  },
  {
    id: 'bt-3',
    name: 'South Vogue Silk Salon',
    rating: 4.9,
    reviewCount: 210,
    distance: '2.3 km',
    address: '75 Jubilee Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    isOpen: false,
    specialty: 'Chanderi Dupatta Sets & Temple Sarees',
  },
];

export const recentlyViewed: ProductItem[] = [
  {
    id: 'rv-1',
    title: 'Kanjivaram Pure Silk Zari Saree',
    brand: 'Kanchi Weaves',
    price: 4999,
    originalPrice: 8999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    category: 'Saree',
  },
  {
    id: 'rv-2',
    title: 'Floral Printed Cotton Anarkali',
    brand: 'Ethnic Elegance',
    price: 1499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    category: 'Kurti / Suit',
  },
  {
    id: 'rv-3',
    title: 'Silk Chanderi Dupatta Suit',
    brand: 'South Vogue',
    price: 2299,
    originalPrice: 4199,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    category: 'Salwar Kameez',
  },
  {
    id: 'rv-4',
    title: 'Embroidered Georgette Lehenga',
    brand: 'Madurai Trends',
    price: 3799,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80',
    category: 'Lehenga',
  },
];

export const exploreOutfits: ExploreOutfit[] = [
  {
    id: 'exp-1',
    title: 'Kanjivaram Pure Silk Zari Saree - Royal Blue',
    designer: 'Kanchi Weaves',
    boutique: 'Kanchi Weaves Atelier',
    price: 4999,
    originalPrice: 8999,
    rating: 4.9,
    reviewCount: 94,
    occasion: 'Wedding',
    fabric: 'Silk',
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    isWishlisted: true,
  },
  {
    id: 'exp-2',
    title: 'Floral Printed Cotton Anarkali Kurta Set',
    designer: 'Ethnic Elegance',
    boutique: 'Madurai Trends Couture',
    price: 1499,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 62,
    occasion: 'Casual Luxe',
    fabric: 'Organza',
    location: 'Milan',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-3',
    title: 'Traditional Soft Silk Chanderi Dupatta Suit',
    designer: 'South Vogue',
    boutique: 'South Vogue Silk Salon',
    price: 2299,
    originalPrice: 4199,
    rating: 4.9,
    reviewCount: 78,
    occasion: 'Evening',
    fabric: 'Silk',
    location: 'Rome',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-4',
    title: 'Embroidered Georgette Lehenga Choli',
    designer: 'Madurai Trends',
    boutique: 'Madurai Trends Couture',
    price: 3799,
    originalPrice: 6999,
    rating: 5.0,
    reviewCount: 112,
    occasion: 'Wedding',
    fabric: 'Velvet',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  },
];

export const weddingPackages: WeddingPackageItem[] = [
  {
    id: 'wp-1',
    title: 'Kanjivaram Bridal Pattu Silk Package',
    packageType: 'Bride',
    designer: 'Kanchi Weaves',
    price: 14999,
    fabric: 'Pure Mulberry Silk',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    tag: 'Bridal Heritage',
    description: 'Includes 2 Kanjivaram silk sarees, gold zari blouse stitching, and 3D fitting consultation.',
  },
  {
    id: 'wp-2',
    title: 'Royal South Velvet Sherwani Set',
    packageType: 'Groom',
    designer: 'South Vogue',
    price: 12499,
    fabric: 'Royal Velvet & Silk',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    tag: 'Groom Luxury',
    description: 'Embroidered velvet Sherwani with zari stole, churidar, and matching footwear.',
  },
];

export const moodboardPins: MoodboardPin[] = [
  {
    id: 'pin-1',
    title: 'Kanjivaram Gold Zari Detail',
    category: 'Silk Heritage',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    heightClass: 'h-64',
    likes: 342,
    isSaved: true,
  },
  {
    id: 'pin-2',
    title: 'Floral Anarkali Gota Work',
    category: 'Festive Wear',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    heightClass: 'h-80',
    likes: 218,
  },
  {
    id: 'pin-3',
    title: 'Chanderi Silk Dupatta Weave',
    category: 'Traditional Suit',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    heightClass: 'h-72',
    likes: 195,
  },
  {
    id: 'pin-4',
    title: 'Georgette Lehenga Mirror Embellishment',
    category: 'Bridal Couture',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    heightClass: 'h-88',
    likes: 412,
  },
];

export const revenueChartData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 45000, consultations: 32 },
  { month: 'Feb', revenue: 52000, consultations: 41 },
  { month: 'Mar', revenue: 61000, consultations: 48 },
  { month: 'Apr', revenue: 58000, consultations: 45 },
  { month: 'May', revenue: 74000, consultations: 59 },
  { month: 'Jun', revenue: 89000, consultations: 68 },
];

export const dashboardOrders: DashboardOrder[] = [
  {
    id: 'ord-101',
    customerName: 'Ananya Rao',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    garmentTitle: 'Kanjivaram Pure Silk Zari Saree',
    amount: 4999,
    date: 'Today, 2:30 PM',
    status: 'In Fitting',
  },
  {
    id: 'ord-102',
    customerName: 'Priya Sundaram',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    garmentTitle: 'Floral Printed Cotton Anarkali Set',
    amount: 1499,
    date: 'Yesterday',
    status: 'Shipped',
  },
  {
    id: 'ord-103',
    customerName: 'Kavitha Menon',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    garmentTitle: 'Soft Silk Chanderi Dupatta Suit',
    amount: 2299,
    date: '3 days ago',
    status: 'Completed',
  },
];

export const dashboardInventory: DashboardInventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'KAN-SILK-01',
    name: 'Kanjivaram Pure Silk Zari Saree',
    category: 'Saree',
    price: 4999,
    stock: 14,
    status: 'In Stock',
  },
  {
    id: 'inv-2',
    sku: 'FLR-ANK-02',
    name: 'Floral Printed Cotton Anarkali',
    category: 'Kurti / Suit',
    price: 1499,
    stock: 4,
    status: 'Low Stock',
  },
  {
    id: 'inv-3',
    sku: 'SOU-DUP-03',
    name: 'Soft Silk Chanderi Dupatta Suit',
    category: 'Salwar Kameez',
    price: 2299,
    stock: 22,
    stockStatus: 'In Stock',
  } as any,
];
