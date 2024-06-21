import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between w-[1000px] mx-auto py-10">
      <h1 className=" text-lg font-bold ">Logo</h1>
      <nav>
        <ul className=" flex gap-3">
          <li className=" hover:text-red-500">
            <Link href={"/user"}>Users</Link>
          </li>
          <li className=" hover:text-red-500">
            <Link href={"/task"}>Tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
