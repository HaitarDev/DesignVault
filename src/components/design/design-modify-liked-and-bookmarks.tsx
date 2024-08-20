"use client";

import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

import DesignLikedBttn from "./design-liked-bttn";
import DesignBookmarkBttn from "./design-bookmark-bttn";

function DesignModifyLikedAndBookmarks({
  designId,
  user,
}: {
  designId: string;
  user: User | null;
}) {
  const [liked, setIsLiked] = useState<boolean>();

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
      <DesignLikedBttn designId={designId} user={user} />
      <DesignBookmarkBttn
        designId={designId}
        liked={liked ?? false}
        user={user}
      />

      <Button className="rounded-full">Get in touch</Button>
    </div>
  );
}

export default DesignModifyLikedAndBookmarks;
