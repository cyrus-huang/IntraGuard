import supabase, { supabaseUrl } from "./supabase";

export async function signup({ full_name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: full_name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  // console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, full_name, avatar }) {
  //Update password or fullname
  let newData;
  if (password) newData = { password };
  if (full_name) newData = { data: { full_name } };
  const { data, error } = await supabase.auth.updateUser(newData);
  if (error) throw new Error(error.message);

  //upload avatar
  if (!avatar) return data;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (avatarError) throw new Error(avatarError.message);

  //update avatar
  const { data: updateUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) throw new Error(updateError.message);
  return updateUser;
}
