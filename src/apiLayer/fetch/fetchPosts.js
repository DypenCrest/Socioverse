import React from "react";
import axiosInstance from "../api";

const fetchPosts = async () => {
  try {
    const res = await axiosInstance.get("posts");
    console.log(res.data, "fetch");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchPosts;
