'use client';
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/app/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function onSubmit(data) {
        const { email, password, name, photo } = data;
        const defaultAvatar = `https://i.pravatar.cc/300`;

        await authClient.signUp.email({
            email,
            password,
            name,
            image: photo || defaultAvatar,
        }, {
            onRequest: () => {
                toast.info("Creating account...");
            },
            onSuccess: () => {
                toast.success("Registration successful!");
                window.location.href = "/";
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "Registration failed");
            }
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-white border-gray-300 rounded-xl w-80 border p-6 shadow-lg">
                    <legend className="fieldset-legend font-extrabold text-2xl text-orange-600 px-2">Create Account</legend>

                    <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input 
                          {...register("name", { required: true })} 
                          type="text" 
                          placeholder="Your Name" 
                          className={`input input-bordered w-full focus:border-orange-500 ${errors.name ? 'border-red-500' : ''}`} 
                        />
                    </div>

                    <div className="form-control w-full mt-2">
                        <label className="label">
                          <span className="label-text font-semibold">Email</span>
                        </label>
                        <input 
                          {...register("email", { required: true })} 
                          type="email" 
                          placeholder="name@example.com" 
                          className={`input input-bordered w-full focus:border-orange-500 ${errors.email ? 'border-red-500' : ''}`} 
                        />
                    </div>

                    <div className="form-control w-full mt-2">
                        <label className="label">
                          <span className="label-text font-semibold">Profile Image URL</span>
                        </label>
                        <input 
                          {...register("photo")} 
                          type="text" 
                          placeholder="Leave blank for default" 
                          className="input input-bordered w-full focus:border-orange-500" 
                        />
                    </div>

                    <div className="form-control w-full mt-2">
                        <label className="label">
                          <span className="label-text font-semibold">Password</span>
                        </label>
                        <input 
                          {...register("password", { required: true, minLength: 6 })} 
                          type={showPass ? "text" : "password"} 
                          placeholder="••••••••" 
                          className={`input input-bordered w-full focus:border-orange-500 ${errors.password ? 'border-red-500' : ''}`} 
                        />
                    </div>

                    <div className="flex items-center gap-2 mt-3 ml-1">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-xs checkbox-warning" 
                          onChange={() => setShowPass(!showPass)} 
                        />
                        <span 
                          className="text-xs text-gray-600 font-medium cursor-pointer" 
                          onClick={() => setShowPass(!showPass)}
                        >
                          Show Password
                        </span>
                    </div>

                    <button 
                      type="submit" 
                      className="btn bg-orange-600 hover:bg-orange-700 text-white w-full mt-6 border-none"
                    >
                      Register
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            Already have an account? 
                            <Link href="/login" className="ml-1 text-orange-600 font-bold hover:underline">
                              Login
                            </Link>
                        </p>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;