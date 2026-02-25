import toast from "react-hot-toast";
import api from "./Api";

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
    else toast.error(`Internal Error`);
  }
};

export const createFolder = async (name: string) => {
  try {
    const res = await api.post("/folders", { name });
    return res.data;
  } catch (e) {
    if (e instanceof Error) return e.message;
    else toast.error(`Internal Error`);
  }
};
