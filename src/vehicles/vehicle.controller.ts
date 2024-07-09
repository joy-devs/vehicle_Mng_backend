
import { Context } from 'hono';
import {VehiclesTableService, getVehiclesTableService, createVehiclesTableService, updateVehiclesTableService, deleteVehiclesTableService } from './vehicle.services';

// List all Vehicles
export const listVehicles = async (c: Context): Promise<Response> => {
  const Vehicles = await VehiclesTableService();
  return c.json(Vehicles);
};

// Get a single Vehicle by ID
export const getVehicles = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const Vehicle = await getVehiclesTableService(id);
  if (Vehicle) {
    return c.json(Vehicle);
  }
  return c.json({ message: 'Vehicle not found' }, 404);
};

// Create a new Vehicle
export const createVehicles = async (c: Context): Promise<Response> => {
  const VehicleData = await c.req.json();
  const Vehicle = await createVehiclesTableService(VehicleData);
  return c.json(Vehicle, 201);
};

// Update a Vehicle
export const updateVehicles = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const VehicleData = await c.req.json();
  const message = await updateVehiclesTableService(id, VehicleData);
  return c.json({ message });
};

// Delete a Vehicle
export const deleteVehicles = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deleteVehiclesTableService(id);
  return c.json({ message });
};
