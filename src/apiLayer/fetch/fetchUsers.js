import { axiosInstance } from "../api";

const fetchUsers = async () => {
  const res = await axiosInstance.get("users");

  return res.data.documents;
};

export default fetchUsers;
