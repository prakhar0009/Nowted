import api from "./Api";

export const DeleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
