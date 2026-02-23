import ToggleTheme from "./ToggleTheme";
import SearchBar from "./SearchBar";
import NewNote from "./NewNote";
import NewFolder from "./NewFolder";
import RecentFolder from "./RecentFolder";
import AdditionalFolder from "./AdditionalFolder";
import type { Props } from "../data/notes";
import type { FolderProps } from "../data/notes";

const LeftSide = ({ currFolder, setcurrFolder, onNoteCreated }: Props) => {
  return (
    <div className="w-full h-full bg-[#181818] p-[8%] flex flex-col gap-7">
      <SearchBar />
      <NewNote currFolder={currFolder} onNoteCreated={onNoteCreated} />
      <RecentFolder />
      <NewFolder setcurrFolder={setcurrFolder} currFolder={currFolder} />
      <AdditionalFolder />
      <div className="flex justify-center items-center">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default LeftSide;
