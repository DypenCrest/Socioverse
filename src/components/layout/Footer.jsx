import { Avatar } from "@mui/material";
import React from "react";
import useLogout from "../../hooks/useLogout";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import useUserList from "../../hooks/useUserList";

const Footer = () => {
  const { handleLogOut } = useLogout();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { userList } = useUserList();
  const suggestedUsers = userList
    ?.filter((users) => users?.fields?.username?.stringValue !== user?.username)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  return (
    <div className="flex flex-col gap-6 border-s border-zinc-700 h-screen sticky top-0 right-0 py-8 ps-8 pe-16">
      {/* user profile  */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => navigate(`${user?.username}`)}
          className="flex gap-4 cursor-pointer"
        >
          <Avatar alt={user?.username} src={user?.profilePicURL} />
          <h1 className="text-xl">{user?.username}</h1>
        </div>
        <button
          onClick={() => handleLogOut()}
          className="text-blue-500 hover:text-blue-300 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* suggested  */}
      <div className="flex justify-between items-center">
        <h1 className="text-zinc-400">Suggested for you</h1>
        <span className="hover:text-zinc-400 cursor-pointer">See All</span>
      </div>
      {/* suggested users to follow  */}
      {suggestedUsers?.map((suggestedUser) => {
        let sugUser = suggestedUser?.fields;
        return (
          <div
            key={sugUser?.uid?.stringValue}
            className="flex items-center justify-between"
          >
            <div
              className="flex gap-4 cursor-pointer"
              onClick={() => navigate(`${sugUser?.username?.stringValue}`)}
            >
              <Avatar
                alt={sugUser?.username?.stringValue}
                src={sugUser?.profilePicURL?.stringValue}
              />
              <h1 className="text-xl">{sugUser?.username?.stringValue}</h1>
            </div>
            <span className="text-blue-500 hover:text-blue-300 cursor-pointer">
              Follow
            </span>
          </div>
        );
      })}

      <div>
        <p className="text-zinc-500 text-xs">
          &copy; 2024 SOCIOVERSE FROM DIPEN SHRESTHA
        </p>
      </div>
    </div>
  );
};

export default Footer;
