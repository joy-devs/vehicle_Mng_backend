import { Hono } from 'hono';
import { listVehicles, getVehicles, createVehicles, updateVehicles, deleteVehicles } from './vehicle.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { VehiclesTableSchema } from '../validator';
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth'; 

export const VehiclesRouter = new Hono();

// Get all Vehicles
VehiclesRouter.get('/Vehicles', listVehicles);

// Get a single Vehicles
VehiclesRouter.get('/Vehicles/:id',  getVehicles);

// Create a Vehicle
VehiclesRouter.post(
  '/Vehicles',
  
 createVehicles
);

// Update a Vehicle
VehiclesRouter.put(
  '/Vehicles/:id',
  
   updateVehicles
);

// Delete a Vehicle
VehiclesRouter.delete('/Vehicles/:id',  deleteVehicles);

export default VehiclesRouter;
