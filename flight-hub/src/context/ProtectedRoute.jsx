// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // You might want to return a loading spinner or something similar here
        return <div>Loading...</div>;
    }

    if (!user) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;