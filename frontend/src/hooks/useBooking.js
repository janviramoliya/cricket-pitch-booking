import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useReserveSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      axios.post("http://localhost:4000/api/v1/booking/reserve-slot", data, {
        withCredentials: true,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
    },
  });
};

export const useConfirmBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      axios.post("http://localhost:4000/api/v1/booking/confirm-booking", data, {
        withCredentials: true,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
    },
  });
};
