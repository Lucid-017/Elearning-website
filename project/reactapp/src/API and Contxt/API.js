import axios from "axios";

const apiCall = async (url, retries = 1, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${3 - retries + 1})`);
      return apiCall(url, retries - 1, config);
    }
    throw new Error(error.response?.data?.error || "Failed to fetch data");
  }
};

export default apiCall;