
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { AiFillGoogleCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { registerUser } from "@/lib/thunks/authThunks";
import { useAppDispatch } from "../hooks/dispatchHook";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      localStorage.setItem("activationToken", result.activationToken);
      if (result.success) {
        router.push("/auth/verifyOtp");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-[#11244D] p-8 rounded-2xl shadow-lg w-96 text-white">
        <h2 className="text-center text-xl font-bold mb-6">
          Join to BrightMind
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Enter your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <label className="block mb-2">Enter your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <label className="block mb-2">Enter your password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white font-bold"
          >https://github.com/brightmind-2025/brightmind-client/pull/12/conflict?name=src%252Fcomponents%252Fauth%252Fsignup.tsx&base_oid=c67a0a554729ce08bf1a294c38d374b7bbe2d4dc&head_oid=ce3a2aeca553fc68f492c3dd65c5716adcbb6319
            Signup
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-gray-400">Or join with</span>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => signIn("google")}
            className="bg-gray-700 p-2 rounded hover:cursor-pointer"
          >
            <AiFillGoogleCircle className="text-white" size={26} />
          </button>
          <button
            onClick={() => signIn("github")}
            className="bg-gray-700 p-2 rounded hover:cursor-pointer"
          >
            <FaGithub className="text-white" size={26} />
          </button>
        </div>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-400">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
