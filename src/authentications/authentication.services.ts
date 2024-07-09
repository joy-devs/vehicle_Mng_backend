import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { AuthenticationTable, TIAuth, TSAuth } from "../drizzle/schema"; // 

export const AuthenticationTableService = async (limit?: number): Promise<TSAuth[] | null> => {
    if (limit) {
        return await db.query.AuthenticationTable.findMany({
            limit: limit
        });
    }
    return await db.query.AuthenticationTable.findMany();
}

export const getAuthenticationTableService = async (id: number): Promise<TIAuth | undefined> => {
    return await db.query.AuthenticationTable.findFirst({
        where: eq(AuthenticationTable.auth_id, id)
    });
}

export const createAuthenticationTableService = async (authentication: TIAuth): Promise<string> => {
    await db.insert(AuthenticationTable).values(authentication);
    return "authentication created successfully";
}

export const updateAuthenticationTableService = async (id: number, authentication: TIAuth): Promise<string> => {
    await db.update(AuthenticationTable).set(authentication).where(eq(AuthenticationTable.auth_id, id));
    return "authentication updated successfully";
}

export const deleteAuthenticationTableService = async (id: number): Promise<string> => {
    await db.delete(AuthenticationTable).where(eq(AuthenticationTable.auth_id, id));
    return "authentication deleted successfully";
}
