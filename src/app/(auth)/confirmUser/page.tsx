"use client";

import { getUserClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { PartyPopper } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function ConfirmUser() {
  const [isUser, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserClient();
      setUser(user);
    };

    getUser();
    if (isUser) {
      redirect("/discover");
    }
  }, [isUser]);

  return (
    <div className="w-full h-svh flex items-center justify-center text-center flex-col gap-9">
      <h2 className="text-pretty text-2xl font-medium ">
        Please check your email and confirm your registration <br />
        and refresh page
      </h2>
      <PartyPopper className="text-amber-600" size={100} />
    </div>
  );
}

export default ConfirmUser;
