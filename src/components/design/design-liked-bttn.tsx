"use client";

import Modal from "../ui/modal";
import { Heart, Loader2 } from "lucide-react";
import LoginForm from "../login/login-form";
import { modifyLikedDesign } from "@/actions/designs/action";
import { Button } from "../ui/button";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

function DesignLikedBttn({
  liked,
  user,
  designId,
}: {
  designId: string;
  liked: boolean;
  user: User | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const render = !user ? (
    <Modal
      title="Login to like a design"
      description="If you have no account go to register page"
      trigger={<Heart fill={liked ? "red" : "white"} />}
    >
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

  return <div>{render}</div>;
}

export default DesignLikedBttn;
