import axios from "axios";

const apiCall = async (url, config = {}) => {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json"    };

    const mergedConfig = {
      ...config,
      headers: {
        ...defaultHeaders,
        ...(config.headers || {}),
      },
    };

    const response = await axios.get(url, mergedConfig);
    return response.data;
  }
   catch (error) {
    console.warn('try again')
    // no need for retry login for now
    // if (retries > 0) {
    //   console.warn(`Retrying... (${3 - retries + 1})`);
    //   return apiCall(url, retries - 1, config);
    // }
    throw new Error(error.response?.data?.error || "Failed to fetch data");
  }
};

export default apiCall;
