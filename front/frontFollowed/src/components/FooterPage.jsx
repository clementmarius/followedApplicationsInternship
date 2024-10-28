import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const FooterPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Page du Footer</h1>
      <p>Contenu supplémentaire ici.</p>

      {/* Bouton pour retourner à la page de connexion */}
      <button onClick={() => navigate("/")}>Retour à la connexion</button>

      {/* Affichage du footer */}
      <Footer />
    </div>
  );
};

export default FooterPage;
