import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchProfileData from "../apiLayer/fetch/fetchProfileData";

const useProfileData = (token) =>
  useQuery({
    queryKey: ["profileData"],
    queryFn: () => fetchProfileData(token),
  });

export default useProfileData;
