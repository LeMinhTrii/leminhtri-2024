import axios from "axios";
import { API_URL } from "../ultils/var";

export const PostServices = {
  get: async (page, limit = 3) => {
    return await axios.get(`${API_URL}/blogs?page=${page}&limit=${limit}`);
  },
  show: async (id) => {
    return await axios.get(`${API_URL}/blogs/${id}`);
  },
  search: async (keyword = "") => {
    return await axios.get(`${API_URL}/searchblog?search=${keyword}`);
  },
};

// API_URL="http://localhost:3002/api"
