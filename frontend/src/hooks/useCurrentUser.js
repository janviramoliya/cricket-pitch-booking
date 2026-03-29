import { useQuery } from "@tanstack/react-query";
import api from "../api";

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await api.get("/api/v1/auth/me", {
        withCredentials: true,
      });
      return res.data;
    },
    retry: false, // ❗ IMPORTANT
    refetchOnWindowFocus: false, // ❗ stop auto refetch
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
};
