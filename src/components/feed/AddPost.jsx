import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      {/* create post card  */}
      <div className="grid place-items-center py-4">
        <div className="p-4  shadow-md bg-zinc-900 rounded-lg w-full lg:w-[70%] text-zinc-400">
          <div className="flex items-center gap-4">
            <Avatar
              alt="Jane"
              src="https://imgv3.fotor.com/images/slider-image/A-blurry-close-up-photo-of-a-woman.jpg"
            />
            <div
              className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full cursor-pointer"
              onClick={handleOpen}
            >
              <h3 className="md:text-lg text-zinc-400">
                Whats on your mind, Harsh ?
              </h3>
            </div>
          </div>
          <hr className="mt-3 mb-3" />
          <div className="grid grid-cols-2 gap-4">
            <button className="px-4 py-2 flex items-center  justify-center space-x-2 hover:bg-zinc-800 rounded-lg border-green-500 border">
              <AddPhotoAlternateIcon sx={{ color: "green" }} />
              Photo/Video
            </button>
            <button className="px-4 py-2 flex items-center  justify-center space-x-2 hover:bg-zinc-800 rounded-lg border-pink-500 border">
              <LibraryMusicIcon sx={{ color: "pink" }} />
              Music/Audio
            </button>
          </div>
        </div>
      </div>

      {/* create post dialog  */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "white",
            bgcolor: "#18181b",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Create Post
        </DialogTitle>
        {/* dialog close icon button  */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <hr />
        {/* dialog body  */}
        <DialogContent sx={{ bgcolor: "#18181b", width: "500px" }}>
          {/* post author profile */}
          <div className="my-2 flex items-center space-x-2">
            <img
              src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
              className="w-[50px] rounded-full"
            />
            <div>
              <h6 className="font-bold text-sm text-zinc-200">
                Harsh Mangalam
              </h6>
            </div>
          </div>

          {/* create post interface */}
          <div className=" py-2">
            <div className="mb-4">
              <textarea
                className="w-full text-zinc-200 placeholder-zinc-500 text-xl focus:outline-none bg-zinc-900"
                rows="6"
                placeholder="What's on your mind Jane ?"
              />
            </div>

            <div className="flex items-center justify-center gap-6 border border-zinc-700 rounded-md text-white py-2">
              <button className="px-4 py-2 flex items-center  justify-center space-x-2 hover:bg-zinc-800 rounded-lg border-green-500 border">
                <AddPhotoAlternateIcon sx={{ color: "green" }} />
                Photo/Video
              </button>
              <button className="px-4 py-2 flex items-center  justify-center space-x-2 hover:bg-zinc-800 rounded-lg border-pink-500 border">
                <LibraryMusicIcon sx={{ color: "pink" }} />
                Music/Audio
              </button>
            </div>
          </div>
          <DialogActions sx={{ paddingX: "0" }}>
            <button className="text-center w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">
              Post
            </button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPost;
