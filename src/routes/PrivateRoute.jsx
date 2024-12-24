import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/shared/Loading';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading/>;
  }

  if (!user || !localStorage.getItem('access-token')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

