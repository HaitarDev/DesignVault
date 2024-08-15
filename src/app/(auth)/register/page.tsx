import RegisterForm from "@/components/login/register-form";
import { getUser } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

async function RegisterPage() {
  const user = await getUser();

  if (user) redirect("/");
  return (
    <div className="flex items-center justify-center h-svh bg-amber-50">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
