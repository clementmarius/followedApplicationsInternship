// src/components/Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ textAlign: "center", padding: "1rem", borderTop: "1px solid #ddd" }}>
      <p>Footer</p>
      <button onClick={() => navigate("/footer")}>Voir la page du footer</button> {/* Changer la route */}
    </footer>
  );
};

export default Footer;
