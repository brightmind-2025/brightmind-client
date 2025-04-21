"use client";

import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../style/style";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/lib/features/authApi";
import toast from "react-hot-toast";

type Props = {};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Signup: FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [register, { data, error, isSuccess }] = useRegisterMutation();
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      router.push("/auth/verifyOtp");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Registration failed");
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({name, email, password }) => {
      const data = { name,email, password };

      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="flex justify-center items-center h-screen  light:bg-white bg-gray-900">
      <div className="bg-[#11244D] p-8 rounded-2xl shadow-lg w-96 text-white">
        <h2 className="text-center text-xl font-bold mb-6">
          Join to <span className="text-yellow-500">Bright</span>Mind
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {" "}
            <label className={styles.label} htmlFor="email">
              Enter your Name
            </label>
            <input
              type="name"
              name=""
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="John"
              className={`${
                errors.name && touched.name && "border-red-500"
              } w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"`}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
          </div>
          <label className={styles.label} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${
              errors.email && touched.email && "border-red-500"
            } w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label className={styles.label} htmlFor="password">
              Enter your Password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password!@%"
              className={`${
                errors.password && touched.password && "border-red-500"
              } ${styles.input}`}
            />
            {!show ? (
              <AiOutlineEye
                className="absolute bottom-3 right-2 2-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 2-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
          <div className="w-full mt-5">
            <input
              type="submit"
              value="Sign Up"
              className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold"
            />
          </div>
          <br />
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            or join with
          </h5>
          <div className="flex items-center justify-center my-3">
            <FcGoogle size={30} className="cursor-pointer mr-2" />
            <AiFillGithub size={30} className="cursor-pointer ml-2" />
          </div>

          <div>
            <p className="text-center text-gray-400 mt-4">
              already have an account?{" "}
              <a href="/auth/signup" className="text-blue-400">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
