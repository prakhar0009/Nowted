import { Folder, FolderOpen, FolderPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { getFolders } from "../Api/GetApi";
import { createFolder } from "../Api/PostApi";

const NewFolder = () => {
  const [folder, setfolder] = useState<any[]>([]);
  const [fName, setfName] = useState("");
  const [isFolder, setisFolder] = useState(false);

  const render = async () => {
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
    <div className="flex-1">
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
      <ul className="flex flex-col gap-3">
        {folder.map((curr, i) => (
          <li
            className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2"
            key={curr.id}
          >
            <span>{i === 0 ? <FolderOpen /> : <Folder />}</span>
            {curr.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewFolder;
