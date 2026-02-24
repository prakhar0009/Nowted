import { useEffect, useState } from "react";
import { getFolders, getNotesByFolder } from "../Api/GetApi";
import { DeleteNote } from "../Api/DeleteApi";
import { Trash2 } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

const Middle = () => {
  const [notes, setnotes] = useState<any[]>([]);
  const [folderName, setfolderName] = useState<string>("");
  const { folderId } = useParams();

  const renderNotes = async () => {
    if (!folderId) return;
    const res = await getNotesByFolder(folderId);
    setnotes(res);
  };

  useEffect(() => {
    const renderfolderName = async () => {
      const folders = await getFolders();
      const currFolder = folders.find((f: any) => f.id === folderId);
      if (currFolder) setfolderName(currFolder.name);
    };
    renderfolderName();
    renderNotes();
  }, [folderId]);

  const currentTime = new Date().toLocaleDateString();

  return (
    <div className="w-full h-full bg-[#181818] flex flex-col">
      <div className="w-full p-[8%] pb-[4%]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-white">
            {folderId ? folderName : "Select Folder"}
          </h2>
          <p className="text-primary text-sm">{notes.length} Notes</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8%] flex flex-col gap-3 pb-7">
        {notes.map((curr) => (
          <NavLink
            key={curr.id}
            to={`/${folderId}/${curr.id}`}
            className={({ isActive }) =>
              `w-full p-5 rounded-xl border border-white/5 cursor-pointer transition-all block
              ${isActive ? "bg-white/10" : "bg-secondary-hover hover:bg-white/5"}`
            }
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-white truncate">
                {curr.title}
              </h4>
              <button
                onClick={async () => {
                  await DeleteNote(curr.id);
                  renderNotes();
                }}
                className="text-gray-500 hover:text-red-400 transition-all ml-2"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="flex justify-between items-center text-[14px] text-primary">
              <p>{currentTime}</p>
              <p className="truncate ml-3 opacity-70">{curr.preview}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Middle;
