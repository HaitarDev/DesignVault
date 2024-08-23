import SelectDesignsByPopularity from "@/components/discover/SelectDesignsByPopularity";

import SelectDesignByTags from "@/components/discover/SelectDesignByTags";
import DisplayDesigns from "@/components/discover/DisplayDesigns";
import { getDesigns } from "@/actions/designs/action";

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const followBy = searchParams?.followBy ?? "following";
  const tags = searchParams?.tags?.split("-") ?? null;

  const data = await getDesigns({ followBy, tags });
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <SelectDesignsByPopularity defaultFollowedBy={followBy} />
          <SelectDesignByTags />
        </div>
        {data && <DisplayDesigns initialDesigns={data} />}
      </div>
    </div>
  );
}
