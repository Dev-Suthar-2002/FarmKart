import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Input from "../shared/Input";
import Button from "../shared/Button";
import toast from "react-hot-toast";

interface RegisterUserDto {
    email: string;
    password: string;
    name: string;
    role: "farmer" | "customer";
    phone: string;
    address: string;
    bio?: string;
}

const SignUpForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterUserDto>();
    const router = useRouter();

    const onSubmit = async (data: RegisterUserDto) => {
        try {
            const response = await api("/auth/register", {
                method: "POST",
                body: data,
            });

            // Save user data to localStorage (if needed)
            localStorage.setItem("user", JSON.stringify(response));

            toast.success("Signup Successful", {
                style: {
                  borderRadius: "8px",
                  background: "#16a34a",
                  color: "#fff",
                }
            });

            // Reset form
            reset();

            // Redirect to login page after successful signup
            router.push("/login");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Create an Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <Input
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                    error={errors.name?.message}
                />

                {/* Email */}
                <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    error={errors.email?.message}
                />

                {/* Password */}
                <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })}
                    error={errors.password?.message}
                />

                {/* Phone */}
                <Input
                    type="tel"
                    id="phone"
                    placeholder="Mobile Number"
                    {...register("phone", { required: "Phone number is required" })}
                    error={errors.phone?.message}
                />

                {/* Address */}
                <Input
                    type="text"
                    id="address"
                    placeholder="Address"
                    {...register("address", { required: "Address is required" })}
                    error={errors.address?.message}
                />

                {/* Bio */}
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio (for farmers only)
                    </label>
                    <textarea
                        id="bio"
                        {...register("bio")}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
                        placeholder="Tell us about yourself (optional)"
                    />
                </div>

                {/* Role */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        id="role"
                        {...register("role", { required: "Role is required" })}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
                    >
                        <option value="">Select role</option>
                        <option value="farmer">Farmer</option>
                        <option value="customer">Customer</option>
                    </select>
                    {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg hover:shadow-xl hover:bg-gradient-to-l focus:outline-none transition-all duration-300"
                    style={{
                        background: 'linear-gradient(to right, #727543, #797142)',
                    }}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUpForm;
