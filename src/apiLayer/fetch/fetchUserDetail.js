import { axiosInstance } from "../api";

const fetchUserDetail = async (userId) => {
  const res = await axiosInstance.get(`users/${userId}`);
  return res.data;
};

export default fetchUserDetail;
