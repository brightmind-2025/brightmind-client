
import axios from "axios";

const API_URL = "http://localhost:4004/api/user";

export const fetchAllUsers = async () => {
    const response = await axios.get(`${API_URL}/user-info`);
    return response.data;
  };
  