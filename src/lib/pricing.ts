export interface EventConfig {
  tipo_evento: string;
  num_persone: number;
  location: string;
  catering: 'base' | 'medio' | 'premium';
  dj: boolean;
  fotografo: boolean;
  allestimento: boolean;
}

export const PRICING = {
  catering: {
    base: 15,
    medio: 25,
    premium: 40,
  },
  services: {
    dj: 400,
    fotografo: 200,
    allestimento: 250,
  },
  location: {
    economica: 350,
    standard: 750,
    premium: 1200,
  },
} as const;

export const LOCATIONS = [
  { name: 'Salone economico', value: 'economica', price: 350 },
  { name: 'Salone standard', value: 'standard', price: 750 },
  { name: 'Salone premium', value: 'premium', price: 1200 },
];

export const EVENT_TYPES = [
  '18° compleanno',
  'Laurea',
  'Matrimonio',
  'Anniversario',
  'Festa aziendale',
  'Altro',
];

export function calculatePrice(config: EventConfig) {
  let basePrice = 0;

  // Catering
  const cateringPrice = PRICING.catering[config.catering];
  basePrice += cateringPrice * config.num_persone;

  // Location
  const locationPricing = PRICING.location[config.location as keyof typeof PRICING.location];
  basePrice += locationPricing || 0;

  // Services
  if (config.dj) basePrice += PRICING.services.dj;
  if (config.fotografo) basePrice += PRICING.services.fotografo;
  if (config.allestimento) basePrice += PRICING.services.allestimento;

  // Range: -10% to +15% (margine di manovra)
  const minPrice = Math.floor(basePrice * 0.9);
  const maxPrice = Math.ceil(basePrice * 1.15);

  return { minPrice, maxPrice, basePrice };
}
