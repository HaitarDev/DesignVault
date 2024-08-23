"use client";

import { Designs, Users } from "@/types/database";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Image from "next/image";
import CustomAvatar from "../ui/customAvatar";
import Link from "next/link";
import DesignLikedBttn from "../design/design-liked-bttn";
import DesignBookmarkBttn from "../design/design-bookmark-bttn";

import { getUserClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { getDesigns } from "@/actions/designs/action";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Design extends Designs {
  users: Users | null;
}
function DisplayDesigns({ initialDesigns }: { initialDesigns: Design[] }) {
  const [user, setUser] = useState<User | null>();
  const [designs, setDesigns] = useState(initialDesigns);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const searchParams = useSearchParams();
  const followBy = searchParams.get("followBy") ?? "following";
  const tags = searchParams.get("tags")?.split("-") ?? null;

  async function loadMoreMovies() {
    const next = page + 1;
    const designs = await getDesigns({ followBy, tags, page: next });
    if (designs?.length) {
      setPage(next);
      console.log(page, next);
      setDesigns((prev: Design[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...designs,
      ]);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserClient();
      if (!user) return;
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {designs.map((design, i) => {
          const designer = design.users;
          return (
            <div className="flex flex-col gap-2" key={i}>
              <div className="relative aspect-square ">
                <Image
                  src={design.img_url ?? ""}
                  alt="course image"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <Link href={`/${design.user_id}/profile`}>
                    <CustomAvatar
                      size={40}
                      src={designer?.avatar_url ?? ""}
                      alt={designer?.avatar_url ?? ""}
                      key={designer?.avatar_url}
                    />
                  </Link>
                  <Link
                    className="text-xs sm:text-sm md:text-base font-medium"
                    href={`/${design.user_id}/profile`}
                  >
                    {designer?.username}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <DesignLikedBttn designId={design.id} user={user} />
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {design.liked_count}
                  </p>
                  <DesignBookmarkBttn designId={design.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {loading && (
        <div className="mx-auto flex items-center" ref={ref}>
          <p className="font-medium">Loading</p>
          <Loader2 className="animate-spin w-8 h-8  text-gray-400" />
        </div>
      )}
    </>
  );
}

export default DisplayDesigns;
