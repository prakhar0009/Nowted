import React, { createContext, useContext, useState } from "react";
import {
  getNotesByFolder,
  getArchiveNotes,
  getFavoriteNotes,
  getDeletedNotes,
  getFolders,
} from "../Api/GetApi";

export const NoteContext = createContext<any>(null);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);

  const refreshNotes = async (folderId?: string, type?: string) => {
    try {
      let res = [];
      if (type === "trash")
        res = await getDeletedNotes(); //
      else if (type === "favorite")
        res = await getFavoriteNotes(); //
      else if (type === "archive")
        res = await getArchiveNotes(); //
      else if (folderId) res = await getNotesByFolder(folderId); //
      setNotes(res || []);
    } catch (e) {
      console.error("Error refreshing notes:", e);
    }
  };

  const refreshFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data || []);
    } catch (e) {
      console.error("Error refreshing folders:", e);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        folders,
        setFolders,
        refreshNotes,
        refreshFolders,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
