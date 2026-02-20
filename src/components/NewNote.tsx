import { Plus } from "lucide-react";

const NewNote = () => {
  return (
    <button className="w-full py-3 border border-white/20 rounded-md hover:bg-white/5 transition-all flex items-center justify-center gap-2">
      <span className="text-lg">
        <Plus />
      </span>
      <span className="font-medium">New Note</span>
    </button>
  );
};

export default NewNote;
