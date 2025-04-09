"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { useAppDispatch } from "../hooks/dispatchHook";
import { activateUser } from "@/lib/thunks/authThunks";
import { axiosErrorCatch } from "@/utils/axios";

const VerifyOtp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activationToken, setActivationToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("activationToken");
    if (token) {
      setActivationToken(token);
    } else {
      setError("No activation token found. Please register again.");
    }
  }, []);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    try {
      const result = (await dispatch(
        activateUser({
          activation_code: otpValue,
          activation_token: activationToken,
        })
      ).unwrap()) as { success: boolean };

      if (result.success) {
        localStorage.removeItem("activationToken");
        router.push("/auth/login");
      }
    } catch (err) {
      setError(axiosErrorCatch(err));
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-sm p-8 bg-[#142952] rounded-3xl shadow-lg space-y-6 text-center">
        <div className="flex justify-center">
          <FaCheckCircle className="text-4xl text-green-500 mb-4" />
        </div>

        <h1 className="text-xl font-semibold">Verify Your Account</h1>

        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="flex justify-center gap-3">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-bold border border-gray-500 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full transition duration-300 shadow-md"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-gray-300 text-sm">
          Go back to sign in?{" "}
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
