import { supabase } from "../supabaseClient";

export async function getUserBookings(userId) {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      rooms (
        name,
        category,
        price,
        occupancy,
        bed_type,
        size
      )
    `)
    .eq("user_id", userId)
    .order("id", { ascending: false });

  return { data, error };
}

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

export async function createBooking(booking) {
  const { room_id, check_in_date, check_out_date } = booking;

  const { data: conflicts, error: conflictError } = await supabase
    .from("bookings")
    .select("*")
    .eq("room_id", room_id)
    .in("status", ["Pending", "Confirmed"])
    .lt("check_in_date", check_out_date)
    .gt("check_out_date", check_in_date);

  if (conflictError) {
    return { data: null, error: conflictError };
  }

  if (conflicts.length > 0) {
    return {
      data: null,
      error: { message: "This room is already booked for the selected dates." },
    };
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select();

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