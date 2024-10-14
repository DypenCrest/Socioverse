import React, { useState } from "react";
import EditProfileForm from "../components/user/EditProfileForm";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import deleteUser from "../apiLayer/delete/deleteUser";
import { useAuthStore } from "../store/authStore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ProfileEditPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/auth");
    },
  });
  return (
    <div className="py-12  md:px-[10em]">
      <EditProfileForm />
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleClickOpen}
          className="bg-red-600 hover:bg-red-900 px-6 py-3 w-full rounded-md flex justify-center items-center"
        >
          <DeleteOutlineIcon />
          Delete this account
        </button>
        <button className="bg-pink-600 hover:bg-pink-900 px-6 py-3 w-full rounded-md flex justify-center items-center">
          <LogoutIcon />
          Logout
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure? <br />
            <span className="text-red-500">Delete: {authUser?.username}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingInline: "2em",
          }}
        >
          <button
            className="bg-zinc-800 rounded-md py-1 px-3 hover:bg-zinc-700"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-900 rounded-md py-1 px-3"
            onClick={() => deleteMutation(authUser?.uid)}
            autoFocus
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileEditPage;
