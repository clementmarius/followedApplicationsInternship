import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulaire soumis avec :', { email, password });
    try {
      const response = await axios.post('http://localhost:3000/user/login/auth', {
        email,
        password,
      }, { withCredentials: true }); 

      console.log('Réponse du serveur :', response.data);

      const token = response.data.token; 
      console.log("Token into the cookies:", token); 

      if (token) {
        Cookies.set('token', token, { expires: 1 }); 
        console.log("Token into the cookies:", token); 
        navigate('/profile/me'); 
      }
    } catch (error) {
      console.error('Connection error :', error);
      setError('Mail or password wrong'); 
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
