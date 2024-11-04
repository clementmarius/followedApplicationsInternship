import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, style, onClick }) => {
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
};

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Button was clicked!");
    navigate("loginPage");
  };

  return (
    <Button
      onClick={handleClick}
      style={{ backgroundColor: "blue", color: "white" }}
    >
      Login Page
    </Button>
  );
};

export default LoginButton;
