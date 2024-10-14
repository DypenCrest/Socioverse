import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../../hooks/useLogout";
import { useAuthStore } from "../../store/authStore";
import SidebarItems from "./SidebarItems/SidebarItems";

const Sidebar = () => {
  const { handleLogOut } = useLogout();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  console.log(user, "users");

  return (
    <div className="flex bg-black z-10 w-full flex-col gap-2 md:gap-10 bg-red md:h-screen border-b md:border-r border-zinc-700 py-4 md:py-8 fixed md:sticky  top-0 left-0 px-2 md:px-8">
      <h1
        className="font-billabong text-4xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Socioverse
      </h1>
      {/* sidebar contents */}
      <SidebarItems />
      <button
        onClick={() => handleLogOut()}
        className="hidden md:flex items-center justify-center md:justify-start space-x-2 hover:bg-zinc-900 w-full p-2 rounded-lg mt-auto"
      >
        <LogoutIcon fontSize="large" />
        <span className="hidden lg:block">Log out</span>
      </button>
    </div>
  );
};

export default Sidebar;
