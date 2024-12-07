'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@/lib/userContext';

const useTokenExpiration = () => {
    const router = useRouter();
    const { logout } = useUser();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const expirationTime = localStorage.getItem("expiration_time");
            if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
                // Token has expired
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                localStorage.removeItem("expiration_time");
                logout();
                toast.error("Session Timeout. Please log in again.", {
                    style: {
                        borderRadius: "8px",
                        background: "#dc2626",
                        color: "#fff",
                    },
                });
                router.push("/login");
            }
        };

        checkTokenExpiration();

        const interval = setInterval(checkTokenExpiration, 60 * 1000);

        return () => clearInterval(interval);
    }, [router, logout]);
};

export default useTokenExpiration;