import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { UsersTable, TIUser, TSUser } from "../drizzle/schema"; // 

export const UsersTableService = async (limit?: number): Promise<TSUser[] | null> => {
    if (limit) {
        return await db.query.UsersTable.findMany({
            limit: limit
        });
    }
    return await db.query.UsersTable.findMany();
}

export const getUsersTableService = async (id: number): Promise<TIUser | undefined> => {
    return await db.query.UsersTable.findFirst({
        where: eq(UsersTable.user_id, id), 
        with:{
            bookings:true
        }
    });
}

export const createUsersTableService = async (user: TIUser): Promise<string> => {
    await db.insert(UsersTable).values(user);
    return "User created successfully";
}

export const updateUsersTableService = async (id: number, user: TIUser): Promise<string> => {
    await db.update(UsersTable).set(user).where(eq(UsersTable.user_id, id));
    return "User updated successfully";
}

export const deleteUsersTableService = async (id: number): Promise<string> => {
    await db.delete(UsersTable).where(eq(UsersTable.user_id, id));
    return "User deleted successfully";
}
