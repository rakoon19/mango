'use client';
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });
            const failed = !result || result.error || result.status === 401;
            if (failed) {
                const message = result?.error?.message || result?.message || "Invalid login information. Please try again.";
                toast.error(message);
                return;
            }
            toast.success("Login successful!");
            router.push("/");
        } catch (err) {
            toast.error("Invalid login information. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-white border-gray-300 rounded-xl w-80 border p-6 shadow-lg">
                    <legend className="fieldset-legend font-extrabold text-2xl text-orange-600 px-2">Login</legend>

                    <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-semibold">Email Address</span>
                        </label>
                        <input 
                          {...register("email", { required: true })} 
                          type="email" 
                          placeholder="example@mail.com" 
                          className={`input input-bordered w-full focus:border-orange-500 ${errors.email ? 'border-red-500' : ''}`} 
                        />
                    </div>

                    <div className="form-control w-full mt-2">
                        <label className="label">
                          <span className="label-text font-semibold">Password</span>
                        </label>
                        <input 
                          {...register("password", { required: true })} 
                          type={showPass ? "text" : "password"} 
                          placeholder="Enter Password" 
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
                      disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-md" /> : 'Login'}
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            Don&apos;t have an account? 
                            <Link href="/register" className="ml-1 text-orange-600 font-bold hover:underline">
                              Register
                            </Link>
                        </p>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;