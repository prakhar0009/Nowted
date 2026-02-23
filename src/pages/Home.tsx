import { useState } from "react";
import LeftSide from "../components/LeftSide";
import Middle from "../components/Middle";
import RightSide from "../components/RightSide";

const Home = () => {
  const [currFolder, setcurrFolder] = useState<string | null>(null);
  const [refresh, setrefresh] = useState(0);
  const [currNote, setcurrNote] = useState<string | null>(null);
  return (
    <div className="flex w-full h-full bg-[#181818] overflow-hidden">
      <div className="w-[20%] h-full border-r border-white/5">
        <LeftSide
          setcurrFolder={setcurrFolder}
          currFolder={currFolder}
          onNoteCreated={() => setrefresh((r) => r + 1)}
        />
      </div>
      <div className="w-[25%] h-full border-r border-white/5">
        <Middle
          currFolder={currFolder}
          refresh={refresh}
          setcurrNote={setcurrNote}
        />
      </div>
      <div className="w-[55%] h-full">
        <RightSide currNote={currNote} />
      </div>
    </div>
  );
};

export default Home;
