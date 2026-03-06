import ToggleTheme from "./ToggleTheme";
import NewFolder from "./NewFolder";
import RecentFolder from "./RecentFolder";
import AdditionalFolder from "./AdditionalFolder";
import Header from "./Header";

const Sidebar = () => {
  return (
    <div className="w-full h-full bg-mainbg py-[8%] flex flex-col gap-7">
      <Header />
      <RecentFolder />
      <NewFolder />
      <AdditionalFolder />
      <div className="flex justify-center items-center">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Sidebar;
