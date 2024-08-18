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

function DesignModifyLikedAndBookmarks({
  designId,
  user,
}: {
  designId: string;
  user: User | null;
}) {
  const [liked, setIsLiked] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);

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
          console.log(payload.new.isLiked);
        }
      )
      .subscribe();
  }, [liked]);

  const render = !user ? (
    <Modal trigger={<Heart fill={liked ? "red" : "white"} />}>
      <LoginForm />
    </Modal>
  ) : (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          setIsLoading(true);
          await modifyLikedDesign(designId);
        } finally {
          router.refresh();
          setIsLoading(false);
        }
      }}
    >
      <Button className="rounded-full h-10 w-10 p-[7px]" variant={"outline"}>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Heart fill={liked ? "red" : "white"} />
        )}
      </Button>
    </form>
  );

  return (
    <div className="flex gap-2">
      {render}

      <Button className="rounded-full h-10 w-10 p-[7px] " variant={"outline"}>
        <Bookmark size={20} />
      </Button>
      <Button className="rounded-full">Get in touch</Button>
    </div>
  );
}

export default DesignModifyLikedAndBookmarks;
