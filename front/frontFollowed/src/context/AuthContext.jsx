import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error("Token manquant");
      }

      const response = await axios.get("http://localhost:3000/profile/me", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur connecté : ", error);
      setUser(null);
      if (error.response && error.response.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
      } else {
        setError("Erreur lors de la récupération de l'utilisateur connecté.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
