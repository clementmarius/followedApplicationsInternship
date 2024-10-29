import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();

    return (
        <contact style={{ textAlign: "center", padding: "1rem", borderTop: "1px solid #ddd" }}>
      <p>Contact</p>
      <button onClick={() => navigate("/contact")}>Voir la page du contact</button>
    </contact>
    )
}

export default Contact;