import React from "react";
import Logo from "./logo";

import NavLogin from "./nav-login";
import NavSearch from "./navSearch";

function Navbar() {
  return (
    <div className=" container p-2 flex items-center justify-between">
      <Logo />
      <NavSearch />
      <NavLogin />
    </div>
  );
}

export default Navbar;
