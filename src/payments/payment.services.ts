import { eq } from "drizzle-orm";
import db, { stripe } from "../drizzle/db";
import { PaymentsTable, TIPayment, TSPayment, BookingsTable } from "../drizzle/schema";
// import stripe from "../stripe";

interface TISPayment {
  booking_id: number;
    amount: number;
    paymentStatus: string;
    paymentMethod: string;
    transactionId: string;
  }

export const PaymentsService = async (limit?: number): Promise<TSPayment[] | null> => {
  if (limit) {
    return await db.query.PaymentsTable.findMany({
      limit: limit
    });
  }
  return await db.query.PaymentsTable.findMany();
};

export const getPaymentsService = async (id: number): Promise<TIPayment | undefined> => {
  return await db.query.PaymentsTable.findFirst({
    where: eq(PaymentsTable.payment_id, id)
  });
};

// export const createPaymentService = async (payment: TIPayment): Promise<string> => {
//   await db.insert(PaymentsTable).values(payment);
//   return "Payment created successfully";
// };

export const updatePaymentService = async (id: number, payment: TIPayment): Promise<string> => {
  await db.update(PaymentsTable).set(payment).where(eq(PaymentsTable.payment_id, id));
  return "Payment updated successfully";
};

export const deletePaymentService = async (id: number): Promise<string> => {
  await db.delete(PaymentsTable).where(eq(PaymentsTable.payment_id, id));
  return "Payment deleted successfully";
};

export const createPaymentService = () => {
  return {
    async createCheckoutSession(bookingId: number, amount: number) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Car Booking",
              },
              unit_amount: amount * 100, // Stripe expects amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/paymentsuccess`,
        cancel_url: `${process.env.FRONTEND_URL}paymentcancel/`,
        metadata: {
          bookingId: bookingId.toString(),
        },
      });

      return session;
    },

    async handleSuccessfulPayment(sessionId: string) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const bookingId = parseInt(session.metadata!.bookingId);

      // Handle possible null value for session.amount_total
      const amountTotal = session.amount_total;
      if (amountTotal === null) {
        throw new Error("session.amount_total is null");
      }

      // Update booking status
      await db
        .update(BookingsTable)
        .set({ booking_status: "completed" })
        .where(eq(BookingsTable.booking_id, bookingId));

      // Create payment record
      await db
        .insert(PaymentsTable)
        .values({
          booking_id: bookingId, // Assuming bookingId is a number in PaymentsTable
          amount: amountTotal / 100 as unknown as  string, // Assuming amount is a number in PaymentsTable
          payment_status: "Completed",
          payment_method: session.payment_method_types[0],
          transaction_id: 'txn_123456',
          payment_date: new Date()
        })
        .returning();
    },
  };
};
