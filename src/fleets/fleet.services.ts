import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { FleetManagementTable, TIFleet, TSFleet } from "../drizzle/schema"; // 

export const FleetManagementTableService = async (limit?: number): Promise<TSFleet[] | null> => {
    if (limit) {
        return await db.query.FleetManagementTable.findMany({
            limit: limit
        });
    }
    return await db.query.FleetManagementTable.findMany();
}

export const getFleetManagementTableService = async (id: number): Promise<TIFleet | undefined> => {
    return await db.query.FleetManagementTable.findFirst({
        where: eq(FleetManagementTable.fleet_id, id)
    });
}

export const createFleetManagementTableService = async (Fleet: TIFleet): Promise<string> => {
    await db.insert(FleetManagementTable).values(Fleet);
    return "Fleet created successfully";
}

export const updateFleetManagementTableService = async (id: number, Fleet: TIFleet): Promise<string> => {
    await db.update(FleetManagementTable).set(Fleet).where(eq(FleetManagementTable.fleet_id, id));
    return "Fleet updated successfully";
}

export const deleteFleetManagementTableService = async (id: number): Promise<string> => {
    await db.delete(FleetManagementTable).where(eq(FleetManagementTable.fleet_id, id));
    return "Fleet deleted successfully";
}
