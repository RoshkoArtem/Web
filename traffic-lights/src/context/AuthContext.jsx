import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

// Заглушка, яку можна буде замінити на реальний URL Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwdlNK3A4BcRCG4HvUhpVN7gWpIGBtl8ONKTS2EjCvjyBVf11U0wYscowxB83rBAlwd/exec';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('tl_auth') === '1');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('tl_user_email') || '');

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('tl_auth', '1');
    } else {
      localStorage.removeItem('tl_auth');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('tl_user_email', userEmail);
    } else {
      localStorage.removeItem('tl_user_email');
    }
  }, [userEmail]);

  const login = async (username, password) => {
    if (username && password) {
      if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL') {
        try {
          const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
          const data = await response.json();
          if (data?.status === 'ok') {
            setIsAuthenticated(true);
            setUserEmail(username);
            return { success: true };
          } else {
            return { success: false, error: data?.message || 'Помилка авторизації' };
          }
        } catch (err) {
          console.error('Failed to authenticate with Google Sheets', err);
          return { success: false, error: 'Помилка підключення до API авторизації' };
        }
      } else {
        // Fallback
        setIsAuthenticated(true);
        setUserEmail(username);
        return { success: true };
      }
    }
    return { success: false, error: 'Вкажіть email і пароль' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
