import axios from "axios";

export const getPitches = async () => {
  const res = await axios.get("http://localhost:4000/api/v1/pitch/", {
    withCredentials: true,
  });
  return res.data;
};

export const getSlots = async (pitchId, bookingDate) => {
  const res = await axios.get(
    `http://localhost:4000/api/v1/slot?pitchId=${pitchId}&bookingDate=${bookingDate}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
