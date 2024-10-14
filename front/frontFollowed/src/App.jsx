import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [array, setArray] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user");
      setArray(response.data.users);  
      console.log(response.data.users);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
      setError("Erreur lors de la récupération des utilisateurs.");
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchApi();  
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;  
  if (error) return <p>{error}</p>; 

  return (
    <div>
      {array.length > 0 ? (
        array.map((user, index) => (
          <div key={index}>
            <p>{user}</p>
            <br />
          </div>
        ))
      ) : (
        <p>Aucun utilisateur trouvé.</p>  
      )}
    </div>
  );
}

export default App;
