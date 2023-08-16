import supabase, { supabaseUrl } from "./supabase";

export async function getPersonnel() {
  const { data, error } = await supabase.from("personnel").select("*");
  if (error) throw new Error("Personnel can not be loaded.");
  return data;
}

export async function createEditPersonnel(newPerson, id) {
  const hasImage = newPerson.photo?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newPerson.photo.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImage
    ? newPerson.photo
    : `${supabaseUrl}/storage/v1/object/public/personnel-images/${imageName}`;
  //create/edit Cabin
  let query = supabase.from("personnel");
  //create only
  if (!id)
    query = query
      .insert([{ ...newPerson, photo: imagePath }])
      .select()
      .single();
  //edit
  if (id)
    query = query
      .update({ ...newPerson, photo: imagePath })
      .eq("id", id)
      .select()
      .single();

  const { data, error } = await query;
  if (error) throw new Error("Personnel can not be created.");
  //upload image
  if (hasImage) return data;
  const { error: storageError } = await supabase.storage
    .from("personnel-images")
    .upload(imageName, newPerson.photo);
  //delete the extra cabin if an error occurs when uploading image
  if (storageError) {
    await supabase.from("personnel").delete().eq("id", data.id);
    throw new Error("Personnel image upload failure.");
  }
  return data;
}

export async function deletePersonnel(id) {
  const { data, error } = await supabase
    .from("personnel")
    .delete()
    .eq("id", id);
  if (error) throw new Error("Personnel can not be deleted.");
  return data;
}
