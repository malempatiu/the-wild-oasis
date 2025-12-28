"use client";

import {ReservationCard} from "./ReservationCard";
import { deleteBooking } from "@/app/_lib/actions";

import { useOptimistic } from "react";
import { BookingsWithCabin } from "@/app/_lib/types";

const ReservationList = ({ bookings }: {bookings: BookingsWithCabin[]}) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export {ReservationList};
