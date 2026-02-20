import axios from "axios";

const api = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

const GetApi = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export default GetApi;
