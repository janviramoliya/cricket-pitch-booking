import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../api/bookingApi";

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["my-booking"],
    queryFn: getMyBookings,
  });
};
