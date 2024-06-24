"use client";

import FilterDropdownUser from "./FilterDropDownUser";

const Heading = ({ category, onFilterSubmit, type }) => {
  return (
    <div className=" flex justify-between items-center px-20 mb-[30px] w-[400px] lg:w-[1200px] mx-auto">
      <h2 className=" text-xl font-bold text-gray-600">{category}</h2>
      {type === "user" && (
        <FilterDropdownUser onFilterSubmit={onFilterSubmit} />
      )}
    </div>
  );
};

export default Heading;
