import { FolderArchive, Star, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdditionalFolder = () => {
  return (
    <div className="flex-end">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-primary text-xs font-semibold tracking-wider">
          More
        </h3>
      </div>
      <ul className="flex flex-col gap-3">
        <NavLink
          to="/additional/favorite"
          className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2"
        >
          <span>
            <Star />
          </span>
          {"Favorite"}
        </NavLink>

        <NavLink
          to="/additional/trash"
          className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2"
        >
          <span>
            <Trash />
          </span>
          {"Trash"}
        </NavLink>

        <NavLink
          to="/additional/archive"
          className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2"
        >
          <span>
            <FolderArchive />
          </span>
          {"Archived Notes"}
        </NavLink>
      </ul>
    </div>
  );
};

export default AdditionalFolder;
