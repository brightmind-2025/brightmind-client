"use client";

import { useState } from "react"; import { useRouter } from "next/navigation";
 import { signIn } from "next-auth/react"; 

import { AiFillGoogleCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export default function Signup() { const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(null); const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setError(null);

const res = await fetch("http://localhost:4004/api/user/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name, email, password }),
});

const data = await res.json();

if (!res.ok) {
  setError(data.message || "Something went wrong.");
} else {
  router.push("/home");
}

};

return ( <div className="flex justify-center items-center h-screen bg-gray-900"> <div className="bg-[#11244D] p-8 rounded-2xl shadow-lg w-96 text-white"> <h2 className="text-center text-xl font-bold mb-6">Join to BrightMind</h2> {error && <p className="text-red-500 text-center mb-4">{error}</p>}

<form onSubmit={handleSubmit}>
      <label className="block mb-2">Enter your Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        required
      />

      <label className="block mb-2">Enter your Email</label>
      <input
        type="email"
        placeholder="enter your email"
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
        Signup
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
      Already have an account? <a href="/auth/login" className="text-blue-400">Sign in</a>
    </p>
  </div>
</div>

); }