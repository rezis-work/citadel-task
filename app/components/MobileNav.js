import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const MobileNav = () => {
  return (
    <div className=" flex justify-between items-center gap-10">
      <p className=" text-sm">
        <Link href={"/"}>Citadel</Link>
      </p>
      <ul className="flex flex-row  gap-5  text-gray-700">
        <li className="hover:text-gray-500 active:text-gray-600">
          <Link href={"/user"}>
            Users <RightOutlined />
          </Link>
        </li>
        <li className="hover:text-gray-500 active:text-gray-600">
          <Link href={"/task"}>
            Tasks <RightOutlined />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
