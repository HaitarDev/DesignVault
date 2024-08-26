"use client";

import { Button } from "../ui/button";

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
  return (
    <div className="flex items-center gap-2">
      <DesignLikedBttn designId={designId} />
      <DesignBookmarkBttn designId={designId} />

      <Button className="rounded-full">Get in touch</Button>
    </div>
  );
}

export default DesignModifyLikedAndBookmarks;
