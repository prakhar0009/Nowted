import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getArchiveNotes,
  getFavoriteNotes,
  getDeletedNotes,
  getRecentNotes,
  getNoteById,
  getNotesByFolder,
} from "../Api/note.api";

import { getFolders } from "../Api/folder.api";

export const NoteContext = createContext<any>(null);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [recentNotes, setRecentNotes] = useState<any[]>([]);
  const [currentNote, setcurrentNote] = useState<any>(null);
  const [isSearching, setisSearching] = useState(false);

  const renderNotes = async (folderId?: string, type?: string) => {
    try {
      let res: any[] = [];
      if (type === "trash") res = await getDeletedNotes();
      else if (type === "favorite") res = await getFavoriteNotes();
      else if (type === "archive") res = await getArchiveNotes();
      else if (folderId) res = await getNotesByFolder(folderId);
      setNotes(res || []);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  const renderFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data || []);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  const renderRecent = async () => {
    try {
      const data = await getRecentNotes();
      setRecentNotes(data || []);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  const reloadNote = async (noteId: string) => {
    try {
      const res = await getNoteById(noteId);
      setcurrentNote(res);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  useEffect(() => {
    renderFolders();
    renderRecent();
  }, []);

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        folders,
        setFolders,
        recentNotes,
        currentNote,
        setcurrentNote,
        isSearching,
        setisSearching,
        renderNotes,
        renderFolders,
        renderRecent,
        reloadNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
