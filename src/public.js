import React, { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const PublicRoutes = ({ children }) => {
  const navigate = useNavigate()
  const isAuthenticated = useMemo(() => {
    let token = localStorage.getItem('Token');


    if (!token) {
      return children;
    } else {
      return <Navigate to="/" />
    }
  }, [children]);

  return isAuthenticated;
};

export default PublicRoutes;
