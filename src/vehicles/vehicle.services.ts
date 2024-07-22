import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { VehiclesTable, TIVehicle, TSVehicle } from "../drizzle/schema"; // 

export const VehiclesTableService = async (limit?: number): Promise<TSVehicle[] | null> => {
    if (limit) {
        return await db.query.VehiclesTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehiclesTable.findMany();
}

export const getVehiclesTableService = async (id: number): Promise<TIVehicle | undefined> => {
    return await db.query.VehiclesTable.findFirst({
        where: eq(VehiclesTable.vehicle_id, id)
    });
}

export const createVehiclesTableService = async (Vehicle: TIVehicle): Promise<string> => {
    await db.insert(VehiclesTable).values(Vehicle);
    return "Vehicle created successfully";
}

export const updateVehiclesTableService = async (id: number, Vehicle: TIVehicle): Promise<string> => {
    await db.update(VehiclesTable).set(Vehicle).where(eq(VehiclesTable.vehicle_id, id));
    return "Vehicle updated successfully";
}

export const deleteVehiclesTableService = async (id: number): Promise<string> => {
    await db.delete(VehiclesTable).where(eq(VehiclesTable.vehicle_id, id));
    return "Vehicle deleted successfully";
}
