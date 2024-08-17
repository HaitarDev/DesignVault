"use server";

import { createClient, getUser } from "@/utils/supabase/server";

export const uploadDesign = async (formData: FormData) => {
  const file = formData.get("design");

  if (!file) return;

  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("designs")
    .upload(`designs_${Math.random().toFixed(2)}${Date.now()}.png`, file!);
  if (error) {
    new Error("Error while uploading image to designs storage");
    return false;
  }

  const user = await getUser();
  if (!user) throw new Error("There is no user to make uploading");

  const {
    data: { publicUrl: imgUrl },
  } = supabase.storage.from("designs").getPublicUrl(data.path);

  const {
    error: uploadError,
    status,
    data: newData,
  } = await supabase
    .from("designs")
    .insert({
      img_url: imgUrl,
      user_id: user.id,
    })
    .eq("id", user.id)
    .select("*")
    .single();

  if (uploadError) {
    new Error(uploadError.message);
    return false;
  }
  return { id: newData.id, img_url: newData.img_url };
};

interface Info {
  designId: string;
  title: string;
  description: string;
}
export const uploadDesignInfo = async (info: Info) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("designs")
    .update({
      title: info.title,
      description: info.description,
    })
    .eq("id", info.designId)
    .select("*")
    .single();

  if (error) throw new Error("Error while updating design info");
  return data.id;
};

export const modifyLikedDesign = async (designId: string) => {
  const supabase = createClient();
  const session = await getUser();

  if (!session) throw new Error("There is no session");

  const { data: design, error: designError } = await supabase
    .from("designs")
    .select("*")
    .eq("id", designId)
    .single();

  const { error, data: isUserLikedDesign } = await supabase
    .from("liked_designs")
    .select("*")
    .eq("design_id", designId)
    .eq("user_id", session.id)
    .single();

  const isLiked = isUserLikedDesign?.isLiked ? false : true;

  const prevCount = design?.liked_count ?? 0;
  const liked_count = isLiked ? prevCount + 1 : prevCount - 1;

  console.log(prevCount, liked_count, isLiked);
  if (isUserLikedDesign === null) {
    const { error, data: likedDesigs } = await supabase
      .from("liked_designs")
      .insert({
        design_id: designId,
        user_id: session.id,
        isLiked,
      })
      .select("*")
      .single();

    const { data: designs } = await supabase
      .from("designs")
      .update({ liked_count: isLiked ? prevCount + 1 : prevCount })
      .eq("id", designId);
    return likedDesigs?.isLiked;
  } else {
    const { data: likedDesigs } = await supabase
      .from("liked_designs")
      .update({
        isLiked,
      })
      .eq("design_id", designId)
      .eq("user_id", session.id)
      .select("*")
      .single();

    await supabase.from("designs").update({ liked_count }).eq("id", designId);

    return likedDesigs?.isLiked;
  }
};
