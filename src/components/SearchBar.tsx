import { Search } from "lucide-react";
import Nowted from "../assets/Nowted.svg";

const SearchBar = () => {
  return (
    <div className="flex justify-between items-center">
      <img src={Nowted} alt="Nowted_logo" />
      <button className="text-xl cursor-pointer text-primary hover:text-secondary">
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
