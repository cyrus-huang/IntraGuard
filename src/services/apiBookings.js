import { getToday, getTomorrow } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getRecordings({ filter, sort, page }) {
  // let { data: recordings, error } = await supabase
  //   .from("recordings")
  //   .select("*, rooms(name), personnel(name,phone)", { count: "exact" });
  // console.log(recordings);

  let query = supabase
    .from("recordings")
    .select("*, rooms(*), personnel(*)", { count: "exact" });

  // filter
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  //sort
  if (sort) query = query.order(sort.way, { ascending: sort.order === "asc" });

  //pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  console.log(data);

  if (error) throw new Error("Recodings cannot be loaded.");

  return { data, count };
}

export async function getRecording(id) {
  console.log(id);
  const { data, error } = await supabase
    .from("recordings")
    .select("*, rooms(*), personnel(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Recording not found");
  }

  return data;
}

// Returns all recordings that are were created after the given date.
export async function getRecordingsAfterDate(date) {
  const { data, error } = await supabase
    .from("recordings")
    .select("*")
    .gte("start_time", date)
    .lte("start_time", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Recordings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getTodayActivity() {
  const { data, error } = await supabase
    .from("recordings")
    .select("*, rooms(name), personnel(name)")
    // .or(
    //   `and(status.eq.scheduled,start_time.eq.${getToday()}),and(status.eq.in-progress,end_time.eq.${getToday()})`
    // )
    .or(
      `and(and(status.eq.scheduled,start_time.gt.${getToday()}),and(status.eq.scheduled,start_time.lt.${getTomorrow()})),and(and(status.eq.in-progress,end_time.gt.${getToday()}),and(status.eq.in-progress,end_time.lt.${getTomorrow()}))`
    )
    .order("start_time");

  console.log(data);

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'scheduled' && isToday(new Date(stay.start_time))) ||
  // (stay.status === 'in-progress' && isToday(new Date(stay.end_time)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

//checkin and checkout!!!
export async function updateRecording(id, obj) {
  const { data, error } = await supabase
    .from("recordings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();
  // console.log(id);
  // console.log(obj);
  // console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Recording could not be updated");
  }
  return data;
}

export async function deleteRecording(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from("recordings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Recording could not be deleted");
  }
  return data;
}

export async function createEditRecording(newRecording, id) {
  //create/edit Cabin
  let query = supabase.from("recordings");
  console.log(newRecording);

  //create only
  if (!id)
    query = query
      .insert([{ ...newRecording }])
      .select()
      .single();
  //edit
  if (id)
    query = query
      .update({ ...newRecording })
      .eq("id", id)
      .select()
      .single();

  const { data, error } = await query;
  console.log(data);
  if (error) throw new Error("Recordings can not be created.");

  return data;
}
