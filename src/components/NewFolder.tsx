import { Folder, FolderOpen, FolderPlus } from "lucide-react";

const NewFolder = () => {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 text-xs font-semibold tracking-wider">
          Folders
        </h3>
        <button className="text-gray-500 hover:text-white">
          <FolderPlus />
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2">
          <span>
            <FolderOpen />
          </span>{" "}
          Personal
        </li>
        <li className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2">
          <span>
            <Folder />
          </span>{" "}
          Work
        </li>
        <li className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2">
          <span>
            <Folder />
          </span>{" "}
          Travel
        </li>
        <li className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2">
          <span>
            <Folder />
          </span>{" "}
          Events
        </li>
        <li className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2">
          <span>
            <Folder />
          </span>{" "}
          Finances
        </li>
      </ul>
    </div>
  );
};

export default NewFolder;
