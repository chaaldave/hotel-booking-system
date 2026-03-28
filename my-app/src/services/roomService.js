import { supabase } from "../supabaseClient";

export async function getRooms() {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("id", { ascending: true });

  return { data, error };
}

export async function addRoom(room) {
  const { data, error } = await supabase
    .from("rooms")
    .insert([room])
    .select();

  return { data, error };
}

export async function updateRoom(id, updatedRoom) {
  console.log("Updating ID:", id);
  console.log("Data being sent:", updatedRoom); // Check for extra or weirdly formatted fields here

  const { data, error } = await supabase
    .from("rooms")
    .update(updatedRoom)
    .eq("id", id)
    .select();
//
  if (error) console.error("Supabase Error Details:", error.message, error.details);

  return { data, error };
}

export async function deleteRoom(id) {
  const { error } = await supabase
    .from("rooms")
    .delete()
    .eq("id", id);

  return { error };
}