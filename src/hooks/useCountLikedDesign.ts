"use client";
import { createClient } from "@/utils/supabase/client";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const useCountLikedDesign = (designId: string) => {
  const supabase = createClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["liked_count", designId],
    enabled: designId != "",
    queryFn: async () => {
      const { data } = await supabase
        .from("designs")
        .select("liked_count")
        .eq("id", designId)
        .single();

      if (error) throw new Error(error.message);
      if (!data)
        return {
          likedCount: 0,
        };

      return {
        likedCount: data.liked_count,
      };
    },
  });

  return { data, isLoading: isPending };
};
