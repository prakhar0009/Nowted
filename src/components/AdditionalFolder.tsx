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
          className={({ isActive }) =>
            `flex items-center gap-5 text-sm cursor-pointer rounded px-1 py-2 duration-200 ${
              isActive
                ? "text-yellow-400 bg-yellow-400/10 font-semibold"
                : "text-primary hover:bg-secondary-hover hover:text-secondary"
            }`
          }
        >
          <span>
            <Star size={18} />
          </span>
          Favorite
        </NavLink>

        <NavLink
          to="/additional/trash"
          className={({ isActive }) =>
            `flex items-center gap-5 text-sm cursor-pointer rounded px-1 py-2 duration-200 ${
              isActive
                ? "text-red-400 bg-red-400/10 font-semibold"
                : "text-primary hover:bg-secondary-hover hover:text-secondary"
            }`
          }
        >
          <span>
            <Trash size={18} />
          </span>
          Trash
        </NavLink>

        <NavLink
          to="/additional/archive"
          className={({ isActive }) =>
            `flex items-center gap-5 text-sm cursor-pointer rounded px-1 py-2 duration-200 ${
              isActive
                ? "text-blue-400 bg-blue-400/10 font-semibold"
                : "text-primary hover:bg-secondary-hover hover:text-secondary"
            }`
          }
        >
          <span>
            <FolderArchive size={18} />
          </span>
          Archived Notes
        </NavLink>
      </ul>
    </div>
  );
};

export default AdditionalFolder;
