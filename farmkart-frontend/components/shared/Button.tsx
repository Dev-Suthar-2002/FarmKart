import React from 'react';

interface ButtonProps {
    onClick?: () => void; // Optional click handler
    type?: 'button' | 'submit' | 'reset'; // Button type
    className?: string; // Additional classes for styling
    style?: React.CSSProperties; // Inline styles
    children: React.ReactNode; // Content of the button
    disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    type = 'button',
    className = '',
    style,
    children,
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={disabled ? undefined : onClick}
            className={`relative text-white font-semibold rounded-lg py-3 overflow-hidden transition-transform transform hover:scale-110 focus:outline-none ${className}`}
            style={style}
            disabled={disabled}
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute top-0 left-[-100%] w-[300%] h-full bg-white opacity-20 transform skew-x-[-30deg] transition-all duration-600 ease-in-out hover:left-full"></span>
        </button>
    );
};

export default Button;