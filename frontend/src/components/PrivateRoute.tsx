import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // Vérifier si l'utilisateur est authentifié
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Si non authentifié, rediriger vers la page de connexion
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si authentifié, afficher le contenu
  return <>{children}</>;
};

export default PrivateRoute;
