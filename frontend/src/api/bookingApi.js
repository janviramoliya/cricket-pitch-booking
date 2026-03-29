import axios from "axios";

export const getMyBookings = async () => {
  const res = await axios.get(
    "http://localhost:4000/api/v1/booking/my-booking",
    { withCredentials: true },
  );
  return res.data;
};
