import axios from "axios";

export const loginUser = async (data) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/auth/login",
    data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/auth/register",
    data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
