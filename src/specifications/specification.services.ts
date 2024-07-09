import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { VehicleSpecificationsTable, TISpecification, TSSpecification } from "../drizzle/schema"; 

// Service to fetch vehicle specifications with an optional limit
export const vehicleSpecificationsService = async (limit?: number): Promise<TSSpecification[] | null> => {
    if (limit) {
        return await db.query.VehicleSpecificationsTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehicleSpecificationsTable.findMany();
}

// Service to fetch a single vehicle specification by ID
export const getVehicleSpecificationService = async (id: number): Promise<TISpecification | undefined> => {
    return await db.query.VehicleSpecificationsTable.findFirst({
        where: eq(VehicleSpecificationsTable.vehicle_id, id)
    });
}

// Service to create a new vehicle specification
export const createVehicleSpecificationService = async (specification: TISpecification): Promise<string> => {
    await db.insert(VehicleSpecificationsTable).values(specification);
    return "Specification created successfully";
}

// Service to update an existing vehicle specification
export const updateVehicleSpecificationService = async (id: number, specification: TISpecification): Promise<string> => {
    await db.update(VehicleSpecificationsTable).set(specification).where(eq(VehicleSpecificationsTable.vehicle_id, id));
    return "Specification updated successfully";
}

// Service to delete a vehicle specification by ID
export const deleteVehicleSpecificationService = async (id: number): Promise<string> => {
    await db.delete(VehicleSpecificationsTable).where(eq(VehicleSpecificationsTable.vehicle_id, id));
    return "Specification deleted successfully";
}
