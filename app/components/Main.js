"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Main = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[80vh] lg:items-start">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ y: 100 }}
          animate={{ y: [100, -50, 0] }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            WELCOME TO CITADEL
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              CONTROL YOUR USERS AND TASKS{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            here you can check your employes and their tasks
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href={"/user"}
            >
              Users
            </Link>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href={"/task"}
            >
              Tasks
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Main;
