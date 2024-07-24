import { Hono } from 'hono';
import { listTickets, getTickets, createTickets, updateTickets, deleteTickets } from './ticket.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { CustomerSupportTicketsTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth';

export const TicketsRouter = new Hono();

// Get all Tickets
TicketsRouter.get('/Tickets', listTickets);

// Get a single Ticket
TicketsRouter.get('/Tickets/:id', getTickets);

// Create a Ticket
TicketsRouter.post(
  '/Tickets',
  
   createTickets
);

// Update a Ticket
TicketsRouter.put(
  '/Tickets/:id',

   updateTickets
);

// Delete a Ticket
TicketsRouter.delete('/Tickets/:id',  deleteTickets);

export default TicketsRouter;
