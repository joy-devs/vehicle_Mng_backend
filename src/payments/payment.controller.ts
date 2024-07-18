// import stripe from "../stripe";
// import {
//   deletePaymentService,
//   createPaymentService,
  
//   getPaymentsService,
//   updatePaymentService,
// } from "./payment.services";
// import { Context } from "hono";

// // List all Payments
// export const listPayments = async (c: Context): Promise<Response> => {
//   const payments = await getPaymentsService();
//   return c.json(payments);
// };

// // Get a single Payment by ID
// export const getPayment = async (c: Context): Promise<Response> => {
//   const id = Number(c.req.param('id'));
//   if (isNaN(id)) {
//     return c.json({ error: "Invalid ID" }, 400);
//   }
//   const payment = await getPayment(id);
//   if (!payment) {
//     return c.json({ error: "Payment not found" }, 404);
//   }
//   return c.json(payment, 200);
// };

// // Create a new Payment
// const paymentService = createPaymentService();

// export const createPayments = {
//   async createCheckoutSession(c: Context): Promise<Response> {
//     try {
//       const { bookingId, amount } = await c.req.json();
//       console.log(`Check if id and amount is being received: ${bookingId}, amount: ${amount}`);

//       const session = await paymentService.createCheckoutSession(bookingId, amount);

//       return c.json({ sessionId: session.id });
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//       return c.json({ success: false, error: "Failed to create checkout session" }, 500);
//     }
//   },

//   // Testing of checkout session
//   async testCreateCheckoutSession(c: Context): Promise<Response> {
//     try {
//       // For testing, we'll use hardcoded values
//       const bookingId = 10;
//       const amount = 10000; // $100
//       console.log(`Testing checkout session inputs for bookingId: ${bookingId}, amount: ${amount}`);

//       const session = await paymentService.createCheckoutSession(bookingId, amount);
//       // Trying to update data on my tables once successful
//       await paymentService.handleSuccessfulPayment(session.id);

//       return c.json({
//         success: true,
//         sessionId: session.id,
//         checkoutUrl: session.url,
//       });
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//       return c.json({ success: false, error: "Failed to create checkout session" }, 500);
//     }
//   },

//   // Handle webhook
//   async handleWebhook(c: Context): Promise<Response> {
//     const sig = c.req.header("stripe-signature");
//     const rawBody = await c.req.raw.text();

//     try {
//       const event = stripe.webhooks.constructEvent(
//         rawBody,
//         sig!,
//         process.env.STRIPE_WEBHOOK_SECRET!
//       );

//       if (event.type === "checkout.session.completed") {
//         const session = event.data.object;
//         await paymentService.handleSuccessfulPayment(session.id);
//       }

//       return c.json({ received: true });
//     } catch (err) {
//       console.error(err);
//       return c.json({ error: "Webhook error" }, 400);
//     }
//   },
// };

// // Update a Payment
// export const updatePayments = async (c: Context): Promise<Response> => {
//   try {
//     const id = Number(c.req.param('id'));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     const payment = await c.req.json();
//     const searchedPayment = await getPaymentById(id);
//     if (!searchedPayment) return c.text("Payment not found", 404);

//     const res = await updatePaymentService(id, payment);
//     if (!res) return c.text("Payment not updated", 404);

//     return c.json({ msg: res }, 201);
//   } catch (error: any) {
//     return c.json({ error: error?.message }, 400);
//   }
// };

// // Delete a Payment
// export const deletePayments = async (c: Context): Promise<Response> => {
//   try {
//     const id = Number(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     const payment = await getPaymentById(id);
//     if (!payment) return c.text("Payment not found", 404);

//     const res = await deletePaymentService(id);
//     if (!res) return c.text("Payment not deleted", 404);

//     return c.json({ msg: res }, 201);
//   } catch (error: any) {
//     return c.json({ error: error?.message }, 400);
//   }
// };
