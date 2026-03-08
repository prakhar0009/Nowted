import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="w-full h-full bg-mainbg text-text overflow-hidden light">
      <div className="w-full h-full mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additional/:type" element={<Home />} />
          <Route path="/additional/:type/:noteId" element={<Home />} />
          <Route path="/:folderId" element={<Home />} />
          <Route path="/:folderId/folder/:folderName" element={<Home />} />
          <Route path="/:folderId/:noteId" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
