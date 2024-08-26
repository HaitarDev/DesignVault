"use client";
import { createClient } from "@/utils/supabase/client";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const useLikedDesign = (designId: string) => {
  const supabase = createClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["liked", designId],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return { isLiked: false };

      const { data: likedDesign, error: likedError } = await supabase
        .from("liked_designs")
        .select("isLiked")
        .eq("design_id", designId)
        .eq("user_id", user.user.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      if (!likedDesign || likedError)
        return {
          isLiked: false,
        };

      return {
        isLiked: likedDesign.isLiked,
      };
    },
  });

  return { data, isLoading: isPending };
};
