import Link from "next/link";
import React from "react";

const NavLink = ({ route, text }) => {
  return (
    <li className=" hover:text-red-500">
      <Link href={`/${route}`}>{text}</Link>
    </li>
  );
};

export default NavLink;
