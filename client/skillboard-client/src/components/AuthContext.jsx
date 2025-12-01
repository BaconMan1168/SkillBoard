import { createContext, useState, useEffect } from 'react';
import { api, setAuthToken } from '../api';

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

const initialToken = localStorage.getItem('token');
if (initialToken) {
    setAuthToken(initialToken);
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(initialToken);
    const [loading, setLoading] = useState(true);

    const login = (newToken) => setToken(newToken);
    const logout = () => setToken(null);

    useEffect(() => {
        async function fetchUser(){
            if (!token) {
                setUser(null);
                setLoading(false);
                setAuthToken(null);
                localStorage.removeItem('token');
                return;
            }

            try {
                localStorage.setItem('token', token);
                setAuthToken(token);
                setLoading(true);

                const res = await api.get('/user');
                setUser(res.data);
            } 
            catch (err) {
                console.error('Failed to fetch user profile:', err);
                logout(); 
            } 
            finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [token]);
    
    if (loading && token) {
        return <div>Loading user session...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
