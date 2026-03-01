import { Folder, FolderOpen, FolderPlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getFolders } from "../Api/GetApi";
import { createFolder } from "../Api/PostApi";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { DeleteFolder } from "../Api/DeleteApi";
import toast from "react-hot-toast";
import { putFolders } from "../Api/PutApi";

const NewFolder = () => {
  const [folder, setfolder] = useState<any[]>([]);
  const [fName, setfName] = useState("");
  const [isFolder, setisFolder] = useState(false);
  const { folderId } = useParams();
  const [editFolder, seteditFolder] = useState<string | null>(null);
  const [tempFName, settempFName] = useState("");

  const navigate = useNavigate();

  const render = async () => {
    try {
      const data = await getFolders();
      setfolder(data || []);
      console.log(data);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  useEffect(() => {
    render();
  }, []);

  const handleNewFolder = async () => {
    if (fName.trim() === "") return;
    try {
      await createFolder(fName);
      setfName("");
      setisFolder(false);
      render();
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  const handleRenameFolder = async (id: string) => {
    if (tempFName.trim() === "") {
      seteditFolder(null);
      return;
    }
    try {
      await putFolders(id, tempFName);
      seteditFolder(null);
      render();
      navigate(`/${id}/${tempFName}`);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      seteditFolder(null);
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-primary text-xs font-semibold tracking-wider">
          Folders
        </h3>
        <button
          onClick={() => setisFolder(!isFolder)}
          className="text-primary hover:text-text"
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
            className="bg-middle-active text-text text-sm rounded px-2 py-1 w-full outline-none"
          />
          <button
            onClick={handleNewFolder}
            className="text-xs text-text bg-middle px-2 py-1 rounded hover:bg-middle-active"
          >
            Add
          </button>
        </div>
      )}
      <ul className="flex flex-col gap-3 min-h-0 overflow-y-auto hide-scrollbar">
        {folder?.map((curr) => (
          <NavLink
            className="flex items-center gap-5 text-sm text-primary hover:bg-secondary-hover hover:text-secondary cursor-pointer rounded px-1 py-2"
            key={curr.id}
            to={`/${curr.id}/${curr.name}`}
            onDoubleClick={(e) => {
              e.preventDefault();
              seteditFolder(curr.id);
              settempFName(curr.name);
            }}
          >
            <span>{folderId === curr.id ? <FolderOpen /> : <Folder />}</span>
            {editFolder === curr.id ? (
              <input
                autoFocus
                onChange={(e) => {
                  settempFName(e.target.value);
                }}
                onBlur={() => handleRenameFolder(curr.id)}
                className="bg-middle-active text-text rounded px-1 outline-none w-full"
                value={tempFName}
                onClick={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameFolder(curr.id);
                  if (e.key === "Escape") seteditFolder(null);
                }}
                type="text"
              />
            ) : (
              <span className="truncate w-full">{curr.name}</span>
            )}
            <div className="flex justify-end w-full items-center mb-2">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    await DeleteFolder(curr.id);
                    toast.success("Folder is Deleted");
                    render();
                  } catch {
                    toast.error("Can't delete Folder");
                  }
                }}
                className="text-primary hover:text-red-400 transition-all ml-2"
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
