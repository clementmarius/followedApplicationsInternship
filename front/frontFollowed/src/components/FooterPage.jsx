import React from "react";
import { useNavigate } from "react-router-dom";

const FooterPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Page du Footer</h1>
      <p>Contenu supplémentaire ici.</p>

      <button onClick={() => navigate("/")}>Retour à la connexion</button>

    </div>
  );
};

export default FooterPage;
