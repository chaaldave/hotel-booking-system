import { supabase } from "../supabaseClient";

export async function getAllBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      profiles (
        full_name
      ),
      rooms (
        name,
        category,
        occupancy,
        price
      )
    `)
    .order("id", { ascending: false });

  return { data, error };
}

export async function updateBookingStatus(id, status) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select();

  return { data, error };
}