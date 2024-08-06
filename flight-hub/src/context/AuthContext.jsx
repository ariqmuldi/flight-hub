import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// Allows you to share authentication data (e.g., user info, login status) throughout your component tree.
export const AuthContext = createContext();

// This component will manage the authentication state and provide it to other components via the context.
export const AuthProvider = ({ children }) => {
    // Initialize a state variable user to store the currently logged-in user information
    const [user, setUser] = useState(null);
    // Initialize a state variable loading to indicate whether authentication status is still being determined. 
    // Start with true to show a loading state until authentication status is resolved.
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     // Check if user is logged in when the app starts
    //     const checkAuth = async () => {
    //         try {
    //             // Make an HTTP GET request to the /current_user endpoint to get the current user's information. 
    //             // The withCredentials: true option ensures cookies (e.g., session cookies) are included in the request
    //             const response = await axios.get('http://127.0.0.1:5000/current_user', { withCredentials: true });
    //             setUser(response.data);
    //         } catch (error) {
    //             // If an error occurs (e.g., if the user is not logged in), set the user state to null
    //             setUser(null);
    //         } finally {
    //             // After the request completes (whether it succeeded or failed), 
    //             // set loading to false to indicate that the authentication check is complete
    //             setLoading(false);
    //         }
    //     };

    //     checkAuth();
    // }, []);
    
    useEffect(() => {
        // Example to check user status on component mount
        const checkUserStatus = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get('http://127.0.0.1:5000/current_user'); // Replace with your endpoint
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

    const login = async (email, password) => {
        setLoading(true); // Start loading
        try {
            // Make an HTTP POST request to the /login endpoint with the provided email and password
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password }, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data);
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