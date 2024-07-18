import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { PaymentsTable, TIPayment, TSPayment, BookingsTable } from "../drizzle/schema";
import stripe from "../stripe";

interface TISPayment {
  booking_id: number;
    amount: number;
    paymentStatus: string;
    paymentMethod: string;
    transactionId: string;
  }

export const PaymentsTableService = async (limit?: number): Promise<TSPayment[] | null> => {
  if (limit) {
    return await db.query.PaymentsTable.findMany({
      limit: limit
    });
  }
  return await db.query.PaymentsTable.findMany();
};

export const getPaymentsTableService = async (id: number): Promise<TIPayment | undefined> => {
  return await db.query.PaymentsTable.findFirst({
    where: eq(PaymentsTable.payment_id, id)
  });
};

export const createPaymentsTableService = async (payment: TIPayment): Promise<string> => {
  await db.insert(PaymentsTable).values(payment);
  return "Payment created successfully";
};

export const updatePaymentsTableService = async (id: number, payment: TIPayment): Promise<string> => {
  await db.update(PaymentsTable).set(payment).where(eq(PaymentsTable.payment_id, id));
  return "Payment updated successfully";
};

export const deletePaymentsTableService = async (id: number): Promise<string> => {
  await db.delete(PaymentsTable).where(eq(PaymentsTable.payment_id, id));
  return "Payment deleted successfully";
};

export const PaymentService = () => {
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
        success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
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
      // await db
      //   .insert(PaymentsTable)
      //   .values({
      //     booking_id, // Assuming bookingId is a number in PaymentsTable
      //     amount: amountTotal / 100, // Assuming amount is a number in PaymentsTable
      //     payment_status: "completed",
      //     payment_method: session.payment_method_types[0],
      //     transaction_id: session.payment_intent as string,
      //   })
      //   .returning();
    },
  };
};
