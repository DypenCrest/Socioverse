import { axiosInstance, axiosAuthInstance, axiosStorageInstance } from "../api";

const deleteUser = async (userId) => {
  const token = localStorage.getItem("token");
  const URL = "accounts:delete?key=AIzaSyB_YjEl6eDxTLBlVxIwFwiZeYXocMKqPvs";
  try {
    const res = await axiosAuthInstance.post(URL, {
      idToken: token,
    });
    await axiosInstance.delete(`users/${userId}`);
    await axiosStorageInstance.delete(`profilePics%2F${userId}`);
    console.log(res.data, "deleteUser");
  } catch (error) {
    console.log(error.message);
  }
};

export default deleteUser;
