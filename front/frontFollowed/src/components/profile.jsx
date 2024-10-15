// Profile.jsx
import React from 'react';

function Profile({ user }) {
  return (
    <div>
      <h1>Bienvenue, {user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : "Utilisateur"}</h1>
      <p>Email : {user.email}</p>
    </div>
  );
}

export default Profile;
