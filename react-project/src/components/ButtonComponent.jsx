import React from "react";
import "./components_css/ButtonComponent.css";
import "./components_css/CardComp.css";

const ButtonComponent = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="buttonClass">
      {label}
    </button>
  );
};

export default ButtonComponent;
