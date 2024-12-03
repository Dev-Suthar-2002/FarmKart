import React, { forwardRef } from 'react';

// Define the props interface
interface InputFieldProps {
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    error?: string;
    value?: string; // Add value prop
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
    // Additional props can be added as needed
}

const Input = forwardRef<HTMLInputElement, InputFieldProps>(({ type = 'text', id, name, placeholder, error, value, onChange, ...rest }, ref) => (
    <div>
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            ref={ref} // Forward the ref
            value={value} // Set the value prop
            onChange={onChange} // Set the onChange prop
            className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-400"
            {...rest} // Spread the rest of the props
        />
        {error && <p className="text-red-500">{error}</p>}
    </div>
));

Input.displayName = 'Input'; // Set a display name for debugging

export default Input;