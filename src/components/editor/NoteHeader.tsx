import { CircleEllipsis, Star, FolderArchive, Trash } from "lucide-react";

interface Props {
  note: any;
  editTitle: boolean;
  tempTitle: string;
  overlay: boolean;
  settempTitle: (v: string) => void;
  seteditTitle: (v: boolean) => void;
  setoverlay: (v: boolean) => void;
  setfolderDropdown: (v: boolean) => void;
  setconfirmDelete: (v: boolean) => void;
  handleRenameTitle: () => void;
  toggleFav: () => void;
  toggleArchive: () => void;
}

const NoteHeader = ({
  note,
  editTitle,
  tempTitle,
  overlay,
  settempTitle,
  seteditTitle,
  setoverlay,
  setfolderDropdown,
  setconfirmDelete,
  handleRenameTitle,
  toggleFav,
  toggleArchive,
}: Props) => {
  return (
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
          setoverlay(!overlay);
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
          <hr className="w-50 border border-b-overlay" />
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
  );
};

export default NoteHeader;
