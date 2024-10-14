import { zodResolver } from "@hookform/resolvers/zod";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSignup from "../../hooks/useSignup";
import { registerSchema } from "../../validation/validation";
import img from "/images/auth/login.png";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const RegisterForm = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const { loading, error, signup } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => signup(data);
  return (
    <form
      className="flex justify-center items-start md:items-center text-white shadow-2xl rounded-3xl py-20 md:py-10 ps-5 w-full  pe-5 lg:pe-10  min-h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="block md:flex justify-between items-center py-4">
        <div className="flex flex-col gap-4 items-center justify-center w-full  lg:w-[55%]">
          <div className="flex flex-col items-start gap-2 w-full border border-pink-700 rounded-lg h-full py-8 px-6">
            <h1 className="text-2xl md:text-5xl font-semibold mx-auto mb-12">
              <span className="text-pink-500">Socio</span>
              <span className="text-purple-500">verse</span>
            </h1>

            <div className="w-full h-[40px] md:h-[60px]">
              <div className="formInput flex gap-2 border-b-2 border-zinc-700 ">
                <PersonIcon />
                <input
                  name="username"
                  type="text"
                  className="bg-transparent focus:outline-none w-full"
                  placeholder="Username"
                  {...register("username")}
                />
              </div>
              <p className="text-red-400">{errors.username?.message}</p>
            </div>

            <div className="w-full h-[40px] md:h-[60px]">
              <div className="formInput flex gap-2 border-b-2 border-zinc-700 ">
                <EmailIcon />
                <input
                  name="email"
                  type="email"
                  className="bg-transparent focus:outline-none w-full "
                  placeholder="Email Address"
                  {...register("email")}
                />
              </div>
              <p className="text-red-400">{errors.email?.message}</p>
            </div>

            <div className="w-full h-[40px] md:h-[60px]">
              <div className="formInput flex gap-2 border-b-2 border-zinc-700 ">
                <PersonIcon />
                <input
                  name="fullName"
                  type="text"
                  className="bg-transparent focus:outline-none w-full"
                  placeholder="Fullname"
                  {...register("fullName")}
                />
              </div>
              <p className="text-red-400">{errors.fullName?.message}</p>
            </div>

            <div className=" w-full h-[40px] md:h-[60px]">
              <div className="formInput flex gap-2 border-b-2 border-zinc-700">
                <LockIcon />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input bg-transparent focus:outline-none w-full"
                  placeholder="Password"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              <p className="text-red-400">{errors.password?.message}</p>
            </div>

            <div className=" w-full h-[40px] md:h-[60px]">
              <div className="formInput flex gap-2 border-b-2 border-zinc-700">
                <LockIcon />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-input bg-transparent focus:outline-none w-full"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </button>
              </div>
              <p className="text-red-400">{errors.confirmPassword?.message}</p>
            </div>
            <button
              type="submit"
              className="submit-btn rounded-md py-2 px-6 bg-sky-600 hover:bg-sky-800 w-full"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="white" size={20} />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-1 w-full border border-purple-700 rounded-lg h-full py-6 px-8">
            <span>Already have an account?</span>
            <button
              className="text-blue-400 hover:text-blue-300"
              onClick={() => setIsLogin(true)}
            >
              Log in
            </button>
          </div>
        </div>

        <div className="ps-8 w-[45%] hidden lg:block shrink-0">
          <img
            src={img}
            alt="login/register"
            className="w-full  border-8 border-pink-700 rounded-3xl"
          />
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
