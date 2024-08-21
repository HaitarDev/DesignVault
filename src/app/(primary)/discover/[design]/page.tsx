import DesignModifyLikedAndBookmarks from "@/components/design/design-modify-liked-and-bookmarks";
import CustomAvatar from "@/components/ui/customAvatar";
import { createClient, getUser } from "@/utils/supabase/server";

import Image from "next/image";

async function DesignPage({ params }: { params: { design: string } }) {
  const supabase = createClient();
  const { error } = await supabase.rpc("increment", {
    design_id: params.design,
  });

  if (error) console.log("Error on increment views");

  const { data } = await supabase
    .from("designs")
    .select("*, users(*)")
    .eq("id", params.design)
    .single();

  const user = await getUser();

  if (!data)
    return (
      <div className="text-center mt-40 font-semibold sm:text-4xl">
        These Design are not available
      </div>
    );

  return (
    <div className=" container py-2 mb-8 ">
      <div className="flex flex-col gap-6">
        <h2 className="font-semibold text-2xl sm:text-2xl">{data?.title}</h2>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <CustomAvatar
              src={data.users?.avatar_url ?? ""}
              alt={data.users?.username.substring(0, 4)}
            />
            <h6 className="text-base font-medium">{data.users?.username}</h6>
          </div>
          <DesignModifyLikedAndBookmarks user={user} designId={params.design} />
        </div>
        <div
          className="bg-slate-50/80 relative aspect-video 
          h-[34rem] rounded-lg"
        >
          <Image
            src={data.img_url ?? ""}
            alt="design image"
            fill
            className="object-contain"
          />
        </div>

        <p
          className="text-start text-pretty text-lg leading-8
          tracking-wide"
        >
          {data.description}
        </p>
      </div>
    </div>
  );
}

export default DesignPage;
