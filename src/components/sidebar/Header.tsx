import { Plus, X, Search } from "lucide-react";
import { createNote, getSearchNotes } from "../../Api/note.api";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Nowted from "../../assets/Nowted.svg";
import toast from "react-hot-toast";
import { NoteContext } from "../../context/NoteContext";

const Header = () => {
  const { folderId, type } = useParams();
  const navigate = useNavigate();
  const [searchParams, setsearchParams] = useSearchParams();
  const { renderNotes, renderRecent, setnotes, setisSearching } =
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
        setnotes(res);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchData]);

  const handleCloseSearch = () => {
    setsearch(false);
    setsearchParams({});
    setisSearching(false);
    renderNotes(folderId, type);
  };

  const handleNewNote = async () => {
    if (!folderId) return toast.error(`Select a folder first!`);
    try {
      const res = await createNote(folderId, "Untitled", "");
      renderNotes(folderId, type);
      renderRecent();
      console.log(res);
      navigate(`/${folderId}/${res.id}`);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else toast.error("Internal Error");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-[8%]">
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
              setsearchParams({});
            } else {
              setsearchParams({ search: e.target.value });
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
          onClick={handleNewNote}
        >
          <span className="text-lg">
            <Plus />
          </span>
          <span className="font-medium">New Note</span>
        </button>
      )}
    </div>
  );
};

export default Header;
