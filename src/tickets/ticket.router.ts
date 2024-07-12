import { Hono } from 'hono';
import { listTickets, getTickets, createTickets, updateTickets, deleteTickets } from './ticket.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { CustomerSupportTicketsTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth';

export const TicketsRouter = new Hono();

// Get all Tickets
TicketsRouter.get('/Tickets',adminRoleAuth, listTickets);

// Get a single Ticket
TicketsRouter.get('/Tickets/:id',bothRoleAuth, getTickets);

// Create a Ticket
TicketsRouter.post(
  '/Tickets',
  zValidator('json', CustomerSupportTicketsTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  bothRoleAuth, createTickets
);

// Update a Ticket
TicketsRouter.put(
  '/Tickets/:id',
  zValidator('json', CustomerSupportTicketsTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  bothRoleAuth, updateTickets
);

// Delete a Ticket
TicketsRouter.delete('/Tickets/:id', bothRoleAuth, deleteTickets);

export default TicketsRouter;
