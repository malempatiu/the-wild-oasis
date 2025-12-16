import { notFound } from "next/navigation";
import { supabase } from "./api-client";
import { Cabin } from "./types";

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

  return data ?? [];
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

export { getCountries, getCabins, getCabin };