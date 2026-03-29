import { useQuery } from "@tanstack/react-query";
import { getPitches } from "../api/pitchApi";

export const usePitches = () => {
  return useQuery({
    queryKey: ["pitches"],
    queryFn: getPitches,
  });
};
