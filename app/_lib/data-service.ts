import { notFound } from "next/navigation";
import { supabase } from "./api-client";
import { Cabin } from "./types";
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

export { getCountries, getCabins, getCabin, getBookedDatesByCabinId, getSettings };