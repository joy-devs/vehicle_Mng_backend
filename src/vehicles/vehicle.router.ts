import { Hono } from 'hono';
import { listVehicles, getVehicles, createVehicles, updateVehicles, deleteVehicles } from './vehicle.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { VehiclesTableSchema } from '../validator'; 

export const VehiclesRouter = new Hono();

// Get all Vehicles
VehiclesRouter.get('/Vehicles', listVehicles);

// Get a single Vehicles
VehiclesRouter.get('/Vehicles/:id', getVehicles);

// Create a Vehicle
VehiclesRouter.post(
  '/Vehicles',
  zValidator('json', VehiclesTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createVehicles
);

// Update a Vehicle
VehiclesRouter.put(
  '/Vehicles/:id',
  zValidator('json', VehiclesTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  updateVehicles
);

// Delete a Vehicle
VehiclesRouter.delete('/users/:id', deleteVehicles);

export default VehiclesRouter;
