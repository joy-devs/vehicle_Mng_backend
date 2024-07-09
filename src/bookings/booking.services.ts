import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { BookingsTable, TIBooking, TSBooking } from "../drizzle/schema"; // 

export const BookingsTableService = async (limit?: number): Promise<TSBooking[] | null> => {
    if (limit) {
        return await db.query.BookingsTable.findMany({
            limit: limit
        });
    }
    return await db.query.BookingsTable.findMany();
}

export const getBookingsTableService = async (id: number): Promise<TIBooking | undefined> => {
    return await db.query.BookingsTable.findFirst({
        where: eq(BookingsTable.booking_id, id)
    });
}

export const createBookingsTableService = async (booking: TIBooking): Promise<string> => {
    await db.insert(BookingsTable).values(booking);
    return "booking created successfully";
}

export const updateBookingsTableService = async (id: number, booking: TIBooking): Promise<string> => {
    await db.update(BookingsTable).set(booking).where(eq(BookingsTable.booking_id, id));
    return "booking updated successfully";
}

export const deleteBookingsTableService = async (id: number): Promise<string> => {
    await db.delete(BookingsTable).where(eq(BookingsTable.booking_id, id));
    return "booking deleted successfully";
}
