"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, registerSchema } from "@/schema/auth-schema";

export async function login(formData: FormData) {
  const supabase = createClient();

  const userData = Object.fromEntries(formData);
  const { success } = loginSchema.safeParse(userData);

  if (!success) {
    new Error("Login format info are incorrect");
    redirect("/login");
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?error=true");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const validateData = Object.fromEntries(formData);
  const parsed = registerSchema.safeParse(validateData);

  if (!parsed.success) {
    new Error("register form data are not valid !");
    return redirect("/register");
  }

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const username = formData.get("username") as string;

  const { error, data: userData } = await supabase.auth.signUp(data);

  console.log(error, userData);
  if (error || !userData.user) {
    redirect("/register");
  }

  const { data: newUser } = await supabase
    .from("users")
    .insert({ username, id: userData.user.id });

  console.log(newUser, 11);
  revalidatePath("/", "layout");
  redirect("/confirmUser");
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/");
  }

  revalidatePath("/login", "layout");
  redirect("/login");
}
