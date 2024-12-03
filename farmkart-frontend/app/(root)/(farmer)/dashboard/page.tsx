'use client';

import React from "react";
import { useUser } from "@/lib/userContext";

function page() {
  const { user, accessToken } = useUser();

    return(
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">This is dashboard</h1>
      {user ? (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    {/* Display other user information here */}
                </div>
            ) : (
                <p>Please log in to see your dashboard.</p>
            )}
            {accessToken && <p>Your access token is stored.</p>}
    </div>
    )
}

export default page;