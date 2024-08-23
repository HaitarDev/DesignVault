"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type TagsControll = {
  tags: string[];
  tagName: string;
  tagError: string;
};
function SelectDesignByTags() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [tags, setTags] = useState<TagsControll>({
    tags: [],
    tagName: "",
    tagError: "",
  });

  console.log(tags);
  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const newValue = tags.tags.join("-");

    if (!newValue) {
      current.delete("tags");
    } else {
      current.set("tags", newValue);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }, [tags.tags]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (tags.tags.length >= 3 || tags.tagName == "") {
          return setTags((prev) => ({
            ...prev,
            tagError: "You cant pass an empty or more than 3 tags",
            tagName: "",
          }));
        }
        setTags((prev) => ({
          ...prev,
          tags: [...prev.tags, prev.tagName],
          tagName: "",
        }));
      }}
      className="flex flex-col my-6 gap-2"
    >
      <Input
        value={tags.tagName}
        onChange={(e) => {
          setTags((prev) => ({
            ...prev,
            tagName: e.target.value,
          }));
        }}
        id="tags"
        type="text"
        placeholder="cars - computer science - art "
        className="py-1.5 pl-1 ring-1 focus:ring-2 sm:text-sm sm:leading-6 disabled:bg-black/10 sm:w-72"
      />
      <div className="flex flex-wrap gap-2 items-center">
        {tags.tags.map((tag) => (
          <Button
            size={"sm"}
            type="button"
            className="w-fit text-xs"
            variant={"secondary"}
            key={tag + Math.random()}
            onClick={() =>
              setTags((prev) => ({
                ...prev,
                tags: prev.tags.filter((oldTag) => oldTag !== tag),
              }))
            }
          >
            {tag.toUpperCase()}
            <X size={16} />
          </Button>
        ))}
      </div>
      {tags.tagError !== "" && (
        <p className="text-xs font-medium text-red-500">{tags.tagError}</p>
      )}
    </form>
  );
}

export default SelectDesignByTags;