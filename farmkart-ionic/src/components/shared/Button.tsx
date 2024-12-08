import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: JSX.Element;
  className?: string;
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
