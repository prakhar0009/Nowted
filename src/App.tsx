import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Gets from "./components/Gets";

function App() {
  Gets();
  return (
    <div className="w-full h-screen bg-[#181818] text-white overflow-hidden  dark:bg-white">
      <div className="w-full h-full mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
