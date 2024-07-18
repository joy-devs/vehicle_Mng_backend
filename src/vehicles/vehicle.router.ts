import { Hono } from 'hono';
import { listVehicles, getVehicles, createVehicles, updateVehicles, deleteVehicles } from './vehicle.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { VehiclesTableSchema } from '../validator';
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth'; 

export const VehiclesRouter = new Hono();

// Get all Vehicles
VehiclesRouter.get('/Vehicles', bothRoleAuth, listVehicles);

// Get a single Vehicles
VehiclesRouter.get('/Vehicles/:id', bothRoleAuth, getVehicles);

// Create a Vehicle
VehiclesRouter.post(
  '/Vehicles',
  zValidator('json', VehiclesTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  adminRoleAuth, createVehicles
);

// Update a Vehicle
VehiclesRouter.put(
  '/Vehicles/:id',
  zValidator('json', VehiclesTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  adminRoleAuth, updateVehicles
);

// Delete a Vehicle
VehiclesRouter.delete('/users/:id', adminRoleAuth, deleteVehicles);

export default VehiclesRouter;
