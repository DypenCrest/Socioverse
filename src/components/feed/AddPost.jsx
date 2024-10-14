import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import DialogBox from "./dialog/DialogBox";

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {/* create post card  */}
      <div className="grid place-items-center py-4">
        <div className="p-4  shadow-md bg-zinc-900 rounded-lg w-full lg:w-[70%] text-zinc-400">
          <div className="flex items-center gap-4">
            <Avatar alt="Jane" src={user?.profilePicURL} />
            <div
              className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full cursor-pointer"
              onClick={handleOpen}
            >
              <h3 className="md:text-lg text-sm text-zinc-400">
                Whats on your mind, {user?.username} ?
              </h3>
            </div>
            <button
              type="button"
              onClick={handleOpen}
              className="hidden px-4 py-2 md:flex items-center  justify-center space-x-2 hover:bg-zinc-800 rounded-lg border-green-500 border"
            >
              <AddPhotoAlternateIcon sx={{ color: "green" }} />
              Photo
            </button>
            <button
              type="button"
              onClick={handleOpen}
              className="md:hidden px-4 py-2 flex items-center  justify-center space-x-2 hover:bg-zinc-800 rounded-lg border-green-500 border"
            >
              <AddPhotoAlternateIcon sx={{ color: "green" }} />
            </button>
          </div>
        </div>
      </div>

      {/* create post dialog  */}
      <DialogBox isOpen={isOpen} handleClose={handleClose} user={user} />
    </>
  );
};

export default AddPost;
