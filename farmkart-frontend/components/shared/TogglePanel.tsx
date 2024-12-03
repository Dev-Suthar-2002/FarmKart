import React from 'react';

interface TogglePanelProps {
    title: string;
    description: string;
    onToggle: () => void;
}

const TogglePanel: React.FC<TogglePanelProps> = ({ title, description, onToggle }) => {
    return (
        <div className="text-center mt-8 p-6 border border-gray-200 rounded-lg shadow-lg bg-white transition-transform hover:scale-105 hover:shadow-2xl">
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide mb-2">
                {title}
            </h1>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {description}
            </p>
            <button
                className="relative w-full text-white font-semibold rounded-lg py-3 overflow-hidden transition-transform transform hover:scale-110 focus:outline-none button-glow"
                style={{
                    background: 'linear-gradient(to right, #727543, #797142)',
                }}
                onClick={onToggle}
            >
                <span className="absolute top-0 left-[-100%] w-[300%] h-full bg-white opacity-20 transform skew-x-[-30deg] transition-all duration-600 ease-in-out hover:left-full"></span>
                {title.includes('Welcome Back!') ? 'Sign In' : 'Sign Up'}
            </button>
        </div>
    );
};


export default TogglePanel;