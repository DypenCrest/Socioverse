import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

import React from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const logoutUser = useAuthStore((state) => state.logout);
  const handleLogOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      logoutUser();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { handleLogOut, loading, error };
};

export default useLogout;
