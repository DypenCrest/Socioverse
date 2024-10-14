import React from "react";
import fetchUsers from "../apiLayer/fetch/fetchUsers";
import { useQuery } from "@tanstack/react-query";

const useUserList = () => {
  const {
    data: userList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
  return { userList, isLoading, error };
};

export default useUserList;
