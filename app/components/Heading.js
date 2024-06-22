"use client";

import FilterDropdownUser from "./FilterDropDownUser";

const Heading = ({ category, onFilterSubmit, type }) => {
  return (
    <div className=" flex justify-between items-center px-20 mb-[100px] w-[1400px] mx-auto">
      <h2>{category}</h2>
      {type === "user" && (
        <FilterDropdownUser onFilterSubmit={onFilterSubmit} />
      )}
    </div>
  );
};

export default Heading;
