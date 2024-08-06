import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Allows you to share authentication data (e.g., user info, login status) throughout your component tree.
export const AuthContext = createContext();

// This component will manage the authentication state and provide it to other components via the context.
export const AuthProvider = ({ children }) => {
    // Initialize a state variable user to store the currently logged-in user information
    const [user, setUser] = useState(null);

    // Start with true to show a loading state until authentication status is resolved.
    const [loading, setLoading] = useState(false);
    
    // Checks user status
    useEffect(() => {
        const checkUserStatus = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get('http://127.0.0.1:5000/current_user'); 
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        };

        checkUserStatus();
    }, []);

    const register = async (name, email, password) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', { name, email, password });
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            return { message: 'Registration failed', success: false };
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const login = async (email, password) => {
        setLoading(true); // Start loading
        try {
            // Make an HTTP POST request to the /login endpoint with the provided email and password
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password }, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user);
            }
            return response.data;
        } catch (error) {
            // If an error occurs during the login request, return an object indicating the failure
            return { message: 'Login failed', success: false };
        }
        finally {
            setLoading(false); // Stop loading
        }
    };

    const logout = async () => {
        setLoading(true); // Start loading
        try {
            // Make an HTTP POST request to the /logout endpoint to log the user out.
            await axios.post('http://127.0.0.1:5000/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            // If an error occurs during the logout request, log it to the console
            console.error('Logout error:', error);
        }
        finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        // Use the AuthContext.Provider to provide the authentication context to the rest of the app
        // Gives user, login, logout, loading in an object
        // {children} represents the components that will consume this context.
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}