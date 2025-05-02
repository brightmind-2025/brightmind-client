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
import { useLoginMutation } from "@/lib/features/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Login: FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error, data }] = useLoginMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const userRole = data.user?.role;
      toast.success("Login successful");

      // Redirect based on user role
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Login failed");
      }
    }
  }, [isSuccess, error, data, router]);

  // Handle social login redirections
  const handleSocialLogin = (provider: string) => {
    // We can't determine the user role before login with social providers
    // So we'll redirect them based on role after authentication in your _app.js or layout.js
    signIn(provider, { callbackUrl: "/auth/redirect" });
  };

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="flex justify-center items-center h-screen light:bg-white bg-gray-900">
      <div className="bg-[#11244D] p-8 rounded-2xl shadow-lg w-96 text-white">
        <h2 className="text-center text-xl font-bold mb-6">
          Login with <span className="text-yellow-500">Bright</span>Mind
        </h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            name="email"
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
            {errors.password && touched.password && (
              <span className="text-red-500 pt-2 block">{errors.password}</span>
            )}
          </div>
          <div className="w-full mt-5">
            <input
              type="submit"
              value="Login"
              className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold"
            />
          </div>
          <br />
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            or join with
          </h5>
          <div className="flex items-center justify-center my-3">
            <FcGoogle
              size={30}
              className="cursor-pointer mr-2"
              onClick={() => handleSocialLogin("google")}
            />
            <AiFillGithub
              size={30}
              className="cursor-pointer ml-2"
              onClick={() => handleSocialLogin("github")}
            />
          </div>

          <div>
            <p className="text-center text-gray-400 mt-4">
              don&apos;t have an account?{" "}
              <a href="/auth/signup" className="text-blue-400">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
