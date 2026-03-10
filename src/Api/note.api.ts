import toast from "react-hot-toast";
import api from "./api";
import type { Note } from "../types/type";

type NotePatch = Partial<{
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  folderId: string;
}>;

const getNotesByFilter = async (filter: string): Promise<Note[]> => {
  try {
    const res = await api.get(`/notes?${filter}=true&limit=all`);
    return res.data.notes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const getRecentNotes = async (): Promise<Note[]> => {
  try {
    const res = await api.get("/notes/recent");
    return res.data.recentNotes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const getNotesByFolder = async (folderId: string): Promise<Note[]> => {
  try {
    const res = await api.get("/notes", {
      params: { folderId, limit: 1000 },
    });
    return res.data.notes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const getNoteById = async (id: string): Promise<string | null> => {
  try {
    const res = await api.get(`/notes/${id}`);
    return res.data.note || null;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return null;
  }
};

export const getDeletedNotes = async () => {
  return getNotesByFilter("deleted");
};

export const getFavoriteNotes = async () => {
  return getNotesByFilter("favorite");
};

export const getArchiveNotes = async () => {
  return getNotesByFilter("archived");
};

export const getSearchNotes = async (title: string) => {
  try {
    const res = await api.get(`notes?search=${title}&limit=all`);
    return res.data.notes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const createNote = async (
  folderId: string,
  title: string,
  content: string,
) => {
  try {
    const res = await api.post("/notes", { folderId, title, content });
    return res.data;
  } catch (e) {
    if (e instanceof Error) return e.message;
    else toast.error("Internal Error");
  }
};

export const restoreNote = async (id: string) => {
  try {
    const res = await api.post(`/notes/${id}/restore`);
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
  }
};

const patchNote = async (id: string, data: NotePatch) => {
  try {
    const res = await api.patch(`/notes/${id}`, data);
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
  }
};

export const putNotes = async (
  noteId: string,
  title: string,
  content: string,
) => {
  return patchNote(noteId, { title, content });
};

export const favNote = async (id: string, value: boolean) => {
  return patchNote(id, { isFavorite: value });
};

export const archiveNote = async (id: string, value: boolean) => {
  return patchNote(id, { isArchived: value });
};

export const moveNote = async (noteId: string, folderId: string) => {
  return patchNote(noteId, { folderId });
};

export const DeleteNote = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/notes/${id}`);
    return true;
  } catch {
    return false;
  }
};
