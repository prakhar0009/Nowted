import React from "react";
import { Search } from "lucide-react";
import { FolderPlus } from "lucide-react";
import { Plus } from "lucide-react";
import { FileText } from "lucide-react";
import { FolderOpen } from "lucide-react";
import { Folder } from "lucide-react";

const LeftSide = () => {
  return (
    <div className="w-full h-full bg-[#181818] p-[8%] flex flex-col gap-7.5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold italic tracking-tight">Nowted</h1>
        <button className="text-xl">
          <Search />
        </button>
      </div>

      <button className="w-full py-3 border border-white/20 rounded-md hover:bg-white/5 transition-all flex items-center justify-center gap-2">
        <span className="text-lg">
          <Plus />
        </span>
        <span className="font-medium">New Note</span>
      </button>

      <div>
        <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">
          Recents
        </h3>
        <div className="flex flex-col gap-1">
          <div className="bg-blue-600 p-2.5 rounded-md flex items-center gap-3 cursor-pointer">
            <span>
              <FileText />
            </span>
            <span className="text-sm truncate">Reflection on the Month...</span>
          </div>

          <div className="p-2.5 rounded-md flex items-center gap-3 cursor-pointer hover:bg-white/5">
            <span>
              <FileText />
            </span>
            <span className="text-sm truncate text-gray-400">
              Project proposal
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
            Folders
          </h3>
          <button className="text-gray-500 hover:text-white">
            <FolderPlus />
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer px-1">
            <span>
              <FolderOpen />
            </span>{" "}
            Personal
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer px-1">
            <span>
              <Folder />
            </span>{" "}
            Work
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer px-1">
            <span>
              <Folder />
            </span>{" "}
            Travel
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer px-1">
            <span>
              <Folder />
            </span>{" "}
            Events
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer px-1">
            <span>
              <Folder />
            </span>{" "}
            Finances
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
