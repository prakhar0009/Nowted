import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getNotesByFolder,
  getArchiveNotes,
  getFavoriteNotes,
  getDeletedNotes,
  getFolders,
  getRecentNotes,
  getNoteById,
} from "../Api/GetApi";

export const NoteContext = createContext<any>(null);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [recentNotes, setRecentNotes] = useState<any[]>([]);
  const [currentNote, setcurrentNote] = useState<any>(null);

  const renderNotes = async (folderId?: string, type?: string) => {
    try {
      let res = [];
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
