import { useState, useContext } from "react";
import { Trash2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { DeleteNote } from "../../Api/note.api";
import { NoteContext } from "../../context/NoteContext";
import ConfirmDialog from "../ui/ConfirmDialog";

interface Props {
  note: any;
  type?: string;
  folderId?: string;
}

const NoteCard = ({ note, type, folderId }: Props) => {
  const { setNotes } = useContext(NoteContext);

  const [confirmNote, setConfirmNote] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirmNote) return;
    try {
      await DeleteNote(confirmNote);

      setNotes((prev: any[]) => prev.filter((n) => n.id !== confirmNote));

      toast.success("File is deleted");

      navigate(type ? `/additional/${type}` : `/${folderId}`);
    } catch {
      toast.error("Internal Error");
    } finally {
      setConfirmNote(null);
    }
  };

  return (
    <>
      <NavLink
        to={
          type === "trash"
            ? `/additional/trash/${note.id}`
            : type === "favorite"
              ? `/additional/favorite/${note.id}`
              : type === "archive"
                ? `/additional/archive/${note.id}`
                : `/${note.folderId}/${note.id}`
        }
        className={({ isActive }) =>
          `w-full p-5 rounded-xl border border-middle-active/5 cursor-pointer block
          ${
            isActive
              ? "bg-middle-active"
              : "bg-secondary-hover hover:bg-middle-active/5"
          }
          hover:shadow-lg hover:shadow-primary-hover duration-400 hover:translate-y-1`
        }
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-text truncate">
            {note.title?.trim() ? note.title : "Untitled"}
          </h4>

          {type !== "trash" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirmNote(note.id);
              }}
              className="text-primary hover:text-red-400 transition-all ml-2"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>

        <div className="flex justify-between items-center text-[14px] text-primary">
          <p>{new Date(note.createdAt).toLocaleDateString("en-GB")}</p>
          <p className="truncate ml-3 opacity-70">{note.preview}</p>
        </div>
      </NavLink>

      {confirmNote && (
        <ConfirmDialog
          message="This note will be moved to Trash."
          onCancel={() => setConfirmNote(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default NoteCard;
