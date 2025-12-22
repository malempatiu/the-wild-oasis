import type { User } from "next-auth";

export type Cabin = {
    id: number,
    name: string,
    maxCapacity: number,
    regularPrice: number,
    discount: number,
    image: string,
    description: string,
}

export type BookingSettings = {
    id: number,
    minBookingLength: number,
    maxBookingLength: number,
    maxGuestPerBooking: number,
    breakfastPrice: number,
    createdAt: string,
}

export type Guest = {
    id: number,
    email: string,
    fullName: string,
    nationality?: string,
    countryFlag?: string,
    nationalID?: string,
}

export type Booking = {
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    guestId: number;
    cabinId: number;
    observations?: string;
}

export type BookingsWithCabins = Booking & {
    cabins: Pick<Cabin, "name" | "image">
}

export type BookingsWithCabin = Booking & {
    cabin: Pick<Cabin, "name" | "image">
}

export type ExtendedUser = User & { guestId: number };
