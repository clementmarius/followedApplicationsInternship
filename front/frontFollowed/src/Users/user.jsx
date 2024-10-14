/* import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api");
      setArray(response.data.fruits);
      console.log(response.data.fruits);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      {array.map((fruit, index) => (
        <div key={index}>
          <p>{fruit}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default App;
 */