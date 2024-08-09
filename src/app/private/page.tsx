import { redirect } from "next/navigation";

import { getUser } from "@/utils/supabase/server";
import { signOut } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";

export default async function PrivatePage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <p>
      Hello {user.email}
      <form>
        <Button formAction={signOut}>signout</Button>
      </form>
    </p>
  );
}
