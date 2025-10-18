export interface RealProjectStats {
  clients?: string;
  cards?: string;
  conversion?: string;
  products?: string;
  orders?: string;
  pagespeed?: string;
  bookings?: string;
  users?: string;
  rating?: string;
  features?: string;
  campaigns?: string;
  metrics?: string;
  accuracy?: string;
  languages?: string;
  performance?: string;
}

export interface RealProject {
  id: number;
  title: string;
  description: string;
  category: 'saas' | 'ecommerce' | 'web' | 'pwa' | 'analytics' | 'portfolio';
  tech: string[];
  color: string;
  stats: RealProjectStats;
  github: string;
  live: string;
  image: string;
  featured: boolean;
}

export interface ProjectCategory {
  id: string;
  label: string;
  icon: string;
  count: number;
}
