import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-gray-300 fixed w-full bottom-0">
      <div className="mx-auto max-w-screen-xl px-4 py-[27px] sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start"></div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.{" "}
            <span className=" text-black">
              <Link href={"https://github.com/rezis-work"} target="_blank">
                created by rezi karanadze
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
