import React from "react";
import { axiosInstance } from "../api";

const fetchPosts = async () => {
  try {
    const res = await axiosInstance.get("/posts");
    console.log(res.data.documents, "fetchposts");
    return res.data.documents;
  } catch (error) {
    console.log(error);
  }
};

export default fetchPosts;
