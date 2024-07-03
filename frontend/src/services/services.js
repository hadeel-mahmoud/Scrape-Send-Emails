import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getCommunities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/communities`);
    return response;
  } catch (error) {
    console.error("Error getting communities", error);
    throw error;
  }
};
