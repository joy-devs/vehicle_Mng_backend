import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { LocationTable, TILocation, TSLocation } from "../drizzle/schema";

export const LocationTableService = async (limit?: number): Promise<TSLocation[] | null> => {
    if (limit) {
        return await db.query.LocationTable.findMany({
            limit: limit
        });
    }
    return await db.query.LocationTable.findMany();
}

export const getLocationTableService = async (id: number): Promise<TILocation | undefined> => {
    return await db.query.LocationTable.findFirst({
        where: eq(LocationTable.location_id, id)
    });
}

export const createLocationTableService = async (location: TILocation): Promise<string> => {
    await db.insert(LocationTable).values(location);
    return "Location created successfully";
}

export const updateLocationTableService = async (id: number, location: TILocation): Promise<string> => {
    await db.update(LocationTable).set(location).where(eq(LocationTable.location_id, id));
    return "Location updated successfully";
}

export const deleteLocationTableService = async (id: number): Promise<string> => {
    await db.delete(LocationTable).where(eq(LocationTable.location_id, id));
    return "Location deleted successfully";
}
