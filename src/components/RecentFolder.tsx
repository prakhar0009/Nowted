import { FileText } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NoteContext } from "../context/NoteContext";

const RecentFolder = () => {
  const { recentNotes } = useContext(NoteContext);

  return (
    <div className="w-full">
      <h3 className="text-primary text-xs font-semibold tracking-wider mb-4">
        Recents
      </h3>
      <div className="flex flex-col gap-5">
        {recentNotes?.map((curr: any) => (
          <NavLink
            to={`/${curr.folderId}/${curr.id}`}
            key={curr.id}
            className={({ isActive }) =>
              `px-1 py-2.5 rounded-md flex items-center gap-5 cursor-pointer duration-200
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
            <span className="text-sm truncate font-medium">{curr.title}</span>
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
