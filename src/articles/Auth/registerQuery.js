import axios from "axios";

const BACK_END_SERVER_URL = import.meta.env.VITE_BACKEND_API_URL;

const registerQuery = async ({ fullName, username, email, password }) => {
  try {
    const resposne = await axios.post(`${BACK_END_SERVER_URL}/user/register`, {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
    });

    return resposne.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default registerQuery;
