import { useEffect, useState } from "react";
import { getFolders, getNotesByFolder } from "../Api/GetApi";
import { DeleteNote } from "../Api/DeleteApi";
import { Trash2 } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import type { Note } from "../data/notes";

const Middle = () => {
  const [notes, setnotes] = useState<Note[]>([]);
  const [folderName, setfolderName] = useState<string>("");
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();

  const renderNotes = async () => {
    if (!folderId) return;
    const res = await getNotesByFolder(folderId);
    setnotes(res);
  };

  const renderfolderName = async () => {
    const folders = await getFolders();
    if (!Array.isArray(folders)) return;
    const currFolder = folders.find((f) => f.id === folderId);
    if (currFolder) setfolderName(currFolder.name);
  };

  useEffect(() => {
    if (!folderId) {
      setnotes([]);
      setfolderName("");
      return;
    }
    renderfolderName();
    renderNotes();
  }, [folderId]);

  const currentTime = new Date().toLocaleDateString();

  return (
    <div className="w-full h-full bg-middleScreen flex flex-col">
      <div className="w-full p-[8%] pb-[4%]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-text">
            {folderId ? folderName : "Select Folder"}
          </h2>
          <p className="text-primary text-sm">{notes.length} Notes</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8%] flex flex-col gap-3 pb-7 hide-scrollbar ">
        {notes.map((curr) => (
          <NavLink
            key={curr.id}
            to={`/${folderId}/${curr.id}`}
            className={({ isActive }) =>
              `w-full p-5 rounded-xl border border-middle-active/5 cursor-pointer block
              ${isActive ? "bg-middle-active" : "bg-secondary-hover hover:bg-middle-active/5"} hover:shadow-lg hover:shadow-primary-hover`
            }
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-text truncate">
                {curr.title}
              </h4>
              <button
                onClick={async () => {
                  try {
                    await DeleteNote(curr.id);
                    toast.success("File is deleted");
                    renderNotes();
                    navigate(`/${folderId}`);
                  } catch {
                    toast.error("Internal Error");
                  }
                }}
                className="text-primary hover:text-red-400 transition-all ml-2"
              >
                <Trash2 size={20} />
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
