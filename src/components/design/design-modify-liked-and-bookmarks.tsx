"use client";

import { Bookmark, Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { modifyLikedDesign } from "@/actions/designs/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

import LoginForm from "../login/login-form";
import Modal from "../ui/modal";
import DesignLikedBttn from "./design-liked-bttn";

function DesignModifyLikedAndBookmarks({
  designId,
  user,
}: {
  designId: string;
  user: User | null;
}) {
  const [liked, setIsLiked] = useState<boolean>();
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getIsLiked = async () => {
      const { error, data } = await createClient()
        .from("liked_designs")
        .select("*")
        .eq("design_id", designId)
        .eq("user_id", user?.id!)
        .single();

      if (error) return setIsLiked(false);
      setIsLiked(data?.isLiked ?? false);
    };

    if (user) {
      // Fetch data only if user is logged in
      getIsLiked();
    }
  }, [designId, user]);

  useEffect(() => {
    const subscribeChannel = createClient()
      .channel("liked_designs")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "liked_designs",
        },
        async (payload: any) => {
          setIsLiked(payload.new.isLiked);
        }
      )
      .subscribe();
  }, [liked]);

  return (
    <div className="flex gap-2">
      <DesignLikedBttn designId={designId} liked={liked ?? false} user={user} />

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setIsBookmarkLoading(true);
            await modifyLikedDesign(designId);
          } finally {
            router.refresh();
            setIsBookmarkLoading(false);
          }
        }}
      >
        <Button className="rounded-full h-10 w-10 p-[7px] " variant={"outline"}>
          {isBookmarkLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Bookmark size={20} />
          )}
        </Button>
      </form>

      <Button className="rounded-full">Get in touch</Button>
    </div>
  );
}

export default DesignModifyLikedAndBookmarks;
