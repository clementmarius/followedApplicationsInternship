import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Profile from './components/profile';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, loading, error } = useContext(AuthContext);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Routes>
      <Route path="/" element={user ? <Profile user={user} /> : <Login />} />
      <Route path="/login" element={<Login />} />
      {/* Ajoutez d'autres routes protégées ici */}
    </Routes>
  );
}

export default App;
