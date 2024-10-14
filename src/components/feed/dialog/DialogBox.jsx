import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import usePreviewImg from "../../../hooks/usePreviewImg";
import useCreatePost from "../../../hooks/useCreatePost";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const DialogBox = ({ isOpen, handleClose, user }) => {
  const Imgref = useRef(null);
  const [selectedImg, setSelectedImg, handleImageChange] = usePreviewImg();
  const [createPost, isLoading] = useCreatePost();
  const [caption, setCaption] = useState("");
  const handlePost = async () => await createPost(caption, selectedImg);
  const queryClient = useQueryClient();
  const { mutate: postMutation } = useMutation({
    mutationFn: handlePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      handleClose();
    },
  });
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "white",
            bgcolor: "#18181b",
            display: "flex",
            justifyContent: "center",
            width: { xs: "330px", md: "100%" },
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
        <DialogContent
          sx={{
            bgcolor: "#18181b",
            width: {
              xs: "100%",
              md: "500px",
            },
          }}
        >
          {/* post author profile */}
          <div className="my-2 flex items-center space-x-2">
            <Avatar alt={user?.username} src={user?.profilePicURL} />
            <div>
              <h6 className="font-bold text-sm text-zinc-200">
                {user?.username}
              </h6>
            </div>
          </div>

          {/* create post interface */}
          <div className=" py-2">
            <div className="mb-4">
              <textarea
                className="w-full text-zinc-200 placeholder-zinc-500 text-xl focus:outline-none bg-zinc-900"
                rows="6"
                onChange={(e) => setCaption(e.target.value)}
                placeholder={`What's on your mind ${user?.username} ?`}
              />
            </div>

            <div className="flex items-center justify-center gap-6 border border-zinc-700 rounded-md text-white py-2">
              {selectedImg && (
                <div className="relative">
                  <img src={selectedImg} alt="selectedImage" />
                  <button
                    className="bg-red-600 rounded-md bg-opacity-40 absolute top-0 right-0"
                    onClick={() => setSelectedImg(null)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => Imgref.current.click()}
                className="px-4 py-2 flex items-center  justify-center space-x-2 hover:bg-zinc-800 rounded-lg border-green-500 border"
              >
                <AddPhotoAlternateIcon sx={{ color: "green" }} />
                Photo
                <input
                  type="file"
                  hidden
                  ref={Imgref}
                  onChange={handleImageChange}
                />
              </button>
            </div>
          </div>
          <DialogActions sx={{ paddingX: "0" }}>
            {caption || selectedImg ? (
              <button
                type="button"
                className="text-center w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  postMutation();
                  handleClose();
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size="30px" />
                ) : (
                  "Post"
                )}
              </button>
            ) : (
              <button
                type="button"
                className="text-center w-full py-2 rounded-lg bg-blue-900 cursor-not-allowed text-white"
                disabled
              >
                Post
              </button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogBox;
