"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import axiosInstance from "@/utils/axios";
import { FaGithub } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axiosInstance.post("api/auth/login", { email, password });

      if (res.data?.accessToken) {
        router.push("/home");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-[#11244D] p-8 rounded-2xl shadow-lg w-96 text-white">
        <h2 className="text-center text-xl font-bold mb-6">Login with BrightMind</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <label className="block mb-2">Enter your Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <label className="block mb-2">Enter your password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white font-bold">
            Login
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-gray-400">Or join with</span>
        </div>

        <div className="flex justify-center space-x-4">
          <button onClick={() => signIn("google")} className="bg-gray-700 p-2 rounded hover:cursor-pointer">
            <AiFillGoogleCircle className="text-white" size={26} />
          </button>
          <button onClick={() => signIn("github")} className="bg-gray-700 p-2 rounded hover:cursor-pointer">
           <FaGithub className="text-white" size={26} />
           
          </button>
        </div>

        <p className="text-center text-gray-400 mt-4">
          don&apos;t have an account? <a href="/auth/signup" className="text-blue-400">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
