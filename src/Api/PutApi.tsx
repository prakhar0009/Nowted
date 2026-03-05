import api from "./Api";
import toast from "react-hot-toast";

export const putFolders = async (folderId: string, folderName: string) => {
  try {
    const res = await api.patch(`/folders/${folderId}`, { name: folderName });
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
  try {
    const res = await api.patch(`/notes/${noteId}`, {
      title,
      content,
    });
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
  }
};

export const favNote = async (id: string, value: boolean) => {
  try {
    const res = await api.patch(`/notes/${id}`, { isFavorite: value });
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
  }
};

export const archiveNote = async (id: string, value: boolean) => {
  try {
    const res = await api.patch(`/notes/${id}`, { isArchived: value });
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
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

export const moveNote = async (noteId: string, folderId: string) => {
  try {
    const res = await api.patch(`/notes/${noteId}`, { folderId });
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
  }
};
