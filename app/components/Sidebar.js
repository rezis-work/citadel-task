import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className=" h-screen w-60 fixed left-0 bg-gray-400 flex flex-col justify-start items-center pt-10">
      <hi className=" text-xl font-bold text-white  p-2 border-[2px] rounded-md mb-10">
        <Link href={"/"}>Citadel</Link>
      </hi>
      <p className=" text-sm text-white">Move trough page</p>
      <ul className=" flex flex-col mt-6 gap-5 text-white">
        <li className=" hover:text-gray-500 active:text-gray-600">
          <Link href={"/user"}>
            Users <RightOutlined />
          </Link>
        </li>
        <li className=" hover:text-gray-500 active:text-gray-600">
          <Link href={"/task"}>
            Tasks <RightOutlined />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
