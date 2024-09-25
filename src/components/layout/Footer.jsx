import { Avatar } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col gap-6 border-s border-zinc-700 h-screen sticky top-0 right-0 py-8 ps-8 pe-16">
      {/* user profile  */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 cursor-pointer">
          <Avatar
            alt="Jane"
            src="https://imgv3.fotor.com/images/slider-image/A-blurry-close-up-photo-of-a-woman.jpg"
          />
          <h1 className="text-xl">Jane</h1>
        </div>
        <span className="text-blue-500 hover:text-blue-300 cursor-pointer">
          Logout
        </span>
      </div>

      {/* suggested  */}
      <div className="flex justify-between items-center">
        <h1 className="text-zinc-400">Suggested for you</h1>
        <span className="hover:text-zinc-400 cursor-pointer">See All</span>
      </div>
      {/* suggested users to follow  */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 cursor-pointer">
          <Avatar
            alt="Jane"
            src="https://imgv3.fotor.com/images/slider-image/A-blurry-close-up-photo-of-a-woman.jpg"
          />
          <h1 className="text-xl">Jane</h1>
        </div>
        <span className="text-blue-500 hover:text-blue-300 cursor-pointer">
          Follow
        </span>
      </div>
    </div>
  );
};

export default Footer;
