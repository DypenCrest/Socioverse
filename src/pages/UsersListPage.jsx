import React from "react";
import useUserList from "../hooks/useUserList";
import UserSearchList from "../components/userSearch/UserSearchList";

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
