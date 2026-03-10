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
  const [notes, setnotes] = useState<any[]>([]);
  const [folders, setfolders] = useState<any[]>([]);
  const [recentNotes, setRecentNotes] = useState<any[]>([]);
  const [currentNote, setcurrentNote] = useState<any>(null);
  const [isSearching, setisSearching] = useState(false);
  const [page, setpage] = useState(1);
  const LIMIT = 10;

  const fetchNotes = async (
    folderId?: string,
    type?: string,
    targetPage?: number,
  ): Promise<any[]> => {
    const activePage = targetPage || page;
    try {
      let res: any[] = [];
      if (type === "trash") res = await getDeletedNotes(activePage);
      else if (type === "favorite") res = await getFavoriteNotes(activePage);
      else if (type === "archive") res = await getArchiveNotes(activePage);
      else if (folderId)
        res = await getNotesByFolder(folderId, activePage, LIMIT);
      return res || [];
    } catch (e) {
      return [];
    }
  };
  const renderNotes = async (folderId?: string, type?: string) => {
    const res = await fetchNotes(folderId, type);
    setnotes(res);
  };

  const renderFolders = async () => {
    try {
      const data = await getFolders();
      setfolders(data || []);
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
        setnotes,
        folders,
        setfolders,
        recentNotes,
        currentNote,
        setcurrentNote,
        isSearching,
        setisSearching,
        renderNotes,
        page,
        setpage,
        fetchNotes,
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
