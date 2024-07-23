import { Hono } from 'hono';
import { listPayments, getPayment,  updatePayments, deletePayments, createPayments } from './payment.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { PaymentsTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth';


export const PaymentsRouter = new Hono();

// Get all payments
PaymentsRouter.get('/Payments', listPayments);

// Get a single payment
PaymentsRouter.get('/payments/:id', getPayment);

// Create a payment
PaymentsRouter.post(
  '/create-checkout', createPayments.createCheckoutSession
);

PaymentsRouter.get(
  '/test-checkout', createPayments.testCreateCheckoutSession
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
PaymentsRouter.delete('/payments/:id',  deletePayments);
PaymentsRouter.post("/create-checkout-session",createPayments.createCheckoutSession);

export default PaymentsRouter;
