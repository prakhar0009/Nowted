import { useEffect, useState, useContext, useRef } from "react";
import { NoteContext } from "../../context/NoteContext";
import { useNavigate, useParams } from "react-router-dom";

import NoteCard from "./NoteCard";
import NoteSkeleton from "./NoteSkeleton";

const NotesList = () => {
  const { notes, setnotes, folders, fetchNotes, isSearching } =
    useContext(NoteContext);

  const [folderName, setFolderName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);

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
      if (currFolder) setFolderName(currFolder.name);
    }
  }, [folders]);

  useEffect(() => {
    if (isSearching) return;
    if (!folderId && !type) return;

    setnotes([]);
    setLoading(true);
    const currentId = ++requestId.current;

    if (type === "trash") setFolderName("Trash");
    else if (type === "favorite") setFolderName("Favorite");
    else if (type === "archive") setFolderName("Archive");
    else if (folderId) {
      const currFolder = folders.find((f: any) => f.id === folderId);
      if (currFolder) setFolderName(currFolder.name);
    } else {
      setFolderName("");
    }

    fetchNotes(folderId, type).then((res: any[]) => {
      if (currentId !== requestId.current) return;
      setnotes(res);
      setLoading(false);
    });
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
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
          </>
        ) : (
          notes.map((note: any) => (
            <NoteCard
              key={note.id}
              note={note}
              type={type}
              folderId={folderId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
