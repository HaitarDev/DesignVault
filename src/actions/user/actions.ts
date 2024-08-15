"use server";

import { userInfoSchema } from "@/schema/info-user-schema";
import { createClient, getUser } from "@/utils/supabase/server";

export async function uploadAvatar(formData: FormData) {
  const file = formData.get("avatar_img");

  if (!file) return;

  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`avatars_${Math.random().toFixed(2)}${Date.now()}.png`, file!);
  if (error) {
    new Error("Error while uploading image to avatars storage");
    return false;
  }

  const user = await getUser();
  if (!user) throw new Error("There is no user to make uploading");

  const {
    data: { publicUrl: imgUrl },
  } = supabase.storage.from("avatars").getPublicUrl(data.path);

  const {
    error: uploadError,
    status,
    data: newData,
  } = await supabase
    .from("users")
    .update({
      avatar_url: imgUrl,
    })
    .eq("id", user.id);

  if (uploadError) {
    new Error(uploadError.message);
    return false;
  }
  return true;
}

export async function updateUserInfo(formData: FormData) {
  const userData = Object.fromEntries(formData);
  const { success } = userInfoSchema.safeParse(userData);
  if (!success) {
    new Error("user data info format are incorrect");
  }

  const data = {
    username: formData.get("username") as string,
    description: formData.get("description") as string,
  };

  const user = await getUser();

  if (!user) return false;

  const supabase = createClient();
  const { error } = await supabase
    .from("users")
    .update({ ...data })
    .eq("id", user.id);

  if (error) throw new Error("Error while updating user info");
}
