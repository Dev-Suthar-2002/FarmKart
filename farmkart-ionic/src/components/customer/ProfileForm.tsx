import React, { useState } from 'react';
import { IonInput, IonLabel, IonButton, IonItem, IonList } from '@ionic/react';
import axios from 'axios';
import './ProfileForm.css';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

interface ProfileFormProps {
  user: User;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setErrors({ name: '', phone: '', address: '' });

    if (!formData.name || !formData.phone || !formData.address) {
      setErrors({
        name: !formData.name ? 'Name is required' : '',
        phone: !formData.phone ? 'Phone number is required' : '',
        address: !formData.address ? 'Address is required' : '',
      });
      return;
    }

    const token = localStorage.getItem('access_token') || '';

    try {
      await axios.patch(
        `http://localhost:3002/customer/${user._id}`, // Use the user ID from props
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile-form-container">
      <h2 className="text-center">Profile</h2>
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput
            name="name"
            value={formData.name}
            onIonChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            name="email"
            value={formData.email}
            readonly
            placeholder="Enter your email"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Phone</IonLabel>
          <IonInput
            name="phone"
            value={formData.phone}
            onIonChange={handleChange}
            placeholder="Enter your phone"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Address</IonLabel>
          <IonInput
            name="address"
            value={formData.address}
            onIonChange={handleChange}
            placeholder="Enter your address"
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Role</IonLabel>
          <IonInput name="role" value={formData.role} readonly />
        </IonItem>
      </IonList>

      <IonButton expand="block" onClick={handleSubmit}>
        Update Profile
      </IonButton>
    </div>
  );
};

export default ProfileForm;
