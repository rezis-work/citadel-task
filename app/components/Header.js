"use client";
import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-200 text-gray-700"
    >
      <header className="flex justify-between w-[300px] xl:w-[1000px] mx-auto py-10 ">
        <h1 className=" text-2xl font-bold  ">
          <Link href={"/"}>Citadeli</Link>
        </h1>
        <nav>
          <ul className=" flex gap-3">
            <NavLink route={"user"} text={"Users"} />
            <NavLink route={"task"} text={"Tasks"} />
          </ul>
        </nav>
      </header>
    </motion.div>
  );
};

export default Header;
