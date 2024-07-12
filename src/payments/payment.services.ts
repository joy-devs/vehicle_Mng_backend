import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { PaymentsTable, TIPayment, TSPayment } from "../drizzle/schema"; 

export const PaymentsTableService = async (limit?: number): Promise<TSPayment[] | null> => {
    if (limit) {
        return await db.query.PaymentsTable.findMany({
            limit: limit
        });
    }
    return await db.query.PaymentsTable.findMany();
}

export const getPaymentsTableService = async (id: number): Promise<TIPayment | undefined> => {
    return await db.query.PaymentsTable.findFirst({
        where: eq(PaymentsTable.payment_id, id)
    });
}

export const createPaymentsTableService = async (payment: TIPayment): Promise<string> => {
    await db.insert(PaymentsTable).values(payment);
    return "Payment created successfully";
}

export const updatePaymentsTableService = async (id: number, payment: TIPayment): Promise<string> => {
    await db.update(PaymentsTable).set(payment).where(eq(PaymentsTable.payment_id, id));
    return "Payment updated successfully";
}

export const deletePaymentsTableService = async (id: number): Promise<string> => {
    await db.delete(PaymentsTable).where(eq(PaymentsTable.payment_id, id));
    return "Payment deleted successfully";
}

//payments with stripe
// export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency,
//       });
//       return paymentIntent;
//     } catch (error) {
//       console.error('Error creating payment intent:', error);
//       throw new Error('Unable to create payment intent');
//     }
//   };