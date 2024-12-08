import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Signup.css';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'customer',
    bio: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = async () => {
    setErrorMessage(null);
    try {
      const response = await axios.post('http://localhost:3002/auth/register', formData);

      toast.success('Signup Successful', {
        style: {
          borderRadius: '8px',
          background: '#16a34a',
          color: '#fff',
        },
      });

      history.push('/auth/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <IonPage>
      <IonContent className="auth-page">
        <div className="auth-container">
          <h2 className="auth-title">Create an Account</h2>
          <form onSubmit={(e) => e.preventDefault()} className="auth-form">
            {/* Name */}
            <IonItem>
              <IonLabel position="floating">Full Name</IonLabel>
              <IonInput
                value={formData.name}
                onIonChange={(e) => handleInputChange('name', e.detail.value!)}
                type="text"
                required
              />
            </IonItem>

            {/* Email */}
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                value={formData.email}
                onIonChange={(e) => handleInputChange('email', e.detail.value!)}
                type="email"
                required
              />
            </IonItem>

            {/* Password */}
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                value={formData.password}
                onIonChange={(e) => handleInputChange('password', e.detail.value!)}
                type="password"
                required
              />
            </IonItem>

            {/* Phone */}
            <IonItem>
              <IonLabel position="floating">Mobile Number</IonLabel>
              <IonInput
                value={formData.phone}
                onIonChange={(e) => handleInputChange('phone', e.detail.value!)}
                type="tel"
                required
              />
            </IonItem>

            {/* Address */}
            <IonItem>
              <IonLabel position="floating">Address</IonLabel>
              <IonInput
                value={formData.address}
                onIonChange={(e) => handleInputChange('address', e.detail.value!)}
                type="text"
                required
              />
            </IonItem>

            {/* Bio */}
            <IonItem>
              <IonLabel position="floating">Bio (Optional)</IonLabel>
              <IonTextarea
                value={formData.bio}
                onIonChange={(e) => handleInputChange('bio', e.detail.value!)}
              />
            </IonItem>

            {/* Role */}
            <IonItem>
              <IonLabel>Role</IonLabel>
              <IonSelect
                value={formData.role}
                onIonChange={(e) => handleInputChange('role', e.detail.value!)}
              >
                <IonSelectOption value="farmer">Farmer</IonSelectOption>
                <IonSelectOption value="customer">Customer</IonSelectOption>
              </IonSelect>
            </IonItem>

            {/* Error Message */}
            {errorMessage && <p className="auth-error">{errorMessage}</p>}

            {/* Submit Button */}
            <button onClick={handleSignup} className="auth-button">
              Sign Up
            </button>

            {/* Already Have an Account */}
            <button
              onClick={() => history.push('/auth/login')}
              className="auth-button"
            >
              Already have an account? Log In
            </button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
