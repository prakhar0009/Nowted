export type Note = {
  id: string;
  title: string;
  content: string;
  folderId: string;
  isFavorite: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  createdAt: string;
  preview: string;
  folder: { name: string };
};

export type Folder = {
  id: string;
  name: string;
  createdAt: string;
};

export type CreateNoteRequest = Omit<
  Note,
  "id" | "createdAt" | "isDeleted" | "preview" | "folder"
>;

export type UpdateNoteRequest = Partial<Omit<Note, "id" | "createdAt">>;

export type FolderLink = Pick<Folder, "id" | "name">;

export interface NoteContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  recentNotes: Note[];
  currentNote: Note | null;
  setcurrentNote: React.Dispatch<React.SetStateAction<Note | null>>;
  isSearching: boolean;
  setisSearching: (v: boolean) => void;
  renderNotes: (folderId?: string, type?: string) => Promise<void>;
  fetchNotes: (folderId?: string, type?: string) => Promise<Note[]>;
  renderFolders: () => Promise<void>;
  renderRecent: () => Promise<void>;
  reloadNote: (noteId: string) => Promise<void>;
}

export type Props = {
  currFolder: string | null;
  setcurrFolder: (id: string) => void;
  currFolderName: string | null;
  setcurrFolderName: (name: string) => void;
  onNoteCreated?: () => void;
};

export type FolderProps = {
  currFolder: string | null;
  currFolderName: string | null;
  render?: number;
  onNoteCreated?: () => void;
  setcurrNote?: (id: string) => void;
};

export type NoteProps = {
  currNote: string | null;
};

export type NoteWithFolder = Note & {
  folder: { name: string };
};
