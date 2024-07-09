
import { Context } from 'hono';
import {PaymentsTableService, getPaymentsTableService, createPaymentsTableService, updatePaymentsTableService, deletePaymentsTableService } from './payment.services';

// List all Payments
export const listPayments = async (c: Context): Promise<Response> => {
  const Payments = await PaymentsTableService();
  return c.json(Payments);
};

// Get a single Payment by ID
export const getPayments = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const Payment = await getPaymentsTableService(id);
  if (Payment) {
    return c.json(Payment);
  }
  return c.json({ message: 'Payment not found' }, 404);
};

// Create a new Payment
export const createPayments = async (c: Context): Promise<Response> => {
  const PaymentData = await c.req.json();
  const Payment = await createPaymentsTableService(PaymentData);
  return c.json(Payment, 201);
};

// Update a Payment
export const updatePayments = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const PaymentData = await c.req.json();
  const message = await updatePaymentsTableService(id, PaymentData);
  return c.json({ message });
};

// Delete a Payment
export const deletePayments = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deletePaymentsTableService(id);
  return c.json({ message });
};
