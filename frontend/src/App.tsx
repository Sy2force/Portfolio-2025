import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Loader from './components/UI/Loader'
import ParticlesBackground from './components/Background/ParticlesBackground'
import { AdminProvider, useAdmin } from './contexts/AdminContext'
import AdminButtonSimple from './components/admin/AdminButtonSimple'
import PrivateRoute from './components/PrivateRoute'
import './i18n'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Skills = lazy(() => import('./pages/Skills'))
const Projects = lazy(() => import('./pages/Projects'))
const Services = lazy(() => import('./pages/Services'))
const CV = lazy(() => import('./pages/CV'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const AdminDashboardComplete = lazy(() => import('./pages/AdminDashboardComplete'))
const AdminLoginSecure = lazy(() => import('./pages/admin/AdminLoginSecure'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'))
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading } = useAdmin();
  
  if (isLoading) return <Loader />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  
  return <>{children}</>;
};

function App() {
  return (
    <HelmetProvider>
      <AdminProvider>
        <div className="min-h-screen bg-dark-primary">
          <Routes>
            {/* Admin Login Route (Public) */}
            <Route path="/admin/login" element={
              <Suspense fallback={<Loader />}>
                <AdminLoginSecure />
              </Suspense>
            } />
            
            {/* Protected Admin Route (Requires Auth) */}
            <Route path="/admin" element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <AdminDashboardComplete />
                </Suspense>
              </PrivateRoute>
            } />
            
            {/* Old Simple Admin Page */}
            <Route path="/admin/simple" element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <AdminPage />
                </Suspense>
              </PrivateRoute>
            } />
            
            {/* Old Protected Admin Routes */}
            <Route path="/admin/dashboard-old" element={
              <Suspense fallback={<Loader />}>
                <AdminLogin />
              </Suspense>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="projects/new" element={<AdminProjects />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
                  </Routes>
                </Suspense>
              </ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <ParticlesBackground />
                <Navbar />
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/cv" element={<CV />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </Suspense>
                <Footer />
                
                {/* Floating Simple Admin Button */}
                <AdminButtonSimple />
              </>
            } />
          </Routes>
          
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(0, 217, 255, 0.3)',
              },
            }}
          />
        </div>
      </AdminProvider>
    </HelmetProvider>
  )
}

export default App
