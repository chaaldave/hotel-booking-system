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
  // 1. Check if there are any bookings for this room first
  const { data: bookings, error: checkError } = await supabase
    .from("bookings")
    .select("id")
    .eq("room_id", id)
    .limit(1); // We only need to find one to know we can't delete

  if (checkError) return { error: checkError };

  // 2. If a booking exists, stop and return a custom error
  if (bookings.length > 0) {
    return { 
      error: { message: "Cannot delete room: It has existing bookings." } 
    };
  }

  // 3. If no bookings, proceed with deletion
  const { error } = await supabase
    .from("rooms")
    .delete()
    .eq("id", id);

  return { error };
}