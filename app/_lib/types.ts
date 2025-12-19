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
