import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@supabase/supabase-js";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signOut } from "@/actions/auth/actions";
import Link from "next/link";

function NavAvatar({
  user,
  avatar,
  username,
}: {
  user: User;
  username: string;
  avatar: string | null;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatar ?? ""} />
          <AvatarFallback>{user.email?.substring(0, 4)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="flex flex-col gap-2 items-center justify-center">
          <Avatar className="sm:w-14 sm:h-14">
            <AvatarImage src={avatar ?? ""} />
            <AvatarFallback>{username.substring(0, 4)}</AvatarFallback>
          </Avatar>
          <h4 className="text-base font-medium tracking-wider">Haitar</h4>
        </div>
        <Separator className="my-2" />
        <div className=" flex flex-col gap-2">
          {/* TODO : LINK */}
          <Link href={""}>
            <Button className="w-full justify-start" variant={"ghost"}>
              Upload design work
            </Button>
          </Link>
          <Link href={`${user.id}/settings`}>
            <Button className=" w-full justify-start" variant={"ghost"}>
              Settings
            </Button>
          </Link>
          <form>
            <Button
              className="w-full justify-start"
              formAction={signOut}
              variant={"destructive"}
            >
              Sign out
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default NavAvatar;
