// Button.jsx
import React from "react";

// Composant Button avec fonction de gestion du clic intégrée
const Button = ({ children, style, onClick }) => {
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
};

// Composant exporté LoginButton qui utilise le composant Button
const LoginButton = () => {
  const handleClick = () => {
    console.log("Button was clicked!");
  };

  return (
    <Button onClick={handleClick} style={{ backgroundColor: "blue", color: "white" }}>
      Click Me!
    </Button>
  );
};

export default LoginButton;

