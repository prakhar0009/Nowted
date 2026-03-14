import { FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNotes } from "../../context/NoteContext.ts";
import type { Note } from "../../types/type";

const RecentFolder = () => {
  const { recentNotes } = useNotes();

  return (
    <div className="w-full">
      <h3 className="text-primary text-xs font-semibold tracking-wider mb-4 px-[8%]">
        Recents
      </h3>
      <div className="flex flex-col gap-1">
        {recentNotes?.map((curr: Note) => (
          <NavLink
            to={`/${curr.folderId}/${curr.id}`}
            key={curr.id}
            className={({ isActive }) =>
              `py-2.5 rounded-md flex items-center pl-[8%] gap-5 cursor-pointer duration-200
              ${
                isActive
                  ? "bg-secondary-hover text-secondary shadow-sm"
                  : "text-primary hover:bg-primary-hover hover:text-secondary"
              }`
            }
          >
            <span>
              <FileText />
            </span>
            <span className="text-sm w-65 truncate font-medium">
              {curr.title}
            </span>
          </NavLink>
        ))}
        {recentNotes.length === 0 && (
          <span className="text-xs text-primary px-1 italic">
            No recent activity
          </span>
        )}
      </div>
    </div>
  );
};

export default RecentFolder;
