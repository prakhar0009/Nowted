import {
  CircleEllipsis,
  CalendarDays,
  Folder,
  FileText,
  Star,
  FolderArchive,
  Trash,
  History,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  archiveNote,
  favNote,
  putNotes,
  restoreNote,
  DeleteNote,
  getNoteById,
} from "../../Api/NoteApi";
import api from "../../Api/Api";
import toast from "react-hot-toast";
import { NoteContext } from "../../context/NoteContext";
import ConfirmDialog from "../common/ConfirmDialog";

const RightSide = () => {
  const { noteId, type, folderId } = useParams<{
    noteId?: string;
    type?: string;
    folderId?: string;
  }>();
  const [overlay, setoverlay] = useState(false);
  const [editNote, seteditNote] = useState<string | null>(null);
  const [tempNote, settempNote] = useState("");
  const [editTitle, seteditTitle] = useState(false);
  const [tempTitle, settempTitle] = useState("");
  const [folderDropdown, setfolderDropdown] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [saving, setsaving] = useState(false);
  const navigate = useNavigate();

  const {
    setNotes,
    renderNotes,
    renderRecent,
    folders,
    currentNote: note,
    setcurrentNote: setnote,
  } = useContext(NoteContext);

  const loadNote = async () => {
    if (!noteId) return;
    try {
      const res = await getNoteById(noteId);
      setnote(res);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  const handleRenameTitle = async () => {
    if (tempTitle.trim() === "") {
      seteditTitle(false);
      toast.error("Note name is required");
      return;
    }
    if (tempTitle === note.title) {
      seteditTitle(false);
      return;
    }
    try {
      await putNotes(note.id, tempTitle, note.content);
      setnote({ ...note, title: tempTitle });
      setNotes((prev: any[]) =>
        prev.map((n) => (n.id === note.id ? { ...n, title: tempTitle } : n)),
      );
      toast.success("Note renamed");
      seteditTitle(false);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      seteditTitle(false);
    }
  };

  const handleMoveNote = async (newFolderId: string, newFolderName: string) => {
    if (!note) return;
    try {
      await api.patch(`/notes/${note.id}`, { folderId: newFolderId });
      setnote({
        ...note,
        folderId: newFolderId,
        folder: { name: newFolderName },
      });
      setNotes((prev: any[]) => prev.filter((n) => n.id !== note.id));
      toast.success(`Moved to ${newFolderName}`);
      setfolderDropdown(false);
      navigate(`/${newFolderId}/${note.id}`);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else toast.error("Internal Error");
    }
  };

  const toggleFav = async () => {
    if (!note) return;
    try {
      const newValue = !note.isFavorite;
      await favNote(note.id, newValue);
      setnote({ ...note, isFavorite: newValue });
      if (type === "favorite" && !newValue) {
        setNotes((prev: any[]) => prev.filter((n) => n.id !== note.id));
      }
      toast.success(newValue ? "Marked as Favorite" : "Removed from Favorite");
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  const toggleArchive = async () => {
    if (!note) return;
    try {
      const newValue = !note.isArchived;
      await archiveNote(note.id, newValue);
      if (newValue) {
        setNotes((prev: any[]) => prev.filter((n) => n.id !== note.id));
        toast.success("Marked as Archived");
        if (type === "favorite") {
          navigate("/additional/favorite");
        } else {
          navigate(`/${note.folderId}`);
        }
      } else {
        setNotes((prev: any[]) => prev.filter((n) => n.id !== note.id));
        setnote({ ...note, isArchived: newValue });
        toast.success("Removed from Archived");
        navigate("/additional/archive");
      }
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      seteditNote(null);
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    try {
      await DeleteNote(note.id);
      setShowRestore(true);

      setNotes((prev: any[]) => prev.filter((n) => n.id !== note.id));
      toast.success("Note moved to Trash");
      setoverlay(false);
      if (type === "archive") {
        navigate("/additional/archive");
      } else if (type === "favorite") {
        navigate("/additional/favorite");
      }
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else toast.error(`Internal Error`);
    }
  };

  const handleRestore = async () => {
    if (!note) return;
    try {
      const updateNote = await restoreNote(note.id);
      if (updateNote) {
        setNotes((prev: any[]) => prev.filter((n) => n.id !== note.id));
        renderRecent();
        setnote(null);
        toast.success("Note Restored Successfully");
        navigate(`/additional/trash`);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        toast.error("Failed to restore");
      } else toast.error(`Internal Error`);
    }
  };

  useEffect(() => {
    if (!note || tempNote === note.content) return;
    if (editNote !== note.id) return;

    setsaving(true);
    const timer = setTimeout(async () => {
      try {
        await putNotes(note.id, note.title, tempNote);
        setnote({ ...note, content: tempNote });
        renderNotes(folderId, type);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
        else toast.error("Internal Error");
      } finally {
        setsaving(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      setsaving(false);
    };
  }, [tempNote]);

  useEffect(() => {
    if (noteId) loadNote();
    else setnote(null);
    setoverlay(false);
    setfolderDropdown(false);
    setShowRestore(false);
    setconfirmDelete(false);
  }, [noteId]);

  useEffect(() => {
    if (note && !note.content?.trim()) {
      seteditNote(note.id);
      settempNote("");
    }
  }, [note?.id]);

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

  if (type === "trash" || showRestore) {
    return (
      <div className="p-12 pb-0 w-full flex justify-center items-center flex-col gap-5 min-h-screen">
        <History size={90} strokeWidth={0.5} />
        <div className=" flex justify-center items-center w-full">
          <h1 className="text-3xl font-medium truncate">
            Restore "{note.title?.trim() ? note.title : "Untitled"}"
          </h1>
        </div>
        <p className="text-center text-background-700">
          Don't want to lose this note? It's not too late! Just click the
          'Restore' <br /> button and it will be added back to your list. It's
          that simple.
        </p>
        <button
          className="bg-primary-hover text-white rounded-md py-2 px-8 cursor-pointer"
          onClick={handleRestore}
        >
          Restore
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-mainbg flex flex-col p-[5%] gap-7"
      onClick={() => {
        setoverlay(false);
        setfolderDropdown(false);
      }}
    >
      <div className="flex justify-between items-center">
        {editTitle ? (
          <input
            autoFocus
            value={tempTitle}
            onChange={(e) => settempTitle(e.target.value)}
            onBlur={handleRenameTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRenameTitle();
              if (e.key === "Escape") seteditTitle(false);
            }}
            className="text-3xl w-180 font-bold text-text bg-transparent outline-none border-b border-primary overflow-hidden truncate"
          />
        ) : (
          <h1
            onDoubleClick={() => {
              seteditTitle(true);
              settempTitle(note.title?.trim() ? note.title : "Untitled");
            }}
            className="text-3xl w-180 truncate font-bold text-text cursor-text"
          >
            {note.title?.trim() ? note.title : "Untitled"}
          </h1>
        )}
        <CircleEllipsis
          size={30}
          className="text-primary hover:text-text cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setoverlay((prev) => !prev);
            setfolderDropdown(false);
          }}
        />
        {overlay && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-25 right-14 rounded-md p-4 w-60 text-md flex flex-col gap-4 bg-overlay text-text"
          >
            <button
              onClick={toggleFav}
              className="flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover"
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
              className="flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover"
            >
              <FolderArchive
                className={note.isArchived ? "text-blue-400 fill-blue-400" : ""}
              />
              {note.isArchived ? "Remove from Archives" : "Add to Archives"}
            </button>
            <hr className="w-50 border border-b-overlay"></hr>
            <button
              className="flex gap-4 items-center py-2 cursor-pointer hover:text-red-400 hover:bg-secondary-hover"
              onClick={() => {
                setoverlay(false);
                setconfirmDelete(true);
              }}
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

        <div className="flex items-center gap-17.5 py-3 relative w-1/2">
          <div className="text-primary flex items-center gap-5">
            <Folder size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-text text-sm underline decoration-primary underline-offset-4 font-bold">
              {note.folder.name}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setfolderDropdown((prev) => !prev);
                setoverlay(false);
              }}
              className="text-primary hover:text-text cursor-pointer"
            >
              <ChevronDown size={16} />
            </button>
          </div>
          {folderDropdown && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-10 left-0 bg-overlay rounded-md p-2 w-48 flex flex-col gap-1 z-50 shadow-lg max-h-60 overflow-y-auto hide-scrollbar"
            >
              {folders.map((f: any) => (
                <button
                  key={f.id}
                  onClick={() => handleMoveNote(f.id, f.name)}
                  className={`text-sm text-left px-3 py-2 rounded cursor-pointer hover:bg-secondary-hover
                    ${note.folder.name === f.name ? "text-primary font-semibold" : "text-text"}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full hide-scrollbar">
        {editNote === note.id ? (
          <textarea
            value={tempNote}
            autoFocus
            placeholder="Write here!"
            onFocus={(e) => {
              const len = e.target.value.length;
              e.target.setSelectionRange(len, len);
            }}
            onChange={(e) => settempNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") seteditNote(null);
            }}
            className="w-full bg-transparent outline-none resize-none text-secondary leading-relaxed text-base h-full placeholder:text-primary/40"
          />
        ) : (
          <p
            onDoubleClick={() => {
              seteditNote(note.id);
              settempNote(note.content);
            }}
            className="text-secondary leading-relaxed text-base cursor-text whitespace-pre-wrap"
          >
            {note.content?.trim() ? (
              note.content
            ) : (
              <span className="text-primary/40">Write here!</span>
            )}
          </p>
        )}
      </div>

      <div className="flex justify-end items-center h-6">
        {saving && (
          <div className="flex items-center gap-2 text-primary/50">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-xs">Saving...</span>
          </div>
        )}
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message="This note will be moved to Trash. You can restore it later."
          onCancel={() => setconfirmDelete(false)}
          onConfirm={() => {
            setconfirmDelete(false);
            handleDelete();
          }}
        />
      )}
    </div>
  );
};

export default RightSide;
