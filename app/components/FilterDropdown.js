"use client";

import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("გიორგი");
  const [name, setName] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isMale, setIsMale] = useState(false);

  console.log(name, isFemale, isMale);

  const handleSelectAll = () => {
    setName((name) => !name);
    setIsFemale((female) => !female);
    setIsMale((male) => !male);
  };

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };
  return (
    <div className=" flex gap-3 items-center px-4 py-2 border rounded-md hover:bg-gray-500 relative w-[100px]">
      Filter <FilterOutlined onClick={handleOpen} />
      {isOpen && (
        <div className=" absolute bottom-[-170px] p-3 bg-gray-200 text-white w-[200px] z-50 rounded-md">
          <div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-[150px] pl-2 rounded-sm text-black"
              placeholder={`search`}
            />
          </div>
          <div className=" flex items-center gap-3 mt-2 pl-5">
            <input
              type="checkbox"
              name="all"
              id="all"
              onChange={handleSelectAll}
            />
            <span className=" text-gray-700 text-xs">Select All</span>
          </div>
          <div className=" flex items-center gap-3 mt-2 pl-5">
            <input
              type="checkbox"
              name="name"
              id="name"
              onChange={(e) => setName(e.currentTarget.checked)}
              checked={name}
            />
            <span className=" text-gray-700 text-xs">{search}</span>
          </div>
          <div className=" flex items-center gap-3 mt-2 pl-5">
            <input
              type="checkbox"
              name="male"
              id="male"
              onChange={(e) => setIsMale(e.currentTarget.checked)}
              checked={isMale}
            />
            <span className=" text-gray-700 text-xs">male</span>
          </div>
          <div className=" flex items-center gap-3 mt-2 pl-5">
            <input
              type="checkbox"
              name="female"
              id="female"
              onChange={(e) => setIsFemale(e.currentTarget.checked)}
              checked={isFemale}
            />
            <span className=" text-gray-700 text-xs">female</span>
          </div>
          <div className=" flex gap-3">
            <button className=" bg-white text-gray-600 px-4 py-0 rounded-md mt-2 hover:bg-gray-500 hover:text-white">
              Clear
            </button>
            <button className=" bg-white text-gray-600 px-4 py-0 rounded-md mt-2 hover:bg-gray-500 hover:text-white">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
