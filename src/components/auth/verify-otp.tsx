"use client";
import { useActivationMutation } from "@/lib/features/authApi";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

type Props = {};
type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};
const Verification: FC<Props> = (props: Props) => {
  const { token } = useSelector((state: any) => state.auth);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const router = useRouter();
  const [activation, { data, error, isSuccess }] = useActivationMutation();
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Account activated successfully";
      toast.success(message);
      router.push("/auth/login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Account activation failed");
        setInvalidError(true);
      }else {
        console.log(error);
      }
    }
  }, [isSuccess, error]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };
  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-sm p-8 bg-[#142952] rounded-3xl shadow-lg space-y-6 text-center">
        <div className="flex justify-center">
          <FaCheckCircle className="text-4xl text-green-500 mb-4" />
        </div>

        <h1 className="text-xl font-semibold">Verify Your Account</h1>

        <div className="1100px:w-[70%] m-auto flex items-center justify-around">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              key={key}
              ref={inputRefs[index]}
              type="number"
              className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                invalidError
                  ? " border-red-500 shake"
                  : "dark:border-white border-[#0000004a]"
              }`}
              placeholder=""
              maxLength={1}
              value={verifyNumber[key as keyof VerifyNumber]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <br />
        <div className="w-full justify-center">
          <button
            onClick={verificationHandler}
            className="w-full py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] text-[16px] font-Poppins font-semibold"
          >
            Verify OTP
          </button>
        </div>
        <h5 className="text-gray-300 text-base">
          Go back to sign in?{" "}
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </h5>
      </div>
    </div>
  );
};
export default Verification;
