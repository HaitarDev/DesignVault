// import { login, signup } from './actions'

import LoginForm from "@/components/login/login-form";
import { getUser } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();

  if (user) redirect("/");
  return (
    <div className="flex items-center justify-center h-svh bg-amber-50">
      <LoginForm />
    </div>
  );
}
