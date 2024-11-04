import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, className, onClick }) => {
  return (
    <button className={`px-4 py-2 rounded ${className}`} onClick={onClick}>
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
    <div>
     <Button
      onClick={handleClick}
      className="bg-blue-500 text-white hover:bg-blue-600"
    >
      Login Page
    </Button> 
    </div>
  );
};

export default LoginButton;
