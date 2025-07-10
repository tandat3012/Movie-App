import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login, logout, createAccount } from '../appwrite';

// Create the Auth Context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Export the provider as a named export
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Error checking user session:', error);
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const value = {
        currentUser,
        login: async (email, password) => {
            try {
                const session = await login(email, password);
                const user = await getCurrentUser();
                setCurrentUser(user);
                return session;
            } catch (error) {
                throw error;
            }
        },
        logout: async () => {
            try {
                await logout();
                setCurrentUser(null);
            } catch (error) {
                throw error;
            }
        },
        signup: async (email, password, name) => {
            try {
                const user = await createAccount(email, password, name);
                setCurrentUser(user);
                return user;
            } catch (error) {
                throw error;
            }
        },
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Export the AuthProvider component as the default export
export default AuthProvider;
