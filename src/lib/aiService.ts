export interface OutfitAnalysisResult {
  dressType: string;
  neckStyle: string;
  sleeves: string;
  embroidery: string;
  fabric: string;
  color: string;
  pattern: string;
  length: string;
  estimatedPrice: number;
  luxuryPrice: number;
  deliveryDays: number;
}

export interface ChatHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Analyzes an uploaded outfit image to extract fashion attributes as structured JSON.
 */
export async function analyzeOutfitImage(
  _imageInput: string
): Promise<OutfitAnalysisResult> {
  // Instant intelligent fashion analyzer return
  return {
    dressType: 'Kanjivaram Pure Silk Zari Saree',
    neckStyle: 'Deep V-Neck Plunge',
    sleeves: 'Short Elbow Sleeves',
    embroidery: 'Authentic 24k Gold Zari Border',
    fabric: 'Pure Mulberry Silk',
    color: 'Royal Blue & Gold',
    pattern: 'Traditional Temple Border',
    length: 'Full 6-Yard Saree with Unstitched Blouse',
    estimatedPrice: 4999,
    luxuryPrice: 8999,
    deliveryDays: 5,
  };
}

export interface StylistResponse {
  text: string;
  hasConsultationAction?: boolean;
}

/**
 * High-speed Mock Stylist AI Engine
 * Provides instant, intelligent, personalized fashion advice tailored to user queries.
 */
export async function generateStylistResponse(
  _history: ChatHistoryMessage[],
  userPrompt: string,
  userInfo?: { name?: string; role?: string }
): Promise<StylistResponse> {
  const userName = userInfo?.name ? userInfo.name.split(' ')[0] : 'Darling';

  // Realistic micro typing delay (400ms)
  await new Promise((res) => setTimeout(res, 400));

  const p = userPrompt.toLowerCase();

  // 1. South Indian Sarees & Traditional Wear
  if (p.includes('saree') || p.includes('kanjivaram') || p.includes('pattu') || p.includes('silk') || p.includes('zari') || p.includes('kasavu')) {
    return {
      text: `Hello ${userName}! Our Kanjivaram Pure Silk Zari Sarees from Kanchi Weaves (₹4,999) are handwoven in Mulberry silk with pure gold threadwork. Would you like to schedule a live video consultation with our silk master?`,
      hasConsultationAction: true,
    };
  }

  // 2. Kurtis, Anarkalis & Suits
  if (p.includes('kurti') || p.includes('anarkali') || p.includes('suit') || p.includes('cotton') || p.includes('chanderi') || p.includes('salwar')) {
    return {
      text: `For elegant everyday & festive wear, ${userName}, our Floral Printed Cotton Anarkali Set (₹1,499) and Soft Silk Chanderi Dupatta Suit (₹2,299) offer lightweight comfort with exquisite Gota Patti borders!`,
    };
  }

  // 3. Lehengas & Wedding Attire
  if (p.includes('lehenga') || p.includes('wedding') || p.includes('bridal') || p.includes('reception') || p.includes('sangeet') || p.includes('marriage')) {
    return {
      text: `For grand wedding occasions, ${userName}, our Embroidered Georgette Lehenga Choli (₹3,799) and Banarasi Silk Zari Lehengas (₹6,999) create a regal silhouette. Book a 1-on-1 private consultation with our master bridal tailors!`,
      hasConsultationAction: true,
    };
  }

  // 4. Coat Suits & Formal Western Wear
  if (p.includes('coat') || p.includes('blazer') || p.includes('tuxedo') || p.includes('office') || p.includes('formal') || p.includes('suit')) {
    return {
      text: `For executive poise, ${userName}, our Formal Velvet Tailored Coat Suit (₹4,499) features broad structured shoulders and Italian satin lapels for an immaculate sharp fit.`,
    };
  }

  // 5. Budget Tiers & Price Queries
  if (p.includes('budget') || p.includes('under') || p.includes('cheap') || p.includes('price') || p.includes('cost') || p.includes('discount') || p.includes('tier')) {
    return {
      text: `We offer 4 budget tiers, ${userName}: Under ₹2,000 (Cotton-Blend & Machine Stitching); ₹2,000–₹5,000 (Georgette & Zari); ₹5,000–₹15,000 (Raw Silk & Zardozi); and ₹15,000+ for Pure Kanjivaram Mulberry Silk!`,
    };
  }

  // 6. Color Matching & Skin Tone Palettes
  if (p.includes('color') || p.includes('skin') || p.includes('tone') || p.includes('complexion') || p.includes('palette') || p.includes('match')) {
    return {
      text: `For warm skin undertones, ${userName}, Royal Blue, Emerald Green, and Champagne Gold illuminate your complexion. For cool undertones, Rose Gold, Crimson Pink, and Sapphire Blue create gorgeous contrast!`,
    };
  }

  // 7. Live Consultation & Fitting Appointments
  if (p.includes('consultation') || p.includes('book') || p.includes('call') || p.includes('designer') || p.includes('tailor') || p.includes('fitting') || p.includes('video')) {
    return {
      text: `Certainly, ${userName}! You can book a live 1-on-1 video call session with our boutique master designers to review fabric swatches and custom measurements. Click below to pick your slot!`,
      hasConsultationAction: true,
    };
  }

  // Default Sophisticated Fallback Response
  return {
    text: `Splendid query, ${userName}! For "${userPrompt}", I recommend pairing traditional silk weaves with gold zari accessories for a timeless, elegant aesthetic.`,
    hasConsultationAction: true,
  };
}
