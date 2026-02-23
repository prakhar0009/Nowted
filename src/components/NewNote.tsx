import { Plus, X } from "lucide-react";
import type { FolderProps } from "../data/notes";
import { createNote } from "../Api/PostApi";
import { useState } from "react";

const NewNote = ({ currFolder, onNoteCreated }: FolderProps) => {
  const [overlay, setoverlay] = useState(false);
  const [title, settitle] = useState("");
  const [message, setmessage] = useState("");

  const handleNewNote = async () => {
    if (!currFolder) return alert("Folder not selected");
    if (title.trim() === "") return alert("File name can't be empty");
    await createNote(currFolder, title, message);
    settitle("");
    setoverlay(false);
    setmessage("");
    if (onNoteCreated) onNoteCreated();
  };
  return (
    <>
      <button
        className="w-full py-3 rounded-md bg-secondary-hover flex items-center justify-center cursor-pointer gap-2"
        onClick={() => setoverlay(true)}
      >
        <span className="text-lg">
          <Plus />
        </span>
        <span className="font-medium">New Note</span>
      </button>

      {overlay && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#222222] rounded-xl p-6 w-[90%] max-w-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-semibold text-lg">New Note</h2>
              <button
                onClick={() => setoverlay(false)}
                className="text-gray-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Enter note title"
                className="bg-white/10 text-white text-sm rounded px-3 py-2 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Content</label>
              <textarea
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                placeholder="Enter note content"
                rows={4}
                className="bg-white/10 text-white text-sm rounded px-3 py-2 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleNewNote}
              className="bg-white/20 hover:bg-white/30 text-white py-2 rounded-md text-sm transition-all"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewNote;
