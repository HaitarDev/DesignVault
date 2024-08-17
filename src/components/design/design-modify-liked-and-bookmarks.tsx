"use client";

import { Bookmark, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { modifyLikedDesign } from "@/actions/designs/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DesignModifyLikedAndBookmarks({ designId }: { designId: string }) {
  const [liked, setIsLiked] = useState<boolean>();

  console.log(liked);

  const router = useRouter();
  return (
    <div className="flex gap-2">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isLiked = await modifyLikedDesign(designId);
          setIsLiked(isLiked);
          router.refresh();
        }}
      >
        <Button className="rounded-full h-10 w-10 p-[7px]" variant={"outline"}>
          <Heart fill={liked ? "red" : "white"} />
        </Button>
      </form>

      <Button className="rounded-full h-10 w-10 p-[7px] " variant={"outline"}>
        <Bookmark size={20} />
      </Button>
      <Button className="rounded-full">Get in touch</Button>
    </div>
  );
}

export default DesignModifyLikedAndBookmarks;
