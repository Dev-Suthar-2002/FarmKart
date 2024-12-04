import React from "react";
import { useUser } from "./userContext";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { user } = useUser();
    const router = useRouter();

    React.useEffect(() => {
        if(!user) {
            router.push("/");
        }
        else if (!allowedRoles.includes(user.role)) {
            router.push("/");
        }
    },[user, allowedRoles, router]);

    if (!user || !allowedRoles.includes(user.role)) {
        return <p>Loading...</p>;
    }

    return(
        <>
            {children}
        </>
    )
}

export default ProtectedRoute;