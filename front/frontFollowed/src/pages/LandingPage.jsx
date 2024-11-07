/* import React, { useContext } from "react";
import { StoreContext } from "../store";

const LandingPage = () => {
  const { state } = useContext(StoreContext);
  const { profile } = state.auth;

  return (
    <div>
      <h1>Welcome, {profile?.firstName || "Utilisateur"} !</h1>
      <p>You are loggedin to your account.</p>
      <div>
        <h2>Your personnal informations</h2>
        <p><strong>Name :</strong> {profile?.lastName}</p>
        <p><strong>Mail :</strong> {profile?.email}</p>
      </div>
    </div>
  );
};

export default LandingPage;
 */


// LandingPage.jsx
const LandingPage = () => {
  return (
    <div>
      <h1>Welcome on your account</h1>
      <p>You are loggedin to your account.</p>
      <h2>Your personnal informations</h2>
      <p><strong>Name :</strong> {profile?.lastName}</p>

    </div>
  );
};

export default LandingPage;
