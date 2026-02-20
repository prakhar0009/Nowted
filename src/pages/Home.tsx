import LeftSide from "../components/LeftSide";
import Middle from "../components/Middle";
import RightSide from "../components/RightSide";

function Home() {
  return (
    <div className="flex w-full h-full bg-[#181818] overflow-hidden">
      <div className="w-[20%] h-full border-r border-white/5">
        <LeftSide />
      </div>
      <div className="w-[25%] h-full border-r border-white/5">
        <Middle />
      </div>
      <div className="w-[55%] h-full">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;
