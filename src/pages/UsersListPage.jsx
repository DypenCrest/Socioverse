import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchUsers from "../apiLayer/fetch/fetchUsers";
import UserSearchList from "../components/userSearch/userSearchList";
import useUserList from "../hooks/useUserList";

const UsersListPage = () => {
  const { userList } = useUserList();
  console.log(userList, "userList");
  return (
    <div className="py-10  md:px-[10em]">
      <UserSearchList userList={userList} />
    </div>
  );
};

export default UsersListPage;
