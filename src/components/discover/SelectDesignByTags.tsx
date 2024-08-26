"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { TagsControll } from "@/app/(primary)/discover/page";
import { Label } from "../ui/label";

function SelectDesignByTags({
  tags,
  setTags,
}: {
  tags: TagsControll;
  setTags: Dispatch<SetStateAction<TagsControll>>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleTagChange = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    const newValue = tags.tags.join("-");

    if (!newValue) {
      newSearchParams.delete("tags");
    } else {
      newSearchParams.set("tags", newValue);
    }

    const search = newSearchParams.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tags.tags.length >= 3 || tags.tagName === "") {
      setTags((prev) => ({
        ...prev,
        tagError: "You can't pass an empty or more than 3 tags",
        tagName: "",
      }));
      return; // Prevent further processing if error exists
    }
    setTags((prev) => ({
      ...prev,
      tags: [...prev.tags, prev.tagName],
      tagName: "",
      tagError: "",
    }));

    handleTagChange(); // Update URL after successful tag update
  };

  return (
    <form onSubmit={handleTagSubmit} className="flex flex-col my-6 gap-2">
      <Label>Search by tags:</Label>
      <Input
        value={tags.tagName}
        onChange={(e) => {
          setTags((prev) => ({
            ...prev,
            tagName: e.target.value,
            tagError: "",
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
                tagName: "",
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
