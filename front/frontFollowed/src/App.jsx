import './index.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Profile from './components/profile';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    try {
      const userCookie = Cookies.get('user');
      const token = localStorage.getItem('token');

      console.log("Token récupéré depuis localStorage:", token);
      console.log("Utilisateur récupéré depuis le cookie:", userCookie);


      if (!token) {
        throw new Error("Token manquant");
      }

      const response = await axios.get("http://localhost:3000/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur connecté : ", error);
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Router>
    <Routes>
      <Route path="/" element={user ? <Profile user={user} /> : <Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;
