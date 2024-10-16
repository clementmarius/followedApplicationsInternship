import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    navigate('/login');
  };

  if (!user) return <p>Chargement du profil...</p>;

  return (
    <div>
      <h1>Bienvenue, {user.name}!</h1>
      <p>Email : {user.email}</p>
      {/* Affichez d'autres informations de l'utilisateur si nécessaire */}
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Profile;
