import type { Note } from "../../types/type";

interface Props {
  note: Note;
  editNote: string | null;
  tempNote: string;
  saving: boolean;
  settempNote: (v: string) => void;
  seteditNote: (v: string | null) => void;
}

const NoteContent = ({
  note,
  editNote,
  tempNote,
  saving,
  settempNote,
  seteditNote,
}: Props) => {
  return (
    <>
      <div className="flex-1 overflow-y-auto w-full hide-scrollbar">
        {editNote === note.id ? (
          <textarea
            value={tempNote}
            autoFocus
            placeholder="Write here!"
            onFocus={(e) => {
              const len = e.target.value.length;
              e.target.setSelectionRange(len, len);
            }}
            onChange={(e) => settempNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") seteditNote(null);
            }}
            className="w-full bg-transparent outline-none resize-none text-secondary leading-relaxed text-base h-full placeholder:text-primary/40"
          />
        ) : (
          <p
            onDoubleClick={() => {
              seteditNote(note.id);
              settempNote(note.content);
            }}
            className="text-secondary leading-relaxed text-base cursor-text whitespace-pre-wrap"
          >
            {note.content?.trim() ? (
              note.content
            ) : (
              <span className="text-primary/40">Write here!</span>
            )}
          </p>
        )}
      </div>

      <div className="flex justify-end items-center h-6">
        {saving && (
          <div className="flex items-center gap-2 text-primary/50">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-xs">Saving...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default NoteContent;
