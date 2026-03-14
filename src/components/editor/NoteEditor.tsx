import {
  CalendarDays,
  FolderIcon,
  FileText,
  History,
  ChevronDown,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  archiveNote,
  favNote,
  putNotes,
  restoreNote,
  DeleteNote,
  getNoteById,
} from "../../Api/note.api";
import api from "../../Api/api";
import toast from "react-hot-toast";
import { useNotes } from "../../context/NoteContext.ts";
import ConfirmDialog from "../ui/ConfirmDialog";
import NoteHeader from "./NoteHeader";
import NoteContent from "./NoteContent";
import type { Folder, Note } from "../../types/type";

const NoteEditor = () => {
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
  const [showRestore, setshowRestore] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [saving, setsaving] = useState(false);
  const navigate = useNavigate();

  const {
    setnotes,
    renderNotes,
    renderRecent,
    folders,
    currentNote: note,
    setcurrentNote: setnote,
  } = useNotes();

  const noteRef = useRef(note);
  useEffect(() => {
    noteRef.current = note;
  }, [note]);

  const loadNote = useCallback(async () => {
    if (!noteId) return;
    try {
      const res = await getNoteById(noteId);
      setnote(res);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }, [noteId, setnote]);

  const handleRenameTitle = async () => {
    if (!note) return;

    if (tempTitle.trim() === "") {
      seteditTitle(false);
      toast.error("Note name is required");
      return;
    }

    try {
      await putNotes(note.id, tempTitle, note.content);
      setnote({ ...note, title: tempTitle });
      setnotes((prev: Note[]) =>
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
      setnotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
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
        setnotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
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
        setnotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
        toast.success("Marked as Archived");
        if (type === "favorite") navigate("/additional/favorite");
        else navigate(`/${note.folderId}`);
      } else {
        setnotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
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
      setshowRestore(true);
      setnotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
      toast.success("Note moved to Trash");
      if (type === "archive") navigate("/additional/archive");
      else if (type === "favorite") navigate("/additional/favorite");
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
        setnotes((prev: Note[]) => prev.filter((n) => n.id !== note.id));
        renderRecent();
        setnote(null);
        toast.success("Note Restored Successfully");

        if (type === "trash") {
          navigate(`/additional/trash`);
        } else {
          navigate(`/${note.folderId}/${note.id}`);
          renderNotes(note.folderId);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        toast.error("Failed to restore");
      } else toast.error(`Internal Error`);
    }
  };

  useEffect(() => {
    const n = noteRef.current;
    if (!n || tempNote === n.content) return;
    if (editNote !== n.id) return;

    setsaving(true);
    const timer = setTimeout(async () => {
      const latest = noteRef.current;
      if (!latest) return;
      try {
        await putNotes(latest.id, latest.title, tempNote);
        setnote({ ...latest, content: tempNote });
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
  }, [tempNote, editNote, folderId, renderNotes, setnote, type]);

  useEffect(() => {
    if (noteId) loadNote();
    else setnote(null);
    setoverlay(false);
    setfolderDropdown(false);
    setshowRestore(false);
    setconfirmDelete(false);
  }, [noteId, loadNote, setnote]);

  useEffect(() => {
    if (note && !note.content?.trim()) {
      seteditNote(note.id);
      settempNote("");
    }
  }, [note]);

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
        <div className="flex justify-center items-center w-full">
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
      <NoteHeader
        note={note}
        editTitle={editTitle}
        tempTitle={tempTitle}
        overlay={overlay}
        settempTitle={settempTitle}
        seteditTitle={seteditTitle}
        setoverlay={setoverlay}
        setfolderDropdown={setfolderDropdown}
        setconfirmDelete={setconfirmDelete}
        handleRenameTitle={handleRenameTitle}
        toggleFav={toggleFav}
        toggleArchive={toggleArchive}
      />

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
            <FolderIcon size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-text text-sm underline decoration-primary max-w-100 truncate underline-offset-4 font-bold">
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
              className="absolute top-10 left-0 bg-overlay rounded-md p-2 w-48 flex flex-col gap-1 z-50 shadow-lg max-h-60 hide-scrollbar overflow-x-hidden"
            >
              {folders.map((f: Folder) => (
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

      <NoteContent
        note={note}
        editNote={editNote}
        tempNote={tempNote}
        saving={saving}
        settempNote={settempNote}
        seteditNote={seteditNote}
      />

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

export default NoteEditor;
