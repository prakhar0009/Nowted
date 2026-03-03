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
