"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SelectDesignsByPopularity({
  defaultFollowedBy,
}: {
  defaultFollowedBy: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleValueChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!value) {
      current.delete("followBy");
    } else {
      current.set("followBy", value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };
  return (
    <Select defaultValue={defaultFollowedBy} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Following" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="following" defaultChecked>
          Following
        </SelectItem>
        <SelectItem value="popular">Popular</SelectItem>
        <SelectItem value="new">New</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SelectDesignsByPopularity;
