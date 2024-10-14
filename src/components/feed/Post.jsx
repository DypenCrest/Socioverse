import React, { useState } from "react";
import useLikePost from "../../hooks/useLikePost";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useQuery } from "@tanstack/react-query";
import fetchUserDetail from "../../apiLayer/fetch/fetchUserDetail";

const Post = ({ postData, authorId }) => {
  const { data } = useQuery({
    queryKey: ["user-detail",authorId],
    queryFn: () => fetchUserDetail(authorId),
  });
const author = data?.fields
  console.log(author, "author");
  const postCreatedDate = postData?.createdAt?.toDate();
  const postCreatedAt = dayjs(postCreatedDate).fromNow();
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
  const { handleLikePost, isLiked, likes } = useLikePost(postData);
  console.log(likes, "likes");
  return (
    <div className="bg-zinc-900 p-4 rounded-lg shadow-md w-full md:w-[500px] max-h-full text-white">
      {/* <!-- User Info with Three-Dot Menu --> */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 h-full w-full">
          <Avatar
            alt={author?.username?.stringValue}
            src={author?.profilePicURL?.stringValue}
          />
          <div>
            <p className=" font-semibold">{author?.username?.stringValue}</p>
            <p className="text-zinc-500 text-sm">{postCreatedAt}</p>
          </div>
        </div>
        <div className="text-zinc-300 cursor-pointer">
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
      <div className="mb-4">
        <p className="text-zinc-300">
          {postData?.caption}
          <br />
        </p>
      </div>
      {/* <!-- Image --> */}
      {postData?.imageURL && (
        <div className="mb-4 w-full md:h-[350px] border border-zinc-800 bg-black flex items-center justify-center rounded-md overflow-hidden">
          <img
            src={postData?.imageURL}
            alt="Post Image"
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      )}

      {/* <!-- Like and Comment Section --> */}
      <div className="flex flex-col justify-between text-gray-400">
        <div className="flex items-center space-x-2">
          <button onClick={handleLikePost}>
            {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
          </button>
          {likes > 0 && <span>{likes} likes</span>}
        </div>
      </div>
    </div>
  );
};

export default Post;
