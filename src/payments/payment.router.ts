import { Hono } from 'hono';
import { listPayments, getPayments, createPayments, updatePayments, deletePayments } from './payment.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { PaymentsTableSchema } from '../validator'; 

export const PaymentsRouter = new Hono();

// Get all payments
PaymentsRouter.get('/payments', listPayments);

// Get a single payment
PaymentsRouter.get('/payments/:id', getPayments);

// Create a payment
PaymentsRouter.post(
  '/payments',
  zValidator('json', PaymentsTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createPayments
);

// Update a Payment
PaymentsRouter.put(
  '/payments/:id',
  zValidator('json', PaymentsTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  updatePayments
);

// Delete a payment
PaymentsRouter.delete('/payments/:id', deletePayments);

export default PaymentsRouter;
