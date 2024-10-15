import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  const fetchApi = async () => {
    try {
      const token = localStorage.getItem('token');  
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
    <div>
      {user ? (
        <div>
          <h1>Bienvenue, {`${user.profile.firstName} ${user.profile.lastName}`}</h1>
          <p>Email : {user.email}</p>
        </div>
      ) : (
        <p>Aucun utilisateur connecté.</p>  
      )}
    </div>
  );
}

export default App;
