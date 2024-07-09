import { Hono } from 'hono';
import { listTickets, getTickets, createTickets, updateTickets, deleteTickets } from './ticket.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { CustomerSupportTicketsTableSchema } from '../validator'; 

export const TicketsRouter = new Hono();

// Get all Tickets
TicketsRouter.get('/Tickets', listTickets);

// Get a single Ticket
TicketsRouter.get('/Tickets/:id', getTickets);

// Create a Ticket
TicketsRouter.post(
  '/Tickets',
  zValidator('json', CustomerSupportTicketsTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createTickets
);

// Update a Ticket
TicketsRouter.put(
  '/Tickets/:id',
  zValidator('json', CustomerSupportTicketsTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  updateTickets
);

// Delete a Ticket
TicketsRouter.delete('/Tickets/:id', deleteTickets);

export default TicketsRouter;
