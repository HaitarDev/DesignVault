import { getUser } from "@/utils/supabase/server";
import { PartyPopper } from "lucide-react";
import React from "react";

async function ConfirmUser() {
  const user = await getUser();
  console.log(user);
  return (
    <div className="w-full h-svh flex items-center justify-center text-center flex-col gap-9">
      <h2 className="text-pretty text-2xl font-medium ">
        Please check your email and confirm your registration
      </h2>
      <PartyPopper className="text-amber-600" size={100} />
    </div>
  );
}

export default ConfirmUser;
