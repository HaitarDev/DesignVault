import { getUserClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUserClient();
      if (!user) return null;
      if (error) throw new Error("Error while fetching user");
      return user;
    },
  });

  return { isPending, error, data };
};
