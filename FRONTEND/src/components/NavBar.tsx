import { useState } from "react";
type TypeNavBarProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
};

const NavBar = ({ category, setCategory, categories }: TypeNavBarProps) => {
  const changeCategoryClass = (actualCategory: string) => {
    const notSelectedClass =
      "text-secondary bg-primary md:text-md h-7 w-24 cursor-pointer rounded-md text-sm font-bold md:h-9 md:w-32 border-2 border-secondary";
    const selectedClass =
      "text-primary bg-secondary  md:text-md h-7 w-24 cursor-pointer rounded-md text-sm font-bold md:h-9 md:w-32 border-2 border-secondary";
    if (actualCategory === category) {
      return selectedClass;
    }
    return notSelectedClass;
  };
  return (
    <nav className="flex w-full flex-row items-start gap-4 p-3 py-0 md:w-[737px] md:p-0 md:py-1">
      {categories.map((cat) => {
        return (
          <button
            key={cat}
            className={changeCategoryClass(cat)}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        );
      })}
    </nav>
  );
};

export default NavBar;
