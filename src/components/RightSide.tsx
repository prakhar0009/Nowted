import {
  CircleEllipsis,
  CalendarDays,
  Folder,
  FileText,
  Star,
  FolderArchive,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getNoteById } from "../Api/GetApi";
import { useParams } from "react-router-dom";

const RightSide = () => {
  const { noteId } = useParams();
  const [note, setnote] = useState<any>(null);
  const [overlay, setoverlay] = useState(false);

  const loadNote = async () => {
    if (!noteId) return;
    const res = await getNoteById(noteId);
    setnote(res);
  };

  useEffect(() => {
    // const handleOverlay = ;
    loadNote();
  }, [noteId]);

  if (!noteId || !note) {
    return (
      <div className="w-full h-full bg-[#181818] flex flex-col items-center justify-center gap-4">
        <FileText strokeWidth={0.8} size={100} className="text-secondary" />
        <h2 className="text-white text-2xl font-semibold">
          Select a note to view
        </h2>
        <p className="text-gray-500 text-sm text-center px-10">
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-[#181818] flex flex-col p-[5%] gap-7"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">{note.title}</h1>
        <CircleEllipsis
          size={30}
          className="text-primary hover:text-white cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setoverlay((prev) => !prev);
          }}
        />
        {overlay && (
          <div className="absolute top-25 right-14 rounded-md p-4 w-60 text-md flex flex-col gap-4 bg-[#333333] text-white">
            <button className=" flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover">
              <Star />
              {"Add to Favorites"}
            </button>
            <button className=" flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover">
              <FolderArchive />
              {"Archived"}
            </button>
            {/* <div className="divide-y divide-white/10"></div> */}
            <hr className="w-50 border border-b-[#333333]"></hr>
            <button className=" flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover">
              <Trash />
              {"Delete"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col divide-y divide-white/10">
        <div className="flex items-center gap-20 py-3">
          <div className="text-primary flex items-center gap-5">
            <CalendarDays size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Date</h3>
          </div>
          <div className="text-white text-sm font-bold underline decoration-gray-600 underline-offset-4">
            {new Date(note.createdAt).toLocaleDateString("en-GB")}
          </div>
        </div>

        <div className="flex items-center gap-17.5 py-3">
          <div className="text-primary flex items-center gap-5">
            <Folder size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>
          <div className="text-white text-sm underline decoration-gray-600 underline-offset-4 font-bold">
            {note.folder.name}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <p className="text-secondary leading-relaxed text-base ">
          {note.content}
        </p>
      </div>
    </div>
  );
};

export default RightSide;
