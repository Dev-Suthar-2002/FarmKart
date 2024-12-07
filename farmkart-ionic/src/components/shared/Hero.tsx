import React from 'react';
import { useHistory } from 'react-router-dom';
import './Hero.css';

interface HeroProps {
  backgroundImage: string; // Path to the background image
  title: string; // Main headline
  subtitle: string; // Subheading
  buttonText: string; // Button text
  buttonLink: string; // Link for the button
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  buttonLink,
}) => {
  const history = useHistory(); // Ionic's navigation hook

  const handleButtonClick = () => {
    history.push(buttonLink); // Navigate to the provided link
  };

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          {title}
        </h1>
        <p className="hero-subtitle">
          {subtitle}
        </p>
        <button className="hero-button" onClick={handleButtonClick}>
          <span className="button-overlay" />
          <span className="button-text">
            {buttonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="button-icon"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
