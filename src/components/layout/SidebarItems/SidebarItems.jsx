import React, { useState } from "react";
import DialogBox from "../../feed/dialog/DialogBox";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Avatar from "@mui/material/Avatar";
import { useAuthStore } from "../../../store/authStore";

const SidebarItems = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  console.log(authUser, "authUser");
  const sidebarItems = [
    {
      icon: <HomeIcon fontSize="large" />,
      name: "Home",
      func: () => navigate("/"),
    },
    {
      icon: <SearchIcon fontSize="large" />,
      name: "Search",
      func: () => navigate("/users"),
    },
    {
      icon: <AddBoxOutlinedIcon fontSize="large" />,
      name: "Create",
      func: handleDialogOpen,
    },
    {
      icon: (
        <Avatar
          alt={authUser?.username}
          src={authUser?.profilePicURL}
          sx={{ width: 30, height: 30, mx: 0.3, my: 0.4 }}
        />
      ),
      name: authUser?.username,
      func: () => navigate(`/${authUser?.username}`),
    },
  ];

  return (
    <div className="flex md:flex-col items-center md:items-start justify-between md:gap-6 bg-red">
      {sidebarItems?.map((item, index) => (
        <button
          key={index}
          className="flex items-center justify-center md:justify-start space-x-2 hover:bg-zinc-900 w-full p-2 rounded-lg"
          onClick={() => item?.func()}
        >
          {item?.icon}
          <span className="hidden lg:block">{item?.name}</span>
        </button>
      ))}
      <DialogBox
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
        user={authUser}
      />
    </div>
  );
};

export default SidebarItems;
