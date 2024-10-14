import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const UserSearchList = ({ userList }) => {
  console.log(userList, "propsuserlist");
  const [searchValue, setSearchValue] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  console.log(authUser, "authstore");
  const navigate = useNavigate();
  console.log(filteredUserList);
  useEffect(() => {
    setFilteredUserList(userList);
  }, [userList]);
  const handleSearch = () => {
    setFilteredUserList(
      userList.filter((user) =>
        user?.fields?.username?.stringValue
          ?.toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    );
  };
  const handleFollow = (username) => {
    setFollowedUsers((prev) =>
      prev.includes(username)
        ? prev.filter((user) => user !== username)
        : [...prev, username]
    );
  };

  return (
    <div className=" flex flex-col items-center justify-start space-y-12">
      <form
        className=" flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="flex items-center justify-center space-x-1 bg-zinc-800 rounded-md p-1">
          <SearchIcon />
          <input
            className="bg-zinc-800 focus:outline-none py-1 px-3 border-s"
            type="search"
            placeholder="Search User..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="bg-pink-700 hover:bg-pink-900 px-4 py-2 rounded-md"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-col items-start w-full space-y-6">
        {filteredUserList?.map((user) => {
          const username = user?.fields?.username?.stringValue;
          const isFollowed = followedUsers.includes(username);
          return (
            <div
              key={user?.fields?.uid?.stringValue}
              className="w-full border rounded-md p-4 border-pink-500 hover:shadow-pink-500 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex space-x-6 cursor-pointer"
                  onClick={() => navigate(`/${username}`)}
                >
                  <Avatar
                    alt="Jane"
                    src={user?.fields?.profilePicURL?.stringValue}
                    sx={{ width: 50, height: 50 }}
                  />
                  <div>
                    <h1 className="text-xl">
                      {user?.fields?.username?.stringValue}
                    </h1>
                    <h2>{user?.fields?.fullName?.stringValue}</h2>
                  </div>
                </div>
                {authUser?.username !== username && (
                  <span
                    onClick={() => handleFollow(username)}
                    className="text-blue-500 hover:text-blue-300 cursor-pointer"
                  >
                    {isFollowed ? "Unfollow" : "Follow"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSearchList;
