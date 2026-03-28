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
  // This takes 'id' out and puts everything else into 'dataToUpdate'
  const { id: _, ...dataToUpdate } = updatedRoom;

  const { data, error } = await supabase
    .from("rooms")
    .update(dataToUpdate) // Use the cleaned object here
    .eq("id", id)
    .select();

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