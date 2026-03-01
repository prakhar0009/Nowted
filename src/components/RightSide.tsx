import {
  CircleEllipsis,
  CalendarDays,
  Folder,
  FileText,
  Star,
  FolderArchive,
  Trash,
  History,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getNoteById } from "../Api/GetApi";
import { useParams } from "react-router-dom";
import { archiveNote, favNote, putNotes } from "../Api/PutApi";
import { useNavigate } from "react-router-dom";
import { DeleteNote } from "../Api/DeleteApi";
import toast from "react-hot-toast";

const RightSide = () => {
  const { noteId, type, folderId } = useParams<{
    noteId?: string;
    type?: string;
    folderId?: string;
  }>();
  const [note, setnote] = useState<any>(null);
  const [overlay, setoverlay] = useState(false);

  const [editNote, seteditNote] = useState<string | null>(null);
  const [tempNote, settempNote] = useState("");
  const navigate = useNavigate();

  // const { noteId, type , } = useParams();

  const toggleFav = async () => {
    if (!note) return;
    try {
      const newValue = !note.isFavorite;
      await favNote(note.id, newValue);
      setnote({ ...note, isFavorite: newValue });
      if (newValue) {
        toast.success("Marked as Favorite");
      } else {
        toast.success("Removed from Favorites");
      }
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else toast.error(`Internal Error`);
    }
  };

  const toggleArchive = async () => {
    if (!note) return;
    try {
      const newValue = !note.isArchived;
      await archiveNote(note.id, newValue);
      setnote({ ...note, isArchived: newValue });
      if (newValue) {
        toast.success("Marked as Archived");
      } else {
        toast.success("Removed from Archives");
      }
      setoverlay(false);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else toast.error(`Internal Error`);
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteNote(note.id);
      toast.success("Note moved to Trash");
      if (type) navigate(`/additional/${type}`);
      else navigate(`/${folderId}`);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else toast.error(`Internal Error`);
    }
  };

  const loadNote = async () => {
    if (!noteId) return;
    const res = await getNoteById(noteId);
    setnote(res);
  };

  useEffect(() => {
    loadNote();
  }, [noteId]);

  if (!noteId || !note) {
    return (
      <div className="w-full h-full bg-mainbg flex flex-col items-center justify-center gap-4">
        <FileText strokeWidth={0.8} size={100} className="text-secondary" />
        <h2 className="text-text text-2xl font-semibold">
          Select a note to view
        </h2>
        <p className="text-gray-500 text-sm text-center px-10">
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    );
  }

  if (type === "trash") {
    return (
      <section className="p-12 pb-0 w-full flex justify-center items-center flex-col gap-5 min-h-screen">
        <History size={90} strokeWidth={0.5} />
        <h1 className="text-3xl font-medium">Restore "{note.title}"</h1>
        <p className="text-center text-background-700">
          Don't want to lose this note? It's not too late! Just click the
          'Restore' <br /> button and it will be added back to your list. It's
          that simple.
        </p>

        <button className="bg-primary-hover text-white rounded-md py-2 px-8 cursor-pointer">
          Restore
        </button>
      </section>
    );
  }

  return (
    <div
      className="w-full h-full bg-mainbg flex flex-col p-[5%] gap-7"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">{note.title}</h1>
        <CircleEllipsis
          size={30}
          className="text-primary hover:text-text cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setoverlay((prev) => !prev);
          }}
        />
        {overlay && (
          <div className="absolute top-25 right-14 rounded-md p-4 w-60 text-md flex flex-col gap-4 bg-overlay text-text">
            <button
              onClick={toggleFav}
              className=" flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover"
            >
              <Star
                className={
                  note.isFavorite ? "text-yellow-400 fill-yellow-400" : ""
                }
              />
              {note.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>

            <button
              onClick={toggleArchive}
              className=" flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover"
            >
              <FolderArchive
                className={note.isArchived ? "text-blue-400 fill-blue-400" : ""}
              />
              {note.isArchived ? "Remove from Archives" : "Add to Archives"}
            </button>
            <hr className="w-50 border border-b-overlay"></hr>
            <button
              className=" flex gap-4 items-center py-2 cursor-pointer hover:text-red-400 hover:bg-secondary-hover"
              onClick={handleDelete}
            >
              <Trash />
              {"Delete"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col dark:divide-y divide-y dark:divide-white/10">
        <div className="flex items-center gap-20 py-3">
          <div className="text-primary flex items-center gap-5">
            <CalendarDays size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Date</h3>
          </div>
          <div className="text-text text-sm font-bold underline decoration-primary underline-offset-4">
            {new Date(note.createdAt).toLocaleDateString("en-GB")}
          </div>
        </div>

        <div className="flex items-center gap-17.5 py-3">
          <div className="text-primary flex items-center gap-5">
            <Folder size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>
          <div className="text-text text-sm underline decoration-primary underline-offset-4 font-bold">
            {note.folder.name}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full hide-scrollbar">
        {editNote === note.id ? (
          <textarea
            value={tempNote}
            onKeyDown={async (e) => {
              if (e.key === "Escape") seteditNote(null);
              if (e.key === "Enter") {
                await putNotes(note.id, note.title, tempNote);
                setnote({ ...note, content: tempNote });
                seteditNote(null);
              }
            }}
            onChange={(e) => settempNote(e.target.value)}
            onBlur={async () => {
              await putNotes(note.id, note.title, tempNote);
              setnote({ ...note, content: tempNote });
              seteditNote(null);
            }}
            autoFocus
            className="w-full bg-transparent outline-none resize-none text-secondary leading-relaxed text-base h-screen"
            autoSave=""
          ></textarea>
        ) : (
          <p
            onDoubleClick={() => {
              seteditNote(note.id);
              settempNote(note.content);
            }}
            className="text-secondary leading-relaxed text-base cursor-text"
          >
            {note.content}
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSide;
