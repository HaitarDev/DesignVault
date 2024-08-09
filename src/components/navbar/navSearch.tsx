"use client";

import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

function NavSearch() {
  const navigate = useRouter();

  return (
    <div className="flex items-center  sm:bg-secondary rounded-full px-2 border-primary/10 sm:border ">
      <Search
        className="bg-none sm:hidden"
        onClick={() => {
          navigate.push("/discover");
        }}
        color="gray"
      />
      <Search className="bg-none hidden sm:block" color="gray" />
      <Input
        className="bg-secondary hidden sm:block"
        placeholder="Search ..."
      />
    </div>
  );
}

export default NavSearch;
