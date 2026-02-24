import { Folder, FolderOpen, FolderPlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getFolders } from "../Api/GetApi";
import { createFolder } from "../Api/PostApi";
import { NavLink, useParams } from "react-router-dom";
import { DeleteFolder } from "../Api/DeleteApi";

const NewFolder = () => {
  const [folder, setfolder] = useState<any[]>([]);
  const [fName, setfName] = useState("");
  const [isFolder, setisFolder] = useState(false);
  const { folderId } = useParams();

  const render = async () => {
    // if (!folderId) return;
    const data = await getFolders();
    setfolder(data);
  };

  useEffect(() => {
    render();
  }, []);

  const handleNewFolder = async () => {
    if (fName.trim() === "") return;
    await createFolder(fName);
    setfName("");
    setisFolder(false);
    render();
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 text-xs font-semibold tracking-wider">
          Folders
        </h3>
        <button
          onClick={() => setisFolder(!isFolder)}
          className="text-gray-500 hover:text-white"
        >
          <FolderPlus />
        </button>
      </div>

      {isFolder && (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={fName}
            onChange={(e) => setfName(e.target.value)}
            placeholder="Folder name"
            className="bg-white/10 text-white text-sm rounded px-2 py-1 w-full outline-none"
          />
          <button
            onClick={handleNewFolder}
            className="text-xs text-white bg-white/20 px-2 py-1 rounded hover:bg-white/30"
          >
            Add
          </button>
        </div>
      )}
      <ul className="flex flex-col gap-3 min-h-0 overflow-y-auto hide-scrollbar">
        {folder.map((curr) => (
          <NavLink
            className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2"
            key={curr.id}
            to={`/${curr.id}`}
          >
            <span>{folderId === curr.id ? <FolderOpen /> : <Folder />}</span>
            {curr.name}
            <div className="flex justify-between w-full items-center mb-2">
              <h4 className="text-sm font-medium text-white truncate">
                {curr.title}
              </h4>
              <button
                onClick={async () => {
                  await DeleteFolder(curr.id);
                  render();
                }}
                className="text-gray-500 hover:text-red-400 transition-all ml-2"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default NewFolder;
