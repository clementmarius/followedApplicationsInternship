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
      console.log('Token récupéré:', token); // Vérification du token
      if (!token) {
        throw new Error("Token manquant");
      }

      // Envoi de la requête avec le token dans l'en-tête Authorization
      const response = await axios.get("http://localhost:3000/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Ajout de l'en-tête Authorization
        },
        withCredentials: true, // Assurez-vous que les cookies sont envoyés avec la requête
      });

      setUser(response.data); // Stocker les informations de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur connecté : ", error);
      setUser(null); // Réinitialiser l'utilisateur en cas d'erreur
      if (error.response && error.response.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
      } else {
        setError("Erreur lors de la récupération de l'utilisateur connecté.");
      }
    } finally {
      setLoading(false); // Mettre à jour l'état de chargement
    }
  };

  useEffect(() => {
    fetchApi(); // Appeler la fonction pour récupérer l'utilisateur
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
