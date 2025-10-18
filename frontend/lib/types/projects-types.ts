export interface MultiLangText {
  fr: string;
  en: string;
  he: string;
}

export interface ProjectStats {
  stars: number;
  forks: number;
  views: number;
  commits: number;
}

export interface ProjectData {
  _id?: string;
  title: MultiLangText;
  description: MultiLangText;
  shortDescription: MultiLangText;
  slug: string;
  images: string[];
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'design';
  status: 'planning' | 'development' | 'completed' | 'maintenance';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  priority: number;
  stats: ProjectStats;
  startDate: Date;
  endDate?: Date;
  teamSize: number;
  myRole: string;
  challenges: string[];
  learnings: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseModule {
  id: string;
  name: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'planned';
  topics: string[];
}

export interface HackerUProgram {
  name: string;
  duration: string;
  startDate: Date;
  endDate: Date;
  modules: CourseModule[];
  totalHours: number;
  status: 'in-progress' | 'completed';
}
