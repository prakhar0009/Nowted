import { Plus, X, Search } from "lucide-react";
import { createNote } from "../Api/PostApi";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Nowted from "../assets/Nowted.svg";
import toast from "react-hot-toast";
import { NoteContext } from "../context/NoteContext";
import { getSearchNotes } from "../Api/GetApi";

const NewNote = () => {
  const [overlay, setoverlay] = useState(false);
  const [title, settitle] = useState("");
  const [message, setmessage] = useState("");
  const { folderId, type } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { renderNotes, renderRecent, setNotes, setisSearching } =
    useContext(NoteContext);

  const [search, setsearch] = useState(false);
  const searchData = searchParams.get("search") || "";

  useEffect(() => {
    if (searchData.trim() === "") {
      setisSearching(false);
      renderNotes(folderId, type);
      return;
    }

    setisSearching(true);

    const timer = setTimeout(async () => {
      try {
        const res = await getSearchNotes(searchData);
        setNotes(res);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchData]);

  const handleCloseSearch = () => {
    setsearch(false);
    setSearchParams({});
    setisSearching(false);
    renderNotes(folderId, type);
  };

  const handleNewNote = async () => {
    if (!folderId) return toast.error(`Select a folder first!`);
    if (title.trim() === "") return toast.error("File name can't be empty");
    try {
      const res = await createNote(folderId, title, message);
      toast.success("Note added successfully");
      settitle("");
      setoverlay(false);
      setmessage("");
      renderNotes(folderId, type);
      renderRecent();
      navigate(`/${folderId}/${res.note.id}`);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else toast.error("Internal Error");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <img
            src={Nowted}
            alt="Nowted_logo"
            className="dark:invert-0 invert-100"
          />
          <button
            onClick={() => {
              if (search) {
                handleCloseSearch();
              } else {
                setsearch(true);
              }
            }}
            className="text-xl cursor-pointer text-primary hover:text-secondary"
          >
            {search ? <X size={20} /> : <Search />}
          </button>
        </div>
      </div>

      {search ? (
        <input
          autoFocus
          value={searchData}
          placeholder="Search note here"
          onChange={(e) => {
            if (e.target.value.trim() === "") {
              setSearchParams({});
            } else {
              setSearchParams({ search: e.target.value });
            }
          }}
          onBlur={() => {
            if (searchData.trim() === "") handleCloseSearch();
          }}
          className="w-full py-3 px-4 border-0 rounded-md bg-secondary-hover text-text outline-none"
          type="text"
        />
      ) : (
        <button
          className="w-full py-3 rounded-md bg-secondary-hover flex items-center justify-center cursor-pointer gap-2"
          onClick={() => setoverlay(true)}
        >
          <span className="text-lg">
            <Plus />
          </span>
          <span className="font-medium">New Note</span>
        </button>
      )}

      {overlay && (
        <div
          onClick={() => setoverlay(false)}
          className="fixed inset-0 bg-overlaybg flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-overlay rounded-xl p-6 w-[90%] max-w-md flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-text font-semibold text-lg">New Note</h2>
              <button
                onClick={() => setoverlay(false)}
                className="text-primary hover:text-text"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-primary text-sm">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Enter note title"
                className="bg-middle-active text-text text-sm rounded px-3 py-2 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-primary text-sm">Content</label>
              <textarea
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                placeholder="Enter note content"
                rows={4}
                className="bg-middle-active text-text text-sm rounded px-3 py-2 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleNewNote}
              className="bg-primary hover:bg-secondary-hover text-text py-2 rounded-md text-sm transition-all"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewNote;
