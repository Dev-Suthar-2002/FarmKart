'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProfileForm from '@/components/shared/UpdateProfile';
import api from '@/lib/api';
import ImageContainer from '@/components/shared/ImageContainer';

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
}

const FarmerProfilePage = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api(`/farmer/${id}`);
                setUserData(response);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <ImageContainer />
            <ProfileForm user={{ ...userData, role: 'farmer' }} />
        </div>

    );
};

export default FarmerProfilePage;