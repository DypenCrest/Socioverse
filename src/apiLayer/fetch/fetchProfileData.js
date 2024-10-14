const fetchProfileData = async (token) => {
  try {
    const res = await axiosAuthInstance.get(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB_YjEl6eDxTLBlVxIwFwiZeYXocMKqPvs",
      {
        token,
      }
    );
    console.log(res.data, "response");
    return res.data;
  } catch (error) {
    const err = error.response.data.error.message;
    console.log(err, "error");
    return err;
  }
};

export default fetchProfileData;
