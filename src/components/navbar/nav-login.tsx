import React from "react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";

function NavLogin() {
  const isAuth = false;

  const render = !isAuth ? (
    <>
      <Button className="rounded-full " size={"lg"}>
        Login
      </Button>
      <Button
        variant={"ghost"}
        size={"lg"}
        className="rounded-full hidden sm:block"
      >
        Register
      </Button>
    </>
  ) : (
    <>
      <Avatar />
    </>
  );
  return <div className="flex gap-2 items-center">{render}</div>;
}

export default NavLogin;
