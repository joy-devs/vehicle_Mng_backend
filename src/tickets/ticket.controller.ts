
import { Context } from 'hono';
import {CustomerSupportTicketsTableService, getCustomerSupportTicketsTableService, createCustomerSupportTicketsTableService, updateCustomerSupportTicketsTableService, deleteCustomerSupportTicketsTableService } from './ticket.services';

// List all Tickets
export const listTickets = async (c: Context): Promise<Response> => {
  const Tickets = await CustomerSupportTicketsTableService();
  return c.json(Tickets);
};

// Get a single Ticket by ID
export const getTickets = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const Ticket = await getCustomerSupportTicketsTableService(id);
  if (Ticket) {
    return c.json(Ticket);
  }
  return c.json({ message: 'Ticket not found' }, 404);
};

// Create a new Ticket
export const createTickets = async (c: Context): Promise<Response> => {
  const TicketData = await c.req.json();
  const Ticket = await createCustomerSupportTicketsTableService(TicketData);
  return c.json(Ticket, 201);
};

// Update a Ticket
export const updateTickets = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const TicketData = await c.req.json();
  const message = await updateCustomerSupportTicketsTableService(id, TicketData);
  return c.json({ message });
};

// Delete a Ticket
export const deleteTickets = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deleteCustomerSupportTicketsTableService(id);
  return c.json({ message });
};
