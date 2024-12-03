
'use client'
import { useUser } from "@/lib/userContext"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  const { user } = useUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
        if (!user) {
            router.push("/login"); 
        } else if (user.role !== "customer") {
            router.push("/"); 
        } else {
              setIsChecking(false);
        }
    }, 500);

    return () => clearTimeout(timeout);
  }, [user, router]);

  if (isChecking || !user || user.role !== "customer") {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
