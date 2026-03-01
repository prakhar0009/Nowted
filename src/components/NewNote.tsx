import { Plus, X, Search } from "lucide-react";
import { createNote } from "../Api/PostApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nowted from "../assets/Nowted.svg";
import toast from "react-hot-toast";

const NewNote = () => {
  const [overlay, setoverlay] = useState(false);
  const [title, settitle] = useState("");
  const [message, setmessage] = useState("");
  const { folderId } = useParams();
  const navigate = useNavigate();

  const [search, setsearch] = useState(false);
  const [searchBar, setSearchBar] = useState("");

  const handleNewNote = async () => {
    if (!folderId) return toast.error(`Select a folder first!`);
    if (title.trim() === "") return toast.error("File name can't be empty");
    try {
      const res = await createNote(folderId, title, message);
      toast.success("Note added successfully");
      settitle("");
      setoverlay(false);
      setmessage("");
      navigate(`/${folderId}/${res.note.id}`);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else toast.error("Internal Error");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setoverlay(false);
      }
    };

    if (overlay) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [overlay]);

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
            onClick={() => setsearch(!search)}
            className="text-xl cursor-pointer text-primary hover:text-secondary"
          >
            {search ? <X size={20} /> : <Search />}
          </button>
        </div>
      </div>

      {search ? (
        <input
          autoFocus
          value={searchBar}
          placeholder="Search note here"
          onChange={(e) => setSearchBar(e.target.value)}
          onBlur={() => {
            if (searchBar.trim() === "") setsearch(false);
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
