'use client';

import { useState } from 'react';
import api from '@/lib/api'; // Ensure your API utility is imported correctly
import Input from '../shared/Input';
import Button from '../shared/Button';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

export interface User {
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

const ProfileForm = ({ user }: ProfileFormProps) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        role: user.role || '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ name: '', email: '', phone: '', address: '' }); // Reset errors
        setSuccessMessage(''); // Reset success message

        if (!formData.name || !formData.phone || !formData.address) {
            setErrors((prev) => ({
                ...prev,
                name: !formData.name ? 'Name is required' : '',
                phone: !formData.phone ? 'Phone number is required' : '',
                address: !formData.address ? 'Address is required' : '',
            }));
            return;
        }

        const apiUrl = formData.role === 'farmer' ? `/farmer/${user._id}` : `/customer/${user._id}`;
        const token = localStorage.getItem('access_token') || '';

        console.log('Sending data:', formData);
        console.log('Using token:', token); // Log the token

        try {
            const response = await api(apiUrl, {
                method: 'PATCH',
                body: formData,
                token,
            });

            toast.success("Profile updated successfully", {
                style: {
                    borderRadius: "8px",
                    background: "#16a34a",
                    color: "#fff",
                }
            });

            router.push('/dashboard');

        } catch (error) {
            console.error('Error updating profile:', error);
            const errorMessage = (error as Error).message || 'An unknown error occurred';
            setErrors((prev) => ({ ...prev, name: errorMessage }));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl flex flex-col">
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                <form id="profileForm" className="space-y-6" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold text-center text-gray-800">Profile</h1>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                    <Input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                    />
                    <div className="flex items-center">
                        <label className="mr-4">Role:</label>
                        <span className="border border-gray-300 rounded-lg p-2">{formData.role}</span> {/* Read-only role field */}
                    </div>
                    <Button type="submit" style={{ background: 'linear-gradient(to right, #727543, #797142)', width: '100%' }}>
                        Update Profile
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;