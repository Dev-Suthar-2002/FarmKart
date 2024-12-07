import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';
import axios from 'axios';
import ProfileForm from '../../components/customer/ProfileForm';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('user');
      if (!token || !user) return;

      try {
        const parsedUser = JSON.parse(user);
        const userId = parsedUser._id;
        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        const response = await axios.get(`http://localhost:3002/customer/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="flex items-center justify-center">
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  if (!userData) {
    return (
      <IonPage>
        <IonContent className="flex items-center justify-center">
          <p>No user data found</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Navbar />
      <IonContent>
        <ProfileForm user={userData} />
      </IonContent>

    </IonPage>
  );
};

export default ProfilePage;
