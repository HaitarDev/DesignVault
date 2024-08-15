import UserUpdateAvatar from "@/components/settings/UserSettingForm";
import UserUpdateInfo from "@/components/settings/UserUpdateInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient, getUser } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

async function UserSettingPage({ params }: { params: { user: string } }) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.user)
    .single();

  return (
    <div className="container mt-20 max-w-screen-lg flex ">
      <div className="flex flex-col  gap-4">
        <div className="flex gap-2 flex-col">
          <h3 className="tracking-widest font-medium text-lg">
            {userData?.username}
          </h3>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 cursor-default">
              <AvatarImage src={userData?.avatar_url ?? ""} />
              <AvatarFallback>
                {userData?.username.substring(0, 4)}
              </AvatarFallback>
            </Avatar>
            <UserUpdateAvatar />
          </div>
        </div>
        <UserUpdateInfo />
      </div>
    </div>
  );
}

export default UserSettingPage;
