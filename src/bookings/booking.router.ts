import { Hono } from 'hono';
import { listbookings, getbookings, createbookings, updatebookings, deletebookings } from './booking.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import {BookingTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth';


export const bookingsRouter = new Hono();

// Get all booking
bookingsRouter.get('/bookings', adminRoleAuth, listbookings);

// Get a single bookings
bookingsRouter.get('/bookings/:id', bothRoleAuth, getbookings);

// Create a booking
bookingsRouter.post(
  '/bookings',
  zValidator('json', BookingTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  bothRoleAuth, createbookings
);

// Update a booking
bookingsRouter.put(
  '/bookings/:id',
  zValidator('json', BookingTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  bothRoleAuth, updatebookings
);

// Delete a bookings
bookingsRouter.delete('/bookings/:id',bothRoleAuth, deletebookings);

export default bookingsRouter;
