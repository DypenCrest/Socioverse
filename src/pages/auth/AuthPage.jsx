import React, { useState } from "react";
import LoginForm from "../../components/authentication/LoginForm";
import RegisterForm from "../../components/authentication/RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      
      {isLogin ? (
        <LoginForm setIsLogin={setIsLogin} />
      ) : (
        <RegisterForm setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export default AuthPage;
