//Utilisation du fetch pour importer la route profile/me

import { useState } from "react";

// LandingPage.jsx
const LandingPage = () => {
  const [name, email] = useState("");

  const displayProfile = async () => {
    console.log("display profile");
    const response = await fetch("http://localhost:3000/profile/me", {
      method: "GET",

    })
  };

  return (
    <div>
      <h1>Welcome on your user account</h1>
      <p>You are logged in to your account.</p>
      <h2>Your personnal informations</h2>
      <p>
        <strong>Name :</strong>{" "}
      </p>
      <p>
        <strong>Mail :</strong>{" "}
      </p>
    </div>
  );
};

export default LandingPage;
