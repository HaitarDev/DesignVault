import { createClient } from "@/utils/supabase/server";

import SelectDesignsByPopularity from "@/components/discover/SelectDesignsByPopularity";

import SelectDesignByTags from "@/components/discover/SelectDesignByTags";

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const supabase = createClient();
  const followBy = searchParams?.followBy ?? "following";
  const tags = searchParams?.tags?.split("-") ?? null;

  const designs = supabase.from("designs").select("*");
  // 1) followedBy query
  followBy === "popular" && designs.order("views", { ascending: false });
  followBy === "new" && designs.order("created_at", { ascending: false });

  // 2) tags query
  if (tags && tags.length > 0) designs.overlaps("tags", tags);
  // 3)fetch data
  const { data } = await designs;

  console.log(data);
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <SelectDesignsByPopularity defaultFollowedBy={followBy} />
          <SelectDesignByTags />
        </div>
      </div>
    </div>
  );
}
