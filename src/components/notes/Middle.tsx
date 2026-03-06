import { useEffect, useState, useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import { DeleteNote } from "../../Api/NoteApi";
import { Trash2 } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const SkeletonCard = () => (
  <div className="w-full p-5 rounded-xl border border-middle-active/5 bg-secondary-hover flex flex-col gap-3">
    <div className="flex justify-between items-center">
      <div className="h-3 w-2/3 rounded-full bg-primary/10" />
      <div className="h-3 w-5 rounded-full bg-primary/10" />
    </div>
    <div className="flex justify-between items-center">
      <div className="h-2.5 w-1/4 rounded-full bg-primary/10" />
      <div className="h-2.5 w-1/3 rounded-full bg-primary/10" />
    </div>
  </div>
);

const Middle = () => {
  const { notes, setNotes, folders, renderNotes, isSearching } =
    useContext(NoteContext);
  const [folderName, setfolderName] = useState<string>("");
  const [loading, setloading] = useState(false);
  const { folderId, type } = useParams<{ folderId?: string; type?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearching) return;
    if (!folderId && !type) {
      if (folders.length > 0) {
        navigate(`/${folders[0].id}`);
      }
      return;
    }
    if (folderId) {
      const currFolder = folders.find((f: any) => f.id === folderId);
      if (currFolder) setfolderName(currFolder.name);
    }
  }, [folders]);

  useEffect(() => {
    if (isSearching) return;
    if (!folderId && !type) return;

    setNotes([]);
    setloading(true);

    if (type === "trash") {
      setfolderName("Trash");
    } else if (type === "favorite") {
      setfolderName("Favorite");
    } else if (type === "archive") {
      setfolderName("Archive");
    } else if (folderId) {
      const currFolder = folders.find((f: any) => f.id === folderId);
      if (currFolder) setfolderName(currFolder.name);
    } else {
      setfolderName("");
    }

    renderNotes(folderId, type).finally(() => setloading(false));
  }, [folderId, type]);

  if (!folderId && !type) {
    return <div className="w-full h-full bg-middleScreen" />;
  }

  return (
    <div className="w-full h-full bg-middleScreen flex flex-col">
      <div className="w-full p-[8%] pb-[4%]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-text truncate w-80">
            {isSearching
              ? "Searching"
              : folderId
                ? folderName
                : type === "trash"
                  ? "Trash"
                  : type === "favorite"
                    ? "Favorite"
                    : type === "archive"
                      ? "Archived"
                      : "Select Folder"}
          </h2>
          <p className="text-primary text-sm">{notes.length} Notes</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8%] flex flex-col gap-3 pb-7 hide-scrollbar">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          notes.map((curr: any) => (
            <NavLink
              key={curr.id}
              to={
                type === "trash"
                  ? `/additional/trash/${curr.id}`
                  : type === "favorite"
                    ? `/additional/favorite/${curr.id}`
                    : type === "archive"
                      ? `/additional/archive/${curr.id}`
                      : `/${curr.folderId}/${curr.id}`
              }
              className={({ isActive }) =>
                `w-full p-5 rounded-xl border border-middle-active/5 cursor-pointer block
                ${isActive ? "bg-middle-active" : "bg-secondary-hover hover:bg-middle-active/5"} hover:shadow-lg hover:shadow-primary-hover duration-400 hover:translate-y-1`
              }
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-text truncate">
                  {curr.title?.trim() ? curr.title : "Untitled"}
                </h4>
                {type !== "trash" && (
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        await DeleteNote(curr.id);
                        setNotes((prev: any[]) =>
                          prev.filter((n) => n.id !== curr.id),
                        );
                        toast.success("File is deleted");
                        navigate(type ? `/additional/${type}` : `/${folderId}`);
                      } catch {
                        toast.error("Internal Error");
                      }
                    }}
                    className="text-primary hover:text-red-400 transition-all ml-2"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center text-[14px] text-primary">
                <p>{new Date(curr.createdAt).toLocaleDateString("en-GB")}</p>
                <p className="truncate ml-3 opacity-70">{curr.preview}</p>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default Middle;
