"use client";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-screen w-60 fixed left-0 bg-gray-400 flex flex-col justify-start items-center pt-10"
    >
      <h1 className="text-xl font-bold text-white p-2 border-[2px] rounded-md mb-10">
        <Link href={"/"}>Citadel</Link>
      </h1>
      <p className="text-sm text-white">Move through the page</p>
      <ul className="flex flex-col mt-6 gap-5 text-white">
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
    </motion.div>
  );
};

export default Sidebar;
