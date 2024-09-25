import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import img from "/images/auth/login.png";
import { useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
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
            </div>

            {isLogin ? (
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
              </div>
            ) : null}

            <div className=" w-full h-[40px] md:h-[60px]">
              <div className="formInput flex gap-2 border-b-2 border-zinc-700">
                <LockIcon />
                <input
                  name="password"
                  type="password"
                  className="form-input bg-transparent focus:outline-none w-full"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
            </div>
            {isLogin ? (
              <div className=" w-full h-[40px] md:h-[60px]">
                <div className="formInput flex gap-2 border-b-2 border-zinc-700">
                  <LockIcon />
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-input bg-transparent focus:outline-none w-full"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                  />
                </div>
              </div>
            ) : null}
            {isLogin ? (
              <button
                type="submit"
                className="submit-btn rounded-md py-2 px-6 bg-sky-600 hover:bg-sky-800 w-full"
              >
                Sign Up
              </button>
            ) : (
              <button
                type="submit"
                className="submit-btn rounded-md py-2 px-6 bg-sky-600 hover:bg-sky-800 w-full"
              >
                Log in
              </button>
            )}
          </div>
          <div className="flex items-center justify-center gap-1 w-full border border-purple-700 rounded-lg h-full py-6 px-8">
            {isLogin ? (
              <span>Already have an account?</span>
            ) : (
              <span>Don't have an account?</span>
            )}

            {isLogin ? (
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-400 hover:text-blue-300"
              >
                Log in
              </button>
            ) : (
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-400 hover:text-blue-300"
              >
                Sign up
              </button>
            )}
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

export default LoginForm;
