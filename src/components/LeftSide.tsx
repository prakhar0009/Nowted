import ToggleTheme from "./ToggleTheme";
import SearchBar from "./SearchBar";
import NewNote from "./NewNote";
import NewFolder from "./NewFolder";
import RecentFolder from "./RecentFolder";
import AdditionalFolder from "./AdditionalFolder";

const LeftSide = () => {
  return (
    <div className="w-full h-full bg-[#181818] p-[8%] flex flex-col gap-7.5">
      <SearchBar />
      <NewNote />
      <RecentFolder />
      <NewFolder />
      <AdditionalFolder />
      <div className="flex justify-center items-center dark:bg-black">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default LeftSide;
