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
  tags: string[];
}
export const uploadDesignInfo = async (info: Info) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("designs")
    .update({
      title: info.title,
      description: info.description,
      tags: info.tags,
    })
    .eq("id", info.designId)
    .select("*")
    .single();

  if (error) throw new Error("Error while updating design info");
  return data.id;
};

export const modifyLikedDesign = async (designId: string) => {
  const supabase = createClient();
  const user = await getUser();

  if (!user) throw new Error("There is no user");

  const { data: design, error: designError } = await supabase
    .from("designs")
    .select("*")
    .eq("id", designId)
    .single();

  if (designError) throw Error("Error while fetching design");

  const { error: likedError, data: isUserLikedDesign } = await supabase
    .from("liked_designs")
    .select("*")
    .eq("design_id", designId)
    .eq("user_id", user.id)
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
        user_id: user.id,
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
    const { error, data: likedDesigs } = await supabase
      .from("liked_designs")
      .update({
        isLiked,
      })
      .eq("design_id", designId)
      .eq("user_id", user.id)
      .select("*")
      .single();

    console.log(likedDesigs, error);
    if (error) throw new Error("error while updating liked_design");
    await supabase.from("designs").update({ liked_count }).eq("id", designId);

    return likedDesigs?.isLiked;
  }
};

export const modifyBookmarkDesign = async (designId: string) => {};

export const createCollection = async (title: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("There is no user");

    const supabase = createClient();

    const { error, data } = await supabase.from("collections").insert({
      title,
      user_id: user.id,
    });
    // .select("*");

    if (error) throw new Error("There is an error while creating a collection");
  } catch (error: any) {
    console.log(error.message);
  }
};

export const insertDesignCollection = async (
  designId: string,
  collectionId: string
) => {
  if (!collectionId || !designId) return;

  const user = await getUser();
  if (!user) throw new Error("There is no user");
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("collection_designs")
      .select("*")
      .eq("collection_id", collectionId)
      .eq("design_id", designId)
      .single();

    if (!data) {
      await supabase
        .from("collection_designs")
        .delete()
        .eq("design_id", designId);

      const { error, data } = await supabase.from("collection_designs").insert({
        collection_id: collectionId,
        design_id: designId,
      });
      console.log(error, data, "create");
      if (error) throw new Error("Error on create a collection designs");
    } else {
      const { error, data } = await supabase
        .from("collection_designs")
        .delete()
        .eq("collection_id", collectionId)
        .eq("design_id", designId);

      console.log(error, data, "update");
      if (error) throw new Error("Error on delete a collection designs");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
