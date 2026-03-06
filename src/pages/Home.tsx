import { Toaster } from "react-hot-toast";
import Sidebar from "../components/sidebar/Sidebar";
import Middle from "../components/notes/Middle";
import RightSide from "../components/editor/RightSide";

const Home = () => {
  return (
    <div className="flex w-full h-full bg-mainbg overflow-hidden">
      <div className="w-[20%] h-full border-r border-white/5">
        <Sidebar />
      </div>
      <div className="w-[25%] h-full border-r border-white/5">
        <Middle />
      </div>
      <div className="w-[55%] h-full">
        <RightSide />
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
