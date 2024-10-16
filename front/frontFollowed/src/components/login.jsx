import React, { useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

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
      if (token) {
        Cookies.set('token', token, { expires: 1 });
        console.log("Token stocké dans les cookies:", token);
        
        const userCookie = Cookies.get('user');
        if (userCookie) {
          setUser(JSON.parse(userCookie));
        } else {
          const userResponse = await axios.get("http://localhost:3000/profile/me", {
            withCredentials: true,
          });
          setUser(userResponse.data);
        }
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Email ou mot de passe incorrect.');
      }
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
