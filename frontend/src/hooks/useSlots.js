import { useQuery } from "@tanstack/react-query";
import { getSlots } from "../api/pitchApi";

export const useSlots = (pitchId, bookingDate) => {
  return useQuery({
    queryKey: ["slots", pitchId, bookingDate],
    queryFn: () => getSlots(pitchId, bookingDate),
    enabled: !!pitchId, // only run if pitchId exists
  });
};
