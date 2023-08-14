import supabase, { supabaseUrl } from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");
  // console.log(data);
  if (error) throw new Error("Rooms can not be loaded.");
  return data;
}

export async function createEditRoom(newRoomData, id) {
  const hasImage = newRoomData.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newRoomData.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImage
    ? newRoomData.image
    : `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;
  //create/edit Cabin
  let query = supabase.from("rooms");
  //create only
  if (!id)
    query = query
      .insert([{ ...newRoomData, image: imagePath }])
      .select()
      .single();
  //edit
  if (id)
    query = query
      .update({ ...newRoomData, image: imagePath })
      .eq("id", id)
      .select()
      .single();

  const { data, error } = await query;
  if (error) throw new Error("Rooms can not be created.");
  //upload image
  if (hasImage) return data;
  const { error: storageError } = await supabase.storage
    .from("room-images")
    .upload(imageName, newRoomData.image);
  //delete the extra cabin if an error occurs when uploading image
  if (storageError) {
    await supabase.from("rooms").delete().eq("id", data.id);
    throw new Error("Rooms image upload failure.");
  }
  return data;
}

export async function deleteRoom(id) {
  const { data, error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) throw new Error("Rooms can not be deleted.");
  return data;
}
