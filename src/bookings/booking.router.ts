import { Hono } from 'hono';
import { listbookings, getbookings, createbookings, updatebookings, deletebookings } from './booking.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import {BookingTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth';


export const bookingsRouter = new Hono();

// Get all booking
bookingsRouter.get('/bookings', listbookings);

// Get a single bookings
bookingsRouter.get('/bookings/:id',  getbookings);

// Create a booking
bookingsRouter.post(
  '/bookings',
  
  createbookings
);

// Update a booking
bookingsRouter.put(
  '/bookings/:id',
  
   updatebookings
);

// Delete a bookings
bookingsRouter.delete('/bookings/:id', deletebookings);

export default bookingsRouter;
