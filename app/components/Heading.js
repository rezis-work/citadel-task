import React from "react";

const Heading = ({ category, filter }) => {
  return (
    <div className=" flex justify-between items-center px-20 mb-[100px] w-[1400px] mx-auto">
      <h2>{category}</h2>
      <p>{filter}</p>
    </div>
  );
};

export default Heading;
