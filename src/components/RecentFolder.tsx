import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { getRecentNotes } from "../Api/GetApi";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const RecentFolder = () => {
  const [recent, setRecent] = useState<any[]>([]);

  const render = async () => {
    const data = await getRecentNotes();
    setRecent(data);
  };

  useEffect(() => {
    render();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-gray-500 text-xs font-semibold tracking-wider mb-4">
        Recents
      </h3>
      <div className="flex flex-col gap-5">
        {recent.map((curr) => (
          <NavLink
            to={`/${curr.folderId}/${curr.id}`}
            key={curr.id}
            className="px-1 py-2.5 rounded-md flex items-center gap-5 cursor-pointer text-primary hover:bg-primary-hover hover:text-secondary"
          >
            <span>
              <FileText />
            </span>
            <span className="text-sm truncate font-medium">
              {curr.title || "Untitled Note"}
            </span>
          </NavLink>
        ))}
        {recent.length === 0 && (
          <span className="text-xs text-gray-400 px-1 italic">
            No recent activity
          </span>
        )}
      </div>
    </div>
  );
};

export default RecentFolder;
