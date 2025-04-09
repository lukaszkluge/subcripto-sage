
export type Subscription = {
  id: string;
  name: string;
  logo?: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly';
  category: 'entertainment' | 'fitness' | 'gaming' | 'productivity' | 'music' | 'other';
  nextBillingDate: Date;
  startDate: Date | string;
  notifyDaysBefore: number;
  color?: string;
};

export type SubscriptionFormData = Omit<Subscription, 'id' | 'nextBillingDate'> & {
  nextBillingDate: string;
  startDate: string;
};

export type AddSubscriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (subscription: SubscriptionFormData) => void;
};

export const CategoryColors = {
  entertainment: "#E50914", // Netflix red
  fitness: "#4CAF50", // Green
  gaming: "#7CBB00", // Xbox green
  productivity: "#0078D7", // Microsoft blue
  music: "#1DB954", // Spotify green
  other: "#9B59B6" // Purple
};

export const DefaultServices = [
  { name: "Netflix", category: "entertainment", logo: "netflix.svg" },
  { name: "Spotify", category: "music", logo: "spotify.svg" },
  { name: "HBO Max", category: "entertainment", logo: "hbomax.svg" },
  { name: "Disney+", category: "entertainment", logo: "disneyplus.svg" },
  { name: "Xbox Game Pass", category: "gaming", logo: "xbox.svg" },
  { name: "PlayStation Plus", category: "gaming", logo: "playstation.svg" },
  { name: "Amazon Prime", category: "entertainment", logo: "prime.svg" },
  { name: "YouTube Premium", category: "entertainment", logo: "youtube.svg" },
  { name: "Apple TV+", category: "entertainment", logo: "appletv.svg" },
  { name: "Apple Music", category: "music", logo: "applemusic.svg" },
  { name: "Strava", category: "fitness", logo: "strava.svg" },
  { name: "Microsoft 365", category: "productivity", logo: "microsoft365.svg" }
];
