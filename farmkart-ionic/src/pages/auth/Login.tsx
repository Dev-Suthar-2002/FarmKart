import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonItem,
  IonNote,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Login.css';
import Button from '../../components/shared/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();

  const handleLogin = async () => {
    setErrorMessage(null);
    try {
      const response = await axios.post('http://localhost:3002/auth/login', {
        email,
        password,
      });

      const expirationTime = Date.now() + 60 * 60 * 1000;
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('expiration_time', expirationTime.toString());

      toast.success('Login Successful', {
        style: {
          borderRadius: '8px',
          background: '#16a34a',
          color: '#fff',
        },
      });

      const redirectPath = response.data.user.role === 'farmer' ? '/dashboard' : '/home';
      history.push(redirectPath);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  const handleForgotPasswordClick = () => {
    history.push('/resetPassword');
  };

  return (
    <IonPage>
      <IonContent className="auth-page">
        <div className="auth-container">
          <h2 className="auth-title">Welcome Back!</h2>
          <form onSubmit={(e) => e.preventDefault()} className="auth-form space-y-6">
            {/* Email Input */}
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                type="email"
                required
              />
            </IonItem>
            <IonNote slot="error" color="danger">{errorMessage}</IonNote>

            {/* Password Input */}
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                type="password"
                required
              />
            </IonItem>

            {/* Error Message */}
            {errorMessage && <p className="auth-error">{errorMessage}</p>}

            {/* Forgot Password */}
            <p
              onClick={handleForgotPasswordClick}
              className="auth-forgot-password"
            >
              Forgot Password?
            </p>

            {/* Submit Button */}
            <button onClick={handleLogin} className="auth-button"> 
              Sign In
            </button>

            {/* Sign Up Button */}
            <button
              onClick={() => history.push('/auth/signup')}
              className="auth-button"
            >
              Create an Account
            </button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
