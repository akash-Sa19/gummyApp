import axios from "axios";

const BACK_END_SERVER_URL = import.meta.env.VITE_BACKEND_API_URL;

const loginQuery = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BACK_END_SERVER_URL}/user/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default loginQuery;
