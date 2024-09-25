import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const sidebarItems = [
    { icon: <HomeIcon fontSize="large" />, name: "Home", path: "/" },
    { icon: <SearchIcon fontSize="large" />, name: "Search", path: "/" },
    {
      icon: <AddBoxOutlinedIcon fontSize="large" />,
      name: "Create",
      path: "/",
    },
    {
      icon: <NotificationsIcon fontSize="large" />,
      name: "Notifications",
      path: "/",
    },
    {
      icon: (
        <Avatar
          alt="Dipen Shrestha"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 30, height: 30, mx: 0.3, my: 0.4 }}
        />
      ),
      name: "Profile",
      path: "/",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex bg-black z-10 w-full flex-col gap-2 md:gap-10 bg-red md:h-screen border-b md:border-r border-zinc-700 py-4 md:py-8 fixed md:sticky  top-0 left-0 px-2 md:px-8">
      <h1
        className="font-billabong text-4xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Socioverse
      </h1>
      <div className="flex md:flex-col items-center md:items-start justify-between md:gap-6 bg-red">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center justify-center md:justify-start space-x-2 hover:bg-zinc-900 w-full p-2 rounded-lg"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="hidden lg:block">{item.name}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => navigate("/auth")}
        className="hidden md:flex items-center justify-center md:justify-start space-x-2 hover:bg-zinc-900 w-full p-2 rounded-lg mt-auto"
      >
        <LogoutIcon fontSize="large" />
        <span className="hidden lg:block">Log out</span>
      </button>
    </div>
  );
};

export default Sidebar;
