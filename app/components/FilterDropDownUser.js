import { FilterOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 10, transition: { duration: 0.3 } },
};

const FilterDropDownUser = ({ onFilterSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [all, setAll] = useState(false);
  const [name, setName] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isMale, setIsMale] = useState(false);

  const router = useRouter();

  const handleSelectAll = () => {
    setName((name) => !name);
    setIsFemale((female) => !female);
    setIsMale((male) => !male);
    setAll((all) => !all);
  };

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };

  const handleSubmit = () => {
    try {
      let queryParams = {};
      if (name) queryParams.name = search;
      if (isMale) queryParams.gender = "male";
      if (isFemale) queryParams.gender = "female";

      onFilterSubmit(queryParams);

      const queryString = new URLSearchParams(queryParams).toString();
      router.push(`/user?${queryString}`);
      setIsOpen(false);
    } catch (error) {
      console.error("Error fetching filtered users:", error);
    }
  };

  const handleClear = () => {
    setSearch("");
    setAll(false);
    setName(false);
    setIsFemale(false);
    setIsMale(false);

    router.push("/user");
  };

  return (
    <div className="relative">
      <div className="flex gap-3 items-center px-4 py-2 border rounded-md hover:bg-gray-500">
        Filter <FilterOutlined onClick={handleOpen} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-[40px] left-0 p-3 bg-gray-200 text-white w-[200px] z-50 rounded-md"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[150px] pl-2 rounded-sm text-black"
                placeholder={`search`}
              />
            </div>
            <div className="flex items-center gap-3 mt-2 ">
              <input
                type="checkbox"
                name="all"
                id="all"
                onChange={handleSelectAll}
                checked={all}
              />
              <span className="text-gray-700 text-xs">Select All</span>
            </div>
            <div className="flex items-center gap-3 mt-2 pl-8">
              <input
                type="checkbox"
                name="name"
                id="name"
                onChange={(e) => setName(e.currentTarget.checked)}
                checked={name}
              />
              <span className="text-gray-700 text-xs">
                {search || "firstname"}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2 pl-8">
              <input
                type="checkbox"
                name="male"
                id="male"
                onChange={(e) => setIsMale(e.currentTarget.checked)}
                checked={isMale}
              />
              <span className="text-gray-700 text-xs">male</span>
            </div>
            <div className="flex items-center gap-3 mt-2 pl-8">
              <input
                type="checkbox"
                name="female"
                id="female"
                onChange={(e) => setIsFemale(e.currentTarget.checked)}
                checked={isFemale}
              />
              <span className="text-gray-700 text-xs">female</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClear}
                className="bg-white text-gray-600 px-4 py-0 rounded-md mt-2 hover:bg-gray-500 hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="bg-white text-gray-600 px-4 py-0 rounded-md mt-2 hover:bg-gray-500 hover:text-white"
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropDownUser;
