import toast from "react-hot-toast";
import api from "./Api";
import type { Folder } from "../data/notes";

export const getFolders = async (): Promise<Folder[]> => {
  try {
    const res = await api.get("/folders");
    return res.data.folders || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const getRecentNotes = async (): Promise<Folder[]> => {
  try {
    const res = await api.get("/notes/recent");
    return res.data.recentNotes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const getNotesByFolder = async (folderId: string): Promise<Folder[]> => {
  try {
    const res = await api.get("/notes", { params: { folderId } });
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
  try {
    const res = await api.get(`/notes?deleted=true`);
    return res.data.notes;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};
