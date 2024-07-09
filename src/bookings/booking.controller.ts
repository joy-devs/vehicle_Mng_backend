import { Context } from 'hono';
import { BookingsTableService, getBookingsTableService, createBookingsTableService, updateBookingsTableService, deleteBookingsTableService } from './booking.services';

// List all bookings
export const listbookings = async (c: Context): Promise<Response> => {
  const bookings = await BookingsTableService();
  return c.json(bookings);
};

// Get a single booking by ID
export const getbookings = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const booking = await getBookingsTableService(id);
  if (booking) {
    return c.json(booking);
  }
  return c.json({ message: 'Booking not found' }, 404);
};

// Create a new booking
export const createbookings = async (c: Context): Promise<Response> => {
  const bookingData = await c.req.json();
  const booking = await createBookingsTableService(bookingData);
  return c.json(booking, 201);
};

// Update a booking
export const updatebookings = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const bookingData = await c.req.json();
  const message = await updateBookingsTableService(id, bookingData);
  return c.json({ message });
};

// Delete a booking
export const deletebookings = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deleteBookingsTableService(id);
  return c.json({ message });
};
