import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, className, onClick }) => {
  return (
    <button className={`px-4 py-2 rounded ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const RegisterButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Register button was clicked!");
    navigate("registerPage");
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        className="bg-amber-500 text-white hover:bg-amber-600"
      >
        Register Page
      </Button>
    </div>
  );
};

export default RegisterButton;
