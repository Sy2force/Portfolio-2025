# 🔌 Documentation API

## 📊 Endpoints Disponibles

### 🔐 Authentication
```http
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
```

### 💼 Projects
```http
GET    /api/projects
POST   /api/projects      # Auth required
PUT    /api/projects/:id  # Auth required
DELETE /api/projects/:id  # Auth required
```

### 📞 Contact
```http
POST /api/contact
GET  /api/contact         # Auth required
```

### 🏥 Health Check
```http
GET /health
```

## 📝 Schémas de Données

### Project Schema
```typescript
interface IProject {
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
}
```

### Contact Schema
```typescript
interface IContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Schema
```typescript
interface IUser {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  isActive: boolean;
  lastLogin?: Date;
}
```
