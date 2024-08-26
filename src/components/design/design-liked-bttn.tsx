"use client";

import Modal from "../ui/modal";
import { Heart, Loader2 } from "lucide-react";
import LoginForm from "../login/login-form";
import { modifyLikedDesign } from "@/actions/designs/action";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

import { useLikedDesign } from "@/hooks/useLikedDesign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { useCountLikedDesign } from "@/hooks/useCountLikedDesign";

function DesignLikedBttn({ designId }: { designId: string }) {
  const { data: user } = useUser();
  const pathname = usePathname();

  // change UI of liked icon in discover page vs discover/designId page based on the params
  const isDesignInfoPage = pathname === `/discover/${designId}`;

  const { isLoading: isLoadingLiked, data: likedDesign } =
    useLikedDesign(designId);

  const { isLoading: isLoadingCount, data: likedCount } =
    useCountLikedDesign(designId);

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["mutate_liked"],
    mutationFn: () => modifyLikedDesign(designId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["liked"],
      });
      queryClient.invalidateQueries({ queryKey: ["liked_count"] });
      queryClient.invalidateQueries({ queryKey: [designId] });
    },
  });

  const router = useRouter();

  const render = (
    <div className="flex items-center gap-2">
      {!user ? (
        <Modal
          title="Login to like a design"
          description="If you have no account go to register page"
          classname={`${
            !isDesignInfoPage
              ? "hover:bg-transparent border-none p-0"
              : "h-10 w-10 p-[7px] bg-background hover:bg-secondary"
          }`}
          trigger={
            <Heart
              fill={isDesignInfoPage ? "white" : "gray"}
              size={isDesignInfoPage ? 26 : 20}
            />
          }
        >
          <LoginForm />
        </Modal>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            try {
              mutate();
            } finally {
              router.refresh();
            }
          }}
        >
          <div>
            <Button
              className={`rounded-full ${
                isDesignInfoPage
                  ? "h-10 w-10 p-[7px] bg-background"
                  : "hover:bg-transparent border-none p-0"
              }`}
              variant={"outline"}
            >
              {isLoadingLiked || isPending || isLoadingCount ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Heart
                  size={isDesignInfoPage ? 26 : 20}
                  fill={
                    likedDesign?.isLiked
                      ? "red"
                      : isDesignInfoPage
                      ? "white"
                      : "gray"
                  }
                />
              )}
            </Button>
          </div>
        </form>
      )}
      <p className="text-gray-500 text-xs sm:text-sm">
        {isLoadingCount ? 0 : likedCount?.likedCount}
      </p>
    </div>
  );
  return <div>{render}</div>;
}

export default DesignLikedBttn;
