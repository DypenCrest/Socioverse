import { Avatar, Skeleton } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { set } from "react-hook-form";

const PostList = ({ posts, isLoading }) => {
  console.log(posts, "props");
  const [visibleComments, setVisibleComments] = useState({});
  const toggleComments = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle visibility for the specific post
    }));
  };
  const options = ["Follow", "View profile"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(5000);
  const handleLikes = () => {
    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  };
  return (
    <div>
      <div class="flex flex-col items-center justify-center gap-8 w-full">
        {isLoading && (
          <div class="bg-zinc-900 p-4 rounded-lg shadow-md md:w-[500px] max-h-full text-white flex flex-col gap-4">
            <div class="flex items-center space-x-2 h-full w-full">
              <Skeleton
                sx={{ bgcolor: "grey.800" }}
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
              <div>
                <Skeleton
                  sx={{ bgcolor: "grey.800" }}
                  variant="text"
                  width={100}
                  animation="wave"
                />
                <Skeleton
                  sx={{ bgcolor: "grey.800" }}
                  variant="text"
                  width={150}
                  animation="wave"
                />
              </div>
            </div>
            <div className=" overflow-hidden">
              <Skeleton
                sx={{ bgcolor: "grey.800", width: "100%", height: "80px" }}
                variant="rounded"
                animation="wave"
              />
            </div>
            <div className=" overflow-hidden">
              <Skeleton
                sx={{ bgcolor: "grey.800", width: "100%", height: "250px" }}
                variant="rounded"
                animation="wave"
              />
            </div>
            <div>
            <Skeleton
              sx={{ bgcolor: "grey.800" }}
              variant="text"
              width={120}
              animation="wave"
            />
            <Skeleton
              sx={{ bgcolor: "grey.800" }}
              variant="text"
              width={200}
              animation="wave"
            />
            </div>
          </div>
        )}
        {posts?.map((post) => (
          <div class="bg-zinc-900 p-4 rounded-lg shadow-md md:w-[500px] max-h-full text-white">
            {/* <!-- User Info with Three-Dot Menu --> */}
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2 h-full w-full">
                <Avatar
                  alt="Jane Sharp"
                  src="https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg"
                />
                <div>
                  <p class=" font-semibold">Jane</p>
                  <p class="text-zinc-500 text-sm">Posted 2 hours ago</p>
                </div>
              </div>
              <div class="text-zinc-300 cursor-pointer">
                {/* <!-- Three-dot menu icon --> */}
                <IconButton
                  color="inherit"
                  className="hover:text-purple-500"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      sx: {
                        color: "#d4d4d8",
                        boxShadow: "none",
                        backgroundColor: "#27272a",
                        paddingInline: "5px",
                      },
                    },
                  }}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#424245",
                        },
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
            {/* <!-- description --> */}
            <div class="mb-4">
              <p class="text-zinc-300">
                Feeling fresh and fine!
                <br />
                <a href="" class="text-blue-400">
                  #Beauty
                </a>
              </p>
            </div>
            {/* <!-- Image --> */}
            <div class="mb-4 w-full md:h-[350px] border border-zinc-800 bg-black flex items-center justify-center rounded-md overflow-hidden">
              <img
                src="https://imgv3.fotor.com/images/slider-image/A-blurry-close-up-photo-of-a-woman.jpg"
                alt="Post Image"
                class="w-full h-full object-contain rounded-md"
              />
            </div>
            {/* <!-- Like and Comment Section --> */}
            <div class="flex flex-col justify-between text-gray-400">
              <div class="flex items-center space-x-2">
                <button
                  onClick={handleLikes}
                  class="flex justify-center items-center gap-2 px-2 hover:bg-zinc-800 rounded-full p-1"
                >
                  {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  class="flex justify-center items-center gap-2 px-2 hover:bg-zinc-800 rounded-full p-1"
                >
                  <svg
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    class="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <span>{likes} likes</span>
                <span>View all 2000 comments</span>
              </div>
            </div>
            {/* leave Comment */}
            <div>
              <input
                type="text"
                placeholder="Add a comment..."
                className="mt-4 bg-transparent w-full focus:outline-none border-b border-zinc-700"
              />
            </div>
            <div className={`${visibleComments[post.id] ? "block" : "hidden"}`}>
              <hr class="mt-2 mb-2" />
              <p class="text-zinc-400 font-semibold">Comment</p>
              <hr class="mt-2 mb-2" />
              <div class="mt-4">
                {/* <!-- Comment 1 --> */}
                <div class="flex items-center space-x-2">
                  <img
                    src="https://placekitten.com/32/32"
                    alt="User Avatar"
                    class="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p class="text-gray-300 font-semibold">Jane Smith</p>
                    <p class="text-gray-400 text-sm">Lovely shot! 📸</p>
                  </div>
                </div>
                {/* <!-- Reply from John Doe with indentation --> */}
                <div class="flex items-center space-x-2 mt-2 ml-6">
                  <img
                    src="https://placekitten.com/40/40"
                    alt="User Avatar"
                    class="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p class="text-gray-300 font-semibold">John Doe</p>
                    <p class="text-gray-400 text-sm">
                      That little furball is from a local shelter. You should
                      check it out! 🏠😺
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
