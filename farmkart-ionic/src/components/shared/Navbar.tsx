import React from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const history = useHistory();

  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogin = () => {
    console.log("Redirecting to /auth/login");
    history.replace("/auth/login");
  };

  const handleLogout = () => {
    console.log("Logging out and redirecting to /landing");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiration_time");

    history.replace("/landing");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src="/Assets/farmkartLogo.png" alt="Farmkart Logo" className="navbar-logo" />
      </div>

      {/* Login or Logout Button */}
      {isLoggedIn ? (
        <Button
          text="Log Out"
          onClick={handleLogout}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="button-icon"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      ) : (
        <Button
          text="Log In"
          onClick={handleLogin}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="button-icon"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385  0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      )}
    </div>
  );
};

export default Navbar;