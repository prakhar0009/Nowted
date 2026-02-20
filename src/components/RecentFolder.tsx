import { FileText } from "lucide-react";

const RecentFolder = () => {
  return (
    <div>
      <h3 className="text-gray-500 text-xs font-semibold tracking-wider mb-4">
        Recents
      </h3>
      <div className="flex flex-col gap-1">
        <div className="px-1 py-2.5 rounded-md flex items-center gap-5 cursor-pointer text-primary hover:bg-primary-hover hover:text-secondary">
          <span>
            <FileText />
          </span>
          <span className="text-sm truncate">Reflection on the Month...</span>
        </div>

        <div className="p-1 py-2.5 rounded-md flex items-center gap-5 cursor-pointer text-primary hover:bg-primary-hover hover:text-secondary">
          <span>
            <FileText />
          </span>
          <span className="text-sm truncate">Project proposal</span>
        </div>
      </div>
    </div>
  );
};

export default RecentFolder;
