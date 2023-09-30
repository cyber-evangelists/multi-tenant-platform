import React, { useState } from "react";
import UsersTable from "../components/UsersTable";
import UserStore from "../components/UserStore";

function MainPage() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  console.log(role);
  return <div>{role == "user" ? <UserStore /> : <UsersTable />}</div>;
}

export default MainPage;
