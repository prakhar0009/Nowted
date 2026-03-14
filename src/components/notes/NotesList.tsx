import { useEffect, useState, useRef, useCallback } from "react";
import { useNotes } from "../../context/NoteContext";
import { useNavigate, useParams } from "react-router-dom";
import NoteCard from "./NoteCard";
import NoteSkeleton from "./NoteSkeleton";
import type { Folder, Note } from "../../types/type";

const PAGE_LIMIT = 10;

const NotesList = () => {
  const { notes, setnotes, folders, fetchNotes, isSearching } = useNotes();

  const [folderName, setFolderName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const requestId = useRef(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { folderId, type } = useParams<{ folderId?: string; type?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearching) return;
    if (!folderId && !type) return;

    setnotes([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);

    const currentId = ++requestId.current;

    if (type === "trash") setFolderName("Trash");
    else if (type === "favorite") setFolderName("Favorite");
    else if (type === "archive") setFolderName("Archive");
    else if (folderId) {
      const currFolder = folders.find((f: Folder) => f.id === folderId);
      if (currFolder) setFolderName(currFolder.name);
    } else {
      setFolderName("");
    }

    fetchNotes(folderId, type, 1, PAGE_LIMIT).then((res: Note[]) => {
      if (currentId !== requestId.current) return;
      setnotes(res);
      setHasMore(res.length === PAGE_LIMIT);
      setLoading(false);
    });
  }, [folderId, type, fetchNotes, folders, isSearching, setnotes]);

  useEffect(() => {
    if (isSearching) return;
    if (!folderId && !type) {
      if (folders.length > 0) navigate(`/${folders[0].id}`);
      return;
    }
    if (folderId) {
      const currFolder = folders.find((f: Folder) => f.id === folderId);
      if (currFolder) setFolderName(currFolder.name);
    }
  }, [folders, folderId, isSearching, navigate, type]);

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore || loading || isSearching || notes.length === 0)
      return;

    setLoadingMore(true);
    const nextPage = page + 1;
    const currentId = requestId.current;

    try {
      const res = await fetchNotes(folderId, type, nextPage, PAGE_LIMIT);
      if (currentId !== requestId.current) return;

      setnotes((prev: Note[]) => [...prev, ...res]);
      setPage(nextPage);
      setHasMore(res.length === PAGE_LIMIT);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMore(false);
    }
  }, [
    loadingMore,
    hasMore,
    loading,
    isSearching,
    notes.length,
    page,
    folderId,
    type,
    fetchNotes,
    setnotes,
  ]);

  useEffect(() => {
    if (loading || notes.length === 0 || !hasMore) return;
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMore();
      },
      { threshold: 0.1 },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleLoadMore, loading, notes.length, hasMore]);

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
          <>
            {notes.map((note: Note) => (
              <NoteCard
                key={note.id}
                note={note}
                type={type}
                folderId={folderId}
              />
            ))}

            <div ref={loaderRef} className="w-full">
              {loadingMore && (
                <>
                  <NoteSkeleton />
                  <NoteSkeleton />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotesList;
