import { FolderArchive, Star, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

const additionalLinks = [
  {
    navigateTo: "/additional/favorite",
    type: "Favorite",
    icon: Star,
    active: "text-yellow-400 bg-yellow-400/10",
  },
  {
    navigateTo: "/additional/trash",
    type: "Trash",
    icon: Trash,
    active: "text-red-400 bg-red-400/10",
  },
  {
    navigateTo: "/additional/archive",
    type: "Archived Notes",
    icon: FolderArchive,
    active: "text-blue-400 bg-blue-400/10",
  },
];

const AdditionalFolder = () => {
  return (
    <div className="flex-end">
      <div className="flex justify-between items-center mb-4 px-[8%]">
        <h3 className="text-primary text-xs font-semibold tracking-wider">
          More
        </h3>
      </div>

      <ul className="flex flex-col gap-3">
        {additionalLinks.map(({ navigateTo, type, icon: Icon, active }) => (
          <NavLink
            key={navigateTo}
            to={navigateTo}
            className={({ isActive }) =>
              `flex items-center gap-5 text-sm cursor-pointer rounded px-1 py-2 duration-200 pl-[8%] ${
                isActive
                  ? `${active} font-semibold`
                  : "text-primary hover:bg-secondary-hover hover:text-secondary"
              }`
            }
          >
            <span>
              <Icon size={18} />
            </span>
            {type}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default AdditionalFolder;
