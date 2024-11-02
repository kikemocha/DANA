import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


interface UserDataType {
  email: string;
  nickname: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  img: string | null;
  description: string;
}

// Definir el tipo para el contexto
interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  accessToken: string | null;
  refreshToken: string | null;
  userData: UserDataType | null;
  setUserData: (user: UserDataType | null) => void;
}

// Crear el contexto con valores por defecto
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  accessToken: null,
  refreshToken: null,
  userData : null,
  setUserData: () => {},
});



// Crear el hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Definir el tipo de las props del AuthProvider, incluyendo `children`
interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token'));
  const [userData, setUserData] = useState<UserDataType | null>(null);
  
  const navigate = useNavigate();

  const isAuthenticated = !!accessToken;  // Si tenemos accessToken, isAuthenticated = true

  const login = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem('access_token', newAccessToken);
    localStorage.setItem('refresh_token', newRefreshToken);
    navigate('/');  // Redirigir al dashboard
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');  // Redirigir al login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken, refreshToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};