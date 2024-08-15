import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { createClient, getUser } from "@/utils/supabase/server";
import NavAvatar from "./nav-avatar";

async function NavLogin() {
  const supabase = createClient();
  const user = await getUser();
  const { data: infoUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id!)
    .single();

  const render =
    !user || !infoUser ? (
      <>
        <Link href={"/login"}>
          <Button className="rounded-full " size={"lg"}>
            Login
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button
            variant={"ghost"}
            size={"lg"}
            className="rounded-full hidden sm:block"
          >
            Register
          </Button>
        </Link>
      </>
    ) : (
      <>
        <NavAvatar
          user={user}
          username={infoUser.username}
          avatar={infoUser.avatar_url}
        />
      </>
    );
  return <div className="flex gap-2 items-center">{render}</div>;
}

export default NavLogin;
