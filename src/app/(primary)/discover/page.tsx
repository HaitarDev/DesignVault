"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getDesigns } from "@/actions/designs/action";
import { useInView } from "react-intersection-observer";
import DisplayDesigns, { Design } from "@/components/discover/DisplayDesigns";
import SelectDesignsByPopularity from "@/components/discover/SelectDesignsByPopularity";
import SelectDesignByTags from "@/components/discover/SelectDesignByTags";
import { Loader2 } from "lucide-react";

export type TagsControll = {
  tags: string[];
  tagName: string;
  tagError: string;
};

function DiscoverPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const [tags, setTags] = useState<TagsControll>({
    tags: [],
    tagName: "",
    tagError: "",
  });
  const followBy = searchParams?.followBy ?? "following";

  const {
    data: designs,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["designs", tags.tags, followBy],
    queryFn: async ({ pageParam }) =>
      getDesigns({ followBy, tags: tags.tags, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  if (error) return <div className="text-red-500">{error.message}</div>;

  const allDesigns = designs?.pages.flatMap(
    (data) => data && data.data
  ) as Design[];

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <SelectDesignsByPopularity defaultFollowedBy={followBy} />
          <SelectDesignByTags tags={tags} setTags={setTags} />
        </div>
        {isLoading || !designs?.pages[0]?.data ? (
          <div className="text-3xl">Loading ...</div>
        ) : (
          <DisplayDesigns designs={allDesigns} />
        )}
      </div>
      {!!hasNextPage && (
        <Loader2 ref={ref} className="animate-spin mx-auto w-16 h-16 mt-4" />
      )}
    </div>
  );
}

export default DiscoverPage;
