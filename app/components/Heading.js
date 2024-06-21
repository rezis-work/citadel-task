"use client";

import FilterDropdownUser from "./FilterDropDownUser";

const Heading = ({ category }) => {
  return (
    <div className=" flex justify-between items-center px-20 mb-[100px] w-[1400px] mx-auto">
      <h2>{category}</h2>
      <FilterDropdownUser />
    </div>
  );
};

export default Heading;
