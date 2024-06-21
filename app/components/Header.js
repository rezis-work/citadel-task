import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";

const Header = () => {
  return (
    <header className="flex justify-between w-[1000px] mx-auto py-10">
      <h1 className=" text-lg font-bold ">
        <Link href={"/"}>Citadeli</Link>
      </h1>
      <nav>
        <ul className=" flex gap-3">
          <NavLink route={"user"} text={"users"} />
          <NavLink route={"task"} text={"tasks"} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
