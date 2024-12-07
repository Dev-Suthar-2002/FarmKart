'use client';

import { useState } from 'react';
import Button from '../shared/Button';
import api from '@/lib/api';
import { useRouter } from "next/navigation";
import Input from './Input';


const ForgotPasswordForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP, 3: Reset Password
    const [errors, setErrors] = useState({
        email: '',
        otp: '',
        newPassword: '',
        reNewPassword: '',
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleReNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReNewPassword(e.target.value);
    };

    const requestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api('/auth/forgotPassword', {
                method: 'POST',
                body: { email },
            });
            setStep(2); // Move to OTP verification step
        } catch (error) {
            console.error('Error sending OTP', error);
            setErrors(prev => ({ ...prev, email: 'Error sending OTP. Please try again.' }));
        }
    };

    const verifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api('/auth/verifyOtp', {
                method: 'POST',
                body: { email, otp },
            });
            setStep(3);
        } catch (error) {
            console.error('Error verifying OTP', error);
            setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
        }
    };
    const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== reNewPassword) {
            setErrors(prev => ({ ...prev, newPassword: 'Passwords do not match.' }));
            return;
        }
        try {
            const response = await api('/auth/resetPassword', {
                method: 'POST',
                body: { email, otp, newPassword },
            });
            router.push("/login")
        } catch (error) {
            console.error('Error resetting password', error);
            setErrors(prev => ({ ...prev, newPassword: 'Error resetting password. Please try again.' }));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                {step === 1 && (
                    <form onSubmit={requestOtp} className="space-y-6">
                        <h1 className="text-3xl font-bold text-center text-gray-800">Forgot Password</h1>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            required />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        <Button
                            type="submit"
                            style={{ background: 'linear-gradient(to right, #727543, #797142)', width: '100%' }}
                        >
                            Request OTP
                        </Button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={verifyOtp} className="space-y-6">
                        <h1 className="text-3xl font-bold text-center text-gray-800">Verify OTP</h1>
                        <Input
                            type="text"
                            name="otp"
                            placeholder="Enter the OTP sent to your email"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                        />
                        {errors.otp && <p className="text-red-500">{errors.otp}</p>}
                        <Button type="submit" style={{ background: 'linear-gradient(to right, #727543, #797142)', width: '100%' }}>
                            Verify
                        </Button>
                    </form>
                )}
                {step === 3 && (
                    <form onSubmit={resetPassword} className="space-y-6">
                        <h1 className="text-3xl font-bold text-center text-gray-800">Reset Password</h1>
                        <Input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                        />
                        {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
                        <Input
                            type="password"
                            name="reNewPassword"
                            placeholder="Re-enter New Password"
                            value={reNewPassword}
                            onChange={handleReNewPasswordChange}
                            required
                        />
                        <Button type="submit" style={{ background: 'linear-gradient(to right, #727543, #797142)', width: '100%' }}>
                            Update Password
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordForm;