import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string; // Text to display on the button
  onClick?: () => void; // Function to handle click events
  icon?: JSX.Element; // Optional icon
  className?: string; // Additional class names for customization
}

const Button: React.FC<ButtonProps> = ({ text, onClick, icon, className }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      <span className="button-content">
        {text}
        {icon && <span className="button-icon">{icon}</span>}
      </span>
    </button>
  );
};

export default Button;
