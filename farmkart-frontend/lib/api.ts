const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
    body?: any; 
    token?: string; // Optional token field
}

const api = async (url: string, options: RequestOptions = {}) => {
    try {
        // Prepare headers
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        // Automatically add token from localStorage if not provided in options
        const token = options.token || (typeof window !== "undefined" ? localStorage.getItem("access_token") : null);
        console.log('token used',token);

        if(token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        else{
            console.warn("No token found in localstorage")
        }

        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error(`API error: ${error.message || error}`);
        throw error; 
    }
};

export default api;
