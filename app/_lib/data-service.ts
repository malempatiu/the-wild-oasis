import { notFound } from "next/navigation";
import { supabase } from "./api-client";
import { Booking, BookingsWithCabin, BookingsWithCabins, Cabin, Guest } from "./types";
import { eachDayOfInterval } from "date-fns";

const getCountries = async() => {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries as { name: string; flag: string }[];
  } catch {
    throw new Error('Could not fetch countries');
  }
}

const getCabins = async (): Promise<Cabin[]> => {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");
  
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as Cabin[] ?? [];
};

const getCabin = async (id: number): Promise<Cabin> =>{
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

const getBookedDatesByCabinId = async (cabinId: number) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.'${today.toISOString()}',status.eq.'checked-in'`)

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

const getSettings = async () => {
  const { data, error } = await supabase.from("settings").select("*");

  // await new Promise((res) => setTimeout(res, 5000));

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data?.[0];
}

const createGuest = async (newGuest: Partial<Guest>) => {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

const getGuest = async (email: string): Promise<Guest | null> => {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

const getBookings = async (guestId: number): Promise<BookingsWithCabin[]> => {
  const { data, error } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return (data as unknown as BookingsWithCabins[])?.map((booking) => ({
    ...booking,
    cabin: booking.cabins,
  })) as BookingsWithCabin[];
}

const getBooking = async (id: number): Promise<Booking> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export { 
  getCountries, 
  getCabins, 
  getCabin, 
  getBookedDatesByCabinId, 
  getSettings,
  createGuest,
  getGuest,
  getBookings,
  getBooking 
};