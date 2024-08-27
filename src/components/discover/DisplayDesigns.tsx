"use client";

import { Designs, Users } from "@/types/database";
import Image from "next/image";
import CustomAvatar from "../ui/customAvatar";
import Link from "next/link";
import DesignLikedBttn from "../design/design-liked-bttn";
import { Eye } from "lucide-react";
import DesignBookmarkBttn from "../design/design-bookmark-bttn";
import { useRouter } from "next/navigation";

export interface Design extends Designs {
  users: Users | null;
}

function DisplayDesigns({ designs }: { designs: Design[] }) {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {designs.map((design, i) => {
          if (!design) return;
          const designer = design.users;
          return (
            <div className="flex flex-col gap-2" key={i}>
              <div className="relative aspect-square overflow-hidden group ">
                <Image
                  onClick={() => router.push(`/discover/${design.id}`)}
                  src={design.img_url ?? ""}
                  alt="course image"
                  fill
                  className="rounded-md object-cover cursor-pointer"
                  sizes="30"
                  priority
                />
                <div className="absolute top-2/3 bottom-0 right-0  w-full bg-gradient-to-b from-transparent to-black/50 z-10  items-center justify-between p-2 pt-8 rounded-md flex group-hover:opacity-100  opacity-0 duration-200 transition-all">
                  <h4
                    className=" text-white text-sm font-medium sm:text-lg cursor-pointer"
                    onClick={() => router.push(`/discover/${design.id}`)}
                  >
                    {design.title}
                  </h4>
                  <div className="flex items-center gap-2 z-20">
                    <DesignBookmarkBttn designId={design.id} />
                    <DesignLikedBttn
                      designId={design.id}
                      largeLiked={true}
                      hideLikedCount={true}
                    />
                  </div>
                </div>
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
                  <DesignLikedBttn designId={design.id} />
                  <div className="flex items-center gap-2">
                    <Eye size={20} color="grey" />
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {design.views}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DisplayDesigns;
