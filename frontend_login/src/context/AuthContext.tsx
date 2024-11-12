import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


export interface UserDataType {
  email: string;
  NIF: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  img: string | null;
  description: string;
  data_exist: boolean;
}

// Definir el tipo para el contexto
interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, userData: UserDataType) => void;
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
  const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(sessionStorage.getItem('refresh_token'));

  // Carga userData desde sessionStorage si está disponible
  const initialUserData = sessionStorage.getItem('user_data')
    ? JSON.parse(sessionStorage.getItem('user_data') as string)
    : null;
  const [userData, setUserData] = useState<UserDataType | null>(initialUserData);
  
  const navigate = useNavigate();

  const isAuthenticated = !!accessToken;

  const login = (newAccessToken: string, newRefreshToken: string, newUserData: UserDataType) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setUserData(newUserData);

    sessionStorage.setItem('access_token', newAccessToken);
    sessionStorage.setItem('refresh_token', newRefreshToken);
    sessionStorage.setItem('user_data', JSON.stringify(newUserData));

    navigate('/'); // Redirigir al dashboard
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user_data');

    navigate('/'); // Redirigir al login
  };

  // Efecto para cargar el token y userData desde sessionStorage al montar
  useEffect(() => {
    const savedAccessToken = sessionStorage.getItem('access_token');
    const savedRefreshToken = sessionStorage.getItem('refresh_token');
    const savedUserData = sessionStorage.getItem('user_data');

    if (savedAccessToken && savedRefreshToken && savedUserData) {
      setAccessToken(savedAccessToken);
      setRefreshToken(savedRefreshToken);
      setUserData(JSON.parse(savedUserData)); // Cargar userData desde sessionStorage
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken, refreshToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};