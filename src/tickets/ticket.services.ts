import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { CustomerSupportTicketsTable, TITicket, TSTicket } from "../drizzle/schema"; // 

export const CustomerSupportTicketsTableService = async (limit?: number): Promise<TSTicket[] | null> => {
    if (limit) {
        return await db.query.CustomerSupportTicketsTable.findMany({
            limit: limit
        });
    }
    return await db.query.CustomerSupportTicketsTable.findMany();
}

export const getCustomerSupportTicketsTableService = async (id: number): Promise<TITicket | undefined> => {
    return await db.query.CustomerSupportTicketsTable.findFirst({
        where: eq(CustomerSupportTicketsTable.ticket_id, id)
    });
}

export const createCustomerSupportTicketsTableService = async (Ticket: TITicket): Promise<string> => {
    await db.insert(CustomerSupportTicketsTable).values(Ticket);
    return "Ticket created successfully";
}

export const updateCustomerSupportTicketsTableService = async (id: number, Ticket: TITicket): Promise<string> => {
    await db.update(CustomerSupportTicketsTable).set(Ticket).where(eq(CustomerSupportTicketsTable.ticket_id, id));
    return "Ticket updated successfully";
}

export const deleteCustomerSupportTicketsTableService = async (id: number): Promise<string> => {
    await db.delete(CustomerSupportTicketsTable).where(eq(CustomerSupportTicketsTable.ticket_id, id));
    return "Ticket deleted successfully";
}
