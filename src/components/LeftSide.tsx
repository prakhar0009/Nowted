import ToggleTheme from "./ToggleTheme";
import NewNote from "./NewNote";
import NewFolder from "./NewFolder";
import RecentFolder from "./RecentFolder";
import AdditionalFolder from "./AdditionalFolder";

const LeftSide = () => {
  return (
    <div className="w-full h-full bg-mainbg p-[8%] flex flex-col gap-7">
      <NewNote />

      <RecentFolder />
      <NewFolder />
      <AdditionalFolder />
      <div className="flex justify-center items-center">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default LeftSide;
