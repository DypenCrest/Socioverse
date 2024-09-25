import React from "react";
import axiosInstance from "../api";

const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");
    console.log(res.data, "fetch");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUsers;
