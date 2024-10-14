import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import img from "/images/auth/login.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginSchema } from "../../validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import fetchLogin from "../../apiLayer/fetch/fetchLogin";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useAuthStore } from "../../store/authStore";

const LoginForm = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate: loginMutation,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: fetchLogin, // Pass the function directly
    onSuccess: async (data) => {
      const docRef = doc(firestore, "users", data.localId);
      const docSnap = await getDoc(docRef);
      localStorage.setItem("user", JSON.stringify(docSnap.data()));
      localStorage.setItem("token", data.idToken);
      loginUser();
      navigate("/"); // Navigate to the homepage after login
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = async (data) => {
    console.log("Submitted data:", data); // Log the data to check if it's coming through
    loginMutation(data); // Call the mutate function with the data
  };

  return (
    <>
      <form
        className="flex justify-center items-start md:items-center text-white shadow-2xl rounded-3xl py-20 md:py-10 ps-5 w-full pe-5 lg:pe-10 min-h-screen"
        onSubmit={handleSubmit(onSubmit)} // Ensure form submits properly
      >
        <div className="block md:flex justify-between items-center py-4">
          <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-[55%]">
            <div className="flex flex-col items-start gap-3 w-full border border-pink-700 rounded-lg h-full py-8 px-6">
              <h1 className="text-2xl md:text-5xl font-semibold mx-auto mb-12">
                <span className="text-pink-500">Socio</span>
                <span className="text-purple-500">verse</span>
              </h1>

              {/* Email Input */}
              <div className="w-full h-[45px] md:h-[60px]">
                <div className="formInput flex gap-2 border-b-2 border-zinc-700">
                  <PersonIcon />
                  <input
                    type="email"
                    className="bg-transparent focus:outline-none w-full"
                    placeholder="Email"
                    {...register("email")} // Register the input
                  />
                </div>
                <p className="text-red-400 text-sm">{errors.email?.message}</p>
                {/* Validation error */}
              </div>

              {/* Password Input */}
              <div className="w-full h-[45px] md:h-[60px]">
                <div className="formInput flex gap-2 border-b-2 border-zinc-700">
                  <LockIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input bg-transparent focus:outline-none w-full"
                    placeholder="Password"
                    {...register("password")} // Register the input
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </button>
                </div>
                <p className="text-red-400 text-sm">
                  {errors.password?.message}
                </p>
                {/* Validation error */}
              </div>

              {/* Submit Button */}
              <button
                type="submit" // Ensure this button submits the form
                className="submit-btn rounded-md py-2 px-6 bg-sky-600 hover:bg-sky-800 w-full"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Log in"}
              </button>
            </div>

            {/* Sign-up Link */}
            <div className="flex items-center justify-center gap-1 w-full border border-purple-700 rounded-lg h-full py-6 px-8">
              <span>Don't have an account?</span>
              <button
                type="button"
                onClick={() => setIsLogin(false)} // Toggle to Sign-up form
                className="text-blue-400 hover:text-blue-300"
              >
                {isLoading ? <CircularProgress color="white" size={24} /> : "Sign up"}
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="ps-8 w-[45%] hidden lg:block shrink-0">
            <img
              src={img}
              alt="login/register"
              className="w-full border-8 border-pink-700 rounded-3xl"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
