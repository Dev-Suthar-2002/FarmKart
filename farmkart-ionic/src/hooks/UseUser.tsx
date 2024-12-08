import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    const expirationTime = localStorage.getItem('expiration_time');

    if (storedUser && token && expirationTime) {
      if (Date.now() < Number(expirationTime)) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
  }, []);

  const login = (userData: User, token: string, expirationTime: number) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', token);
    localStorage.setItem('expiration_time', expirationTime.toString());
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiration_time');
    setUser(null);
    setIsAuthenticated(false);
    history.push('/auth/login');
  };

  return { user, isAuthenticated, login, logout };
}
