import { Toaster } from "react-hot-toast";
import Sidebar from "../components/sidebar/Sidebar";
import NotesList from "../components/notes/NotesList";
import NoteEditor from "../components/editor/NoteEditor";

const Home = () => {
  return (
    <div className="flex w-full h-full bg-mainbg overflow-hidden">
      <div className="w-[20%] h-full border-r border-white/5">
        <Sidebar />
      </div>
      <div className="w-[25%] h-full border-r border-white/5">
        <NotesList />
      </div>
      <div className="w-[55%] h-full">
        <NoteEditor />
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
