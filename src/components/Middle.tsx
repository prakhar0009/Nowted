import { useEffect, useState } from "react";
import type { FolderProps } from "../data/notes";
import { getNotesByFolder } from "../Api/GetApi";
import DeleteNote from "../Api/DeleteNote";
import { Trash2 } from "lucide-react";

const Middle = ({ currFolder }: FolderProps) => {
  const [notes, setnotes] = useState<any[]>([]);

  const renderNotes = async () => {
    if (!currFolder) return;
    const res = await getNotesByFolder(currFolder);
    setnotes(res);
  };

  useEffect(() => {
    renderNotes();
  }, [currFolder]);

  const currentTime = new Date().toLocaleDateString();

  return (
    <div className="w-full h-full bg-[#181818] flex flex-col">
      <div className="w-full p-[8%] pb-[4%]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-white">
            {currFolder ? "notes" : "select Folder"}
          </h2>
          <p className="text-primary text-sm">{notes.length} Notes</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8%] flex flex-col gap-3.75 pb-7.5">
        {notes.map((curr) => (
          <div
            key={curr.id}
            className="w-full p-5 bg-secondary-hover rounded-xl border border-white/5 hover:bg-secondary-hover cursor-pointer transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-white truncate">
                {curr.title}
              </h4>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Middle;
