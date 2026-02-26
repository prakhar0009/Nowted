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
  folderId: string,
  title: string,
  content: string,
) => {
  try {
    const res = await api.patch(`/notes/${folderId}`, {
      folderId,
      title,
      content,
    });
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
  }
};
