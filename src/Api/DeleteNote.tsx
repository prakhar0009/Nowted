import api from "./Api";

const DeleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
export default DeleteNote;
