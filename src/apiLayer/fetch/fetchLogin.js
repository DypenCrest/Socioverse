import { toast } from "react-toastify";
import { axiosAuthInstance } from "../api";

const fetchLogin = async (data) => {
  console.log(data, "data");
  try {
    const res = await axiosAuthInstance.post(
      "accounts:signInWithPassword?key=AIzaSyB_YjEl6eDxTLBlVxIwFwiZeYXocMKqPvs",
      data
    );
    console.log(res.data, "response");
    toast.success("Login Successful");
    return res.data; // Return the response data
  } catch (error) {
    const err = error.response.data.error.message;
    toast.error(err);
    return err;
  }
};

export default fetchLogin;
