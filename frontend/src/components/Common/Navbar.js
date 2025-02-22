import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./Logout";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userData = useSelector((state) => state.users);
  console.log(userData);

  return (
    <nav class="bg-gray-800 p-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={"/dashboard"} class="text-white text-lg font-semibold">
          {userData?.name} - {userData?.role}
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
